import AppleButton from "../ui/AppleButton";
import GoogleButton from "../ui/GoogleButton";

export default function FinalCta() {
    return (
        <div className="flex flex-col gap-6 container mx-auto px-4 py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
                Ready to create X in Y with Z?
            </h1>

            <p className="text-black/90 text-center text-lg md:text-2xl w-3/4 mx-auto">
                Get started creating X in Y with Z in seconds! Download, share
                and print your X in Y with Z in seconds!
            </p>

            <div className="flex gap-4 items-center justify-center">
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
    );
}
