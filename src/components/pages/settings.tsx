"use client"

import { useUser } from "@/src/hooks/use-user"
import { User, Mail, Calendar, LogOut, Trash2 } from "lucide-react"
import { authClient } from '@/src/services/better-auth/auth-client'
import { deleteCurrentUser } from '@/src/actions/delete-users'
import { useRouter } from 'next/navigation'
import { Avatar, InfoRow, SectionCard } from "@/src/components/molecules"

export function Settings() {
  const { user, loading } = useUser()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Not Authenticated</h2>
          <p className="text-base-content/60">Please sign in to view your settings.</p>
          <a href="/auth" className="btn btn-primary">Sign In</a>
        </div>
      </div>
    )
  }

  const formatDate = (date?: string | Date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/auth')
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      if (user?.id) {
        await deleteCurrentUser(user.id)
        await authClient.signOut()
        router.push('/auth')
      }
    }
  }

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-base-content/60">Manage your account and preferences</p>
        </div>

        {/* Account Information */}
        <SectionCard title="Profile">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-base-200">
            <Avatar
              src={user.image}
              alt={user.name || 'User'}
              size="lg"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">{user.name}`</h3>
              <p className="text-base-content/60">{user.email}</p>
              <div className="badge badge-neutral badge-sm mt-1">User</div>
            </div>
          </div>

          <div className="pt-6 grid gap-4">
            <InfoRow
              icon={User}
              label="Full Name"
              value={user.name || "Not provided"}
            />
            <InfoRow
              icon={Mail}
              label="Email Address"
              value={user.email}
            />
            <InfoRow
              icon={Calendar}
              label="Member Since"
              value={formatDate(user.createdAt)}
            />
          </div>
        </SectionCard>

        {/* Account Actions */}
        <SectionCard title="Account Actions">
          <div className="space-y-4">
            {/* Sign Out */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-base-200 rounded-lg">
                  <LogOut className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Sign Out</h3>
                  <p className="text-sm text-base-content/60">Sign out of your current session</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost btn-sm"
              >
                Sign Out
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-error transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 text-error rounded-lg">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-error">Delete Account</h3>
                  <p className="text-sm text-error">Permanently remove your account and data</p>
                </div>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="btn btn-error btn-outline btn-sm"
              >
                Delete Account
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
