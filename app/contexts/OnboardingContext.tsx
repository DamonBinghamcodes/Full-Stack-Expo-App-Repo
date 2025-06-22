/**
 * OnboardingContext.tsx
 *
 * This file implements the onboarding state management system using React Context.
 * It tracks whether a user has completed the onboarding process and persists this
 * state in AsyncStorage. It also handles automatic navigation based on onboarding status.
 *
 * Key Features:
 * - Persists onboarding status using AsyncStorage
 * - Provides automatic navigation routing based on onboarding status
 * - Exposes methods to check and update onboarding status
 */

import { authClient } from "@/lib/auth-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the shape of our context data
type OnboardingContextType = {
    isOnboarded: boolean;
    resetIsOnboarded: () => void;
    setIsOnboarded: (value: boolean) => void;
};

// Create the context with undefined as initial value
export const OnboardingContext = createContext<
    OnboardingContextType | undefined
>(undefined);

// Storage key for persisting onboarding status
const STORAGE_KEY = "hasCompletedOnboarding";

/**
 * OnboardingProvider Component
 *
 * This component provides onboarding state management and automatic navigation:
 * - Loads initial onboarding status from AsyncStorage
 * - Handles navigation based on onboarding status:
 *   * Not onboarded → redirects to /onboarding
 *   * Onboarded → allows access to auth and main app screens
 * - Provides methods to update onboarding status
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const segments = useSegments();

    const { data: session } = authClient.useSession();

    // null means "loading", boolean means "loaded"
    const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    // Load initial onboarding status when component mounts
    useEffect(() => {
        checkOnboardingStatus();
    }, []);

    // Set layout ready after a short delay to ensure root layout is mounted
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLayoutReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Handle automatic navigation based on onboarding status
    useEffect(() => {
        if (!isLayoutReady || isOnboarded === null) return; // Wait for layout and loading

        const inAuthGroup = segments[0] === "(auth)";
        const inOnboardingGroup = segments[0] === "onboarding";
        const inTabsGroup = segments[0] === "(tabs)";

        // If we're already in the correct place, don't redirect
        if (
            (inAuthGroup && !session?.user) || // In auth when not logged in
            (inOnboardingGroup && !isOnboarded && session?.user) || // In onboarding when not onboarded and logged in
            (inTabsGroup && isOnboarded && session?.user) // In tabs when onboarded and logged in
        ) {
            return;
        }

        // Navigation rules:
        // 1. Not logged in users must sign in first
        if (!session?.user && !inAuthGroup) {
            router.replace("/(auth)");
            return;
        }

        // 2. Direct to onboarding if not onboarded and user is authenticated
        if (!isOnboarded && session?.user && !inOnboardingGroup) {
            router.replace("/onboarding");
            return;
        }

        // 3. Direct to main app if onboarded and authenticated
        if (isOnboarded && session?.user && !inTabsGroup) {
            router.replace("/(tabs)");
            return;
        }
    }, [isLayoutReady, isOnboarded, segments, session]);

    /**
     * Loads the onboarding status from AsyncStorage
     * Sets the status to false if not found or if there's an error
     */
    const checkOnboardingStatus = async () => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            setIsOnboarded(value === "true");
        } catch (error) {
            console.error("Error checking onboarding status:", error);
            setIsOnboarded(false);
        }
    };

    /**
     * Updates the onboarding status both in state and AsyncStorage
     */
    const handleSetIsOnboarded = async (value: boolean) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, String(value));
            setIsOnboarded(value);
        } catch (error) {
            console.error("Error setting onboarding status:", error);
        }
    };

    const resetIsOnboarded = async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setIsOnboarded(false);
    };

    return (
        <OnboardingContext.Provider
            value={{
                isOnboarded: isOnboarded ?? false,
                resetIsOnboarded,
                setIsOnboarded: handleSetIsOnboarded,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}
