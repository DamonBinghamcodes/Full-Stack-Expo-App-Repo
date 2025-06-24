import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SafetyAlertsScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <View style={{
                        backgroundColor: '#E53935',
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <FontAwesome5 name="exclamation-triangle" size={30} color="white" />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                        Safety Alerts
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                        Stay informed with critical safety notifications
                    </Text>
                </View>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 }}>
                        Coming Soon
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', lineHeight: 24 }}>
                        This feature is being migrated from the web version. It will include:
                    </Text>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Real-time safety notifications</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Equipment recall alerts</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Weather condition warnings</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Safety procedure updates</Text>
                        <Text style={{ fontSize: 14, color: '#666' }}>• Emergency contact information</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 