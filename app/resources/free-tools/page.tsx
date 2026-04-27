import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Tools",
  description:
    "Free tools to audit, assess, and accelerate your AI readiness. Built by the Susea.ai team for builders and operators.",
  path: "/resources/free-tools",
});

export default function FreeToolsPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-6 mb-16 text-center">
        <span className="inline-block px-3 py-1 rounded-full border border-outline-variant/30 text-primary font-mono text-xs uppercase tracking-widest">
          Free Resources
        </span>
        <div className="inline-flex items-center gap-2 ml-3 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/30">
          <span className="material-symbols-outlined text-secondary-container text-sm">schedule</span>
          <span className="text-secondary-container font-mono text-xs uppercase tracking-widest font-bold">
            Coming Soon
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface">
          Free{" "}
          <span className="signature-text-gradient">AI Tools</span>
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          Practical, no-fluff tools to diagnose your AI readiness, benchmark
          your stack, and identify quick wins — built by the Susea.ai
          engineering team.
        </p>
      </div>

      {/* Preview cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          {
            icon: "checklist",
            title: "AI Readiness Scorecard",
            desc: "20-point diagnostic that benchmarks your data, infrastructure, and talent against best-in-class AI-ready organisations.",
          },
          {
            icon: "calculate",
            title: "ROI Calculator",
            desc: "Estimate the time and cost savings of automating your most common workflows with AI agents.",
          },
          {
            icon: "security",
            title: "AI Risk Audit",
            desc: "Self-assessment checklist covering data privacy, model drift, compliance exposure, and access controls.",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="glass-panel p-6 rounded-xl border border-outline-variant/15 relative overflow-hidden"
          >
            <div className="absolute inset-0 signature-gradient opacity-5 pointer-events-none" />
            <span
              className="material-symbols-outlined text-primary text-4xl mb-4 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {icon}
            </span>
            <h3 className="font-headline font-bold text-on-surface text-lg mb-2">{title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
            <div className="mt-4 flex items-center gap-2 text-outline text-xs font-mono uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">lock</span>
              Launching soon
            </div>
          </div>
        ))}
      </div>

      {/* Waitlist form */}
      <div className="bg-surface-container rounded-2xl p-10 md:p-16 border border-outline-variant/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full signature-gradient opacity-5 blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tighter">
            Get early access
          </h2>
          <p className="text-on-surface-variant">
            Be first to know when the tools launch. No spam — one email, no pitch.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="you@company.ai"
              className="flex-1 bg-transparent border-b border-outline-variant focus:border-primary text-on-surface py-3 px-0 placeholder:text-outline/40 outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-secondary-container text-on-secondary px-8 py-3 rounded-xl font-headline font-bold hover:opacity-90 transition-opacity"
            >
              Notify me
            </button>
          </form>
        </div>
      </div>

      {/* Fallback CTA */}
      <div className="mt-12 text-center">
        <p className="text-on-surface-variant mb-4">Can&apos;t wait? Let&apos;s talk directly.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-primary font-headline font-bold hover:opacity-70 transition-opacity"
        >
          Talk to us while you wait
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
