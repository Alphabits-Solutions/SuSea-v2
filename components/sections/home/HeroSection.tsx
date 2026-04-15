import Link from "next/link";
import GlassPanel from "@/components/ui/GlassPanel";

const STATS = [
  { accent: "text-primary", label: "Scale", value: "6+ Industries", sub: "Deployed across sectors" },
  { accent: "text-secondary", label: "Velocity", value: "7 Days", sub: "First agent live in a week", offset: "translate-x-8" },
  { accent: "text-primary", label: "Market Readiness", value: "4 Weeks", sub: "MVP to market delivery", offset: "-translate-x-4" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      {/* Gradient mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full signature-gradient blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Copy */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/30 bg-surface-container-low mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            <span className="text-xs uppercase tracking-widest font-headline font-bold text-on-surface-variant">
              AI AGENCY • USA &amp; EUROPE
            </span>
          </div>

          <h1 className="font-headline text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-8 text-on-surface">
            Your AI Agents Broken?{" "}
            <br />
            <span className="signature-text-gradient italic">
              We Fix, Build &amp; Deliver.
            </span>
          </h1>

          <p className="text-lg text-on-surface-variant max-w-[620px] mb-12 leading-relaxed">
            We fix broken AI agents, build new ones, ship software, and consult
            teams — so your business runs better, faster, and smarter.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="signature-gradient font-headline font-bold px-8 py-4 rounded-xl text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-white"
            >
              Book a Free AI Audit →
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-4 rounded-xl font-headline font-bold text-lg border border-outline-variant hover:bg-surface-container transition-all active:scale-95"
            >
              See Our Work
            </Link>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="lg:col-span-4 relative flex items-center justify-center">
          <div className="space-y-6 w-full max-w-sm">
            {STATS.map(({ accent, label, value, sub, offset }) => (
              <GlassPanel
                key={label}
                className={`p-6 shadow-2xl ${offset ?? ""}`}
              >
                <span className={`block ${accent} font-mono text-sm mb-1 uppercase tracking-widest font-bold`}>
                  {label}
                </span>
                <div className="text-3xl font-headline font-extrabold">{value}</div>
                <div className="text-on-surface-variant text-sm mt-1">{sub}</div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
