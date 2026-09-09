import React, { useState } from 'react';
import { 
  Share2, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Cpu, 
  Database, 
  CheckCircle, 
  ArrowRight,
  Server,
  Activity
} from 'lucide-react';
import { FEDERATION_NODES } from '../../data/federationNodes';
import { FederatedNode } from '../../types/intelligence';
import { formatDateTime } from '../../utils/formatters';

export const FederatedLearningView: React.FC = () => {
  const [nodes, setNodes] = useState<FederatedNode[]>(FEDERATION_NODES);
  const [isAggregating, setIsAggregating] = useState(false);
  const [round, setRound] = useState(14);

  const handleTriggerAggregation = () => {
    setIsAggregating(true);
    setTimeout(() => {
      setIsAggregating(false);
      setRound(r => r + 1);
      setNodes(prev => prev.map(n => ({
        ...n,
        trainingStatus: 'SYNCED',
        gradientsExchanged: n.gradientsExchanged + 45,
        lastSync: new Date().toISOString(),
      })));
    }, 1200);
  };

  const stateNodes = nodes.filter(n => n.stateCode !== 'NCRB');
  const centralNode = nodes.find(n => n.stateCode === 'NCRB') || nodes[nodes.length - 1];

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                SOVEREIGN FEDGNN ARCHITECTURE
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                PRIVACY-PRESERVING MULTI-STATE INTELLIGENCE
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Federated Graph Learning Network
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Enables cross-jurisdiction syndicate pattern recognition across Gujarat, Maharashtra, Rajasthan, and Delhi without centralizing raw citizen records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerAggregation}
              disabled={isAggregating}
              className="px-4 py-2.5 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(139,30,47,0.3)] transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isAggregating ? 'animate-spin' : ''}`} />
              <span>{isAggregating ? 'RUNNING FEDAVG...' : `SYNC FEDERATED ROUND #${round}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sovereign Architecture Visual Diagram */}
      <div className="noir-panel p-6 border border-[#1C1F26] text-center">
        <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-[#8B1E2F]" />
          Zero Raw-Data Centralization Topology
        </h3>

        {/* Multi-Node Hub and Spoke Visual */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stateNodes.map((node) => (
            <div
              key={node.id}
              className="p-4 rounded-sm bg-[#12151B] border border-[#252932] hover:border-[#8B1E2F]/40 text-left transition-all relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                  {node.jurisdiction}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932]">
                  {node.stateCode}
                </span>
              </div>

              <p className="text-[11px] text-[#8C929D] font-sans truncate mb-3">
                {node.agencyName}
              </p>

              <div className="space-y-1.5 text-[10px] font-mono text-[#8C929D]">
                <div className="flex justify-between">
                  <span>Local Dataset:</span>
                  <span className="text-[#E8E3DA] font-bold">
                    {node.localDatasetRecords.toLocaleString()} recs
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Model Version:</span>
                  <span className="text-[#E8E3DA]">{node.localModelVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custody:</span>
                  <span className="text-[#8B1E2F] font-bold">LOCAL FIREWALL</span>
                </div>
              </div>

              {/* Encrypted Gradient Flow Arrow */}
              <div className="mt-4 pt-2 border-t border-[#252932] text-center">
                <span className="text-[10px] font-mono text-[#8C929D] group-hover:text-[#E8E3DA] flex items-center justify-center gap-1 transition-colors">
                  <span>Encrypted Gradients</span>
                  <ArrowRight className="w-3 h-3 rotate-90 md:rotate-90 text-[#8B1E2F]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Central NCRB Aggregator Node */}
        <div className="max-w-xl mx-auto p-5 rounded-sm bg-[#12151B] border border-[#8B1E2F]/50 text-left">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-[#8B1E2F]" />
              <div>
                <h4 className="text-sm font-mono font-bold text-[#E8E3DA]">
                  {centralNode.agencyName}
                </h4>
                <p className="text-[10px] font-mono text-[#8C929D]">
                  National Sovereign Secure Aggregation Hub
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40 font-bold">
              AGGREGATOR
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#252932] text-xs font-mono text-center">
            <div>
              <span className="text-[9px] text-[#8C929D] uppercase block tracking-wider">Total Pattern View</span>
              <span className="font-bold text-[#E8E3DA]">{centralNode.localDatasetRecords.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[9px] text-[#8C929D] uppercase block tracking-wider">Global Model</span>
              <span className="font-bold text-[#E8E3DA]">{centralNode.localModelVersion}</span>
            </div>
            <div>
              <span className="text-[9px] text-[#8C929D] uppercase block tracking-wider">Privacy Mode</span>
              <span className="font-bold text-[#8B1E2F]">Differential + ZK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
