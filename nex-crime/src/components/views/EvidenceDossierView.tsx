import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Hash, 
  Calendar,
  AlertTriangle,
  Building
} from 'lucide-react';
import { IntelligenceCase, GraphNode, GraphEdge } from '../../types/intelligence';
import { formatINR, formatDateTime } from '../../utils/formatters';

interface EvidenceDossierViewProps {
  caseData: IntelligenceCase;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const EvidenceDossierView: React.FC<EvidenceDossierViewProps> = ({
  caseData,
  nodes,
  edges,
}) => {
  const [isGenerated, setIsGenerated] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner & Print Controls */}
      <div className="noir-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
              JUDICIAL-GRADE EVIDENCE BRIEF
            </span>
            <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
              TAMPER-EVIDENT REPORT PREVIEW
            </span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-[#E8E3DA]">
            Auditable Evidence Dossier Generator
          </h1>
          <p className="text-xs text-[#8C929D] font-mono mt-0.5">
            Compiled under the supervision of {caseData.leadInvestigator}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(139,30,47,0.3)] transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / EXPORT DOSSIER (PDF)</span>
          </button>
        </div>
      </div>

      {/* Printable Courtroom-Grade Document Container */}
      <div className="max-w-4xl mx-auto bg-[#0B0C10] border border-[#252932] rounded-sm p-8 sm:p-12 shadow-2xl space-y-8 text-[#E8E3DA]">
        {/* Document Header & Security Classification Watermark */}
        <div className="border-b border-[#252932] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E8E3DA] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#8B1E2F]" />
              <span>GOVERNMENT OF GUJARAT // STATE CYBER CRIME COMMAND</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#E8E3DA] mt-1 tracking-tight">
              SPECIAL INVESTIGATION REPORT (CASE BRIEF)
            </h2>
            <p className="text-xs font-mono text-[#8C929D]">
              Dossier Reference: DOSSIER-26189-9941 // Section 65B Indian Evidence Act Certified
            </p>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#8B1E2F]/40 text-center font-mono">
            <span className="text-xs font-bold text-[#8B1E2F] block tracking-widest">
              RESTRICTED
            </span>
            <span className="text-[10px] text-[#8C929D]">
              SYNTHETIC LAW ENFORCEMENT DEMO
            </span>
          </div>
        </div>

        {/* Section 1: Case Details */}
        <div className="space-y-3 text-xs font-sans">
          <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase border-b border-[#252932] pb-1 tracking-wider">
            1. CASE INFORMATION & JURISDICTION
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px]">
            <div>
              <span className="text-[#8C929D] block">Case ID:</span>
              <span className="font-bold text-[#E8E3DA]">{caseData.id}</span>
            </div>
            <div>
              <span className="text-[#8C929D] block">Operation Code:</span>
              <span className="font-bold text-[#E8E3DA]">{caseData.codeName}</span>
            </div>
            <div>
              <span className="text-[#8C929D] block">Lead Officer:</span>
              <span className="font-bold text-[#E8E3DA]">{caseData.leadInvestigator}</span>
            </div>
            <div>
              <span className="text-[#8C929D] block">Date Opened:</span>
              <span className="text-[#8C929D]">{formatDateTime(caseData.dateOpened)}</span>
            </div>
          </div>
          <p className="text-[#8C929D] leading-relaxed pt-2">
            <strong className="text-[#E8E3DA]">Executive Summary:</strong> {caseData.summary}
          </p>
        </div>

