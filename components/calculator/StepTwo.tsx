"use client";

import clsx from "clsx";
import { UserInputs } from "@/data/types";

interface Props {
  inputs: UserInputs;
  onChange: (partial: Partial<UserInputs>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEPARTMENTS = [
  "Sales & Business Development",
  "Marketing",
  "Finance & Accounting",
  "Human Resources / Recruiting",
  "Operations / Admin",
  "IT / Engineering",
  "Customer Support / Success",
  "Legal / Compliance",
  "Executive / Leadership",
];

const PAIN_POINTS = [
  { emoji: "🔄", label: "Too Much Manual Data Entry" },
  { emoji: "🐢", label: "Slow Lead Response Time" },
  { emoji: "📊", label: "Reporting Takes Hours Every Week" },
  { emoji: "🔗", label: "Systems Don't Talk to Each Other" },
  { emoji: "💸", label: "Revenue Leaking from Manual Errors" },
  { emoji: "👤", label: "Can't Scale Without Hiring More People" },
  { emoji: "📋", label: "Compliance / Audit Prep is Painful" },
  { emoji: "🤖", label: "Want to Use AI But Don't Know Where to Start" },
  { emoji: "⏰", label: 'Team Spends Too Much Time on "Glue Work"' },
  { emoji: "📧", label: "Inbox Overload / Communication Chaos" },
];

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export default function StepTwo({ inputs, onChange, onNext, onBack }: Props) {
  const canProceed = inputs.departments.length >= 2;

  return (
    <div className="animate-in fade-in duration-300" role="group" aria-labelledby="step2-heading">
      <h2 id="step2-heading" className="font-headline font-bold text-2xl text-on-surface mb-1">
        Where does it hurt?
      </h2>
      <p className="text-on-surface-variant text-sm mb-8">
        Select the departments and pain points most relevant to your business.
      </p>

      {/* Departments */}
      <fieldset className="mb-8">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-1">
          Target Departments <span className="text-error">*</span>
        </legend>
        <p className="text-xs text-outline mb-3">Select at least 2</p>
        <div className="flex flex-wrap gap-2" role="group">
          {DEPARTMENTS.map((dept) => {
            const active = inputs.departments.includes(dept);
            return (
              <button
                key={dept}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ departments: toggle(inputs.departments, dept) })}
                className={clsx(
                  "px-3 py-2 rounded-full border text-xs font-label font-medium transition-all min-h-[44px]",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-outline-variant/30 bg-surface-container text-on-surface-variant hover:border-outline-variant/60 hover:text-on-surface"
                )}
              >
                {dept}
              </button>
            );
          })}
        </div>
        {inputs.departments.length > 0 && inputs.departments.length < 2 && (
          <p className="text-xs text-error mt-2">Please select at least 2 departments</p>
        )}
      </fieldset>

      {/* Pain Points */}
      <fieldset className="mb-10">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-1">
          Primary Pain Points
        </legend>
        <p className="text-xs text-outline mb-3">Select your top pain points (up to 3 recommended)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group">
          {PAIN_POINTS.map((pp) => {
            const active = inputs.painPoints.includes(pp.label);
            return (
              <button
                key={pp.label}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ painPoints: toggle(inputs.painPoints, pp.label) })}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all min-h-[44px]",
                  active
                    ? "border-primary bg-primary/10"
                    : "border-outline-variant/30 bg-surface-container hover:border-outline-variant/60"
                )}
              >
                <span className="text-xl shrink-0">{pp.emoji}</span>
                <span
                  className={clsx(
                    "text-sm font-label font-medium",
                    active ? "text-primary" : "text-on-surface-variant"
                  )}
                >
                  {pp.label}
                </span>
                {active && (
                  <span className="material-symbols-outlined text-primary text-sm ml-auto shrink-0">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60 font-headline font-bold text-sm transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          data-event="step_2_complete"
          className={clsx(
            "flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-headline font-bold text-sm transition-all",
            canProceed
              ? "bg-primary-container text-white hover:bg-[#2B6BC4] active:scale-95"
              : "bg-surface-container-high text-outline cursor-not-allowed"
          )}
        >
          Next: Your Current Stack →
        </button>
      </div>
    </div>
  );
}
