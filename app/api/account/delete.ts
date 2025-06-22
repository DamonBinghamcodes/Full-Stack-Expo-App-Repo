/**
 * Account Deletion API
 *
 * This module provides functionality for deleting user accounts.
 * It includes both the raw API call function and a React Query mutation hook.
 *
 * Features:
 * - Authenticated DELETE request to account endpoint
 * - Comprehensive error handling and logging
 * - React Query integration for state management
 *
 * Security:
 * - Requires authentication cookie
 * - Uses fetchWithAuth for secure requests
 *
 * Usage:
 * ```typescript
 * const { mutate: deleteAccount } = useDeleteAccount();
 * deleteAccount();
 * ```
 *
 * IMPORTANT: This is needed to pass Apple verification. They require a way to hard delete user accounts.
 */

import { API_URL } from "@/config/api";
import { fetchWithAuth } from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "../../lib/auth-client";

/**
 * Response type for account deletion
 */
export type DeleteAccountResponse = {
    success: boolean;
};

/**
 * Error response type
 */
export type ErrorResponse = {
    error: string;
    details?: string;
};

/**
 * Deletes the user's account
 *
 * Makes an authenticated DELETE request to the account endpoint.
 * Includes comprehensive logging for debugging and monitoring.
 *
 * @throws {Error} If the request fails or returns non-200 status
 * @returns {Promise<DeleteAccountResponse>} Success status of the deletion
 */
export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
    console.log("[Account API] Attempting to delete account");
    console.log("[Account API] Using API URL:", API_URL);

    try {
        const cookies = await authClient.getCookie();
        console.log("[Account API] Got auth cookie:", !!cookies);

        const response = await fetchWithAuth(`${API_URL}/api/account`, {
            method: "DELETE",
        });

        console.log("[Account API] Response status:", response.status);

        const responseData = await response.json();
        console.log("[Account API] Response data:", responseData);

        if (!response.ok) {
            const errorData = responseData as ErrorResponse;
            const errorMessage = errorData.details
                ? `${errorData.error}: ${errorData.details}`
                : errorData.error;
            console.error("[Account API] Error Response:", errorMessage);
            throw new Error(errorMessage);
        }

        return responseData as DeleteAccountResponse;
    } catch (error) {
        console.error("[Account API] Error:", error);
        if (error instanceof Error) {
            console.error("[Account API] Error details:", {
                message: error.message,
                stack: error.stack,
            });
        }
        throw error;
    }
};

/**
 * React Query mutation hook for account deletion
 *
 * Provides a convenient way to handle account deletion in React components
 * with built-in loading, error, and success states.
 *
 * @returns {UseMutationResult} React Query mutation object
 */
export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: deleteAccount,
    });
};
