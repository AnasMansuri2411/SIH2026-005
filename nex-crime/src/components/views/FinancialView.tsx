import React from 'react';
import { 
  CircleDollarSign, 
  ArrowRight, 
  RefreshCcw, 
  AlertTriangle, 
  ShieldCheck, 
  Landmark, 
  Building2, 
  User, 
  Layers
} from 'lucide-react';
import { GraphNode, GraphEdge } from '../../types/intelligence';
import { formatINR, formatDateTime } from '../../utils/formatters';

interface FinancialViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
}

export const FinancialView: React.FC<FinancialViewProps> = ({
  nodes,
  edges,
  onSelectNode,
}) => {
  // Financial edges
  const financialEdges = edges.filter(e => e.type === 'TRANSFERRED' || e.properties?.amountINR);

  // Bank accounts
  const bankAccounts = nodes.filter(n => n.type === 'BANK_ACCOUNT');

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                FINANCIAL INTELLIGENCE UNIT (FIU-IND)
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                CIRCULAR HAWALA & LAYERED FLOWS
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Hawala & Financial Network Flow
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Exposes cyclic laundering loops, cash mule aggregation accounts, and corporate shell transaction channels across cross-border nodes.
            </p>
          </div>

          <div className="p-3 rounded-sm bg-[#12151B] border border-[#252932] font-mono text-xs">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Total Tracked Flow:</span>
            <span className="text-xl font-bold text-[#E8E3DA]">{formatINR(161500000)}</span>
          </div>
        </div>
      </div>

      {/* Circular Laundering Loop Detector Banner */}
      <div className="noir-panel p-5 border border-[#8B1E2F]/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 text-[#8B1E2F] animate-spin" style={{ animationDuration: '12s' }} />
            <div>
              <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                ANALYTICAL SIGNAL // CIRCULAR RECOVERY LOOP DETECTED
              </h2>
              <p className="text-xs text-[#8C929D] font-sans mt-0.5">
                Cyclic transaction topology identified: funds originate in cash mule aggregation and cycle through foreign trade invoicing back into domestic logistics payroll.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40 font-bold">
            CONFIDENCE 95%
          </span>
        </div>

        {/* Circular Loop Flow Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[10px] text-[#8C929D] block uppercase tracking-wider">STEP 1: INJECTION</span>
            <span className="font-bold text-[#E8E3DA]">ACC-HDFC-9912</span>
            <span className="text-[#8B1E2F] font-bold block mt-1">₹2.40 Cr Structured Cash</span>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[10px] text-[#8C929D] block uppercase tracking-wider">STEP 2: LAYERING</span>
            <span className="font-bold text-[#E8E3DA]">ACC-ICICI-4411</span>
            <span className="text-[#E8E3DA] font-bold block mt-1">₹4.85 Cr Trade Invoices</span>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[10px] text-[#8C929D] block uppercase tracking-wider">STEP 3: TRANSIT</span>
            <span className="font-bold text-[#E8E3DA]">ACC-AXIS-7703</span>
            <span className="text-[#8B1E2F] font-bold block mt-1">₹8.10 Cr Hawala Wire</span>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
            <span className="text-[10px] text-[#8C929D] block uppercase tracking-wider">STEP 4: RESTITUTION</span>
            <span className="font-bold text-[#E8E3DA]">ACC-SBI-3390</span>
            <span className="text-[#E8E3DA] font-bold block mt-1">₹85.0 Lakhs Payroll</span>
          </div>
        </div>
      </div>

      {/* Account Ledgers & Transaction Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identified Account Profiles */}
        <div className="noir-panel p-5 border border-[#1C1F26]">
          <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#8B1E2F]" />
            Target Bank Accounts ({bankAccounts.length})
          </h3>

          <div className="space-y-2.5">
            {bankAccounts.map((acc) => (
              <div
                key={acc.id}
                onClick={() => onSelectNode(acc)}
                className="p-3 rounded-sm bg-[#12151B] border border-[#252932] hover:border-[#8B1E2F]/40 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#E8E3DA] block">
                      {acc.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C929D]">
                      {acc.attributes.bankName}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                    {acc.attributes.balanceINR ? formatINR(acc.attributes.balanceINR) : 'N/A'}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C929D] font-sans mt-2">
                  {acc.attributes.roleTitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Edge Transaction Log */}
        <div className="lg:col-span-2 noir-panel p-5 border border-[#1C1F26]">
          <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-3 flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4 text-[#8B1E2F]" />
            Audited Financial Edges ({financialEdges.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#252932] text-[#8C929D] text-[10px] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Source Account / Entity</th>
                  <th className="pb-3 font-semibold">Transfer Route</th>
                  <th className="pb-3 font-semibold">Target Entity</th>
                  <th className="pb-3 font-semibold text-right">Volume (INR)</th>
                  <th className="pb-3 font-semibold text-right">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1F26]">
                {financialEdges.map((edge) => (
                  <tr key={edge.id} className="hover:bg-[#1C1F26]/60 transition-colors">
                    <td className="py-3 text-[#E8E3DA] font-semibold">{edge.source}</td>
                    <td className="py-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#12151B] text-[#E8E3DA] border border-[#252932]">
                        {edge.type}
                      </span>
                    </td>
                    <td className="py-3 text-[#E8E3DA] font-semibold">{edge.target}</td>
                    <td className="py-3 text-right text-[#E8E3DA] font-bold">
                      {edge.properties?.amountINR ? formatINR(edge.properties.amountINR) : '₹10.5 Lakh'}
                    </td>
                    <td className="py-3 text-right text-[#8C929D]">
                      {Math.round(edge.confidence * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
