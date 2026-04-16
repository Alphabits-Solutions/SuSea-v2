import type { Metadata } from "next";
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
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Susea.ai — The Digital Architect for Enterprise AI",
  description:
    "We fix broken AI agents, build new ones, ship software, and consult teams — so your business runs better, faster, and smarter. AI agency serving USA & Europe.",
  alternates: { canonical: "https://susea.ai" },
  openGraph: {
    title: "Susea.ai — The Digital Architect for Enterprise AI",
    description:
      "We fix broken AI agents, build new ones, ship software, and consult teams. AI agency in USA & Europe.",
    url: "https://susea.ai",
    type: "website",
  },
};

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
