/**
 * Load Weight Estimation Calculations
 * Material density database and weight calculations for rigging operations
 */

export interface Material {
  id: string;
  name: string;
  density: number; // kg/m³
  category: string;
  notes?: string;
  safetyNotes?: string;
}

export interface WeightCalculationResult {
  volumeM3: number;
  weightKg: number;
  weightTonnes: number;
  material: Material;
}

export interface Dimensions {
  width: number | null;
  height: number | null;
  length: number | null;
  unit: 'metres' | 'centimetres' | 'millimetres';
}

// Material density database
export const materialDatabase: Material[] = [
  // Metals
  {
    id: 'steel_mild',
    name: 'Steel (Mild)',
    density: 7850,
    category: 'Metals',
    notes: 'Common structural steel',
    safetyNotes: 'Sharp edges, heavy material - use appropriate PPE'
  },
  {
    id: 'steel_stainless',
    name: 'Steel (Stainless)',
    density: 8000,
    category: 'Metals',
    notes: 'Corrosion resistant',
    safetyNotes: 'Sharp edges, heavy material'
  },
  {
    id: 'aluminium',
    name: 'Aluminium',
    density: 2700,
    category: 'Metals',
    notes: 'Lightweight metal',
    safetyNotes: 'Sharp edges possible'
  },
  {
    id: 'copper',
    name: 'Copper',
    density: 8960,
    category: 'Metals',
    notes: 'Heavy, valuable metal',
    safetyNotes: 'Very heavy - check rigging capacity'
  },
  {
    id: 'brass',
    name: 'Brass',
    density: 8500,
    category: 'Metals',
    notes: 'Copper-zinc alloy',
    safetyNotes: 'Heavy material'
  },
  {
    id: 'lead',
    name: 'Lead',
    density: 11340,
    category: 'Metals',
    notes: 'Extremely heavy, toxic',
    safetyNotes: 'HAZARDOUS: Wear appropriate PPE, avoid dust'
  },
  {
    id: 'zinc',
    name: 'Zinc',
    density: 7140,
    category: 'Metals',
    notes: 'Galvanizing material',
    safetyNotes: 'Heavy material'
  },
  {
    id: 'cast_iron',
    name: 'Cast Iron',
    density: 7200,
    category: 'Metals',
    notes: 'Brittle, heavy',
    safetyNotes: 'Brittle - handle carefully, very heavy'
  },

  // Construction Materials
  {
    id: 'concrete_normal',
    name: 'Concrete (Normal)',
    density: 2400,
    category: 'Construction',
    notes: 'Standard concrete mix',
    safetyNotes: 'Heavy, abrasive surface'
  },
  {
    id: 'concrete_reinforced',
    name: 'Concrete (Reinforced)',
    density: 2500,
    category: 'Construction',
    notes: 'With steel reinforcement',
    safetyNotes: 'Very heavy, protruding rebar hazard'
  },
  {
    id: 'concrete_lightweight',
    name: 'Concrete (Lightweight)',
    density: 1800,
    category: 'Construction',
    notes: 'Aerated concrete',
    safetyNotes: 'Dusty, wear respiratory protection'
  },
  {
    id: 'brick_clay',
    name: 'Brick (Clay)',
    density: 2000,
    category: 'Construction',
    notes: 'Standard building brick',
    safetyNotes: 'Sharp edges, dusty'
  },
  {
    id: 'brick_engineering',
    name: 'Brick (Engineering)',
    density: 2200,
    category: 'Construction',
    notes: 'High strength brick',
    safetyNotes: 'Heavy, sharp edges'
  },
  {
    id: 'granite',
    name: 'Granite',
    density: 2700,
    category: 'Construction',
    notes: 'Natural stone',
    safetyNotes: 'Very heavy, sharp edges possible'
  },
  {
    id: 'limestone',
    name: 'Limestone',
    density: 2600,
    category: 'Construction',
    notes: 'Sedimentary rock',
    safetyNotes: 'Heavy, dusty when cut'
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    density: 2300,
    category: 'Construction',
    notes: 'Sedimentary building stone',
    safetyNotes: 'Dusty, heavy'
  },
  {
    id: 'marble',
    name: 'Marble',
    density: 2700,
    category: 'Construction',
    notes: 'Metamorphic rock',
    safetyNotes: 'Very heavy, valuable - handle carefully'
  },

  // Timber
  {
    id: 'pine_radiata',
    name: 'Pine (Radiata)',
    density: 450,
    category: 'Timber',
    notes: 'Common softwood',
    safetyNotes: 'Splinter risk, check for nails'
  },
  {
    id: 'pine_oregon',
    name: 'Pine (Oregon)',
    density: 500,
    category: 'Timber',
    notes: 'Douglas Fir',
    safetyNotes: 'Splinter risk'
  },
  {
    id: 'hardwood_general',
    name: 'Hardwood (General)',
    density: 750,
    category: 'Timber',
    notes: 'Average hardwood density',
    safetyNotes: 'Heavy, splinter risk'
  },
  {
    id: 'oak',
    name: 'Oak',
    density: 750,
    category: 'Timber',
    notes: 'Heavy hardwood',
    safetyNotes: 'Heavy timber, splinter risk'
  },
  {
    id: 'ironbark',
    name: 'Ironbark',
    density: 1100,
    category: 'Timber',
    notes: 'Very dense Australian hardwood',
    safetyNotes: 'Very heavy timber'
  },
  {
    id: 'plywood',
    name: 'Plywood',
    density: 600,
    category: 'Timber',
    notes: 'Laminated wood sheets',
    safetyNotes: 'Sharp edges, formaldehyde in some types'
  },

  // Liquids
  {
    id: 'water',
    name: 'Water',
    density: 1000,
    category: 'Liquids',
    notes: 'Pure water at 4°C',
    safetyNotes: 'Spillage hazard, freezing risk'
  },
  {
    id: 'fuel_diesel',
    name: 'Diesel Fuel',
    density: 850,
    category: 'Liquids',
    notes: 'Automotive diesel',
    safetyNotes: 'FLAMMABLE: No ignition sources, spillage hazard'
  },
  {
    id: 'fuel_petrol',
    name: 'Petrol',
    density: 750,
    category: 'Liquids',
    notes: 'Automotive gasoline',
    safetyNotes: 'HIGHLY FLAMMABLE: Extreme fire risk'
  },
  {
    id: 'oil_hydraulic',
    name: 'Hydraulic Oil',
    density: 900,
    category: 'Liquids',
    notes: 'Machine hydraulic fluid',
    safetyNotes: 'Spillage hazard, skin contact risk'
  },
  {
    id: 'oil_engine',
    name: 'Engine Oil',
    density: 900,
    category: 'Liquids',
    notes: 'Motor lubricant',
    safetyNotes: 'Environmental hazard if spilled'
  },
  {
    id: 'paint',
    name: 'Paint',
    density: 1200,
    category: 'Liquids',
    notes: 'Liquid paint',
    safetyNotes: 'Toxic fumes, spillage hazard'
  },
  {
    id: 'milk',
    name: 'Milk',
    density: 1030,
    category: 'Liquids',
    notes: 'Dairy product',
    safetyNotes: 'Perishable, hygiene important'
  },

  // Aggregates
  {
    id: 'sand_dry',
    name: 'Sand (Dry)',
    density: 1600,
    category: 'Aggregates',
    notes: 'Fine aggregate',
    safetyNotes: 'Dusty, eye protection required'
  },
  {
    id: 'sand_wet',
    name: 'Sand (Wet)',
    density: 1900,
    category: 'Aggregates',
    notes: 'Saturated sand',
    safetyNotes: 'Heavy, unstable load'
  },
  {
    id: 'gravel',
    name: 'Gravel',
    density: 1800,
    category: 'Aggregates',
    notes: 'Coarse aggregate',
    safetyNotes: 'Loose material, container required'
  },
  {
    id: 'crushed_rock',
    name: 'Crushed Rock',
    density: 1700,
    category: 'Aggregates',
    notes: 'Quarried stone',
    safetyNotes: 'Sharp edges, dusty'
  },
  {
    id: 'topsoil',
    name: 'Topsoil',
    density: 1400,
    category: 'Aggregates',
    notes: 'Garden soil',
    safetyNotes: 'May contain contaminants'
  },
  {
    id: 'clay',
    name: 'Clay',
    density: 2000,
    category: 'Aggregates',
    notes: 'Natural clay',
    safetyNotes: 'Heavy when wet, slippery'
  },

  // Other Materials
  {
    id: 'glass',
    name: 'Glass',
    density: 2500,
    category: 'Other',
    notes: 'Standard glass',
    safetyNotes: 'FRAGILE: Sharp edge hazard if broken'
  },
  {
    id: 'plastic_general',
    name: 'Plastic (General)',
    density: 950,
    category: 'Other',
    notes: 'Average plastic density',
    safetyNotes: 'May be slippery when wet'
  },
  {
    id: 'rubber',
    name: 'Rubber',
    density: 1200,
    category: 'Other',
    notes: 'Natural/synthetic rubber',
    safetyNotes: 'Flexible material, secure rigging points'
  },
  {
    id: 'paper',
    name: 'Paper',
    density: 700,
    category: 'Other',
    notes: 'Paper products',
    safetyNotes: 'Moisture sensitive, fire risk'
  },
  {
    id: 'cardboard',
    name: 'Cardboard',
    density: 500,
    category: 'Other',
    notes: 'Corrugated cardboard',
    safetyNotes: 'Moisture sensitive, unstable when wet'
  },
  {
    id: 'ice',
    name: 'Ice',
    density: 917,
    category: 'Other',
    notes: 'Frozen water',
    safetyNotes: 'Slippery, melting hazard, temperature risk'
  },
  {
    id: 'asphalt',
    name: 'Asphalt',
    density: 2300,
    category: 'Construction',
    notes: 'Road surface material',
    safetyNotes: 'Heavy, may be hot, toxic fumes when heated'
  }
];

