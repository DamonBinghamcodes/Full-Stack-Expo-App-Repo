/**
 * Authentication Client Configuration
 *
 * This module configures the authentication client for the application
 * using the better-auth library with Expo-specific integrations.
 *
 * Features:
 * - Secure token storage using Expo's SecureStore
 * - Custom URL scheme for deep linking
 * - Integration with the application's API
 *
 * Security:
 * - Uses SecureStore for encrypted storage
 * - Custom storage prefix for isolation
 * - Configurable URL scheme for deep linking
 *
 * Dependencies:
 * - @better-auth/expo/client: Expo-specific auth client
 * - better-auth/react: Core authentication library
 * - expo-secure-store: Secure storage implementation
 *
 * Usage:
 * Import the authClient instance to handle authentication:
 * import { authClient } from '@/lib/auth-client';
 */

import { API_URL } from "@/config/api";
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

/**
 * Authentication client instance configured for the application
 *
 * This client handles:
 * - Token management
 * - Secure storage
 * - Deep linking
 * - API integration
 */
export const authClient = createAuthClient({
    baseURL: API_URL || "http://localhost:3000",
    plugins: [
        expoClient({
            scheme: "yourapp",
            storagePrefix: "yourapp",
            storage: SecureStore,
        }),
    ],
});
