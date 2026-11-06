import { AnalysisResult, DashboardMetrics, PresetSample } from './types';

export const SAMPLE_ANALYSIS_1: AnalysisResult = {
  id: 'analysis-mrna-vaccine-2026',
  timestamp: '2026-11-05 14:22:10 UTC',
  title: 'Lipid Nanoparticles and mRNA Therapeutics',
  generatedText: `mRNA-based therapeutics utilize ionizable lipid nanoparticles (LNPs) to protect and deliver delicate messenger RNA molecules into host cells. Once inside the cytoplasm, cellular ribosomes directly translate the exogenous mRNA sequence into the target antigen. The synthetic mRNA integrates directly into the host cell's nuclear DNA within 48 hours to ensure lifelong genomic immunity. The LNPs undergo rapid endosomal escape via pH-dependent protonation. Additionally, these novel formulation matrices have been proven to remain completely stable at room temperature for over ten years without any degradation.`,
  referenceText: `Lipid nanoparticles (LNPs) represent the leading non-viral platform for mRNA delivery. Ionizable cationic lipids within the formulation are engineered to have an apparent pKa that promotes high-affinity RNA encapsulation at acidic pH during manufacturing and a neutral surface charge at physiological pH (7.4), minimizing toxicity in circulation. Upon cellular uptake via endocytosis, acidification in endosomes (pH 5.0–6.0) protonates the ionizable lipid, driving membrane destabilization and releasing mRNA into the cytoplasm. Host cytoplasmic ribosomes subsequently translate the mRNA into the specified therapeutic or antigenic protein. Crucially, synthetic mRNA remains exclusively in the cytoplasm and cannot enter the cell nucleus or integrate into the host genomic DNA, degrading naturally within a few days. Current clinical LNP-mRNA formulations require ultra-cold or frozen storage (-80°C to -20°C); ambient stability studies have demonstrated thermal degradation of lipid-mRNA complexes within several weeks.`,
  referenceFileName: 'Nature_Rev_Drug_Discovery_LNP_mRNA_Review.pdf',
  claims: [
    {
      id: 'claim-1',
      claimNumber: 1,
      claimText: 'mRNA-based therapeutics utilize ionizable lipid nanoparticles (LNPs) to protect and deliver delicate messenger RNA molecules into host cells.',
      finalClassification: 'Supported',
      confidence: 0.96,
      rawConfidence: 0.98,
      calibratedConfidence: 0.96,
      modelUsed: 'SLM',
      slmPrediction: 'Supported',
      slmConfidence: 0.96,
      routingDecision: {
        rawConfidence: 0.98,
        calibratedConfidence: 0.96,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'SLM',
        reason: 'Calibrated SLM confidence (96.0%) exceeds adaptive threshold (82.0%). Rapid SLM prediction accepted directly without LLM invocation.'
      },
      referenceEvidence: 'Lipid nanoparticles (LNPs) represent the leading non-viral platform for mRNA delivery. Ionizable cationic lipids within the formulation are engineered to have an apparent pKa that promotes high-affinity RNA encapsulation...',
      evidenceLocation: 'Section 1: Introduction, Paragraph 1',
      explanation: 'The reference explicitly states that ionizable lipid nanoparticles are the leading delivery platform engineered to encapsulate and protect mRNA for cellular uptake.'
    },
    {
      id: 'claim-2',
      claimNumber: 2,
      claimText: 'Once inside the cytoplasm, cellular ribosomes directly translate the exogenous mRNA sequence into the target antigen.',
      finalClassification: 'Supported',
      confidence: 0.94,
      rawConfidence: 0.97,
      calibratedConfidence: 0.94,
      modelUsed: 'SLM',
      slmPrediction: 'Supported',
      slmConfidence: 0.94,
      routingDecision: {
        rawConfidence: 0.97,
        calibratedConfidence: 0.94,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'SLM',
        reason: 'Calibrated SLM confidence (94.0%) exceeds adaptive threshold (82.0%). Handled efficiently by SLM.'
      },
      referenceEvidence: 'Host cytoplasmic ribosomes subsequently translate the mRNA into the specified therapeutic or antigenic protein.',
      evidenceLocation: 'Section 2: Intracellular Mechanism, Paragraph 2',
      explanation: 'Directly verified by the reference document: cytoplasmic ribosomes translate the delivered mRNA into the target therapeutic/antigenic protein.'
    },
    {
      id: 'claim-3',
      claimNumber: 3,
      claimText: "The synthetic mRNA integrates directly into the host cell's nuclear DNA within 48 hours to ensure lifelong genomic immunity.",
      finalClassification: 'Contradicted',
      confidence: 0.98,
      rawConfidence: 0.69,
      calibratedConfidence: 0.61,
      modelUsed: 'LLM',
      slmPrediction: 'Contradicted',
      slmConfidence: 0.61,
      routingDecision: {
        rawConfidence: 0.69,
        calibratedConfidence: 0.61,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'LLM',
        reason: 'SLM calibrated confidence (61.0%) fell below routing threshold (82.0%). Claim involves sensitive biomedical mechanism; routed to LLM for evidence-grounded verification.'
      },
      referenceEvidence: 'Crucially, synthetic mRNA remains exclusively in the cytoplasm and cannot enter the cell nucleus or integrate into the host genomic DNA, degrading naturally within a few days.',
      evidenceLocation: 'Section 2: Intracellular Mechanism, Paragraph 2, Lines 5-8',
      explanation: 'Severe factual hallucination. The reference explicitly refutes this claim, highlighting that mRNA remains exclusively in the cytoplasm, cannot penetrate the nucleus, cannot integrate into host DNA, and undergoes natural degradation within days.'
    },
    {
      id: 'claim-4',
      claimNumber: 4,
      claimText: 'The LNPs undergo rapid endosomal escape via pH-dependent protonation.',
      finalClassification: 'Supported',
      confidence: 0.89,
      rawConfidence: 0.92,
      calibratedConfidence: 0.89,
      modelUsed: 'SLM',
      slmPrediction: 'Supported',
      slmConfidence: 0.89,
      routingDecision: {
        rawConfidence: 0.92,
        calibratedConfidence: 0.89,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'SLM',
        reason: 'Calibrated confidence (89.0%) is above confidence threshold (82.0%). SLM prediction accepted.'
      },
      referenceEvidence: 'Upon cellular uptake via endocytosis, acidification in endosomes (pH 5.0–6.0) protonates the ionizable lipid, driving membrane destabilization and releasing mRNA into the cytoplasm.',
      evidenceLocation: 'Section 2: Intracellular Mechanism, Paragraph 2',
      explanation: 'Endosomal acidification causes protonation of the ionizable lipid, leading to membrane destabilization and endosomal escape into the cytosol.'
    },
    {
      id: 'claim-5',
      claimNumber: 5,
      claimText: 'These novel formulation matrices have been proven to remain completely stable at room temperature for over ten years without any degradation.',
      finalClassification: 'Insufficient Evidence',
      confidence: 0.92,
      rawConfidence: 0.54,
      calibratedConfidence: 0.48,
      modelUsed: 'LLM',
      slmPrediction: 'Contradicted',
      slmConfidence: 0.48,
      routingDecision: {
        rawConfidence: 0.54,
        calibratedConfidence: 0.48,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'LLM',
        reason: 'SLM confidence was ambiguous (48.0% < 82.0%). LLM investigated the reference document to establish grounding.'
      },
      referenceEvidence: 'Current clinical LNP-mRNA formulations require ultra-cold or frozen storage (-80°C to -20°C); ambient stability studies have demonstrated thermal degradation of lipid-mRNA complexes within several weeks.',
      evidenceLocation: 'Section 4: Thermal Stability & Storage Limitations',
      explanation: 'While the reference notes thermal degradation occurs within weeks at ambient temperatures, it provides no data or evidence regarding a "10-year room temperature stability" trial. The claim is ungrounded and classified as Insufficient Evidence / Unsupported in the text.'
    }
  ],
  metrics: {
    totalClaims: 5,
    supportedCount: 3,
    contradictedCount: 1,
    insufficientCount: 1,
    slmCount: 3,
    llmCount: 2,
    slmPercentage: 60.0,
    llmPercentage: 40.0,
    overallLatencyMs: 340,
    estimatedBaselineLlmLatencyMs: 1450,
    latencyReductionPct: 76.5,
    estimatedCostUsd: 0.0018,
    baselineLlmCostUsd: 0.0085,
    costSavingsPct: 78.8,
    averageConfidence: 0.938
  }
};

