// import {
//     OpenSans_400Regular,
//     OpenSans_600SemiBold,
//     OpenSans_700Bold,
//     useFonts,
// } from "@expo-google-fonts/open-sans";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps;

export function ThemedText({
    style,
    className = "",
    ...rest
}: ThemedTextProps) {
    // const [loaded] = useFonts({
    //     OpenSans_400Regular,
    //     OpenSans_600SemiBold,
    //     OpenSans_700Bold,
    // });

    // Map Tailwind font weights to OpenSans fonts
    let fontFamily = "OpenSans_400Regular";

    if (className?.includes("font-bold")) {
        fontFamily = "OpenSans_700Bold";
    } else if (className?.includes("font-semibold")) {
        fontFamily = "OpenSans_600SemiBold";
    }

    return (
        <Text style={[{ fontFamily }, style]} className={className} {...rest} />
    );
}
