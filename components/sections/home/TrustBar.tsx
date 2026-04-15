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
    <section className="bg-[#F7F7F5] py-16 overflow-hidden" aria-label="Industries we serve">
      <div className="max-w-7xl mx-auto px-8 mb-10">
        <span className="text-xs uppercase tracking-widest font-headline font-bold text-inverse-on-surface/60">
          Trusted by teams in
        </span>
      </div>
      <div className="flex gap-16 items-center whitespace-nowrap px-8 overflow-hidden">
        <div className="flex gap-16 items-center text-inverse-on-surface font-headline font-bold opacity-40 animate-marquee">
          {[...INDUSTRIES, ...INDUSTRIES].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 text-2xl shrink-0">
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
