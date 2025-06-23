import { useRouter } from "next/router";
import RygtekLogo from "../brand/Rygtek-Logo";

export default function Footer() {
    const router = useRouter();
    const year = new Date().getFullYear();

    return (
        <div className="bg-white">
            <div className="container mx-auto py-24 flex flex-col items-center gap-10">
                <RygtekLogo width={150} height={100} />

                <p className="text-black/90 text-center text-md w-3/4 mx-auto">
                    Copyright © {year} Rygtek. All rights reserved.
                </p>

                <div className="flex gap-4">
                    <a
                        href="/policies/privacy"
                        onClick={() => router.push("/policies/privacy")}
                    >
                        Privacy Policy
                    </a>

                    <a
                        href="/policies/terms"
                        onClick={() => router.push("/policies/terms")}
                    >
                        Terms of Service
                    </a>

                    <a href="/contact" onClick={() => router.push("/contact")}>
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
