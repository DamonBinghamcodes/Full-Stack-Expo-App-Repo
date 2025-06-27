import clsx from "clsx";
import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native";

type Props = {
    icon?: ReactNode;
    variant?: "primary" | "secondary";
    isLoading?: boolean;
    children: ReactNode;
    className?: string;
    isDisabled?: boolean;
    iconPosition?: "left" | "right";
    style?: ViewStyle;
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
    ...props
}: Props) {
    const bgColor = variant === "primary" ? "#e31e24" : "#2a2a2a";
    const textColor = variant === "primary" ? "#fff" : "#fff";
    const borderColor = variant === "secondary" ? "#444" : "transparent";
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
                    borderWidth: variant === "secondary" ? 1 : 0,
                    borderColor: borderColor,
                    opacity: isDisabled || isLoading ? 0.5 : (pressed ? 0.9 : 1),
                    shadowColor: variant === "primary" ? "#e31e24" : "#000",
                    shadowOffset: { width: 0, height: variant === "primary" ? 4 : 2 },
                    shadowOpacity: variant === "primary" ? 0.3 : 0.1,
                    shadowRadius: variant === "primary" ? 12 : 6,
                    elevation: variant === "primary" ? 8 : 4,
                    marginVertical: 4,
                },
                props.style,
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
