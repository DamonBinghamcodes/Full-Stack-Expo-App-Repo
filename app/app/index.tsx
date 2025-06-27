import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Simple timeout to show loading then go to welcome
        const timer = setTimeout(() => {
            setIsReady(true);
            router.replace("/welcome");
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Show loading state while app initializes
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111217" }}>
            <ActivityIndicator size="large" color="#e31e24" />
        </View>
    );
}
