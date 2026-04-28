import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs } from "@/lib/metadata";
import ScorecardTool from "./ScorecardTool";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Readiness Scorecard — CTO & SMB Assessment | Susea.ai",
  description:
    "Tailored AI readiness assessment for CTOs and SMB owners. Score yourself across Business Process, Data & Technology, Team & Talent, and Budget & ROI. Two specialised paths. Results in under 4 minutes.",
  path: "/resources/ai-readiness-scorecard",
});

const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Readiness Scorecard — Susea.ai",
  url: "https://susea.ai/resources/ai-readiness-scorecard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A role-tailored AI readiness assessment for CTOs (20 questions) and SMB owners (16 questions) across four critical dimensions: Business Process, Data & Infrastructure, Team & Talent, and Budget & ROI.",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "CTO/Technical Leader path: 20 questions",
    "SMB Owner/Founder path: 16 questions",
    "Scored across 4 dimensions: Process, Data, Team, Budget",
    "Email-gated personalised results",
    "Category-level score breakdown",
    "Priority action recommendations",
    "Readiness tier classification",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "CTOs, COOs, technical leaders, SMB founders, business owners considering AI investment",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I know if my company is ready for AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Organisational AI readiness depends on four key dimensions: (1) Business Process — are your workflows documented and your automation opportunities mapped? (2) Data & Technology — do you have quality data, cloud infrastructure, and API connectivity? (3) Team & Talent — does your team have AI skills and leadership buy-in? (4) Budget & ROI — do you have defined success metrics and allocated budget? A low score in any one dimension can block a successful AI deployment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the CTO and SMB AI readiness paths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CTO/Technical Leader path (20 questions) goes deep on data architecture, API maturity, cloud infrastructure, ML experience, compliance capability, and ROI modelling. The SMB Owner path (16 questions) focuses on process documentation, tool stack integration, team comfort with technology, and budget clarity. Both paths score across the same four dimensions but with language and benchmarks appropriate for each audience.",
      },
    },
    {
      "@type": "Question",
      name: "What does an AI readiness score mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI readiness score of 80+ (AI-Ready) means your organisation has the foundations to deploy AI now. 60–79 (Approaching Ready) means strong foundations with a few specific gaps to address. 40–59 (Foundational Work Needed) means your AI ambitions are ahead of your infrastructure. Below 40 (Not Yet Ready) means significant gaps across multiple dimensions that need addressing before any AI investment will succeed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most important factor for AI project success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The single strongest predictor of AI project success is data quality. AI amplifies data quality issues — it does not fix them. Organisations with clean, centralised, well-labelled data in a modern architecture consistently outperform those with siloed or inconsistent data, regardless of how capable their AI models are. Team leadership alignment and defined ROI metrics are the second and third most important factors.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to become AI-ready?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Organisations scoring 60+ on the AI Readiness Scorecard can typically deploy a focused AI pilot in 4–8 weeks. Those scoring 40–60 need 2–4 months of foundational work (data consolidation, process documentation, or team training) before a pilot will succeed. Scores below 40 typically indicate 3–6 months of preparation is needed — though many gaps can be addressed in parallel.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Free Tools", url: "https://susea.ai/resources/free-tools" },
  { name: "AI Readiness Scorecard", url: "https://susea.ai/resources/ai-readiness-scorecard" },
]);

export default function ScorecardPage() {
  return (
    <>
      <JsonLd data={APP_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <ScorecardTool />
    </>
  );
}
