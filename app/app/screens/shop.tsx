import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';
import { useRouter, usePathname } from 'expo-router';

export default function ShopScreen() {
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

    return (
        <SafeAreaView style={styles.container}>
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
                        <FontAwesome5 name="shopping-cart" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>
                        Shop
                    </Text>
                    <Text style={styles.subtitle}>
                        Purchase professional rigging equipment and tools
                    </Text>
                </View>

                <View style={styles.comingSoonCard}>
                    <View style={styles.comingSoonHeader}>
                        <FontAwesome5 name="tools" size={24} color="#e31e24" />
                        <Text style={styles.comingSoonTitle}>
                            Coming Soon
                        </Text>
                    </View>
                    <Text style={styles.comingSoonDescription}>
                        This feature is being migrated from the web version. It will include:
                    </Text>
                    <View style={styles.featureList}>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#4CAF50" />
                            <Text style={styles.featureText}>Rigging equipment catalog</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#4CAF50" />
                            <Text style={styles.featureText}>Safety gear and PPE</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#4CAF50" />
                            <Text style={styles.featureText}>Measurement tools</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#4CAF50" />
                            <Text style={styles.featureText}>Professional training materials</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#4CAF50" />
                            <Text style={styles.featureText}>Secure payment processing</Text>
                        </View>
                    </View>
                </View>

                {/* Categories Preview */}
                <View style={styles.categoriesCard}>
                    <Text style={styles.categoriesTitle}>Product Categories</Text>
                    <View style={styles.categoryGrid}>
                        <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                            <FontAwesome5 name="chain" size={32} color="#e31e24" />
                            <Text style={styles.categoryName}>Chains & Slings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                            <FontAwesome5 name="hard-hat" size={32} color="#e31e24" />
                            <Text style={styles.categoryName}>Safety Equipment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                            <FontAwesome5 name="ruler" size={32} color="#e31e24" />
                            <Text style={styles.categoryName}>Measuring Tools</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                            <FontAwesome5 name="book" size={32} color="#e31e24" />
                            <Text style={styles.categoryName}>Training Materials</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Information Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Professional Equipment</Text>
                    <Text style={styles.infoText}>
                        When available, our shop will feature professional-grade rigging equipment, 
                        safety gear, and training materials from trusted manufacturers. All products 
                        will meet or exceed industry standards.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101014',
    },
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
    comingSoonCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    comingSoonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    comingSoonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 12,
    },
    comingSoonDescription: {
        fontSize: 16,
        color: '#aaa',
        lineHeight: 22,
        marginBottom: 20,
    },
    featureList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureText: {
        fontSize: 14,
        color: '#ddd',
        marginLeft: 12,
        flex: 1,
    },
    categoriesCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    categoriesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    categoryItem: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        width: '47%',
        minHeight: 100,
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginTop: 12,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    infoText: {
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