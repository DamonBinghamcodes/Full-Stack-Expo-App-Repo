/**
 * Working Load Limit (WLL) Calculations
 * Data and calculations for rigging equipment WLL based on Australian/New Zealand standards
 */

export interface WLLData {
  [size: string]: {
    [configuration: string]: number;
  };
}

export interface SlingType {
  id: string;
  name: string;
  data: WLLData;
  configurations: string[];
  notes?: string;
}

// Grade 80 Chain WLL Data (tonnes)
export const chainGrade80Data: WLLData = {
  "6": {
    "Straight Sling": 1.12,
    "2-Leg @ 60°": 1.94,
    "2-Leg @ 45°": 1.58,
    "2-Leg @ 30°": 1.12,
    "3-Leg @ 60°": 2.91,
    "3-Leg @ 45°": 2.37,
    "3-Leg @ 30°": 1.68,
    "4-Leg @ 60°": 3.88,
    "4-Leg @ 45°": 3.16,
    "4-Leg @ 30°": 2.24
  },
  "7": {
    "Straight Sling": 1.5,
    "2-Leg @ 60°": 2.6,
    "2-Leg @ 45°": 2.12,
    "2-Leg @ 30°": 1.5,
    "3-Leg @ 60°": 3.9,
    "3-Leg @ 45°": 3.18,
    "3-Leg @ 30°": 2.25,
    "4-Leg @ 60°": 5.2,
    "4-Leg @ 45°": 4.24,
    "4-Leg @ 30°": 3.0
  },
  "8": {
    "Straight Sling": 2.0,
    "2-Leg @ 60°": 3.46,
    "2-Leg @ 45°": 2.83,
    "2-Leg @ 30°": 2.0,
    "3-Leg @ 60°": 5.19,
    "3-Leg @ 45°": 4.24,
    "3-Leg @ 30°": 3.0,
    "4-Leg @ 60°": 6.93,
    "4-Leg @ 45°": 5.66,
    "4-Leg @ 30°": 4.0
  },
  "10": {
    "Straight Sling": 3.15,
    "2-Leg @ 60°": 5.46,
    "2-Leg @ 45°": 4.45,
    "2-Leg @ 30°": 3.15,
    "3-Leg @ 60°": 8.19,
    "3-Leg @ 45°": 6.68,
    "3-Leg @ 30°": 4.73,
    "4-Leg @ 60°": 10.92,
    "4-Leg @ 45°": 8.91,
    "4-Leg @ 30°": 6.3
  },
  "13": {
    "Straight Sling": 5.3,
    "2-Leg @ 60°": 9.18,
    "2-Leg @ 45°": 7.49,
    "2-Leg @ 30°": 5.3,
    "3-Leg @ 60°": 13.77,
    "3-Leg @ 45°": 11.23,
    "3-Leg @ 30°": 7.95,
    "4-Leg @ 60°": 18.36,
    "4-Leg @ 45°": 14.98,
    "4-Leg @ 30°": 10.6
  },
  "16": {
    "Straight Sling": 8.0,
    "2-Leg @ 60°": 13.86,
    "2-Leg @ 45°": 11.31,
    "2-Leg @ 30°": 8.0,
    "3-Leg @ 60°": 20.78,
    "3-Leg @ 45°": 16.97,
    "3-Leg @ 30°": 12.0,
    "4-Leg @ 60°": 27.71,
    "4-Leg @ 45°": 22.63,
    "4-Leg @ 30°": 16.0
  },
  "20": {
    "Straight Sling": 12.5,
    "2-Leg @ 60°": 21.65,
    "2-Leg @ 45°": 17.68,
    "2-Leg @ 30°": 12.5,
    "3-Leg @ 60°": 32.48,
    "3-Leg @ 45°": 26.52,
    "3-Leg @ 30°": 18.75,
    "4-Leg @ 60°": 43.3,
    "4-Leg @ 45°": 35.35,
    "4-Leg @ 30°": 25.0
  },
  "22": {
    "Straight Sling": 15.0,
    "2-Leg @ 60°": 25.98,
    "2-Leg @ 45°": 21.21,
    "2-Leg @ 30°": 15.0,
    "3-Leg @ 60°": 38.97,
    "3-Leg @ 45°": 31.82,
    "3-Leg @ 30°": 22.5,
    "4-Leg @ 60°": 51.96,
    "4-Leg @ 45°": 42.43,
    "4-Leg @ 30°": 30.0
  },
  "26": {
    "Straight Sling": 21.2,
    "2-Leg @ 60°": 36.72,
    "2-Leg @ 45°": 29.98,
    "2-Leg @ 30°": 21.2,
    "3-Leg @ 60°": 55.08,
    "3-Leg @ 45°": 44.97,
    "3-Leg @ 30°": 31.8,
    "4-Leg @ 60°": 73.44,
    "4-Leg @ 45°": 59.96,
    "4-Leg @ 30°": 42.4
  },
  "32": {
    "Straight Sling": 32.0,
    "2-Leg @ 60°": 55.43,
    "2-Leg @ 45°": 45.25,
    "2-Leg @ 30°": 32.0,
    "3-Leg @ 60°": 83.14,
    "3-Leg @ 45°": 67.88,
    "3-Leg @ 30°": 48.0,
    "4-Leg @ 60°": 110.85,
    "4-Leg @ 45°": 90.51,
    "4-Leg @ 30°": 64.0
  }
};

