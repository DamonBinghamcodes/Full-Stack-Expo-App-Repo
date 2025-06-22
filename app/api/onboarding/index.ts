/**
 * Onboarding API
 *
 * This module provides functionality for saving and retrieving onboarding answers.
 * It includes both raw API call functions and React Query hooks.
 *
 * Features:
 * - Authenticated POST request to save answers
 * - Authenticated GET request to retrieve answers
 * - Comprehensive error handling and logging
 * - React Query integration for state management
 */

import { API_URL } from "@/config/api";
import { OnboardingQuestion } from "@/contexts/OnboardingAnswersContext";
import { fetchWithAuth } from "@/lib/fetch";
import { useMutation, useQuery } from "@tanstack/react-query";

export type OnboardingAnswersResponse = {
    id: string;
    experience: string;
    goal: string;
    interest: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

/**
 * Saves the user's onboarding answers
 */
export const saveOnboardingAnswers = async (answers: {
    [K in OnboardingQuestion["id"]]: string;
}): Promise<OnboardingAnswersResponse> => {
    console.log("[Onboarding API] Saving answers:", answers);

    try {
        const response = await fetchWithAuth(`${API_URL}/api/onboarding`, {
            method: "POST",
            body: JSON.stringify(answers),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[Onboarding API] Error Response:", errorText);
            throw new Error(`Failed to save onboarding answers: ${errorText}`);
        }

        const result = await response.json();
        console.log("[Onboarding API] Success Response:", result);
        return result;
    } catch (error) {
        console.error("[Onboarding API] Error:", error);
        if (error instanceof Error) {
            console.error("[Onboarding API] Error details:", {
                message: error.message,
                stack: error.stack,
            });
        }
        throw error;
    }
};

/**
 * Retrieves the user's onboarding answers
 */
export const getOnboardingAnswers =
    async (): Promise<OnboardingAnswersResponse | null> => {
        console.log("[Onboarding API] Fetching answers");

        try {
            const response = await fetchWithAuth(`${API_URL}/onboarding`);

            if (response.status === 404) {
                return null;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error("[Onboarding API] Error Response:", errorText);
                throw new Error(
                    `Failed to get onboarding answers: ${errorText}`
                );
            }

            const result = await response.json();
            console.log("[Onboarding API] Success Response:", result);
            return result;
        } catch (error) {
            console.error("[Onboarding API] Error:", error);
            if (error instanceof Error) {
                console.error("[Onboarding API] Error details:", {
                    message: error.message,
                    stack: error.stack,
                });
            }
            throw error;
        }
    };

/**
 * React Query mutation hook for saving onboarding answers
 */
export const useSaveOnboardingAnswers = () => {
    return useMutation({
        mutationFn: saveOnboardingAnswers,
    });
};

/**
 * React Query query hook for retrieving onboarding answers
 */
export const useOnboardingAnswers = () => {
    return useQuery({
        queryKey: ["onboardingAnswers"],
        queryFn: getOnboardingAnswers,
    });
};
