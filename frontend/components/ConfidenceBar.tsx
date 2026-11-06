import React from 'react';

interface ConfidenceBarProps {
  confidence: number;
  rawConfidence?: number;
  threshold?: number;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  confidence,
  rawConfidence,
  threshold = 0.82
}) => {
  const pct = Math.round(confidence * 100);
  const thresholdPct = Math.round(threshold * 100);

  const barColor =
    confidence >= threshold
      ? 'bg-blue-500'
      : confidence >= 0.65
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>
          Confidence: <strong className="text-gray-900">{pct}%</strong>
          {rawConfidence !== undefined && rawConfidence !== confidence && (
            <span className="text-gray-400 ml-1">(raw: {(rawConfidence * 100).toFixed(0)}%)</span>
          )}
        </span>
        <span className="text-gray-400">threshold: {thresholdPct}%</span>
      </div>
      <div className="relative w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gray-500"
          style={{ left: `${thresholdPct}%` }}
        />
      </div>
    </div>
  );
};
