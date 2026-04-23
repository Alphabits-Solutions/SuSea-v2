"use client";

import { useState } from "react";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ai-agents", label: "AI Agents" },
  { key: "consulting", label: "Consulting" },
  { key: "build", label: "Build" },
  { key: "security", label: "Security" },
  { key: "industry", label: "Industry" },
];

export type CaseStudy = {
  id: string;
  industry: string;
  categories: string[];
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  extra?: string;
  span: string;
  tagColor: string;
};

export default function CaseStudiesGrid({
  caseStudies,
  stats,
}: {
  caseStudies: CaseStudy[];
  stats: { value: string; color: string; label: string }[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible = caseStudies.filter(
    (cs) => activeFilter === "all" || cs.categories.includes(activeFilter)
  );

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 px-8 max-w-7xl mx-auto pb-8">
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
          {stats.map(({ value, color, label }) => (
            <div key={value} className="flex flex-col gap-4 text-center">
              <span className={`font-headline text-5xl font-bold ${color}`}>{value}</span>
              <p className="font-body text-on-surface-variant text-sm max-w-[200px] mx-auto uppercase tracking-tighter">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
