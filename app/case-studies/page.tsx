"use client";

import { useState } from "react";
import Link from "next/link";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ai-agents", label: "AI Agents" },
  { key: "consulting", label: "Consulting" },
  { key: "build", label: "Build" },
  { key: "security", label: "Security" },
  { key: "industry", label: "Industry" },
];

const CASE_STUDIES = [
  {
    id: "real-estate-lead-pipeline",
    industry: "Real Estate",
    categories: ["ai-agents", "industry"],
    title: "Lead Qualification Pipeline",
    desc: "Automated lead vetting and classification for a national brokerage, significantly increasing conversion rates.",
    metric: "+40%",
    metricLabel: "Qualified Meetings",
    span: "md:col-span-8",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "healthcare-triage",
    industry: "Healthcare",
    categories: ["ai-agents", "industry"],
    title: "Autonomous Patient Triage",
    desc: "",
    metric: "73%",
    metricLabel: "No-shows cut by",
    span: "md:col-span-4",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "fintech-strategy",
    industry: "Fintech Scale-up",
    categories: ["consulting", "industry"],
    title: "AI Strategy for Legacy Pipelines",
    desc: "Optimized legacy data architecture for LLM readiness, enabling faster model deployment cycles.",
    metric: "24%",
    metricLabel: "Accuracy Increase",
    extra: "$210k/yr saved",
    span: "md:col-span-8",
    tagColor: "bg-tertiary-container/10 text-tertiary-container",
  },
  {
    id: "edtech-tutor",
    industry: "EdTech",
    categories: ["build", "industry"],
    title: "AI Tutor Architecture",
    desc: "",
    metric: "2.5x",
    metricLabel: "Student Engagement",
    span: "md:col-span-4",
    tagColor: "bg-tertiary-container/10 text-tertiary-container",
  },
  {
    id: "saas-marketplace",
    industry: "SaaS Marketplace",
    categories: ["build"],
    title: "Marketplace MVP Build",
    desc: "",
    metric: "4 Wks",
    metricLabel: "Launch Timeline",
    span: "md:col-span-4",
    tagColor: "bg-secondary-container/10 text-secondary-container",
  },
  {
    id: "voice-agents",
    industry: "Professional Services",
    categories: ["ai-agents", "industry"],
    title: "Enterprise Voice Agents",
    desc: "Deploying human-like voice agents to handle high-volume inbound customer queries across 12 timezones.",
    metric: "65%",
    metricLabel: "OPEX Reduction",
    span: "md:col-span-8",
    tagColor: "bg-secondary-container/10 text-secondary-container",
  },
  {
    id: "fintech-api-security",
    industry: "Fintech Security",
    categories: ["security", "industry"],
    title: "API Hardening & Testing",
    desc: "",
    metric: "99.9%",
    metricLabel: "Threat Reduction",
    span: "md:col-span-4",
    tagColor: "bg-outline/10 text-outline",
  },
  {
    id: "legal-contracts",
    industry: "Legal",
    categories: ["security", "industry"],
    title: "Contract Analysis Engine",
    desc: "",
    metric: "90%",
    metricLabel: "Faster Review Cycle",
    span: "md:col-span-4",
    tagColor: "bg-outline/10 text-outline",
  },
  {
    id: "healthtech-app",
    industry: "HealthTech",
    categories: ["build", "industry"],
    title: "Native AI Health App",
    desc: "",
    metric: "4.9★",
    metricLabel: "App Store Rating",
    span: "md:col-span-4",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "enterprise-governance",
    industry: "Global 2000",
    categories: ["consulting", "security"],
    title: "Enterprise AI Governance",
    desc: "",
    metric: "100%",
    metricLabel: "Regional Compliance",
    span: "md:col-span-4",
    tagColor: "bg-tertiary-container/10 text-tertiary-container",
  },
  {
    id: "fintech-security-automation",
    industry: "FinTech",
    categories: ["industry"],
    title: "Security Protocol Automation",
    desc: "",
    metric: "53%",
    metricLabel: "Less admin work",
    span: "md:col-span-4",
    tagColor: "bg-primary-container/10 text-primary-container",
  },
  {
    id: "hipaa-layer",
    industry: "Healthcare Diagnostic",
    categories: ["security", "industry"],
    title: "HIPAA Privacy Layer",
    desc: "",
    metric: "3 Wks",
    metricLabel: "Audit Ready In",
    span: "md:col-span-4",
    tagColor: "bg-secondary-container/10 text-secondary-container",
  },
];

