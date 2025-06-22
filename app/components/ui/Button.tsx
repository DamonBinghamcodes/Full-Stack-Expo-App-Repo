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
    return (
        <Pressable
            className={clsx(
                "w-full h-14 rounded-full flex flex-row gap-3 items-center justify-center",
                variant === "primary" && "bg-primary",
                variant === "secondary" && "bg-secondary border border-primary",
                (isDisabled || isLoading) && "opacity-50",
                className
            )}
            onPress={onPress}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={variant === "secondary" ? "primary" : "secondary"}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === "left" && icon}

                    <Text
                        className={clsx(
                            "text-base font-medium",
                            variant === "secondary" && "text-black",
                            variant === "primary" && "text-white"
                        )}
                    >
                        {children}
                    </Text>

                    {icon && iconPosition === "right" && icon}
                </>
            )}
        </Pressable>
    );
}
