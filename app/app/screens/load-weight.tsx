import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Header from '@/components/Header';
import { 
    materialDatabase,
    getMaterialsByCategory,
    getMaterialCategories,
    getMaterialById,
    calculateLoadWeight,
    formatWeight,
    formatVolume,
    getSafetyRecommendations,
    calculateRequiredCapacity
} from '@/utils/load-weight-calculations';

export default function LoadWeightScreen() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [dimensions, setDimensions] = useState({
        width: '',
        height: '',
        length: '',
        unit: 'metres' as const
    });
    const [result, setResult] = useState<any>(null);
    const [safetyRecommendations, setSafetyRecommendations] = useState<string[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);

    const categories = getMaterialCategories();
    const materialsInCategory = selectedCategory ? getMaterialsByCategory(selectedCategory) : [];

    // Reset material when category changes
    useEffect(() => {
        setSelectedMaterial('');
        setResult(null);
        setSafetyRecommendations([]);
    }, [selectedCategory]);

    // Calculate weight when inputs change
    useEffect(() => {
        if (selectedMaterial && dimensions.width && dimensions.height && dimensions.length) {
            setIsCalculating(true);
            // Add slight delay for better UX
            setTimeout(() => {
                const weightResult = calculateLoadWeight(
                    {
                        width: parseFloat(dimensions.width) || null,
                        height: parseFloat(dimensions.height) || null,
                        length: parseFloat(dimensions.length) || null,
                        unit: dimensions.unit
                    },
                    selectedMaterial
                );

                if (weightResult) {
                    const recommendations = getSafetyRecommendations(weightResult.material, weightResult.weightKg);
                    const capacity = calculateRequiredCapacity(weightResult.weightKg / 1000); // Convert to tonnes
                    
                    setResult({
                        ...weightResult,
                        capacity
                    });
                    setSafetyRecommendations(recommendations);
                } else {
                    setResult(null);
                    setSafetyRecommendations([]);
                }
                setIsCalculating(false);
            }, 300);
        } else {
            setResult(null);
            setSafetyRecommendations([]);
            setIsCalculating(false);
        }
    }, [selectedMaterial, dimensions]);

    const clearAll = () => {
        setSelectedCategory('');
        setSelectedMaterial('');
        setDimensions({
            width: '',
            height: '',
            length: '',
            unit: 'metres'
        });
        setResult(null);
        setSafetyRecommendations([]);
        setIsCalculating(false);
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header showHamburger onHamburger={() => {}} />
            <ScrollView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="calculator" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>Load Weight Estimator</Text>
                    <Text style={styles.subtitle}>
                        Estimate load weight by material type and dimensions
                    </Text>
                </View>

                {/* Input Card */}
                <View style={styles.inputCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Weight Calculator</Text>
                        <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                            <FontAwesome5 name="times" size={16} color="#e31e24" />
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Material Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <FontAwesome5 name="layer-group" size={14} color="#e31e24" /> Material Category
                        </Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={setSelectedCategory}
                                style={styles.picker}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item label="Select category..." value="" />
                                {categories.map((category) => (
                                    <Picker.Item 
                                        key={category} 
                                        label={category} 
                                        value={category} 
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <FontAwesome5 name="cube" size={14} color="#e31e24" /> Material Type
                        </Text>
                        <View style={[styles.pickerContainer, !materialsInCategory.length && styles.pickerDisabled]}>
                            <Picker
                                selectedValue={selectedMaterial}
                                onValueChange={setSelectedMaterial}
                                style={[styles.picker, !materialsInCategory.length && styles.pickerTextDisabled]}
                                enabled={materialsInCategory.length > 0}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item 
                                    label={materialsInCategory.length > 0 ? "Select material..." : "Select category first..."} 
                                    value="" 
                                />
                                {materialsInCategory.map((material) => (
                                    <Picker.Item 
                                        key={material.id} 
                                        label={`${material.name} (${material.density} kg/m³)`} 
                                        value={material.id} 
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* Unit Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <FontAwesome5 name="ruler" size={14} color="#e31e24" /> Measurement Unit
                        </Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={dimensions.unit}
                                onValueChange={(unit) => setDimensions(prev => ({ ...prev, unit: unit as any }))}
                                style={styles.picker}
                                dropdownIconColor="#e31e24"
                            >
                                <Picker.Item label="Metres (m)" value="metres" />
                                <Picker.Item label="Centimetres (cm)" value="centimetres" />
                                <Picker.Item label="Millimetres (mm)" value="millimetres" />
                            </Picker>
                        </View>
                    </View>

                    {/* Dimension Inputs */}
                    <Text style={styles.sectionSubtitle}>Load Dimensions</Text>
                    <View style={styles.dimensionGrid}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <FontAwesome5 name="arrows-alt-h" size={14} color="#e31e24" /> Width ({dimensions.unit.slice(0, -1)})
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={dimensions.width}
                                onChangeText={(width) => setDimensions(prev => ({ ...prev, width }))}
                                placeholder="Enter width"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="next"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <FontAwesome5 name="arrows-alt-v" size={14} color="#e31e24" /> Height ({dimensions.unit.slice(0, -1)})
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={dimensions.height}
                                onChangeText={(height) => setDimensions(prev => ({ ...prev, height }))}
                                placeholder="Enter height"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="next"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <FontAwesome5 name="long-arrow-alt-right" size={14} color="#e31e24" /> Length ({dimensions.unit.slice(0, -1)})
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={dimensions.length}
                                onChangeText={(length) => setDimensions(prev => ({ ...prev, length }))}
                                placeholder="Enter length"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                </View>

                {/* Loading State */}
                {isCalculating && (
                    <View style={styles.loadingCard}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#e31e24" />
                            <Text style={styles.loadingText}>Calculating load weight...</Text>
                        </View>
                    </View>
                )}

                {/* Results Card */}
                {result && !isCalculating && (
                    <View style={styles.resultCard}>
                        <Text style={styles.cardTitle}>Calculation Results</Text>
                        
                        {/* Weight Results */}
                        <View style={styles.resultSection}>
                            <Text style={styles.sectionTitle}>Weight Calculation</Text>
                            <View style={styles.resultGrid}>
                                <View style={styles.resultItem}>
                                    <FontAwesome5 name="cube" size={16} color="#e31e24" style={styles.resultIcon} />
                                    <Text style={styles.resultLabel}>Volume</Text>
                                    <Text style={styles.resultValue}>{formatVolume(result.volumeM3)}</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <FontAwesome5 name="weight" size={16} color="#e31e24" style={styles.resultIcon} />
                                    <Text style={styles.resultLabel}>Weight</Text>
                                    <Text style={styles.resultValue}>{formatWeight(result.weightKg).display}</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <FontAwesome5 name="compress-arrows-alt" size={16} color="#e31e24" style={styles.resultIcon} />
                                    <Text style={styles.resultLabel}>Load Density</Text>
                                    <Text style={styles.resultValue}>{(result.weightKg / result.volumeM3).toFixed(0)} kg/m³</Text>
                                </View>
                            </View>
                        </View>

                        {/* Lifting Capacity Requirements */}
                        <View style={styles.resultSection}>
                            <Text style={styles.sectionTitle}>Lifting Requirements</Text>
                            <View style={styles.resultGrid}>
                                <View style={styles.resultItem}>
                                    <FontAwesome5 name="exclamation-triangle" size={16} color="#FF9800" style={styles.resultIcon} />
                                    <Text style={styles.resultLabel}>Min Capacity Required</Text>
                                    <Text style={styles.resultValue}>{result.capacity.minCapacity} kg</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <FontAwesome5 name="shield-alt" size={16} color="#4CAF50" style={styles.resultIcon} />
                                    <Text style={styles.resultLabel}>Recommended Capacity</Text>
                                    <Text style={styles.resultValue}>{result.capacity.recommendedCapacity} kg</Text>
                                </View>
                            </View>
                        </View>

                        {/* Material Information */}
                        <View style={styles.materialInfo}>
                            <Text style={styles.sectionTitle}>Material Information</Text>
                            <View style={styles.materialCard}>
                                <Text style={styles.materialName}>{result.material.name}</Text>
                                <Text style={styles.materialCategory}>{result.material.category}</Text>
                                <Text style={styles.materialNotes}>{result.material.notes}</Text>
                                <View style={styles.materialSpecs}>
                                    <View style={styles.specItem}>
                                        <FontAwesome5 name="weight" size={12} color="#e31e24" />
                                        <Text style={styles.specText}>Density: {result.material.density} kg/m³</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {/* Safety Recommendations */}
                {safetyRecommendations.length > 0 && (
                    <View style={styles.safetyCard}>
                        <View style={styles.safetyHeader}>
                            <FontAwesome5 name="shield-alt" size={20} color="#FF9800" />
                            <Text style={styles.cardTitle}>Safety Recommendations</Text>
                        </View>
                        {safetyRecommendations.map((recommendation, index) => (
                            <View key={index} style={styles.safetyItem}>
                                <FontAwesome5 name="exclamation-triangle" size={14} color="#FF9800" />
                                <Text style={styles.safetyText}>{recommendation}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Material Database Info */}
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <FontAwesome5 name="database" size={20} color="#e31e24" />
                        <Text style={styles.cardTitle}>Material Database</Text>
                    </View>
                    <Text style={styles.infoText}>
                        Professional load weight calculations using industry-standard material densities 
                        and rigging safety factors.
                    </Text>
                    <View style={styles.infoStatsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{materialDatabase.length}</Text>
                            <Text style={styles.statLabel}>Materials</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{categories.length}</Text>
                            <Text style={styles.statLabel}>Categories</Text>
                        </View>
                    </View>
                    <View style={styles.infoFeatures}>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={14} color="#4CAF50" />
                            <Text style={styles.featureText}>Multiple unit systems</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={14} color="#4CAF50" />
                            <Text style={styles.featureText}>Safety recommendations</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome5 name="check-circle" size={14} color="#4CAF50" />
                            <Text style={styles.featureText}>Lifting capacity calculations</Text>
                        </View>
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
    inputCard: {
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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
    pickerDisabled: {
        backgroundColor: '#0f0f12',
        borderColor: '#222',
    },
    pickerTextDisabled: {
        color: '#666',
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ddd',
        marginBottom: 16,
        marginTop: 8,
    },
    dimensionGrid: {
        gap: 16,
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
    resultCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    resultSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    resultGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    resultItem: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        minWidth: '45%',
        minHeight: 88,
        justifyContent: 'center',
    },
    resultIcon: {
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    resultLabel: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 4,
        lineHeight: 18,
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e31e24',
        lineHeight: 24,
    },
    materialInfo: {
        marginBottom: 16,
    },
    materialCard: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#e31e24',
    },
    materialName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    materialCategory: {
        fontSize: 14,
        color: '#e31e24',
        fontWeight: '600',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    materialNotes: {
        fontSize: 14,
        color: '#aaa',
        lineHeight: 22,
        marginBottom: 16,
    },
    materialSpecs: {
        gap: 8,
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    specText: {
        fontSize: 14,
        color: '#ddd',
        fontWeight: '500',
    },
    safetyCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    safetyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    safetyItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    safetyText: {
        fontSize: 14,
        color: '#ddd',
        marginLeft: 12,
        flex: 1,
        lineHeight: 20,
    },
    infoCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    infoText: {
        fontSize: 15,
        color: '#aaa',
        lineHeight: 22,
        marginBottom: 20,
    },
    infoStatsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e31e24',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
    },
    infoFeatures: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#ddd',
        flex: 1,
    },
    loadingCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        padding: 24,
    },
    loadingText: {
        color: '#aaa',
        marginTop: 12,
        fontSize: 16,
    },
}); 