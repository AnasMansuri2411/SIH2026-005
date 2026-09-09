import React from 'react';
import { 
  Shield, 
  Search, 
  Sparkles, 
  Presentation, 
  Activity, 
  UserCheck 
} from 'lucide-react';
import { RoleType } from '../../types/intelligence';

interface HeaderProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  demoMode: boolean;
  onToggleDemoMode: () => void;
  onOpenPresentation: () => void;
  onOpenCommandPalette: () => void;
  activeCaseId: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  demoMode,
  onToggleDemoMode,
  onOpenPresentation,
  onOpenCommandPalette,
  activeCaseId,
}) => {
  return (
    <header className="h-16 bg-[#0B0C10] border-b border-[#1C1F26] px-4 flex items-center justify-between z-30 select-none sticky top-0">
      {/* Left: Branding & Case Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/60 flex items-center justify-center text-[#8B1E2F] shadow-[0_0_12px_rgba(139,30,47,0.3)]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm tracking-wider text-[#E8E3DA]">
                NEXCRIME
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#1C1F26] text-[#8C929D] border border-[#252932] rounded-sm uppercase">
                v2.6 // SOV-INTEL
              </span>
            </div>
            <p className="text-[10px] text-[#8C929D] font-mono hidden md:block leading-tight">
              Sovereign Criminal Network Intelligence Platform
            </p>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-[#1C1F26] hidden sm:block" />

        {/* Active Case Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-[#12151B] border border-[#1C1F26] px-2.5 py-1 rounded-sm">
          <span className="w-2 h-2 rounded-full bg-[#8B1E2F] animate-ping" />
          <span className="text-[11px] font-mono text-[#8C929D]">CLASSIFIED:</span>
          <span className="text-[11px] font-mono font-semibold text-[#E8E3DA]">{activeCaseId}</span>
          <span className="text-[9px] font-mono uppercase px-1 bg-[#8B1E2F]/20 text-[#E8E3DA] rounded-sm border border-[#8B1E2F]/40">
            ACTIVE TARGET
          </span>
        </div>
      </div>

      {/* Middle: Quick Search / Command Palette bar */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full h-9 bg-[#12151B] hover:bg-[#1C1F26] border border-[#1C1F26] hover:border-[#8B1E2F]/40 rounded-sm px-3 flex items-center justify-between text-xs text-[#8C929D] transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#8B1E2F] group-hover:scale-110 transition-transform" />
            <span>Search suspect, phone, vehicle, account, or case...</span>
          </div>
          <kbd className="text-[10px] font-mono bg-[#1C1F26] px-1.5 py-0.5 rounded-sm border border-[#252932] text-[#8C929D]">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Telemetry, Demo Toggle, Presentation, Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Command Palette Button for small screens */}
        <button
          onClick={onOpenCommandPalette}
          title="Open Command Palette (Ctrl+K)"
          className="lg:hidden p-2 rounded-sm bg-[#12151B] border border-[#1C1F26] text-[#8C929D] hover:text-[#E8E3DA]"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Presentation Mode Button */}
        <button
          onClick={onOpenPresentation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] border border-[#8B1E2F]/60 text-xs font-mono font-semibold text-[#E8E3DA] shadow-[0_0_15px_rgba(139,30,47,0.25)] transition-all cursor-pointer"
        >
          <Presentation className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">JURY BRIEFING</span>
        </button>

        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemoMode}
          title="Toggle Synthetic Demo Dataset"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-all ${
            demoMode
              ? 'bg-[#1C1F26] text-[#E8E3DA] border-[#252932]'
              : 'bg-[#12151B] text-[#8C929D] border-[#1C1F26]'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#8B1E2F]" />
          <span className="hidden md:inline">SYNTHETIC DATA</span>
        </button>

        {/* Operational Telemetry */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-[#12151B] border border-[#1C1F26] rounded-sm text-[11px] font-mono">
          <Activity className="w-3.5 h-3.5 text-[#8B1E2F]" />
          <span className="text-[#E8E3DA] font-semibold">SOVEREIGN NETWORK</span>
          <span className="text-[10px] text-[#8C929D]">| 99.8%</span>
        </div>

        {/* Role Switcher */}
        <div className="relative flex items-center gap-1 bg-[#12151B] border border-[#1C1F26] rounded-sm px-2 py-1">
          <UserCheck className="w-3.5 h-3.5 text-[#8B1E2F]" />
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as RoleType)}
            aria-label="User RBAC Role"
            className="bg-transparent text-xs font-mono font-medium text-[#E8E3DA] focus:outline-none cursor-pointer pr-1"
          >
            <option value="INVESTIGATOR" className="bg-[#1C1F26] text-[#E8E3DA]">
              INVESTIGATOR
            </option>
            <option value="ANALYST" className="bg-[#1C1F26] text-[#E8E3DA]">
              ANALYST
            </option>
            <option value="SUPERVISOR" className="bg-[#1C1F26] text-[#E8E3DA]">
              SUPERVISOR
            </option>
            <option value="AUDITOR" className="bg-[#1C1F26] text-[#E8E3DA]">
              AUDITOR
            </option>
          </select>
        </div>
      </div>
    </header>
  );
};
