import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text } from "react-native";

export default function SettingsItem({
    icon,
    title,
    onPress,
    isLoading,
}: {
    icon: keyof typeof MaterialIcons.glyphMap;
    title: string;
    onPress?: () => void;
    isLoading?: boolean;
}) {
    return (
        <Pressable
            className="flex-row items-center px-4 py-3 bg-white"
            onPress={onPress}
            disabled={isLoading}
        >
            <MaterialIcons name={icon} size={22} color="#4B5563" />

            <Text className="flex-1 ml-3 text-gray-700 text-base">
                {isLoading ? `${title}...` : title}
            </Text>

            <MaterialIcons name="chevron-right" size={18} color="#9CA3AF" />
        </Pressable>
    );
}
