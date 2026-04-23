import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/ui/FAQSection";
import { buildMetadata, buildBreadcrumbs, buildHowToSchema } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Consulting & Readiness",
  description:
    "Eliminate technical debt and strategic misalignment before a single line of code is written. Our AI readiness audit ensures your investment is architected for scale, security, and ROI.",
  path: "/services/consulting",
});

const READINESS_PILLARS = [
  { icon: "database", title: "Data Integrity", desc: "Source reliability, ETL pipeline health, and real-time synchronization capabilities." },
  { icon: "security", title: "Compliance & Privacy", desc: "GDPR, HIPAA, and custom LLM privacy layers for sensitive internal data." },
  { icon: "lan", title: "Infrastructure Stack", desc: "GPU availability, cloud vs. on-prem hybrid models, and edge computing potential." },
  { icon: "groups", title: "Talent Gap Analysis", desc: "Assessment of internal engineering readiness and training requirements." },
  { icon: "trending_up", title: "Market Positioning", desc: "Competitor AI benchmarking and defensible product roadmap strategy." },
  { icon: "cycle", title: "Scalability Velocity", desc: "Bottleneck detection for when the model grows from pilot to production." },
];

const ROADMAP_STEPS = [
  { num: "01", title: "Discovery Intensive", desc: "48-hour deep dive into your current technical stack and business goals." },
  { num: "02", title: "Data Forensic Audit", desc: "Validation of data cleanliness, accessibility, and structural health." },
  { num: "03", title: "Risk/Reward Mapping", desc: "Prioritizing high-impact use cases against implementation complexity." },
  { num: "04", title: "Final Blueprint", desc: "A 12-month engineering roadmap with precise cost projections." },
];

const SCOPE_ITEMS = [
  { icon: "verified_user", label: "Enterprise LLM Fine-tuning Strategy" },
  { icon: "cloud_sync", label: "Multi-Cloud AI Infrastructure Design" },
  { icon: "analytics", label: "Vector Database Optimization" },
  { icon: "neurology", label: "Agentic Workflow Orchestration" },
];

const PILLARS = [
  { icon: "database_off", title: "The Data Swamp", desc: "Building on fragmented, uncleaned data is the fastest way to generate expensive, confident hallucinations. We audit your infrastructure to find the gold in the sludge.", span: "md:col-span-8" },
  { icon: "money_off", title: "ROI Blindness", desc: "Deploying AI because 'everyone else is' leads to vanity metrics and zero bottom-line impact.", span: "md:col-span-4", note: "Case Study: Lost $2M" },
  { icon: "gavel", title: "Shadow AI Risk", desc: "Corporate data leaking into public LLMs is the primary security threat of 2024. Is your governance ready?", span: "md:col-span-4" },
  { icon: "architecture", title: "Technical Debt Injection", desc: "Standard SaaS templates aren't built for the dynamic load of AI. We architect for the 5-year horizon, not the 5-month hype cycle.", span: "md:col-span-8" },
];

const FAQS = [
  {
    q: "What does an AI Readiness Audit actually involve?",
    a: "Over 2 weeks, our architects assess your data infrastructure, tech stack, team capabilities, compliance posture, and competitive landscape. You receive a 40+ page report with a prioritised 12-month AI roadmap and ROI projections for each initiative.",
  },
  {
    q: "How long does the consulting engagement take?",
    a: "The Discovery Intensive takes 48 hours. The full audit and Final Blueprint delivery is typically completed within 10 business days. Ongoing strategic partnerships are structured as quarterly retainers.",
  },
  {
    q: "Do we need to have existing AI infrastructure in place?",
    a: "Not at all. Many clients come to us at the very start of their AI journey. The audit is equally valuable whether you have zero AI implementation or an existing system you need to scale.",
  },
  {
    q: "What industries do you specialise in?",
    a: "We have deep expertise in FinTech, Healthcare, E-Commerce, SaaS, Logistics, and Professional Services. However, our strategic frameworks are industry-agnostic and have been applied across 30+ verticals.",
  },
  {
    q: "How do you protect our sensitive business data during the audit?",
    a: "All engagements begin with a mutual NDA. We operate under strict data handling protocols and can work entirely within your secure environment or via anonymised exports — no proprietary data ever leaves your control.",
  },
  {
    q: "What happens after the Final Blueprint is delivered?",
    a: "You can execute the roadmap independently, hire our engineering team to build it (via our Hire Dedicated Resources service), or retain us as fractional CTO/AI strategy advisors on an ongoing basis.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Consulting & Readiness",
  url: "https://susea.ai/services/consulting",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  description: "Strategic AI readiness assessments and consulting to identify high-ROI AI opportunities and build a 12-month roadmap.",
  serviceType: "AI Strategy Consulting",
  areaServed: ["US", "GB", "EU", "SG"],
};

const HOWTO_SCHEMA = buildHowToSchema({
  name: "How to Conduct an AI Readiness Audit",
  description:
    "Susea.ai's 4-phase AI readiness methodology — from discovery intensive through final blueprint delivery.",
  totalTime: "P10D",
  steps: ROADMAP_STEPS.map((s) => ({ name: s.title, text: s.desc })),
});

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Services", url: "https://susea.ai/services/consulting" },
  { name: "AI Consulting & Readiness", url: "https://susea.ai/services/consulting" },
]);

