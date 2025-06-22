import ProgressBar from "@/components/onboarding/ProgressBar";
import Button from "@/components/ui/Button";
import { ONBOARDING_QUESTIONS } from "@/contexts/OnboardingAnswersContext";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Introduction() {
    const router = useRouter();

    const handleStart = () => {
        router.push("/onboarding/1");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-4">
                <ProgressBar
                    currentStep={0}
                    totalSteps={ONBOARDING_QUESTIONS.length + 1}
                />

                <View className="flex-1 justify-center gap-4">
                    <Text className="text-3xl font-bold text-center text-black">
                        Let's personalize your experience
                    </Text>

                    <Text className="text-lg text-center text-black/75">
                        We'll ask you a few questions to customize the app for
                        you.
                    </Text>
                </View>

                <View className="mb-4">
                    <Button onPress={handleStart}>Get Started</Button>
                </View>
            </View>
        </SafeAreaView>
    );
}
