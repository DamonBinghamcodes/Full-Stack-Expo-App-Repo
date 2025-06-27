import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Alert,
    Linking,
    ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';

interface SafetyAlert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    title: string;
    summary: string;
    content: string;
    date: string;
    source: string;
    category: string;
    affectedEquipment: string[];
    actions: string[];
}

interface SafetyTip {
    category: string;
    tip: string;
}

interface EmergencyContact {
    name: string;
    number: string;
    description: string;
}

const sampleAlerts: SafetyAlert[] = [
    {
        id: 'SA2025001',
        type: 'critical',
        title: 'Chain Sling Recall - ABC Manufacturing',
        summary: 'Immediate recall of Grade 80 chain slings due to weld defects',
        content: 'ABC Manufacturing has issued an immediate recall of all Grade 80 chain slings manufactured between January 2024 and March 2024. Testing has revealed weld defects that could lead to catastrophic failure. Check your equipment immediately and remove affected slings from service.',
        date: '2025-01-15',
        source: 'WorkSafe Australia',
        category: 'Equipment Recall',
        affectedEquipment: ['Chain Slings', 'Grade 80'],
        actions: ['Check serial numbers', 'Remove from service', 'Contact manufacturer', 'Report to WorkSafe']
    },
    {
        id: 'SA2025002',
        type: 'warning',
        title: 'Updated AS 2550.1 Standard',
        summary: 'New requirements for chain sling inspection intervals',
        content: 'The updated AS 2550.1 standard introduces new inspection frequency requirements for chain slings. Quarterly inspections are now mandatory for all Grade 80 and Grade 100 chain slings used in commercial operations.',
        date: '2025-01-10',
        source: 'Standards Australia',
        category: 'Regulatory Update',
        affectedEquipment: ['Chain Slings'],
        actions: ['Review inspection schedules', 'Update procedures', 'Train personnel']
    },
    {
        id: 'SA2025003',
        type: 'info',
        title: 'Rugby Tag System Reminder',
        summary: 'Q1 2025 color is Red - Update your equipment tags',
        content: 'Reminder that Q1 2025 rugby tag color is Red. Ensure all equipment tested in this quarter displays red tags for easy identification during inspections.',
        date: '2025-01-01',
        source: 'RYGTEK',
        category: 'System Update',
        affectedEquipment: ['All Equipment'],
        actions: ['Update rugby tags', 'Check tag colors', 'Update records']
    }
];

const safetyTipSets: SafetyTip[][] = [
    [
        { category: 'Equipment', tip: 'Always inspect rigging equipment before each use for signs of wear, damage, or deformation' },
        { category: 'Equipment', tip: 'Verify the Working Load Limit (WLL) is sufficient for your lifting operation' },
        { category: 'Equipment', tip: 'Never exceed the recommended sling angle - keep between 30° and 60° from vertical' },
        { category: 'Equipment', tip: 'Protect slings from sharp edges using corner blocks or protective padding' }
    ],
    [
        { category: 'Environment', tip: 'Check weather conditions before outdoor lifting operations - avoid high winds' },
        { category: 'Environment', tip: 'Ensure the ground is stable and level for crane setup and operation' },
        { category: 'Environment', tip: 'Identify and avoid overhead hazards including power lines and structures' },
        { category: 'Environment', tip: 'Maintain adequate lighting and visibility for all lifting operations' }
    ],
    [
        { category: 'Communication', tip: 'Use standard crane hand signals and ensure all team members understand them' },
        { category: 'Communication', tip: 'Maintain clear radio communication between rigger and crane operator' },
        { category: 'Communication', tip: 'Anyone can stop a lift - exercise stop authority when safety is compromised' },
        { category: 'Communication', tip: 'Conduct thorough pre-lift meetings to review the lifting plan and procedures' }
    ],
    [
        { category: 'Personal Safety', tip: 'Wear appropriate Personal Protective Equipment (PPE) at all times' },
        { category: 'Personal Safety', tip: 'Stay out of the load path - never work under a suspended load' },
        { category: 'Personal Safety', tip: 'Take regular breaks and stay alert - fatigue increases accident risk' },
        { category: 'Personal Safety', tip: 'Ensure training and competency assessments are current for all personnel' }
    ]
];