// Grade 100 Chain WLL Data (tonnes) - Enhanced capacity
export const chainGrade100Data: WLLData = {
  "6": {
    "Straight Sling": 1.4,
    "2-Leg @ 60°": 2.42,
    "2-Leg @ 45°": 1.98,
    "2-Leg @ 30°": 1.4,
    "3-Leg @ 60°": 3.64,
    "3-Leg @ 45°": 2.97,
    "3-Leg @ 30°": 2.1,
    "4-Leg @ 60°": 4.85,
    "4-Leg @ 45°": 3.96,
    "4-Leg @ 30°": 2.8
  },
  "7": {
    "Straight Sling": 1.9,
    "2-Leg @ 60°": 3.29,
    "2-Leg @ 45°": 2.69,
    "2-Leg @ 30°": 1.9,
    "3-Leg @ 60°": 4.94,
    "3-Leg @ 45°": 4.03,
    "3-Leg @ 30°": 2.85,
    "4-Leg @ 60°": 6.58,
    "4-Leg @ 45°": 5.37,
    "4-Leg @ 30°": 3.8
  },
  "8": {
    "Straight Sling": 2.5,
    "2-Leg @ 60°": 4.33,
    "2-Leg @ 45°": 3.54,
    "2-Leg @ 30°": 2.5,
    "3-Leg @ 60°": 6.49,
    "3-Leg @ 45°": 5.3,
    "3-Leg @ 30°": 3.75,
    "4-Leg @ 60°": 8.66,
    "4-Leg @ 45°": 7.07,
    "4-Leg @ 30°": 5.0
  },
  "10": {
    "Straight Sling": 4.0,
    "2-Leg @ 60°": 6.93,
    "2-Leg @ 45°": 5.66,
    "2-Leg @ 30°": 4.0,
    "3-Leg @ 60°": 10.39,
    "3-Leg @ 45°": 8.49,
    "3-Leg @ 30°": 6.0,
    "4-Leg @ 60°": 13.86,
    "4-Leg @ 45°": 11.31,
    "4-Leg @ 30°": 8.0
  },
  "13": {
    "Straight Sling": 6.7,
    "2-Leg @ 60°": 11.61,
    "2-Leg @ 45°": 9.48,
    "2-Leg @ 30°": 6.7,
    "3-Leg @ 60°": 17.41,
    "3-Leg @ 45°": 14.22,
    "3-Leg @ 30°": 10.05,
    "4-Leg @ 60°": 23.21,
    "4-Leg @ 45°": 18.96,
    "4-Leg @ 30°": 13.4
  },
  "16": {
    "Straight Sling": 10.0,
    "2-Leg @ 60°": 17.32,
    "2-Leg @ 45°": 14.14,
    "2-Leg @ 30°": 10.0,
    "3-Leg @ 60°": 25.98,
    "3-Leg @ 45°": 21.21,
    "3-Leg @ 30°": 15.0,
    "4-Leg @ 60°": 34.64,
    "4-Leg @ 45°": 28.28,
    "4-Leg @ 30°": 20.0
  },
  "20": {
    "Straight Sling": 15.6,
    "2-Leg @ 60°": 27.04,
    "2-Leg @ 45°": 22.07,
    "2-Leg @ 30°": 15.6,
    "3-Leg @ 60°": 40.56,
    "3-Leg @ 45°": 33.11,
    "3-Leg @ 30°": 23.4,
    "4-Leg @ 60°": 54.08,
    "4-Leg @ 45°": 44.14,
    "4-Leg @ 30°": 31.2
  },
  "22": {
    "Straight Sling": 19.0,
    "2-Leg @ 60°": 32.91,
    "2-Leg @ 45°": 26.87,
    "2-Leg @ 30°": 19.0,
    "3-Leg @ 60°": 49.37,
    "3-Leg @ 45°": 40.31,
    "3-Leg @ 30°": 28.5,
    "4-Leg @ 60°": 65.83,
    "4-Leg @ 45°": 53.74,
    "4-Leg @ 30°": 38.0
  },
  "26": {
    "Straight Sling": 26.5,
    "2-Leg @ 60°": 45.89,
    "2-Leg @ 45°": 37.48,
    "2-Leg @ 30°": 26.5,
    "3-Leg @ 60°": 68.84,
    "3-Leg @ 45°": 56.22,
    "3-Leg @ 30°": 39.75,
    "4-Leg @ 60°": 91.78,
    "4-Leg @ 45°": 74.95,
    "4-Leg @ 30°": 53.0
  },
  "32": {
    "Straight Sling": 40.0,
    "2-Leg @ 60°": 69.28,
    "2-Leg @ 45°": 56.57,
    "2-Leg @ 30°": 40.0,
    "3-Leg @ 60°": 103.92,
    "3-Leg @ 45°": 84.85,
    "3-Leg @ 30°": 60.0,
    "4-Leg @ 60°": 138.56,
    "4-Leg @ 45°": 113.14,
    "4-Leg @ 30°": 80.0
  }
};

