import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
    const router = useRouter();

    const handleNext = () => {
        router.push("/onboarding/introduction");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-4">
                <View className="flex-1 justify-center gap-4">
                    <Text className="text-3xl font-bold text-center text-black">
                        Hi, welcome to your app!
                    </Text>

                    <Text className="text-lg text-center text-black/75">
                        This is the first step in your onboarding flow.
                    </Text>
                </View>

                <View className="mb-4">
                    <Button onPress={handleNext}>Let's go</Button>
                </View>
            </View>
        </SafeAreaView>
    );
}
