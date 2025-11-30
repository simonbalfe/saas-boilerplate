"use client"

import { useState } from "react"
import { authClient } from "@/src/services/better-auth/auth-client"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"

export function AuthPage({
  className,
  searchParams,
  ...props
}: React.ComponentProps<"div"> & {
  searchParams?: any
}) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const result = await authClient.signUp.email({
          email,
          password,
          name
        })
        if (result.error) {
          setError(result.error.message || "Something went wrong")
        } else {
          router.push("/dashboard")
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password
        })
        if (result.error) {
          setError(result.error.message || "Invalid email or password")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      })
    } catch (err) {
      setError("Failed to connect with Google")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className={cn("w-full max-w-[360px]", className)} {...props}>
        <Card className="border border-gray-200/60 shadow-xl rounded-xl overflow-hidden bg-white">
          <CardContent className="p-6 flex flex-col gap-6">
            {/* Toggle */}
            <div className="flex p-1 bg-gray-100/50 rounded-lg border border-gray-200/60">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false)
                  setError(null)
                }}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-out",
                  !isSignUp
                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                    : "bg-transparent text-muted-foreground hover:text-black hover:bg-white/50"
                )}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true)
                  setError(null)
                }}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-out",
                  isSignUp
                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                    : "bg-transparent text-muted-foreground hover:text-black hover:bg-white/50"
                )}
              >
                Sign up
              </button>
            </div>

            {/* Google Button */}
            <div className="space-y-6">
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleAuth}
                className="w-full h-10 text-sm font-medium border border-gray-200/60 rounded-lg hover:bg-gray-50 bg-white shadow-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2.5">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative flex items-center justify-center text-sm">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative bg-white px-2 text-muted-foreground">
                  or
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="py-2.5 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Name Field (Sign Up only) */}
              {isSignUp && (
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-black">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 text-sm shadow-none border-gray-200/60 rounded-lg"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-black">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 text-sm shadow-none border-gray-200/60 rounded-lg"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-black">
                    Password
                  </label>
                  {!isSignUp && (
                    <a
                      href="/auth/reset-password"
                      className="text-xs text-muted-foreground hover:text-black transition-colors focus:outline-none focus:underline"
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 text-sm pr-10 shadow-none border-gray-200/60 rounded-lg"
                    placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 text-sm font-medium bg-black hover:bg-black/90 text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  isSignUp ? "Sign Up" : "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
