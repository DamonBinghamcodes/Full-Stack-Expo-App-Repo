import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import RygtekLogo from '@/components/RygtekLogo';
import Header from '@/components/Header';

export default function Disclaimer() {
    const router = useRouter();

    const handleAccept = () => {
        router.replace('/screens/main-menu');
    };
    const handleCancel = () => {
        router.replace('/(auth)');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#101014' }}>
            <Header showBack showHamburger={false} onBack={() => router.replace('/(auth)')} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                {/* Glowing Logo */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    {/* Logo is now in header */}
                </View>

                {/* Disclaimer Card */}
                <View style={styles.card}>
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <FontAwesome5 name="shield-alt" size={36} color="#E53935" style={{ marginBottom: 8 }} />
                        <Text style={styles.cardTitle}>Safety First</Text>
                    </View>
                    <Text style={styles.cardText}>
                        The RYGTEK app provides general guidance based on industry best practices and safety guidelines. It is the user's responsibility to verify and apply proper lifting techniques based on current workplace procedures, environmental conditions, and official site safety policies.{"\n\n"}
                        Always refer to your company's Standard Operating Procedures (SOPs) and consult with certified lifting personnel for final approval before any lifting operation.
                    </Text>
                    {/* Warning Bar */}
                    <View style={styles.warningBar}>
                        <FontAwesome5 name="exclamation-triangle" size={18} color="#E53935" style={{ marginRight: 8 }} />
                        <Text style={styles.warningText}>Never compromise on safety protocols</Text>
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonStack}>
                    <Button variant="secondary" onPress={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onPress={handleAccept}>
                        I Understand & Agree
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoGlow: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#E53935',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 24,
        elevation: 12,
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
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    cardText: {
        color: '#e0e0e0',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'left',
        lineHeight: 22,
    },
    warningBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a1818',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    warningText: {
        color: '#E53935',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonStack: {
        flexDirection: 'column',
        gap: 16,
        marginTop: 32,
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
        marginBottom: 32,
    },
}); 