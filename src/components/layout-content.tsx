"use client"

import { useUser } from '@/src/hooks/use-user'
import { Navbar } from '@/src/components/navbar'
import { Sidebar } from '@/src/components/sidebar'

export const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser()

  // Show loading skeleton while checking auth status
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  // Not authenticated: completely standalone page
  if (!user) {
    return <>{children}</>
  }

  // Authenticated: full sidebar + navbar layout
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
