# RYGTEK Mobile App Migration Project - Claude Context File

## 📋 Project Overview

This project involves migrating the RYGTEK rigging calculator app from a legacy HTML/CSS/JavaScript version to a modern full-stack Expo React Native app with backend integration, authentication, and subscription features.

**Project Paths:**
- **Legacy App**: `/Users/damon/Desktop/Github Projects/Rygtek-Mobile-App/Rygtek-Mobile-App/`
- **New Expo App**: `/Users/damon/Desktop/Github Projects/Full-Stack-Expo-App-Repo/`

---

## 🎯 Current Mission

**Status:** 95% complete migration - performing final refinements and fixes  
**Next Phase:** Fixing minor UI/UX inconsistencies with legacy app, particularly main menu issues

### Current Todo List
1. **Fix missing logo display in MainMenuScreen** (HIGH PRIORITY)
2. **Verify calculator accuracy across all calculation screens** (HIGH PRIORITY)
3. **Add missing footer section with version and tagline** (MEDIUM)
4. **Correct icon inconsistencies in menu items** (MEDIUM)
5. **Test hamburger menu navigation flow consistency** (MEDIUM)
6. **Review safety alerts system completeness** (MEDIUM)
7. **Fix shop description text to match legacy** (LOW)

---

## 🏗️ Legacy App (Complete Technical Analysis)

### **Architecture & Structure**
- **Traditional web stack**: 11 HTML pages, single CSS file, single JavaScript file (~1900 lines)
- **Offline-capable**: Service Worker implementation
- **Data persistence**: localStorage for equipment register
- **Navigation**: Hamburger menu + Apple-style back buttons

### **Core Features Analysis**

#### **1. Working Load Limit (WLL) Calculator**
- **Purpose**: Calculate safe working loads for lifting equipment per Australian standards
- **Equipment Types**: Chain Grade 80/100, Wire Rope, Round/Webbing Slings
- **Standards Compliance**: AS/NZS 4991, AS 2321, AS 2550
- **Data Structure**: Complete WLL lookup tables with industry-standard values
- **Quick Reference**: Randomized Australian/NZ rigging safety tips

**Key Calculations:**
```javascript
const wllData = {
    chainGrade80: {
        6: { "Straight Sling": 1.1, "2-Leg @ 60°": 1.9, "Basket": 2.2 },
        // Complete range: 6mm to 32mm with all configurations
    },
    round: {
        "Violet (1t)": { "Vertical": 1.0, "Choke": 0.8, "Basket": 2.0 },
        // Color-coded system: Violet, Green, Yellow, Grey, Red, Brown, Blue, Orange
    }
}
```

#### **2. Angle & Dimensions Calculator**
- **Purpose**: Calculate sling angles and missing triangle dimensions using trigonometry
- **Input**: Any 2 of 3 values (length, height, diagonal/sling length)
- **Safety Zones**: 
  - Safe (60°-90°): Green, optimal range
  - Caution (45°-60°): Yellow, higher loads
  - Warning (30°-45°): Orange, very high loads
  - Danger (<30°): Red, never use

**Mathematical Logic:**
```javascript
// Missing dimension calculation using Pythagorean theorem
missingDimension = Math.sqrt(Math.pow(known1, 2) + Math.pow(known2, 2));

// Angle calculation
includedAngle = 2 * Math.atan(halfBase / height) * (180 / Math.PI);

// Load factor calculation
loadFactor = 1 / Math.cos(halfAngle * Math.PI / 180);
```

#### **3. Load Weight Estimator**
- **Material Database**: 40+ materials with complete density data
- **Categories**: Metals, Construction, Timber, Liquids, Aggregates, Others
- **Features**: Multi-unit support, real-time conversion, material property information
- **Calculation**: `weight = volume × density`

**Material Data Structure:**
```javascript
const materialDatabase = {
    'steel-mild': {
        density: 7850, // kg/m³
        name: 'Mild Steel',
        properties: 'High strength, magnetic, corrosive',
        notes: 'Most common structural steel. Check for sharp edges and coating.'
    }
}
```

#### **4. Lifting Register System**
- **Purpose**: Track lifting equipment inspections per AS 2550 standards
- **Storage**: localStorage with JSON serialization
- **Compliance**: Quarterly (3 months) and annual (12 months) testing cycles
- **Rugby Tag System**: Color-coded quarterly inspection (Red, Green, Blue, Yellow)
- **Export**: CSV download functionality

**Equipment Data Structure:**
```javascript
const equipment = {
    id: "CS-001",
    type: "chain-grade80",
    wll: 2.0,
    manufacturer: "Nobles",
    size: "13mm",
    lastTestDate: "2024-01-15",
    testAuthority: "NATA Lab",
    nextQuarterlyDate: "2024-04-15",
    nextAnnualDate: "2025-01-15",
    rugbyTag: "Red",
    status: "active",
    notes: "Located at Site A"
}
```

