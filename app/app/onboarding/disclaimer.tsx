import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';

const BRAND_RED = "#e31e24";
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Custom styled button component for consistency
const DisclaimerButton = ({ onPress, children, variant = "primary" }) => {
    const buttonStyle = {
        width: '100%',
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        ...(variant === "primary" ? {
            backgroundColor: BRAND_RED,
            shadowColor: BRAND_RED,
            shadowOpacity: 0.3,
        } : {
            backgroundColor: '#2a2a2a',
            borderWidth: 1,
            borderColor: '#444',
        }),
    };

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
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

export default function Disclaimer() {
    const router = useRouter();

    const handleAccept = () => {
        router.replace('/screens/main-menu');
    };
    
    const handleCancel = () => {
        router.replace('/(auth)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack showHamburger={false} onBack={() => router.replace('/(auth)')} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="shield-alt" size={isSmallScreen ? 48 : 56} color={BRAND_RED} />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Safety First</Text>

                    {/* Disclaimer Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            The RYGTEK app provides general guidance based on industry best practices and safety guidelines. It is the user's responsibility to verify and apply proper lifting techniques based on current workplace procedures, environmental conditions, and official site safety policies.{"\n\n"}
                            Always refer to your company's Standard Operating Procedures (SOPs) and consult with certified lifting personnel for final approval before any lifting operation.
                        </Text>
                        
                        {/* Warning Bar */}
                        <View style={styles.warningBar}>
                            <FontAwesome5 name="exclamation-triangle" size={16} color={BRAND_RED} />
                            <Text style={styles.warningText}>Never compromise on safety protocols</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <DisclaimerButton variant="secondary" onPress={handleCancel}>
                            Cancel
                        </DisclaimerButton>
                        <DisclaimerButton variant="primary" onPress={handleAccept}>
                            I Understand & Agree
                        </DisclaimerButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101014',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
        minHeight: '100%',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: isSmallScreen ? 80 : 96,
        height: isSmallScreen ? 80 : 96,
        borderRadius: isSmallScreen ? 40 : 48,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: BRAND_RED,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: isSmallScreen ? 24 : 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 32,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#18181c',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 480,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: 32,
    },
    cardText: {
        color: '#e0e0e0',
        fontSize: isSmallScreen ? 14 : 16,
        marginBottom: 20,
        textAlign: 'left',
        lineHeight: isSmallScreen ? 20 : 24,
    },
    warningBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a1818',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    warningText: {
        color: BRAND_RED,
        fontWeight: 'bold',
        fontSize: isSmallScreen ? 13 : 15,
        flex: 1,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 480,
        gap: 4,
    },
});