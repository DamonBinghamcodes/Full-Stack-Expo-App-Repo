import { ThemedText as Text } from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View } from "react-native";
import SettingsItem from "./SettingsItem";

type SettingsItemProps = {
    icon: keyof typeof MaterialIcons.glyphMap;
    title: string;
    isLoading?: boolean;
    onPress?: () => void;
};

export type SectionItem = SettingsItemProps;

type SettingsSectionProps = {
    title: string;
    items: SectionItem[];
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => (
    <View className="flex flex-col gap-2">
        <Text
            className="text-lg font-bold"
            darkColor="black"
            lightColor="black"
        >
            {title}
        </Text>

        <View className="bg-white rounded-lg overflow-hidden">
            {items.map((item) => (
                <SettingsItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    onPress={item.onPress}
                />
            ))}
        </View>
    </View>
);

export default SettingsSection;
