import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureSections } from "@/components/landing/FeatureSections";
import { ApprovalsSection, AnalyticsSection, MarketplaceSection, HowItWorksSection, TrustSection } from "@/components/landing/ShowcaseSections";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection, Footer } from "@/components/landing/CTAFooter";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureSections />
      <ApprovalsSection />
      <AnalyticsSection />
      <MarketplaceSection />
      <HowItWorksSection />
      <PricingSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </main>
  );
}