// Wire Rope WLL Data (tonnes)
export const wireRopeData: WLLData = {
  "6": {
    "Straight Sling": 0.74,
    "2-Leg @ 60°": 1.28,
    "2-Leg @ 45°": 1.05,
    "2-Leg @ 30°": 0.74,
    "3-Leg @ 60°": 1.92,
    "3-Leg @ 45°": 1.57,
    "3-Leg @ 30°": 1.11,
    "4-Leg @ 60°": 2.56,
    "4-Leg @ 45°": 2.09,
    "4-Leg @ 30°": 1.48
  },
  "8": {
    "Straight Sling": 1.33,
    "2-Leg @ 60°": 2.30,
    "2-Leg @ 45°": 1.88,
    "2-Leg @ 30°": 1.33,
    "3-Leg @ 60°": 3.45,
    "3-Leg @ 45°": 2.82,
    "3-Leg @ 30°": 2.0,
    "4-Leg @ 60°": 4.60,
    "4-Leg @ 45°": 3.76,
    "4-Leg @ 30°": 2.66
  },
  "10": {
    "Straight Sling": 2.07,
    "2-Leg @ 60°": 3.59,
    "2-Leg @ 45°": 2.93,
    "2-Leg @ 30°": 2.07,
    "3-Leg @ 60°": 5.38,
    "3-Leg @ 45°": 4.39,
    "3-Leg @ 30°": 3.11,
    "4-Leg @ 60°": 7.17,
    "4-Leg @ 45°": 5.86,
    "4-Leg @ 30°": 4.14
  },
  "12": {
    "Straight Sling": 2.98,
    "2-Leg @ 60°": 5.16,
    "2-Leg @ 45°": 4.21,
    "2-Leg @ 30°": 2.98,
    "3-Leg @ 60°": 7.74,
    "3-Leg @ 45°": 6.32,
    "3-Leg @ 30°": 4.47,
    "4-Leg @ 60°": 10.32,
    "4-Leg @ 45°": 8.43,
    "4-Leg @ 30°": 5.96
  },
  "16": {
    "Straight Sling": 5.3,
    "2-Leg @ 60°": 9.18,
    "2-Leg @ 45°": 7.49,
    "2-Leg @ 30°": 5.3,
    "3-Leg @ 60°": 13.77,
    "3-Leg @ 45°": 11.24,
    "3-Leg @ 30°": 7.95,
    "4-Leg @ 60°": 18.36,
    "4-Leg @ 45°": 14.99,
    "4-Leg @ 30°": 10.6
  },
  "20": {
    "Straight Sling": 8.28,
    "2-Leg @ 60°": 14.34,
    "2-Leg @ 45°": 11.71,
    "2-Leg @ 30°": 8.28,
    "3-Leg @ 60°": 21.51,
    "3-Leg @ 45°": 17.56,
    "3-Leg @ 30°": 12.42,
    "4-Leg @ 60°": 28.68,
    "4-Leg @ 45°": 23.42,
    "4-Leg @ 30°": 16.56
  },
  "24": {
    "Straight Sling": 11.9,
    "2-Leg @ 60°": 20.62,
    "2-Leg @ 45°": 16.83,
    "2-Leg @ 30°": 11.9,
    "3-Leg @ 60°": 30.93,
    "3-Leg @ 45°": 25.25,
    "3-Leg @ 30°": 17.85,
    "4-Leg @ 60°": 41.24,
    "4-Leg @ 45°": 33.67,
    "4-Leg @ 30°": 23.8
  }
};

