/**
 * Application Providers
 *
 * This component serves as the root provider for the application, combining multiple
 * context providers to supply global state and theming to the entire app.
 *
 * Providers:
 * 1. QueryClientProvider
 *    - Manages global server state
 *    - Handles data fetching and caching
 *    - Provides React Query functionality
 *
 * 2. ThemeProvider
 *    - Handles light/dark mode theming
 *    - Uses system preferences via useColorScheme
 *    - Provides navigation theming
 *
 * 3. OnboardingProvider
 *    - Manages onboarding state
 *    - Controls onboarding flow and navigation
 *
 * 4. OnboardingAnswersProvider
 *    - Manages onboarding question answers
 *    - Persists answers in AsyncStorage
 *
 * 5. SubscriptionProvider
 *    - Handles subscription state
 *    - Manages subscription-related features
 *
 * Usage:
 * Wrap your app's root component with AppProviders:
 * ```tsx
 * <AppProviders>
 *   <App />
 * </AppProviders>
 * ```
 *
 * Note: The order of providers is important as it determines
 * the availability of context values to nested components.
 */

import { OnboardingAnswersProvider } from "@/contexts/OnboardingAnswersContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

/**
 * Global query client instance for React Query
 * Handles caching, background updates, and request deduplication
 */
const queryClient = new QueryClient();

/**
 * Root provider component that combines all global providers
 *
 * @param {Props} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped with providers
 * @returns {JSX.Element} Provider-wrapped application
 */
export default function AppProviders({ children }: Props) {
    // Get the user's preferred color scheme (light/dark)
    const colorScheme = useColorScheme();

    // Get current route information
    const pathname = usePathname();
    const segments = useSegments();

    // Log route changes
    useEffect(() => {
        console.log("Current route:", {
            pathname,
            segments,
            fullPath: "/" + segments.join("/"),
        });
    }, [pathname, segments]);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <OnboardingProvider>
                    <OnboardingAnswersProvider>
                        <SubscriptionProvider>{children}</SubscriptionProvider>
                    </OnboardingAnswersProvider>
                </OnboardingProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
