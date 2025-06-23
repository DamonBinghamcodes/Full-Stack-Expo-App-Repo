import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Disclaimer() {
    const router = useRouter();

    const handleAccept = () => {
        router.push("/onboarding"); // or next onboarding step
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
                        Disclaimer
                    </Text>
                    <Text style={{ fontSize: 16, color: "#222", marginBottom: 16 }}>
                        The information provided in this app is for general informational purposes only and is not intended as legal, financial, or professional advice. While we strive to ensure the accuracy and reliability of the information, Rygtek makes no warranties or guarantees, express or implied, regarding the completeness, accuracy, or reliability of any information provided.
                    </Text>
                    <Text style={{ fontSize: 16, color: "#222", marginBottom: 16 }}>
                        By using this app, you acknowledge and agree that Rygtek, its affiliates, directors, employees, or representatives shall not be liable for any errors, omissions, or any loss or damage resulting from the use of the app or its content. You are solely responsible for any actions you take based on the information provided.
                    </Text>
                    <Text style={{ fontSize: 16, color: "#222", marginBottom: 16 }}>
                        For specific advice or concerns, please consult with a qualified professional. Use of this app constitutes your acceptance of this disclaimer.
                    </Text>
                </View>
                <Button onPress={handleAccept}>I Agree & Continue</Button>
            </ScrollView>
        </SafeAreaView>
    );
} 