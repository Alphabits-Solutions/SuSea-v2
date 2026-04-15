const STATS = [
  { value: "6+", label: "Industries" },
  { value: "7D", label: "Deployment" },
  { value: "4W", label: "MVP Cycle" },
  { value: "100%", label: "Ownership" },
];

const TESTIMONIALS = [
  {
    quote:
      "Susea.ai delivered an AI agent for our supply chain tracking in half the time we expected. It's now handling 80% of routine inquiries.",
    role: "Chief Operating Officer",
    company: "Global Manufacturing Corp",
  },
  {
    quote:
      "Their technical expertise is unmatched. They fixed a legacy integration issue that three other agencies couldn't touch in just 48 hours.",
    role: "Technical Director",
    company: "Retail Solutions Inc",
  },
  {
    quote:
      "Most AI agencies talk in buzzwords. Susea talks in ROI. They built us a custom document analysis tool that saves our legal team 20 hours a week.",
    role: "Managing Partner",
    company: "Regional Finance Group",
  },
];

export default function StatsTestimonials() {
  return (
    <section className="bg-[#F7F7F5] py-32" aria-label="Stats and testimonials">
      <div className="max-w-7xl mx-auto px-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="signature-text-gradient text-5xl md:text-7xl font-headline font-extrabold mb-2">
                {value}
              </div>
              <p className="text-inverse-on-surface font-label font-bold uppercase tracking-widest text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(({ quote, role, company }) => (
            <figure
              key={company}
              className="bg-white p-8 rounded-xl border border-outline-variant/10 shadow-sm"
            >
              <blockquote className="text-lg text-inverse-on-surface italic mb-8">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full signature-gradient shrink-0" aria-hidden />
                <div>
                  <cite className="not-italic font-headline font-bold text-inverse-on-surface block">
                    {role}
                  </cite>
                  <span className="text-sm text-inverse-on-surface/60">{company}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
