import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';
import { Pressable } from 'react-native';

export default function LoadWeightScreen() {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#101014' }}>
            <Header showHamburger onHamburger={() => setMenuVisible(true)} />
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
                        <FontAwesome5 name="calculator" size={30} color="white" />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                        Load Weight Estimator
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                        Estimate load weights and calculate lifting requirements
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
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Load weight calculations</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Material density estimators</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Volume to weight conversions</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>• Multiple material types</Text>
                        <Text style={{ fontSize: 14, color: '#666' }}>• Safety margin calculations</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 