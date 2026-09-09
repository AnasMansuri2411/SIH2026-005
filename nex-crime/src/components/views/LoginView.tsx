import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  UserCheck, 
  Building, 
  ArrowRight, 
  AlertCircle,
  Cpu
} from 'lucide-react';
import { RoleType } from '../../types/intelligence';

interface LoginViewProps {
  onLoginSuccess: (role: RoleType, officerId: string, department: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [officerId, setOfficerId] = useState('IND-CYB-8821');
  const [department, setDepartment] = useState('State Cyber Crime & Economic Offenses Command');
  const [role, setRole] = useState<RoleType>('INVESTIGATOR');
  const [authMethod, setAuthMethod] = useState('PKI_HARDWARE_TOKEN');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(role, officerId, department);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0C10] flex items-center justify-center p-4 overflow-hidden select-none font-sans">
      {/* Background Noir Grid */}
      <div className="absolute inset-0 noir-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#8B1E2F]/10 pointer-events-none" />

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-md noir-panel-elevated rounded-sm p-8 border border-[#1C1F26] shadow-[0_15px_50px_rgba(0,0,0,0.9)]">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/60 flex items-center justify-center text-[#8B1E2F] mb-3 shadow-[0_0_20px_rgba(139,30,47,0.3)]">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-mono tracking-widest text-[#E8E3DA]">
            NEXCRIME
          </h1>
          <p className="text-xs font-mono text-[#8C929D] uppercase tracking-wider mt-1">
            Sovereign Criminal Network Intelligence Platform
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#12151B] border border-[#252932] text-[10px] font-mono text-[#8C929D]">
            <Lock className="w-3 h-3 text-[#8B1E2F]" />
            SECURE CLEARANCE PROTOCOL // RESTRICTED
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* Officer ID */}
          <div>
            <label className="block text-[#8C929D] uppercase text-[10px] mb-1">
              Officer Credential ID
            </label>
            <div className="relative flex items-center">
              <Key className="w-4 h-4 text-[#8B1E2F] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                required
                className="w-full bg-[#12151B] border border-[#252932] focus:border-[#8B1E2F]/60 rounded-sm pl-9 pr-3 py-2 text-[#E8E3DA] focus:outline-none"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-[#8C929D] uppercase text-[10px] mb-1">
              Department / Jurisdiction
            </label>
            <div className="relative flex items-center">
              <Building className="w-4 h-4 text-[#8B1E2F] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full bg-[#12151B] border border-[#252932] focus:border-[#8B1E2F]/60 rounded-sm pl-9 pr-3 py-2 text-[#E8E3DA] focus:outline-none"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-[#8C929D] uppercase text-[10px] mb-1">
              Assigned Operational Role
            </label>
            <div className="relative flex items-center">
              <UserCheck className="w-4 h-4 text-[#8B1E2F] absolute left-3 pointer-events-none" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as RoleType)}
                className="w-full bg-[#12151B] border border-[#252932] focus:border-[#8B1E2F]/60 rounded-sm pl-9 pr-3 py-2 text-[#E8E3DA] focus:outline-none cursor-pointer"
              >
                <option value="INVESTIGATOR">LEAD INVESTIGATOR (Case Analysis & Graph Exploration)</option>
                <option value="ANALYST">GRAPH AI ANALYST (Inter-Centrality & Disruption Modeling)</option>
                <option value="SUPERVISOR">COMMAND SUPERVISOR (Judicial Review & Dossier Sign-off)</option>
                <option value="AUDITOR">INDEPENDENT AUDITOR (Integrity Ledger & Chain of Custody)</option>
              </select>
            </div>
          </div>

          {/* Authentication Method */}
          <div>
            <label className="block text-[#8C929D] uppercase text-[10px] mb-1">
              Authentication Method
            </label>
            <select
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value)}
              className="w-full bg-[#12151B] border border-[#252932] focus:border-[#8B1E2F]/60 rounded-sm px-3 py-2 text-[#E8E3DA] focus:outline-none cursor-pointer"
            >
              <option value="PKI_HARDWARE_TOKEN">PKI Smart Token / Cryptographic Key (Simulated)</option>
              <option value="STATE_POLICE_SSO">State Police Sovereign SSO Gateway</option>
              <option value="BIOMETRIC_STATION">Biometric Terminal Passcode</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,30,47,0.3)] transition-all cursor-pointer border border-[#8B1E2F]"
          >
            {isLoading ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>INITIALIZING SECURE SESSION...</span>
              </>
            ) : (
              <>
                <span>ESTABLISH SECURE ACCESS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Legal & Technical Honesty Disclaimer */}
        <div className="mt-6 pt-4 border-t border-[#1C1F26] text-[10px] text-[#8C929D] font-mono text-center space-y-1">
          <p className="flex items-center justify-center gap-1 text-[#8B1E2F] font-semibold">
            <AlertCircle className="w-3 h-3" />
            SYNTHETIC INVESTIGATIVE DEMO DATASET
          </p>
          <p className="text-[#8C929D]/70">
            Compliant with Sovereign Responsible AI Decision-Support Guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
