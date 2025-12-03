"use client"

import { LayoutDashboard, Settings, Menu, Zap, Crown, CheckSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCheckout } from '@/src/hooks/use-checkout'
import { checkSubscription } from '@/src/actions/check-subscription'
import { useUser } from '@/src/hooks/use-user'
import { Avatar } from '@/src/components/molecules'
import { ThemePicker } from './theme-picker'

export const Sidebar = () => {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, loading } = useUser()
  const { handleCheckout, isLoading } = useCheckout(user?.id)
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (user) {
      checkSubscription().then((data) => {
        setIsSubscribed(data.isSubscribed)
      })
    }
  }, [user])

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/todos', icon: CheckSquare, label: 'Todos' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="btn btn-square btn-ghost lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          lg:w-52
        `}
      >
        <div className="h-full bg-base-200 flex flex-col shadow-lg">
          {/* App Title */}
          <div className="p-4 border-b border-base-300 flex items-center justify-between">
            <h1 className="text-xl font-bold">SaasTemplate</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="menu space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={active ? 'bg-primary text-primary-content flex items-center gap-3' : 'flex items-center gap-3'}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-base-300">
             <ThemePicker />
          </div>
          {loading || (user && isSubscribed === null) ? (
            <div className="p-4 border-t border-base-300">
              <div className="skeleton h-14 w-full"></div>
            </div>
          ) : user ? (
            <div className="p-4 border-t border-base-300 space-y-3">
              {/* User Profile Dropdown */}
              <div className="dropdown dropdown-top w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 p-2 hover:bg-base-300 rounded-box cursor-pointer transition-colors"
                >
                  <Avatar
                    src={user.image}
                    alt={user.name || 'User'}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                  </div>
                  {isSubscribed && (
                    <Crown className="h-5 w-5 text-primary shrink-0" />
                  )}
                </div>

                {/* Dropdown Menu */}
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-full p-2 shadow-lg mt-2">
                  <li>
                    <Link href="/settings" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Upgrade Button */}
              {!isSubscribed && (
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="btn btn-primary btn-sm w-full gap-2"
                >
                  <Zap className="h-4 w-4" />
                  <span>Upgrade to Premium</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-4 border-t border-base-300">
              <a href="/auth" className="btn btn-primary w-full">
                Sign In
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-base-300">
            <div className="text-xs text-base-content/60 text-center">
              v1.0.0
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-base-content/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
