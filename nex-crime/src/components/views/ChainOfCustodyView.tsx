import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  Hash, 
  Lock, 
  Cpu, 
  FileCheck, 
  RefreshCw, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';
import { DEMO_CHAIN_OF_CUSTODY } from '../../data/auditLog';
import { ChainOfCustodyBlock } from '../../types/intelligence';
import { formatDateTime, truncateHash } from '../../utils/formatters';

export const ChainOfCustodyView: React.FC = () => {
  const [blocks, setBlocks] = useState<ChainOfCustodyBlock[]>(DEMO_CHAIN_OF_CUSTODY);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(true);

  const handleVerifyLedger = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
    }, 800);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                CRYPTOGRAPHIC INTEGRITY LEDGER
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                TAMPER-EVIDENT EVIDENCE VAULT
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Chain of Custody & Audit Trail
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Maintains an immutable cryptographic hash chain tracking every forensic transformation: from raw FIR intake and OCR extraction to AI signal generation and investigator sign-off.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleVerifyLedger}
              disabled={isVerifying}
              className="px-4 py-2.5 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(139,30,47,0.3)] transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>{isVerifying ? 'VERIFYING DIGESTS...' : 'AUDIT LEDGER INTEGRITY'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status Pill */}
      {verifiedSuccess && (
        <div className="p-3.5 rounded-sm bg-[#12151B] border border-[#252932] flex items-center justify-between font-mono text-xs text-[#E8E3DA]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#8B1E2F]" />
            <span>LEDGER AUDIT VERIFIED: All 7 blocks verified with zero hash discrepancies.</span>
          </div>
          <span className="text-[10px] text-[#8C929D]">Merkle Root: 11094ba...8823</span>
        </div>
      )}

      {/* Sequential Blocks Timeline */}
      <div className="space-y-4">
        {blocks.map((block) => (
          <div
            key={block.blockIndex}
            className="noir-panel p-5 border border-[#1C1F26] hover:border-[#8B1E2F]/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-sm bg-[#12151B] text-[#E8E3DA] border border-[#252932] font-mono text-xs font-bold">
                  BLOCK #{block.blockIndex}
                </span>
                <span className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wide">
                  {block.action.replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] font-mono text-[#8C929D]">
                  [{block.recordId}]
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#8C929D]">{formatDateTime(block.timestamp)}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#12151B] text-[#E8E3DA] border border-[#252932] font-bold">
                  {block.integrityStatus}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8C929D] font-sans leading-relaxed mb-3">
              {block.details}
            </p>

            {/* Cryptographic Hash Strip */}
            <div className="p-3 rounded-sm bg-[#0B0C10] border border-[#252932] grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[11px]">
              <div>
                <span className="text-[#8C929D] block text-[9px] uppercase tracking-wider">Actor / Signer</span>
                <span className="text-[#E8E3DA] font-semibold flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3 h-3 text-[#8B1E2F]" />
                  {block.actor} ({block.role})
                </span>
              </div>

              <div>
                <span className="text-[#8C929D] block text-[9px] uppercase tracking-wider">Previous Digest</span>
                <span className="text-[#8C929D] font-mono mt-0.5 block" title={block.previousHash}>
                  {truncateHash(block.previousHash, 8, 8)}
                </span>
              </div>

              <div>
                <span className="text-[#8C929D] block text-[9px] uppercase tracking-wider">SHA-256 Digest</span>
                <span className="text-[#E8E3DA] font-mono font-bold mt-0.5 block" title={block.blockHash}>
                  {truncateHash(block.blockHash, 8, 8)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
