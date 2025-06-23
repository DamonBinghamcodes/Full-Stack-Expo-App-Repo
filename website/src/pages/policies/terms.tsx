import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import { termsContent } from "@/config/policies/terms";
import ReactMarkdown from "react-markdown";

export default function Terms() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl my-20 prose prose-slate pt-24">
                <ReactMarkdown>{termsContent}</ReactMarkdown>
            </div>

            <Footer />
        </div>
    );
}
