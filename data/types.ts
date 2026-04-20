export interface Workflow {
  id: string;
  name: string;
  category: string;
  industries: string[];
  function: string;
  description: string;
  howItWorks: string;
  toolsInvolved: string[];
  timeSavedHrsPerMonth: number;
  costSavedPerYear: number;
  complexity: "Low" | "Medium" | "High";
  baseImpactScore: number;
  tags: string[];
  painPointTriggers: string[];
  departmentTriggers: string[];
  techRequirements: string[];
  teamSizeMin: number;
  teamSizeMax: number;
  businessStageFit: string[];
  isAIPowered: boolean;
}

export interface UserInputs {
  industry: string;
  teamSize: string;
  businessStage: string;
  departments: string[];
  painPoints: string[];
  techStack: string[];
  automationMaturity: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
}

export interface ScoredWorkflow extends Workflow {
  finalScore: number;
  adjustedSavings: number;
  adjustedTimeSaved: number;
  badge: BadgeType[];
  phase: 1 | 2 | 3;
}

export type BadgeType = "Quick Win" | "High Impact" | "Strategic" | "AI-Powered";

export interface CalculationResults {
  topWorkflows: ScoredWorkflow[];
  totalSavings: number;
  totalHoursSaved: number;
  totalOpportunities: number;
  weeksTofirstROI: number;
  departmentBreakdown: { department: string; savings: number }[];
  phaseBreakdown: { phase: number; workflows: ScoredWorkflow[]; savings: number }[];
}
