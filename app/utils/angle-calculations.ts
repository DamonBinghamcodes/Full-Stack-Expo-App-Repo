/**
 * Angle and Dimensions Calculations
 * Mathematical calculations for sling angles and triangle dimensions
 */

export interface AngleCalculationResult {
  includedAngle: number;
  angleFromVertical: number;
  loadFactor: number;
  safetyLevel: 'safe' | 'caution' | 'warning' | 'danger';
  safetyMessage: string;
  loadPerLeg?: number;
}

export interface TriangleDimensions {
  width?: number;
  height?: number;
  length?: number;
}

/**
 * Calculate sling angles and load factors from triangle dimensions
 */
export function calculateSlingAngles(
  width: number | null, 
  height: number | null, 
  length: number | null
): AngleCalculationResult | null {
  // Need at least 2 dimensions to calculate
  const definedValues = [width, height, length].filter(val => val !== null && val > 0);
  if (definedValues.length < 2) return null;

  let finalWidth = width;
  let finalHeight = height;
  let finalLength = length;

  // Calculate missing dimension if only 2 are provided
  if (width && height && !length) {
    // Calculate length using Pythagorean theorem
    const halfWidth = width / 2;
    finalLength = Math.sqrt(Math.pow(halfWidth, 2) + Math.pow(height, 2));
  } else if (width && length && !height) {
    // Calculate height
    const halfWidth = width / 2;
    finalHeight = Math.sqrt(Math.pow(length, 2) - Math.pow(halfWidth, 2));
    if (isNaN(finalHeight) || finalHeight <= 0) {
      return null; // Invalid triangle
    }
  } else if (height && length && !width) {
    // Calculate width
    const halfWidthSquared = Math.pow(length, 2) - Math.pow(height, 2);
    if (halfWidthSquared <= 0) {
      return null; // Invalid triangle
    }
    finalWidth = 2 * Math.sqrt(halfWidthSquared);
  }

  if (!finalWidth || !finalHeight || !finalLength) return null;

  // Calculate angles
  const halfBase = finalWidth / 2;
  const angleFromVerticalRad = Math.atan(halfBase / finalHeight);
  const angleFromVerticalDeg = angleFromVerticalRad * (180 / Math.PI);
  
  // Included angle between the two slings
  const includedAngleRad = 2 * angleFromVerticalRad;
  const includedAngleDeg = includedAngleRad * (180 / Math.PI);

  // Load factor calculation
  const loadFactor = 1 / Math.cos(angleFromVerticalRad);

  // Safety assessment based on included angle
  let safetyLevel: 'safe' | 'caution' | 'warning' | 'danger';
  let safetyMessage: string;

  if (includedAngleDeg <= 60) {
    safetyLevel = 'safe';
    safetyMessage = 'Safe angle range. Good lifting configuration.';
  } else if (includedAngleDeg <= 90) {
    safetyLevel = 'caution';
    safetyMessage = 'Caution: Moderate sling angle. Monitor load distribution.';
  } else if (includedAngleDeg <= 120) {
    safetyLevel = 'warning';
    safetyMessage = 'Warning: High sling angle. Increased load on slings.';
  } else {
    safetyLevel = 'danger';
    safetyMessage = 'Danger: Extreme sling angle. Do not lift!';
  }

  return {
    includedAngle: Math.round(includedAngleDeg * 100) / 100,
    angleFromVertical: Math.round(angleFromVerticalDeg * 100) / 100,
    loadFactor: Math.round(loadFactor * 100) / 100,
    safetyLevel,
    safetyMessage
  };
}

/**
 * Calculate the missing dimension when 2 are provided
 */
export function calculateMissingDimension(
  width: number | null,
  height: number | null,
  length: number | null
): TriangleDimensions {
  const result: TriangleDimensions = {
    width: width || undefined,
    height: height || undefined,
    length: length || undefined
  };

  if (width && height && !length) {
    // Calculate hypotenuse (sling length)
    const halfWidth = width / 2;
    result.length = Math.sqrt(Math.pow(halfWidth, 2) + Math.pow(height, 2));
  } else if (width && length && !height) {
    // Calculate height
    const halfWidth = width / 2;
    const heightSquared = Math.pow(length, 2) - Math.pow(halfWidth, 2);
    if (heightSquared > 0) {
      result.height = Math.sqrt(heightSquared);
    }
  } else if (height && length && !width) {
    // Calculate base width
    const halfWidthSquared = Math.pow(length, 2) - Math.pow(height, 2);
    if (halfWidthSquared > 0) {
      result.width = 2 * Math.sqrt(halfWidthSquared);
    }
  }

  return result;
}

