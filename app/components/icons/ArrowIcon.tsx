import Svg, { Path } from "react-native-svg";

export function ArrowIcon() {
    return (
        <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <Path
                d="M1.5 8.5H15.5M15.5 8.5L8.5 1.5M15.5 8.5L8.5 15.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
