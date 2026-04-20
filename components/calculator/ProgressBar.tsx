import clsx from "clsx";

interface Props {
  currentStep: number;
}

const STEPS = [
  { num: 1, label: "Your Business" },
  { num: 2, label: "Pain Points" },
  { num: 3, label: "Tech Stack" },
  { num: 4, label: "Unlock Results" },
];

export default function ProgressBar({ currentStep }: Props) {
  return (
    <div className="w-full mb-8" role="navigation" aria-label="Wizard progress">
      <div className="flex items-center justify-between relative">
        {/* Connecting lines */}
        <div className="absolute top-4 left-0 right-0 h-px bg-outline-variant/30 z-0" />
        <div
          className="absolute top-4 left-0 h-px bg-primary-container z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep === step.num;
          return (
            <div key={step.num} className="flex flex-col items-center gap-2 z-10">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300",
                  isCompleted
                    ? "bg-primary-container text-white"
                    : isActive
                    ? "bg-primary text-on-primary ring-4 ring-primary/20"
                    : "bg-surface-container-high text-on-surface-variant border border-outline-variant/30"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={clsx(
                  "text-xs font-label font-medium hidden sm:block transition-colors duration-300",
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-on-surface-variant"
                    : "text-outline"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
