import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

    const settingsItems = [
        {
            title: 'Account',
            icon: 'user',
            route: '/screens/account-settings',
            hasArrow: true
        },
        {
            title: 'Notifications',
            icon: 'bell',
            isToggle: true,
            value: notificationsEnabled,
            onValueChange: setNotificationsEnabled
        },
        {
            title: 'Dark Mode',
            icon: 'moon',
            isToggle: true,
            value: darkModeEnabled,
            onValueChange: setDarkModeEnabled
        },
        {
            title: 'Units',
            icon: 'ruler',
            route: '/screens/units-settings',
            hasArrow: true
        },
        {
            title: 'Privacy Policy',
            icon: 'shield-alt',
            route: '/screens/privacy-policy',
            hasArrow: true
        },
        {
            title: 'Terms of Service',
            icon: 'file-contract',
            route: '/screens/terms-of-service',
            hasArrow: true
        },
        {
            title: 'About',
            icon: 'info-circle',
            route: '/screens/about',
            hasArrow: true
        }
    ];

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
                        <FontAwesome5 name="cog" size={30} color="white" />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                        Settings
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                        Customize your app experience
                    </Text>
                </View>

                <View style={{ gap: 15 }}>
                    {settingsItems.map((item, index) => (
                        <View
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
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                                    {item.title}
                                </Text>
                            </View>
                            
                            {item.isToggle ? (
                                <Switch
                                    value={item.value}
                                    onValueChange={item.onValueChange}
                                    trackColor={{ false: '#767577', true: '#E53935' }}
                                    thumbColor={item.value ? '#fff' : '#f4f3f4'}
                                />
                            ) : item.hasArrow ? (
                                <TouchableOpacity onPress={() => router.push(item.route as any)}>
                                    <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 