const emergencyContacts: EmergencyContact[] = [
    { name: 'Emergency Services', number: '000', description: 'Police, Fire, Ambulance' },
    { name: 'WorkSafe Australia', number: '13 10 50', description: 'National workplace safety hotline' },
    { name: 'WorkSafe NSW', number: '1800 136 089', description: 'NSW workplace safety' },
    { name: 'NATA', number: '1800 621 666', description: 'National testing authority' },
    { name: 'Standards Australia', number: '1800 035 822', description: 'Australian standards information' }
];

export default function SafetyAlertsScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [currentTipSet, setCurrentTipSet] = useState(0);
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
    const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
    const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

    const filteredAlerts = alertFilter === 'all' 
        ? sampleAlerts 
        : sampleAlerts.filter(alert => alert.type === alertFilter);

    const currentTips = safetyTipSets[currentTipSet];

    const refreshTips = () => {
        setCurrentTipSet((prev) => (prev + 1) % safetyTipSets.length);
    };

    const handleSubscribe = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setIsSubscribing(true);
        
        // Simulate subscription process
        setTimeout(() => {
            setIsSubscribing(false);
            setIsSubscribed(true);
            Alert.alert('Success', 'Successfully subscribed to safety alerts!');
            
            // Reset after showing success
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 2000);
        }, 1500);
    };

    const openExternalLink = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            Alert.alert('Error', 'Unable to open link');
        }
    };

    const callEmergencyNumber = (number: string) => {
        Linking.openURL(`tel:${number}`);
    };

    const getAlertTypeColor = (type: string) => {
        switch (type) {
            case 'critical': return '#FF3B30';
            case 'warning': return '#FFCC00';
            case 'info': return '#007AFF';
            default: return '#666';
        }
    };

    const getAlertTypeIcon = (type: string) => {
        switch (type) {
            case 'critical': return 'exclamation-triangle';
            case 'warning': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'bell';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header showHamburger onHamburger={() => setMenuVisible(true)} />
            <ScrollView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="exclamation-triangle" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>Safety Alerts</Text>
                    <Text style={styles.subtitle}>
                        Stay informed with critical safety notifications
                    </Text>
                </View>

                {/* Premium Notice */}
                <LinearGradient
                    colors={['#FFCC00', '#FF9500']}
                    style={styles.premiumNotice}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.premiumContent}>
                        <FontAwesome5 name="crown" size={32} color="#FFF" />
                        <Text style={styles.premiumTitle}>Premium Safety Alerts</Text>
                        <Text style={styles.premiumText}>
                            Get real-time WorkSafe alerts, equipment recalls, and regulatory updates
                        </Text>
                        
                        {/* Email Subscription */}
                        <View style={styles.subscriptionForm}>
                            <TextInput
                                style={styles.emailInput}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email for alerts"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity 
                                style={[styles.subscribeButton, isSubscribing && styles.subscribeButtonLoading]}
                                onPress={handleSubscribe}
                                disabled={isSubscribing}
                            >
                                {isSubscribing ? (
                                    <ActivityIndicator size="small" color="#FFF" />
                                ) : isSubscribed ? (
                                    <FontAwesome5 name="check" size={16} color="#FFF" />
                                ) : (
                                    <Text style={styles.subscribeButtonText}>Subscribe</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                {/* Alert Filters */}
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Filter Alerts:</Text>
                    <View style={styles.filterButtons}>
                        {['all', 'critical', 'warning', 'info'].map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    alertFilter === filter && styles.filterButtonActive
                                ]}
                                onPress={() => setAlertFilter(filter as any)}
                            >
                                <Text style={[
                                    styles.filterButtonText,
                                    alertFilter === filter && styles.filterButtonTextActive
                                ]}>
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Safety Alerts */}
                <View style={styles.alertsSection}>
                    <Text style={styles.sectionTitle}>Current Safety Alerts</Text>
                    {filteredAlerts.map((alert) => (
                        <TouchableOpacity
                            key={alert.id}
                            style={styles.alertCard}
                            onPress={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                        >
                            <View style={styles.alertHeader}>
                                <View style={styles.alertType}>
                                    <FontAwesome5 
                                        name={getAlertTypeIcon(alert.type)} 
                                        size={16} 
                                        color={getAlertTypeColor(alert.type)} 
                                    />
                                    <Text style={[styles.alertTypeText, { color: getAlertTypeColor(alert.type) }]}>
                                        {alert.type.toUpperCase()}
                                    </Text>
                                </View>
                                <Text style={styles.alertDate}>{alert.date}</Text>
                            </View>
                            
                            <Text style={styles.alertTitle}>{alert.title}</Text>
                            <Text style={styles.alertSummary}>{alert.summary}</Text>
                            
                            {expandedAlert === alert.id && (
                                <View style={styles.alertExpanded}>
                                    <Text style={styles.alertContent}>{alert.content}</Text>
                                    
                                    <View style={styles.alertMeta}>
                                        <Text style={styles.alertMetaLabel}>Source: {alert.source}</Text>
                                        <Text style={styles.alertMetaLabel}>Category: {alert.category}</Text>
                                    </View>
                                    
                                    {alert.affectedEquipment.length > 0 && (
                                        <View style={styles.affectedEquipment}>
                                            <Text style={styles.alertMetaTitle}>Affected Equipment:</Text>
                                            {alert.affectedEquipment.map((equipment, index) => (
                                                <Text key={index} style={styles.equipmentItem}>• {equipment}</Text>
                                            ))}
                                        </View>
                                    )}
                                    
                                    {alert.actions.length > 0 && (
                                        <View style={styles.requiredActions}>
                                            <Text style={styles.alertMetaTitle}>Required Actions:</Text>
                                            {alert.actions.map((action, index) => (
                                                <Text key={index} style={styles.actionItem}>• {action}</Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}
                            
                            <View style={styles.alertFooter}>
                                <FontAwesome5 
                                    name={expandedAlert === alert.id ? "chevron-up" : "chevron-down"} 
                                    size={14} 
                                    color="#666" 
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Daily Safety Tips */}
                <View style={styles.tipsSection}>
                    <View style={styles.tipsHeader}>
                        <Text style={styles.sectionTitle}>Daily Safety Tips</Text>
                        <TouchableOpacity style={styles.refreshButton} onPress={refreshTips}>
                            <FontAwesome5 name="sync-alt" size={16} color="#e31e24" />
                            <Text style={styles.refreshButtonText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.tipsGrid}>
                        {currentTips.map((tip, index) => (
                            <View key={index} style={styles.tipCard}>
                                <View style={styles.tipHeader}>
                                    <FontAwesome5 name="lightbulb" size={16} color="#FFC107" />
                                    <Text style={styles.tipCategory}>{tip.category}</Text>
                                </View>
                                <Text style={styles.tipText}>{tip.tip}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Safety Resources */}
                <View style={styles.resourcesSection}>
                    <Text style={styles.sectionTitle}>Safety Resources</Text>
                    
                    <TouchableOpacity 
                        style={styles.resourceCard}
                        onPress={() => openExternalLink('https://www.safeworkaustralia.gov.au/')}
                    >
                        <FontAwesome5 name="shield-alt" size={24} color="#4CAF50" />
                        <View style={styles.resourceInfo}>
                            <Text style={styles.resourceTitle}>WorkSafe Australia</Text>
                            <Text style={styles.resourceDescription}>Official workplace safety guidance</Text>
                        </View>
                        <FontAwesome5 name="external-link-alt" size={16} color="#666" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.resourceCard}
                        onPress={() => openExternalLink('https://www.standards.org.au/')}
                    >
                        <FontAwesome5 name="book" size={24} color="#2196F3" />
                        <View style={styles.resourceInfo}>
                            <Text style={styles.resourceTitle}>AS/NZS Standards</Text>
                            <Text style={styles.resourceDescription}>Australian and New Zealand standards</Text>
                        </View>
                        <FontAwesome5 name="external-link-alt" size={16} color="#666" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.resourceCard}
                        onPress={() => setShowEmergencyContacts(true)}
                    >
                        <FontAwesome5 name="phone" size={24} color="#FF5722" />
                        <View style={styles.resourceInfo}>
                            <Text style={styles.resourceTitle}>Emergency Contacts</Text>
                            <Text style={styles.resourceDescription}>Important safety contact numbers</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color="#666" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Emergency Contacts Modal */}
            <Modal
                visible={showEmergencyContacts}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowEmergencyContacts(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Emergency Contacts</Text>
                        <TouchableOpacity onPress={() => setShowEmergencyContacts(false)}>
                            <FontAwesome5 name="times" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.modalContent}>
                        {emergencyContacts.map((contact, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.emergencyCard}
                                onPress={() => callEmergencyNumber(contact.number)}
                            >
                                <View style={styles.emergencyInfo}>
                                    <Text style={styles.emergencyName}>{contact.name}</Text>
                                    <Text style={styles.emergencyDescription}>{contact.description}</Text>
                                </View>
                                <View style={styles.emergencyCall}>
                                    <Text style={styles.emergencyNumber}>{contact.number}</Text>
                                    <FontAwesome5 name="phone" size={16} color="#4CAF50" />
                                </View>
                            </TouchableOpacity>
                        ))}
                        
                        <View style={styles.emergencyNotice}>
                            <FontAwesome5 name="info-circle" size={16} color="#FF9800" />
                            <Text style={styles.emergencyNoticeText}>
                                Tap any number to call directly. For life-threatening emergencies, call 000 immediately.
                            </Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        backgroundColor: '#e31e24',
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#e31e24',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#9ca3af',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    premiumNotice: {
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    premiumContent: {
        padding: 24,
        alignItems: 'center',
    },
    premiumTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF',
        marginTop: 12,
        marginBottom: 8,
    },
    premiumText: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    subscriptionForm: {
        width: '100%',
        gap: 12,
    },
    emailInput: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1f2937',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        minHeight: 52,
    },
    subscribeButton: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 12,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 52,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    subscribeButtonLoading: {
        opacity: 0.7,
    },
    subscribeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    filterContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
    },
    filterButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#404040',
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#e31e24',
        borderColor: '#e31e24',
    },
    filterButtonText: {
        fontSize: 14,
        color: '#9ca3af',
        fontWeight: '500',
    },
    filterButtonTextActive: {
        color: '#fff',
    },
    alertsSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    alertCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    alertType: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    alertTypeText: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    alertDate: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: '500',
    },
    alertTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        lineHeight: 24,
    },
    alertSummary: {
        fontSize: 15,
        color: '#d1d5db',
        lineHeight: 22,
        marginBottom: 12,
    },
    alertExpanded: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#2a2a2a',
    },
    alertContent: {
        fontSize: 15,
        color: '#d1d5db',
        lineHeight: 24,
        marginBottom: 20,
    },
    alertMeta: {
        backgroundColor: '#262626',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    alertMetaLabel: {
        fontSize: 13,
        color: '#9ca3af',
        marginBottom: 4,
        fontWeight: '500',
    },
    alertMetaTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
    },
    affectedEquipment: {
        backgroundColor: '#262626',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    equipmentItem: {
        fontSize: 14,
        color: '#d1d5db',
        marginBottom: 6,
        paddingLeft: 8,
    },
    requiredActions: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
    },
    actionItem: {
        fontSize: 14,
        color: '#FFC107',
        marginBottom: 6,
        paddingLeft: 8,
        fontWeight: '500',
    },
    alertFooter: {
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#2a2a2a',
    },
    tipsSection: {
        marginBottom: 24,
    },
    tipsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#404040',
    },
    refreshButtonText: {
        color: '#e31e24',
        fontSize: 14,
        fontWeight: '600',
    },
    tipsGrid: {
        gap: 12,
    },
    tipCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    tipCategory: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFC107',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tipText: {
        fontSize: 15,
        color: '#d1d5db',
        lineHeight: 22,
    },
    resourcesSection: {
        marginBottom: 32,
    },
    resourceCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    resourceInfo: {
        flex: 1,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    resourceDescription: {
        fontSize: 14,
        color: '#9ca3af',
        lineHeight: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#1a1a1a',
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    emergencyCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    emergencyInfo: {
        flex: 1,
    },
    emergencyName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    emergencyDescription: {
        fontSize: 14,
        color: '#9ca3af',
        lineHeight: 20,
    },
    emergencyCall: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#262626',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
    },
    emergencyNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4CAF50',
    },
    emergencyNotice: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    emergencyNoticeText: {
        flex: 1,
        fontSize: 14,
        color: '#d1d5db',
        lineHeight: 22,
    },
}); 