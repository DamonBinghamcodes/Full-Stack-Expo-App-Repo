import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useState } from "react";

// Define the types for our questions and answers
export type OnboardingQuestion = {
    id: "experience" | "goal" | "interest";
    question: string;
    options: string[];
};

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
    {
        id: "experience",
        question: "What is your experience level with programming?",
        options: ["Beginner", "Intermediate", "Advanced"],
    },
    {
        id: "goal",
        question: "What is your primary goal with our app?",
        options: ["Learn to Code", "Build Projects", "Find Work"],
    },
    {
        id: "interest",
        question: "Which area interests you the most?",
        options: ["Web Development", "Mobile Apps", "Data Science"],
    },
];

type OnboardingAnswers = {
    [K in OnboardingQuestion["id"]]?: string;
};

type OnboardingAnswersContextType = {
    answers: OnboardingAnswers;
    setAnswer: (questionId: OnboardingQuestion["id"], answer: string) => void;
    clearAnswers: () => void;
};

const STORAGE_KEY = "onboardingAnswers";

export const OnboardingAnswersContext = createContext<
    OnboardingAnswersContextType | undefined
>(undefined);

export function OnboardingAnswersProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [answers, setAnswers] = useState<OnboardingAnswers>({});

    const setAnswer = async (
        questionId: OnboardingQuestion["id"],
        answer: string
    ) => {
        const newAnswers = { ...answers, [questionId]: answer };
        setAnswers(newAnswers);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
        } catch (error) {
            console.error("Error saving onboarding answer:", error);
        }
    };

    const clearAnswers = async () => {
        setAnswers({});
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Error clearing onboarding answers:", error);
        }
    };

    return (
        <OnboardingAnswersContext.Provider
            value={{ answers, setAnswer, clearAnswers }}
        >
            {children}
        </OnboardingAnswersContext.Provider>
    );
}
