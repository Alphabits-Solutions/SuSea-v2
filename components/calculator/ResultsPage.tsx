"use client";

import Link from "next/link";
import { CalculationResults, UserInputs } from "@/data/types";
import AnimatedCounter from "./AnimatedCounter";
import WorkflowCard from "./WorkflowCard";
import SavingsChart from "./SavingsChart";
import RoadmapTimeline from "./RoadmapTimeline";
import ShareCard from "./ShareCard";

interface Props {
  results: CalculationResults;
  inputs: UserInputs;
  onReset: () => void;
}

const STAT_CARDS = (results: CalculationResults) => [
  {
    label: "Total Estimated Savings",
    value: results.totalSavings,
    prefix: "$",
    suffix: "/year",
    color: "text-[#4CAF50]",
    icon: "savings",
  },
  {
    label: "Hours Saved Per Month",
    value: results.totalHoursSaved,
    suffix: " hrs/mo",
    color: "text-primary",
    icon: "schedule",
  },
  {
    label: "Automation Opportunities",
    value: results.totalOpportunities,
    suffix: " workflows",
    color: "text-secondary-container",
    icon: "auto_awesome",
  },
  {
    label: "Weeks to First ROI",
    value: results.weeksTofirstROI,
    suffix: " weeks",
    color: "text-[#c4a8ff]",
    icon: "rocket_launch",
  },
];

export default function ResultsPage({ results, inputs, onReset }: Props) {
  const handlePrint = () => window.print();

  return (
    <div className="animate-in fade-in duration-500 space-y-12" data-event="results_viewed">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-[#4CAF50]/10 border border-[#4CAF50]/30 text-[#4CAF50] text-xs font-label font-bold uppercase tracking-widest mb-4">
          Your Personalized Automation Roadmap
        </span>
        <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface mb-3">
          {inputs.name ? `${inputs.name.split(" ")[0]}'s` : "Your"} Automation Savings Report
        </h2>
        <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
          Based on your {inputs.industry} business with {inputs.teamSize} — here are your
          top automation opportunities ranked by potential impact.
        </p>
      </div>

      {/* Hero stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS(results).map((card) => (
          <div
            key={card.label}
            className="glass-panel border border-outline-variant/10 rounded-xl p-5 text-center"
          >
            <span className={`material-symbols-outlined text-2xl mb-2 block ${card.color}`}>
              {card.icon}
            </span>
            <div className={`font-mono text-2xl sm:text-3xl font-bold ${card.color} mb-1`}>
              <AnimatedCounter
                target={card.value}
                prefix={card.prefix}
                suffix={card.suffix}
                duration={2000}
              />
            </div>
            <div className="text-xs text-on-surface-variant font-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Top 10 workflows */}
      <section aria-labelledby="workflows-heading">
        <div className="flex items-center justify-between mb-5">
          <h3
            id="workflows-heading"
            className="font-headline font-bold text-xl text-on-surface"
          >
            Top 10 Automation Opportunities
          </h3>
          <span className="text-xs font-label text-on-surface-variant">
            Sorted by impact score
          </span>
        </div>
        <div className="space-y-4">
          {results.topWorkflows.map((workflow, i) => (
            <WorkflowCard key={workflow.id} workflow={workflow} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Savings by department chart */}
      {results.departmentBreakdown.length > 1 && (
        <section
          aria-labelledby="chart-heading"
          className="glass-panel border border-outline-variant/10 rounded-xl p-6"
        >
          <h3
            id="chart-heading"
            className="font-headline font-bold text-xl text-on-surface mb-6"
          >
            Savings Breakdown by Function
          </h3>
          <SavingsChart data={results.departmentBreakdown} />
        </section>
      )}

      {/* Implementation roadmap */}
      <section aria-labelledby="roadmap-heading">
        <h3
          id="roadmap-heading"
          className="font-headline font-bold text-xl text-on-surface mb-2"
        >
          Implementation Roadmap
        </h3>
        <p className="text-sm text-on-surface-variant mb-6">
          The Crawl, Walk, Run framework — prioritizing fast wins first, then strategic depth.
        </p>
        <RoadmapTimeline phaseBreakdown={results.phaseBreakdown} />
      </section>

      {/* CTA */}
      <section className="glass-panel border border-secondary-container/20 rounded-xl p-8 text-center">
        <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface mb-3">
          Ready to Turn This Roadmap Into Reality?
        </h3>
        <p className="text-on-surface-variant text-sm max-w-lg mx-auto mb-8">
          Book a free 30-minute strategy call with our automation architects. We&rsquo;ll walk
          through your top 3 opportunities and build an implementation plan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-secondary-container text-white font-headline font-bold text-base hover:bg-[#F07A2A] active:scale-95 transition-all"
          >
            Book a Free Strategy Call →
          </Link>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60 font-headline font-bold text-sm transition-all"
          >
            Download as PDF →
          </button>
        </div>
      </section>

      {/* Share */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <ShareCard totalSavings={results.totalSavings} />
        <button
          onClick={onReset}
          className="text-xs text-outline hover:text-on-surface-variant transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Start over
        </button>
      </div>

      {/* Powered by footer */}
      <div className="text-center pt-4 border-t border-outline-variant/10">
        <p className="text-xs text-outline">
          Powered by{" "}
          <Link href="/" className="text-primary hover:underline">
            Susea.ai
          </Link>{" "}
          — Enterprise AI Agency
        </p>
        <div className="mt-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-label font-bold text-secondary-container hover:underline"
          >
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
