/**
 * RevenueCat Service
 *
 * Singleton service for managing in-app purchases and subscriptions
 * using the RevenueCat SDK. Handles user identification, subscription
 * status, and paywall presentation.
 *
 * Features:
 * - User identification and management
 * - Subscription status tracking
 * - Paywall presentation
 * - Purchase restoration
 *
 * Security:
 * - API key management via environment variables
 * - Secure user identification
 * - Anonymous user handling
 *
 * Dependencies:
 * - react-native-purchases: Core RevenueCat SDK
 * - react-native-purchases-ui: RevenueCat UI components
 */

import Purchases, { CustomerInfo } from "react-native-purchases";
// import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import { Platform } from "react-native";

let RevenueCatUI: any = null;
let PAYWALL_RESULT: any = null;

if (
  Platform.OS !== "web" &&
  Platform.constants?.appOwnership !== "expo"
) {
  // Only import if NOT running in Expo Go or web
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rc = require("react-native-purchases-ui");
  RevenueCatUI = rc.RevenueCatUI;
  PAYWALL_RESULT = rc.PAYWALL_RESULT;
}

/**
 * RevenueCat service implementation using the Singleton pattern
 * Ensures a single instance manages all RevenueCat operations
 */
class RevenueCatService {
    private static instance: RevenueCatService;
    private static readonly PREMIUM_ENTITLEMENT_ID = "Pro";
    private currentUserId: string | null = null;

    private constructor() {}

    /**
     * Gets the singleton instance of RevenueCatService
     * Creates a new instance if one doesn't exist
     */
    static getInstance(): RevenueCatService {
        if (!RevenueCatService.instance) {
            RevenueCatService.instance = new RevenueCatService();
        }
        return RevenueCatService.instance;
    }

    /**
     * Retrieves the RevenueCat API key from environment variables
     * @throws {Error} If no API key is found for the current platform
     */
    private getApiKey(): string {
        const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS;
        if (!apiKey) {
            throw new Error("[RevenueCat] No API key found for platform");
        }
        return apiKey;
    }

    /**
     * Gets the current user ID that RevenueCat is initialized with
     * @returns {string | null} The current user ID or null if not initialized
     */
    getCurrentUserId(): string | null {
        return this.currentUserId;
    }

    /**
     * Initializes the RevenueCat SDK and configures it with the API key
     * Also retrieves initial customer information
     * @throws {Error} If initialization fails
     */
    async initialize() {
        try {
            const apiKey = this.getApiKey();

            // Configure RevenueCat with the API key
            Purchases.configure({ apiKey });

            // Get initial customer info
            const customerInfo = await Purchases.getCustomerInfo();

            // If we have a non-anonymous user, store their ID
            if (!customerInfo.originalAppUserId.includes("$RCAnonymousID:")) {
                this.currentUserId = customerInfo.originalAppUserId;
            }

            console.log("[RevenueCat] Initialized successfully");
        } catch (error) {
            console.error("[RevenueCat] Initialization failed:", error);
            throw error;
        }
    }

    /**
     * Identifies a user with RevenueCat using their unique ID
     * Skips if the user is already identified
     * @param userId - The unique identifier for the user
     * @throws {Error} If user identification fails
     */
    async identifyUser(userId: string) {
        try {
            if (userId === this.currentUserId) {
                console.log("[RevenueCat] User already identified:", userId);
                return;
            }

            console.log("[RevenueCat] Identifying user:", userId);

            const loginResult = await Purchases.logIn(userId);

            this.currentUserId = userId;

            console.log(
                "[RevenueCat] User identified successfully:",
                loginResult
            );
            return loginResult;
        } catch (error) {
            console.error("[RevenueCat] Failed to identify user:", error);
            throw error;
        }
    }

    /**
     * Logs out the current user from RevenueCat
     * Resets the current user ID
     * @throws {Error} If logout fails
     */
    async logOutUser() {
        try {
            console.log("[RevenueCat] Logging out user");
            await Purchases.logOut();
            this.currentUserId = null;
            console.log("[RevenueCat] User logged out successfully");
        } catch (error) {
            console.error("[RevenueCat] Failed to log out user:", error);
            throw error;
        }
    }

    /**
     * Retrieves the current subscription status for the user
     * @returns {Promise<CustomerInfo>} The customer's subscription information
     * @throws {Error} If status retrieval fails
     */
    async getSubscriptionStatus(): Promise<CustomerInfo> {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            console.log("[RevenueCat] Subscription status:", customerInfo);
            return customerInfo;
        } catch (error) {
            console.error(
                "[RevenueCat] Failed to get subscription status:",
                error
            );
            throw error;
        }
    }

    /**
     * Checks if the user has an active subscription
     * @param customerInfo - The customer's subscription information
     * @returns {boolean} True if the user has an active subscription
     */
    isSubscriptionActive(customerInfo: CustomerInfo): boolean {
        return Object.keys(customerInfo.entitlements.active).length > 0;
    }

    /**
     * Presents the RevenueCat paywall UI
     * @returns {Promise<PAYWALL_RESULT>} The result of the paywall interaction
     * @throws {Error} If paywall presentation fails
     */
    async presentPaywall(): Promise<PAYWALL_RESULT> {
        try {
            const result = await RevenueCatUI.presentPaywall({
                fontFamily: "Rubik_400Regular",
            });
            return result;
        } catch (error) {
            console.error("[RevenueCat] Failed to present paywall:", error);
            throw error;
        }
    }

    /**
     * Presents the RevenueCat paywall UI if the user doesn't have the required entitlement
     * @param requiredEntitlementIdentifier - The entitlement to check for
     * @returns {Promise<PAYWALL_RESULT>} The result of the paywall interaction
     * @throws {Error} If paywall presentation fails
     */
    async presentPaywallIfNeeded(
        requiredEntitlementIdentifier: string = RevenueCatService.PREMIUM_ENTITLEMENT_ID
    ): Promise<PAYWALL_RESULT> {
        try {
            const result = await RevenueCatUI.presentPaywallIfNeeded({
                requiredEntitlementIdentifier,
                fontFamily: "Rubik_400Regular",
            });
            return result;
        } catch (error) {
            console.error("[RevenueCat] Failed to present paywall:", error);
            throw error;
        }
    }

    /**
     * Restores any previous purchases made by the user
     * @returns {Promise<CustomerInfo>} Updated customer information after restoration
     * @throws {Error} If purchase restoration fails
     */
    async restorePurchases(): Promise<CustomerInfo> {
        try {
            const customerInfo = await Purchases.restorePurchases();
            return customerInfo;
        } catch (error) {
            console.error("[RevenueCat] Failed to restore purchases:", error);
            throw error;
        }
    }
}

/**
 * Exported singleton instance of RevenueCatService
 * Use this instance throughout the application
 */
export const revenueCatService = RevenueCatService.getInstance();
