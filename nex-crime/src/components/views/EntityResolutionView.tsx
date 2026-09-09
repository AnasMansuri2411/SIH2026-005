import React, { useState } from 'react';
import { 
  Fingerprint, 
  GitMerge, 
  Check, 
  X, 
  ShieldAlert, 
  ArrowRight, 
  Info,
  CheckCircle,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { DEMO_RESOLUTION_CANDIDATES } from '../../data/entityResolutionData';
import { ResolutionCandidate } from '../../types/intelligence';

export const EntityResolutionView: React.FC = () => {
  const [candidates, setCandidates] = useState<ResolutionCandidate[]>(DEMO_RESOLUTION_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<ResolutionCandidate>(DEMO_RESOLUTION_CANDIDATES[0]);

  const handleMerge = (id: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'MERGED' } : c));
  };

  const handleReject = (id: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'REJECTED' } : c));
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                NEURO-SYMBOLIC ENTITY RESOLUTION
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                DEDUPLICATION & SYNTHETIC IDENTITY LINKAGE
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Entity Resolution & Proxy Identity Analysis
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Connects disparate identities, burner handsets, phonetic name variants, and nominee proxy directors into single resolved entities.
            </p>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#8B1E2F]/30 text-xs font-mono text-[#E8E3DA] max-w-sm flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-snug">Human investigator approval is mandatory before permanent record consolidation.</span>
          </div>
        </div>
      </div>

      {/* Main Two Column View: Candidate Match Card & Factor Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Candidates List */}
        <div className="noir-panel p-5 border border-[#1C1F26]">
          <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-[#8B1E2F]" />
            Pending Resolution Pairs ({candidates.length})
          </h2>

          <div className="space-y-2.5">
            {candidates.map((c) => {
              const isSelected = selectedCandidate.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8B1E2F]/15 border-[#8B1E2F] shadow-[0_0_12px_rgba(139,30,47,0.2)]'
                      : 'bg-[#12151B] border-[#252932] hover:border-[#8C929D]/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                      {c.candidateA.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                      {c.similarityPercentage}% Match
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#8C929D] flex items-center gap-1.5">
                    <span>vs.</span>
                    <span className="text-[#E8E3DA]">{c.candidateB.label}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#252932] text-[10px] font-mono">
                    <span className="text-[#8C929D]">{c.candidateA.type}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-sm font-semibold border ${
                        c.status === 'MERGED'
                          ? 'bg-[#1C1F26] text-[#E8E3DA] border-[#252932]'
                          : c.status === 'REJECTED'
                          ? 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]/40'
                          : 'bg-[#12151B] text-[#8C929D] border-[#252932]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Deep Comparison & Similarity Factor Visualizer */}
        <div className="lg:col-span-2 noir-panel p-6 border border-[#1C1F26] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#8C929D] uppercase tracking-wider">
                COMPARATIVE RESOLUTION DOSSIER // {selectedCandidate.id}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#8C929D]">CONFIDENCE:</span>
                <span className="text-base font-mono font-bold text-[#E8E3DA]">
                  {selectedCandidate.similarityPercentage}%
                </span>
              </div>
            </div>

            {/* Side by side entity cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Entity A */}
              <div className="p-4 rounded-sm bg-[#12151B] border border-[#252932]">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932] uppercase font-semibold">
                  CANDIDATE A (ACTIVE DOCKET)
                </span>
                <h3 className="text-sm font-bold font-mono text-[#E8E3DA] mt-2">
                  {selectedCandidate.candidateA.label}
                </h3>
                <div className="mt-2 space-y-1 text-xs font-mono text-[#8C929D]">
                  <p>Identifier: {selectedCandidate.candidateA.ident}</p>
                  <p>Origin: {selectedCandidate.candidateA.source}</p>
                </div>
              </div>

              {/* Entity B */}
              <div className="p-4 rounded-sm bg-[#12151B] border border-[#252932]">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932] uppercase font-semibold">
                  CANDIDATE B (ARCHIVAL / EXTERNAL)
                </span>
                <h3 className="text-sm font-bold font-mono text-[#E8E3DA] mt-2">
                  {selectedCandidate.candidateB.label}
                </h3>
                <div className="mt-2 space-y-1 text-xs font-mono text-[#8C929D]">
                  <p>Identifier: {selectedCandidate.candidateB.ident}</p>
                  <p>Origin: {selectedCandidate.candidateB.source}</p>
                </div>
              </div>
            </div>

            {/* 6 Matching Factor Bars */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-2 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#8B1E2F]" />
                Multi-Factor Similarity Decomposition
              </h3>

              {Object.entries(selectedCandidate.matchingFactors).map(([factor, score]) => {
                const factorLabels: Record<string, string> = {
                  nameSimilarity: 'Name Phonetic Similarity (Indic Double Metaphone)',
                  phoneOverlap: 'Device / IMEI Hardware Overlap',
                  locationOverlap: 'Co-Location & Cell Tower Triangulation Overlap',
                  transactionPattern: 'Transaction Pattern & Tranche Velocity Match',
                  graphTopology: 'Graph Topological Neighborhood (2-Hop Jaccard)',
                  aliasSimilarity: 'Alias & Moniker Informant Correlation',
                };

                return (
                  <div key={factor} className="p-2.5 rounded-sm bg-[#12151B] border border-[#252932]">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-[#8C929D] text-[11px]">{factorLabels[factor] || factor}</span>
                      <span className="text-[#E8E3DA] font-bold">{score}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-none bg-[#0B0C10] border border-[#252932] overflow-hidden">
                      <div
                        className="h-full bg-[#8B1E2F]"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Recommendation Box */}
            <div className="mt-4 p-3.5 rounded-sm bg-[#12151B] border border-[#8B1E2F]/30 text-xs text-[#E8E3DA] font-sans">
              <span className="font-bold font-mono text-[#8B1E2F] block mb-0.5 text-xs uppercase tracking-wider">
                AI ANALYTICAL ADVISORY:
              </span>
              <p className="text-[#8C929D] text-xs leading-relaxed">
                {selectedCandidate.aiRecommendation}
              </p>
            </div>
          </div>

          {/* Action Buttons: MERGE, REVIEW, REJECT */}
          <div className="mt-6 pt-4 border-t border-[#252932] flex items-center justify-end gap-3">
            <button
              onClick={() => handleReject(selectedCandidate.id)}
              className="px-4 py-2 rounded-sm bg-[#12151B] hover:bg-[#252932] text-[#8C929D] hover:text-[#E8E3DA] border border-[#252932] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              REJECT CANDIDATE
            </button>

            <button
              onClick={() => handleMerge(selectedCandidate.id)}
              className="px-5 py-2 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-bold text-xs font-mono shadow-[0_0_15px_rgba(139,30,47,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              CONFIRM & MERGE CANDIDATES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
