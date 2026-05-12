import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Fix My AI Agent — Emergency AI Agent Repair | Susea.ai",
  description:
    "Your AI agent is breaking in production. We diagnose and fix hallucinations, infinite loops, and API failures — with 24-hour response and 99.8% uptime track record.",
  path: "/services/fix-agent",
});

const WHAT_WE_FIX = [
  { icon: "architecture", title: "Prompt Chain Refactoring", desc: "Restructuring complex multi-step prompts to reduce latency and eliminate context-window overflow errors.", span: "md:col-span-8", large: true, largeBg: "hub" },
  { icon: "database", title: "RAG Optimization", desc: "Fine-tuning vector database retrieval to ensure your agent pulls the right facts every time.", span: "md:col-span-4" },
  { icon: "security", title: "Security Hardening", desc: "Protecting against prompt injection and ensuring data privacy across agent handoffs.", span: "md:col-span-4" },
  { icon: "monitoring", title: "Telemetry & Monitoring", desc: "Implementing observability tools to catch errors before they reach your end-users.", span: "md:col-span-4" },
  { icon: "speed", title: "Performance Tuning", desc: "Reducing token usage by up to 40% while maintaining or increasing output quality.", span: "md:col-span-4", highlight: true },
];

const DIAGNOSTIC_STEPS = [
  { step: "01", title: "Log Audit", desc: "Reviewing execution logs to identify failure nodes." },
  { step: "02", title: "Context Trace", desc: "Mapping the flow of information across prompts." },
  { step: "03", title: "Prompt Stress", desc: "Testing boundary cases for edge-case failure." },
  { step: "04", title: "Architecture Rebuild", desc: "Deploying optimized logic and connections." },
  { step: "05", title: "QA & Handover", desc: "Final validation and staff training." },
];

const FIX_OPTIONS = [
  { option: "A", title: "Emergency Triage", desc: "24-hour rapid diagnosis and patch for critical production failures. We stabilise first, optimise second.", cta: "Start Triage", primary: true, badge: "Fastest Fix" },
  { option: "B", title: "Prompt Refactor", desc: "Full rewrites of your most complex logic gates for maximum reliability.", cta: "Select Fix", primary: false },
  { option: "C", title: "The Complete Rehab", desc: "End-to-end infrastructure overhaul including RAG and API middleware.", cta: "Select Fix", primary: false, badge: "Most Requested" },
  { option: "D", title: "Architecture On-Call", desc: "Retained engineering hours for continuous optimization and fixes.", cta: "Select Fix", primary: false },
];

const STATS = [
  { value: "99.8%", label: "Uptime Stability" },
  { value: "400+", label: "Agents Rehabilitated" },
  { value: "24h", label: "Response Protocol" },
  { value: "15%", label: "Avg. Token Reduction" },
];

const FAQS = [
  { q: "How do I stop my AI agent from looping?", a: "Infinite loops almost always stem from one of three causes: a missing termination condition in the prompt, a tool that silently errors and retries, or a memory context that keeps reintroducing the same failed state. Our Log Audit step isolates the exact node within hours." },
  { q: "Can you fix a hallucinating agent?", a: "Yes. Hallucinations are typically caused by stale RAG data, over-broad retrieval, or prompts that lack sufficient grounding instructions. We refactor the retrieval pipeline and add output-validation guardrails to eliminate confident wrong answers." },
  { q: "How fast can you respond to an agent emergency?", a: "Our Emergency Triage option has a 24-hour response SLA. For clients on Architecture On-Call retainers, we maintain a 4-hour response window during business hours across US and EU timezones." },
  { q: "What causes AI agents to fail in production?", a: "The five most common causes are prompt drift over time, tool misuse under edge-case inputs, token budget exhaustion on large payloads, RAG knowledge staleness, and API rate-limit cascades that the agent has no fallback for." },
  { q: "Do you work with all AI frameworks and platforms?", a: "Yes. We support LangChain, LlamaIndex, AutoGen, CrewAI, custom Python/TypeScript implementations, and no-code platforms including n8n, Make.com, and Zapier AI integrations." },
  { q: "What if the agent architecture is beyond repair?", a: "If the underlying design is fundamentally flawed, we provide a full replacement blueprint and can rebuild from scratch — usually in less time than further patching would take. We will tell you honestly which path makes sense." },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fix My AI Agent — Emergency AI Agent Repair",
  url: "https://susea.ai/services/fix-agent",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description: "Diagnose and fix broken AI agents suffering from hallucinations, infinite loops, API failures, and prompt drift. Emergency repair with 24-hour response and 99.8% uptime track record.",
  serviceType: "AI Agent Repair & Emergency Optimization",
  areaServed: ["US", "GB", "EU", "SG"],
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
  name: "How to Get Your Broken AI Agent Fixed in 24 Hours",
  description: "Susea.ai's 5-step emergency diagnostic and repair process for failing AI agent infrastructure.",
  totalTime: "P1D",
  steps: DIAGNOSTIC_STEPS.map((s) => ({ name: s.title, text: s.desc })),
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/fix-agent" },
  { name: "Fix AI Agents", url: "https://susea.ai/services/fix-agent" },
]);

