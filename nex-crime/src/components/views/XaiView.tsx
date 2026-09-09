import React, { useState } from 'react';
import { 
  HelpCircle, 
  Cpu, 
  GitFork, 
  ShieldCheck, 
  Clock, 
  Layers, 
  ArrowRight,
  CheckCircle,
  Database,
  BarChart3
} from 'lucide-react';
import { GraphNode } from '../../types/intelligence';
import { formatDateTime } from '../../utils/formatters';

interface XaiViewProps {
  nodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
}

export const XaiView: React.FC<XaiViewProps> = ({
  nodes,
  onSelectNode,
}) => {
  // Target suspects with rich XAI details
  const xaiNodes = nodes.filter(n => n.xaiExplanation);
  const [selectedTargetId, setSelectedTargetId] = useState<string>(xaiNodes[0]?.id || 'P-101');

  const activeNode = xaiNodes.find(n => n.id === selectedTargetId) || xaiNodes[0] || nodes[0];
  const explanation = activeNode.xaiExplanation;

  return (
    <div className="space-y-6 select-none">
      {/* Top Header Card */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                TRUST & EXPLAINABILITY ENGINE (XAI)
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                GNNEXPLAINER & SUBGRAPHX DECOMPOSITION
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Why Was This Entity Flagged?
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Provides transparent, court-admissible causal justifications for neural network detections, replacing black-box risk scores with auditable evidence factor weightings.
            </p>
          </div>

          {/* Suspect Picker */}
          <div className="flex items-center gap-2 bg-[#12151B] p-2 rounded-sm border border-[#252932] font-mono text-xs">
            <span className="text-[#8C929D]">FLAGGED TARGET:</span>
            <select
              value={selectedTargetId}
              onChange={(e) => setSelectedTargetId(e.target.value)}
              className="bg-[#1C1F26] border border-[#252932] rounded-sm px-2.5 py-1 text-[#E8E3DA] focus:outline-none cursor-pointer"
            >
              {xaiNodes.map(n => (
                <option key={n.id} value={n.id}>{n.label} ({n.id})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Natural Language Summary & Evidence Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Flagged Subject Profile & Evidence Subgraph Nodes */}
        <div className="noir-panel p-5 border border-[#1C1F26] space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8C929D]">SUBJECT DOSSIER</span>
              <span className="text-xs font-mono font-bold text-[#8B1E2F]">
                RISK: {activeNode.riskScore}%
              </span>
            </div>
            <h2 className="text-base font-bold font-mono text-[#E8E3DA] mt-1">
              {activeNode.label}
            </h2>
            <p className="text-xs text-[#8C929D] font-mono">{activeNode.id} // {activeNode.type}</p>
          </div>

          <div className="p-3.5 bg-[#12151B] rounded-sm border border-[#252932]">
            <p className="text-[10px] font-mono text-[#8C929D] uppercase">Model Signal</p>
            <p className="text-xs font-mono text-[#E8E3DA] font-semibold mt-1">
              STRUCTURAL_BRIDGE_ANOMALY (Hetero-GAT Tier-1)
            </p>
            <p className="text-[11px] text-[#8C929D] font-sans mt-1 leading-relaxed">
              Flagged due to high eigenvector centrality bridging underground banking and cargo transit channels.
            </p>
          </div>

          {/* Evidence Subgraph Minimalist Cluster */}
          {explanation && (
            <div>
              <p className="text-[10px] font-mono text-[#8C929D] uppercase tracking-wider mb-2">
                Minimalist Evidence Subgraph ({explanation.evidenceSubgraphNodeIds.length} Nodes)
              </p>
              <div className="space-y-1.5">
                {explanation.evidenceSubgraphNodeIds.map((subId) => {
                  const subNode = nodes.find(n => n.id === subId);
                  return (
                    <div
                      key={subId}
                      onClick={() => subNode && onSelectNode(subNode)}
                      className="p-2 rounded-sm bg-[#12151B] border border-[#252932] hover:border-[#8B1E2F]/40 flex items-center justify-between text-xs font-mono cursor-pointer transition-colors"
                    >
                      <span className="text-[#E8E3DA] font-semibold">{subNode ? subNode.label : subId}</span>
                      <span className="text-[10px] text-[#8C929D]">{subNode?.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right 2 Cols: Contributing Factors Breakdown */}
        <div className="lg:col-span-2 noir-panel p-6 border border-[#1C1F26] space-y-6">
          {/* Plain-Language Judicial Explanation Summary */}
          <div className="p-4 rounded-sm bg-[#12151B] border border-[#8B1E2F]/40">
            <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B1E2F]" />
              Courtroom-Admissible Rationale
            </h3>
            <p className="text-xs text-[#E8E3DA] font-sans leading-relaxed">
              {explanation?.summary}
            </p>
          </div>

          {/* Detailed Factor Contributions */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#8B1E2F]" />
              Percentage-Weighted Causal Factors
            </h3>

            <div className="space-y-3">
              {explanation?.factors.map((factor, idx) => (
                <div key={idx} className="p-4 rounded-sm bg-[#12151B] border border-[#252932]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                        {factor.factor}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#1C1F26] text-[#8C929D] border border-[#252932]">
                        {factor.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#8C929D]">{formatDateTime(factor.timestamp)}</span>
                      <span className="text-xs font-bold text-[#E8E3DA]">
                        +{factor.contribution}% WEIGHT
                      </span>
                    </div>
                  </div>

                  {/* Factor Progress Bar */}
                  <div className="w-full h-1.5 rounded-none bg-[#0B0C10] border border-[#252932] overflow-hidden mb-2">
                    <div
                      className="h-full bg-[#8B1E2F]"
                      style={{ width: `${factor.contribution * 2.2}%` }}
                    />
                  </div>

                  <p className="text-xs text-[#8C929D] font-sans leading-relaxed">
                    {factor.description}
                  </p>

                  <div className="mt-2 text-[10px] font-mono text-[#8C929D] flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#8B1E2F]" />
                    <span>Evidence Reliability Score: {Math.round(factor.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
