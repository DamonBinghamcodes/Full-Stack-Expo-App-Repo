import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';

export default function AboutScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <Header />
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Image
                        source={require('@/assets/images/Rygtek-Logo.png')}
                        style={{ width: 120, height: 120, marginBottom: 20, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                        Rygtek
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 5 }}>
                        The Rigger In Your Pocket
                    </Text>
                    <Text style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>
                        Version 2.0 • Build 2025.01
                    </Text>
                </View>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 }}>
                        About Rygtek
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', lineHeight: 24, marginBottom: 15 }}>
                        Rygtek is a comprehensive mobile application designed for professional riggers, providing essential tools and calculations for safe and efficient rigging operations.
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', lineHeight: 24 }}>
                        Our mission is to enhance safety and productivity in the rigging industry through innovative technology and reliable calculations.
                    </Text>
                </View>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 }}>
                        Features
                    </Text>
                    <View style={{ gap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={16} color="#E53935" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#666' }}>Working Load Limit Calculator</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={16} color="#E53935" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#666' }}>Angle & Dimensions Calculator</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={16} color="#E53935" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#666' }}>Load Weight Estimator</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={16} color="#E53935" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#666' }}>Lifting Register</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={16} color="#E53935" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#666' }}>Safety Alerts</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={16} color="#E53935" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#666' }}>Crane Signals Guide</Text>
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 }}>
                        Development Team
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', lineHeight: 24 }}>
                        Rygtek is developed by a team of experienced rigging professionals and software engineers, committed to creating tools that meet the real-world needs of the industry.
                    </Text>
                </View>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 }}>
                        Legal
                    </Text>
                    <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                        This application is provided for informational purposes only. Users are responsible for verifying all calculations and following proper safety procedures. Rygtek is not liable for any damages resulting from the use of this application.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 