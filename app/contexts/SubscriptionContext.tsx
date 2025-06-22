/**
 * Subscription Context
 *
 * React context for managing subscription state and operations throughout the app.
 * Provides a centralized way to handle RevenueCat subscriptions and paywalls.
 *
 * Features:
 * - Subscription status tracking
 * - Premium status management
 * - Paywall presentation
 * - Purchase restoration
 * - Automatic retry with exponential backoff
 *
 * State Management:
 * - isPremium: Current premium status
 * - isLoading: Initial loading state
 * - isRefreshing: Status refresh state
 * - error: Error state
 * - customerInfo: RevenueCat customer information
 *
 * Usage:
 * ```tsx
 * const { isPremium, presentPaywall } = useSubscription();
 * ```
 */

import { authClient } from "@/lib/auth-client";
import { revenueCatService } from "@/services/revenuecat";
import React, { createContext, useEffect, useState } from "react";
import { CustomerInfo } from "react-native-purchases";
import { PAYWALL_RESULT } from "react-native-purchases-ui";

/**
 * Type definition for the subscription context
 * Contains all subscription-related state and operations
 */
type SubscriptionContextType = {
    error: Error | null;
    isPremium: boolean;
    isLoading: boolean;
    isRefreshing: boolean;
    customerInfo: CustomerInfo | null;
    checkSubscriptionStatus: (retryCount?: number) => Promise<void>;
    presentPaywall: () => Promise<PAYWALL_RESULT>;
    presentPaywallIfNeeded: (
        requiredEntitlementIdentifier?: string
    ) => Promise<PAYWALL_RESULT>;
    restorePurchases: () => Promise<CustomerInfo>;
};

/**
 * Subscription context instance
 * Provides subscription state and operations to consuming components
 */
export const SubscriptionContext = createContext<
    SubscriptionContextType | undefined
>(undefined);

/**
 * Subscription Provider Component
 *
 * Manages subscription state and operations for the application.
 * Automatically initializes RevenueCat and handles user identification.
 *
 * Features:
 * - Automatic initialization on user session change
 * - Error handling and state management
 * - Retry logic with exponential backoff
 * - Paywall presentation management
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data: session } = authClient.useSession();

    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

    /**
     * Initializes RevenueCat and identifies the user
     * Called when the user session changes
     */
    const initializeRevenueCat = async () => {
        try {
            setIsLoading(true);
            setError(null);
            if (session?.user?.id) {
                await revenueCatService.initialize();
                await revenueCatService.identifyUser(session.user.id);
                await checkSubscriptionStatus();
            }
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to initialize RevenueCat");
            console.error("Failed to initialize RevenueCat:", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Checks the current subscription status
     * Implements retry logic with exponential backoff
     * @param retryCount - Current retry attempt number
     */
    const checkSubscriptionStatus = async (retryCount = 0) => {
        try {
            setIsRefreshing(true);
            setError(null);
            const info = await revenueCatService.getSubscriptionStatus();
            const premium = revenueCatService.isSubscriptionActive(info);

            // If we're retrying and still not premium, try again with exponential backoff
            if (retryCount > 0 && !premium && retryCount < 5) {
                const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
                await new Promise((resolve) => setTimeout(resolve, delay));
                return checkSubscriptionStatus(retryCount + 1);
            }

            setIsPremium(premium);
            setCustomerInfo(info);
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to check subscription status");
            console.error("Failed to check subscription status:", error);
            setError(error);

            // If we're retrying and haven't exceeded max retries, try again with exponential backoff
            if (retryCount < 5) {
                const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
                await new Promise((resolve) => setTimeout(resolve, delay));
                return checkSubscriptionStatus(retryCount + 1);
            }
        } finally {
            setIsRefreshing(false);
        }
    };

    /**
     * Presents the RevenueCat paywall
     * Updates subscription status after successful purchase
     */
    const presentPaywall = async () => {
        try {
            setError(null);

            const result = await revenueCatService.presentPaywall();

            if (result === PAYWALL_RESULT.PURCHASED) {
                await checkSubscriptionStatus(1); // Start with retry count 1
            }
            return result;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to present paywall");
            console.error("Failed to present paywall:", error);
            setError(error);
            throw error;
        }
    };

    /**
     * Presents the RevenueCat paywall if the user doesn't have the required entitlement
     * Updates subscription status after successful purchase
     * @param requiredEntitlementIdentifier - The entitlement to check for
     */
    const presentPaywallIfNeeded = async (
        requiredEntitlementIdentifier?: string
    ) => {
        try {
            setError(null);

            const result = await revenueCatService.presentPaywallIfNeeded(
                requiredEntitlementIdentifier || "Pro"
            );

            if (result === PAYWALL_RESULT.PURCHASED) {
                await checkSubscriptionStatus(1); // Start with retry count 1
            }
            return result;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to present paywall");
            console.error("Failed to present paywall:", error);
            setError(error);
            throw error;
        }
    };

    /**
     * Restores previous purchases
     * Updates subscription status after restoration
     */
    const restorePurchases = async () => {
        try {
            setError(null);
            const info = await revenueCatService.restorePurchases();
            setCustomerInfo(info);
            setIsPremium(revenueCatService.isSubscriptionActive(info));
            return info;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to restore purchases");
            console.error("Failed to restore purchases:", error);
            setError(error);
            throw error;
        }
    };

    // Initialize RevenueCat when user session changes
    useEffect(() => {
        // Skip initialization if there's no user ID
        if (!session?.user?.id) {
            setIsLoading(false);
            return;
        }

        // Skip if already initialized for this user
        if (session.user.id === revenueCatService.getCurrentUserId()) {
            return;
        }

        initializeRevenueCat();
    }, [session?.user?.id]);

    const value = {
        isPremium,
        isLoading,
        isRefreshing,
        error,
        customerInfo,
        checkSubscriptionStatus,
        presentPaywall,
        presentPaywallIfNeeded,
        restorePurchases,
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
};
