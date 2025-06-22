import { View } from "react-native";

type ProgressBarProps = {
    currentStep: number;
    totalSteps: number;
};

export default function ProgressBar({
    currentStep,
    totalSteps,
}: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <View className="mx-auto h-3 w-[80%] bg-gray-200 rounded-full">
            <View
                className="h-full bg-primary rounded-full"
                style={{
                    width: `${progress}%`,
                }}
            />
        </View>
    );
}
