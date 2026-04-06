import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutReveal from "@/components/AboutReveal";
import BentoSection from "@/components/BentoSection";
import StatsSection from "@/components/StatsSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white overflow-clip selection:bg-white selection:text-black">
      <Navbar />
      <SequenceScroll />
      <AboutReveal />
      <BentoSection />
      <StatsSection />
      <TestimonialSlider />
      <CTASection />
      <Footer />
    </main>
  );
}
