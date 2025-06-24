import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MainMenuScreen() {
    const router = useRouter();

    const menuItems = [
        {
            title: 'Working Load Limit',
            icon: 'weight-hanging',
            route: '/screens/working-load-limit',
            description: 'Calculate safe working loads'
        },
        {
            title: 'Angle & Dimensions',
            icon: 'ruler-combined',
            route: '/screens/angle-dimensions',
            description: 'Calculate angles and measurements'
        },
        {
            title: 'Load Weight Estimator',
            icon: 'calculator',
            route: '/screens/load-weight',
            description: 'Estimate load weights'
        },
        {
            title: 'Lifting Register',
            icon: 'clipboard-list',
            route: '/screens/lifting-register',
            description: 'Track lifting operations'
        },
        {
            title: 'Safety Alerts',
            icon: 'exclamation-triangle',
            route: '/screens/safety-alerts',
            description: 'Safety notifications and alerts'
        },
        {
            title: 'Crane Signals',
            icon: 'hand-paper',
            route: '/screens/crane-signals',
            description: 'Crane hand signals guide'
        },
        {
            title: 'Shop',
            icon: 'shopping-cart',
            route: '/screens/shop',
            description: 'Purchase equipment and tools'
        },
        {
            title: 'Contact',
            icon: 'envelope',
            route: '/screens/contact',
            description: 'Get in touch with support'
        },
        {
            title: 'Settings',
            icon: 'cog',
            route: '/screens/settings',
            description: 'App preferences and configuration'
        }
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                        Rygtek
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                        Professional rigging calculations and safety tools
                    </Text>
                </View>

                <View style={{ gap: 15 }}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 12,
                                flexDirection: 'row',
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3,
                            }}
                            onPress={() => router.push(item.route as any)}
                        >
                            <View style={{
                                backgroundColor: '#E53935',
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 15
                            }}>
                                <FontAwesome5 name={item.icon} size={20} color="white" />
                            </View>
                            
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 4 }}>
                                    {item.title}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#666' }}>
                                    {item.description}
                                </Text>
                            </View>
                            
                            <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 