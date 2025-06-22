import AppleButton from "../ui/AppleButton";
import GoogleButton from "../ui/GoogleButton";

export default function Hero() {
    return (
        <div className="py-[200px]">
            <div className="flex flex-col md:flex-row items-center justify-between container mx-auto px-4 gap-16 md:gap-10">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-black">
                        The Rigger In Your Pocket
                    </h1>

                    <p className="text-black/90">
                        Select from a wide range of templates and styles to
                        create X in Y with Z! Add in an customisation that you
                        want!
                    </p>

                    <div className="flex gap-4 items-center">
                        <AppleButton
                            onClick={() =>
                                window.open(
                                    "https://apps.apple.com/au/app/petraits/id6745168293",
                                    "_blank"
                                )
                            }
                        />
                        <GoogleButton />
                    </div>
                </div>

                <img
                    src="/assets/hero.png"
                    alt="Hero"
                    className="w-full md:w-1/4"
                />
            </div>
        </div>
    );
}
