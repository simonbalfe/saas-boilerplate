"use client"

import { useUser } from "@/src/hooks/use-user"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Search, Plus, Trash2, Activity, Eye, MessageSquare, TrendingUp, Clock } from "lucide-react"

interface Keyword {
  id: number
  keyword: string
  subreddit: string
  mentions: number
  status: "active" | "paused"
  lastMention: string
}

export function Dashboard() {
  const { user, loading } = useUser()
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: 1, keyword: "Next.js", subreddit: "webdev", mentions: 12, status: "active", lastMention: "2 hours ago" },
    { id: 2, keyword: "React", subreddit: "reactjs", mentions: 8, status: "active", lastMention: "1 hour ago" },
    { id: 3, keyword: "TypeScript", subreddit: "programming", mentions: 5, status: "paused", lastMention: "4 hours ago" }
  ])

  const [newKeyword, setNewKeyword] = useState("")
  const [selectedSubreddit, setSelectedSubreddit] = useState("")

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const addKeyword = () => {
    if (newKeyword.trim() && selectedSubreddit) {
      const keyword: Keyword = {
        id: Date.now(),
        keyword: newKeyword.trim(),
        subreddit: selectedSubreddit,
        mentions: 0,
        status: "active",
        lastMention: "Just added"
      }
      setKeywords([...keywords, keyword])
      setNewKeyword("")
      setSelectedSubreddit("")
    }
  }

  const deleteKeyword = (id: number) => {
    setKeywords(keywords.filter(k => k.id !== id))
  }

  const toggleStatus = (id: number) => {
    setKeywords(keywords.map(k =>
      k.id === id ? { ...k, status: k.status === "active" ? "paused" : "active" } : k
    ))
  }

  const totalMentions = keywords.reduce((sum, k) => sum + k.mentions, 0)
  const activeKeywords = keywords.filter(k => k.status === "active").length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Activity className="h-4 w-4 mr-2" />
            Reddit Monitor
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Keyword Monitoring Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track and analyze keyword mentions across your favorite subreddits in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Keywords</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{activeKeywords}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently monitoring</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalMentions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                All time
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subreddits</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{new Set(keywords.map(k => k.subreddit)).size}</div>
              <p className="text-xs text-muted-foreground mt-1">Communities tracked</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border border-gray-200/60">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Keyword
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter keyword to monitor..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="flex-1 h-12 text-base border-gray-200/60 shadow-sm"
              />
              <Select value={selectedSubreddit} onValueChange={setSelectedSubreddit}>
                <SelectTrigger className="sm:w-64 h-12 border-gray-200/60 shadow-sm">
                  <SelectValue placeholder="Select subreddit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webdev">r/webdev</SelectItem>
                  <SelectItem value="reactjs">r/reactjs</SelectItem>
                  <SelectItem value="programming">r/programming</SelectItem>
                  <SelectItem value="javascript">r/javascript</SelectItem>
                  <SelectItem value="nextjs">r/nextjs</SelectItem>
                  <SelectItem value="technology">r/technology</SelectItem>
                  <SelectItem value="startups">r/startups</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={addKeyword}
                disabled={!newKeyword.trim() || !selectedSubreddit}
                className="h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-black text-white hover:bg-black/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Keyword
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border border-gray-200/60">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Monitored Keywords
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {keywords.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No keywords yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Start monitoring Reddit conversations by adding your first keyword above
                  </p>
                </div>
              ) : (
                keywords.map((keyword) => (
                  <div key={keyword.id} className="group bg-card border border-gray-200/60 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-foreground">{keyword.keyword}</h3>
                          <Badge variant="outline">
                            r/{keyword.subreddit}
                          </Badge>
                          <Badge variant={keyword.status === "active" ? "default" : "secondary"}>
                            {keyword.status === "active" ? "Active" : "Paused"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <span className="font-medium">{keyword.mentions}</span>
                            <span>mentions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>Last: {keyword.lastMention}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(keyword.id)}
                        >
                          {keyword.status === "active" ? "Pause" : "Resume"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteKeyword(keyword.id)}
                          className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
