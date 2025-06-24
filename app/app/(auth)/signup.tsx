import { AppleIcon, GoogleIcon, MailIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "../../lib/auth-client";
import { revenueCatService } from "../../services/revenuecat";

export default function SignupScreen() {
    const { data: session } = authClient.useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEmailInputs, setShowEmailInputs] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isAppleLoading, setIsAppleLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async () => {
        try {
            setIsEmailLoading(true);
            setErrorMessage("");

            if (!email || !password) {
                setErrorMessage("Please enter both email and password");
                return;
            }

            // Sign up with email
            await authClient.signUp.email({
                email,
                password,
                name: email.split("@")[0],
            });

            // Initialize RevenueCat with the user's ID
            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
                await revenueCatService.identifyUser(session.data.user.id);
            }

            router.replace("/onboarding/disclaimer");
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Registration failed. Please try again."
            );
            Alert.alert(
                "Registration Failed",
                error instanceof Error
                    ? error.message
                    : "Registration failed. Please try again."
            );
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
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
            
            router.replace("/onboarding/disclaimer");
        } catch (error) {
            console.error("Google signup failed:", error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleAppleSignup = async () => {
        try {
            setIsAppleLoading(true);
            await authClient.signIn.social({
                provider: "apple",
                callbackURL: "yourapp://(tabs)",
            });

            // Initialize RevenueCat with the user's ID
            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
                await revenueCatService.identifyUser(session.data.user.id);
            }
            
            router.replace("/onboarding/disclaimer");
        } catch (error) {
            console.error("Apple signup failed:", error);
        } finally {
            setIsAppleLoading(false);
        }
    };

    useEffect(() => {
        console.log("session", session);
        // Remove automatic redirect to tabs - let users go through disclaimer flow
        // if (session) {
        //     router.replace("/(tabs)");
        // }
    }, [session]);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView>
                <View className="flex-col justify-between gap-4 mt-auto mb-10 px-4 h-full pb-10">
                    <Text className="text-center text-black text-[24px] font-bold mb-2">
                        Create Account
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
                                onPress={handleGoogleSignup}
                                icon={<GoogleIcon />}
                                isLoading={isGoogleLoading}
                                isDisabled={isGoogleLoading}
                            >
                                Continue with Google
                            </Button>

                            <Button
                                variant="secondary"
                                onPress={handleAppleSignup}
                                icon={<AppleIcon />}
                                isLoading={isAppleLoading}
                                isDisabled={isAppleLoading}
                            >
                                Continue with Apple
                            </Button>

                            <View className="flex-row items-center justify-center gap-1">
                                <Text className="text-center text-gray-500">
                                    Already have an account?{" "}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => router.replace("/(auth)")}
                                >
                                    <Text className="font-bold text-primary">
                                        Sign In
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

                            {errorMessage ? (
                                <Text className="text-red-500 text-center">
                                    {errorMessage}
                                </Text>
                            ) : null}

                            <Button
                                onPress={handleRegister}
                                isLoading={isEmailLoading}
                                isDisabled={
                                    isEmailLoading || !email || !password
                                }
                            >
                                Create Account
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
