/**
 * Prisma Client Configuration
 *
 * This file sets up a singleton instance of PrismaClient to prevent multiple database connections
 * during development. In production, it creates a fresh instance.
 *
 * Why this pattern?
 * - In development, Next.js hot reloading can create multiple instances of PrismaClient
 * - Multiple instances = multiple database connections = potential performance issues
 * - We use global caching in development to prevent this
 * - In production, we create a fresh instance as hot reloading isn't a concern
 */

import { PrismaClient } from "@prisma/client";

// Extend global type to include our cached client
declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

// Production: Create fresh instance
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
        log: ["query", "error", "warn"], // Enable logging for debugging
    });
}
// Development: Use cached instance or create new one
else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient({
            log: ["query", "error", "warn"], // Enable logging for debugging
        });
    }
    prisma = global.cachedPrisma;
}

// Export the prisma instance as 'db' for a cleaner import name
export const db = prisma;
