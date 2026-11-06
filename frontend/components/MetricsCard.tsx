import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  description?: string;
  icon?: LucideIcon;
  badge?: {
    text: string;
    variant: 'positive' | 'negative' | 'neutral' | 'info';
  };
  onClick?: () => void;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subValue,
  description,
  icon: Icon,
  badge,
  onClick
}) => {
  const badgeStyles = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    negative: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 rounded-xl p-5 shadow-xs transition-all ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        {Icon && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-slate-500 font-medium">{subValue}</span>
        )}
      </div>

      {(badge || description) && (
        <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          {description && (
            <span className="text-slate-500 truncate">{description}</span>
          )}
          {badge && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ml-auto ${
                badgeStyles[badge.variant]
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

