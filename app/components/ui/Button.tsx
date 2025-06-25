import clsx from "clsx";
import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
    icon?: ReactNode;
    variant?: "primary" | "secondary";
    isLoading?: boolean;
    children: ReactNode;
    className?: string;
    isDisabled?: boolean;
    iconPosition?: "left" | "right";
    onPress: () => void;
};

export default function Button({
    icon,
    variant = "primary",
    isLoading = false,
    children,
    isDisabled,
    iconPosition = "left",
    className,
    onPress,
}: Props) {
    const bgColor = variant === "primary" ? "#E53935" : "#222";
    const textColor = variant === "primary" ? "#fff" : "#fff";
    return (
        <Pressable
            style={({ pressed }) => ([
                {
                    width: '100%',
                    height: 56,
                    borderRadius: 16,
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: bgColor,
                    opacity: isDisabled || isLoading ? 0.5 : (pressed ? 0.8 : 1),
                    shadowColor: variant === "primary" ? "#E53935" : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    marginVertical: 8,
                },
            ])}
            onPress={onPress}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={variant === "secondary" ? "#fff" : "#fff"}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === "left" && icon}

                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: textColor,
                            letterSpacing: 0.5,
                        }}
                    >
                        {children}
                    </Text>

                    {icon && iconPosition === "right" && icon}
                </>
            )}
        </Pressable>
    );
}
