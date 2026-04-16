"use client";

import { useState } from "react";

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
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((i) => (i + 1) % TESTIMONIALS.length);

  const { quote, role, company } = TESTIMONIALS[active];

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

        {/* Testimonial slider */}
        <div className="relative max-w-3xl mx-auto">
          <figure className="bg-white p-10 md:p-14 rounded-2xl border border-outline-variant/10 shadow-sm text-center">
            <blockquote className="text-xl md:text-2xl text-inverse-on-surface italic mb-10 leading-relaxed">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full signature-gradient mb-3" aria-hidden />
              <cite className="not-italic font-headline font-bold text-inverse-on-surface block">
                {role}
              </cite>
              <span className="text-sm text-inverse-on-surface/60">{company}</span>
            </figcaption>
          </figure>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-inverse-on-surface text-base">chevron_left</span>
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2 bg-inverse-on-surface"
                      : "w-2 h-2 bg-inverse-on-surface/30 hover:bg-inverse-on-surface/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-inverse-on-surface text-base">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