const STATS = [
  { value: "53%", color: "text-primary", label: "Small business owners report significant efficiency improvements" },
  { value: "30-45%", color: "text-secondary", label: "Reduction in repetitive administrative tasks post-deployment" },
  { value: "2.5x", color: "text-tertiary", label: "Average return on investment within the first six months" },
];

const ITEM_LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Susea.ai Case Studies",
  url: "https://susea.ai/case-studies",
};

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible = CASE_STUDIES.filter(
    (cs) => activeFilter === "all" || cs.categories.includes(activeFilter)
  );

  return (
    <div className="pt-24">
      {/* Hero + Filter */}
      <header className="px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold">
          Proven Outcomes
        </span>
        <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-none max-w-4xl mt-4 mb-6">
          Results,{" "}
          <br />
          <span className="signature-text-gradient">Not Promises.</span>
        </h1>
        <p className="font-body text-lg text-on-surface-variant max-w-xl mb-10">
          Real problems. Real solutions. Real numbers. Explore how we&apos;ve
          engineered efficiency for global enterprises and rapid-growth startups.
        </p>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-6 py-2 rounded-full font-label text-sm font-semibold transition-all ${
                activeFilter === key
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Case Study Grid */}
      <section className="bg-[#e4e2e4] py-32 px-8" aria-label="Case study grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {visible.map(({ id, industry, title, desc, metric, metricLabel, extra, span, tagColor }) => (
              <article
                key={id}
                className={`${span} bg-white rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-500`}
              >
                <div className="p-10 flex flex-col h-full justify-between">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block ${tagColor}`}>
                      {industry}
                    </span>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold text-surface tracking-tight mb-4">
                      {title}
                    </h3>
                    {desc && (
                      <p className="text-surface-variant text-lg max-w-lg mb-8">{desc}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mt-4">
                    <div className="flex flex-col">
                      <span className="signature-text-gradient font-headline text-5xl md:text-6xl font-black">
                        {metric}
                      </span>
                      <span className="font-label text-surface-variant uppercase text-[10px] tracking-widest font-bold">
                        {metricLabel}
                      </span>
                      {extra && (
                        <span className="font-label text-primary font-bold text-[10px] mt-1">{extra}</span>
                      )}
                    </div>
                    <button className="flex items-center gap-2 text-surface font-bold hover:gap-4 transition-all shrink-0">
                      Read More{" "}
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="text-center py-24 text-surface-variant font-headline text-xl">
              No case studies in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-surface py-24 px-8" aria-label="Impact statistics">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-outline-variant/15 py-16">
          {STATS.map(({ value, color, label }) => (
            <div key={value} className="flex flex-col gap-4 text-center">
              <span className={`font-headline text-5xl font-bold ${color}`}>{value}</span>
              <p className="font-body text-on-surface-variant text-sm max-w-[200px] mx-auto uppercase tracking-tighter">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto rounded-xl signature-gradient p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/30 blur-[120px] rounded-full" />
          </div>
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-8">
              Ready to Write Your
              <br />Own Case Study?
            </h2>
            <p className="font-body text-white/80 text-xl max-w-2xl mx-auto mb-12">
              Stop imagining the future. Start building it with precision-engineered AI solutions
              tailored to your unique scaling challenges.
            </p>
            <Link
              href="/contact"
              className="bg-white text-on-primary-fixed px-10 py-5 rounded-full font-headline font-black text-lg hover:scale-105 transition-all shadow-xl shadow-black/20 inline-block"
            >
              Book a Call →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