export const SAMPLE_ANALYSIS_2: AnalysisResult = {
  id: 'analysis-quantum-tech-2026',
  timestamp: '2026-11-04 09:15:44 UTC',
  title: 'Superconducting Qubits & Coherence Limits',
  generatedText: `Superconducting quantum processors utilize Josephson junctions formed by two superconducting layers separated by an insulating barrier. These processors are cooled using helium dilution refrigerators down to operating temperatures of approximately 15 millikelvin. The superconducting circuits achieve room-temperature quantum coherence without thermal dephasing. IBM and Google independently deployed commercially available 100,000 logical qubit fault-tolerant systems in early 2024.`,
  referenceText: `Superconducting qubits are artificial macroscopic quantum circuits fabricated from thin films of superconducting materials. The non-linear inductive element central to transmon qubits is the Josephson junction, typically consisting of two aluminum layers separated by a nanometer-thin aluminum oxide barrier. To suppress thermal excitations that induce quasiparticle poisoning and dephasing, quantum chips are maintained inside multi-stage dilution refrigerators at base temperatures below 20 millikelvin (typically ~10–15 mK). Operating at room temperature is fundamentally prohibited because thermal energy at 300K completely destroys the superconducting state (aluminum critical temperature Tc ≈ 1.2 K). Present-day noisy intermediate-scale quantum (NISQ) systems operate with roughly 100 to 1,000 physical qubits, with quantum error correction (QEC) for large-scale logical qubit clusters remaining an active area of exploratory research rather than commercial deployment.`,
  referenceFileName: 'Applied_Physics_Superconducting_Qubits_2025.pdf',
  claims: [
    {
      id: 'claim-q1',
      claimNumber: 1,
      claimText: 'Superconducting quantum processors utilize Josephson junctions formed by two superconducting layers separated by an insulating barrier.',
      finalClassification: 'Supported',
      confidence: 0.97,
      rawConfidence: 0.98,
      calibratedConfidence: 0.97,
      modelUsed: 'SLM',
      slmPrediction: 'Supported',
      slmConfidence: 0.97,
      routingDecision: {
        rawConfidence: 0.98,
        calibratedConfidence: 0.97,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'SLM',
        reason: 'SLM confidence is 97.0% (>= 82.0%). Handled instantly by SLM.'
      },
      referenceEvidence: 'The non-linear inductive element central to transmon qubits is the Josephson junction, typically consisting of two aluminum layers separated by a nanometer-thin aluminum oxide barrier.',
      evidenceLocation: 'Section 1, Paragraph 1',
      explanation: 'Matches the reference specification of Josephson junctions with two aluminum layers and an oxide insulating barrier.'
    },
    {
      id: 'claim-q2',
      claimNumber: 2,
      claimText: 'These processors are cooled using helium dilution refrigerators down to operating temperatures of approximately 15 millikelvin.',
      finalClassification: 'Supported',
      confidence: 0.95,
      rawConfidence: 0.96,
      calibratedConfidence: 0.95,
      modelUsed: 'SLM',
      slmPrediction: 'Supported',
      slmConfidence: 0.95,
      routingDecision: {
        rawConfidence: 0.96,
        calibratedConfidence: 0.95,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'SLM',
        reason: 'SLM confidence is 95.0% (>= 82.0%). SLM prediction accepted.'
      },
      referenceEvidence: '...quantum chips are maintained inside multi-stage dilution refrigerators at base temperatures below 20 millikelvin (typically ~10–15 mK).',
      evidenceLocation: 'Section 2, Paragraph 1',
      explanation: 'Verified: Multi-stage dilution refrigerators cool chips to base temperatures around 10-15 mK.'
    },
    {
      id: 'claim-q3',
      claimNumber: 3,
      claimText: 'The superconducting circuits achieve room-temperature quantum coherence without thermal dephasing.',
      finalClassification: 'Contradicted',
      confidence: 0.99,
      rawConfidence: 0.72,
      calibratedConfidence: 0.65,
      modelUsed: 'LLM',
      slmPrediction: 'Contradicted',
      slmConfidence: 0.65,
      routingDecision: {
        rawConfidence: 0.72,
        calibratedConfidence: 0.65,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'LLM',
        reason: 'Confidence 65.0% < 82.0% threshold. Sent to LLM for evidence verification.'
      },
      referenceEvidence: 'Operating at room temperature is fundamentally prohibited because thermal energy at 300K completely destroys the superconducting state (aluminum critical temperature Tc ≈ 1.2 K).',
      evidenceLocation: 'Section 2, Lines 4-6',
      explanation: 'Contradicted by fundamental physics cited in the document. Room temperature destroys superconductivity completely, causing total dephasing.'
    },
    {
      id: 'claim-q4',
      claimNumber: 4,
      claimText: 'IBM and Google independently deployed commercially available 100,000 logical qubit fault-tolerant systems in early 2024.',
      finalClassification: 'Contradicted',
      confidence: 0.96,
      rawConfidence: 0.64,
      calibratedConfidence: 0.58,
      modelUsed: 'LLM',
      slmPrediction: 'Contradicted',
      slmConfidence: 0.58,
      routingDecision: {
        rawConfidence: 0.64,
        calibratedConfidence: 0.58,
        threshold: 0.82,
        temperature: 1.25,
        routedTo: 'LLM',
        reason: 'SLM uncertain (58.0% < 82.0%). LLM cross-referenced current commercial status in reference text.'
      },
      referenceEvidence: 'Present-day noisy intermediate-scale quantum (NISQ) systems operate with roughly 100 to 1,000 physical qubits, with quantum error correction (QEC) for large-scale logical qubit clusters remaining an active area of exploratory research rather than commercial deployment.',
      evidenceLocation: 'Section 4: Quantum Scaling Roadmaps',
      explanation: 'The reference explicitly disputes commercial availability of 100,000 logical qubits; current systems have 100-1,000 physical qubits and logical error correction is still research-grade.'
    }
  ],
  metrics: {
    totalClaims: 4,
    supportedCount: 2,
    contradictedCount: 2,
    insufficientCount: 0,
    slmCount: 2,
    llmCount: 2,
    slmPercentage: 50.0,
    llmPercentage: 50.0,
    overallLatencyMs: 310,
    estimatedBaselineLlmLatencyMs: 1280,
    latencyReductionPct: 75.8,
    estimatedCostUsd: 0.0016,
    baselineLlmCostUsd: 0.0072,
    costSavingsPct: 77.7,
    averageConfidence: 0.967
  }
};

