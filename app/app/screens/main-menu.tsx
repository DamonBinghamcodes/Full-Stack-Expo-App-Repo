import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Modal, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import RygtekLogo from '@/components/RygtekLogo';
import Header from '@/components/Header';

export default function MainMenuScreen() {
    const router = useRouter();
    const pathname = usePathname();
    const [menuVisible, setMenuVisible] = useState(false);

    const menuItems = [
        {
            title: 'Main Menu',
            icon: 'th-large',
            route: '/screens/main-menu',
        },
        {
            title: 'Working Load Limit',
            icon: 'weight-hanging',
            route: '/screens/working-load-limit',
            description: 'Calculate chain or sling WLL based on configuration and size',
        },
        {
            title: 'Angle & Dimensions',
            icon: 'ruler-combined',
            route: '/screens/angle-dimensions',
            description: 'Determine sling angles and calculate missing dimensions',
        },
        {
            title: 'Load Estimator',
            icon: 'calculator',
            route: '/screens/load-weight',
            description: 'Estimate load weight by material type and dimensions',
        },
        {
            title: 'Lifting Register',
            icon: 'clipboard-list',
            route: '/screens/lifting-register',
            description: 'Track rigging gear test history and due dates',
        },
        {
            title: 'Safety Alerts',
            icon: 'exclamation-triangle',
            route: '/screens/safety-alerts',
            description: 'Access industry safety alerts and notifications',
            premium: true,
        },
        {
            title: 'Shop',
            icon: 'shopping-cart',
            route: '/screens/shop',
            description: 'Purchase equipment and tools',
        },
        {
            title: 'Contact',
            icon: 'envelope',
            route: '/screens/contact',
            description: 'Get in touch with support',
        },
        {
            title: 'Crane Signals',
            icon: 'hand-paper',
            route: '/screens/crane-signals',
            description: 'Crane hand signals guide',
        },
    ];

    const cardMenuItems = menuItems.filter(item => item.title !== 'Main Menu');

    const handleMenuItemPress = (route: string) => {
        setMenuVisible(false);
        setTimeout(() => router.replace(route as any), 200);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#101014' }}>
            <Header showBack showHamburger onBack={() => router.replace('/welcome')} onHamburger={() => setMenuVisible(true)} onLogo={() => router.replace('/welcome')} />
            {/* Hamburger Modal Drawer */}
            <Modal
                visible={menuVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)} />
                <View style={styles.drawerModern}>
                    {/* Close Button */}
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
                                    <FontAwesome5 name={item.icon} size={20} color={isActive ? '#FF2D20' : '#fff'} style={{ marginRight: 16 }} />
                                    <Text style={[styles.drawerItemTextModern, isActive && styles.drawerItemTextActive]}>{item.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView contentContainerStyle={{ padding: 0, flexGrow: 1 }}>
                {/* Logo */}
                {/*<View style={{ alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
                    <RygtekLogo />
                </View>*/}
                {/* Title */}
                <Text style={styles.heading}>Main Menu</Text>
                <Text style={styles.subheading}>Professional rigging tools at your fingertips</Text>
                {/* Menu Items */}
                <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    {cardMenuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.menuCard, item.premium && styles.premiumCard]}
                            onPress={() => router.push(item.route as any)}
                            activeOpacity={0.85}
                        >
                            <View style={[styles.iconCircle, item.premium && styles.premiumIconCircle]}>
                                <FontAwesome5 name={item.icon} size={24} color={item.premium ? '#FFC107' : '#E53935'} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuDesc}>{item.description}</Text>
                            </View>
                            {item.premium && (
                                <View style={styles.premiumBadge}>
                                    <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                                </View>
                            )}
                            <FontAwesome5 name="chevron-right" size={18} color="#888" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 32,
    },
    subheading: {
        color: '#aaa',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#23232a',
        borderRadius: 20,
        padding: 22,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 12,
        elevation: 8,
        transform: [{ scale: 1 }],
    },
    menuCardPressed: {
        opacity: 0.96,
        transform: [{ scale: 0.98 }],
        shadowOpacity: 0.32,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#23191a',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 2,
    },
    menuDesc: {
        color: '#aaa',
        fontSize: 15,
    },
    premiumCard: {
        borderWidth: 2,
        borderColor: '#FFC107',
        backgroundColor: '#23200f',
    },
    premiumIconCircle: {
        backgroundColor: '#3a2c13',
    },
    premiumBadge: {
        backgroundColor: '#FFC107',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
        alignSelf: 'flex-start',
    },
    premiumBadgeText: {
        color: '#18181c',
        fontWeight: 'bold',
        fontSize: 12,
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
        backdropFilter: 'blur(16px)',
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
    },
    drawerItemActive: {
        backgroundColor: 'rgba(255,45,32,0.12)',
    },
    drawerItemTextModern: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '500',
    },
    drawerItemTextActive: {
        color: '#FF2D20',
        fontWeight: 'bold',
    },
}); 