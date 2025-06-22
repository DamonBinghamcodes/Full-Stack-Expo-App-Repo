import {
    createAccountItems,
    createAppSettingsItems,
    createSupportItems,
} from "@/config/accountSettings";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSubscription } from "@/hooks/useSubscription";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { Alert, Linking, Platform, ScrollView, View } from "react-native";
import { PAYWALL_RESULT } from "react-native-purchases-ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeleteAccount } from "../../api/account/delete";
import SettingsSection from "../../components/account/SettingsSection";
import { authClient } from "../../lib/auth-client";

export default function AccountPage() {
    const { presentPaywall } = useSubscription();
    const { mutateAsync: deleteAccount } = useDeleteAccount();
    const { resetIsOnboarded } = useOnboarding();

    // --- Handler Functions ---
    const handleNotifications = async () => {
        if (Platform.OS === "ios") {
            await Linking.openSettings();
        } else {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                if (status !== "granted") {
                    await Linking.openSettings();
                }
            } else {
                await Linking.openSettings();
            }
        }
    };

    const handleSubscription = async () => {
        try {
            const result = await presentPaywall();

            if (result === PAYWALL_RESULT.PURCHASED) {
                console.log("Subscription purchased");
                Alert.alert("Success", "Subscription purchased");
            } else {
                console.log("Subscription not purchased");
                Alert.alert("Error", "Failed to purchase subscription");
            }
        } catch (error) {
            console.error("Failed to present paywall:", error);
            Alert.alert("Error", "Failed to present paywall");
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteAccount();
                            await resetIsOnboarded();
                            await authClient.signOut();
                            router.replace("/(auth)");
                        } catch (error) {
                            console.error("Failed to delete account:", error);
                            Alert.alert(
                                "Error",
                                "Failed to delete account. Please try again."
                            );
                        }
                    },
                },
            ]
        );
    };

    const handleOpenContact = () => {
        Linking.openURL("https://yourwebsite.com/contact");
    };

    const handleOpenTerms = () => {
        Linking.openURL("https://yourwebsite.com/policies/terms");
    };

    const handleOpenPrivacy = () => {
        Linking.openURL("https://yourwebsite.com/policies/privacy");
    };

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            router.replace("/(auth)");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <ScrollView>
                <View className="p-4 gap-4">
                    <SettingsSection
                        title="App Settings"
                        items={createAppSettingsItems(handleNotifications)}
                    />

                    <SettingsSection
                        title="Support"
                        items={createSupportItems(
                            handleOpenContact,
                            handleOpenTerms,
                            handleOpenPrivacy
                        )}
                    />

                    <SettingsSection
                        title="Account"
                        items={createAccountItems(
                            handleSubscription,
                            handleDeleteAccount,
                            handleLogout
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
