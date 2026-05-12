import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Industry-Specific Custom AI Agents — Real Estate, Fintech & Logistics | Susea.ai",
  description:
    "We build production-ready AI agents tailored to your industry. Real Estate, Fintech, Logistics — with guardrails, monitoring, and measurable ROI from day one.",
  path: "/services/custom-agents",
});

const INDUSTRIES = [
  {
    icon: "home_work",
    industry: "Real Estate",
    agent: "Outbound Prospecting Agent",
    metric: "3.2×",
    metricLabel: "more listings reached per rep per day",
    desc: "Autonomously qualifies inbound leads, books viewings, and follows up across email and SMS — so your agents focus on closing, not chasing.",
    gradient: "from-teal-500/20 to-emerald-500/10",
  },
  {
    icon: "account_balance",
    industry: "Fintech",
    agent: "Regulatory Monitoring Agent",
    metric: "$180k+",
    metricLabel: "compliance cost eliminated annually",
    desc: "Continuously scans regulatory feeds, flags policy changes, and drafts compliance update reports — replacing a full-time analyst role.",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: "local_shipping",
    industry: "Logistics",
    agent: "Multi-Stop Routing Agent",
    metric: "47%",
    metricLabel: "reduction in dispatch coordination overhead",
    desc: "Dynamically re-routes deliveries around live traffic and capacity constraints, updating drivers and clients without dispatcher intervention.",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
];

const DIFFERENTIATORS = [
  { icon: "shield_lock", title: "Guardrails-First", desc: "Every agent ships with output validation, fallback chains, and human-in-loop triggers baked in from day one — not bolted on after a failure." },
  { icon: "psychology", title: "Domain-Aware Prompting", desc: "We don't use generic templates. Prompts are engineered around your industry's vocabulary, compliance constraints, and edge-case patterns." },
  { icon: "hub", title: "Multi-LLM Architecture", desc: "Route tasks to the right model — GPT-4o for reasoning, Claude for long-context, smaller models for cost-sensitive high-volume steps." },
  { icon: "trending_up", title: "ROI-Measured", desc: "We baseline your current process, set measurable targets, and track agent performance against them. You see the return before the engagement ends." },
];

const BUILD_STEPS = [
  { step: "01", title: "Discovery", desc: "We map your target workflow end-to-end and define success metrics before writing a single line of code." },
  { step: "02", title: "Domain Mapping", desc: "Industry-specific data sources, compliance constraints, and edge cases are catalogued and built into the agent's knowledge layer." },
  { step: "03", title: "Prototype", desc: "A working agent prototype runs against real (sanitised) data within the first week so you can validate logic early." },
  { step: "04", title: "Harden", desc: "We stress-test against adversarial inputs, rate limits, and failure scenarios then add guardrails for each failure mode found." },
  { step: "05", title: "Deploy", desc: "Production release with full observability, alerting, and a 30-day monitoring window before handover." },
];

const PLATFORMS = ["OpenAI", "Anthropic", "LangChain", "LlamaIndex", "n8n", "Make.com"];

const FAQS = [
  { q: "How is this different from the standard AI Agents service?", a: "The standard agents service offers a library of pre-architected agent types. This service is for organisations that need an agent built around the specific terminology, data sources, compliance rules, and edge cases of their industry — requiring custom domain modelling from the start." },
  { q: "Which industries do you specialise in?", a: "Our deepest domain expertise is in Real Estate, Fintech, Logistics, Healthcare, Legal, and Professional Services. We take on projects outside these verticals where the use case is well-defined." },
  { q: "How long does a custom industry agent take to build?", a: "A focused single-workflow agent typically takes 3–5 weeks from kickoff to production. Multi-workflow or multi-department agents range from 6–12 weeks depending on integration complexity." },
  { q: "Can the agent connect to our existing CRM or ERP systems?", a: "Yes. We build native integrations with Salesforce, HubSpot, SAP, and most systems that expose a REST API or webhook interface. We also work with custom internal APIs." },
  { q: "What LLM provider do you use?", a: "We select the model mix that fits your requirements — OpenAI, Anthropic, Google, or open-source models. Multi-model architectures are common: a powerful model for reasoning steps, cheaper models for high-volume classification." },
  { q: "Do we own the agent after the engagement?", a: "Yes. All code, prompts, and configurations are fully yours. We document everything and offer ongoing support retainers, but you are never locked in." },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Industry-Specific Custom AI Agents",
  url: "https://susea.ai/services/custom-agents",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description:
    "Production-ready AI agents built around the specific workflows, compliance requirements, and data sources of your industry — Real Estate, Fintech, Logistics, and beyond.",
  serviceType: "Industry-Specific AI Agent Development",
  areaServed: ["US", "GB", "EU", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Industry Verticals",
    itemListElement: INDUSTRIES.map((ind) => ({
      "@type": "Offer",
      name: `${ind.industry} AI Agent — ${ind.agent}`,
      description: ind.desc,
    })),
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const HOWTO_SCHEMA = buildHowToSchema({
  name: "How We Build a Custom AI Agent for Your Industry",
  description: "Susea.ai's 5-step process for delivering production-ready industry-specific AI agents with guardrails and measurable ROI.",
  totalTime: "P35D",
  steps: BUILD_STEPS.map((s) => ({ name: s.title, text: s.desc })),
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/custom-agents" },
  { name: "Custom Agents", url: "https://susea.ai/services/custom-agents" },
]);

export default function CustomAgentsPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20">
        <div className="absolute inset-0 z-0 opacity-30" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px] opacity-20" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-container rounded-full blur-[100px] opacity-10" />
        </div>
        <div className="relative z-10 max-w-5xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary mb-6 block font-label font-bold">
            Industry AI Agents
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter font-headline mb-8 leading-tight">
            Enterprise AI Agents{" "}
            <span className="signature-text-gradient">Built for Your Industry.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 font-body">
            Generic AI templates break when they meet your real workflows. We build agents that understand your industry&apos;s language, compliance rules, and edge cases — and prove ROI before we hand over the keys.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="signature-gradient text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              Book a Discovery Call
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="#how-it-works"
              className="bg-surface-container-highest px-8 py-4 rounded-xl text-lg font-bold border border-outline-variant/15 hover:bg-white/5 transition-all"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Showcase */}
      <section className="py-24 px-4 md:px-8 bg-surface-container-low" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 id="industries-heading" className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight">
              Agents That Know Your Industry
            </h2>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Three verticals. Three different ROI stories. All built on the same guardrails-first foundation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INDUSTRIES.map(({ icon, industry, agent, metric, metricLabel, desc, gradient }) => (
              <div key={industry} className={`glass-panel p-8 rounded-xl border border-outline-variant/15 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl`} aria-hidden />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant">{industry}</p>
                      <p className="text-sm font-medium text-on-surface">{agent}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-primary font-headline">{metric}</span>
                    <p className="text-sm text-on-surface-variant mt-1">{metricLabel}</p>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 px-4 md:px-8" aria-labelledby="diff-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 id="diff-heading" className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight">
              Why Industry-Specific Matters
            </h2>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              A real estate workflow is not a logistics workflow. Domain specificity is the difference between an agent that passes a demo and one that survives production.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DIFFERENTIATORS.map(({ icon, title, desc }) => (
              <div key={title} className="glass-panel p-8 rounded-xl border border-outline-variant/15 flex gap-6">
                <span className="material-symbols-outlined text-4xl text-primary shrink-0">{icon}</span>
                <div>
                  <h3 className="text-xl font-bold mb-3 font-headline">{title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Process */}
      <section id="how-it-works" className="py-24 px-4 md:px-8 bg-surface-container-low" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold font-headline mb-20 text-center tracking-tight">
            From Discovery to Production in 5 Steps
          </h2>
          <div className="relative">
            <div className="absolute top-6 left-0 w-full h-0.5 bg-outline-variant/20 hidden md:block" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
              {BUILD_STEPS.map(({ step, title, desc }) => (
                <div key={step} className="text-center group">
                  <div className="w-12 h-12 bg-surface-container-high border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary transition-colors">
                    <span className="font-bold text-primary group-hover:text-on-primary">{step}</span>
                  </div>
                  <h4 className="font-bold mb-2 font-headline">{title}</h4>
                  <p className="text-sm text-on-surface-variant">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-bold text-on-surface-variant/50 mb-12 tracking-widest uppercase font-label">
            Built on the Platforms You Already Use
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center opacity-50 hover:opacity-100 transition-all">
            {PLATFORMS.map((p) => (
              <div key={p} className="flex items-center justify-center font-headline font-extrabold text-xl">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto signature-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-black/10" aria-hidden />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black font-headline text-white mb-8 tracking-tighter">
              Ready to build your industry agent?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-body">
              Tell us your workflow. We will scope it, price it, and show you exactly what the agent will do before we write a single line of code.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-xl text-xl font-black hover:scale-105 transition-all shadow-xl"
            >
              Book a Discovery Call
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 bg-surface" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-4xl font-bold font-headline mb-16 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10 group">
                <summary className="w-full p-6 text-left flex justify-between items-center cursor-pointer list-none">
                  <span className="font-bold">{q}</span>
                  <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant text-sm">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
