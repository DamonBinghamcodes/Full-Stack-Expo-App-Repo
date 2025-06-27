import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking, Modal, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';
import { useRouter, usePathname } from 'expo-router';

export default function ContactScreen() {
    const router = useRouter();
    const pathname = usePathname();
    const [menuVisible, setMenuVisible] = useState(false);

    const menuItems = [
        { title: 'Main Menu', icon: 'th-large', route: '/screens/main-menu' },
        { title: 'Working Load Limit', icon: 'weight-hanging', route: '/screens/working-load-limit' },
        { title: 'Angle & Dimensions', icon: 'ruler-combined', route: '/screens/angle-dimensions' },
        { title: 'Load Estimator', icon: 'calculator', route: '/screens/load-weight' },
        { title: 'Lifting Register', icon: 'clipboard-list', route: '/screens/lifting-register' },
        { title: 'Safety Alerts', icon: 'exclamation-triangle', route: '/screens/safety-alerts' },
        { title: 'Shop', icon: 'shopping-cart', route: '/screens/shop' },
        { title: 'Contact', icon: 'envelope', route: '/screens/contact' },
        { title: 'Crane Signals', icon: 'hand-paper', route: '/screens/crane-signals' },
    ];

    const handleMenuItemPress = (route: string) => {
        setMenuVisible(false);
        setTimeout(() => router.replace(route as any), 200);
    };
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
            
            {/* Hamburger Modal Drawer */}
            <Modal
                visible={menuVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)} />
                <View style={styles.drawerModern}>
                    <TouchableOpacity
                        onPress={() => setMenuVisible(false)}
                        style={{ position: 'absolute', top: 18, right: 18, zIndex: 10, padding: 8 }}
                        hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                    >
                        <FontAwesome5 name="times" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.drawerTitle}>Navigation</Text>
                    <ScrollView contentContainerStyle={{ paddingVertical: 0 }}>
                        {menuItems.map((item, idx) => {
                            const isActive = pathname === item.route;
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    style={[styles.drawerItemModern, isActive && styles.drawerItemActive]}
                                    onPress={() => handleMenuItemPress(item.route)}
                                    activeOpacity={0.8}
                                >
                                    <FontAwesome5 name={item.icon} size={20} color={isActive ? '#e31e24' : '#fff'} style={{ marginRight: 16 }} />
                                    <Text style={[styles.drawerItemTextModern, isActive && styles.drawerItemTextActive]}>{item.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="envelope" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>
                        Contact Us
                    </Text>
                    <Text style={styles.subtitle}>
                        Get in touch with our support team
                    </Text>
                </View>

                <View style={styles.contactGrid}>
                    {contactInfo.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.contactCard}
                            onPress={item.action}
                            activeOpacity={0.8}
                        >
                            <View style={styles.contactIconContainer}>
                                <FontAwesome5 name={item.icon} size={20} color="white" />
                            </View>
                            
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.contactValue}>
                                    {item.value}
                                </Text>
                            </View>
                            
                            <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.supportCard}>
                    <Text style={styles.supportTitle}>
                        Support Hours
                    </Text>
                    <Text style={styles.supportText}>
                        Monday - Friday: 8:00 AM - 6:00 PM EST{'\n'}
                        Saturday: 9:00 AM - 3:00 PM EST{'\n'}
                        Sunday: Closed
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    iconContainer: {
        backgroundColor: '#e31e24',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        lineHeight: 22,
    },
    contactGrid: {
        gap: 15,
    },
    contactCard: {
        backgroundColor: '#23232a',
        padding: 20,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minHeight: 80,
    },
    contactIconContainer: {
        backgroundColor: '#e31e24',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    contactValue: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 20,
    },
    supportCard: {
        backgroundColor: '#23232a',
        padding: 24,
        borderRadius: 16,
        marginTop: 20,
    },
    supportTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 15,
    },
    supportText: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 20,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1,
    },
    drawerModern: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 290,
        height: '100%',
        backgroundColor: 'rgba(24,24,28,0.85)',
        paddingTop: 48,
        paddingHorizontal: 0,
        zIndex: 2,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,0.08)',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },
    drawerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 8,
        textAlign: 'left',
        paddingLeft: 24,
    },
    drawerItemModern: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.06)',
        backgroundColor: 'transparent',
        minHeight: 56,
    },
    drawerItemActive: {
        backgroundColor: 'rgba(227,30,36,0.12)',
    },
    drawerItemTextModern: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '500',
    },
    drawerItemTextActive: {
        color: '#e31e24',
        fontWeight: 'bold',
    },
}); 