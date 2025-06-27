import { Dimensions } from 'react-native';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device size detection
export const isSmallScreen = screenHeight < 700;
export const isMediumScreen = screenHeight >= 700 && screenHeight < 900;
export const isLargeScreen = screenHeight >= 900;
export const isTablet = screenWidth > 768;

// Responsive scaling functions
export const scale = (size: number): number => {
  if (isSmallScreen) return size * 0.85;
  if (isTablet) return size * 1.2;
  return size;
};

export const verticalScale = (size: number): number => {
  if (isSmallScreen) return size * 0.8;
  if (isTablet) return size * 1.15;
  return size;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Common responsive values
export const responsive = {
  // Padding and margins
  padding: {
    xs: scale(8),
    sm: scale(12),
    md: scale(16),
    lg: scale(20),
    xl: scale(24),
    xxl: scale(32),
  },
  
  // Font sizes
  fontSize: {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
    xxl: moderateScale(20),
    title: moderateScale(24),
    heading: moderateScale(28),
    display: moderateScale(32),
  },
  
  // Icon sizes
  iconSize: {
    xs: scale(16),
    sm: scale(20),
    md: scale(24),
    lg: scale(28),
    xl: scale(32),
  },
  
  // Logo sizes
  logoSize: {
    small: scale(120),
    medium: scale(180),
    large: scale(220),
    xlarge: scale(280),
  },
  
  // Button heights
  buttonHeight: {
    sm: verticalScale(40),
    md: verticalScale(48),
    lg: verticalScale(56),
  },
  
  // Border radius
  borderRadius: {
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
  },
};

// Common layout styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: '#111217',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: responsive.padding.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingVertical: responsive.padding.xl,
  },
  card: {
    backgroundColor: '#23232a',
    borderRadius: responsive.borderRadius.lg,
    padding: responsive.padding.lg,
    marginBottom: responsive.padding.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: '#e31e24',
    borderRadius: responsive.borderRadius.lg,
    paddingVertical: responsive.padding.md,
    paddingHorizontal: responsive.padding.xl,
    shadowColor: '#e31e24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold' as const,
    fontSize: responsive.fontSize.lg,
    textAlign: 'center' as const,
  },
  headingText: {
    color: '#fff',
    fontSize: responsive.fontSize.heading,
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    marginBottom: responsive.padding.sm,
  },
  bodyText: {
    color: '#ccc',
    fontSize: responsive.fontSize.md,
    textAlign: 'center' as const,
    lineHeight: responsive.fontSize.md * 1.4,
  },
};