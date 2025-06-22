import type { SectionItem } from "@/components/account/SettingsSection";

type SettingsItemHandler = () => void | Promise<void>;

export const createAppSettingsItems = (
    handleNotifications: SettingsItemHandler
): SectionItem[] => [
    {
        icon: "notifications",
        title: "Notifications",
        onPress: handleNotifications,
    },
];

export const createSupportItems = (
    handleOpenContact: SettingsItemHandler,
    handleOpenTerms: SettingsItemHandler,
    handleOpenPrivacy: SettingsItemHandler
): SectionItem[] => [
    {
        icon: "mail-outline",
        title: "Contact Support",
        onPress: handleOpenContact,
    },
    {
        icon: "description",
        title: "Terms of Service",
        onPress: handleOpenTerms,
    },
    {
        icon: "privacy-tip",
        title: "Privacy Policy",
        onPress: handleOpenPrivacy,
    },
];

export const createAccountItems = (
    handleSubscription: SettingsItemHandler,
    handleDeleteAccount: SettingsItemHandler,
    handleLogout: SettingsItemHandler
): SectionItem[] => [
    {
        icon: "credit-card",
        title: "Subscription",
        onPress: handleSubscription,
    },
    {
        icon: "delete",
        title: "Delete Account",
        onPress: handleDeleteAccount,
    },
    {
        icon: "logout",
        title: "Logout",
        onPress: handleLogout,
    },
];
