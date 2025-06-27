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
import { WebView } from 'react-native-webview';
import Header from '@/components/Header';
import { 
    calculateSlingAngles, 
    calculateMissingDimension, 
    getSafetyColor,
    validateTriangleDimensions,
    generateTriangleSVG,
    calculateLoadPerLeg
} from '@/utils/angle-calculations';

export default function AngleDimensionsScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [totalLoad, setTotalLoad] = useState<string>('');
    const [result, setResult] = useState<any>(null);
    const [showTriangle, setShowTriangle] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Calculate results whenever inputs change
    useEffect(() => {
        const widthNum = width ? parseFloat(width) : null;
        const heightNum = height ? parseFloat(height) : null;
        const lengthNum = length ? parseFloat(length) : null;

        // Need at least 2 dimensions
        const definedValues = [widthNum, heightNum, lengthNum].filter(val => val !== null && val > 0);
        
        if (definedValues.length >= 2) {
            setIsCalculating(true);
            // Add slight delay for better UX
            setTimeout(() => {
                // Auto-calculate missing dimension
                const completeDimensions = calculateMissingDimension(widthNum, heightNum, lengthNum);
                
                // Update inputs with calculated values
                if (completeDimensions.width && !width) {
                    setWidth(completeDimensions.width.toFixed(2));
                }
                if (completeDimensions.height && !height) {
                    setHeight(completeDimensions.height.toFixed(2));
                }
                if (completeDimensions.length && !length) {
                    setLength(completeDimensions.length.toFixed(2));
                }

                // Calculate angles and safety
                const angleResult = calculateSlingAngles(
                    completeDimensions.width || widthNum,
                    completeDimensions.height || heightNum,
                    completeDimensions.length || lengthNum
                );

                if (angleResult) {
                    const totalLoadNum = totalLoad ? parseFloat(totalLoad) : null;
                    const loadPerLeg = totalLoadNum ? calculateLoadPerLeg(totalLoadNum, angleResult.includedAngle) : null;
                    
                    setResult({
                        ...angleResult,
                        dimensions: completeDimensions,
                        loadPerLeg
                    });
                    setShowTriangle(true);
                }
                setIsCalculating(false);
            }, 300);
        } else {
            setResult(null);
            setShowTriangle(false);
            setIsCalculating(false);
        }
    }, [width, height, length, totalLoad]);

    const clearAll = () => {
        setWidth('');
        setHeight('');
        setLength('');
        setTotalLoad('');
        setResult(null);
        setShowTriangle(false);
        setIsCalculating(false);
    };

    const getSafetyBadge = (safetyLevel: string) => {
        const color = getSafetyColor(safetyLevel);
        return (
            <View style={[styles.safetyBadge, { backgroundColor: color + '20', borderColor: color }]}>
                <Text style={[styles.safetyBadgeText, { color }]}>
                    {safetyLevel.toUpperCase()}
                </Text>
            </View>
        );
    };

    const generateTriangleHTML = () => {
        if (!result?.dimensions) return '';
        
        const { width: w, height: h, length: l } = result.dimensions;
        if (!w || !h || !l) return '';

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                <style>
                    body { 
                        margin: 0; 
                        padding: 16px; 
                        background: #1a1a20; 
                        color: white; 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                    svg { 
                        width: 100%; 
                        height: auto; 
                        max-width: 100%;
                        max-height: 220px;
                    }
                </style>
            </head>
            <body>
                ${generateTriangleSVG(w, h, l, 300, 220)}
            </body>
            </html>
        `;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header showHamburger onHamburger={() => setMenuVisible(true)} />
            <ScrollView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="ruler-combined" size={30} color="white" />
                    </View>
                    <Text style={styles.title}>Angle & Dimensions</Text>
                    <Text style={styles.subtitle}>
                        Determine sling angles and calculate missing dimensions
                    </Text>
                </View>

                {/* Input Card */}
                <View style={styles.inputCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Triangle Calculator</Text>
                        <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                            <FontAwesome5 name="times" size={16} color="#e31e24" />
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.helpText}>
                        Enter any 2 dimensions to calculate the third and determine sling angles
                    </Text>

                    <View style={styles.inputGrid}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Width (m)</Text>
                            <TextInput
                                style={styles.input}
                                value={width}
                                onChangeText={setWidth}
                                placeholder="Enter load width"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="next"
                                editable={!isCalculating}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Height (m)</Text>
                            <TextInput
                                style={styles.input}
                                value={height}
                                onChangeText={setHeight}
                                placeholder="Enter lift height"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="next"
                                editable={!isCalculating}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Sling Length (m)</Text>
                            <TextInput
                                style={styles.input}
                                value={length}
                                onChangeText={setLength}
                                placeholder="Enter sling length"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="next"
                                editable={!isCalculating}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Total Load (t) - Optional</Text>
                            <TextInput
                                style={styles.input}
                                value={totalLoad}
                                onChangeText={setTotalLoad}
                                placeholder="Enter total load weight"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                returnKeyType="done"
                                editable={!isCalculating}
                            />
                        </View>
                    </View>
                </View>

                {/* Calculating State */}
                {isCalculating && (
                    <View style={styles.resultCard}>
                        <Text style={styles.cardTitle}>Calculating Results</Text>
                        <View style={styles.calculatingContainer}>
                            <ActivityIndicator size="large" color="#e31e24" />
                            <Text style={styles.calculatingText}>Calculating angles and dimensions...</Text>
                        </View>
                    </View>
                )}

                {/* Triangle Visualization */}
                {showTriangle && result && !isCalculating && (
                    <View style={styles.triangleCard}>
                        <Text style={styles.cardTitle}>Triangle Visualization</Text>
                        <View style={styles.triangleContainer}>
                            <WebView
                                source={{ html: generateTriangleHTML() }}
                                style={styles.triangleWebView}
                                scrollEnabled={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                )}

                {/* Results Card */}
                {result && !isCalculating && (
                    <View style={styles.resultCard}>
                        <Text style={styles.cardTitle}>Calculation Results</Text>
                        
                        {/* Angle Results */}
                        <View style={styles.resultSection}>
                            <Text style={styles.sectionTitle}>Sling Angles</Text>
                            <View style={styles.resultGrid}>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultLabel}>Included Angle</Text>
                                    <Text style={styles.resultValue}>{result.includedAngle}°</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultLabel}>Angle from Vertical</Text>
                                    <Text style={styles.resultValue}>{result.angleFromVertical}°</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultLabel}>Load Factor</Text>
                                    <Text style={styles.resultValue}>{result.loadFactor}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Load Analysis */}
                        {result.loadPerLeg && (
                            <View style={styles.resultSection}>
                                <Text style={styles.sectionTitle}>Load Analysis</Text>
                                <View style={styles.resultGrid}>
                                    <View style={styles.resultItem}>
                                        <Text style={styles.resultLabel}>Load per Leg</Text>
                                        <Text style={styles.resultValue}>{result.loadPerLeg.toFixed(2)} t</Text>
                                    </View>
                                    <View style={styles.resultItem}>
                                        <Text style={styles.resultLabel}>Total Load</Text>
                                        <Text style={styles.resultValue}>{totalLoad} t</Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* Safety Assessment */}
                        <View style={styles.safetySection}>
                            <View style={styles.safetyHeader}>
                                <Text style={styles.sectionTitle}>Safety Assessment</Text>
                                {getSafetyBadge(result.safetyLevel)}
                            </View>
                            <Text style={[styles.safetyMessage, { color: getSafetyColor(result.safetyLevel) }]}>
                                {result.safetyMessage}
                            </Text>
                        </View>

                        {/* Dimensions Summary */}
                        <View style={styles.resultSection}>
                            <Text style={styles.sectionTitle}>Final Dimensions</Text>
                            <View style={styles.dimensionsList}>
                                <Text style={styles.dimensionItem}>Width: {result.dimensions?.width?.toFixed(2)} m</Text>
                                <Text style={styles.dimensionItem}>Height: {result.dimensions?.height?.toFixed(2)} m</Text>
                                <Text style={styles.dimensionItem}>Sling Length: {result.dimensions?.length?.toFixed(2)} m</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Safety Guidelines */}
                <View style={styles.guidelinesCard}>
                    <Text style={styles.cardTitle}>Safety Guidelines</Text>
                    <View style={styles.guidelineItem}>
                        <FontAwesome5 name="exclamation-triangle" size={16} color="#4CAF50" />
                        <Text style={styles.guidelineText}>Safe: 30° - 60° included angle</Text>
                    </View>
                    <View style={styles.guidelineItem}>
                        <FontAwesome5 name="exclamation-triangle" size={16} color="#FF9800" />
                        <Text style={styles.guidelineText}>Caution: 60° - 90° included angle</Text>
                    </View>
                    <View style={styles.guidelineItem}>
                        <FontAwesome5 name="exclamation-triangle" size={16} color="#FF5722" />
                        <Text style={styles.guidelineText}>Warning: 90° - 120° included angle</Text>
                    </View>
                    <View style={styles.guidelineItem}>
                        <FontAwesome5 name="exclamation-triangle" size={16} color="#F44336" />
                        <Text style={styles.guidelineText}>Danger: Greater than 120° included angle</Text>
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        minHeight: 36,
        borderWidth: 1,
        borderColor: '#e31e24',
    },
    clearButtonText: {
        color: '#e31e24',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
    },
    helpText: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 20,
        lineHeight: 20,
    },
    inputGrid: {
        gap: 16,
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
    input: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 18,
        fontSize: 16,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#333',
        minHeight: 56,
        textAlignVertical: 'center',
        fontFamily: 'System',
    },
    triangleCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    triangleContainer: {
        height: 280,
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
    },
    triangleWebView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    resultCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
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
    },
    resultLabel: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 4,
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e31e24',
    },
    safetySection: {
        marginBottom: 20,
    },
    safetyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    safetyBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        minHeight: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safetyBadgeText: {
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    safetyMessage: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
    },
    dimensionsList: {
        backgroundColor: '#1a1a20',
        borderRadius: 12,
        padding: 16,
    },
    dimensionItem: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
    },
    guidelinesCard: {
        backgroundColor: '#23232a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
    },
    guidelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 4,
    },
    guidelineText: {
        fontSize: 15,
        color: '#ddd',
        marginLeft: 16,
        fontWeight: '500',
        flex: 1,
    },
}); 