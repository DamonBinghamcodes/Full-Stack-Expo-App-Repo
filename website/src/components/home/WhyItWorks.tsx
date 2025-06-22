import { REASONS } from "@/config/data";
import { CheckIcon } from "../icons";

export default function WhyItWorks() {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-24 flex flex-col justify-center gap-16 items-center px-4">
                <h2 className="text-5xl font-bold text-center">How it works</h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-20">
                    <div className="flex-col gap-6 max-w-xl w-1/2">
                        <div className="flex flex-col gap-6 w-full">
                            {REASONS.map((reason) => (
                                <div
                                    key={reason.title}
                                    className="bg-white p-6 rounded-2xl shadow-sm flex gap-4 items-start"
                                >
                                    <CheckIcon />

                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {reason.title}
                                        </h3>

                                        <p className="text-gray-600">
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <img
                        src="/assets/how.png"
                        alt="Art Preview"
                        className="w-full md:w-1/3"
                    />
                </div>
            </div>
        </div>
    );
}
