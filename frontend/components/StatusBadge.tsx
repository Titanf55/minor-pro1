import React from 'react';
import { ClaimClassification } from '@/lib/types';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ClaimClassification;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const configs: Record<ClaimClassification, { bg: string; icon: typeof CheckCircle2; label: string }> = {
    Supported: {
      bg: 'bg-green-100 text-green-800 border border-green-300',
      icon: CheckCircle2,
      label: 'Supported'
    },
    Contradicted: {
      bg: 'bg-red-100 text-red-800 border border-red-300',
      icon: XCircle,
      label: 'Contradicted'
    },
    'Insufficient Evidence': {
      bg: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      icon: HelpCircle,
      label: 'Insufficient Evidence'
    }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${config.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};
