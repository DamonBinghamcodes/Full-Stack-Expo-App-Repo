/**
 * Authentication API Route Handler
 *
 * This file creates the authentication endpoints using Next.js App Router.
 * The [...auth] dynamic route segment captures all auth-related paths.
 *
 * What this does:
 * - Creates endpoints for login, signup, social auth, etc.
 * - Handles both GET and POST requests for auth flows
 * - Manages OAuth callbacks from providers (Google, Apple)
 * - Handles session management
 *
 * Example endpoints created:
 * - POST /api/auth/login
 * - POST /api/auth/register
 * - GET /api/auth/session
 * - GET/POST /api/auth/oauth/google
 * - GET/POST /api/auth/oauth/apple
 */

import { auth } from "@/auth";
import { NextRequest } from "next/server";

// Get the pre-configured request handler from our auth setup
const handler = auth.handler;

// Export handlers for both GET and POST methods
// This enables the route to handle various auth flows (login, callbacks, session checks, etc.)
export async function GET(req: NextRequest) {
    console.log("Auth GET request:", req.url);
    return handler(req);
}

export async function POST(req: NextRequest) {
    console.log("Auth POST request:", req.url);
    return handler(req);
}
