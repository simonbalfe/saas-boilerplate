"use client"

import { useState, useEffect, Suspense } from "react"
import { authClient } from "@/src/services/better-auth/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token")
    }

    const errorParam = searchParams.get("error")
    if (errorParam === "INVALID_TOKEN") {
      setError("This password reset link is invalid or has expired")
    }
  }, [token, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("Invalid reset token")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)

    try {
      const result = await authClient.resetPassword({
        newPassword,
        token,
      })

      if (result.error) {
        setError(result.error.message || "Failed to reset password")
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth")
        }, 2000)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Password Reset Successful</h2>
            <p className="text-base-content/60">
              Your password has been updated. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create New Password</h2>
          <p className="text-base-content/60">
            Enter your new password below
          </p>
          <form onSubmit={handleSubmit}>
            {error && (
              <div role="alert" className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            <div className="form-control">
              <label className="label" htmlFor="newPassword">
                <span className="label-text">New Password</span>
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={!token || !!error}
                minLength={8}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={!token || !!error}
                minLength={8}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={loading || !token || !!error}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
              <div className="text-center text-sm text-base-content/60 mt-4">
                <Link
                  href="/auth"
                  className="link link-hover"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const ResetPassword = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-base-200">
          <div className="card bg-base-100 w-full max-w-md shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Loading...</h2>
              <p className="opacity-60">Please wait</p>
            </div>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
