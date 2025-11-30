import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/src/services/better-auth/auth'
import { headers } from 'next/headers'
import { STRIPE_CACHE_KV, STRIPE_CUSTOMER_ID_KV } from './services/stripe/stripe-cache'
import { STRIPE_SUB_CACHE } from './types/types'

async function getStripeSubByUserId(userId: string) {
    const stripeCustomerId = await STRIPE_CUSTOMER_ID_KV.get(userId)
    if (!stripeCustomerId) return null
    return STRIPE_CACHE_KV.get(stripeCustomerId as string)
}

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/dashboard/premium')) {
        const stripeSub = await getStripeSubByUserId(session.user.id) as STRIPE_SUB_CACHE;
        const isSubscribed = stripeSub?.status === 'active';

        if (!isSubscribed) {
            return NextResponse.redirect(new URL('/subscribe', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"]
}
