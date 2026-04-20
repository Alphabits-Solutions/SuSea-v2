"use client";

import { useState } from "react";
import clsx from "clsx";
import { ScoredWorkflow, BadgeType } from "@/data/types";

interface Props {
  workflow: ScoredWorkflow;
  rank: number;
}

const BADGE_STYLES: Record<BadgeType, string> = {
  "Quick Win": "bg-[#1a3a1a] text-[#4CAF50] border border-[#4CAF50]/30",
  "High Impact": "bg-primary-container/20 text-primary border border-primary/30",
  "Strategic": "bg-[#2a1a00] text-secondary-container border border-secondary-container/30",
  "AI-Powered": "bg-[#1e1040] text-[#c4a8ff] border border-[#c4a8ff]/30",
};

const COMPLEXITY_COLORS = {
  Low: "bg-[#4CAF50]",
  Medium: "bg-primary",
  High: "bg-secondary-container",
};

export default function WorkflowCard({ workflow, rank }: Props) {
  const [expanded, setExpanded] = useState(false);

  const formattedSavings = Math.round(workflow.adjustedSavings).toLocaleString("en-US");
  const formattedHours = Math.round(workflow.adjustedTimeSaved);

  return (
    <div className="glass-panel border border-outline-variant/10 rounded-xl p-6 transition-all duration-200 hover:border-outline-variant/25">
      {/* Header row */}
      <div className="flex items-start gap-4 mb-3">
        <span className="font-mono text-outline text-sm font-medium mt-0.5 shrink-0 w-6">
          #{rank}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-headline font-bold text-on-surface text-base leading-snug">
              {workflow.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {workflow.badge.map((badge) => (
                <span
                  key={badge}
                  className={clsx(
                    "text-[10px] font-label font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                    BADGE_STYLES[badge]
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mb-2">
            <span className="font-label font-medium uppercase tracking-wider text-primary/70">
              {workflow.function}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-on-surface-variant/50">·</span>
              Complexity:
              <span className="flex items-center gap-1 ml-1">
                {["Low", "Medium", "High"].map((level, i) => (
                  <span
                    key={level}
                    className={clsx(
                      "h-1.5 w-6 rounded-full transition-colors",
                      i <= ["Low", "Medium", "High"].indexOf(workflow.complexity)
                        ? COMPLEXITY_COLORS[workflow.complexity]
                        : "bg-outline-variant/30"
                    )}
                  />
                ))}
                <span className="ml-1">{workflow.complexity}</span>
              </span>
            </span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {workflow.description}
          </p>
        </div>
      </div>

      {/* Metrics row */}
      <div className="flex flex-wrap gap-4 mt-4 mb-3 pl-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[#4CAF50] text-sm">💰</span>
          <span className="font-mono text-sm font-medium text-[#4CAF50]">
            ${formattedSavings}/yr
          </span>
          <span className="text-xs text-outline">est. savings</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-primary text-sm">⏱</span>
          <span className="font-mono text-sm font-medium text-primary">
            {formattedHours} hrs/mo
          </span>
          <span className="text-xs text-outline">saved</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-on-surface-variant text-sm">🔧</span>
          <span className="text-xs text-on-surface-variant">
            {workflow.toolsInvolved.slice(0, 3).join(", ")}
            {workflow.toolsInvolved.length > 3 ? ` +${workflow.toolsInvolved.length - 3}` : ""}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pl-10 mb-3">
        {workflow.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-label uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center gap-1.5 pl-10 text-xs font-label font-medium text-primary/70 hover:text-primary transition-colors"
        aria-expanded={expanded}
      >
        <span
          className={clsx(
            "material-symbols-outlined text-sm transition-transform duration-200",
            expanded ? "rotate-90" : ""
          )}
        >
          play_arrow
        </span>
        {expanded ? "Hide" : "How this works"}
      </button>

      {expanded && (
        <div className="mt-3 pl-10 text-sm text-on-surface-variant leading-relaxed border-l-2 border-primary/20 ml-10 pl-4">
          {workflow.howItWorks}
        </div>
      )}
    </div>
  );
}
