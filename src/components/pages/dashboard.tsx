"use client"

import { useUser } from "@/src/hooks/use-user"
import { useState } from "react"
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
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
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
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="badge badge-lg badge-primary gap-2">
            <Activity className="h-4 w-4" />
            Reddit Monitor
          </div>
          <h1 className="text-4xl font-bold">
            Keyword Monitoring Dashboard
          </h1>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Track and analyze keyword mentions across your favorite subreddits in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-sm">Active Keywords</h2>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold">{activeKeywords}</div>
              <p className="text-xs text-base-content/60">Currently monitoring</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-sm">Total Mentions</h2>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold">{totalMentions}</div>
              <p className="text-xs text-base-content/60">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                All time
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-sm">Subreddits</h2>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold">{new Set(keywords.map(k => k.subreddit)).size}</div>
              <p className="text-xs text-base-content/60">Communities tracked</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Keyword
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter keyword to monitor..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="input input-bordered flex-1"
              />
              <select
                value={selectedSubreddit}
                onChange={(e) => setSelectedSubreddit(e.target.value)}
                className="select select-bordered sm:w-64"
              >
                <option value="" disabled>Select subreddit</option>
                <option value="webdev">r/webdev</option>
                <option value="reactjs">r/reactjs</option>
                <option value="programming">r/programming</option>
                <option value="javascript">r/javascript</option>
                <option value="nextjs">r/nextjs</option>
                <option value="technology">r/technology</option>
                <option value="startups">r/startups</option>
              </select>
              <button
                onClick={addKeyword}
                disabled={!newKeyword.trim() || !selectedSubreddit}
                className="btn btn-primary"
              >
                <Plus className="h-4 w-4" />
                Add Keyword
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Monitored Keywords
            </h2>
            <div className="space-y-4">
              {keywords.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mb-6">
                    <Search className="h-12 w-12 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No keywords yet</h3>
                  <p className="text-base-content/60 max-w-md mx-auto">
                    Start monitoring Reddit conversations by adding your first keyword above
                  </p>
                </div>
              ) : (
                keywords.map((keyword) => (
                  <div key={keyword.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold">{keyword.keyword}</h3>
                            <span className="badge badge-outline">
                              r/{keyword.subreddit}
                            </span>
                            <span className={`badge ${keyword.status === "active" ? "badge-primary" : "badge-secondary"}`}>
                              {keyword.status === "active" ? "Active" : "Paused"}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-base-content/60">
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
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => toggleStatus(keyword.id)}
                          >
                            {keyword.status === "active" ? "Pause" : "Resume"}
                          </button>
                          <button
                            className="btn btn-outline btn-sm btn-error"
                            onClick={() => deleteKeyword(keyword.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
