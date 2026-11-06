import React from 'react';
import { CheckCircle2, Loader2, FileSearch, Cpu, Sliders, Sparkles, ShieldCheck } from 'lucide-react';

interface Stage {
  step: number;
  title: string;
  detail: string;
}

interface ProcessingPipelineProps {
  currentStage: Stage;
}

const STAGES = [
  { step: 1, title: 'Extracting Claims', desc: 'Breaking generated text into factual statements' },
  { step: 2, title: 'SLM Classification', desc: 'DeBERTa scoring + Temperature Scaling' },
  { step: 3, title: 'Confidence Routing', desc: 'Checking if confidence ≥ threshold' },
  { step: 4, title: 'LLM Verification', desc: 'Cross-checking uncertain claims against reference' },
  { step: 5, title: 'Building Results', desc: 'Putting together the final report' }
];

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({ currentStage }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">Running Analysis Pipeline...</h3>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" />
          Step {currentStage.step} / 5
        </span>
      </div>

      <div className="space-y-2">
        {STAGES.map((s) => {
          const isCompleted = s.step < currentStage.step;
          const isCurrent = s.step === currentStage.step;

          return (
            <div
              key={s.step}
              className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs ${
                isCurrent
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : isCompleted
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-dashed border-gray-200 text-gray-400'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
              )}
              <span className="font-semibold">{s.title}</span>
              <span className="text-gray-400 hidden sm:inline">— {isCurrent ? currentStage.detail : s.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
