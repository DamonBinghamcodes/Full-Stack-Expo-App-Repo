/**
 * Lifting Register Data Models and Business Logic
 * AS 2550 Compliance tracking for rigging equipment
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EquipmentEntry {
  id: string;                    // Unique identifier (max 20 chars)
  type: string;                  // Equipment type value
  wll: number;                   // Working Load Limit in tonnes
  manufacturer: string;          // Manufacturer name (max 30 chars)
  size: string;                  // Size/specification (max 30 chars)
  lastTestDate: string;          // ISO date string (YYYY-MM-DD)
  testAuthority: string;         // Testing authority (max 40 chars)
  notes?: string;                // Optional notes (max 200 chars)
  dateAdded: string;             // ISO date when added to register
  status: 'active';              // Always 'active'
  nextQuarterlyDate: string;     // Calculated quarterly inspection date
  nextAnnualDate: string;        // Calculated annual test date
  rugbyTag: string;              // Current rugby tag color
  nextRugbyTag: string;          // Next rugby tag color
  testHistory: TestRecord[];     // Array of test records
}

export interface TestRecord {
  date: string;                  // ISO date string
  type: 'quarterly' | 'annual';  // Test type
  authority: string;             // Testing authority
  notes?: string;                // Test notes
  result: 'pass' | 'fail';       // Test result
}

export interface EquipmentStatus {
  class: 'current' | 'due-soon' | 'overdue';
  text: string;
  icon: string;
  color: string;
  daysUntilDue: number;
}

export interface EquipmentType {
  value: string;
  label: string;
  category: string;
}

// Equipment types organized by categories
export const equipmentTypes: EquipmentType[] = [
  // Chain Slings
  { value: 'chain-grade80', label: 'Chain Sling (Grade 80)', category: 'Chain Slings' },
  { value: 'chain-grade100', label: 'Chain Sling (Grade 100)', category: 'Chain Slings' },
  { value: 'chain-adjustable', label: 'Adjustable Chain Sling', category: 'Chain Slings' },
  
  // Wire Rope
  { value: 'wire-sling', label: 'Wire Rope Sling', category: 'Wire Rope' },
  { value: 'wire-strop', label: 'Wire Rope Strop', category: 'Wire Rope' },
  { value: 'wire-endless', label: 'Endless Wire Sling', category: 'Wire Rope' },
  
  // Synthetic Slings
  { value: 'round-sling', label: 'Round Sling', category: 'Synthetic Slings' },
  { value: 'webbing-sling', label: 'Webbing Sling', category: 'Synthetic Slings' },
  { value: 'endless-sling', label: 'Endless Synthetic Sling', category: 'Synthetic Slings' },
  
  // Hardware
  { value: 'shackle', label: 'Shackle', category: 'Hardware' },
  { value: 'hook', label: 'Lifting Hook', category: 'Hardware' },
  { value: 'eyebolt', label: 'Eyebolt', category: 'Hardware' },
  { value: 'spreader-beam', label: 'Spreader Beam', category: 'Hardware' },
  { value: 'lifting-beam', label: 'Lifting Beam', category: 'Hardware' },
  
  // Crane Equipment
  { value: 'crane-block', label: 'Crane Block', category: 'Crane Equipment' },
  { value: 'load-block', label: 'Load Block', category: 'Crane Equipment' },
  { value: 'crane-hook', label: 'Crane Hook', category: 'Crane Equipment' },
];

// Rugby tag colors (quarterly system)
export const rugbyColors = ['Red', 'Green', 'Blue', 'Yellow'];

// AsyncStorage key
const STORAGE_KEY = 'rygtek_lifting_register';

/**
 * Calculate rugby tag colors based on test date
 */
export function calculateRugbyTags(lastTestDate: string): { current: string; next: string } {
  const lastDate = new Date(lastTestDate);
  const quarter = Math.floor(lastDate.getMonth() / 3);
  const nextQuarter = (quarter + 1) % 4;
  
  return {
    current: rugbyColors[quarter],
    next: rugbyColors[nextQuarter]
  };
}

/**
 * Calculate next test dates based on last test date
 */
export function calculateTestDates(lastTestDate: string): {
  quarterly: string;
  annual: string;
  rugbyTag: string;
  nextRugbyTag: string;
} {
  const lastDate = new Date(lastTestDate);
  
  // Quarterly inspection (3 months)
  const quarterly = new Date(lastDate);
  quarterly.setMonth(quarterly.getMonth() + 3);
  
  // Annual test (12 months)
  const annual = new Date(lastDate);
  annual.setFullYear(annual.getFullYear() + 1);
  
  const rugbyTags = calculateRugbyTags(lastTestDate);
  
  return {
    quarterly: quarterly.toISOString().split('T')[0],
    annual: annual.toISOString().split('T')[0],
    rugbyTag: rugbyTags.current,
    nextRugbyTag: rugbyTags.next
  };
}

