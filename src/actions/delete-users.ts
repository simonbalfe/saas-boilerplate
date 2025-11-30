'use server'
import { db } from '@/src/services/db'
import { user } from '@/src/services/db/schema'
import { eq } from 'drizzle-orm'

export async function deleteCurrentUser(userId: string) {
    try {
        await db.delete(user).where(eq(user.id, userId))
        return { success: true }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Failed to delete user' }
    }
}