export type ClaimClassification = 'Supported' | 'Contradicted' | 'Insufficient Evidence';

export type ModelType = 'SLM' | 'LLM';

export interface RoutingDecision {
  rawConfidence: number;
  calibratedConfidence: number;
  threshold: number;
  temperature: number;
  routedTo: ModelType;
  reason: string;
}

export interface Claim {
  id: string;
  claimNumber: number;
  claimText: string;
  finalClassification: ClaimClassification;
  confidence: number; // 0 to 1
  rawConfidence: number; // 0 to 1
  calibratedConfidence: number; // 0 to 1
  modelUsed: ModelType;
  slmPrediction: ClaimClassification;
  slmConfidence: number;
  routingDecision: RoutingDecision;
  referenceEvidence: string;
  evidenceLocation?: string;
  explanation: string;
}

export interface AnalysisMetrics {
  totalClaims: number;
  supportedCount: number;
  contradictedCount: number;
  insufficientCount: number;
  slmCount: number;
  llmCount: number;
  slmPercentage: number;
  llmPercentage: number;
  overallLatencyMs: number;
  estimatedBaselineLlmLatencyMs: number;
  latencyReductionPct: number;
  estimatedCostUsd: number;
  baselineLlmCostUsd: number;
  costSavingsPct: number;
  averageConfidence: number;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  title?: string;
  generatedText: string;
  referenceText: string;
  referenceFileName?: string;
  claims: Claim[];
  metrics: AnalysisMetrics;
}

export interface PresetSample {
  id: string;
  title: string;
  category: string;
  description: string;
  generatedText: string;
  referenceText: string;
  mockResult: AnalysisResult;
}

export interface DashboardMetrics {
  totalClaimsAnalyzed: number;
  slmHandledCount: number;
  llmHandledCount: number;
  slmPercentage: number;
  llmPercentage: number;
  averageLatencyMs: number;
  baselineLlmLatencyMs: number;
  averageConfidence: number;
  totalTokensConsumed: number;
  tokensSavedPct: number;
  estimatedCostSpentUsd: number;
  estimatedCostSavedUsd: number;
  calibrationData: Array<{
    binRange: string;
    avgConfidence: number;
    empiricalAccuracy: number;
    claimCount: number;
  }>;
  recentAnalyses: Array<{
    id: string;
    timestamp: string;
    title: string;
    claimsCount: number;
    hallucinationRate: number;
    slmRatio: number;
    latencyMs: number;
  }>;
}

export interface AnalyzeRequest {
  generatedText: string;
  referenceText: string;
  referenceFileName?: string;
  confidenceThreshold?: number;
  temperature?: number;
}

