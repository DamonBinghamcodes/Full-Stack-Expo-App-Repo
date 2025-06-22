import { FEATURES } from "@/config/data";

export default function Features() {
    const FeatureCard = ({ feature }: { feature: (typeof FEATURES)[0] }) => (
        <div
            key={feature.title}
            className="bg-gray-50 border border-green-100 p-4 rounded-2xl flex flex-col gap-4 relative"
        >
            <div className="flex items-center gap-2">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-xl font-bold">{feature.title}</h3>
            </div>

            <p className="text-sm text-gray-500">{feature.description}</p>

            {!feature.available && (
                <div className="flex items-center gap-2 absolute -top-4 -right-4 bg-green-100 text-green-800 border border-[#4B5119] px-2 py-1 rounded-full">
                    <span className="text-md">🔒</span>
                    <p className="text-xs text-gray-500 font-semibold">
                        Coming soon
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-primary">
            <div className="container  mx-auto px-4 py-24">
                <h2 className="text-5xl font-bold text-center mb-10 text-white">
                    Features
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
