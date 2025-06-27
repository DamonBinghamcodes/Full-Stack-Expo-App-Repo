import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet,
    TouchableOpacity,
    Modal,
    Alert,
    Share,
    FlatList,
    Animated,
    TextInput,
    Dimensions
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

interface CraneSignal {
    id: string;
    title: string;
    handSignal: string;
    whistleBuzzer: string;
    icon: string;
    iconColor: string;
    category: string;
    description: string;
    safetyNote?: string;
}

const craneSignals: CraneSignal[] = [
    {
        id: 'hoist-up',
        title: 'Hoisting Up / Raise',
        handSignal: 'Arm raised, index finger pointing upward, small circle motion',
        whistleBuzzer: '2 Short Blasts',
        icon: 'arrow-up',
        iconColor: '#4CAF50',
        category: 'Lifting Operations',
        description: 'Signal to raise the load or hook. The circular motion indicates continuous operation.',
        safetyNote: 'Ensure load path is clear before signaling'
    },
    {
        id: 'hoist-down',
        title: 'Hoisting Down / Lower',
        handSignal: 'Arm extended downward, index finger pointing down, small circle motion',
        whistleBuzzer: '1 Long Blast',
        icon: 'arrow-down',
        iconColor: '#FF9800',
        category: 'Lifting Operations',
        description: 'Signal to lower the load or hook. Control descent speed with signal intensity.',
        safetyNote: 'Maintain visual contact with landing area'
    },
    {
        id: 'luffing-boom-up',
        title: 'Luffing Boom Up',
        handSignal: 'Thumb upward motion',
        whistleBuzzer: '3 Short Blasts',
        icon: 'thumbs-up',
        iconColor: '#2196F3',
        category: 'Boom Operations',
        description: 'Signal to raise the boom or jib. Used on mobile and tower cranes.',
        safetyNote: 'Check for overhead obstructions'
    },
    {
        id: 'luffing-boom-down',
        title: 'Luffing Boom Down',
        handSignal: 'Thumb downward motion',
        whistleBuzzer: '4 Short Blasts',
        icon: 'thumbs-down',
        iconColor: '#FF5722',
        category: 'Boom Operations',
        description: 'Signal to lower the boom or jib. Monitor load radius changes.',
        safetyNote: 'Be aware of changing load capacity'
    },
    {
        id: 'slewing-right',
        title: 'Slewing Right',
        handSignal: 'Arm outstretched, pointing right',
        whistleBuzzer: '1 Long, 2 Short',
        icon: 'arrow-right',
        iconColor: '#9C27B0',
        category: 'Rotation Operations',
        description: 'Signal to rotate the crane clockwise (when viewed from above).',
        safetyNote: 'Maintain safe slewing speed'
    },
    {
        id: 'slewing-left',
        title: 'Slewing Left',
        handSignal: 'Arm outstretched, pointing left',
        whistleBuzzer: '1 Long, 1 Short',
        icon: 'arrow-left',
        iconColor: '#9C27B0',
        category: 'Rotation Operations',
        description: 'Signal to rotate the crane counter-clockwise (when viewed from above).',
        safetyNote: 'Check swing radius clearance'
    },
    {
        id: 'jib-trolley-out',
        title: 'Jib-Trolley Out (Telescoping Boom Extended)',
        handSignal: 'Both hands pushing outward',
        whistleBuzzer: '1 Long, 3 Short',
        icon: 'expand-arrows-alt',
        iconColor: '#607D8B',
        category: 'Extension Operations',
        description: 'Signal to extend the trolley out on tower cranes or extend telescoping boom.',
        safetyNote: 'Monitor load capacity reduction'
    },
    {
        id: 'jib-trolley-in',
        title: 'Jib-Trolley In (Telescoping Boom Retract)',
        handSignal: 'Both hands pulling inward',
        whistleBuzzer: '1 Long, 4 Short',
        icon: 'compress-arrows-alt',
        iconColor: '#607D8B',
        category: 'Extension Operations',
        description: 'Signal to retract the trolley in on tower cranes or retract telescoping boom.',
        safetyNote: 'Load capacity increases as radius decreases'
    },
    {
        id: 'travel-traverse',
        title: 'Travel and Traverse',
        handSignal: 'Arm swinging horizontally in direction of travel',
        whistleBuzzer: 'Not Applicable',
        icon: 'exchange-alt',
        iconColor: '#795548',
        category: 'Travel Operations',
        description: 'Signal for crane or trolley travel. Point in direction of intended movement.',
        safetyNote: 'Ensure travel path is clear'
    },
    {
        id: 'stop',
        title: 'STOP',
        handSignal: 'Arm raised, palm open facing crane operator',
        whistleBuzzer: '1 Short Blast',
        icon: 'hand-paper',
        iconColor: '#F44336',
        category: 'Safety Signals',
        description: 'Emergency stop signal. ALL operations must cease immediately.',
        safetyNote: 'This signal overrides all other commands'
    },
    {
        id: 'emergency-stop',
        title: 'Emergency Stop',
        handSignal: 'Both arms raised, crossed above head',
        whistleBuzzer: 'Continuous Blasts',
        icon: 'exclamation-triangle',
        iconColor: '#F44336',
        category: 'Safety Signals',
        description: 'Critical emergency stop. Used when immediate danger is present.',
        safetyNote: 'Operator must stop all functions immediately'
    },
    {
        id: 'use-main-hoist',
        title: 'Use Main Hoist',
        handSignal: 'One finger held up, then normal signal',
        whistleBuzzer: 'Normal signals preceded by 1 short',
        icon: 'hand-point-up',
        iconColor: '#3F51B5',
        category: 'Multi-Hook Operations',
        description: 'Indicates signals apply to main hoist on multi-hook cranes.',
        safetyNote: 'Clearly distinguish between hoists'
    },
    {
        id: 'use-auxiliary-hoist',
        title: 'Use Auxiliary Hoist',
        handSignal: 'Two fingers held up, then normal signal',
        whistleBuzzer: 'Normal signals preceded by 2 short',
        icon: 'hand-peace',
        iconColor: '#3F51B5',
        category: 'Multi-Hook Operations',
        description: 'Indicates signals apply to auxiliary hoist on multi-hook cranes.',
        safetyNote: 'Confirm correct hoist before operation'
    }
];

