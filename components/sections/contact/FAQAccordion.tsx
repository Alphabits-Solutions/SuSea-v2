"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. Susea.ai operates as a globally distributed boutique agency. We currently serve clients across 4 continents and manage time zones with a 'follow-the-sun' model for engineering support.",
  },
  {
    question: "What is your typical pricing model?",
    answer:
      "We avoid hourly billing to ensure alignment on outcomes. Most projects are scoped as fixed-fee engagements or monthly recurring strategic partnerships for ongoing AI optimization.",
  },
  {
    question: "How fast can we start?",
    answer:
      "Upon agreement of the scope, we typically kick off within 10 business days. Our process begins with a 2-day discovery intensive to align all technical stakeholders.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-on-surface rounded-3xl p-12 md:p-20 text-surface" aria-labelledby="faq-heading">
      <div className="mb-16">
        <h3 id="faq-heading" className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight">
          Quick Answers
        </h3>
        <div className="w-24 h-1 bg-secondary mt-6" />
      </div>

      <dl className="space-y-4">
        {FAQS.map(({ question, answer }, i) => (
          <div
            key={i}
            className={`group border-b border-surface-variant/20 py-8 ${i === FAQS.length - 1 ? "border-b-0" : ""}`}
          >
            <dt>
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-2xl font-headline font-bold">{question}</span>
                <span
                  className={`material-symbols-outlined transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                >
                  add
                </span>
              </button>
            </dt>
            {open === i && (
              <dd className="mt-4 text-surface-variant max-w-[620px] leading-relaxed">
                {answer}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
