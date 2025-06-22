import { useOnboarding } from "@/hooks/useOnboarding";
import { router } from "expo-router";
import { Dimensions, Image, ImageSourcePropType, View } from "react-native";
import ProgressBar from "./ProgressBar";

type OnboardingScreenProps = {
    img: ImageSourcePropType;
    imgHeight: number;
    title: string;
    isLastScreen?: boolean;
    onComplete?: () => void;
    nextScreen?: string;
    step: number;
};

export default function OnboardingScreen({
    img,
    imgHeight,
    title,
    isLastScreen = false,
    onComplete,
    nextScreen,
    step,
}: OnboardingScreenProps) {
    const screenHeight = Dimensions.get("window").height;
    const { totalSteps, setCurrentStep } = useOnboarding();

    const handleNext = () => {
        setCurrentStep(step + 1);

        if (isLastScreen && onComplete) {
            onComplete();
        } else if (nextScreen) {
            router.push(`/onboarding/${nextScreen}`);
        }
    };

    return (
        <View>
            <ProgressBar currentStep={step} totalSteps={totalSteps} />

            <Image
                source={img}
                style={{
                    width: "100%",
                    height: screenHeight * 0.5,
                    resizeMode: "cover",
                }}
            />
        </View>
    );
}
