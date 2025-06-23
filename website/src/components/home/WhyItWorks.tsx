import { REASONS } from "@/config/data";
import { CheckIcon } from "../icons";

export default function WhyItWorks() {
    return (
        <div className="bg-white-100">
            <div className="container mx-auto py-24 flex flex-col justify-center gap-16 items-center px-2 sm:px-4">
                <h2 className="text-xl font-semibold text-center mb-2 text-primary">How It Works</h2>
                <h2 className="text-5xl font-bold text-center mb-4">From Download to Safe Lifting</h2>
                <p className="text-lg text-center text-gray-600 max-w-2xl mb-10">
                    Rygtek puts the power of professional rigging calculations, safety alerts, and compliance tools in your pocket. Here's how you get from download to safe, smart lifting in just a few steps:
                </p>
                <div className="w-full flex flex-col items-center justify-center gap-10">
                    <div className="w-full max-w-2xl flex flex-col gap-6 mb-10">
                        {REASONS.map((reason, idx) => (
                            <div
                                key={reason.title}
                                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-row items-center gap-6 text-left border border-gray-100 relative min-h-[120px]"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <div className="bg-primary/10 rounded-full p-3">
                                        <span className="text-3xl font-extrabold text-red-600">{idx + 1}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-extrabold mb-2 text-gray-900">{reason.title}</h3>
                                    <p className="text-gray-600 text-base">{reason.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <img
                        src="/assets/rygtek-screenshot2.png"
                        alt="Rygtek App Interface"
                        className="w-full max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-lg mt-4"
                        style={{ objectFit: 'contain', border: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
}

