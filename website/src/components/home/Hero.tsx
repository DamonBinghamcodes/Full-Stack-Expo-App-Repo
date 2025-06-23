import AppleButton from "../ui/AppleButton";
import GoogleButton from "../ui/GoogleButton";

export default function Hero() {
    return (
        <div className="py-[200px] pt-24">
            <div className="flex flex-col md:flex-row items-center justify-between container mx-auto px-4 gap-16 md:gap-10">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-black">
                        THE RIGGER IN YOUR POCKET
                    </h1>

                    <p className="text-xl font-semibold text-black/80 mb-2">
                        Precision. Safety. Innovation.
                    </p>

                    <p className="text-black/90">
                        Professional rigging calculations and safety tools in one powerful mobile app.
                    </p>

                    <div className="flex gap-4 items-center">
                        <AppleButton
                            onClick={() =>
                                window.open(
                                    "https://apps.apple.com/app/rygtek",
                                    "_blank"
                                )
                            }
                        >
                            Get Started
                        </AppleButton>
                        <GoogleButton />
                    </div>
                </div>

                <img
                    src="/assets/rygtek-screenshot.png"
                    alt="Rygtek App Preview"
                    className="w-full md:w-1/4"
                />
            </div>
        </div>
    );
}
