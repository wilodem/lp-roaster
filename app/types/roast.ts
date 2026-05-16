export type RoastIntensity = "helpful" | "spicy" | "savage";

export type FindingCategory =
  | "visual-hierarchy"
  | "messaging"
  | "cta"
  | "trust"
  | "conversion-friction"
  | "accessibility";

export type ImpactLevel = "low" | "medium" | "high";
export type EffortLevel = "low" | "medium" | "high";
export type SeverityLevel = "warm" | "spicy" | "savage";

export type MemeVerdict = {
  templateId: string;
  caption: string;
  reason: string;
  altText: string;
};

export type RoastFinding = {
  category: FindingCategory;
  issue: string;
  evidence: string;
  whyItMatters: string;
  recommendation: string;
  impact: ImpactLevel;
  effort: EffortLevel;
};

export type RoastAnalysis = {
  summary: {
    pageType: string;
    audience: string;
    score: number;
    verdict: string;
  };
  roast: {
    title: string;
    body: string;
    severity: SeverityLevel;
  };
  findings: RoastFinding[];
  rewrites: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  actionPlan: Array<{
    priority: number;
    label: string;
    rationale: string;
  }>;
  meme: MemeVerdict;
  meta: {
    model: string;
    latencyMs: number;
    usage?: {
      promptTokens?: number;
      completionTokens?: number;
      totalTokens?: number;
    };
    costUsd?: number;
  };
};

export type RoastResponse = {
  analysis: RoastAnalysis;
};

export type ApiErrorResponse = {
  error: string;
  detail?: string;
};
