import Features from "@/components/home/Features";
import FinalCta from "@/components/home/FinalCta";
import Hero from "@/components/home/Hero";
import WhyItWorks from "@/components/home/WhyItWorks";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col relative">
            <Navbar />

            <Hero />

            <Features />

            <WhyItWorks />

            <FinalCta />

            <Footer />
        </div>
    );
}