export default function ConsultingPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={HOWTO_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-background/60" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block py-1 px-4 rounded-full border border-outline-variant/30 text-xs uppercase tracking-widest text-primary mb-6 bg-surface-container/50">
            Consulting &amp; Readiness
          </span>
          <h1 className="font-headline text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
            Know Before <br />
            <span className="signature-text-gradient">You Build.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Eliminate technical debt and strategic misalignment before a single
            line of code is written. Our readiness audit ensures your AI
            investment is architected for scale, security, and ROI.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-secondary-container text-on-secondary px-8 py-4 rounded-xl font-headline font-bold text-lg hover:shadow-lg transition-all"
            >
              Initiate Strategy Audit
            </Link>
            <button className="bg-surface-container-highest/50 backdrop-blur-md text-on-surface px-8 py-4 rounded-xl font-headline font-bold text-lg border border-outline-variant/20 hover:bg-surface-container-highest transition-all">
              View Methodology
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20" aria-hidden>
          <span className="material-symbols-outlined text-4xl animate-bounce">
            keyboard_double_arrow_down
          </span>
        </div>
      </section>

      {/* Problem Bento */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto" aria-labelledby="problems-heading">
        <div className="mb-20">
          <h2 id="problems-heading" className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-4">
            The AI Graveyard Is Full <br />of Good Ideas
          </h2>
          <p className="text-lg text-on-surface-variant max-w-xl">
            70% of enterprise AI projects fail due to poor data foundations and
            missing strategic intent. We ensure you&apos;re in the 30% that succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {PILLARS.map(({ icon, title, desc, span, note }) => (
            <div
              key={title}
              className={`${span} bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden group`}
            >
              <span className="material-symbols-outlined text-secondary text-5xl mb-6 block">{icon}</span>
              <h3 className="text-2xl md:text-3xl font-headline font-bold mb-4">{title}</h3>
              <p className="text-on-surface-variant max-w-md">{desc}</p>
              {note && (
                <div className="mt-8 text-secondary font-bold flex items-center gap-2">
                  {note}{" "}
                  <span className="material-symbols-outlined">trending_down</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6 Pillars */}
      <section className="py-24 md:py-32 bg-surface-container-lowest" aria-labelledby="pillars-heading">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 id="pillars-heading" className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-6">
              Your AI Readiness Report
              <br />Covers 6 Pillars
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" aria-hidden />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {READINESS_PILLARS.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <h4 className="font-headline text-xl font-bold">{title}</h4>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Roadmap */}
      <section className="py-24 md:py-32 px-4 md:px-8" aria-labelledby="roadmap-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="roadmap-heading" className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-20 text-center">
            From Conversation to Roadmap
            <br />in 2 Weeks
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -translate-y-1/2" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {ROADMAP_STEPS.map(({ num, title, desc }) => (
                <div key={num} className="bg-surface p-6 text-center border border-outline-variant/20 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high border-4 border-surface flex items-center justify-center mx-auto mb-6">
                    <span className="font-headline font-black text-2xl text-primary">{num}</span>
                  </div>
                  <h5 className="font-headline text-lg font-bold mb-2">{title}</h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Scope */}
      <section className="py-24 md:py-32 bg-surface-container-low border-y border-outline-variant/10" aria-labelledby="scope-heading">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 id="scope-heading" className="font-headline text-5xl font-bold tracking-tight text-on-surface mb-8">
              Consulting Scope
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Our engineers and strategists specialize in high-stakes AI transitions for Fortune 500
              and high-growth tech firms.
            </p>
            <div className="space-y-4">
              {SCOPE_ITEMS.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-container hover:bg-surface-container-highest transition-colors group"
                >
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                    {icon}
                  </span>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Readiness grade visual */}
          <div className="relative rounded-2xl overflow-hidden flex items-center justify-center p-8 bg-surface-container-lowest">
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at center, #abc7ff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              aria-hidden
            />
            <div className="relative z-10 w-full aspect-square rounded-full bg-gradient-to-br from-primary/30 via-tertiary/10 to-secondary/30 blur-2xl animate-pulse max-w-[250px] mx-auto" aria-hidden />
            <div className="relative z-20 text-center absolute">
              <div className="font-headline font-black text-8xl text-on-surface tracking-tighter mb-4">A+</div>
              <div className="font-mono text-primary uppercase tracking-[0.3em] text-sm">Readiness Grade</div>
              <div className="mt-8 p-4 bg-surface/80 backdrop-blur rounded-xl border border-outline-variant/30 font-mono text-xs text-on-surface-variant text-left">
                $ tail audit --target=enterprise-data<br />
                [SUCCESS] 99.8% Core Integrity<br />
                [SUCCESS] Compliance Validated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={FAQS} title="AI Consulting FAQs" />

      {/* Final Gradient CTA */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto rounded-[2rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 signature-gradient" aria-hidden />
          <div className="absolute inset-0 bg-surface/20 backdrop-blur-[2px]" aria-hidden />
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to Engineer Your
              <br />Future?
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium">
              Don&apos;t launch a pilot that goes nowhere. Get a battle-tested roadmap from the
              architects of Susea.ai.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-white px-10 py-5 rounded-full font-headline font-bold text-xl hover:scale-105 transition-transform text-primary-container"
              >
                Schedule Your Audit
              </Link>
              <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-headline font-bold text-xl hover:bg-white/10 transition-colors">
                Download Sample Report
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
