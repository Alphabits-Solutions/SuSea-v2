"use client";

import clsx from "clsx";
import { UserInputs } from "@/data/types";

interface Props {
  inputs: UserInputs;
  onChange: (partial: Partial<UserInputs>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TECH_GROUPS = [
  {
    group: "CRM & Sales",
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Close.com", "No CRM / Spreadsheets"],
  },
  {
    group: "Project Management",
    tools: ["Asana", "Monday.com", "Jira", "ClickUp", "Trello", "Notion"],
  },
  {
    group: "Communication",
    tools: ["Slack", "Microsoft Teams", "Google Workspace", "Zoom"],
  },
  {
    group: "Finance",
    tools: ["QuickBooks", "Xero", "NetSuite", "Stripe", "FreshBooks", "Spreadsheets Only"],
  },
  {
    group: "HR",
    tools: ["Gusto", "Rippling", "BambooHR", "ADP", "None / Manual"],
  },
];

const INDUSTRY_TOOLS: Record<string, { label: string; tools: string[] }> = {
  "Healthcare / Medical": {
    label: "Healthcare",
    tools: ["EHR/EMR"],
  },
  "Manufacturing / Industrial": {
    label: "Manufacturing",
    tools: ["ERP/MES"],
  },
  "Logistics / 3PL / Supply Chain": {
    label: "Logistics",
    tools: ["WMS/TMS"],
  },
  "Real Estate / Property Management": {
    label: "Real Estate",
    tools: ["Property Management Software"],
  },
  "Legal / Compliance": {
    label: "Legal",
    tools: ["Practice Management / Clio"],
  },
  "Education / Higher Ed": {
    label: "Education",
    tools: ["SIS/LMS"],
  },
  "Construction / Field Services": {
    label: "Construction",
    tools: ["ServiceTitan/Jobber"],
  },
};

const AUTOMATION_MATURITY = [
  {
    value: "no_automation",
    label: "Almost no automation",
    sub: "Mostly manual processes",
  },
  {
    value: "basic_automation",
    label: "Some basic automations",
    sub: "Zapier, email sequences",
  },
  {
    value: "moderate_automation",
    label: "Moderate automation",
    sub: "Still lots of gaps",
  },
  {
    value: "fairly_automated",
    label: "Fairly automated",
    sub: "Want to add AI/agents",
  },
];

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export default function StepThree({ inputs, onChange, onNext, onBack }: Props) {
  const canProceed = !!inputs.automationMaturity;
  const industryExtra = INDUSTRY_TOOLS[inputs.industry];

  return (
    <div className="animate-in fade-in duration-300" role="group" aria-labelledby="step3-heading">
      <h2 id="step3-heading" className="font-headline font-bold text-2xl text-on-surface mb-1">
        What tools are you currently using?
      </h2>
      <p className="text-on-surface-variant text-sm mb-8">
        Toggle every tool your team actively uses. We use this to assess compatibility and
        identify integration opportunities.
      </p>

      {/* Tech Stack */}
      <fieldset className="mb-8">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Current Tech Stack
        </legend>
        <div className="space-y-5">
          {TECH_GROUPS.map(({ group, tools }) => (
            <div key={group}>
              <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-2">
                {group}
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => {
                  const active = inputs.techStack.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onChange({ techStack: toggle(inputs.techStack, tool) })}
                      className={clsx(
                        "px-3 py-2 rounded-xl border text-xs font-label font-medium transition-all min-h-[44px]",
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-outline-variant/30 bg-surface-container text-on-surface-variant hover:border-outline-variant/60 hover:text-on-surface"
                      )}
                    >
                      {active && "✓ "}
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Industry-specific tools */}
          {industryExtra && (
            <div>
              <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-2">
                {industryExtra.label}-Specific
              </p>
              <div className="flex flex-wrap gap-2">
                {industryExtra.tools.map((tool) => {
                  const active = inputs.techStack.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onChange({ techStack: toggle(inputs.techStack, tool) })}
                      className={clsx(
                        "px-3 py-2 rounded-xl border text-xs font-label font-medium transition-all min-h-[44px]",
                        active
                          ? "border-secondary-container bg-secondary-container/10 text-secondary-container"
                          : "border-secondary-container/20 bg-surface-container text-on-surface-variant hover:border-secondary-container/40 hover:text-on-surface"
                      )}
                    >
                      {active && "✓ "}
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </fieldset>

      {/* Automation Maturity */}
      <fieldset className="mb-10">
        <legend className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Automation Maturity <span className="text-error">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="radiogroup">
          {AUTOMATION_MATURITY.map((opt) => {
            const active = inputs.automationMaturity === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ automationMaturity: opt.value })}
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
                  {opt.label}
                </div>
                <div className="text-xs text-on-surface-variant">{opt.sub}</div>
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
          data-event="step_3_complete"
          className={clsx(
            "flex-1 sm:flex-none px-8 py-4 rounded-xl font-headline font-bold text-base transition-all",
            canProceed
              ? "bg-secondary-container text-white hover:bg-[#F07A2A] active:scale-95"
              : "bg-surface-container-high text-outline cursor-not-allowed"
          )}
        >
          Show My Savings Roadmap →
        </button>
      </div>
    </div>
  );
}
