import Image from "next/image";

const COMPANIES = [
  { name: "Balaji Flexipack", src: "/images/logos/balaji-flexipack.webp" },
  { name: "Ignite",           src: "/images/logos/ignite.jpeg" },
  { name: "OverWorld",        src: "/images/logos/overworld.png" },
  { name: "BrainMate",        src: "/images/logos/brainmate.png" },
  { name: "InstantMenu",      src: "/images/logos/instantmenu.png" },
  { name: "V 1979",           src: "/images/logos/v1979.png" },
  { name: "SourceMate",       src: "/images/logos/sourcemate.png" },
  { name: "Sole Cookware",    src: "/images/logos/sole-cookware.webp" },
  { name: "Valiant Products", src: "/images/logos/valiant-products.png" },
  { name: "eliora",           src: "/images/logos/eliora.webp" },
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
            {[...COMPANIES, ...COMPANIES].map(({ name, src }, i) => (
              <div
                key={i}
                className="shrink-0 px-6 py-3 bg-white rounded-xl border border-outline-variant/10 flex items-center justify-center"
                style={{ minWidth: "160px", height: "64px" }}
              >
                <Image
                  src={src}
                  alt={name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
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