// Round Sling WLL Data (tonnes) - Color coded
export const roundSlingData: WLLData = {
  "Violet": {
    "Straight Sling": 1.0,
    "2-Leg @ 60°": 1.73,
    "2-Leg @ 45°": 1.41,
    "2-Leg @ 30°": 1.0,
    "3-Leg @ 60°": 2.6,
    "3-Leg @ 45°": 2.12,
    "3-Leg @ 30°": 1.5,
    "4-Leg @ 60°": 3.46,
    "4-Leg @ 45°": 2.83,
    "4-Leg @ 30°": 2.0
  },
  "Green": {
    "Straight Sling": 2.0,
    "2-Leg @ 60°": 3.46,
    "2-Leg @ 45°": 2.83,
    "2-Leg @ 30°": 2.0,
    "3-Leg @ 60°": 5.2,
    "3-Leg @ 45°": 4.24,
    "3-Leg @ 30°": 3.0,
    "4-Leg @ 60°": 6.93,
    "4-Leg @ 45°": 5.66,
    "4-Leg @ 30°": 4.0
  },
  "Yellow": {
    "Straight Sling": 3.0,
    "2-Leg @ 60°": 5.2,
    "2-Leg @ 45°": 4.24,
    "2-Leg @ 30°": 3.0,
    "3-Leg @ 60°": 7.79,
    "3-Leg @ 45°": 6.36,
    "3-Leg @ 30°": 4.5,
    "4-Leg @ 60°": 10.39,
    "4-Leg @ 45°": 8.49,
    "4-Leg @ 30°": 6.0
  },
  "Grey": {
    "Straight Sling": 4.0,
    "2-Leg @ 60°": 6.93,
    "2-Leg @ 45°": 5.66,
    "2-Leg @ 30°": 4.0,
    "3-Leg @ 60°": 10.39,
    "3-Leg @ 45°": 8.49,
    "3-Leg @ 30°": 6.0,
    "4-Leg @ 60°": 13.86,
    "4-Leg @ 45°": 11.31,
    "4-Leg @ 30°": 8.0
  },
  "Red": {
    "Straight Sling": 5.0,
    "2-Leg @ 60°": 8.66,
    "2-Leg @ 45°": 7.07,
    "2-Leg @ 30°": 5.0,
    "3-Leg @ 60°": 12.99,
    "3-Leg @ 45°": 10.61,
    "3-Leg @ 30°": 7.5,
    "4-Leg @ 60°": 17.32,
    "4-Leg @ 45°": 14.14,
    "4-Leg @ 30°": 10.0
  },
  "Brown": {
    "Straight Sling": 6.0,
    "2-Leg @ 60°": 10.39,
    "2-Leg @ 45°": 8.49,
    "2-Leg @ 30°": 6.0,
    "3-Leg @ 60°": 15.59,
    "3-Leg @ 45°": 12.73,
    "3-Leg @ 30°": 9.0,
    "4-Leg @ 60°": 20.78,
    "4-Leg @ 45°": 16.97,
    "4-Leg @ 30°": 12.0
  },
  "Blue": {
    "Straight Sling": 8.0,
    "2-Leg @ 60°": 13.86,
    "2-Leg @ 45°": 11.31,
    "2-Leg @ 30°": 8.0,
    "3-Leg @ 60°": 20.78,
    "3-Leg @ 45°": 16.97,
    "3-Leg @ 30°": 12.0,
    "4-Leg @ 60°": 27.71,
    "4-Leg @ 45°": 22.63,
    "4-Leg @ 30°": 16.0
  },
  "Orange": {
    "Straight Sling": 10.0,
    "2-Leg @ 60°": 17.32,
    "2-Leg @ 45°": 14.14,
    "2-Leg @ 30°": 10.0,
    "3-Leg @ 60°": 25.98,
    "3-Leg @ 45°": 21.21,
    "3-Leg @ 30°": 15.0,
    "4-Leg @ 60°": 34.64,
    "4-Leg @ 45°": 28.28,
    "4-Leg @ 30°": 20.0
  }
};

