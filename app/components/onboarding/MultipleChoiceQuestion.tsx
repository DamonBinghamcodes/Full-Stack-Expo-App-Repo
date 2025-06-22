import { OnboardingQuestion } from "@/contexts/OnboardingAnswersContext";
import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../ui/Button";
import ProgressBar from "./ProgressBar";

type Props = {
    question: OnboardingQuestion;
    currentStep: number;
    totalSteps: number;
    selectedAnswer?: string;
    onSelect: (answer: string) => void;
    onNext: () => void;
    onBack: () => void;
};

export default function MultipleChoiceQuestion({
    question,
    currentStep,
    totalSteps,
    selectedAnswer,
    onSelect,
    onNext,
    onBack,
}: Props) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-4">
                <ProgressBar
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                />

                <View className="flex-1 justify-center gap-8">
                    <Text className="text-2xl font-bold text-center text-black">
                        {question.question}
                    </Text>

                    <View className="gap-4">
                        {question.options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => onSelect(option)}
                                className={clsx(
                                    "p-3 rounded-full border",
                                    selectedAnswer === option
                                        ? "border-primary bg-primary/10"
                                        : "border-gray-200"
                                )}
                            >
                                <Text
                                    className={clsx(
                                        "text-lg text-center",
                                        selectedAnswer === option
                                            ? "text-primary font-medium"
                                            : "text-gray-700"
                                    )}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="flex flex-col gap-4 mb-4">
                    <Button onPress={onNext} isDisabled={!selectedAnswer}>
                        {currentStep === totalSteps ? "Finish" : "Next"}
                    </Button>

                    <TouchableOpacity onPress={onBack}>
                        <Text className="text-md text-center text-black">
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
