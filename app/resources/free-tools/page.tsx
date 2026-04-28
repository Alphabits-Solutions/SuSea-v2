import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBreadcrumbs } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Tools — Diagnostic, Report & Scorecard | Susea.ai",
  description:
    "Three free AI tools from Susea.ai: AI Agent Diagnostic (instant health score), AI Readiness Scorecard for CTOs & SMB owners, and a free 14-page AI Readiness Report. Know your AI position before you invest.",
  path: "/resources/free-tools",
});

const TOOLS = [
  {
    href: "/resources/ai-agent-diagnostic",
    icon: "bug_report",
    tag: "Diagnostic Tool · Free",
    title: "AI Agent Diagnostic",
    sub: "Is Your AI Agent Production-Ready?",
    desc: "Answer 20 targeted questions and get an instant health score across 6 critical failure categories: hallucinations, loop errors, token cost, security, scalability, and observability.",
    stats: [
      { value: "20", label: "Questions" },
      { value: "6", label: "Categories" },
      { value: "~3 min", label: "Duration" },
    ],
    cta: "Start Free Diagnosis",
    accent: "text-primary",
    accentBg: "bg-primary/10",
  },
  {
    href: "/resources/ai-readiness-scorecard",
    icon: "fact_check",
    tag: "Assessment Tool · Free",
    title: "AI Readiness Scorecard",
    sub: "Are You Actually Ready for AI?",
    desc: "A tailored self-assessment for CTOs and SMB owners across 4 dimensions: Business Process, Data & Technology, Team & Talent, and Budget & ROI. Honest score in under 4 minutes.",
    stats: [
      { value: "2", label: "Role paths" },
      { value: "4", label: "Dimensions" },
      { value: "~4 min", label: "Duration" },
    ],
    cta: "Take the Scorecard",
    accent: "text-secondary-container",
    accentBg: "bg-secondary-container/10",
  },
  {
    href: "/resources/ai-readiness-report",
    icon: "description",
    tag: "Free Download · PDF",
    title: "AI Readiness Report",
    sub: "Real Consulting Deliverable — Free",
    desc: "Download the same 14-page AI Readiness Report format Susea.ai delivers to enterprise clients. Includes ROI projections, implementation roadmap, use case matrix, and investment tiers.",
    stats: [
      { value: "14", label: "Pages" },
      { value: "4", label: "Dimensions" },
      { value: "Free", label: "Always" },
    ],
    cta: "Download Free Report",
    accent: "text-[#2dd4a0]",
    accentBg: "bg-[#2dd4a0]/10",
  },
];

const COLLECTION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free AI Tools — Susea.ai",
  url: "https://susea.ai/resources/free-tools",
  description:
    "A collection of free AI diagnostic and assessment tools from Susea.ai for CTOs, SMB owners, and enterprise leaders evaluating AI readiness and agent health.",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
  hasPart: [
    {
      "@type": "WebApplication",
      name: "AI Agent Diagnostic",
      url: "https://susea.ai/resources/ai-agent-diagnostic",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "WebApplication",
      name: "AI Readiness Scorecard",
      url: "https://susea.ai/resources/ai-readiness-scorecard",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "LearningResource",
      name: "AI Readiness Report Template",
      url: "https://susea.ai/resources/ai-readiness-report",
      isAccessibleForFree: true,
    },
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Resources", url: "https://susea.ai/resources/free-tools" },
  { name: "Free AI Tools", url: "https://susea.ai/resources/free-tools" },
]);

export default function FreeToolsPage() {
  return (
    <>
      <JsonLd data={COLLECTION_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-bold text-xs tracking-widest uppercase mb-6">
            Free Resources
          </span>
          <h1 className="font-headline font-extrabold text-4xl md:text-6xl tracking-tighter mb-6 leading-tight">
            Know Your AI Position
            <br />
            <span className="signature-text-gradient">Before You Invest</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Three free tools used by CTOs and SMB leaders to diagnose AI agent health, assess
            organisational readiness, and benchmark against professional consulting standards.
          </p>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="pb-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {TOOLS.map(({ href, icon, tag, title, sub, desc, stats, cta, accent, accentBg }) => (
            <article
              key={href}
              className="flex flex-col bg-surface-container border border-outline-variant/10 rounded-2xl p-8 hover:border-primary/20 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${accentBg} flex items-center justify-center mb-6`}>
                <span className={`material-symbols-outlined ${accent}`}>{icon}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1">
                {tag}
              </span>
              <h2 className="font-headline font-extrabold text-2xl tracking-tight mb-1">{title}</h2>
              <p className={`text-sm font-semibold ${accent} mb-4`}>{sub}</p>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">{desc}</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {stats.map(({ value, label }) => (
                  <div key={label} className="bg-surface-container-high rounded-lg p-3 text-center">
                    <div className={`font-headline font-extrabold text-base ${accent}`}>{value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={href}
                className="w-full py-3 rounded-xl bg-secondary-container text-on-secondary font-headline font-bold text-sm text-center hover:opacity-90 transition-all active:scale-95"
              >
                {cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Why These Tools */}
      <section className="py-24 px-8 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-4">
              Why It Matters
            </span>
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl tracking-tighter mb-4">
              Most AI Projects Fail Before They Start
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto">
              70% of enterprise AI initiatives underdeliver. The root cause is almost always the same
              — organisations invest before understanding their readiness gaps. These tools exist to
              change that.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: "search",
                title: "Diagnose First",
                desc: "Identify failure points in your current AI agents before scaling them further.",
              },
              {
                icon: "bar_chart",
                title: "Score Your Readiness",
                desc: "Get an objective score across the dimensions that predict AI project success.",
              },
              {
                icon: "download",
                title: "Benchmark Against Pros",
                desc: "See what a real consulting AI readiness assessment looks like — for free.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 bg-surface-container rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">{icon}</span>
                <h3 className="font-headline font-bold text-lg mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl tracking-tighter mb-4">
            Want a Real Assessment?
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            These free tools are a starting point. Book a 20-minute strategy call with a Susea.ai
            engineer and get a complete picture of your AI position — no charge, no commitment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary px-8 py-4 rounded-xl font-headline font-bold hover:opacity-90 transition-all active:scale-95"
          >
            Book Free Strategy Call →
          </Link>
        </div>
      </section>
    </>
  );
}
