import Svg, { Path } from "react-native-svg";

export function YouTubeIcon({ color = "#fff", size = 28 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06A2.75 2.75 0 0 0 2.2 8.001C2.14 9.66 2.14 12 2.14 12s0 2.34.06 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94C21.86 14.34 21.86 12 21.86 12s0-2.34-.06-3.999z" stroke={color} strokeWidth="2"/>
      <Path d="M10 15.5V8.5L16 12l-6 3.5z" fill={color}/>
    </Svg>
  );
} 