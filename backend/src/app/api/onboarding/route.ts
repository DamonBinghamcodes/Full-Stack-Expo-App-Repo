/**
 * Onboarding API Route
 *
 * This endpoint handles saving and retrieving user onboarding answers.
 * It's a protected route that requires authentication.
 *
 * Security measures:
 * - Requires valid session
 * - Verifies user ID from session
 *
 * Endpoints:
 * - POST /api/onboarding - Save onboarding answers
 * - GET /api/onboarding - Retrieve onboarding answers
 */

import { getSession } from "@/app/utils/getSession";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { experience, goal, interest } = await request.json();

        // Validate required fields
        if (!experience || !goal || !interest) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Upsert onboarding answers (create or update)
        const answers = await db.onboardingAnswers.upsert({
            where: { userId: session.user.id },
            update: { experience, goal, interest },
            create: {
                userId: session.user.id,
                experience,
                goal,
                interest,
            },
        });

        return NextResponse.json(answers);
    } catch (error) {
        console.error("Error saving onboarding answers:", error);
        return NextResponse.json(
            { error: "Failed to save onboarding answers" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const answers = await db.onboardingAnswers.findUnique({
            where: { userId: session.user.id },
        });

        if (!answers) {
            return NextResponse.json(null, { status: 404 });
        }

        return NextResponse.json(answers);
    } catch (error) {
        console.error("Error retrieving onboarding answers:", error);
        return NextResponse.json(
            { error: "Failed to retrieve onboarding answers" },
            { status: 500 }
        );
    }
}
