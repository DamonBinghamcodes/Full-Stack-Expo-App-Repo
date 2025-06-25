import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { View } from 'react-native';

import AppProviders from "@/providers/AppProviders";

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#101014' /* dark background */ }}>
            {/* Optional: add a subtle red overlay or gradient here if you want */}
            <Stack screenOptions={{ headerShown: false }} />

            <StatusBar style="auto" />
        </View>
    );
}
