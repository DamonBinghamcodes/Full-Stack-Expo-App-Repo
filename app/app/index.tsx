import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { authClient } from "../lib/auth-client";

export default function Index() {
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        // Short timeout to ensure smooth transition
        const timer = setTimeout(() => {
            // If still loading auth state, keep showing loading
            if (isPending) {
                return;
            }

            if (session) {
                // Authenticated - go to main app
                router.replace("/(tabs)");
            } else {
                // Not authenticated - show auth
                router.replace("/(auth)/signup");
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [session, isPending]);

    // Show loading state while determining which screen to show
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <ActivityIndicator size="small" />
        </View>
    );
}
