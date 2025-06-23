import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import { useState } from "react";

export default function Contact() {
    const [isCopied, setIsCopied] = useState(false);

    const email = "yourapp@email.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="container mx-auto py-24 mt-24 flex flex-col items-center gap-10 flex-grow">
                <h1 className="text-4xl font-bold text-center">Contact Us</h1>

                <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-2xl mx-auto flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">
                        If you have any questions
                    </h2>

                    <p className="text-gray-600">
                        We're here to help! Please reach out to us via email.
                    </p>

                    <div className="flex items-center gap-2 bg-white py-2 px-4 rounded-lg mt-2">
                        <h3 className="text-lg font-semibold">
                            <a onClick={handleCopyEmail}>{email}</a>
                        </h3>

                        <button
                            onClick={handleCopyEmail}
                            className="bg-primary text-white px-4 py-2 rounded-lg font-bold ml-auto cursor-pointer"
                        >
                            {isCopied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
