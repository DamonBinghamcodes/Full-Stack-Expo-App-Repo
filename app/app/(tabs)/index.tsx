import { useOnboarding } from "@/hooks/useOnboarding";
import { authClient } from "@/lib/auth-client";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
    const { data: session } = authClient.useSession();
    const { isOnboarded } = useOnboarding();

    return (
        <SafeAreaView
            className="flex-1 justify-center items-center gap-4"
            edges={["top"]}
        >
            <Text className="text-2xl font-bold text-center text-black">
                Hello, {session?.user?.name || "User"}
            </Text>

            <Text className="text-lg text-center text-black px-12">
                You are now authenticated and onboarded! Has completed
                onboarding:{" "}
                <Text className="font-bold capitalize">
                    {isOnboarded.toString()}
                </Text>
            </Text>
        </SafeAreaView>
    );
}
