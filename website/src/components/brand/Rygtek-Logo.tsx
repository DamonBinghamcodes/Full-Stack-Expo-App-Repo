type Props = {
    width?: number;
    height?: number;
};

export default function RygtekLogo({ width = 150, height = 100 }: Props) {
    return (
        <div className="flex items-center">
            <img src="/assets/Rygtek-Logo.png" alt="Rygtek" width={width} height={height} />
        </div>
    );
} 