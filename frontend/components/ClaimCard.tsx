import React from 'react';
import { Claim } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBar } from './ConfidenceBar';
import { Cpu, Sparkles, Quote, ArrowRight } from 'lucide-react';

interface ClaimCardProps {
  claim: Claim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const isSLM = claim.modelUsed === 'SLM';
  const routedToLLM = claim.routingDecision.routedTo === 'LLM';
  const rawPct = (claim.rawConfidence * 100).toFixed(1);
  const calPct = (claim.calibratedConfidence * 100).toFixed(1);
  const thresholdPct = (claim.routingDecision.threshold * 100).toFixed(1);

  // Card background tint based on classification
  const cardBg = {
    Supported: 'bg-green-50 border-l-4 border-l-green-500',
    Contradicted: 'bg-red-50 border-l-4 border-l-red-500',
    'Insufficient Evidence': 'bg-yellow-50 border-l-4 border-l-yellow-500'
  }[claim.finalClassification];

  return (
    <div className={`rounded-xl border border-gray-200 p-5 shadow-sm ${cardBg}`}>
      {/* Row 1: Claim # + Classification + Model */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
            Claim #{claim.claimNumber}
          </span>
          <StatusBadge status={claim.finalClassification} />
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isSLM
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-purple-100 text-purple-700 border border-purple-300'
          }`}
        >
          {isSLM ? <Cpu className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
          {isSLM ? 'SLM (DeBERTa)' : 'LLM (Groq)'}
        </span>
      </div>

      {/* Row 2: Claim Text */}
      <p className="text-sm text-gray-800 leading-relaxed mb-4">
        &ldquo;{claim.claimText}&rdquo;
      </p>

      {/* Row 3: Confidence Bar */}
      <div className="mb-4 bg-white/70 p-3 rounded-lg border border-gray-200">
        <ConfidenceBar
          confidence={claim.confidence}
          rawConfidence={claim.rawConfidence}
          threshold={claim.routingDecision.threshold}
        />
      </div>

      {/* Row 4: Routing Decision - 3 step boxes */}
      <div className="mb-4 bg-white/60 rounded-lg border border-gray-200 p-3">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">
          Adaptive Routing Decision
        </p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
            <div className="text-[10px] text-gray-400 font-medium uppercase">Raw SLM</div>
            <div className="text-base font-bold text-gray-800">{rawPct}%</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center border border-blue-200">
            <div className="text-[10px] text-blue-500 font-medium uppercase">Calibrated (T={claim.routingDecision.temperature})</div>
            <div className="text-base font-bold text-blue-600">{calPct}%</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
            <div className="text-[10px] text-gray-400 font-medium uppercase">Gate</div>
            <div className="text-base font-bold text-gray-800">τ = {thresholdPct}%</div>
            <div className="text-[10px] text-gray-400">
              {claim.calibratedConfidence >= claim.routingDecision.threshold ? '✓ Pass → SLM' : '✗ Fail → LLM'}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 italic">
          {claim.routingDecision.reason}
        </p>
      </div>

      {/* Row 5: Reference Evidence */}
      <div className="mb-3 bg-white/60 rounded-lg border border-gray-200 p-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase mb-1">
          <Quote className="w-3 h-3 text-gray-400" />
          Reference Evidence
          {claim.evidenceLocation && (
            <span className="text-gray-400 font-normal normal-case ml-auto">{claim.evidenceLocation}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 italic leading-relaxed">
          &ldquo;{claim.referenceEvidence}&rdquo;
        </p>
      </div>

      {/* Row 6: Explanation */}
      <div className="bg-white/60 rounded-lg border border-gray-200 p-3">
        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Explanation</p>
        <p className="text-xs text-gray-700 leading-relaxed">{claim.explanation}</p>
      </div>
    </div>
  );
};