        {/* Section 2: Key Subject Identification */}
        <div className="space-y-3 text-xs font-sans">
          <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase border-b border-[#252932] pb-1 tracking-wider">
            2. PRIMARY INVESTIGATIVE SUBJECTS (INTER-CENTRALITY RANKED)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#252932] text-[#8C929D] text-[10px] uppercase">
                  <th className="pb-2 font-semibold">Node ID</th>
                  <th className="pb-2 font-semibold">Subject Name</th>
                  <th className="pb-2 font-semibold">Role / Assessment</th>
                  <th className="pb-2 font-semibold">Risk Score</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1F26]">
                {nodes.filter(n => n.type === 'PERSON').map(p => (
                  <tr key={p.id}>
                    <td className="py-2 text-[#8C929D]">{p.id}</td>
                    <td className="py-2 font-bold text-[#E8E3DA]">{p.label}</td>
                    <td className="py-2 text-[#8C929D]">{p.attributes.roleTitle}</td>
                    <td className="py-2 text-[#8B1E2F] font-bold">{p.riskScore}%</td>
                    <td className="py-2 text-[#E8E3DA]">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Financial Conduits */}
        <div className="space-y-3 text-xs font-sans">
          <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase border-b border-[#252932] pb-1 tracking-wider">
            3. HAWALA & ILLICIT ASSET SUMMARY
          </h3>
          <p className="text-[#8C929D]">
            Total transactional throughput quantified: <strong className="text-[#E8E3DA]">{formatINR(caseData.stats.financialFlowINR)}</strong> across 4 primary accounts and 2 front corporations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
              <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">MULE AGGREGATOR</span>
              <span className="font-bold text-[#E8E3DA]">ACC-HDFC-9912 (Ahmedabad)</span>
              <span className="text-[#8B1E2F] block mt-1 font-bold">₹2.40 Crore Structured Deposit</span>
            </div>
            <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
              <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">OFFSHORE HAWALA CONDUIT</span>
              <span className="font-bold text-[#E8E3DA]">ACC-AXIS-7703 (Mumbai)</span>
              <span className="text-[#8B1E2F] block mt-1 font-bold">₹8.10 Crore Transit Outflow</span>
            </div>
          </div>
        </div>

        {/* Section 4: Explainable AI Certification & Evidence Subgraph */}
        <div className="space-y-3 text-xs font-sans">
          <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase border-b border-[#252932] pb-1 tracking-wider">
            4. NEURO-SYMBOLIC GRAPH EXPLANATION & LEGAL RATIONALE
          </h3>
          <div className="p-4 bg-[#12151B] rounded-sm border border-[#252932] space-y-2 text-xs">
            <p className="text-[#8C929D] leading-relaxed">
              Analytical flag generated via PyTorch Geometric Heterogeneous Graph Attention Network (Hetero-GAT). Target node <strong className="text-[#E8E3DA]">Aarav Mehta (P-101)</strong> exhibited <strong className="text-[#E8E3DA]">36% structural bridge centrality</strong> directly coupling logistics fleet drivers to hawala brokers.
            </p>
            <p className="text-[#8C929D] font-mono text-[11px]">
              GNNExplainer minimal subgraph components: P-101 ↔ PH-02 ↔ LOC-02 ↔ BA-01 ↔ ORG-01.
            </p>
          </div>
        </div>

        {/* Section 5: Cryptographic Chain of Custody Stamp */}
        <div className="border-t border-[#252932] pt-6 space-y-3 font-mono text-xs">
          <h3 className="text-xs font-bold text-[#E8E3DA] uppercase tracking-wider">
            5. PROTOTYPE INTEGRITY LEDGER VERIFICATION
          </h3>
          <div className="p-4 bg-[#12151B] rounded-sm border border-[#252932] space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#8C929D]">Dossier SHA-256 Digest:</span>
              <span className="text-[#E8E3DA] font-bold">8812fa004419b7021c99014418a0029b47012399aa01823901baef44109822a1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C929D]">Merkle Root Verification:</span>
              <span className="text-[#E8E3DA]">VERIFIED_IMMUTABLE (Block #1087)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C929D]">Supervisory Signature:</span>
              <span className="text-[#E8E3DA]">SP_JUDICIAL_DESK (Digital Key Signed)</span>
            </div>
          </div>
        </div>

        {/* Signature Block */}
        <div className="pt-8 border-t border-[#252932] flex justify-between items-end font-mono text-xs">
          <div>
            <p className="text-[#8C929D]">Investigator Sign-off:</p>
            <p className="font-bold text-[#E8E3DA] mt-4">Insp. V. K. Suryavanshi</p>
            <p className="text-[10px] text-[#8C929D]">Cyber Crime Branch, CID</p>
          </div>
          <div className="text-right">
            <p className="text-[#8C929D]">Supervisory Approval:</p>
            <p className="font-bold text-[#E8E3DA] mt-4">Superintendent of Police</p>
            <p className="text-[10px] text-[#8C929D]">Economic Offenses Wing</p>
          </div>
        </div>
      </div>
    </div>
  );
};
