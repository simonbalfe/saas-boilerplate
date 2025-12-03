"use client"
import { useUser } from "@/src/hooks/use-user"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    const router = useRouter()
    const { user, loading } = useUser()

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push("/dashboard")
            } else {
                router.push("/auth")
            }
        }
    }, [user, loading, router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
    )
}