const categories = ['All', 'Lifting Operations', 'Boom Operations', 'Rotation Operations', 'Extension Operations', 'Travel Operations', 'Safety Signals', 'Multi-Hook Operations'];

export default function CraneSignalsScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedSignal, setSelectedSignal] = useState<CraneSignal | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const filteredSignals = craneSignals.filter(signal => {
        const matchesCategory = selectedCategory === 'All' || signal.category === selectedCategory;
        const matchesSearch = signal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            signal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            signal.handSignal.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const viewSignalDetail = (signal: CraneSignal) => {
        setSelectedSignal(signal);
        setShowModal(true);
    };

    const shareSignal = async (signal: CraneSignal) => {
        try {
            await Share.share({
                message: `${signal.title}\n\nHand Signal: ${signal.handSignal}\nWhistle/Buzzer: ${signal.whistleBuzzer}\n\n${signal.description}\n\nShared from RYGTEK Crane Signals`,
                title: `Crane Signal: ${signal.title}`
            });
        } catch (error) {
            Alert.alert('Error', 'Unable to share signal');
        }
    };

    const exportAllSignals = async () => {
        try {
            const signalsList = craneSignals.map(signal => 
                `${signal.title}\nHand Signal: ${signal.handSignal}\nWhistle/Buzzer: ${signal.whistleBuzzer}\nDescription: ${signal.description}\n`
            ).join('\n---\n\n');

            await Share.share({
                message: `RYGTEK Crane Hand Signals Reference\n\n${signalsList}\n\nGenerated from RYGTEK Mobile App`,
                title: 'Crane Signals Reference Guide'
            });
        } catch (error) {
            Alert.alert('Error', 'Unable to export signals');
        }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const renderSignalCard = ({ item }: { item: CraneSignal }) => (
        <TouchableOpacity 
            style={styles.signalCard}
            onPress={() => viewSignalDetail(item)}
            activeOpacity={0.8}
        >
            <View style={styles.signalIconContainer}>
                <FontAwesome5 name={item.icon} size={28} color={item.iconColor} />
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category.split(' ')[0]}</Text>
                </View>
            </View>
            
            <View style={styles.signalContent}>
                <Text style={styles.signalTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.signalDetail}>
                    <FontAwesome5 name="hand-paper" size={12} color="#4CAF50" />
                    <Text style={styles.signalDetailText} numberOfLines={2}>
                        {item.handSignal}
                    </Text>
                </View>
                <View style={styles.signalDetail}>
                    <FontAwesome5 name="volume-up" size={12} color="#2196F3" />
                    <Text style={styles.signalDetailText} numberOfLines={1}>
                        {item.whistleBuzzer}
                    </Text>
                </View>
                {item.safetyNote && (
                    <View style={styles.signalSafetyIndicator}>
                        <FontAwesome5 name="shield-alt" size={10} color="#e31e24" />
                        <Text style={styles.safetyIndicatorText}>Safety Note</Text>
                    </View>
                )}
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={(e) => {
                        e.stopPropagation();
                        shareSignal(item);
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <FontAwesome5 name="share-alt" size={14} color="#666" />
                </TouchableOpacity>
                <FontAwesome5 name="chevron-right" size={14} color="#666" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header showHamburger onHamburger={() => setMenuVisible(true)} />
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="hands" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>Crane Signals</Text>
                    <Text style={styles.subtitle}>
                        Standard hand signals and whistle commands for safe crane operations
                    </Text>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{craneSignals.length}</Text>
                        <Text style={styles.statLabel}>Total Signals</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{categories.length - 1}</Text>
                        <Text style={styles.statLabel}>Categories</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>AS 2550</Text>
                        <Text style={styles.statLabel}>Compliant</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <FontAwesome5 name="search" size={16} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search signals..."
                            placeholderTextColor="#666"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity 
                                onPress={() => setSearchQuery('')}
                                style={styles.clearSearchButton}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <FontAwesome5 name="times" size={14} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Category Filter & Export */}
                <View style={styles.controlsContainer}>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoryScroll}
                        contentContainerStyle={styles.categoryScrollContent}
                    >
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.categoryButtonActive
                                ]}
                                onPress={() => setSelectedCategory(category)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.categoryButtonTextActive
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    
                    <TouchableOpacity 
                        style={styles.exportButton} 
                        onPress={exportAllSignals}
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <FontAwesome5 name="share-alt" size={16} color="#e31e24" />
                    </TouchableOpacity>
                </View>

                {/* Signals List */}
                <View style={styles.signalsContainer}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>
                            {selectedCategory === 'All' ? 'All Signals' : selectedCategory} 
                        </Text>
                        <Text style={styles.listSubtitle}>
                            {filteredSignals.length} signal{filteredSignals.length !== 1 ? 's' : ''} 
                            {searchQuery ? ` found for "${searchQuery}"` : ''}
                        </Text>
                    </View>
                    
                    {filteredSignals.length === 0 ? (
                        <View style={styles.emptyState}>
                            <FontAwesome5 name="search" size={48} color="#666" />
                            <Text style={styles.emptyStateTitle}>No signals found</Text>
                            <Text style={styles.emptyStateText}>
                                {searchQuery 
                                    ? `No signals match "${searchQuery}". Try adjusting your search.`
                                    : 'No signals available for the selected category.'
                                }
                            </Text>
                            {searchQuery && (
                                <TouchableOpacity 
                                    style={styles.clearSearchButton}
                                    onPress={() => setSearchQuery('')}
                                >
                                    <Text style={styles.clearSearchText}>Clear Search</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        <FlatList
                            data={filteredSignals}
                            renderItem={renderSignalCard}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.signalsList}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    )}
                </View>
            </Animated.View>

            {/* Signal Detail Modal */}
            <Modal
                visible={showModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowModal(false)}
            >
                {selectedSignal && (
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalTitleContainer}>
                                <Text style={styles.modalTitle} numberOfLines={2}>{selectedSignal.title}</Text>
                                <View style={styles.modalCategoryBadge}>
                                    <Text style={styles.modalCategoryText}>{selectedSignal.category}</Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                onPress={() => setShowModal(false)}
                                style={styles.modalCloseButton}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <FontAwesome5 name="times" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView 
                            style={styles.modalContent}
                            contentContainerStyle={styles.modalScrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Signal Icon */}
                            <View style={styles.modalIconContainer}>
                                <FontAwesome5 
                                    name={selectedSignal.icon} 
                                    size={80} 
                                    color={selectedSignal.iconColor} 
                                />
                            </View>

                            {/* Signal Details */}
                            <View style={styles.modalDetailsContainer}>
                                <View style={styles.modalDetailCard}>
                                    <View style={styles.modalDetailHeader}>
                                        <FontAwesome5 name="hand-paper" size={18} color="#4CAF50" />
                                        <Text style={styles.modalDetailTitle}>Hand Signal</Text>
                                    </View>
                                    <Text style={styles.modalDetailText}>{selectedSignal.handSignal}</Text>
                                </View>

                                <View style={styles.modalDetailCard}>
                                    <View style={styles.modalDetailHeader}>
                                        <FontAwesome5 name="volume-up" size={18} color="#2196F3" />
                                        <Text style={styles.modalDetailTitle}>Whistle/Buzzer Signal</Text>
                                    </View>
                                    <Text style={styles.modalDetailText}>{selectedSignal.whistleBuzzer}</Text>
                                </View>

                                <View style={styles.modalDetailCard}>
                                    <View style={styles.modalDetailHeader}>
                                        <FontAwesome5 name="info-circle" size={18} color="#FF9800" />
                                        <Text style={styles.modalDetailTitle}>Description</Text>
                                    </View>
                                    <Text style={styles.modalDetailText}>{selectedSignal.description}</Text>
                                </View>

                                {selectedSignal.safetyNote && (
                                    <View style={[styles.modalDetailCard, styles.safetyCard]}>
                                        <View style={styles.modalDetailHeader}>
                                            <FontAwesome5 name="shield-alt" size={18} color="#e31e24" />
                                            <Text style={styles.modalDetailTitle}>Safety Note</Text>
                                        </View>
                                        <Text style={styles.modalDetailText}>{selectedSignal.safetyNote}</Text>
                                    </View>
                                )}
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.modalActions}>
                                <TouchableOpacity 
                                    style={styles.modalActionButton}
                                    onPress={() => shareSignal(selectedSignal)}
                                    activeOpacity={0.8}
                                >
                                    <FontAwesome5 name="share-alt" size={16} color="#fff" />
                                    <Text style={styles.modalActionText}>Share This Signal</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                )}
            </Modal>
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
        padding: 16,
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
    statsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#23232a',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        minHeight: 70,
        justifyContent: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e31e24',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'center',
    },
    searchContainer: {
        marginBottom: 16,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#23232a',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        paddingVertical: 0,
    },
    clearSearchButton: {
        padding: 4,
        marginLeft: 8,
    },
    clearSearchText: {
        color: '#e31e24',
        fontSize: 16,
        fontWeight: '600',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    categoryScroll: {
        flex: 1,
    },
    categoryScrollContent: {
        paddingRight: 12,
    },
    categoryButton: {
        backgroundColor: '#23232a',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#333',
        minHeight: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryButtonActive: {
        backgroundColor: '#e31e24',
        borderColor: '#e31e24',
    },
    categoryButtonText: {
        color: '#aaa',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryButtonTextActive: {
        color: '#fff',
    },
    exportButton: {
        backgroundColor: '#23232a',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e31e24',
    },
    signalsContainer: {
        flex: 1,
    },
    listHeader: {
        marginBottom: 16,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    listSubtitle: {
        fontSize: 14,
        color: '#aaa',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    separator: {
        height: 12,
    },
    signalsList: {
        paddingBottom: 20,
    },
    signalCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    signalIconContainer: {
        position: 'relative',
        marginRight: 16,
        width: 70,
        height: 70,
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    categoryBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#e31e24',
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    },
    categoryText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
    },
    signalContent: {
        flex: 1,
        gap: 8,
        paddingTop: 2,
    },
    signalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        lineHeight: 22,
    },
    signalDetail: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    signalDetailText: {
        flex: 1,
        fontSize: 13,
        color: '#ddd',
        lineHeight: 18,
    },
    signalSafetyIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    safetyIndicatorText: {
        fontSize: 11,
        color: '#e31e24',
        fontWeight: '600',
    },
    cardActions: {
        alignItems: 'center',
        gap: 12,
        marginLeft: 8,
        paddingTop: 4,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#101014',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        backgroundColor: '#23232a',
    },
    modalCloseButton: {
        padding: 4,
        borderRadius: 8,
    },
    modalTitleContainer: {
        flex: 1,
        marginRight: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    modalCategoryBadge: {
        backgroundColor: '#e31e24',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    modalCategoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    modalContent: {
        flex: 1,
    },
    modalScrollContent: {
        paddingBottom: 40,
    },
    modalIconContainer: {
        backgroundColor: '#23232a',
        margin: 20,
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    modalDetailsContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
    modalDetailCard: {
        backgroundColor: '#23232a',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    modalDetailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    modalDetailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalDetailText: {
        fontSize: 15,
        color: '#ddd',
        lineHeight: 22,
    },
    safetyCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#e31e24',
    },
    modalActions: {
        padding: 20,
        gap: 12,
    },
    modalActionButton: {
        backgroundColor: '#e31e24',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: 52,
    },
    modalActionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 