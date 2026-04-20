import { Workflow, UserInputs, ScoredWorkflow, CalculationResults, BadgeType } from "./types";
import { workflows } from "./workflows";

export function getTeamSizeNumber(teamSize: string): number {
  switch (teamSize) {
    case "Solo / 1-5 employees": return 3;
    case "6-20 employees": return 13;
    case "21-50 employees": return 35;
    case "51-200 employees": return 125;
    case "200+ employees": return 300;
    default: return 50;
  }
}

function assignBadges(workflow: Workflow, adjustedSavings: number): BadgeType[] {
  const badges: BadgeType[] = [];
  if (workflow.complexity === "Low" && adjustedSavings > 5000) badges.push("Quick Win");
  if (workflow.complexity === "Medium" && adjustedSavings > 15000) badges.push("High Impact");
  if (workflow.complexity === "High" && adjustedSavings > 25000) badges.push("Strategic");
  if (workflow.isAIPowered) badges.push("AI-Powered");
  return badges;
}

function assignPhase(workflow: Workflow): 1 | 2 | 3 {
  if (workflow.complexity === "High" || workflow.isAIPowered) return 3;
  if (workflow.complexity === "Medium") return 2;
  return 1;
}

export function runScoringEngine(inputs: UserInputs): CalculationResults {
  const teamSizeNum = getTeamSizeNumber(inputs.teamSize);

  const scored = workflows.map((workflow): ScoredWorkflow | null => {
    // Hard filter: industry mismatch
    if (
      !workflow.industries.includes("all") &&
      !workflow.industries.includes(inputs.industry)
    ) {
      return null;
    }

    let score = workflow.baseImpactScore;

    // Team size — deprioritize, don't exclude
    if (teamSizeNum < workflow.teamSizeMin || teamSizeNum > workflow.teamSizeMax) {
      score *= 0.3;
    }

    // Department match
    const deptMatch = workflow.departmentTriggers.some((d) =>
      inputs.departments.includes(d)
    );
    if (deptMatch) score *= 1.8;

    // Pain point multiplier (biggest boost)
    const painMatches = workflow.painPointTriggers.filter((p) =>
      inputs.painPoints.includes(p)
    ).length;
    score *= 1 + painMatches * 0.5;

    // Tech compatibility
    if (workflow.techRequirements.length > 0) {
      const techMatch = workflow.techRequirements.some((t) =>
        inputs.techStack.includes(t)
      );
      if (techMatch) score *= 1.4;
      else score *= 0.7;
    }

    // Business stage fit
    if (workflow.businessStageFit.includes(inputs.businessStage)) score *= 1.3;

    // Automation maturity adjustments
    if (inputs.automationMaturity === "no_automation" && workflow.complexity === "High") {
      score *= 0.5;
    }
    if (inputs.automationMaturity === "fairly_automated" && workflow.isAIPowered) {
      score *= 1.5;
    }

    // Size-based savings/time adjustment
    const sizeMultiplier = Math.max(0.3, Math.min(3, teamSizeNum / 50));
    const adjustedSavings = workflow.costSavedPerYear * sizeMultiplier;
    const adjustedTimeSaved = workflow.timeSavedHrsPerMonth * sizeMultiplier;

    return {
      ...workflow,
      finalScore: score,
      adjustedSavings,
      adjustedTimeSaved,
      badge: assignBadges(workflow, adjustedSavings),
      phase: assignPhase(workflow),
    };
  });

  const validScored = scored.filter((w): w is ScoredWorkflow => w !== null);
  validScored.sort((a, b) => b.finalScore - a.finalScore);

  const topWorkflows = validScored.slice(0, 10);

  const totalSavings = Math.round(
    topWorkflows.reduce((sum, w) => sum + w.adjustedSavings, 0)
  );
  const totalHoursSaved = Math.round(
    topWorkflows.reduce((sum, w) => sum + w.adjustedTimeSaved, 0)
  );
  const totalOpportunities = validScored.length;

  const hasPhase1 = topWorkflows.some((w) => w.phase === 1);
  const hasPhase2 = topWorkflows.some((w) => w.phase === 2);
  const weeksTofirstROI = hasPhase1 ? 2 : hasPhase2 ? 6 : 12;

  // Department savings breakdown by workflow function
  const deptMap = new Map<string, number>();
  topWorkflows.forEach((w) => {
    deptMap.set(w.function, (deptMap.get(w.function) ?? 0) + w.adjustedSavings);
  });
  const departmentBreakdown = Array.from(deptMap.entries())
    .map(([department, savings]) => ({ department, savings: Math.round(savings) }))
    .sort((a, b) => b.savings - a.savings);

  const phases = [1, 2, 3] as const;
  const phaseBreakdown = phases
    .map((phase) => {
      const phaseWorkflows = topWorkflows.filter((w) => w.phase === phase);
      return {
        phase,
        workflows: phaseWorkflows,
        savings: Math.round(phaseWorkflows.reduce((s, w) => s + w.adjustedSavings, 0)),
      };
    })
    .filter((p) => p.workflows.length > 0);

  return {
    topWorkflows,
    totalSavings,
    totalHoursSaved,
    totalOpportunities,
    weeksTofirstROI,
    departmentBreakdown,
    phaseBreakdown,
  };
}
