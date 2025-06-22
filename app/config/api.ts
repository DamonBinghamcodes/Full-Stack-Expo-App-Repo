/**
 * API Configuration
 *
 * This module handles the API URL configuration for the application.
 * It provides a centralized way to manage the base API URL across the app.
 *
 * Configuration:
 * - Uses environment variable EXPO_PUBLIC_BASE_API_URL
 * - Falls back to localhost:3000 if not configured
 *
 * Usage:
 * Import this constant to make API calls:
 * import { API_URL } from '@/config/api';
 *
 * Security:
 * - Environment variable must be set in production
 * - Console warning if URL is not configured
 */

export const API_URL =
    process.env.EXPO_PUBLIC_BASE_API_URL || "http://localhost:3000";

if (!API_URL) {
    console.error(
        "[API] No API URL configured. Please set EXPO_PUBLIC_BASE_URL environment variable."
    );
}
