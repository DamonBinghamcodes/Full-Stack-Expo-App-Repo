import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View, Linking, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BRAND_RED = "#e31e24";
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Logo */}
                    <Image
                        source={require("@/assets/images/Rygtek-Logo.png")}
                        style={styles.logo}
                    />

                    {/* Headline */}
                    <Text style={styles.headline}>
                        THE RIGGER IN YOUR POCKET
                    </Text>
                    
                    {/* Subheadline */}
                    <Text style={styles.subheadline}>
                        Professional rigging calculations and safety tools in one powerful app.
                    </Text>
                    
                    {/* Tagline */}
                    <Text style={styles.tagline}>
                        PRECISION. SAFETY. INNOVATION.
                    </Text>

                    {/* Get Started Button */}
                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => router.push("/(auth)")}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </TouchableOpacity>

                    {/* Social Icons */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity 
                            onPress={() => Linking.openURL("https://instagram.com/rygtek")}
                            style={styles.socialButton}
                            activeOpacity={0.7}
                        > 
                            <InstagramIcon size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => Linking.openURL("https://youtube.com/@rygtek")}
                            style={styles.socialButton}
                            activeOpacity={0.7}
                        > 
                            <YouTubeIcon size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => Linking.openURL("https://linkedin.com/company/rygtek")}
                            style={styles.socialButton}
                            activeOpacity={0.7}
                        > 
                            <LinkedInIcon size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Version Info */}
                    <Text style={styles.versionText}>
                        Version 2.0 • Build 2025.01
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111217',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    logo: {
        width: isSmallScreen ? 180 : 220,
        height: isSmallScreen ? 180 : 220,
        marginBottom: isSmallScreen ? 24 : 32,
        resizeMode: 'contain',
    },
    headline: {
        color: '#fff',
        fontSize: isSmallScreen ? 24 : 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        paddingHorizontal: 20,
        lineHeight: isSmallScreen ? 30 : 36,
    },
    subheadline: {
        color: '#ccc',
        fontSize: isSmallScreen ? 14 : 16,
        textAlign: 'center',
        marginBottom: 8,
        paddingHorizontal: 30,
        lineHeight: isSmallScreen ? 20 : 24,
    },
    tagline: {
        color: BRAND_RED,
        fontSize: isSmallScreen ? 12 : 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: isSmallScreen ? 40 : 48,
        paddingHorizontal: 20,
        fontWeight: '500',
    },
    getStartedButton: {
        backgroundColor: BRAND_RED,
        borderRadius: 16,
        paddingVertical: isSmallScreen ? 16 : 18,
        paddingHorizontal: isSmallScreen ? 40 : 48,
        marginBottom: isSmallScreen ? 40 : 48,
        shadowColor: BRAND_RED,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        minWidth: 200,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: isSmallScreen ? 16 : 18,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isSmallScreen ? 28 : 32,
        marginBottom: 24,
    },
    socialButton: {
        padding: 8,
        borderRadius: 12,
    },
    versionText: {
        color: '#666',
        fontSize: isSmallScreen ? 11 : 12,
        textAlign: 'center',
        fontWeight: '400',
    },
});