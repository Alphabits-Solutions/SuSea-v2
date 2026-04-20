"use client";

import clsx from "clsx";
import { UserInputs } from "@/data/types";

interface Props {
  inputs: UserInputs;
  onChange: (partial: Partial<UserInputs>) => void;
  onNext: () => void;
}

const INDUSTRIES = [
  "Technology / SaaS",
  "Healthcare / Medical",
  "Manufacturing / Industrial",
  "Finance / Accounting",
  "Real Estate / Property Management",
  "Construction / Field Services",
  "Logistics / 3PL / Supply Chain",
  "Education / Higher Ed",
  "Legal / Compliance",
  "Professional Services / Agencies",
  "Retail / E-Commerce",
];

const TEAM_SIZES = [
  "Solo / 1-5 employees",
  "6-20 employees",
  "21-50 employees",
  "51-200 employees",
  "200+ employees",
];

const BUSINESS_STAGES = [
  { label: "Early Stage", sub: "Pre-revenue or <$1M ARR", value: "Early" },
  { label: "Growth Stage", sub: "Scaling, $1M–$10M ARR", value: "Growth" },
  { label: "Established", sub: "$10M+ ARR", value: "Established" },
];

export default function StepOne({ inputs, onChange, onNext }: Props) {
  const canProceed = !!inputs.industry && !!inputs.teamSize && !!inputs.businessStage;

  return (
    <div
      className="animate-in fade-in duration-300"
      role="group"
      aria-labelledby="step1-heading"
    >
      <h2
        id="step1-heading"
        className="font-headline font-bold text-2xl text-on-surface mb-1"
      >
        Tell us about your business
      </h2>
      <p className="text-on-surface-variant text-sm mb-8">
        This helps us filter 220+ automations to the ones most relevant to you.
      </p>

      {/* Industry */}
      <fieldset className="mb-8">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Industry Sector <span className="text-error">*</span>
        </legend>
        <div className="relative">
          <select
            value={inputs.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            className="w-full appearance-none bg-surface-container border border-outline-variant/30 focus:border-primary text-on-surface px-4 py-3 pr-10 rounded-xl outline-none transition-colors text-sm font-body cursor-pointer"
            aria-required="true"
          >
            <option value="" disabled>
              Select your industry…
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-sm">
            expand_more
          </span>
        </div>
      </fieldset>

      {/* Team Size */}
      <fieldset className="mb-8">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Team Size <span className="text-error">*</span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5" role="radiogroup">
          {TEAM_SIZES.map((size) => {
            const active = inputs.teamSize === size;
            return (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ teamSize: size })}
                className={clsx(
                  "py-3 px-2 rounded-xl border text-center text-xs font-label font-medium transition-all min-h-[44px]",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-outline-variant/30 bg-surface-container text-on-surface-variant hover:border-outline-variant/60 hover:text-on-surface"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Business Stage */}
      <fieldset className="mb-10">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Business Stage <span className="text-error">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="radiogroup">
          {BUSINESS_STAGES.map((stage) => {
            const active = inputs.businessStage === stage.value;
            return (
              <button
                key={stage.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ businessStage: stage.value })}
                className={clsx(
                  "py-4 px-4 rounded-xl border text-left transition-all min-h-[44px]",
                  active
                    ? "border-primary bg-primary/10"
                    : "border-outline-variant/30 bg-surface-container hover:border-outline-variant/60"
                )}
              >
                <div
                  className={clsx(
                    "font-label font-bold text-sm mb-0.5",
                    active ? "text-primary" : "text-on-surface"
                  )}
                >
                  {stage.label}
                </div>
                <div className="text-xs text-on-surface-variant">{stage.sub}</div>
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        onClick={onNext}
        disabled={!canProceed}
        data-event="step_1_complete"
        className={clsx(
          "w-full sm:w-auto px-8 py-3.5 rounded-xl font-headline font-bold text-sm transition-all",
          canProceed
            ? "bg-primary-container text-white hover:bg-[#2B6BC4] active:scale-95"
            : "bg-surface-container-high text-outline cursor-not-allowed"
        )}
      >
        Next: Where Does It Hurt? →
      </button>
    </div>
  );
}
