const COMPANIES = [
  "TechCorp", "NovaMed", "FinAxis", "RetailEdge", "CloudForce",
  "DataBridge", "ScaleAI", "OptiFlow", "NexGen", "BuildFast",
];

const INDUSTRIES = [
  { icon: "health_and_safety", label: "Healthcare" },
  { icon: "payments", label: "Finance" },
  { icon: "shopping_cart", label: "Retail" },
  { icon: "factory", label: "Manufacturing" },
  { icon: "cloud", label: "SaaS" },
  { icon: "school", label: "Education" },
  { icon: "construction", label: "Trades" },
  { icon: "health_and_safety", label: "Healthcare" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#F7F7F5] py-16 overflow-hidden" aria-label="Trusted by companies">
      {/* Company logos */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <span className="text-xs uppercase tracking-widest font-headline font-bold text-inverse-on-surface/60">
          Trusted by leading teams
        </span>
      </div>
      <div className="overflow-hidden mb-6">
        <div className="flex gap-8 items-center whitespace-nowrap">
          <div className="flex gap-8 items-center animate-marquee">
            {[...COMPANIES, ...COMPANIES].map((name, i) => (
              <div
                key={i}
                className="shrink-0 px-6 py-3 bg-white/60 rounded-xl border border-outline-variant/10 font-headline font-bold text-inverse-on-surface/50 text-sm tracking-tight"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry marquee */}
      <div className="overflow-hidden">
        <div className="flex gap-16 items-center whitespace-nowrap">
          <div className="flex gap-16 items-center text-inverse-on-surface font-headline font-bold opacity-30 animate-marquee" style={{ animationDuration: "40s", animationDirection: "reverse" }}>
            {[...INDUSTRIES, ...INDUSTRIES].map(({ icon, label }, i) => (
              <div key={i} className="flex items-center gap-3 text-xl shrink-0">
                <span className="material-symbols-outlined">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
