"use client"

import { useUser } from "@/src/hooks/use-user"
import { User, Mail, Calendar } from "lucide-react"

export function Settings() {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not Authenticated</h2>
          <a href="/auth" className="btn btn-primary">Sign In</a>
        </div>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-2xl mx-auto p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-base-content/60">Manage your account information</p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Account Information</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full">
                    {user.image ? (
                      <img src={user.image} alt={user.name || 'User'} />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-base-300">
                        <User className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-base-content/60">{user.email}</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-base-content/60" />
                  <div>
                    <p className="text-sm text-base-content/60">Name</p>
                    <p className="font-medium">{user.name || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-base-content/60" />
                  <div>
                    <p className="text-sm text-base-content/60">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-base-content/60" />
                  <div>
                    <p className="text-sm text-base-content/60">Member Since</p>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