// Webbing Sling WLL Data (tonnes) - Same as round slings but different material
export const webbingSlingData: WLLData = roundSlingData;

// All sling types configuration
export const slingTypes: SlingType[] = [
  {
    id: 'chainGrade80',
    name: 'Grade 80 Chain',
    data: chainGrade80Data,
    configurations: [
      'Straight Sling',
      '2-Leg @ 60°',
      '2-Leg @ 45°',
      '2-Leg @ 30°',
      '3-Leg @ 60°',
      '3-Leg @ 45°',
      '3-Leg @ 30°',
      '4-Leg @ 60°',
      '4-Leg @ 45°',
      '4-Leg @ 30°'
    ],
    notes: 'Australian/New Zealand standard Grade 80 alloy steel chain'
  },
  {
    id: 'chainGrade100',
    name: 'Grade 100 Chain',
    data: chainGrade100Data,
    configurations: [
      'Straight Sling',
      '2-Leg @ 60°',
      '2-Leg @ 45°',
      '2-Leg @ 30°',
      '3-Leg @ 60°',
      '3-Leg @ 45°',
      '3-Leg @ 30°',
      '4-Leg @ 60°',
      '4-Leg @ 45°',
      '4-Leg @ 30°'
    ],
    notes: 'Enhanced capacity Grade 100 alloy steel chain'
  },
  {
    id: 'wire',
    name: 'Wire Rope',
    data: wireRopeData,
    configurations: [
      'Straight Sling',
      '2-Leg @ 60°',
      '2-Leg @ 45°',
      '2-Leg @ 30°',
      '3-Leg @ 60°',
      '3-Leg @ 45°',
      '3-Leg @ 30°',
      '4-Leg @ 60°',
      '4-Leg @ 45°',
      '4-Leg @ 30°'
    ],
    notes: 'Steel wire rope slings with pressed eyes'
  },
  {
    id: 'round',
    name: 'Round Sling',
    data: roundSlingData,
    configurations: [
      'Straight Sling',
      '2-Leg @ 60°',
      '2-Leg @ 45°',
      '2-Leg @ 30°',
      '3-Leg @ 60°',
      '3-Leg @ 45°',
      '3-Leg @ 30°',
      '4-Leg @ 60°',
      '4-Leg @ 45°',
      '4-Leg @ 30°'
    ],
    notes: 'Color-coded polyester round slings'
  },
  {
    id: 'webbing',
    name: 'Webbing Sling',
    data: webbingSlingData,
    configurations: [
      'Straight Sling',
      '2-Leg @ 60°',
      '2-Leg @ 45°',
      '2-Leg @ 30°',
      '3-Leg @ 60°',
      '3-Leg @ 45°',
      '3-Leg @ 30°',
      '4-Leg @ 60°',
      '4-Leg @ 45°',
      '4-Leg @ 30°'
    ],
    notes: 'Flat polyester webbing slings'
  }
];

