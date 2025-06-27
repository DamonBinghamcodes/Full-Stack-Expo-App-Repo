import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Header from '@/components/Header';
import { 
    slingTypes, 
    calculateWLL, 
    getAvailableSizes, 
    getAvailableConfigurations,
    quickReferenceTips 
} from '@/utils/wll-calculations';

export default function WorkingLoadLimitScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedSlingType, setSelectedSlingType] = useState('chainGrade80');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedConfiguration, setSelectedConfiguration] = useState('');
    const [wllResult, setWllResult] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    // Get available options based on current selections
    const availableSizes = getAvailableSizes(selectedSlingType);
    const availableConfigurations = getAvailableConfigurations(selectedSlingType);

    // Reset selections when sling type changes
    useEffect(() => {
        setSelectedSize('');
        setSelectedConfiguration('');
        setWllResult(null);
    }, [selectedSlingType]);

    // Calculate WLL when all parameters are selected
    useEffect(() => {
        if (selectedSlingType && selectedSize && selectedConfiguration) {
            setIsCalculating(true);
            // Simulate calculation delay for better UX
            setTimeout(() => {
                const result = calculateWLL(selectedSlingType, selectedSize, selectedConfiguration);
                setWllResult(result);
                setIsCalculating(false);
            }, 500);
        } else {
            setWllResult(null);
        }
    }, [selectedSlingType, selectedSize, selectedConfiguration]);

    // Rotate tips every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % quickReferenceTips.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const getCurrentSlingType = () => {
        return slingTypes.find(type => type.id === selectedSlingType);
    };

    const formatWLL = (wll: number): string => {
        if (wll >= 1) {
            return `${wll.toFixed(2)} tonnes`;
        } else {
            return `${(wll * 1000).toFixed(0)} kg`;
        }
    };

    const clearAll = () => {
        setSelectedSlingType('chainGrade80');
        setSelectedSize('');
        setSelectedConfiguration('');
        setWllResult(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header showHamburger onHamburger={() => setMenuVisible(true)} />
            <ScrollView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="weight-hanging" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>Working Load Limit</Text>
                    <Text style={styles.subtitle}>
                        Calculate chain or sling WLL based on configuration and size
                    </Text>
                </View>

                {/* Calculator Form */}
                <View style={styles.calculatorCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>WLL Calculator</Text>
                        <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                            <FontAwesome5 name="times" size={16} color="#e31e24" />
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Sling Type Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Sling Type</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedSlingType}
                                onValueChange={setSelectedSlingType}
                                style={styles.picker}
                                dropdownIconColor="#e31e24"
                            >
                                {slingTypes.map((type) => (
                                    <Picker.Item 
                                        key={type.id} 
                                        label={type.name} 
                                        value={type.id} 
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* Size Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Size {selectedSlingType.includes('round') || selectedSlingType.includes('webbing') ? '(Color)' : '(mm)'}
                        </Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedSize}
                                onValueChange={setSelectedSize}
                                style={styles.picker}
                                enabled={availableSizes.length > 0}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item label="Select size..." value="" />
                                {availableSizes.map((size) => (
                                    <Picker.Item 
                                        key={size} 
                                        label={size} 
                                        value={size} 
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* Configuration Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Configuration</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedConfiguration}
                                onValueChange={setSelectedConfiguration}
                                style={styles.picker}
                                enabled={availableConfigurations.length > 0}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item label="Select configuration..." value="" />
                                {availableConfigurations.map((config) => (
                                    <Picker.Item 
                                        key={config} 
                                        label={config} 
                                        value={config} 
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                </View>

                {/* Results Card */}
                {isCalculating && (
                    <View style={styles.resultCard}>
                        <Text style={styles.cardTitle}>Calculating Results</Text>
                        <View style={styles.calculatingContainer}>
                            <ActivityIndicator size="large" color="#e31e24" />
                            <Text style={styles.calculatingText}>Calculating Working Load Limit...</Text>
                        </View>
                    </View>
                )}

                {wllResult !== null && !isCalculating && (
                    <View style={styles.resultCard}>
                        <Text style={styles.cardTitle}>Calculation Results</Text>
                        
                        <View style={styles.resultSection}>
                            <Text style={styles.resultLabel}>Working Load Limit</Text>
                            <Text style={styles.resultValue}>{formatWLL(wllResult)}</Text>
                            
                            <View style={styles.warningContainer}>
                                <FontAwesome5 name="exclamation-triangle" size={16} color="#FF9800" />
                                <Text style={styles.warningText}>
                                    Never exceed the Working Load Limit under any circumstances. Always follow proper lifting procedures and safety guidelines.
                                </Text>
                            </View>
                        </View>

                        {/* Current Selection Summary */}
                        <View style={styles.slingTypeCard}>
                            <Text style={styles.slingTypeName}>Selected Configuration</Text>
                            <Text style={styles.slingTypeDescription}>
                                {getCurrentSlingType()?.name} - Size: {selectedSize} - Config: {selectedConfiguration}
                            </Text>
                            <Text style={styles.slingTypeSpecs}>
                                WLL: {formatWLL(wllResult)} | Safety Factor: 4:1
                            </Text>
                        </View>
                    </View>
                )}

                {/* Quick Reference Tips */}
                <View style={styles.tipsCard}>
                    <View style={styles.tipsHeader}>
                        <FontAwesome5 name="lightbulb" size={20} color="#FFC107" />
                        <Text style={styles.tipsTitle}>Quick Reference</Text>
                    </View>
                    <Text style={styles.tipTitle}>{quickReferenceTips[currentTipIndex].title}</Text>
                    <Text style={styles.tipContent}>{quickReferenceTips[currentTipIndex].content}</Text>
                    <Text style={styles.tipStandard}>
                        Standard: {quickReferenceTips[currentTipIndex].standard}
                    </Text>
                    <View style={styles.tipIndicator}>
                        {quickReferenceTips.map((_, index) => (
                            <View 
                                key={index}
                                style={[
                                    styles.tipDot,
                                    index === currentTipIndex && styles.tipDotActive
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Current Sling Type Notes */}
                {getCurrentSlingType()?.notes && (
                    <View style={styles.notesCard}>
                        <Text style={styles.notesTitle}>About {getCurrentSlingType()?.name}</Text>
                        <Text style={styles.notesText}>{getCurrentSlingType()?.notes}</Text>
                    </View>
                )}

                {/* Information Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>About WLL Calculations</Text>
                    <Text style={styles.infoText}>
                        Working Load Limits are calculated based on industry standards and manufacturer specifications. 
                        These values include safety factors and are designed for normal working conditions.
                    </Text>
                    <View style={styles.infoStats}>
                        <Text style={styles.statText}>• Based on industry standards (EN, ASME, AS)</Text>
                        <Text style={styles.statText}>• Includes appropriate safety factors</Text>
                        <Text style={styles.statText}>• Regular inspection required</Text>
                        <Text style={styles.statText}>• Environmental factors must be considered</Text>
                    </View>
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
    calculatorCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a1a1a',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    clearButtonText: {
        color: '#e31e24',
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
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
    resultCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    resultSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    calculatingContainer: {
        alignItems: 'center',
        padding: 24,
    },
    calculatingText: {
        color: '#aaa',
        marginTop: 12,
        fontSize: 16,
    },
    resultLabel: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 8,
        textAlign: 'center',
    },
    resultValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#e31e24',
        marginBottom: 20,
        textAlign: 'center',
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a1f0a',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
        marginTop: 12,
    },
    warningText: {
        color: '#FF9800',
        fontSize: 14,
        marginLeft: 12,
        flex: 1,
        fontWeight: '500',
        lineHeight: 20,
    },
    tipsCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    tipsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFC107',
        marginBottom: 8,
    },
    tipContent: {
        fontSize: 14,
        color: '#ddd',
        lineHeight: 20,
        marginBottom: 12,
    },
    tipStandard: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        marginBottom: 16,
    },
    tipIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#444',
        marginHorizontal: 4,
    },
    tipDotActive: {
        backgroundColor: '#FFC107',
    },
    notesCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    notesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    notesText: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 20,
    },
    slingTypeCard: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
    },
    slingTypeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    slingTypeDescription: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 20,
        marginBottom: 8,
    },
    slingTypeSpecs: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    infoCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 20,
        marginBottom: 16,
    },
    infoStats: {
        gap: 8,
    },
    statText: {
        fontSize: 14,
        color: '#ddd',
    },
}); 