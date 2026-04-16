interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  schema?: boolean;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  return (
    <section className="py-24 px-4 md:px-8 bg-surface" aria-labelledby="faq-section-heading">
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-section-heading"
          className="text-3xl md:text-4xl font-bold font-headline mb-12 md:mb-16 text-center"
        >
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10 group"
            >
              <summary className="w-full p-5 md:p-6 text-left flex justify-between items-start gap-4 cursor-pointer list-none">
                <span className="font-bold text-sm md:text-base leading-snug">{q}</span>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform shrink-0 mt-0.5">
                  expand_more
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-on-surface-variant text-sm leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
