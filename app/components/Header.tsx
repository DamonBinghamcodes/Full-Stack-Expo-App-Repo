import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import RygtekLogo from './RygtekLogo';

interface HeaderProps {
  showBack?: boolean;
  showHamburger?: boolean;
  onBack?: () => void;
  onHamburger?: () => void;
  onLogo?: () => void;
  backgroundColor?: string;
  transparent?: boolean;
}

export default function Header({
  showBack,
  showHamburger,
  onBack,
  onHamburger,
  onLogo,
  backgroundColor,
  transparent,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMainMenu = pathname === '/screens/main-menu';
  const isOnboarding = pathname?.startsWith('/onboarding') || pathname === '/onboarding/disclaimer';
  const isAuth = pathname?.startsWith('/(auth)');

  // Default logic for showing/hiding buttons
  const showBackBtn = showBack !== undefined ? showBack : !isMainMenu;
  const showHamburgerBtn = showHamburger !== undefined ? showHamburger : (!isOnboarding && !isAuth && isMainMenu);

  return (
    <View
      style={[
        styles.header,
        Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } : {},
      ]}
    >
      {/* Back button */}
      {showBackBtn ? (
        <TouchableOpacity
          onPress={onBack || (() => router.replace('/welcome'))}
          style={styles.iconBtn}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <FontAwesome5 name="arrow-left" size={22} color="#E53935" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 38 }} />
      )}

      {/* Logo */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity onPress={onLogo || (() => router.replace('/welcome'))} activeOpacity={0.8}>
          <RygtekLogo small />
        </TouchableOpacity>
      </View>

      {/* Hamburger */}
      {showHamburgerBtn ? (
        <TouchableOpacity
          onPress={onHamburger}
          style={styles.iconBtn}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <FontAwesome5 name="bars" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 38 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.04)',
    zIndex: 20,
    backgroundColor: 'rgba(224,224,228,0.008)',
  },
  iconBtn: {
    padding: 8,
    minWidth: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Note: For native blur, use a library like @react-native-community/blur if you want true glassmorphism on iOS/Android. 