/**
 * Get materials by category
 */
export function getMaterialsByCategory(category: string): Material[] {
  return materialDatabase.filter(material => material.category === category);
}

/**
 * Get all material categories
 */
export function getMaterialCategories(): string[] {
  const categories = new Set(materialDatabase.map(material => material.category));
  return Array.from(categories).sort();
}

/**
 * Find material by ID
 */
export function getMaterialById(id: string): Material | null {
  return materialDatabase.find(material => material.id === id) || null;
}

/**
 * Convert dimensions to metres
 */
function convertToMetres(value: number, unit: string): number {
  switch (unit) {
    case 'metres':
      return value;
    case 'centimetres':
      return value / 100;
    case 'millimetres':
      return value / 1000;
    default:
      return value;
  }
}

/**
 * Calculate load weight from dimensions and material
 */
export function calculateLoadWeight(
  dimensions: Dimensions,
  materialId: string
): WeightCalculationResult | null {
  const material = getMaterialById(materialId);
  if (!material) return null;

  const { width, height, length, unit } = dimensions;
  if (!width || !height || !length) return null;

  // Convert all dimensions to metres
  const widthM = convertToMetres(width, unit);
  const heightM = convertToMetres(height, unit);
  const lengthM = convertToMetres(length, unit);

  // Calculate volume in cubic metres
  const volumeM3 = widthM * heightM * lengthM;

  // Calculate weight
  const weightKg = volumeM3 * material.density;
  const weightTonnes = weightKg / 1000;

  return {
    volumeM3: Math.round(volumeM3 * 1000) / 1000, // Round to 3 decimal places
    weightKg: Math.round(weightKg * 100) / 100, // Round to 2 decimal places
    weightTonnes: Math.round(weightTonnes * 1000) / 1000, // Round to 3 decimal places
    material
  };
}

