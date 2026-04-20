import { ScoredWorkflow } from "@/data/types";

interface PhaseData {
  phase: number;
  workflows: ScoredWorkflow[];
  savings: number;
}

interface Props {
  phaseBreakdown: PhaseData[];
}

const PHASE_META = [
  {
    phase: 1,
    label: "Quick Wins",
    period: "Weeks 1–4",
    tagline: "Get these live in days, not months",
    color: "text-[#4CAF50]",
    borderColor: "border-[#4CAF50]",
    bgColor: "bg-[#1a3a1a]",
    dotColor: "bg-[#4CAF50]",
    icon: "bolt",
  },
  {
    phase: 2,
    label: "Structural Automation",
    period: "Months 2–6",
    tagline: "System-level integrations and data flows",
    color: "text-primary",
    borderColor: "border-primary",
    bgColor: "bg-primary/10",
    dotColor: "bg-primary",
    icon: "account_tree",
  },
  {
    phase: 3,
    label: "AI Agents & Intelligence",
    period: "Months 6+",
    tagline: "Autonomous operations and competitive advantage",
    color: "text-secondary-container",
    borderColor: "border-secondary-container",
    bgColor: "bg-secondary-container/10",
    dotColor: "bg-secondary-container",
    icon: "smart_toy",
  },
];

export default function RoadmapTimeline({ phaseBreakdown }: Props) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-8 bottom-0 w-px bg-outline-variant/20 hidden sm:block" />

      <div className="space-y-6">
        {PHASE_META.map((meta) => {
          const phaseData = phaseBreakdown.find((p) => p.phase === meta.phase);
          if (!phaseData || phaseData.workflows.length === 0) return null;

          return (
            <div key={meta.phase} className="flex gap-6">
              {/* Timeline dot */}
              <div className="hidden sm:flex flex-col items-center shrink-0 pt-1">
                <div
                  className={`w-10 h-10 rounded-full ${meta.bgColor} border ${meta.borderColor} flex items-center justify-center z-10`}
                >
                  <span className={`material-symbols-outlined text-base ${meta.color}`}>
                    {meta.icon}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div
                className={`flex-1 glass-panel border ${meta.borderColor}/20 rounded-xl p-5`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-xs font-label font-bold uppercase tracking-widest ${meta.color}`}
                      >
                        Phase {meta.phase}
                      </span>
                      <span className="text-xs text-outline">·</span>
                      <span className="text-xs text-on-surface-variant font-mono">
                        {meta.period}
                      </span>
                    </div>
                    <h4 className="font-headline font-bold text-on-surface text-base">
                      {meta.label}
                    </h4>
                    <p className="text-xs text-outline mt-0.5 italic">&ldquo;{meta.tagline}&rdquo;</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg font-bold text-[#4CAF50]">
                      ${phaseData.savings.toLocaleString("en-US")}/yr
                    </div>
                    <div className="text-xs text-outline">expected savings</div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {phaseData.workflows.map((w) => (
                    <li key={w.id} className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dotColor}`}
                      />
                      <span className="text-sm text-on-surface-variant">{w.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
