import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import { privacyContent } from "@/config/policies/privacy";
import ReactMarkdown from "react-markdown";

export default function Privacy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl my-20 prose prose-slate pt-24">
                <ReactMarkdown>{privacyContent}</ReactMarkdown>
            </div>

            <Footer />
        </div>
    );
}