export default function FixAgentPage() {
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
            Optimization &amp; Repair
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter font-headline mb-8 leading-tight">
            Your AI Agent Is{" "}
            <span className="signature-text-gradient">Broken.</span> We Fix It — Fast.
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 font-body">
            Stop losing revenue to hallucinations, loop errors, and broken API
            connections. Our engineers diagnose and rehabilitate failing AI
            infrastructure with surgical precision.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="signature-gradient text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              Book a Free Diagnostic
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button className="bg-surface-container-highest px-8 py-4 rounded-xl text-lg font-bold border border-outline-variant/15 hover:bg-white/5 transition-all">
              View Engineering Specs
            </button>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-4 md:px-8 bg-surface-container-low" aria-labelledby="problem-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 id="problem-heading" className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight">
              A Broken Agent Is Costing You Money Right Now.
            </h2>
            <div className="h-1 w-24 bg-secondary-container" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "error_outline", title: "Loop Hell", desc: "Agents caught in self-referential cycles consume tokens and API calls without ever reaching a resolution — burning budget with every iteration." },
              { icon: "psychology_alt", title: "Hallucination Cascade", desc: "Stale RAG data or poorly structured retrieval pipelines cause agents to deliver confidently wrong answers to critical clients." },
              { icon: "link_off", title: "Tool Execution Failure", desc: "Silent middleware errors and broken API authentication prevent your agent from accessing the tools it needs to complete any workflow." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-panel p-8 rounded-xl border border-outline-variant/15">
                <span className="material-symbols-outlined text-4xl text-secondary-container mb-6 block">{icon}</span>
                <h3 className="text-2xl font-bold mb-4 font-headline">{title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Fix — Bento */}
      <section className="py-24 px-4 md:px-8" aria-labelledby="fixes-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 id="fixes-heading" className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4">
                Every Layer. Every Platform.
              </h2>
              <p className="text-xl text-on-surface-variant">
                We don&apos;t just patch symptoms; we re-engineer the neural architecture of your business logic.
              </p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
              Explore Full Capabilities{" "}
              <span className="material-symbols-outlined">trending_flat</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {WHAT_WE_FIX.map(({ icon, title, desc, span, large, largeBg, highlight }) => (
              <div
                key={title}
                className={`${span} bg-surface-container p-10 rounded-xl relative overflow-hidden group ${highlight ? "border-2 border-primary/20" : ""}`}
              >
                {large && (
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity" aria-hidden>
                    <span className="material-symbols-outlined text-9xl text-primary">{largeBg}</span>
                  </div>
                )}
                <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{icon}</span>
                <h3 className={`${large ? "text-3xl" : "text-2xl"} font-bold mb-4 font-headline`}>{title}</h3>
                <p className="text-on-surface-variant text-lg max-w-xl">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-bold text-on-surface-variant/50 mb-12 tracking-widest uppercase font-label">
            Certified Engineering Expertise Across
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-50 hover:opacity-100 transition-all">
            {["n8n", "Make.com", "OpenAI", "Anthropic", "LangChain"].map((p) => (
              <div key={p} className="flex items-center justify-center font-headline font-extrabold text-2xl">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Protocol — Timeline */}
      <section className="py-24 px-8" aria-labelledby="protocol-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="protocol-heading" className="text-4xl md:text-5xl font-bold font-headline mb-20 text-center">
            The Diagnostic Protocol
          </h2>
          <div className="relative">
            <div className="absolute top-6 left-0 w-full h-0.5 bg-outline-variant/20 hidden md:block" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
              {DIAGNOSTIC_STEPS.map(({ step, title, desc }) => (
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

      {/* Types of Fixes */}
      <section className="py-24 px-8 bg-surface-container-low" aria-labelledby="options-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="options-heading" className="sr-only">Fix Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-outline-variant/15 border border-outline-variant/15 rounded-xl overflow-hidden">
            {FIX_OPTIONS.map(({ option, title, desc, cta, primary, badge }) => (
              <div key={option} className="bg-surface p-8 relative">
                {badge && (
                  <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {badge}
                  </div>
                )}
                <span className="text-xs text-primary mb-4 block font-bold uppercase font-label">Option {option}</span>
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{desc}</p>
                <Link
                  href="/contact"
                  className={`w-full py-2 rounded-lg font-bold text-center block transition-all ${
                    primary
                      ? "bg-primary text-on-primary hover:opacity-90"
                      : "border border-outline-variant hover:bg-white/5"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Susea Stats */}
      <section className="py-24 px-8" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="stats-heading" className="text-4xl font-bold font-headline mb-4">Why Susea AI?</h2>
            <p className="text-on-surface-variant">Precision is our only metric.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-black text-primary mb-2 font-headline">{value}</div>
                <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden bg-surface relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArHu2YlBF-Y_oCRIOMOf2-_hM-3BpreIf5Y8P_qsgVEBUtlwKSEHdx2n_D2PRqFQ2cNy5t2yn2RJW2OLB84su7hEAYWxtpXZG2lEi6vMZyCFpSTDc6ZCX9537zEBrJkMkIuNMYq9gbLormQypMFJLgvSRNp_QeVpukXXRdwx5YcHh9TPAWFMJ29Pli4riDQ0XSaNuE9rsxHT2JJGI0fEo2QrxGWnxWcvdmUGrrKnCHAlcBhl1N22EDaA_MjQEYQ07BWzfj8VwpQowi"
              alt="Complex neural network visualization"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" aria-hidden />
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-sm text-secondary-container font-bold mb-4 block font-label">Case Study #07</span>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 tracking-tight">
              Recovering $2M in Lost Leads for a Global Fintech.
            </h2>
            <p className="text-on-surface-variant text-lg mb-8">
              A failing customer onboarding agent was dropping 14% of applicants due to API timeouts
              and hallucinations. We refactored the entire middleware layer and prompt chain in 72 hours.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
            >
              Read Full Technical Report{" "}
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto signature-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-black/10" aria-hidden />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black font-headline text-white mb-8 tracking-tighter">
              Ready to fix your AI?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-body">
              Don&apos;t let inefficient agents drain your resources. Get a precise diagnostic report and
              a clear path to rehabilitation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-xl text-xl font-black hover:scale-105 transition-all shadow-xl"
            >
              Book a Free Diagnostic Call
              <span className="material-symbols-outlined">call</span>
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
