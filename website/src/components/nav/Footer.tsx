import { useRouter } from "next/router";
import RygtekLogo from "../brand/Rygtek-Logo";
import { FaInstagram, FaYoutube, FaLinkedin, FaXTwitter } from "react-icons/fa6";

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

                {/* Social Icons */}
                <div className="flex gap-6 mb-2">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram size={28} className="hover:text-pink-500 transition-colors" />
                    </a>
                    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <FaYoutube size={28} className="hover:text-red-600 transition-colors" />
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin size={28} className="hover:text-blue-700 transition-colors" />
                    </a>
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                        <FaXTwitter size={28} className="hover:text-black transition-colors" />
                    </a>
                </div>

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
