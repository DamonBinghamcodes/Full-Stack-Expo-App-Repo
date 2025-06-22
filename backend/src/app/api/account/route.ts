/**
 * Account Management API Route
 *
 * This endpoint handles account deletion requests.
 * It's a protected route that requires authentication.
 * When called, it permanently deletes the user's account and all associated data.
 *
 * Security measures:
 * - Requires valid session
 * - Verifies user ID from session
 * - Uses Prisma's cascading deletes for data integrity
 *
 * Endpoint: DELETE /api/account
 * Response codes:
 * - 200: Success (account deleted)
 * - 401: Unauthorized (no valid session)
 * - 500: Server error
 *
 * IMPORTANT: This is route is needed to pass Apple verification. They require a way to hard delete user accounts.
 */

import { getSession } from "@/app/utils/getSession";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        // Verify authentication: Get the current user's session
        const session = await getSession();

        // Security check: Ensure we have a valid user ID in the session
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized - No valid session found" },
                { status: 401 }
            );
        }

        // Perform account deletion
        // Prisma will automatically handle deleting related data through cascade rules
        await db.user.delete({
            where: { id: session.user.id },
        });

        // Log the deletion for audit purposes
        console.log("User deleted", session.user.id);

        // Return success response that matches frontend expectations
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Log any errors for debugging and monitoring
        console.error("Error deleting account:", error);

        // Return more detailed error information
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            {
                error: "Failed to delete account",
                details: errorMessage,
            },
            { status: 500 }
        );
    }
}
