"use client";

import { useReducer, useEffect } from "react";
import { UserInputs, CalculationResults } from "@/data/types";
import { runScoringEngine } from "@/data/scoring";
import ProgressBar from "./ProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import ResultsPage from "./ResultsPage";

type Step = 1 | 2 | 3 | 4 | "results";

interface State {
  step: Step;
  inputs: UserInputs;
  results: CalculationResults | null;
  submitting: boolean;
}

type Action =
  | { type: "SET_INPUTS"; payload: Partial<UserInputs> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "COMPUTE_AND_GATE"; results: CalculationResults }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_DONE" }
  | { type: "RESET" };

const EMPTY_INPUTS: UserInputs = {
  industry: "",
  teamSize: "",
  businessStage: "",
  departments: [],
  painPoints: [],
  techStack: [],
  automationMaturity: "",
  name: "",
  email: "",
  company: "",
  phone: "",
};

const INITIAL_STATE: State = {
  step: 1,
  inputs: EMPTY_INPUTS,
  results: null,
  submitting: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUTS":
      return { ...state, inputs: { ...state.inputs, ...action.payload } };
    case "NEXT_STEP":
      return { ...state, step: (state.step as number) + 1 as Step };
    case "PREV_STEP":
      return { ...state, step: (state.step as number) - 1 as Step };
    case "COMPUTE_AND_GATE":
      return { ...state, step: 4, results: action.results };
    case "SUBMIT_START":
      return { ...state, submitting: true };
    case "SUBMIT_DONE":
      return { ...state, submitting: false, step: "results" };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

async function postWebhook(inputs: UserInputs, results: CalculationResults) {
  const url = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inputs.name,
        email: inputs.email,
        company: inputs.company ?? "",
        phone: inputs.phone ?? "",
        industry: inputs.industry,
        teamSize: inputs.teamSize,
        businessStage: inputs.businessStage,
        departments: inputs.departments,
        painPoints: inputs.painPoints,
        techStack: inputs.techStack,
        automationMaturity: inputs.automationMaturity,
        estimatedSavings: results.totalSavings,
        topRecommendations: results.topWorkflows.map((w) => w.name),
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch {
    // Fire-and-forget — don't block results on webhook failure
  }
}

export default function WizardContainer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { step, inputs, results, submitting } = state;

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleChange = (partial: Partial<UserInputs>) => {
    dispatch({ type: "SET_INPUTS", payload: partial });
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleStep3Next = () => {
    const computed = runScoringEngine(inputs);
    dispatch({ type: "COMPUTE_AND_GATE", results: computed });
  };

  const handleEmailSubmit = async () => {
    if (!results) return;
    dispatch({ type: "SUBMIT_START" });
    await postWebhook(inputs, results);
    dispatch({ type: "SUBMIT_DONE" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  if (step === "results" && results) {
    return (
      <div className="glass-panel border border-outline-variant/10 rounded-xl p-6 sm:p-10">
        <ResultsPage results={results} inputs={inputs} onReset={handleReset} />
      </div>
    );
  }

  const numericStep = step as 1 | 2 | 3 | 4;

  return (
    <div className="glass-panel border border-outline-variant/10 rounded-xl p-6 sm:p-10">
      <ProgressBar currentStep={numericStep} />

      {step === 1 && (
        <StepOne inputs={inputs} onChange={handleChange} onNext={handleNext} />
      )}
      {step === 2 && (
        <StepTwo
          inputs={inputs}
          onChange={handleChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <StepThree
          inputs={inputs}
          onChange={handleChange}
          onNext={handleStep3Next}
          onBack={handleBack}
        />
      )}
      {step === 4 && results && (
        <StepFour
          inputs={inputs}
          previewResults={results}
          onChange={handleChange}
          onSubmit={handleEmailSubmit}
          submitting={submitting}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
