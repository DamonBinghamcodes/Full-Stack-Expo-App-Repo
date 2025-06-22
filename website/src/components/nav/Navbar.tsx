import { useRouter } from "next/router";
import RygtekLogo from "../brand/Rygtek-Logo";

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between container mx-auto absolute top-0 left-0 right-0 py-6  px-4">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <RygtekLogo />
            </div>

            <div className="flex gap-8 items-center">
                <button
                    className="font-bold text-xl cursor-pointer hover:scale-[1.05] transition-all text-primary"
                    onClick={() => router.push("/contact")}
                >
                    Support
                </button>

                <button
                    className="font-bold text-xl cursor-pointer hover:scale-[1.05] transition-all text-primary"
                    onClick={() => router.push("/policies/privacy")}
                >
                    Privacy
                </button>
            </div>
        </div>
    );
}
