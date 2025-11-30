"use server"
import { auth } from '@/src/services/better-auth/auth'
import { STRIPE_SUB_CACHE } from '../types/types'
import { STRIPE_CACHE_KV, STRIPE_CUSTOMER_ID_KV } from '../services/stripe/stripe-cache'
import { headers } from 'next/headers'

async function getStripeSubByUserId(userId: string) {
    const stripeCustomerId = await STRIPE_CUSTOMER_ID_KV.get(userId)

    if (!stripeCustomerId) return null

    return STRIPE_CACHE_KV.get(stripeCustomerId as string)
}

export async function checkSubscription() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        return { isSubscribed: false }
    }
    const stripeSub = await getStripeSubByUserId(session.user.id) as STRIPE_SUB_CACHE
    return { isSubscribed: stripeSub?.status === 'active' }
}