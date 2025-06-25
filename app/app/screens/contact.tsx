import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';
import { Pressable } from 'react-native';

export default function ContactScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const contactInfo = [
        {
            title: 'Email',
            value: 'info@rygtek.com',
            icon: 'envelope',
            action: () => Linking.openURL('mailto:info@rygtek.com')
        },
        {
            title: 'Phone',
            value: '+1 (555) 123-4567',
            icon: 'phone',
            action: () => Linking.openURL('tel:+15551234567')
        },
        {
            title: 'Website',
            value: 'www.rygtek.com',
            icon: 'globe',
            action: () => Linking.openURL('https://www.rygtek.com')
        },
        {
            title: 'Instagram',
            value: '@rygtek',
            icon: 'instagram',
            action: () => Linking.openURL('https://instagram.com/rygtek')
        },
        {
            title: 'YouTube',
            value: '@rygtek',
            icon: 'youtube',
            action: () => Linking.openURL('https://youtube.com/@rygtek')
        },
        {
            title: 'LinkedIn',
            value: 'Rygtek',
            icon: 'linkedin',
            action: () => Linking.openURL('https://linkedin.com/company/rygtek')
        }
    ];

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
                        <FontAwesome5 name="envelope" size={30} color="white" />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                        Contact Us
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                        Get in touch with our support team
                    </Text>
                </View>

                <View style={{ gap: 15 }}>
                    {contactInfo.map((item, index) => (
                        <Pressable
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
                            onPress={item.action}
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
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>
                                    {item.title}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#666' }}>
                                    {item.value}
                                </Text>
                            </View>
                            
                            <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
                        </Pressable>
                    ))}
                </View>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15 }}>
                        Support Hours
                    </Text>
                    <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                        Monday - Friday: 8:00 AM - 6:00 PM EST{'\n'}
                        Saturday: 9:00 AM - 3:00 PM EST{'\n'}
                        Sunday: Closed
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 