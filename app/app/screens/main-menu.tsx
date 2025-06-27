import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import RygtekLogo from '@/components/RygtekLogo';
import Header from '@/components/Header';

const BRAND_RED = "#e31e24";
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

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
                        style={styles.closeButton}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        activeOpacity={0.7}
                    >
                        <FontAwesome5 name="times" size={isSmallScreen ? 24 : 28} color="#fff" />
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
                                    <FontAwesome5 name={item.icon} size={20} color={isActive ? BRAND_RED : '#fff'} style={{ marginRight: 16 }} />
                                    <Text style={[styles.drawerItemTextModern, isActive && styles.drawerItemTextActive]}>{item.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView 
                contentContainerStyle={{ padding: 0, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Logo */}
                {/*<View style={{ alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
                    <RygtekLogo />
                </View>*/}
                {/* Title */}
                <Text style={styles.heading}>Main Menu</Text>
                <Text style={styles.subheading}>Professional rigging tools at your fingertips</Text>
                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {cardMenuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.menuCard, item.premium && styles.premiumCard]}
                            onPress={() => router.push(item.route as any)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.iconCircle, item.premium && styles.premiumIconCircle]}>
                                <FontAwesome5 name={item.icon} size={isSmallScreen ? 22 : 24} color={item.premium ? '#FFC107' : BRAND_RED} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuDesc}>{item.description}</Text>
                            </View>
                            {item.premium && (
                                <View style={styles.premiumBadge}>
                                    <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                                </View>
                            )}
                            <View style={styles.chevronContainer}>
                                <FontAwesome5 name="chevron-right" size={16} color="#666" />
                            </View>
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
        fontSize: isSmallScreen ? 26 : 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: isSmallScreen ? 24 : 32,
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    subheading: {
        color: '#aaa',
        fontSize: isSmallScreen ? 15 : 17,
        textAlign: 'center',
        marginBottom: isSmallScreen ? 20 : 24,
        paddingHorizontal: 30,
        lineHeight: isSmallScreen ? 20 : 24,
    },
    menuContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: isSmallScreen ? 18 : 22,
        marginBottom: isSmallScreen ? 14 : 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        minHeight: isSmallScreen ? 84 : 96,
    },
    iconCircle: {
        width: isSmallScreen ? 44 : 52,
        height: isSmallScreen ? 44 : 52,
        borderRadius: isSmallScreen ? 22 : 26,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: BRAND_RED,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    menuTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: isSmallScreen ? 17 : 19,
        marginBottom: 4,
        lineHeight: isSmallScreen ? 22 : 24,
    },
    menuDesc: {
        color: '#aaa',
        fontSize: isSmallScreen ? 13 : 15,
        lineHeight: isSmallScreen ? 18 : 20,
        flexWrap: 'wrap',
    },
    chevronContainer: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    premiumCard: {
        borderWidth: 2,
        borderColor: '#FFC107',
        backgroundColor: '#1f1e16',
        shadowColor: '#FFC107',
        shadowOpacity: 0.15,
    },
    premiumIconCircle: {
        backgroundColor: '#3a2c13',
        shadowColor: '#FFC107',
        shadowOpacity: 0.25,
    },
    premiumBadge: {
        backgroundColor: '#FFC107',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginLeft: 8,
        alignSelf: 'flex-start',
        shadowColor: '#FFC107',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    premiumBadgeText: {
        color: '#18181c',
        fontWeight: 'bold',
        fontSize: isSmallScreen ? 10 : 12,
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
        width: isSmallScreen ? 280 : 300,
        height: '100%',
        backgroundColor: 'rgba(18,18,22,0.95)',
        paddingTop: isSmallScreen ? 44 : 48,
        paddingHorizontal: 0,
        zIndex: 2,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    drawerTitle: {
        color: '#fff',
        fontSize: isSmallScreen ? 20 : 24,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 12,
        textAlign: 'left',
        paddingLeft: 24,
    },
    drawerItemModern: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: isSmallScreen ? 14 : 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'transparent',
        minHeight: isSmallScreen ? 56 : 60,
    },
    drawerItemActive: {
        backgroundColor: 'rgba(227,30,36,0.15)',
        borderLeftWidth: 3,
        borderLeftColor: BRAND_RED,
    },
    drawerItemTextModern: {
        color: '#fff',
        fontSize: isSmallScreen ? 16 : 17,
        fontWeight: '500',
        marginLeft: 4,
    },
    drawerItemTextActive: {
        color: BRAND_RED,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: isSmallScreen ? 16 : 18,
        right: isSmallScreen ? 16 : 18,
        zIndex: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 