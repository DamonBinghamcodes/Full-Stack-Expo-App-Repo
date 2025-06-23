import { AppleIcon, GoogleIcon, MailIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "../../lib/auth-client";
import { revenueCatService } from "../../services/revenuecat";

export default function AuthScreen() {
    const { data: session } = authClient.useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEmailInputs, setShowEmailInputs] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isAppleLoading, setIsAppleLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);

    const handleEmailLogin = async () => {
        try {
            setIsEmailLoading(true);

            await authClient.signIn.email({
                email,
                password,
            });

            // Initialize RevenueCat with the user's ID
            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
                await revenueCatService.identifyUser(session.data.user.id);
            }

            router.replace("/(tabs)");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "yourapp://(tabs)",
            });

            // Initialize RevenueCat with the user's ID
            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
                await revenueCatService.identifyUser(session.data.user.id);
            }
        } catch (error) {
            console.error("Google login failed:", error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleAppleLogin = async () => {
        try {
            setIsAppleLoading(true);
            await authClient.signIn.social({
                provider: "apple",
                callbackURL: "yourapp://(tabs)",
            });

            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
                await revenueCatService.identifyUser(session.data.user.id);
                router.replace("/(tabs)");
            }
        } catch (error) {
            console.error("Apple login failed:", error);
        } finally {
            setIsAppleLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            router.replace("/(tabs)");
        }
    }, [session]);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView>
                <View className="flex-col justify-between gap-4 mt-auto mb-10 px-4 h-full pb-10">
                    {/* Rygtek Logo */}
                    <View className="items-center mt-8 mb-4">
                        <Image
                            source={require("@/assets/images/Rygtek-Logo.png")}
                            style={{ width: 300, height: 300, resizeMode: "contain" }}
                        />
                    </View>

                    {/* Headline and Subheadline */}
                    <Text className="text-center text-black text-2xl font-extrabold mb-1">
                        THE RIGGER IN YOUR POCKET
                    </Text>
                    <Text className="text-center text-gray-700 text-base mb-6">
                        Professional rigging calculations and safety tools
                    </Text>

                    <Text className="text-center text-black text-[24px] font-bold mb-2">
                        Login
                    </Text>

                    {!showEmailInputs ? (
                        <View className="flex-col gap-6">
                            <Button
                                onPress={() => setShowEmailInputs(true)}
                                icon={<MailIcon />}
                            >
                                Continue with Email
                            </Button>

                            <Button
                                variant="secondary"
                                onPress={handleGoogleLogin}
                                icon={<GoogleIcon />}
                                isLoading={isGoogleLoading}
                                isDisabled={isGoogleLoading}
                            >
                                Continue with Google
                            </Button>

                            <Button
                                variant="secondary"
                                onPress={handleAppleLogin}
                                icon={<AppleIcon />}
                                isLoading={isAppleLoading}
                                isDisabled={isAppleLoading}
                            >
                                Continue with Apple
                            </Button>

                            <View className="flex-row items-center justify-center gap-1">
                                <Text className="text-center text-gray-500">
                                    Don't have an account?{" "}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => router.replace("/signup")}
                                >
                                    <Text className="font-bold text-primary">
                                        Create Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View className="flex-col gap-4">
                            <TextInput
                                className="h-14 border border-gray-300 rounded-full px-6 bg-white placeholder:text-gray-500"
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                secureTextEntry={false}
                            />

                            <TextInput
                                className="h-14 border border-gray-300 rounded-full px-6 bg-white placeholder:text-gray-500"
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <Button
                                onPress={handleEmailLogin}
                                isLoading={isEmailLoading}
                                isDisabled={isEmailLoading}
                            >
                                Sign In
                            </Button>

                            <Button
                                variant="secondary"
                                onPress={() => setShowEmailInputs(false)}
                            >
                                Back
                            </Button>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}
