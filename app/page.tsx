import HeroSection from "@/components/sections/home/HeroSection";
import TrustBar from "@/components/sections/home/TrustBar";
import ServicesBento from "@/components/sections/home/ServicesBento";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import HowItWorks from "@/components/sections/home/HowItWorks";
import StatsTestimonials from "@/components/sections/home/StatsTestimonials";
import CTABand from "@/components/sections/home/CTABand";
import LatestInsights from "@/components/sections/home/LatestInsights";
import TeamPreview from "@/components/sections/home/TeamPreview";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Susea.ai | Custom AI Agents & Professional AI Agent Repair",
  description:
    "We build reliable, autonomous AI agents and fix failing ones. Eliminate hallucinations and loops with production-ready AI agentic workflows.",
  path: "",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={WEBSITE_SCHEMA} />
      <HeroSection />
      <TrustBar />
      <ServicesBento />
      <IndustriesSection />
      <HowItWorks />
      <StatsTestimonials />
      <TeamPreview />
      <CTABand />
      <LatestInsights />
    </>
  );
}
