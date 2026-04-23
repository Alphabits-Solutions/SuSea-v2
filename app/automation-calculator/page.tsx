import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WizardContainer from "@/components/calculator/WizardContainer";
import { buildMetadata, buildBreadcrumbs } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Savings Calculator — Free ROI Estimator",
  description:
    "Calculate your business's potential AI automation savings across 200+ workflows. Get a free personalized implementation roadmap with realistic ROI projections.",
  path: "/automation-calculator",
});

const TOOL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Automation Savings Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free interactive tool that calculates your business's potential automation savings across 200+ workflows and generates a personalized implementation roadmap.",
  url: "https://susea.ai/automation-calculator",
  provider: { "@type": "Organization", name: "Susea.ai", url: "https://susea.ai" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How accurate are these savings estimates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Based on industry benchmarks for US labor rates ($40/hr admin, $100/hr specialized) and typical volume for mid-sized companies. Your actual savings may vary based on current process efficiency.",
      },
    },
    {
      "@type": "Question",
      name: "How long does implementation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quick Win automations can be live in 1–2 weeks. Structural integrations typically take 4–8 weeks. AI agent workflows may take 2–3 months for full deployment.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to change my existing tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Most automations integrate with your current stack. We build bridges between your existing tools, not replacements.",
      },
    },
    {
      "@type": "Question",
      name: "What does Susea.ai charge for implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every engagement starts with a free 30-minute strategy call. Project pricing depends on scope and complexity — typically ranging from $3K for quick wins to $50K+ for enterprise AI agent deployments.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We do not store any data from this calculator. Your responses are used only to generate your personalized recommendations. Email is captured solely for delivering your report.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my results with my team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Use the share button on your results page or download the PDF report to distribute internally.",
      },
    },
  ],
};

const TRUST_ITEMS = [
  { icon: "auto_awesome", label: "200+ Automation Workflows" },
  { icon: "business", label: "11 Industries" },
  { icon: "calculate", label: "Instant ROI Estimate" },
  { icon: "credit_card_off", label: "No Credit Card" },
];

const FAQS = [
  {
    q: "How accurate are these savings estimates?",
    a: "Based on industry benchmarks for US labor rates ($40/hr admin, $100/hr specialized) and typical volume for mid-sized companies. Your actual savings may vary based on current process efficiency.",
  },
  {
    q: "How long does implementation take?",
    a: "Quick Win automations can be live in 1–2 weeks. Structural integrations typically take 4–8 weeks. AI agent workflows may take 2–3 months for full deployment.",
  },
  {
    q: "Do I need to change my existing tools?",
    a: "No. Most automations integrate with your current stack. We build bridges between your existing tools, not replacements.",
  },
  {
    q: "What does Susea.ai charge for implementation?",
    a: "Every engagement starts with a free 30-minute strategy call. Project pricing depends on scope and complexity — typically ranging from $3K for quick wins to $50K+ for enterprise AI agent deployments.",
  },
  {
    q: "Is my data secure?",
    a: "We do not store any data from this calculator. Your responses are used only to generate your personalized recommendations. Email is captured solely for delivering your report.",
  },
  {
    q: "Can I share my results with my team?",
    a: "Yes! Use the share button on your results page or download the PDF report to distribute internally.",
  },
];

const BREADCRUMB_SCHEMA = buildBreadcrumbs([
  { name: "Home", url: "https://susea.ai" },
  { name: "Automation Calculator", url: "https://susea.ai/automation-calculator" },
]);

export default function AutomationCalculatorPage() {
  return (
    <>
      <JsonLd data={TOOL_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd data={BREADCRUMB_SCHEMA} />

      <div className="pt-24 pb-20 px-4 sm:px-8 max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-12" aria-label="Page hero">
          <span className="inline-block font-label font-bold text-xs uppercase tracking-widest text-secondary-container mb-4">
            Free Diagnostic Tool
          </span>
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-tight mb-5">
            How Much Is Manual Work{" "}
            <span className="signature-text-gradient">Costing Your Business?</span>
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Answer 4 quick questions. Get a personalized automation roadmap with estimated
            annual savings across 200+ workflows — in 60 seconds.
          </p>

          {/* Trust bar */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label="Trust indicators"
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 text-xs text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[#4CAF50] text-sm">check_circle</span>
                {item.label}
              </div>
            ))}
          </div>
        </section>

        {/* Wizard */}
        <section aria-label="Automation savings calculator">
          <WizardContainer />
        </section>

        {/* FAQ */}
        <section className="mt-20" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="font-headline font-bold text-2xl text-on-surface text-center mb-8"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="glass-panel border border-outline-variant/10 rounded-xl p-6"
              >
                <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
