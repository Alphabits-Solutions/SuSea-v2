import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs } from "@/lib/metadata";
import ReportForm from "./ReportForm";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Readiness Report Template — 14-Page PDF | Susea.ai",
  description:
    "Download a real consulting deliverable showing what a professional AI readiness assessment looks like. 14 pages covering readiness scoring, use case matrix, implementation roadmap, and ROI projections. Free, instant access.",
  path: "/resources/ai-readiness-report",
});

const REPORT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "AI Readiness Report Template — Susea.ai",
  url: "https://susea.ai/resources/ai-readiness-report",
  description:
    "A real consulting deliverable — the same 14-page AI readiness report format Susea.ai delivers to enterprise clients after a readiness assessment. Covers executive summary, 4-dimension deep dives, use case matrix, 3-phase implementation roadmap, and investment tiers.",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  educationalLevel: "professional",
  isAccessibleForFree: true,
  inLanguage: "en-US",
  learningResourceType: "Report",
  teaches: [
    "AI readiness assessment methodology",
    "Business process automation opportunities",
    "AI use case prioritisation",
    "Implementation roadmap planning",
    "AI ROI calculation",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "CTOs, COOs, SMB founders, enterprise leaders evaluating AI investment",
  },
  numberOfPages: 14,
};

const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free AI Readiness Report Download — Susea.ai",
  url: "https://susea.ai/resources/ai-readiness-report",
  description:
    "Download page for the free Susea.ai AI Readiness Report Template — a 14-page professional consulting deliverable covering AI readiness scoring, use case prioritisation, and implementation roadmap.",
  mainEntity: {
    "@type": "LearningResource",
    name: "AI Readiness Report Template",
    numberOfPages: 14,
    isAccessibleForFree: true,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".hero-sub"],
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI readiness assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI readiness assessment evaluates an organisation's ability to successfully implement and scale AI across four dimensions: business process maturity, data and technology infrastructure, team capability, and budget alignment. The output is a scored report with prioritised recommendations and an implementation roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "What does the AI Readiness Report template include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 14-page template includes: an executive summary with overall readiness score, deep-dive findings across Business Process, Data & Technology, Team, and Budget dimensions, an AI Use Case Prioritisation Matrix with 6 evaluated use cases, a 3-phase implementation roadmap, investment estimates across Starter/Growth/Enterprise tiers, and real ROI calculations.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the AI Readiness Report for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI Readiness Report is designed for CTOs, COOs, SMB founders, and enterprise leaders who need to evaluate their organisation's AI readiness before committing to an AI investment. It can be used as a benchmark, shared with a leadership team, or used to brief an AI agency.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an AI readiness assessment cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional AI readiness assessments from consultancies typically cost $5,000–$25,000. The Susea.ai AI Readiness Report Template shows the exact format and depth of a real assessment deliverable — for free. A full custom assessment with Susea.ai starts from a free 20-minute strategy call.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Free Tools", url: "https://susea.ai/resources/free-tools" },
  { name: "AI Readiness Report", url: "https://susea.ai/resources/ai-readiness-report" },
]);

export default function ReportPage() {
  return (
    <>
      <JsonLd data={REPORT_SCHEMA} />
      <JsonLd data={WEBPAGE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <ReportForm />
    </>
  );
}