/**
 * Calculate equipment status based on next quarterly inspection date
 */
export function getEquipmentStatus(equipment: EquipmentEntry): EquipmentStatus {
  const today = new Date();
  const nextQuarterly = new Date(equipment.nextQuarterlyDate);
  const daysDiff = Math.ceil((nextQuarterly.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 0) {
    return {
      class: 'overdue',
      text: 'Overdue',
      icon: 'exclamation-triangle',
      color: '#F44336',
      daysUntilDue: daysDiff
    };
  } else if (daysDiff <= 30) {
    return {
      class: 'due-soon',
      text: 'Due Soon',
      icon: 'clock',
      color: '#FF9800',
      daysUntilDue: daysDiff
    };
  } else {
    return {
      class: 'current',
      text: 'Current',
      icon: 'check-circle',
      color: '#4CAF50',
      daysUntilDue: daysDiff
    };
  }
}

/**
 * Validate equipment form data
 */
export function validateEquipmentEntry(data: Partial<EquipmentEntry>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Required fields
  if (!data.type) {
    errors.type = 'Equipment type is required';
  }
  
  if (!data.id) {
    errors.id = 'Equipment ID is required';
  } else if (data.id.length > 20) {
    errors.id = 'Equipment ID must be 20 characters or less';
  }
  
  if (!data.wll || data.wll <= 0) {
    errors.wll = 'WLL must be greater than 0';
  }
  
  if (!data.lastTestDate) {
    errors.lastTestDate = 'Last test date is required';
  } else {
    const testDate = new Date(data.lastTestDate);
    const today = new Date();
    if (testDate > today) {
      errors.lastTestDate = 'Test date cannot be in the future';
    }
  }
  
  // Optional field length limits
  if (data.manufacturer && data.manufacturer.length > 30) {
    errors.manufacturer = 'Manufacturer must be 30 characters or less';
  }
  
  if (data.size && data.size.length > 30) {
    errors.size = 'Size must be 30 characters or less';
  }
  
  if (data.testAuthority && data.testAuthority.length > 40) {
    errors.testAuthority = 'Test authority must be 40 characters or less';
  }
  
  if (data.notes && data.notes.length > 200) {
    errors.notes = 'Notes must be 200 characters or less';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Create a new equipment entry with calculated dates
 */
export function createEquipmentEntry(data: {
  id: string;
  type: string;
  wll: number;
  manufacturer: string;
  size: string;
  lastTestDate: string;
  testAuthority: string;
  notes?: string;
}): EquipmentEntry {
  const testDates = calculateTestDates(data.lastTestDate);
  const dateAdded = new Date().toISOString().split('T')[0];
  
  return {
    ...data,
    dateAdded,
    status: 'active',
    nextQuarterlyDate: testDates.quarterly,
    nextAnnualDate: testDates.annual,
    rugbyTag: testDates.rugbyTag,
    nextRugbyTag: testDates.nextRugbyTag,
    testHistory: []
  };
}

/**
 * Load equipment data from AsyncStorage
 */
export async function loadEquipmentData(): Promise<EquipmentEntry[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading equipment data:', error);
    return [];
  }
}

/**
 * Save equipment data to AsyncStorage
 */
export async function saveEquipmentData(equipment: EquipmentEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(equipment));
  } catch (error) {
    console.error('Error saving equipment data:', error);
    throw new Error('Failed to save equipment data');
  }
}

/**
 * Add new equipment entry
 */
export async function addEquipmentEntry(data: {
  id: string;
  type: string;
  wll: number;
  manufacturer: string;
  size: string;
  lastTestDate: string;
  testAuthority: string;
  notes?: string;
}): Promise<EquipmentEntry> {
  const equipment = await loadEquipmentData();
  
  // Check for duplicate ID
  if (equipment.some(item => item.id === data.id)) {
    throw new Error('Equipment ID already exists');
  }
  
  const newEntry = createEquipmentEntry(data);
  equipment.push(newEntry);
  
  await saveEquipmentData(equipment);
  return newEntry;
}

/**
 * Update existing equipment entry
 */
export async function updateEquipmentEntry(id: string, updates: Partial<EquipmentEntry>): Promise<EquipmentEntry> {
  const equipment = await loadEquipmentData();
  const index = equipment.findIndex(item => item.id === id);
  
  if (index === -1) {
    throw new Error('Equipment not found');
  }
  
  // Recalculate dates if lastTestDate changed
  if (updates.lastTestDate && updates.lastTestDate !== equipment[index].lastTestDate) {
    const testDates = calculateTestDates(updates.lastTestDate);
    Object.assign(updates, {
      nextQuarterlyDate: testDates.quarterly,
      nextAnnualDate: testDates.annual,
      rugbyTag: testDates.rugbyTag,
      nextRugbyTag: testDates.nextRugbyTag
    });
  }
  
  equipment[index] = { ...equipment[index], ...updates };
  await saveEquipmentData(equipment);
  
  return equipment[index];
}

