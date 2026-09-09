import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose';
  trend?: string;
  trendPositive?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  variant = 'cyan',
  trend,
  trendPositive,
  onClick,
}) => {
  const accentColors = {
    cyan: 'border-[#252932] text-[#E8E3DA] bg-[#12151B]',
    emerald: 'border-[#E8E3DA]/20 text-[#E8E3DA] bg-[#12151B]',
    amber: 'border-[#8B1E2F]/40 text-[#E8E3DA] bg-[#8B1E2F]/10',
    rose: 'border-[#8B1E2F]/60 text-[#8B1E2F] bg-[#8B1E2F]/15',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`noir-panel rounded-sm p-4 border border-[#1C1F26] transition-all duration-200 hover:border-[#8B1E2F]/40 ${
        onClick ? 'cursor-pointer hover:bg-[#252932]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#8C929D] mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              {value}
            </h3>
            {subValue && (
              <span className="text-xs text-[#8C929D] font-mono">{subValue}</span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-sm border ${accentColors}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-2.5 border-t border-[#1C1F26] flex items-center justify-between text-xs">
          <span
            className={`font-mono font-medium ${
              trendPositive ? 'text-[#E8E3DA]' : 'text-[#8B1E2F]'
            }`}
          >
            {trend}
          </span>
          <span className="text-[10px] text-[#8C929D] font-mono">Live Telemetry</span>
        </div>
      )}
    </div>
  );
};