### **Premium Features**
- **Safety Alerts**: Email subscription for industry alerts, WorkSafe Australia integration
- **Basic calculators**: Free access
- **Equipment register**: Free with local storage only

### **UI/UX Patterns**
- **Apple-inspired design**: Clean, modern aesthetic with RYGTEK red branding (#e31e24)
- **Glassmorphism effects**: Backdrop blur, transparency
- **AOS animations**: Smooth page transitions with cubic-bezier easing
- **Responsive design**: Mobile-first approach
- **Consistent navigation**: Hamburger menu with all features listed

---

## 🚀 Modern Expo App (Complete Technical Analysis)

### **Technology Stack**
- **Frontend**: Expo 53, React Native 0.79.2, TypeScript, NativeWind (Tailwind CSS)
- **Backend**: Next.js 15.3.3, Prisma ORM, PostgreSQL
- **Authentication**: Better Auth with OAuth (Google, Apple, Email/Password)
- **Payments**: RevenueCat for subscription management
- **State Management**: React Query, React Context
- **Navigation**: Expo Router (file-based routing)

### **Project Structure**
```
/app/                           # React Native Expo mobile app
├── (auth)/                     # Authentication screens
├── (tabs)/                     # Main tabbed navigation
├── onboarding/                 # User onboarding flow
├── screens/                    # Feature screens (calculators, etc.)
├── contexts/                   # React Context providers
├── utils/                      # Calculation utilities & helpers
└── components/                 # Reusable UI components

/backend/                       # Next.js API server
├── api/                        # API routes
├── prisma/                     # Database schema & migrations
└── lib/                        # Server utilities

/website/                       # Marketing website (Next.js)
└── [DO NOT MODIFY - COMPLETE]
```

### **Authentication System**
- **Better Auth**: Multi-provider OAuth with secure token storage
- **Session Management**: 90-day expiry, 7-day refresh cycle, database-backed
- **Current Status**: Demo mode - OAuth flows to onboarding but not fully connected

**Flow:**
```
Welcome → Auth Selection → OAuth/Email → Session Storage → Onboarding → Main App
```

### **Payment/Subscription System (RevenueCat)**
- **Architecture**: Singleton service with React Query integration
- **Features**: User identification, subscription tracking, paywall UI, purchase restoration
- **Current Status**: Configured but not production-ready (API keys needed)

**Implementation:**
```typescript
// SubscriptionContext provides app-wide subscription state
const { isSubscribed, subscriptionStatus } = useSubscription();

// Premium feature gating
if (!isSubscribed && isPremiumFeature) {
  return <PaywallScreen />;
}
```

### **Database Schema (Prisma)**
```sql
User:
- Better Auth standard fields
- subscriptionStatus, subscriptionId
- onboardingComplete

Equipment:
- User-specific equipment tracking
- Test history, dates, notes (JSON field)
- AS 2550 compliance tracking
```

### **Navigation Architecture**
```typescript
// Route structure
/welcome → /(auth) → /onboarding → /(tabs)/main-menu

// All screens implemented:
// - Core Calculators: Angle/Dimensions, Load Weight, Working Load Limit
// - Utility: Lifting Register, Safety Alerts (premium), Shop, Contact
// - Reference: Crane Signals
```

### **State Management**
```typescript
// Provider hierarchy
QueryClientProvider
└── ThemeProvider (light/dark mode)
    └── OnboardingProvider (completion tracking)
        └── OnboardingAnswersProvider (AsyncStorage persistence)
            └── SubscriptionProvider (RevenueCat integration)
```

### **Calculation Utilities**
**Significant improvement over legacy** - All calculations ported and enhanced:

1. **Angle & Dimensions**: Real-time calculations, SVG visualization, safety assessment
2. **Load Weight**: 85+ material database, comprehensive density calculations
3. **Working Load Limit**: Standards-based data, multiple sling configurations

**Example Implementation:**
```typescript
// angle-calculations.ts
export const calculateMissingDimension = (
  known1: number, 
  known2: number, 
  type: 'hypotenuse' | 'height' | 'base'
): number => {
  switch (type) {
    case 'hypotenuse':
      return Math.sqrt(Math.pow(known1, 2) + Math.pow(known2, 2));
    case 'height':
      return Math.sqrt(Math.pow(known1, 2) - Math.pow(known2, 2));
    case 'base':
      return Math.sqrt(Math.pow(known1, 2) - Math.pow(known2, 2));
  }
};
```

---

## 🔧 Known Issues & Required Fixes

### **🚨 Critical Issues (Identified in Main Menu Comparison)**

#### **1. Main Menu Logo Missing** 
- **Location**: `app/screens/main-menu.tsx:126-128`
- **Issue**: Logo section commented out, breaking visual hierarchy
- **Legacy Reference**: `main-menu.html:55-59` shows logo with glow effects

#### **2. Footer Section Missing**
- **Location**: `app/screens/main-menu.tsx` (no footer)
- **Issue**: Version info and tagline completely absent
- **Legacy Reference**: `main-menu.html:185-188` shows "Version 2.0" and "Stay safe. Calculate smart."

#### **3. Icon Inconsistencies**
- **Load Estimator**: Legacy uses `fa-boxes-stacked`, Expo uses `calculator`
- **Safety Alerts**: Legacy uses `fa-triangle-exclamation`, Expo uses `exclamation-triangle`
- **Crane Signals**: Legacy uses `fa-person-rays`, Expo uses `hand-paper`

#### **4. Shop Description Mismatch**
- **Legacy**: "PPE gear and branded merchandise"
- **Expo**: "Purchase equipment and tools"

### **⚠️ Implementation Status**

#### **✅ Completed Features:**
- All 11 screens successfully ported
- Navigation and UI framework
- Core calculation utilities (accurate and enhanced)
- Authentication system architecture
- Subscription system framework
- Database schema design
- Responsive mobile design

#### **⚠️ Partially Implemented:**
- Authentication (demo mode only)
- Subscription system (configured but inactive)
- Equipment management (database schema only)

#### **❌ Missing/Incomplete:**
- Production environment configuration
- Complete OAuth integration
- Active subscription enforcement
- Equipment CRUD operations in UI
- Push notifications
- Offline capabilities

---

## 🎯 Development Guidelines

### **Code Standards**
- **TypeScript**: Strict typing throughout
- **Component Architecture**: Reusable, well-documented components
- **Error Handling**: Try-catch blocks, validation, loading states
- **Performance**: Debouncing, conditional updates, efficient re-renders

### **Legacy Fidelity Requirements**
1. **Visual Consistency**: Match legacy UI/UX patterns exactly
2. **Calculation Accuracy**: All formulas must match legacy implementation
3. **Feature Completeness**: Every legacy feature must be available
4. **User Flow**: Navigation patterns should feel familiar

### **Australian Standards Compliance**
- **AS/NZS 4991**: Australian lifting standards
- **AS 2321**: Chain sling standards  
- **AS 2550**: Crane and hoist standards
- **RIIHAN301A**: Competent person requirements

---

## 🔄 Next Session Priorities

### **Immediate Actions (High Priority)**
1. **Restore main menu logo** - Uncomment and implement logo display
2. **Add footer section** - Version info and tagline
3. **Verify all calculator accuracy** - Cross-check with legacy calculations
4. **Fix icon inconsistencies** - Match legacy FontAwesome icons exactly

### **Medium Priority**
1. **Test navigation flows** - Hamburger menu behavior
2. **Review safety alerts** - Ensure content completeness
3. **Equipment register UI** - Implement CRUD operations

### **Production Readiness**
1. **Environment configuration** - API keys, OAuth setup
2. **Subscription enforcement** - Active premium feature gating
3. **App Store preparation** - Build configuration, deployment

---

## 📱 App Flow Understanding

### **User Journey**
```
1. Welcome Screen → Auth Selection
2. OAuth/Email Authentication → Session Creation
3. Onboarding Flow → Completion Tracking
4. Main Menu → Feature Selection
5. Calculator Usage → Real-time Calculations
6. Premium Features → Subscription Check → Paywall/Access
7. Equipment Register → Local Storage → Compliance Tracking
```

### **Premium Feature Gating**
```typescript
// Check subscription status before allowing access
const { isSubscribed } = useSubscription();

// Premium features: Safety Alerts, Advanced Calculations
if (isPremiumFeature && !isSubscribed) {
  router.push('/paywall');
  return;
}
```

### **Data Persistence Strategy**
- **Authentication**: Expo SecureStore (encrypted)
- **User Preferences**: AsyncStorage (onboarding answers, settings)
- **Subscription Status**: RevenueCat SDK + Database
- **Equipment Data**: Database with user association (future)
- **Calculations**: Session-based (no persistence needed)

---

## 🎨 Design System

### **Brand Guidelines**
- **Primary Color**: RYGTEK Red (#e31e24)
- **Theme**: Dark theme optimized for industrial use
- **Typography**: System fonts with clear hierarchy
- **Iconography**: FontAwesome5 with consistent sizing

### **Mobile-First Responsive Design**
```typescript
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Responsive sizing throughout
fontSize: isSmallScreen ? 16 : 18,
padding: isSmallScreen ? 18 : 22,
```

---

## 💡 Development Tips for Future Sessions

1. **Always compare with legacy** - Check `/Users/damon/Desktop/Github Projects/Rygtek-Mobile-App/Rygtek-Mobile-App/` for reference
2. **Test calculations** - Verify formulas match `script.js` implementations exactly
3. **Check visual consistency** - UI should match legacy design patterns
4. **Maintain todo list** - Use TodoWrite/TodoRead to track progress
5. **Prioritize user-facing issues** - Fix visible problems before backend work

**Current Status: 95% Complete - Focus on Polish & Production Readiness**