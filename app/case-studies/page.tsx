import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Results, Not Promises",
  description:
    "Real problems. Real solutions. Real numbers. Explore how Susea.ai has engineered efficiency for global enterprises and rapid-growth startups.",
  path: "/case-studies",
});

const CASE_STUDIES = [
  {
    id: "real-estate-lead-pipeline",
    industry: "Real Estate",
    category: "ai-agents industry",
    title: "Lead Qualification Pipeline",
    desc: "Automated lead vetting and classification for a national brokerage, significantly increasing conversion rates.",
    metric: "+40%",
    metricLabel: "Qualified Meetings",
    span: "md:col-span-8",
  },
  {
    id: "healthcare-triage",
    industry: "Healthcare",
    category: "ai-agents industry",
    title: "Autonomous Patient Triage",
    desc: "AI-powered triage agent that reduced wait times and improved patient routing accuracy.",
    metric: "−60%",
    metricLabel: "Admin Workload",
    span: "md:col-span-4",
  },
  {
    id: "finance-compliance",
    industry: "Finance",
    category: "consulting security",
    title: "Automated Compliance Reporting",
    desc: "End-to-end compliance pipeline that cut reporting overhead from weeks to hours.",
    metric: "−80%",
    metricLabel: "Reporting Time",
    span: "md:col-span-4",
  },
  {
    id: "retail-recommendation",
    industry: "Retail",
    category: "build industry",
    title: "Personalisation Engine",
    desc: "Custom recommendation model integrated with existing e-commerce stack, driving measurable revenue lift.",
    metric: "+31%",
    metricLabel: "Conversion Rate",
    span: "md:col-span-4",
  },
  {
    id: "saas-agent-rescue",
    industry: "SaaS",
    category: "ai-agents build",
    title: "Broken Agent Rescue",
    desc: "Diagnosed and rebuilt a malfunctioning LLM pipeline within 48 hours, restoring full production uptime.",
    metric: "48h",
    metricLabel: "Time to Resolution",
    span: "md:col-span-4",
  },
  {
    id: "manufacturing-predictive",
    industry: "Manufacturing",
    category: "ai-agents industry",
    title: "Predictive Maintenance Agent",
    desc: "Real-time sensor monitoring agent that predicted equipment failure 72 hours in advance.",
    metric: "−35%",
    metricLabel: "Unplanned Downtime",
    span: "md:col-span-8",
  },
];

const ITEM_LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Susea.ai Case Studies",
  url: "https://susea.ai/case-studies",
  itemListElement: CASE_STUDIES.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cs.title,
    description: cs.desc,
  })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={ITEM_LIST_SCHEMA} />

      <div className="pt-24">
        {/* Hero */}
        <header className="px-8 pt-20 pb-16 max-w-7xl mx-auto">
          <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold">
            Proven Outcomes
          </span>
          <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-none max-w-4xl mt-4 mb-6">
            Results,{" "}
            <br />
            <span className="signature-text-gradient">Not Promises.</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-xl">
            Real problems. Real solutions. Real numbers. Explore how we&apos;ve
            engineered efficiency for global enterprises and rapid-growth
            startups.
          </p>
        </header>

        {/* Grid */}
        <section className="bg-[#e4e2e4] py-32 px-8" aria-label="Case study grid">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {CASE_STUDIES.map(({ id, industry, title, desc, metric, metricLabel, span }) => (
                <article
                  key={id}
                  className={`${span} bg-white rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="p-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-primary-container/10 text-primary-container text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                        {industry}
                      </span>
                      <h3 className="font-headline text-2xl md:text-3xl font-bold text-surface tracking-tight mb-4">
                        {title}
                      </h3>
                      <p className="text-surface-variant text-lg max-w-lg mb-8">{desc}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                      <div className="flex flex-col">
                        <span className="signature-text-gradient font-headline text-6xl md:text-7xl font-black">
                          {metric}
                        </span>
                        <span className="font-label text-surface-variant uppercase text-xs tracking-widest font-bold">
                          {metricLabel}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-surface font-bold hover:gap-4 transition-all">
                        Read More{" "}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
              Want results like these?
            </h2>
            <p className="text-on-surface-variant text-lg mb-10">
              Let&apos;s find the high-ROI AI opportunity inside your operation.
            </p>
            <Link
              href="/contact"
              className="signature-gradient text-white font-headline font-bold px-10 py-5 rounded-xl text-lg hover:shadow-2xl transition-all active:scale-95 inline-block"
            >
              Start the Conversation →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
