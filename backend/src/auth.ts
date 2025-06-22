/**
 * Authentication Configuration using Better Auth
 * This file sets up the main authentication system for both web and mobile clients.
 * It configures various authentication methods, session handling, and social login providers.
 */

import { expo } from "@better-auth/expo";
import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Initialize Prisma client for database operations
const prisma = new PrismaClient();

/**
 * Main authentication configuration
 * This exports the configured auth instance that will be used throughout the application
 */
export const auth = betterAuth({
    // Base URL for authentication endpoints
    baseURL: process.env.AUTH_BASE_URL as string,

    // Configure database adapter using Prisma
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    // Session configuration
    session: {
        expiresIn: 60 * 60 * 24 * 90, // Session expires in 90 days
        updateAge: 60 * 60 * 24 * 7, // Refresh session every 7 days
        freshAge: 0, // Time until session needs refreshing
    },

    // Trusted origins that are allowed to make authentication requests
    // This is crucial for security and cross-origin authentication
    trustedOrigins: [
        "https://appleid.apple.com", // Required for Apple Sign In
        "yourapp://", // Mobile app deep linking scheme
        "exp://", // Expo development scheme
        "https://your-api-url.com", // Your API URL
    ],

    // Enable traditional email and password authentication
    emailAndPassword: {
        enabled: true,
    },

    // Configure social login providers
    socialProviders: {
        // Google OAuth configuration
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        // Apple Sign In configuration - It is important to note, for Apple submission, if you try to submit your app with Google Auth only, they force you to add an OAuth method that allows users to keep their email private. Apple Sign In is one way to do this and it is what they recommend (of course).
        apple: {
            clientId: process.env.APPLE_CLIENT_ID as string,
            clientSecret: process.env.APPLE_CLIENT_SECRET as string,
            appBundleIdentifier: process.env
                .APPLE_APP_BUNDLE_IDENTIFIER as string,
        },
    },

    // Enable Expo support for mobile authentication flows
    plugins: [expo()],
});
