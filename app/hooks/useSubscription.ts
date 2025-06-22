import { SubscriptionContext } from "@/contexts/SubscriptionContext";
import { useContext } from "react";

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error(
            "useSubscription must be used within a SubscriptionProvider"
        );
    }
    return context;
};
