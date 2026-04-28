import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs } from "@/lib/metadata";
import DiagnosticTool from "./DiagnosticTool";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Agent Diagnostic — Health Score in 3 Minutes | Susea.ai",
  description:
    "Is your AI agent production-ready? Answer 20 questions across hallucinations, loop errors, token cost, security, scalability, and observability. Get an instant health score — free, no signup required.",
  path: "/resources/ai-agent-diagnostic",
});

const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Agent Diagnostic — Susea.ai",
  url: "https://susea.ai/resources/ai-agent-diagnostic",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A 20-question diagnostic tool that scores your AI agent's production readiness across 6 critical categories: hallucinations, loop errors, token cost, security, scalability, and observability.",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "20 targeted diagnostic questions across 6 categories",
    "Instant AI agent health score (0–100)",
    "Per-category risk breakdown",
    "Flagged issues with severity ratings (Critical / Warning)",
    "Actionable recommendations",
    "Email-delivered full report",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "AI engineers, CTOs, product teams building AI agents",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI agent hallucination and why does it matter in production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agent hallucination occurs when the model returns confidently wrong or fabricated information — inventing facts, citations, API responses, or decisions it presents as true. Without output validation and guardrails, hallucinations propagate through downstream workflows causing real business damage, incorrect decisions, and loss of user trust.",
      },
    },
    {
      "@type": "Question",
      name: "What causes AI agent infinite loops?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agent infinite loops occur when an agent gets stuck calling the same tool or step repeatedly without completing. This typically happens when no maximum iteration limits are defined. Without hard limits, a single misbehaving request can loop thousands of times, consuming tokens and crashing your system.",
      },
    },
    {
      "@type": "Question",
      name: "How do I control AI API costs from runaway agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Control AI API costs by implementing real-time usage monitoring with budget alerts, setting per-request token budgets and hard loop limits, regularly auditing system prompts for bloat, and configuring cost anomaly dashboards. Without these controls, a single misbehaving session can generate thousands of dollars in API charges.",
      },
    },
    {
      "@type": "Question",
      name: "What is prompt injection in AI agents and how do I prevent it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prompt injection is when a malicious user tricks your AI agent into ignoring its system instructions or leaking sensitive data via a crafted input message. Prevention requires input sanitisation, system prompt hardening with strict role definitions, output validation, and not exposing raw system prompts to users.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make an AI agent production-ready?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A production-ready AI agent requires: (1) output validation and guardrails against hallucinations, (2) hard iteration limits to prevent infinite loops, (3) real-time cost monitoring with alerts, (4) least-privilege tool access, (5) rate limiting on endpoints, (6) structured logging and tracing for every run, and (7) fallback logic for LLM provider outages.",
      },
    },
    {
      "@type": "Question",
      name: "What observability does an AI agent need in production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agents in production need: structured logs with trace IDs for every run, real-time error rate and latency alerting, token usage dashboards, cost-per-request tracking, and the ability to reproduce any failure from logs alone. Without full observability, debugging production failures is nearly impossible.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Free Tools", url: "https://susea.ai/resources/free-tools" },
  { name: "AI Agent Diagnostic", url: "https://susea.ai/resources/ai-agent-diagnostic" },
]);

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd data={APP_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <DiagnosticTool />
    </>
  );
}
