import React from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  AlertCircle, 
  Database,
  Key,
  Clock
} from 'lucide-react';
import { RoleType } from '../../types/intelligence';

interface SettingsViewProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  officerId: string;
  department: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentRole,
  onRoleChange,
  officerId,
  department,
}) => {
  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="noir-panel p-6 border border-[#1C1F26]">
        <h1 className="text-2xl font-bold font-mono text-[#E8E3DA]">
          System Security & Operational Policy Settings
        </h1>
        <p className="text-xs text-[#8C929D] font-mono mt-1">
          Role-Based Access Control (RBAC) & Sovereign Vault Telemetry
        </p>
      </div>

      {/* RBAC Role Switcher Card */}
      <div className="noir-panel p-6 border border-[#1C1F26] space-y-4">
        <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#8B1E2F]" />
          Role-Based Access Control (RBAC) Configuration
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          {(['INVESTIGATOR', 'ANALYST', 'SUPERVISOR', 'AUDITOR'] as const).map((r) => {
            const isCurrent = currentRole === r;
            return (
              <div
                key={r}
                onClick={() => onRoleChange(r)}
                className={`p-4 rounded-sm border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#8B1E2F]/15 border-[#8B1E2F] shadow-[0_0_12px_rgba(139,30,47,0.2)]'
                    : 'bg-[#12151B] border-[#252932] hover:border-[#8C929D]/50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#E8E3DA]">{r}</span>
                  {isCurrent && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#8B1E2F] text-[#E8E3DA] font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#8C929D] font-sans mt-1 leading-relaxed">
                  {r === 'INVESTIGATOR' && 'Full access to case docket search, entity intelligence, and dossier generation.'}
                  {r === 'ANALYST' && 'Advanced access to Inter-Centrality simulation, graph GNN embeddings, and temporal models.'}
                  {r === 'SUPERVISOR' && 'Authority to approve entity resolution mergers and sign judicial court evidence briefs.'}
                  {r === 'AUDITOR' && 'Read-only access to tamper-evident hash ledger, Merkle roots, and compliance audits.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Session Security Details */}
      <div className="noir-panel p-6 border border-[#1C1F26] space-y-4 text-xs font-mono">
        <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#8B1E2F]" />
          Active Session & Sovereignty Parameters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Authenticated Officer:</span>
            <span className="text-[#E8E3DA] font-bold mt-0.5 block">{officerId}</span>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Department:</span>
            <span className="text-[#E8E3DA] font-bold mt-0.5 block">{department}</span>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Session Timeout:</span>
            <span className="text-[#E8E3DA] font-bold mt-0.5 block">23m 40s (Auto-Locking)</span>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Data Classification:</span>
            <span className="text-[#8B1E2F] font-bold mt-0.5 block">RESTRICTED // SYNTHETIC PROTOTYPE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
