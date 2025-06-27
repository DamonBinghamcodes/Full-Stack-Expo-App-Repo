import { AppleIcon, GoogleIcon, MailIcon } from "@/components/icons";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { router } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Linking, Animated, Easing, Alert, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsive, commonStyles, isSmallScreen } from "@/utils/responsive";

const BRAND_RED = "#e31e24";

// Custom styled button component for consistent mobile styling
const AuthButton = ({ onPress, icon, children, variant = "primary", isLoading = false, style = {} }) => {
    const buttonStyle = {
        width: '100%',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        gap: 12,
        ...(variant === "primary" ? {
            backgroundColor: BRAND_RED,
            shadowColor: BRAND_RED,
            shadowOpacity: 0.3,
        } : {
            backgroundColor: '#2a2a2a',
            borderWidth: 1,
            borderColor: '#444',
        }),
        ...style,
    };

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
            {icon && icon}
            <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default function AuthScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEmailInputs, setShowEmailInputs] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isAppleLoading, setIsAppleLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    // Animation state
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleEmailLogin = async () => {
        try {
            setIsEmailLoading(true);
            // Simulate auth process
            Alert.alert("Demo Mode", "Authentication is currently in demo mode. Proceeding to app...");
            await router.replace("/onboarding/disclaimer");
        } catch (error) {
            console.error("Login failed:", error);
            Alert.alert("Login Failed", "Please try again.");
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            Alert.alert("Demo Mode", "Google Sign-In is currently in demo mode. Proceeding to app...");
            await router.replace("/onboarding/disclaimer");
        } catch (error) {
            console.error("Google login failed:", error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleAppleLogin = async () => {
        try {
            setIsAppleLoading(true);
            Alert.alert("Demo Mode", "Apple Sign-In is currently in demo mode. Proceeding to app...");
            await router.replace("/onboarding/disclaimer");
        } catch (error) {
            console.error("Apple login failed:", error);
        } finally {
            setIsAppleLoading(false);
        }
    };

    const handleBackToWelcome = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        {/* Logo */}
                        <Image
                            source={require("@/assets/images/Rygtek-Logo.png")}
                            style={styles.logo}
                        />

                        {/* Headline */}
                        <Text style={styles.headline}>Welcome Back</Text>
                        
                        {/* Subheadline */}
                        <Text style={styles.subheadline}>
                            Choose your preferred sign-in method to continue
                        </Text>

                        {/* Login Form */}
                        <View style={styles.formContainer}>
                            {/* Back Button */}
                            <TouchableOpacity style={styles.backButton} onPress={handleBackToWelcome}>
                                <Text style={styles.backButtonText}>← Back</Text>
                            </TouchableOpacity>
                            
                            {!showEmailInputs ? (
                                <View style={styles.buttonContainer}>
                                    <AuthButton
                                        onPress={() => setShowEmailInputs(true)}
                                        icon={<MailIcon />}
                                        variant="primary"
                                    >
                                        Continue with Email
                                    </AuthButton>

                                    <AuthButton
                                        onPress={handleGoogleLogin}
                                        icon={<GoogleIcon />}
                                        variant="secondary"
                                        isLoading={isGoogleLoading}
                                    >
                                        Continue with Google
                                    </AuthButton>

                                    <AuthButton
                                        onPress={handleAppleLogin}
                                        icon={<AppleIcon />}
                                        variant="secondary"
                                        isLoading={isAppleLoading}
                                    >
                                        Continue with Apple
                                    </AuthButton>

                                    <AuthButton
                                        onPress={() => router.replace("/onboarding/disclaimer")}
                                        variant="secondary"
                                        style={{ 
                                            marginTop: 16,
                                            backgroundColor: 'transparent',
                                            borderColor: '#666',
                                        }}
                                    >
                                        Continue as Guest
                                    </AuthButton>

                                    <View style={styles.signupPrompt}>
                                        <Text style={styles.signupText}>Don't have an account? </Text>
                                        <TouchableOpacity onPress={() => router.replace("/signup")}> 
                                            <Text style={styles.signupLink}>Create Account</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.emailFormContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Email"
                                        placeholderTextColor="#999"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Password"
                                        placeholderTextColor="#999"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                    <AuthButton
                                        onPress={handleEmailLogin}
                                        variant="primary"
                                        isLoading={isEmailLoading}
                                    >
                                        Sign In
                                    </AuthButton>
                                    <AuthButton
                                        onPress={() => setShowEmailInputs(false)}
                                        variant="secondary"
                                    >
                                        Back
                                    </AuthButton>
                                </View>
                            )}
                        </View>

                        {/* Social Icons */}
                        <View style={styles.socialContainer}>
                            <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/rygtek")}> 
                                <InstagramIcon size={28} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL("https://youtube.com/@rygtek")}> 
                                <YouTubeIcon size={28} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL("https://linkedin.com/company/rygtek")}> 
                                <LinkedInIcon size={28} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* Version Info */}
                        <Text style={styles.versionText}>Version 2.0 • Build 2025.01</Text>
                    </View>
                </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
        minHeight: '100%',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: isSmallScreen ? 100 : 120,
        height: isSmallScreen ? 100 : 120,
        marginBottom: 32,
        resizeMode: 'contain',
    },
    headline: {
        color: '#fff',
        fontSize: isSmallScreen ? 28 : 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    subheadline: {
        color: '#aaa',
        fontSize: isSmallScreen ? 16 : 18,
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 30,
        lineHeight: 24,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
        marginBottom: 32,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    backButtonText: {
        color: BRAND_RED,
        fontWeight: '600',
        fontSize: 16,
    },
    buttonContainer: {
        width: '100%',
    },
    signupPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    signupText: {
        color: '#888',
        fontSize: 14,
    },
    signupLink: {
        color: BRAND_RED,
        fontWeight: 'bold',
        fontSize: 14,
    },
    emailFormContainer: {
        width: '100%',
        marginTop: 16,
    },
    textInput: {
        height: 56,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 12,
        paddingHorizontal: 20,
        backgroundColor: '#2a2a2a',
        fontSize: 16,
        color: '#fff',
        marginVertical: 6,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        marginTop: 16,
        marginBottom: 20,
    },
    versionText: {
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
    },
});