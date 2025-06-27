import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
    FlatList,
    Share
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Header from '@/components/Header';
import { 
    EquipmentEntry,
    EquipmentStatus,
    loadEquipmentData,
    addEquipmentEntry,
    updateEquipmentEntry,
    deleteEquipmentEntry,
    recordTest,
    getEquipmentStatus,
    getEquipmentSummary,
    filterEquipmentByStatus,
    filterEquipmentByType,
    generateCSVExport,
    validateEquipmentEntry,
    equipmentTypes,
    getEquipmentTypesByCategory,
    getEquipmentTypeLabel
} from '@/utils/lifting-register';

interface FormData {
    id: string;
    type: string;
    wll: string;
    manufacturer: string;
    size: string;
    lastTestDate: string;
    testAuthority: string;
    notes: string;
}

export default function LiftingRegisterScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [equipment, setEquipment] = useState<EquipmentEntry[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentEntry | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | 'current' | 'due-soon' | 'overdue'>('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [formData, setFormData] = useState<FormData>({
        id: '',
        type: '',
        wll: '',
        manufacturer: '',
        size: '',
        lastTestDate: '',
        testAuthority: '',
        notes: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // Load equipment data on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await loadEquipmentData();
            setEquipment(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load equipment data');
        }
    };

    const handleAddEquipment = async () => {
        setLoading(true);
        try {
            const validation = validateEquipmentEntry({
                ...formData,
                wll: parseFloat(formData.wll) || 0
            });

            if (!validation.isValid) {
                setFormErrors(validation.errors);
                setLoading(false);
                return;
            }

            await addEquipmentEntry({
                ...formData,
                wll: parseFloat(formData.wll)
            });

            await loadData();
            setShowAddForm(false);
            resetForm();
            Alert.alert('Success', 'Equipment added successfully');
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Failed to add equipment');
        }
        setLoading(false);
    };

    const handleDeleteEquipment = (item: EquipmentEntry) => {
        Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete equipment "${item.id}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteEquipmentEntry(item.id);
                            await loadData();
                            Alert.alert('Success', 'Equipment deleted successfully');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete equipment');
                        }
                    }
                }
            ]
        );
    };

    const handleRecordTest = async (testData: any) => {
        if (!selectedEquipment) return;

        try {
            await recordTest(selectedEquipment.id, testData);
            await loadData();
            setShowTestModal(false);
            setSelectedEquipment(null);
            Alert.alert('Success', 'Test recorded successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to record test');
        }
    };

    const handleExport = async () => {
        try {
            const csvData = generateCSVExport(filteredEquipment);
            const fileName = `lifting_register_${new Date().toISOString().split('T')[0]}.csv`;
            
            await Share.share({
                message: csvData,
                title: 'Lifting Register Export'
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to export data');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            type: '',
            wll: '',
            manufacturer: '',
            size: '',
            lastTestDate: '',
            testAuthority: '',
            notes: ''
        });
        setFormErrors({});
    };

    // Filter equipment based on selected filters
    const filteredEquipment = filterEquipmentByType(
        filterEquipmentByStatus(equipment, statusFilter),
        typeFilter
    );

    const summary = getEquipmentSummary(equipment);
    const equipmentTypesByCategory = getEquipmentTypesByCategory();

    const getStatusBadge = (status: EquipmentStatus) => {
        return (
            <View style={[styles.statusBadge, { backgroundColor: status.color + '20', borderColor: status.color }]}>
                <FontAwesome5 name={status.icon} size={12} color={status.color} />
                <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
            </View>
        );
    };

    const renderEquipmentCard = ({ item }: { item: EquipmentEntry }) => {
        const status = getEquipmentStatus(item);
        const typeLabel = getEquipmentTypeLabel(item.type);

        return (
            <View style={styles.equipmentCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardTitle}>
                        <Text style={styles.equipmentId}>{item.id}</Text>
                        <Text style={styles.equipmentType}>{typeLabel}</Text>
                    </View>
                    {getStatusBadge(status)}
                </View>

                <View style={styles.cardContent}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>WLL:</Text>
                        <Text style={styles.detailValue}>{item.wll} tonnes</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Manufacturer:</Text>
                        <Text style={styles.detailValue}>{item.manufacturer}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Last Test:</Text>
                        <Text style={styles.detailValue}>{item.lastTestDate}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Next Test:</Text>
                        <Text style={styles.detailValue}>{item.nextQuarterlyDate}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Rugby Tag:</Text>
                        <View style={[styles.rugbyTag, { backgroundColor: item.rugbyTag.toLowerCase() }]}>
                            <Text style={styles.rugbyTagText}>{item.rugbyTag}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.recordTestButton]}
                        onPress={() => {
                            setSelectedEquipment(item);
                            setShowTestModal(true);
                        }}
                    >
                        <FontAwesome5 name="plus" size={14} color="#4CAF50" />
                        <Text style={[styles.actionText, { color: '#4CAF50' }]}>Record Test</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteEquipment(item)}
                    >
                        <FontAwesome5 name="trash" size={14} color="#F44336" />
                        <Text style={[styles.actionText, { color: '#F44336' }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header showHamburger onHamburger={() => setMenuVisible(true)} />
            <ScrollView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="clipboard-list" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>Lifting Register</Text>
                    <Text style={styles.subtitle}>
                        Track rigging gear test history and due dates (AS 2550)
                    </Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryNumber}>{summary.total}</Text>
                        <Text style={styles.summaryLabel}>Total</Text>
                    </View>
                    <View style={[styles.summaryCard, { borderColor: '#4CAF50' }]}>
                        <Text style={[styles.summaryNumber, { color: '#4CAF50' }]}>{summary.current}</Text>
                        <Text style={styles.summaryLabel}>Current</Text>
                    </View>
                    <View style={[styles.summaryCard, { borderColor: '#FF9800' }]}>
                        <Text style={[styles.summaryNumber, { color: '#FF9800' }]}>{summary.dueSoon}</Text>
                        <Text style={styles.summaryLabel}>Due Soon</Text>
                    </View>
                    <View style={[styles.summaryCard, { borderColor: '#F44336' }]}>
                        <Text style={[styles.summaryNumber, { color: '#F44336' }]}>{summary.overdue}</Text>
                        <Text style={styles.summaryLabel}>Overdue</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionBar}>
                    <TouchableOpacity 
                        style={styles.primaryButton}
                        onPress={() => setShowAddForm(true)}
                    >
                        <FontAwesome5 name="plus" size={16} color="white" />
                        <Text style={styles.primaryButtonText}>Add Equipment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.secondaryButton}
                        onPress={handleExport}
                        disabled={equipment.length === 0}
                    >
                        <FontAwesome5 name="download" size={16} color="#e31e24" />
                        <Text style={styles.secondaryButtonText}>Export CSV</Text>
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filterContainer}>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterLabel}>Status:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={statusFilter}
                                onValueChange={setStatusFilter}
                                style={styles.picker}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item label="All Status" value="all" />
                                <Picker.Item label="Current" value="current" />
                                <Picker.Item label="Due Soon" value="due-soon" />
                                <Picker.Item label="Overdue" value="overdue" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.filterGroup}>
                        <Text style={styles.filterLabel}>Type:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={typeFilter}
                                onValueChange={setTypeFilter}
                                style={styles.picker}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item label="All Types" value="all" />
                                <Picker.Item label="Chain Slings" value="chain-slings" />
                                <Picker.Item label="Wire Rope" value="wire-rope" />
                                <Picker.Item label="Synthetic Slings" value="synthetic-slings" />
                                <Picker.Item label="Hardware" value="hardware" />
                                <Picker.Item label="Crane Equipment" value="crane-equipment" />
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Equipment List */}
                <View style={styles.equipmentList}>
                    <Text style={styles.listTitle}>Equipment Register ({filteredEquipment.length})</Text>
                    
                    {filteredEquipment.length === 0 ? (
                        <View style={styles.emptyState}>
                            <FontAwesome5 name="clipboard-list" size={64} color="#666" />
                            <Text style={styles.emptyText}>No equipment found</Text>
                            <Text style={styles.emptySubtext}>
                                {equipment.length === 0 ? 'Add your first piece of equipment to get started' : 'Try adjusting your filters'}
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredEquipment}
                            renderItem={renderEquipmentCard}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </ScrollView>

            {/* Test Recording Modal */}
            <Modal
                visible={showTestModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowTestModal(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Record Test - {selectedEquipment?.id}</Text>
                        <TouchableOpacity 
                            onPress={() => setShowTestModal(false)}
                            style={styles.modalCloseButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <FontAwesome5 name="times" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalContent}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Test Date *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#666"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Test Type *</Text>
                            <View style={styles.pickerContainer}>
                                <Picker style={styles.picker}>
                                    <Picker.Item label="Select test type..." value="" />
                                    <Picker.Item label="Quarterly Inspection" value="quarterly" />
                                    <Picker.Item label="Annual Test" value="annual" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Test Authority *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Testing authority"
                                placeholderTextColor="#666"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Test Result *</Text>
                            <View style={styles.pickerContainer}>
                                <Picker style={styles.picker}>
                                    <Picker.Item label="Select result..." value="" />
                                    <Picker.Item label="Pass" value="pass" />
                                    <Picker.Item label="Fail" value="fail" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Test Notes</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Test notes..."
                                placeholderTextColor="#666"
                                multiline
                                numberOfLines={3}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.submitButton}
                            onPress={() => {
                                // Handle test recording
                                setShowTestModal(false);
                            }}
                        >
                            <Text style={styles.submitButtonText}>Record Test</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            {/* Add Equipment Modal */}
            <Modal
                visible={showAddForm}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowAddForm(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add Equipment</Text>
                        <TouchableOpacity 
                            onPress={() => setShowAddForm(false)}
                            style={styles.modalCloseButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <FontAwesome5 name="times" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalContent}>
                        {/* Equipment Type */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Equipment Type *</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={formData.type}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select equipment type..." value="" />
                                    {Object.entries(equipmentTypesByCategory).map(([category, types]) => (
                                        <Picker.Item key={category} label={`--- ${category} ---`} value="" enabled={false} />
                                    )).concat(
                                        Object.values(equipmentTypesByCategory).flat().map(type => (
                                            <Picker.Item key={type.value} label={type.label} value={type.value} />
                                        ))
                                    )}
                                </Picker>
                            </View>
                            {formErrors.type && <Text style={styles.errorText}>{formErrors.type}</Text>}
                        </View>

                        {/* Equipment Details */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Equipment ID *</Text>
                            <TextInput
                                style={[styles.input, formErrors.id && styles.inputError]}
                                value={formData.id}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, id: text }))}
                                placeholder="Serial/ID number"
                                placeholderTextColor="#666"
                                maxLength={20}
                            />
                            {formErrors.id && <Text style={styles.errorText}>{formErrors.id}</Text>}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>WLL (tonnes) *</Text>
                            <TextInput
                                style={[styles.input, formErrors.wll && styles.inputError]}
                                value={formData.wll}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, wll: text }))}
                                placeholder="Working Load Limit"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                            />
                            {formErrors.wll && <Text style={styles.errorText}>{formErrors.wll}</Text>}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Manufacturer</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.manufacturer}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, manufacturer: text }))}
                                placeholder="Manufacturer name"
                                placeholderTextColor="#666"
                                maxLength={30}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Size/Specification</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.size}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, size: text }))}
                                placeholder="Size or spec"
                                placeholderTextColor="#666"
                                maxLength={30}
                            />
                        </View>

                        {/* Test Information */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Last Test Date *</Text>
                            <TextInput
                                style={[styles.input, formErrors.lastTestDate && styles.inputError]}
                                value={formData.lastTestDate}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, lastTestDate: text }))}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#666"
                            />
                            {formErrors.lastTestDate && <Text style={styles.errorText}>{formErrors.lastTestDate}</Text>}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Test Authority</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.testAuthority}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, testAuthority: text }))}
                                placeholder="Testing authority"
                                placeholderTextColor="#666"
                                maxLength={40}
                            />
                        </View>

                        {/* Notes */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Notes</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={formData.notes}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
                                placeholder="Additional notes..."
                                placeholderTextColor="#666"
                                multiline
                                numberOfLines={3}
                                maxLength={200}
                            />
                        </View>

                        <TouchableOpacity 
                            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                            onPress={handleAddEquipment}
                            disabled={loading}
                        >
                            <Text style={styles.submitButtonText}>
                                {loading ? 'Adding...' : 'Add Equipment'}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
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
        shadowColor: '#e31e24',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
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
    summaryContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'center',
    },
    actionBar: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#e31e24',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: 56,
        shadowColor: '#e31e24',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#23232a',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: 56,
        borderWidth: 1,
        borderColor: '#e31e24',
    },
    secondaryButtonText: {
        color: '#e31e24',
        fontSize: 16,
        fontWeight: '600',
    },
    filterContainer: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    filterGroup: {
        marginBottom: 20,
    },
    filterLabel: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
        fontWeight: '600',
    },
    pickerContainer: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        minHeight: 56,
        justifyContent: 'center',
    },
    picker: {
        color: '#fff',
        height: 56,
    },
    equipmentList: {
        marginBottom: 20,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    equipmentCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    cardTitle: {
        flex: 1,
    },
    equipmentId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    equipmentType: {
        fontSize: 14,
        color: '#aaa',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        gap: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    cardContent: {
        marginBottom: 20,
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    detailLabel: {
        fontSize: 14,
        color: '#aaa',
        flex: 1,
    },
    detailValue: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    rugbyTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    rugbyTagText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#1a1a20',
        gap: 8,
        minHeight: 44,
        borderWidth: 1,
        borderColor: '#333',
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    recordTestButton: {
        borderColor: '#4CAF50',
    },
    deleteButton: {
        borderColor: '#F44336',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
        backgroundColor: '#23232a',
        borderRadius: 16,
        marginTop: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 40,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#101014',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        backgroundColor: '#1a1a20',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalCloseButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#333',
        minHeight: 56,
    },
    inputError: {
        borderColor: '#F44336',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        fontSize: 12,
        color: '#F44336',
        marginTop: 6,
    },
    formGrid: {
        gap: 16,
    },
    submitButton: {
        backgroundColor: '#e31e24',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
        minHeight: 56,
        shadowColor: '#e31e24',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
}); 