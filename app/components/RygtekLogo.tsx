import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RygtekLogo({ small }: { small?: boolean }) {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.replace('/welcome')}
            activeOpacity={0.8}
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <Image
                source={require('@/assets/images/Rygtek-Logo.png')}
                style={small ? { width: 150, height: 150, resizeMode: 'contain' } : { width: 250, height: 250, resizeMode: 'contain' }}
            />
        </TouchableOpacity>
    );
} 