export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'mrna-nanoparticles',
    title: 'Biomedical: mRNA & Lipid Nanoparticles',
    category: 'Biotechnology / Medicine',
    description: 'Evaluates claims about mRNA cellular mechanisms, nuclear integration risk, and thermal stability.',
    generatedText: SAMPLE_ANALYSIS_1.generatedText,
    referenceText: SAMPLE_ANALYSIS_1.referenceText,
    mockResult: SAMPLE_ANALYSIS_1
  },
  {
    id: 'superconducting-qubits',
    title: 'Physics & Tech: Superconducting Qubits',
    category: 'Quantum Computing',
    description: 'Evaluates claims regarding dilution refrigeration, Josephson junctions, and claimed room-temp operation.',
    generatedText: SAMPLE_ANALYSIS_2.generatedText,
    referenceText: SAMPLE_ANALYSIS_2.referenceText,
    mockResult: SAMPLE_ANALYSIS_2
  }
];

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  totalClaimsAnalyzed: 1420,
  slmHandledCount: 978,
  llmHandledCount: 442,
  slmPercentage: 68.87,
  llmPercentage: 31.13,
  averageLatencyMs: 164,
  baselineLlmLatencyMs: 1250,
  averageConfidence: 0.924,
  totalTokensConsumed: 384000,
  tokensSavedPct: 71.4,
  estimatedCostSpentUsd: 3.84,
  estimatedCostSavedUsd: 9.60,
  calibrationData: [
    { binRange: '0.50 - 0.60', avgConfidence: 0.54, empiricalAccuracy: 0.53, claimCount: 85 },
    { binRange: '0.60 - 0.70', avgConfidence: 0.66, empiricalAccuracy: 0.64, claimCount: 142 },
    { binRange: '0.70 - 0.80', avgConfidence: 0.75, empiricalAccuracy: 0.76, claimCount: 215 },
    { binRange: '0.80 - 0.90', avgConfidence: 0.85, empiricalAccuracy: 0.86, claimCount: 438 },
    { binRange: '0.90 - 1.00', avgConfidence: 0.96, empiricalAccuracy: 0.97, claimCount: 540 }
  ],
  recentAnalyses: [
    {
      id: 'analysis-mrna-vaccine-2026',
      timestamp: 'Today, 14:22 UTC',
      title: 'Lipid Nanoparticles and mRNA Therapeutics',
      claimsCount: 5,
      hallucinationRate: 40.0,
      slmRatio: 60.0,
      latencyMs: 340
    },
    {
      id: 'analysis-quantum-tech-2026',
      timestamp: 'Yesterday, 09:15 UTC',
      title: 'Superconducting Qubits & Coherence Limits',
      claimsCount: 4,
      hallucinationRate: 50.0,
      slmRatio: 50.0,
      latencyMs: 310
    },
    {
      id: 'analysis-jwst-deep-sky',
      timestamp: 'Nov 03, 18:40 UTC',
      title: 'JWST High-Redshift Galaxy Formation',
      claimsCount: 6,
      hallucinationRate: 16.7,
      slmRatio: 83.3,
      latencyMs: 180
    },
    {
      id: 'analysis-battery-solid-state',
      timestamp: 'Nov 02, 11:12 UTC',
      title: 'Lithium-Sulfur All-Solid-State Electrolytes',
      claimsCount: 7,
      hallucinationRate: 28.5,
      slmRatio: 71.4,
      latencyMs: 220
    }
  ]
};

