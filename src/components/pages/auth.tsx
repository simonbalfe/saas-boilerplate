"use client"

import { useState } from "react"
import { authClient } from "@/src/services/better-auth/auth-client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, AlertCircle, Loader2, Mail, Lock, User } from "lucide-react"
import clsx from "clsx"

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
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      {/* Aesthetic-Usability: Optimal width for readability */}
      <div className={clsx("w-full max-w-[400px]", className)} {...props}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8 gap-6">
            {/* Header with Welcome Message */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to SaasTemplate
              </h1>
              <p className="text-base font-medium">
                {isSignUp ? "Create an account" : "Sign in to your account"}
              </p>
              <p className="text-sm text-base-content/60">
                {isSignUp
                  ? "Enter your details below to get started"
                  : "Enter your details below to continue"}
              </p>
            </div>

            {/* Google Auth - Prominent but neutral */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="btn btn-outline w-full gap-3 normal-case"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </button>

            <div className="divider text-xs uppercase text-base-content/50">Or continue with email</div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div role="alert" className="alert alert-error py-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {isSignUp && (
                <div className="form-control space-y-2">
                  <label className="input input-bordered flex items-center gap-3">
                    <User className="h-4 w-4 opacity-50" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="grow"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                </div>
              )}

              <div className="form-control space-y-2">
                <label className="input input-bordered flex items-center gap-3">
                  <Mail className="h-4 w-4 opacity-50" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="form-control space-y-2">
                <div className="relative">
                  <label className="input input-bordered flex items-center gap-3">
                    <Lock className="h-4 w-4 opacity-50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="grow"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-ghost btn-xs btn-circle hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 opacity-50" />
                      ) : (
                        <Eye className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </label>
                </div>
                {!isSignUp && (
                  <div className="flex justify-end">
                    <a href="/auth/reset-password" className="link link-hover text-xs text-base-content/60">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  isSignUp ? "Create account" : "Sign In"
                )}
              </button>
            </form>

            <div className="text-center text-sm">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(false)
                      setError(null)
                    }}
                    className="link  font-semibold no-underline hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(true)
                      setError(null)
                    }}
                    className="link font-semibold no-underline hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
``