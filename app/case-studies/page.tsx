import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import CaseStudiesGrid, { type CaseStudy } from "./CaseStudiesGrid";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Real AI Results",
  description:
    "Explore Susea.ai case studies: real AI agent deployments, consulting wins, and rapid builds across real estate, healthcare, fintech, legal, and more. Real problems. Real numbers.",
  path: "/case-studies",
});

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "real-estate-lead-pipeline",
    industry: "Real Estate",
    categories: ["ai-agents", "industry"],
    title: "Lead Qualification Pipeline",
    desc: "Automated lead vetting and classification for a national brokerage, significantly increasing conversion rates.",
    metric: "+40%",
    metricLabel: "Qualified Meetings",
    span: "md:col-span-8",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "healthcare-triage",
    industry: "Healthcare",
    categories: ["ai-agents", "industry"],
    title: "Autonomous Patient Triage",
    desc: "",
    metric: "73%",
    metricLabel: "No-shows cut by",
    span: "md:col-span-4",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "fintech-strategy",
    industry: "Fintech Scale-up",
    categories: ["consulting", "industry"],
    title: "AI Strategy for Legacy Pipelines",
    desc: "Optimized legacy data architecture for LLM readiness, enabling faster model deployment cycles.",
    metric: "24%",
    metricLabel: "Accuracy Increase",
    extra: "$210k/yr saved",
    span: "md:col-span-8",
    tagColor: "bg-tertiary-container/10 text-tertiary-container",
  },
  {
    id: "edtech-tutor",
    industry: "EdTech",
    categories: ["build", "industry"],
    title: "AI Tutor Architecture",
    desc: "",
    metric: "2.5x",
    metricLabel: "Student Engagement",
    span: "md:col-span-4",
    tagColor: "bg-tertiary-container/10 text-tertiary-container",
  },
  {
    id: "saas-marketplace",
    industry: "SaaS Marketplace",
    categories: ["build"],
    title: "Marketplace MVP Build",
    desc: "",
    metric: "4 Wks",
    metricLabel: "Launch Timeline",
    span: "md:col-span-4",
    tagColor: "bg-secondary-container/10 text-secondary-container",
  },
  {
    id: "voice-agents",
    industry: "Professional Services",
    categories: ["ai-agents", "industry"],
    title: "Enterprise Voice Agents",
    desc: "Deploying human-like voice agents to handle high-volume inbound customer queries across 12 timezones.",
    metric: "65%",
    metricLabel: "OPEX Reduction",
    span: "md:col-span-8",
    tagColor: "bg-secondary-container/10 text-secondary-container",
  },
  {
    id: "fintech-api-security",
    industry: "Fintech Security",
    categories: ["security", "industry"],
    title: "API Hardening & Testing",
    desc: "",
    metric: "99.9%",
    metricLabel: "Threat Reduction",
    span: "md:col-span-4",
    tagColor: "bg-outline/10 text-outline",
  },
  {
    id: "legal-contracts",
    industry: "Legal",
    categories: ["security", "industry"],
    title: "Contract Analysis Engine",
    desc: "",
    metric: "90%",
    metricLabel: "Faster Review Cycle",
    span: "md:col-span-4",
    tagColor: "bg-outline/10 text-outline",
  },
  {
    id: "healthtech-app",
    industry: "HealthTech",
    categories: ["build", "industry"],
    title: "Native AI Health App",
    desc: "",
    metric: "4.9★",
    metricLabel: "App Store Rating",
    span: "md:col-span-4",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "enterprise-governance",
    industry: "Global 2000",
    categories: ["consulting", "security"],
    title: "Enterprise AI Governance",
    desc: "",
    metric: "100%",
    metricLabel: "Regional Compliance",
    span: "md:col-span-4",
    tagColor: "bg-tertiary-container/10 text-tertiary-container",
  },
  {
    id: "fintech-security-automation",
    industry: "FinTech",
    categories: ["industry"],
    title: "Security Protocol Automation",
    desc: "",
    metric: "53%",
    metricLabel: "Less admin work",
    span: "md:col-span-4",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "hipaa-layer",
    industry: "Healthcare Diagnostic",
    categories: ["security", "industry"],
    title: "HIPAA Privacy Layer",
    desc: "",
    metric: "3 Wks",
    metricLabel: "Audit Ready In",
    span: "md:col-span-4",
    tagColor: "bg-secondary-container/10 text-secondary-container",
  },
];

const STATS = [
  { value: "53%", color: "text-primary", label: "Small business owners report significant efficiency improvements" },
  { value: "30-45%", color: "text-secondary", label: "Reduction in repetitive administrative tasks post-deployment" },
  { value: "2.5x", color: "text-tertiary", label: "Average return on investment within the first six months" },
];

const ITEM_LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Susea.ai Case Studies",
  description: "Real-world AI deployment outcomes across industries including healthcare, fintech, legal, real estate, and SaaS.",
  url: "https://susea.ai/case-studies",
  numberOfItems: CASE_STUDIES.length,
  itemListElement: CASE_STUDIES.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cs.title,
    description: cs.desc || `${cs.industry} — ${cs.metric} ${cs.metricLabel}`,
    url: `https://susea.ai/case-studies#${cs.id}`,
  })),
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-24">
      <JsonLd data={ITEM_LIST_SCHEMA} />

      {/* Hero */}
      <header className="px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold">
          Proven Outcomes
        </span>
        <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-none max-w-4xl mt-4 mb-6">
          Results,{" "}
          <br />
          <span className="signature-text-gradient">Not Promises.</span>
        </h1>
        <p className="font-body text-lg text-on-surface-variant max-w-xl mb-10">
          Real problems. Real solutions. Real numbers. Explore how we&apos;ve
          engineered efficiency for global enterprises and rapid-growth startups.
        </p>
      </header>

      {/* Interactive grid (client component handles filter state) */}
      <CaseStudiesGrid caseStudies={CASE_STUDIES} stats={STATS} />

      {/* CTA */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto rounded-xl signature-gradient p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/30 blur-[120px] rounded-full" />
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-8">
              Ready to Write Your
              <br />Own Case Study?
            </h2>
            <p className="font-body text-white/80 text-xl max-w-2xl mx-auto mb-12">
              Stop imagining the future. Start building it with precision-engineered AI solutions
              crafted for your specific business context.
            </p>
            <Link
              href="/contact"
              className="bg-white text-surface px-10 py-5 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all inline-block"
            >
              Start Your Project →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
