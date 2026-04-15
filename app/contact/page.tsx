import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/sections/contact/ContactForm";
import FAQAccordion from "@/components/sections/contact/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "No hard sell. No pitch deck. Just an honest conversation about what you need and whether we can help. Book a strategy session or send us a message.",
  path: "/contact",
});

const CONTACT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Susea.ai",
  url: "https://susea.ai/contact",
  description: "Get in touch with Susea.ai for AI consulting, agents, and development.",
  mainEntity: {
    "@type": "Organization",
    name: "Susea.ai",
    email: "hello@susea.ai",
    url: "https://susea.ai",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Susea.ai operates as a globally distributed boutique agency. We currently serve clients across 4 continents and manage time zones with a 'follow-the-sun' model for engineering support.",
      },
    },
    {
      "@type": "Question",
      name: "What is your typical pricing model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We avoid hourly billing to ensure alignment on outcomes. Most projects are scoped as fixed-fee engagements or monthly recurring strategic partnerships for ongoing AI optimization.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can we start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upon agreement of the scope, we typically kick off within 10 business days. Our process begins with a 2-day discovery intensive to align all technical stakeholders.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={CONTACT_PAGE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Two-column layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32">
          {/* Left: info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 rounded-full border border-outline-variant/30 text-primary font-mono text-xs uppercase tracking-widest">
                Contact
              </span>
              <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter text-on-surface">
                Let&apos;s Talk.
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed max-w-[620px]">
                No hard sell. No pitch deck. Just an honest conversation about
                what you need and whether we can help.
              </p>
            </div>

            {/* Checklist */}
            <ul className="space-y-6" aria-label="What to expect">
              {["30-min intro call", "Clear project scope definition", "Transparent, honest pricing"].map(
                (item) => (
                  <li key={item} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                    </div>
                    <span className="text-lg text-on-surface font-medium">{item}</span>
                  </li>
                )
              )}
            </ul>

            {/* Direct contact */}
            <div className="pt-8 border-t border-outline-variant/10 space-y-8">
              <div className="space-y-4">
                <label className="block font-mono text-xs uppercase tracking-widest text-outline">
                  Direct Lines
                </label>
                <div className="flex flex-col space-y-2">
                  <a
                    href="mailto:hello@susea.ai"
                    className="text-2xl font-headline font-bold text-primary hover:opacity-70 transition-opacity"
                  >
                    hello@susea.ai
                  </a>
                  <a
                    href="#"
                    className="text-lg text-on-surface-variant flex items-center space-x-2"
                  >
                    <span className="material-symbols-outlined text-secondary">chat_bubble</span>
                    <span>WhatsApp for Business</span>
                  </a>
                </div>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://linkedin.com/company/suseaai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">brand_awareness</span>
                </a>
                <a
                  href="https://twitter.com/suseaai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">groups</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: form + calendly */}
          <div className="space-y-12">
            {/* Calendly placeholder */}
            <div className="bg-on-surface rounded-xl p-8 shadow-2xl shadow-primary/5 min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-surface text-4xl">calendar_today</span>
              </div>
              <div>
                <h2 className="text-surface font-headline font-bold text-2xl">
                  Book a Strategy Session
                </h2>
                <p className="text-surface-variant mt-2">
                  Select a time that works for your team.
                </p>
              </div>
              {/* Replace this div with your Calendly embed */}
              <div className="w-full bg-surface-container-low/10 h-64 rounded-xl border-2 border-dashed border-surface-variant/20 flex items-center justify-center">
                <span className="text-surface-variant font-mono text-sm uppercase">
                  Calendly Widget Embed
                </span>
              </div>
            </div>

            <p className="text-on-surface-variant text-sm font-medium text-center">
              Prefer to write first? Fill in the form below.
            </p>

            <ContactForm />
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion />
      </div>
    </>
  );
}
