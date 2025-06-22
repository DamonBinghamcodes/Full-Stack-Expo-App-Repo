import { useRouter } from "next/router";
import Logo from "../brand/Logo";

export default function Footer() {
    const router = useRouter();
    const year = new Date().getFullYear();

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-24 flex flex-col items-center gap-10">
                <Logo />

                <p className="text-black/90 text-center text-md w-3/4 mx-auto">
                    Copyright © {year} App Name. All rights reserved.
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
