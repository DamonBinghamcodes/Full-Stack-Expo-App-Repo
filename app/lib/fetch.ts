import { authClient } from "@/lib/auth-client";

/**
 * A wrapper around the native fetch API that automatically handles authentication.
 * This utility function adds authentication cookies and common headers to every request.
 *
 * Key features:
 * - Automatically includes auth cookies from the auth client
 * - Sets default headers for JSON communication
 * - Maintains credentials across requests
 *
 * @example
 * // Example usage:
 * const response = await fetchWithAuth(`${API_URL}/api/account`, {
 *     method: "DELETE",
 * });
 *
 * @param input - The URL to fetch from (can be a string or Request object)
 * @param init - Optional fetch configuration (same as native fetch options)
 * @returns Promise<Response> - Returns a fetch Response promise
 */
export async function fetchWithAuth(
    input: RequestInfo,
    init: RequestInit = {}
) {
    // Get authentication cookies from the auth client
    const cookies = await authClient.getCookie();

    if (!cookies) {
        throw new Error("No authentication token found. Please log in again.");
    }

    // Construct headers with defaults and merge with any provided headers
    const headers = {
        Accept: "application/json", // Expect JSON responses
        "Content-Type": "application/json", // Send JSON data
        ...(init.headers || {}), // Include any custom headers
        Cookie: cookies, // Add auth cookies
        Authorization: `Bearer ${cookies}`, // Also add as Bearer token for compatibility
    };

    // Return fetch call with merged configuration
    return fetch(input, {
        ...init, // Spread any provided fetch options
        headers, // Use our constructed headers
        credentials: "include", // Always send credentials (cookies) with request
    });
}