/**
 * Calculate load per leg given total load and angle
 */
export function calculateLoadPerLeg(totalLoad: number, includedAngle: number): number {
  if (includedAngle <= 0 || includedAngle >= 180) return 0;
  
  const halfAngleRad = (includedAngle / 2) * (Math.PI / 180);
  const loadFactor = 1 / Math.cos(halfAngleRad);
  
  return (totalLoad * loadFactor) / 2;
}

/**
 * Validate triangle dimensions for geometric feasibility
 */
export function validateTriangleDimensions(
  width: number | null,
  height: number | null,
  length: number | null
): { isValid: boolean; error?: string } {
  if (!width || !height || !length) {
    return { isValid: true }; // Not all dimensions provided, so we can't validate
  }

  const halfWidth = width / 2;
  
  // Check triangle inequality
  if (length <= halfWidth) {
    return { 
      isValid: false, 
      error: 'Sling length must be greater than half the load width' 
    };
  }

  if (length <= height) {
    return { 
      isValid: false, 
      error: 'Sling length must be greater than lift height for angled lifting' 
    };
  }

  // Check if the triangle is geometrically possible
  const calculatedHeight = Math.sqrt(Math.pow(length, 2) - Math.pow(halfWidth, 2));
  const heightDifference = Math.abs(calculatedHeight - height);
  
  if (heightDifference > 0.01) { // Allow for small rounding errors
    return { 
      isValid: false, 
      error: 'The provided dimensions do not form a valid triangle' 
    };
  }

  return { isValid: true };
}

/**
 * Get safety color based on angle
 */
export function getSafetyColor(safetyLevel: string): string {
  switch (safetyLevel) {
    case 'safe':
      return '#4CAF50'; // Green
    case 'caution':
      return '#FF9800'; // Orange
    case 'warning':
      return '#FF5722'; // Red-Orange
    case 'danger':
      return '#F44336'; // Red
    default:
      return '#757575'; // Grey
  }
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Generate SVG path for triangle visualization
 */
export function generateTriangleSVG(
  width: number,
  height: number,
  length: number,
  svgWidth = 300,
  svgHeight = 200
): string {
  // Calculate scale to fit in SVG viewport
  const maxDim = Math.max(width, height);
  const scale = Math.min(svgWidth * 0.8, svgHeight * 0.8) / maxDim;
  
  // Scaled dimensions
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  // Center the triangle in the SVG
  const offsetX = (svgWidth - scaledWidth) / 2;
  const offsetY = (svgHeight - scaledHeight) / 2;
  
  // Triangle points
  const topX = offsetX + scaledWidth / 2;
  const topY = offsetY;
  const leftX = offsetX;
  const leftY = offsetY + scaledHeight;
  const rightX = offsetX + scaledWidth;
  const rightY = offsetY + scaledHeight;
  
  return `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <!-- Load line -->
      <line x1="${leftX}" y1="${leftY}" x2="${rightX}" y2="${rightY}" 
            stroke="#333" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Left sling -->
      <line x1="${leftX}" y1="${leftY}" x2="${topX}" y2="${topY}" 
            stroke="#e31e24" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Right sling -->
      <line x1="${rightX}" y1="${rightY}" x2="${topX}" y2="${topY}" 
            stroke="#e31e24" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Height line -->
      <line x1="${topX}" y1="${topY}" x2="${topX}" y2="${leftY}" 
            stroke="#666" stroke-width="1" stroke-dasharray="5,5"/>
      
      <!-- Dimension labels -->
      <text x="${topX}" y="${topY - 10}" text-anchor="middle" font-size="12" fill="#666">
        Lift Point
      </text>
      <text x="${(leftX + rightX) / 2}" y="${leftY + 20}" text-anchor="middle" font-size="12" fill="#666">
        Width: ${width.toFixed(1)}m
      </text>
      <text x="${topX + 15}" y="${(topY + leftY) / 2}" text-anchor="start" font-size="12" fill="#666">
        Height: ${height.toFixed(1)}m
      </text>
      <text x="${(leftX + topX) / 2 - 10}" y="${(leftY + topY) / 2}" text-anchor="middle" font-size="12" fill="#e31e24">
        ${length.toFixed(1)}m
      </text>
    </svg>
  `;
}