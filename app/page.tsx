import AnchorNav from "@/components/nav/AnchorNav";
import Hero from "@/components/hero/Hero";
import TechBadges from "@/components/sections/TechBadges";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Demo from "@/components/sections/Demo";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <AnchorNav />
      <main id="content">
        <Hero />
        <TechBadges />
        <Features />
        <HowItWorks />
        <Demo />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
