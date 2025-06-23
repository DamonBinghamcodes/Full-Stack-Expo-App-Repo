import Svg, { Path } from "react-native-svg";

export function LinkedInIcon({ color = "#fff", size = 28 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4.98 3.5C3.87 3.5 3 4.38 3 5.5c0 1.11.87 2 1.98 2h.02c1.1 0 1.98-.89 1.98-2-.01-1.12-.88-2-1.98-2zM3.5 8.5h2.98V20H3.5V8.5zM8.5 8.5h2.86v1.57h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V20h-3v-5.09c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68V20h-3V8.5z" stroke={color} strokeWidth="2"/>
    </Svg>
  );
} 