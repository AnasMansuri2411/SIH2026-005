import React from 'react';
import { EvidenceStatus } from '../../types/intelligence';
import { ShieldCheck, Cpu, Database } from 'lucide-react';

interface CyberBadgeProps {
  status?: EvidenceStatus | string;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
  icon?: boolean;
}

export const CyberBadge: React.FC<CyberBadgeProps> = ({
  status,
  variant,
  size = 'sm',
  children,
  icon = true,
}) => {
  let resolvedVariant = variant || 'cyan';
  let label = children;
  let IconComp = null;

  if (status === 'HUMAN_VERIFIED') {
    resolvedVariant = 'emerald';
    label = label || 'HUMAN VERIFIED';
    IconComp = ShieldCheck;
  } else if (status === 'AI_INFERRED') {
    resolvedVariant = 'cyan';
    label = label || 'AI INFERRED';
    IconComp = Cpu;
  } else if (status === 'RAW_DATA') {
    resolvedVariant = 'slate';
    label = label || 'RAW DATA';
    IconComp = Database;
  }

  const variantStyles = {
    cyan: 'bg-[#1C1F26] text-[#E8E3DA] border-[#252932]',
    emerald: 'bg-[#1C1F26] text-[#E8E3DA] border-[#E8E3DA]/25',
    amber: 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]/40',
    rose: 'bg-[#8B1E2F] text-[#E8E3DA] border-[#8B1E2F]/70 shadow-[0_0_10px_rgba(139,30,47,0.3)]',
    slate: 'bg-[#12151B] text-[#8C929D] border-[#1C1F26]',
  }[resolvedVariant];

  const sizeStyles = size === 'sm' ? 'text-[9px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium tracking-wider rounded-sm border uppercase ${variantStyles} ${sizeStyles}`}
    >
      {icon && IconComp && <IconComp className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{label}</span>
    </span>
  );
};