/**
 * Delete equipment entry
 */
export async function deleteEquipmentEntry(id: string): Promise<void> {
  const equipment = await loadEquipmentData();
  const filtered = equipment.filter(item => item.id !== id);
  
  if (filtered.length === equipment.length) {
    throw new Error('Equipment not found');
  }
  
  await saveEquipmentData(filtered);
}

/**
 * Record a new test for equipment
 */
export async function recordTest(
  equipmentId: string,
  testData: {
    date: string;
    type: 'quarterly' | 'annual';
    authority: string;
    notes?: string;
    result: 'pass' | 'fail';
  }
): Promise<EquipmentEntry> {
  const equipment = await loadEquipmentData();
  const index = equipment.findIndex(item => item.id === equipmentId);
  
  if (index === -1) {
    throw new Error('Equipment not found');
  }
  
  // Add test record to history
  equipment[index].testHistory.push(testData);
  
  // Update last test date and recalculate dates if this is the most recent test
  const lastTestDate = new Date(equipment[index].lastTestDate);
  const newTestDate = new Date(testData.date);
  
  if (newTestDate > lastTestDate) {
    const testDates = calculateTestDates(testData.date);
    equipment[index].lastTestDate = testData.date;
    equipment[index].testAuthority = testData.authority;
    equipment[index].nextQuarterlyDate = testDates.quarterly;
    equipment[index].nextAnnualDate = testDates.annual;
    equipment[index].rugbyTag = testDates.rugbyTag;
    equipment[index].nextRugbyTag = testDates.nextRugbyTag;
  }
  
  await saveEquipmentData(equipment);
  return equipment[index];
}

/**
 * Get equipment summary statistics
 */
export function getEquipmentSummary(equipment: EquipmentEntry[]): {
  total: number;
  current: number;
  dueSoon: number;
  overdue: number;
} {
  const summary = {
    total: equipment.length,
    current: 0,
    dueSoon: 0,
    overdue: 0
  };
  
  equipment.forEach(item => {
    const status = getEquipmentStatus(item);
    switch (status.class) {
      case 'current':
        summary.current++;
        break;
      case 'due-soon':
        summary.dueSoon++;
        break;
      case 'overdue':
        summary.overdue++;
        break;
    }
  });
  
  return summary;
}

/**
 * Filter equipment by status
 */
export function filterEquipmentByStatus(
  equipment: EquipmentEntry[],
  statusFilter: 'all' | 'current' | 'due-soon' | 'overdue'
): EquipmentEntry[] {
  if (statusFilter === 'all') return equipment;
  
  return equipment.filter(item => {
    const status = getEquipmentStatus(item);
    return status.class === statusFilter;
  });
}

/**
 * Filter equipment by type category
 */
export function filterEquipmentByType(
  equipment: EquipmentEntry[],
  typeFilter: string
): EquipmentEntry[] {
  if (typeFilter === 'all') return equipment;
  
  return equipment.filter(item => {
    const equipmentType = equipmentTypes.find(type => type.value === item.type);
    return equipmentType?.category.toLowerCase().replace(/\s+/g, '-') === typeFilter;
  });
}

/**
 * Generate CSV export data
 */
export function generateCSVExport(equipment: EquipmentEntry[]): string {
  const headers = [
    'ID',
    'Type',
    'WLL (tonnes)',
    'Manufacturer',
    'Size',
    'Last Test Date',
    'Next Quarterly',
    'Next Annual',
    'Status',
    'Rugby Tag',
    'Test Authority',
    'Notes'
  ];
  
  const rows = equipment.map(item => {
    const status = getEquipmentStatus(item);
    const equipmentType = equipmentTypes.find(type => type.value === item.type);
    
    return [
      item.id,
      equipmentType?.label || item.type,
      item.wll,
      item.manufacturer,
      item.size,
      item.lastTestDate,
      item.nextQuarterlyDate,
      item.nextAnnualDate,
      status.text,
      item.rugbyTag,
      item.testAuthority,
      item.notes || ''
    ];
  });
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  return csvContent;
}

/**
 * Get equipment type label from value
 */
export function getEquipmentTypeLabel(typeValue: string): string {
  const type = equipmentTypes.find(t => t.value === typeValue);
  return type?.label || typeValue;
}

/**
 * Get equipment types grouped by category
 */
export function getEquipmentTypesByCategory(): Record<string, EquipmentType[]> {
  return equipmentTypes.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, EquipmentType[]>);
}