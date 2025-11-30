'use server'
import { Resend } from 'resend';
import WelcomeEmail from '@/src/components/emails/welcome';
import { db } from '@/src/services/db';
import { user, userProfile } from '@/src/services/db/schema';
import { eq } from 'drizzle-orm';
import env from '../env';

const resend = new Resend(env.RESEND_API_KEY);

type EmailData = {
    email: string;
    name: string;
    userId: string;
}

export async function sendWelcomeEmail(emailData: EmailData) {
    const { email, name, userId } = emailData;
    try {
        const [userData] = await db.select()
            .from(user)
            .where(eq(user.id, userId))
            .limit(1);

        if (!userData) {
            return { success: false, error: 'User not found' };
        }

        const [profile] = await db.select()
            .from(userProfile)
            .where(eq(userProfile.userId, userId))
            .limit(1);

        if (profile?.welcomeEmailSent) {
            console.log("Welcome email already sent to", email);
            return { success: true, data: null, alreadySent: true };
        }

        const fromEmail = env.RESEND_FROM

        if (!fromEmail) {
            return { success: false, error: 'Email not found' };
        }

        const data = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Welcome to Our Platform',
            react: WelcomeEmail({ name })
        });

        await db.update(userProfile)
            .set({ welcomeEmailSent: true })
            .where(eq(userProfile.userId, userId));

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}