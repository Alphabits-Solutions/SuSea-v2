import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pre-Built AI Agents",
  description:
    "Ready-to-deploy AI agents for calling, support, sales, HR, admin, and marketing — built for your industry, live in days. Plug-and-play intelligence for enterprise teams.",
  path: "/services/agents",
});

const AGENTS = [
  { icon: "call", name: "Calling Agent", desc: "Outbound & inbound AI calling for sales, scheduling, and support." },
  { icon: "support_agent", name: "Support Agent", desc: "24/7 tier-1 customer support that escalates only when needed." },
  { icon: "trending_up", name: "Sales Agent", desc: "Qualifies inbound leads, books demos, and keeps CRM updated." },
  { icon: "people", name: "HR Agent", desc: "Automates screening, onboarding, and employee FAQ resolution." },
  { icon: "description", name: "Admin Agent", desc: "Handles document parsing, data entry, and workflow routing." },
  { icon: "campaign", name: "Marketing Agent", desc: "Content generation, social scheduling, and performance reporting." },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pre-Built AI Agents",
  url: "https://susea.ai/services/agents",
  provider: { "@type": "Organization", name: "Susea.ai" },
  description:
    "Ready-to-deploy AI agents for calling, support, sales, HR, admin, and marketing.",
  areaServed: ["US", "GB", "EU"],
};

export default function AgentsPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 signature-gradient blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-bold text-xs tracking-widest uppercase mb-6">
              PRE-BUILT AI AGENTS
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] mb-8">
              Agents That Work While{" "}
              <span className="text-primary">You Sleep.</span>
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-[620px] mb-10">
              Ready-to-deploy AI agents for calling, support, sales, HR, admin,
              and marketing — built for your industry, live in days.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="signature-gradient text-white px-8 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all"
              >
                See Agent Library →
              </Link>
              <Link
                href="/contact"
                className="bg-surface-container-high border border-outline-variant/20 px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-all"
              >
                Book a Free Demo
              </Link>
            </div>
          </div>

          {/* Abstract visualization */}
          <div className="relative aspect-square glass-panel rounded-full p-12 flex items-center justify-center">
            <div className="w-full h-full border border-outline-variant/30 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 signature-gradient rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-primary/20">
                  <span
                    className="material-symbols-outlined text-5xl text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                </div>
              </div>
              {[
                { icon: "call", pos: "absolute top-10 right-10", color: "text-primary" },
                { icon: "support_agent", pos: "absolute bottom-20 left-10", color: "text-secondary" },
                { icon: "trending_up", pos: "absolute top-1/2 -left-8", color: "text-tertiary" },
              ].map(({ icon, pos, color }) => (
                <div
                  key={icon}
                  className={`${pos} w-14 h-14 bg-surface-container-highest rounded-xl border border-outline-variant/40 flex items-center justify-center`}
                >
                  <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent cards */}
      <section className="bg-surface-container-low py-32 px-8" aria-labelledby="agents-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="agents-heading" className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-16">
            The Agent Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AGENTS.map(({ icon, name, desc }) => (
              <div
                key={name}
                className="p-8 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl signature-gradient flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white">{icon}</span>
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">{name}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl font-extrabold tracking-tighter mb-6">
            Ready to deploy your first agent?
          </h2>
          <p className="text-on-surface-variant text-lg mb-10">
            We&apos;ll scope, build, and deploy your first agent in 7 days or less.
          </p>
          <Link
            href="/contact"
            className="signature-gradient text-white font-headline font-bold px-10 py-5 rounded-xl text-lg hover:shadow-2xl transition-all inline-block"
          >
            Book a Free Agent Demo →
          </Link>
        </div>
      </section>
    </>
  );
}