/**
 * Format weight display with appropriate units
 */
export function formatWeight(weightKg: number): { value: number; unit: string; display: string } {
  if (weightKg >= 1000) {
    const tonnes = weightKg / 1000;
    return {
      value: Math.round(tonnes * 100) / 100,
      unit: 'tonnes',
      display: `${(Math.round(tonnes * 100) / 100).toFixed(2)} tonnes`
    };
  } else {
    return {
      value: Math.round(weightKg * 100) / 100,
      unit: 'kg',
      display: `${(Math.round(weightKg * 100) / 100).toFixed(1)} kg`
    };
  }
}

/**
 * Format volume display
 */
export function formatVolume(volumeM3: number): string {
  if (volumeM3 < 0.001) {
    const volumeCm3 = volumeM3 * 1000000;
    return `${volumeCm3.toFixed(1)} cm³`;
  } else if (volumeM3 < 1) {
    const volumeLitres = volumeM3 * 1000;
    return `${volumeLitres.toFixed(1)} L`;
  } else {
    return `${volumeM3.toFixed(3)} m³`;
  }
}

/**
 * Get safety recommendations based on material and weight
 */
export function getSafetyRecommendations(material: Material, weightKg: number): string[] {
  const recommendations: string[] = [];

  // Material-specific safety notes
  if (material.safetyNotes) {
    recommendations.push(material.safetyNotes);
  }

  // Weight-based recommendations
  if (weightKg > 5000) { // > 5 tonnes
    recommendations.push('Very heavy load: Verify crane capacity and ground conditions');
    recommendations.push('Consider multiple smaller lifts if possible');
  } else if (weightKg > 1000) { // > 1 tonne
    recommendations.push('Heavy load: Check all rigging equipment ratings');
    recommendations.push('Ensure adequate crane capacity with safety margin');
  }

  // Material category specific warnings
  switch (material.category) {
    case 'Metals':
      recommendations.push('Check for sharp edges and protect slings');
      break;
    case 'Liquids':
      recommendations.push('Ensure container integrity before lifting');
      recommendations.push('Have spill containment ready');
      break;
    case 'Aggregates':
      recommendations.push('Use appropriate container to prevent spillage');
      break;
    case 'Construction':
      if (material.name.includes('Concrete')) {
        recommendations.push('Check for protruding reinforcement');
      }
      break;
  }

  return recommendations;
}

/**
 * Calculate container/packaging weight estimate
 */
export function estimateContainerWeight(
  materialWeightKg: number,
  containerType: 'pallet' | 'crate' | 'drum' | 'bag' | 'none' = 'none'
): number {
  const containerWeights = {
    pallet: 25, // Standard wooden pallet
    crate: materialWeightKg * 0.1, // ~10% of material weight
    drum: 20, // Steel drum
    bag: materialWeightKg * 0.02, // ~2% for bags
    none: 0
  };

  return containerWeights[containerType] || 0;
}

/**
 * Calculate lifting capacity requirement with safety factor
 */
export function calculateRequiredCapacity(
  materialWeightKg: number,
  safetyFactor: number = 2.0
): { minCapacity: number; recommendedCapacity: number } {
  const minCapacity = materialWeightKg * safetyFactor;
  const recommendedCapacity = materialWeightKg * (safetyFactor + 0.5); // Additional margin

  return {
    minCapacity: Math.ceil(minCapacity),
    recommendedCapacity: Math.ceil(recommendedCapacity)
  };
}