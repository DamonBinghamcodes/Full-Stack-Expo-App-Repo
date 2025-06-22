/**
 * useOnboarding.ts
 *
 * A custom React hook that provides access to the onboarding context throughout the application.
 * This hook simplifies accessing and updating the onboarding state from any component.
 *
 * Returns:
 * - isOnboarded: boolean - Whether the user has completed onboarding
 * - setIsOnboarded: (value: boolean) => void - Function to update onboarding status
 *
 * Example usage:
 * ```tsx
 * function MyComponent() {
 *   const { isOnboarded, setIsOnboarded } = useOnboarding();
 *
 *   const completeOnboarding = () => {
 *     setIsOnboarded(true);
 *   };
 * }
 * ```
 *
 * Note: This hook must be used within a component that is wrapped by OnboardingProvider
 */

import { OnboardingContext } from "@/contexts/OnboardingContext";
import { useContext } from "react";

export function useOnboarding() {
    const context = useContext(OnboardingContext);

    if (context === undefined) {
        throw new Error(
            "useOnboarding must be used within an OnboardingProvider"
        );
    }
    return context;
}
