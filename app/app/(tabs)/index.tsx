import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to main menu
        router.replace('/screens/main-menu' as any);
    }, []);

    return null; // This screen will redirect immediately
}
