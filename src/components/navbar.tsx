"use client"

import { authClient } from '@/src/services/better-auth/auth-client'
import { useCheckout } from '@/src/hooks/use-checkout'
import { LogOut, Zap, Crown, User, Trash2, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { checkSubscription } from '../actions/check-subscription'
import { deleteCurrentUser } from '@/src/actions/delete-users'
import { useUser } from '@/src/hooks/use-user'
import { useRouter } from 'next/navigation'

export const Navbar = () => {

    const appName = "RedditBot"

    const { user, loading } = useUser()
    const { handleCheckout, isLoading } = useCheckout(user?.id)
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (user) {
            checkSubscription().then((data) => {
                setIsSubscribed(data.isSubscribed)
            })
        }
    }, [user])

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

    if (loading || (user && isSubscribed === null)) {
        return (
            <nav className="navbar bg-base-100 shadow-sm px-4">
                <div className="flex-1">
                    <span className="font-bold text-xl">{appName}</span>
                </div>
                <div className="flex-none">
                    <div className="skeleton h-8 w-24"></div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1">
                <span className="font-bold text-xl">{appName}</span>
            </div>
            <div className="flex-none">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
                            <div className="avatar">
                                <div className="w-8 h-8 rounded-full">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name || 'User'} />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-base-300">
                                            <User className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm font-medium">{user.name}</span>
                            {isSubscribed && (
                                <span className="badge badge-primary gap-1">
                                    <Crown className="h-3 w-3" />
                                    Premium
                                </span>
                            )}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-56 p-2 shadow-lg">
                            <li className="menu-title">{user.email}</li>
                            {!isSubscribed && (
                                <li>
                                    <button onClick={handleCheckout} disabled={isLoading}>
                                        <Zap className="h-4 w-4" />
                                        Upgrade to Premium
                                    </button>
                                </li>
                            )}
                            <li>
                                <a href="/settings">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </a>
                            </li>
                            <li>
                                <button onClick={handleDeleteAccount} className="text-error">
                                    <Trash2 className="h-4 w-4" />
                                    Delete Account
                                </button>
                            </li>
                            <li>
                                <button onClick={handleSignOut}>
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <a href="/auth" className="btn btn-primary">Sign In</a>
                )}
            </div>
        </nav>
    )
}