/**
 * Calculate WLL for given parameters
 */
export function calculateWLL(
  slingTypeId: string,
  size: string,
  configuration: string
): number | null {
  const slingType = slingTypes.find(type => type.id === slingTypeId);
  if (!slingType) return null;
  
  const sizeData = slingType.data[size];
  if (!sizeData) return null;
  
  return sizeData[configuration] || null;
}

/**
 * Get available sizes for a sling type
 */
export function getAvailableSizes(slingTypeId: string): string[] {
  const slingType = slingTypes.find(type => type.id === slingTypeId);
  if (!slingType) return [];
  
  return Object.keys(slingType.data);
}

/**
 * Get available configurations for a sling type
 */
export function getAvailableConfigurations(slingTypeId: string): string[] {
  const slingType = slingTypes.find(type => type.id === slingTypeId);
  if (!slingType) return [];
  
  return slingType.configurations;
}

/**
 * Quick reference tips for AU/NZ standards
 */
export const quickReferenceTips = [
  {
    title: "Chain Sling Inspection",
    content: "Inspect chain slings before each use. Look for wear, cracks, bent links, or stretched components. Replace if wear exceeds 10% of original dimensions.",
    standard: "AS 2550.1"
  },
  {
    title: "Sling Angle Safety",
    content: "Never use sling angles less than 30° from vertical. As the angle decreases, the load on each leg increases dramatically. Angles less than 30° create dangerous loads.",
    standard: "AS 2550.1"
  },
  {
    title: "Wire Rope Care",
    content: "Protect wire rope from sharp edges and corners. Use corner blocks or padding. Store in dry conditions to prevent corrosion. Check for broken wires regularly.",
    standard: "AS 2550.2"
  },
  {
    title: "Round Sling Protection",
    content: "Synthetic slings must be protected from sharp edges, heat sources, and UV exposure. Use protective sleeves when lifting materials with rough surfaces.",
    standard: "AS 2550.4"
  },
  {
    title: "Load Testing Requirements",
    content: "All lifting equipment must be tested and certified. Test certificates must be available on site. Testing frequency varies by equipment type and usage.",
    standard: "AS 2550 Series"
  },
  {
    title: "Safety Factor Guidelines",
    content: "Working Load Limit (WLL) incorporates appropriate safety factors. Never exceed the WLL under any circumstances. Consider dynamic loading effects.",
    standard: "AS 2550.1"
  }
];