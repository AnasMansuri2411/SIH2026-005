import React, { useState } from 'react';
import { 
  GitFork, 
  AlertTriangle, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  TrendingDown, 
  Layers, 
  Network,
  CheckCircle,
  Zap
} from 'lucide-react';
import { GraphNode, GraphEdge } from '../../types/intelligence';
import { simulateInterCentralityDisruption, DisruptionResult } from '../../services/graphAnalytics';
import { formatINR } from '../../utils/formatters';

interface DisruptionSimulatorProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onApplyDisruption: (nodeId: string | null) => void;
  activeDisruptedNodeId: string | null;
  onSelectNode: (node: GraphNode) => void;
}

export const DisruptionSimulator: React.FC<DisruptionSimulatorProps> = ({
  nodes,
  edges,
  onApplyDisruption,
  activeDisruptedNodeId,
  onSelectNode,
}) => {
  // Rank candidate nodes by Inter-Centrality score
  const candidateNodes = [...nodes]
    .filter((n) => n.isDisruptionCandidate || (n.interCentralityScore && n.interCentralityScore > 0.5))
    .sort((a, b) => (b.interCentralityScore || 0) - (a.interCentralityScore || 0));

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    candidateNodes[0]?.id || 'P-101'
  );

  const disruptionResult: DisruptionResult | null = selectedCandidateId
    ? simulateInterCentralityDisruption(selectedCandidateId, nodes, edges)
    : null;

  const isSimulating = activeDisruptedNodeId === selectedCandidateId;

  const handleToggleSimulation = () => {
    if (isSimulating) {
      onApplyDisruption(null);
    } else {
      onApplyDisruption(selectedCandidateId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E2F]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                TACTICAL DIFFERENTIATOR
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                INTER-CENTRALITY TOPOLOGY
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Inter-Centrality Network Disruption Analysis
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Identifies structurally critical syndicate bottlenecks whose operational neutralization produces maximum network fragmentation and severs covert financial conduits.
            </p>
          </div>

          <div className="p-3.5 bg-[#12151B] rounded-sm border border-[#8B1E2F]/30 max-w-md text-xs font-mono text-[#E8E3DA] flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#8B1E2F] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#8B1E2F] uppercase text-[11px] tracking-wider">INVESTIGATIVE SUPPORT MANDATE</p>
              <p className="text-[11px] text-[#8C929D] font-sans mt-0.5 leading-snug">
                Models mathematical topological vulnerability for targeted disruption planning. Subject to constitutional judicial warrant verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Candidate Table & Live Simulation Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Node Candidates */}
        <div className="lg:col-span-2 noir-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-[#8B1E2F]" />
              <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                Ranked Structural Bottlenecks ({candidateNodes.length})
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#8C929D]">
              Hetero-GAT & Graph Laplacian Spectral Decomposition
            </span>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#252932] text-[#8C929D] text-[10px] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Priority Node</th>
                  <th className="pb-3 font-semibold">Entity Type</th>
                  <th className="pb-3 font-semibold text-right">Inter-Centrality</th>
                  <th className="pb-3 font-semibold text-right">Betweenness</th>
                  <th className="pb-3 font-semibold text-right">Edges</th>
                  <th className="pb-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1F26]">
                {candidateNodes.map((candidate) => {
                  const isSelected = selectedCandidateId === candidate.id;
                  const isActive = activeDisruptedNodeId === candidate.id;

                  return (
                    <tr
                      key={candidate.id}
                      onClick={() => setSelectedCandidateId(candidate.id)}
                      className={`hover:bg-[#1C1F26]/60 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#8B1E2F]/15 border-l-2 border-[#8B1E2F]' : ''
                      }`}
                    >
                      <td className="py-3 pr-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8B1E2F] animate-ping' : isSelected ? 'bg-[#8B1E2F]' : 'bg-[#8C929D]'}`} />
                          <div>
                            <span className="font-bold text-[#E8E3DA] block">
                              {candidate.label}
                            </span>
                            <span className="text-[10px] text-[#8C929D]">
                              {candidate.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 text-[#8C929D]">
                        <span className="px-1.5 py-0.5 rounded-sm bg-[#12151B] text-[10px] text-[#8C929D] border border-[#252932]">
                          {candidate.type}
                        </span>
                      </td>

                      <td className="py-3 text-right text-[#E8E3DA] font-bold">
                        {candidate.interCentralityScore?.toFixed(3) || '0.750'}
                      </td>

                      <td className="py-3 text-right text-[#8C929D]">
                        {candidate.betweennessScore?.toFixed(3) || '0.620'}
                      </td>

                      <td className="py-3 text-right text-[#8C929D]">
                        {candidate.degreeScore || 8}
                      </td>

                      <td className="py-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidateId(candidate.id);
                            onSelectNode(candidate);
                          }}
                          className="px-2.5 py-1 rounded-sm bg-[#12151B] hover:bg-[#8B1E2F]/20 text-[#E8E3DA] hover:text-white border border-[#252932] hover:border-[#8B1E2F]/50 text-[10px] transition-colors"
                        >
                          INSPECT
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Simulation Trigger & Real-Time Impact Metric */}
        <div className="noir-panel p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#8B1E2F]" />
                Disruption Impact Model
              </h3>
              {isSimulating && (
                <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40 text-[9px] font-mono animate-pulse">
                  SIMULATION ACTIVE
                </span>
              )}
            </div>

            {disruptionResult && (
              <div className="space-y-4">
                <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
                  <p className="text-[10px] font-mono text-[#8C929D] uppercase">Target Entity</p>
                  <p className="text-sm font-bold font-mono text-[#E8E3DA] mt-0.5">
                    {disruptionResult.targetNode.label} ({disruptionResult.targetNode.id})
                  </p>
                  <p className="text-xs text-[#8C929D] mt-1 font-sans">
                    {disruptionResult.targetNode.attributes.roleTitle}
                  </p>
                </div>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
                    <p className="text-[9px] text-[#8C929D] uppercase">Efficiency Drop</p>
                    <p className="text-xl font-bold text-[#8B1E2F] flex items-center gap-1 mt-0.5">
                      <TrendingDown className="w-4 h-4" />
                      -{disruptionResult.efficiencyLossPercentage}%
                    </p>
                  </div>

                  <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
                    <p className="text-[9px] text-[#8C929D] uppercase">Sub-Clusters Formed</p>
                    <p className="text-xl font-bold text-[#E8E3DA] mt-0.5">
                      {disruptionResult.postComponentsCount}
                    </p>
                  </div>

                  <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
                    <p className="text-[9px] text-[#8C929D] uppercase">Severed Conduits</p>
                    <p className="text-xl font-bold text-[#E8E3DA] mt-0.5">
                      {disruptionResult.severedEdgesCount}
                    </p>
                  </div>

                  <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
                    <p className="text-[9px] text-[#8C929D] uppercase">Immobilized Flow</p>
                    <p className="text-sm font-bold text-[#E8E3DA] truncate mt-1">
                      {formatINR(disruptionResult.disruptedFinancialVolumeINR)}
                    </p>
                  </div>
                </div>

                {/* Isolated Sub-network Breakdown */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-[#8C929D] uppercase tracking-wider">
                    Resulting Isolated Sub-Clusters:
                  </p>
                  {disruptionResult.isolatedClusters.map((cluster, cIdx) => (
                    <div key={cIdx} className="p-2.5 bg-[#12151B] rounded-sm border border-[#252932] text-[11px]">
                      <p className="font-mono font-semibold text-[#E8E3DA]">{cluster.clusterName}</p>
                      <p className="text-[10px] text-[#8C929D] font-sans mt-0.5">{cluster.riskSummary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#252932]">
            <button
              onClick={handleToggleSimulation}
              className={`w-full py-2.5 px-4 rounded-sm font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSimulating
                  ? 'bg-[#1C1F26] hover:bg-[#252932] text-[#E8E3DA] border border-[#8B1E2F]'
                  : 'bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] shadow-[0_0_15px_rgba(139,30,47,0.3)]'
              }`}
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-4 h-4 text-[#8B1E2F]" />
                  RESET DISRUPTION SIMULATION
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  SIMULATE STRUCTURAL DISRUPTION
                </>
              )}
            </button>
            <p className="text-[10px] font-mono text-center text-[#8C929D] mt-2">
              {isSimulating
                ? 'Network graph fractured into isolated components'
                : 'Execute topological cut to visualize component severance'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

