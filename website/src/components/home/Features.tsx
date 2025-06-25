import { FEATURES } from "@/config/data";
import { 
    FaWeightHanging,
    FaDumbbell, 
    FaRuler, 
    FaBox, 
    FaClipboardList, 
    FaExclamationTriangle, 
    FaWifi, 
    FaUser 
} from "react-icons/fa";

const iconMap = {
    "weight-hanging": FaWeightHanging,
    "ruler-combined": FaRuler,
    "boxes-stacked": FaBox,
    "clipboard-list": FaClipboardList,
    "person-rays": FaUser,
    "triangle-exclamation": FaExclamationTriangle,
    "wifi": FaWifi,
    "box": FaBox,
};

function FallbackIcon() {
    return <span className="text-2xl text-red-500">?</span>;
}

export default function Features() {
    const FeatureCard = ({ feature }: { feature: (typeof FEATURES)[0] & { premium?: boolean } }) => {
        const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
        return (
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col gap-4 relative group">
                {feature.premium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow">
                        <span className="mr-1">⭐</span> Premium
                    </div>
                )}
                <div className="flex items-center justify-center mb-2">
                    <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary/20 transition-colors duration-300">
                        {IconComponent ? <IconComponent size={32} color="red" /> : <FallbackIcon />}
            </div>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 text-center">{feature.title}</h3>
                <p className="text-gray-500 text-center">{feature.description}</p>
        </div>
    );
    };

    return (
        <div className="bg-primary">
            <div className="container mx-auto px-4 py-24">
                <h2 className="text-5xl font-bold text-center mb-10 text-white">
                    Professional Rigging Calculations & Safety Tools
                </h2>
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {FEATURES.map((feature) => (
                            <FeatureCard
                                key={feature.title}
                                feature={feature}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
