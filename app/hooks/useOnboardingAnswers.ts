import { OnboardingAnswersContext } from "@/contexts/OnboardingAnswersContext";
import { useContext } from "react";

export function useOnboardingAnswers() {
    const context = useContext(OnboardingAnswersContext);

    if (context === undefined) {
        throw new Error(
            "useOnboardingAnswers must be used within an OnboardingAnswersProvider"
        );
    }
    return context;
}
