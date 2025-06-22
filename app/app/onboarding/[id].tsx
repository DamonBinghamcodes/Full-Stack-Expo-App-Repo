import { useSaveOnboardingAnswers } from "@/api/onboarding";
import MultipleChoiceQuestion from "@/components/onboarding/MultipleChoiceQuestion";
import { ONBOARDING_QUESTIONS } from "@/contexts/OnboardingAnswersContext";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useOnboardingAnswers } from "@/hooks/useOnboardingAnswers";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Question() {
    const router = useRouter();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { answers, setAnswer } = useOnboardingAnswers();
    const { setIsOnboarded } = useOnboarding();
    const { mutateAsync: saveAnswers } = useSaveOnboardingAnswers();

    const currentQuestionIndex = parseInt(id) - 1;
    const question = ONBOARDING_QUESTIONS[currentQuestionIndex];
    const selectedAnswer = answers[question?.id];

    useEffect(() => {
        if (!question) {
            // Invalid question index, redirect to start
            router.replace("/onboarding");
        }
    }, [question, router]);

    const handleNext = async () => {
        if (currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1) {
            // This is the last question
            await setIsOnboarded(true);

            // Save answers to database
            await saveAnswers({
                experience: answers.experience || "",
                goal: answers.goal || "",
                interest: answers.interest || "",
            });

            router.replace("/(tabs)");
        } else {
            // Move to next question
            router.push(`/onboarding/${currentQuestionIndex + 2}`);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex === 0) {
            // If we're at the first question, go back to introduction
            router.back();
        } else {
            // Go back to previous screen
            router.back();
        }
    };

    if (!question) {
        return null;
    }

    return (
        <MultipleChoiceQuestion
            question={question}
            currentStep={currentQuestionIndex + 1}
            totalSteps={ONBOARDING_QUESTIONS.length}
            selectedAnswer={selectedAnswer}
            onSelect={(answer) => setAnswer(question.id, answer)}
            onNext={handleNext}
            onBack={handleBack}
        />
    );
}
