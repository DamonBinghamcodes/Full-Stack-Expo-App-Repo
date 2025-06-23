import { AppleIcon, GoogleIcon, MailIcon } from "@/components/icons";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "../../lib/auth-client";
import { revenueCatService } from "../../services/revenuecat";

const BRAND_RED = "#E53935";

export default function AuthScreen() {
    const { data: session } = authClient.useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEmailInputs, setShowEmailInputs] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isAppleLoading, setIsAppleLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

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
        <View style={{ flex: 1, backgroundColor: "#111217", justifyContent: "center", alignItems: "center" }}>
            <SafeAreaView style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                {/* Logo */}
                <Image
                    source={require("@/assets/images/Rygtek-Logo.png")}
                    style={{ width: 120, height: 120, marginBottom: 16, resizeMode: "contain" }}
                />

                {/* Headline */}
                <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
                    THE RIGGER IN YOUR POCKET
                </Text>
                {/* Subheadline */}
                <Text style={{ color: "#ccc", fontSize: 16, textAlign: "center", marginBottom: 8 }}>
                    Professional rigging calculations and safety tools
                </Text>
                {/* Tagline */}
                <Text style={{ color: BRAND_RED, fontSize: 14, fontStyle: "italic", textAlign: "center", marginBottom: 24 }}>
                    PRECISION. SAFETY. INNOVATION.
                </Text>

                {/* Get Started Button or Login Form */}
                {!showLogin ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: BRAND_RED,
                            borderRadius: 12,
                            paddingVertical: 14,
                            paddingHorizontal: 40,
                            marginBottom: 24,
                        }}
                        onPress={() => setShowLogin(true)}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>GET STARTED</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: "90%", alignItems: "center" }}>
                        {!showEmailInputs ? (
                            <View style={{ width: "100%", gap: 16 }}>
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
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 }}>
                                    <Text style={{ color: "#aaa" }}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => router.replace("/signup")}> 
                                        <Text style={{ color: BRAND_RED, fontWeight: "bold" }}>Create Account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={{ width: "100%", gap: 12 }}>
                                <TextInput
                                    style={{ height: 56, borderWidth: 1, borderColor: "#444", borderRadius: 28, paddingHorizontal: 24, backgroundColor: "#fff", marginBottom: 8 }}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    secureTextEntry={false}
                                />
                                <TextInput
                                    style={{ height: 56, borderWidth: 1, borderColor: "#444", borderRadius: 28, paddingHorizontal: 24, backgroundColor: "#fff", marginBottom: 8 }}
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
                )}

                {/* Social Icons */}
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 32, marginTop: 40, marginBottom: 16 }}>
                    <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/rygtek")}> 
                        <InstagramIcon size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://youtube.com/@rygtek")}> 
                        <YouTubeIcon size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://linkedin.com/company/rygtek")}> 
                        <LinkedInIcon size={32} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Version Info */}
                <Text style={{ color: "#aaa", fontSize: 13, textAlign: "center", marginBottom: 16 }}>
                    Version 2.0  •  Build 2025.01
                </Text>
            </SafeAreaView>
        </View>
    );
}
