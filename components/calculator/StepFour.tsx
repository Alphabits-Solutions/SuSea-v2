"use client";

import { useState } from "react";
import clsx from "clsx";
import { UserInputs, CalculationResults } from "@/data/types";

interface Props {
  inputs: UserInputs;
  previewResults: CalculationResults;
  onChange: (partial: Partial<UserInputs>) => void;
  onSubmit: () => void;
  submitting: boolean;
  onBack: () => void;
}

const BUSINESS_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "protonmail.com"];

function isPersonalEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return BUSINESS_EMAIL_DOMAINS.includes(domain);
}

export default function StepFour({ inputs, previewResults, onChange, onSubmit, submitting, onBack }: Props) {
  const [emailWarning, setEmailWarning] = useState(false);

  const handleEmailBlur = () => {
    if (inputs.email && isPersonalEmail(inputs.email)) {
      setEmailWarning(true);
    } else {
      setEmailWarning(false);
    }
  };

  const canSubmit =
    inputs.name?.trim() &&
    inputs.email?.trim() &&
    inputs.email.includes("@");

  const formattedSavings = previewResults.totalSavings.toLocaleString("en-US");

  return (
    <div className="animate-in fade-in duration-300" role="group" aria-labelledby="step4-heading">
      <h2 id="step4-heading" className="font-headline font-bold text-2xl text-on-surface mb-1">
        Unlock Your Personalized Roadmap
      </h2>
      <p className="text-on-surface-variant text-sm mb-8">
        Your automation analysis is ready. Enter your details to view the full report.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blurred preview */}
        <div className="relative rounded-xl overflow-hidden border border-outline-variant/10">
          {/* Preview content — blurred */}
          <div className="p-6 bg-surface-container-high blur-sm pointer-events-none select-none">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Your Estimated Annual Savings
            </p>
            <div className="font-mono text-4xl font-bold text-[#4CAF50] mb-6">
              ${formattedSavings}
            </div>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">
              Top Automation Opportunities
            </p>
            <div className="space-y-2">
              {previewResults.topWorkflows.slice(0, 4).map((w, i) => (
                <div
                  key={w.id}
                  className="glass-panel border border-outline-variant/10 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-headline font-bold text-sm text-on-surface">
                      {w.name}
                    </div>
                    <div className="text-xs text-on-surface-variant">{w.function} · {w.complexity}</div>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#4CAF50]">
                    ${Math.round(w.adjustedSavings).toLocaleString("en-US")}/yr
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <div className="flex-1 bg-surface-container rounded-lg p-3 text-center">
                <div className="font-mono text-lg font-bold text-primary">
                  {previewResults.totalHoursSaved} hrs
                </div>
                <div className="text-xs text-outline">saved/month</div>
              </div>
              <div className="flex-1 bg-surface-container rounded-lg p-3 text-center">
                <div className="font-mono text-lg font-bold text-primary">
                  {previewResults.totalOpportunities}
                </div>
                <div className="text-xs text-outline">opportunities</div>
              </div>
            </div>
          </div>

          {/* Frosted overlay */}
          <div className="absolute inset-0 glass-panel flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">lock</span>
            </div>
            <div>
              <p className="font-headline font-bold text-on-surface text-base mb-1">
                Your full report is ready
              </p>
              <p className="text-sm text-on-surface-variant">
                Enter your details to unlock{" "}
                <span className="text-[#4CAF50] font-mono font-bold">${formattedSavings}/yr</span>{" "}
                in potential savings
              </p>
            </div>
          </div>
        </div>

        {/* Email form */}
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="gate-name"
              className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-1.5"
            >
              Full Name <span className="text-error">*</span>
            </label>
            <input
              id="gate-name"
              type="text"
              value={inputs.name ?? ""}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Jane Smith"
              required
              className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary text-on-surface placeholder-outline px-4 py-3 rounded-xl outline-none transition-colors text-sm"
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="gate-email"
              className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-1.5"
            >
              Work Email <span className="text-error">*</span>
            </label>
            <input
              id="gate-email"
              type="email"
              value={inputs.email ?? ""}
              onChange={(e) => { onChange({ email: e.target.value }); setEmailWarning(false); }}
              onBlur={handleEmailBlur}
              placeholder="jane@company.com"
              required
              className={clsx(
                "w-full bg-surface-container border text-on-surface placeholder-outline px-4 py-3 rounded-xl outline-none transition-colors text-sm",
                emailWarning ? "border-[#FFB4AB]/50 focus:border-[#FFB4AB]" : "border-outline-variant/30 focus:border-primary"
              )}
              aria-required="true"
              aria-describedby={emailWarning ? "email-warning" : undefined}
            />
            {emailWarning && (
              <p id="email-warning" className="text-xs text-[#FFB4AB] mt-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">info</span>
                Please use your work email for the best experience — personal emails still work.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="gate-company"
              className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-1.5"
            >
              Company Name <span className="text-outline font-normal normal-case tracking-normal ml-1">(optional)</span>
            </label>
            <input
              id="gate-company"
              type="text"
              value={inputs.company ?? ""}
              onChange={(e) => onChange({ company: e.target.value })}
              placeholder="Acme Corp"
              className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary text-on-surface placeholder-outline px-4 py-3 rounded-xl outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="gate-phone"
              className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-1.5"
            >
              Phone <span className="text-outline font-normal normal-case tracking-normal ml-1">(optional)</span>
            </label>
            <input
              id="gate-phone"
              type="tel"
              value={inputs.phone ?? ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary text-on-surface placeholder-outline px-4 py-3 rounded-xl outline-none transition-colors text-sm"
            />
          </div>

          <p className="text-xs text-outline leading-relaxed">
            We&rsquo;ll send your full report to this email. No spam — just your automation roadmap.
          </p>

          <button
            onClick={onSubmit}
            disabled={!canSubmit || submitting}
            data-event="email_submitted"
            className={clsx(
              "w-full py-4 rounded-xl font-headline font-bold text-base transition-all flex items-center justify-center gap-2",
              canSubmit && !submitting
                ? "bg-secondary-container text-white hover:bg-[#F07A2A] active:scale-95"
                : "bg-surface-container-high text-outline cursor-not-allowed"
            )}
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                Generating your roadmap…
              </>
            ) : (
              "Unlock My Full Report →"
            )}
          </button>

          <button
            onClick={onBack}
            className="text-xs text-outline hover:text-on-surface-variant transition-colors text-center"
          >
            ← Edit my answers
          </button>
        </div>
      </div>
    </div>
  );
}
