import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Consulting & Readiness",
  description:
    "Eliminate technical debt and strategic misalignment before a single line of code is written. Our AI readiness audit ensures your investment is architected for scale, security, and ROI.",
  path: "/services/consulting",
});

const PILLARS = [
  { icon: "database_off", title: "The Data Swamp", desc: "Building on fragmented, uncleaned data is the fastest way to generate expensive, confident hallucinations. We audit your infrastructure to find the gold in the sludge.", span: "md:col-span-8" },
  { icon: "money_off", title: "ROI Blindness", desc: "Deploying AI because 'everyone else is' leads to vanity metrics and zero bottom-line impact.", span: "md:col-span-4", note: "Case Study: Lost $2M" },
  { icon: "gavel", title: "Shadow AI Risk", desc: "Corporate data leaking into public LLMs is the primary security threat of 2024. Is your governance ready?", span: "md:col-span-4" },
  { icon: "architecture", title: "Technical Debt Injection", desc: "Standard SaaS templates aren't built for the dynamic load of AI. We architect for the 5-year horizon, not the 5-month hype cycle.", span: "md:col-span-8" },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Consulting & Readiness",
  url: "https://susea.ai/services/consulting",
  provider: { "@type": "Organization", name: "Susea.ai" },
  description: "Strategic AI readiness assessments and consulting to identify high-ROI opportunities.",
  areaServed: ["US", "GB", "EU"],
};

export default function ConsultingPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-background/60" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <span className="inline-block py-1 px-4 rounded-full border border-outline-variant/30 text-xs uppercase tracking-widest text-primary mb-6 bg-surface-container/50">
            Consulting &amp; Readiness
          </span>
          <h1 className="font-headline text-7xl md:text-9xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
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
      <section className="py-32 px-8 max-w-7xl mx-auto" aria-labelledby="problems-heading">
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

      {/* CTA */}
      <section className="py-32 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tighter mb-6">
            Get your AI Readiness Score
          </h2>
          <p className="text-on-surface-variant text-lg mb-10">
            Our 20-point diagnostic tells you exactly where you stand and what
            moves the needle.
          </p>
          <Link
            href="/contact"
            className="signature-gradient text-white font-headline font-bold px-10 py-5 rounded-xl text-lg hover:shadow-2xl transition-all inline-block"
          >
            Book a Strategy Audit →
          </Link>
        </div>
      </section>
    </>
  );
}
