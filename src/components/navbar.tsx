"use client"

import { authClient } from '@/src/services/better-auth/auth-client'
import { useCheckout } from '@/src/hooks/use-checkout'
import { Button } from '@/src/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { LogOut, Zap, Crown, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/src/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { checkSubscription } from '../actions/check-subscription'
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

    if (loading || (user && isSubscribed === null)) {
        return (
            <nav className="bg-background border-b border-border shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="font-bold text-xl text-foreground">{appName}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-24 bg-muted animate-pulse rounded-md"></div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="bg-background border-b border-border shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-bold text-xl text-foreground">{appName}</span>
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 border border-border">
                                        <AvatarImage src={user.image || undefined} />
                                        <AvatarFallback>
                                            <User className="h-4 w-4 text-muted-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                                    {isSubscribed && (
                                        <Badge className="flex items-center gap-1">
                                            <Crown className="h-3 w-3" />
                                            Premium
                                        </Badge>
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                                <div className="px-2 py-1.5 text-sm text-muted-foreground">{user.email}</div>
                                <DropdownMenuSeparator />
                                {!isSubscribed && (
                                    <DropdownMenuItem onClick={handleCheckout} disabled={isLoading} className="cursor-pointer">
                                        <Zap className="mr-2 h-4 w-4" />
                                        <span>Upgrade to Premium</span>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <a href="/auth">Sign In</a>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}