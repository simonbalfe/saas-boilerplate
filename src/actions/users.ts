"use server"

import { auth } from "@/src/services/better-auth/auth"

export const signIn = async (email: string, password: string) => {
    try {
        const result = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        return { success: true, data: result }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to sign in" }
    }
}

export const signUp = async (email: string, password: string, name: string) => {
    try {
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            }
        })
        return { success: true, data: result }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to sign up" }
    }
}