import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BRAND_RED = "#E53935";

export default function WelcomeScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: "#111217", justifyContent: "center", alignItems: "center" }}>
            <SafeAreaView style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    {/* Logo */}
                    <Image
                        source={require("@/assets/images/Rygtek-Logo.png")}
                        style={{ width: 250, height: 250, marginBottom: 16, resizeMode: "contain" }}
                    />

                    {/* Headline */}
                    <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
                        THE RIGGER IN YOUR POCKET
                    </Text>
                    {/* Subheadline */}
                    <Text style={{ color: "#ccc", fontSize: 16, textAlign: "center", marginBottom: 8 }}>
                        Professional rigging calculations and safety tools in one powerful app.
                    </Text>
                    {/* Tagline */}
                    <Text style={{ color: BRAND_RED, fontSize: 14, fontStyle: "italic", textAlign: "center", marginBottom: 24 }}>
                        PRECISION. SAFETY. INNOVATION.
                    </Text>

                    {/* Get Started Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: BRAND_RED,
                            borderRadius: 12,
                            paddingVertical: 14,
                            paddingHorizontal: 40,
                            marginBottom: 24,
                        }}
                        onPress={() => router.replace("/(auth)/signup")}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>GET STARTED</Text>
                    </TouchableOpacity>

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
                </View>
            </SafeAreaView>
        </View>
    );
} 