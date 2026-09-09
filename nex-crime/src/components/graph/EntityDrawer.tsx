import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Truck, 
  Landmark, 
  Building2, 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Database,
  ExternalLink,
  GitFork,
  Check,
  FileCheck
} from 'lucide-react';
import { GraphNode, GraphEdge, EntityType } from '../../types/intelligence';
import { formatDateTime, formatINR } from '../../utils/formatters';

interface EntityDrawerProps {
  node: GraphNode | null;
  onClose: () => void;
  edges: GraphEdge[];
  allNodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
  onSimulateDisruption?: (nodeId: string) => void;
  onFilterHops?: (hops: number) => void;
  onAddToDossier?: (nodeId: string) => void;
}

export const EntityDrawer: React.FC<EntityDrawerProps> = ({
  node,
  onClose,
  edges,
  allNodes,
  onSelectNode,
  onSimulateDisruption,
  onFilterHops,
  onAddToDossier,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'relations' | 'xai' | 'sources'>('profile');
  const [addedToDossier, setAddedToDossier] = useState(false);

  if (!node) return null;

  // Filter edges connected to this node
  const connectedEdges = edges.filter(e => e.source === node.id || e.target === node.id);

  const getNodeIcon = (type: EntityType) => {
    switch (type) {
      case 'PERSON': return User;
      case 'PHONE': return Phone;
      case 'VEHICLE': return Truck;
      case 'BANK_ACCOUNT': return Landmark;
      case 'ORGANIZATION': return Building2;
      case 'LOCATION': return MapPin;
      case 'CRIME': return AlertTriangle;
      case 'EVENT': return Calendar;
      default: return User;
    }
  };

  const IconComp = getNodeIcon(node.type);

  const getStatusBadge = () => {
    if (node.status === 'HUMAN_VERIFIED') {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932]">
          <ShieldCheck className="w-3 h-3 text-[#8B1E2F]" />
          VERIFIED DOSSIER
        </span>
      );
    }
    if (node.status === 'AI_INFERRED') {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">
          <Cpu className="w-3 h-3 text-[#8B1E2F]" />
          NEURAL INFERENCE
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#1C1F26]">
        <Database className="w-3 h-3" />
        RAW RECORD
      </span>
    );
  };

  const handleAddDossier = () => {
    setAddedToDossier(true);
    if (onAddToDossier) onAddToDossier(node.id);
    setTimeout(() => setAddedToDossier(false), 2500);
  };

  return (
    <div className="w-96 md:w-[420px] bg-[#12151B] border-l border-[#1C1F26] flex flex-col h-full z-20 select-none shadow-[-15px_0_35px_rgba(0,0,0,0.7)]">
      {/* Top Bar */}
      <div className="p-4 border-b border-[#1C1F26] flex items-start justify-between bg-[#1C1F26]">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-sm bg-[#12151B] border border-[#252932] text-[#8B1E2F]">
            <IconComp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-mono text-[#E8E3DA] leading-snug">
                {node.label}
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#12151B] text-[#8C929D] border border-[#252932] rounded-sm">
                {node.id}
              </span>
              <span className="text-[10px] font-mono text-[#8C929D]">
                {node.type}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-sm hover:bg-[#12151B] text-[#8C929D] hover:text-[#E8E3DA] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Risk and Status Banner */}
      <div className="px-4 py-3 bg-[#12151B] border-b border-[#1C1F26] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8C929D]">CONFIDENCE</span>
          <span className="text-xs font-mono font-bold text-[#E8E3DA]">
            {Math.round(node.confidence * 100)}%
          </span>
        </div>
      </div>

      {/* Quick Actions Strip */}
      <div className="px-4 py-2 bg-[#0B0C10] border-b border-[#1C1F26] flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
        {node.isDisruptionCandidate && onSimulateDisruption && (
          <button
            onClick={() => onSimulateDisruption(node.id)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#8B1E2F]/20 hover:bg-[#8B1E2F]/30 text-[#E8E3DA] border border-[#8B1E2F]/50 shrink-0 cursor-pointer"
          >
            <GitFork className="w-3 h-3 text-[#8B1E2F]" />
            DISRUPTION MODEL
          </button>
        )}

        {onFilterHops && (
          <button
            onClick={() => onFilterHops(2)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#1C1F26] hover:bg-[#252932] text-[#E8E3DA] border border-[#252932] shrink-0 cursor-pointer"
          >
            <ExternalLink className="w-3 h-3 text-[#8C929D]" />
            2-HOP SUBGRAPH
          </button>
        )}

        <button
          onClick={handleAddDossier}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border shrink-0 cursor-pointer transition-all ${
            addedToDossier
              ? 'bg-[#8B1E2F] text-[#E8E3DA] border-[#8B1E2F]'
              : 'bg-[#1C1F26] text-[#8C929D] border-[#252932] hover:text-[#E8E3DA]'
          }`}
        >
          {addedToDossier ? <Check className="w-3 h-3" /> : <FileCheck className="w-3 h-3" />}
          {addedToDossier ? 'CLASSIFIED' : 'ADD TO DOSSIER'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#1C1F26] bg-[#12151B] text-xs font-mono">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-[#8B1E2F] text-[#E8E3DA] font-semibold bg-[#8B1E2F]/10'
              : 'border-transparent text-[#8C929D] hover:text-[#E8E3DA]'
          }`}
        >
          PROFILE
        </button>
        <button
          onClick={() => setActiveTab('relations')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'relations'
              ? 'border-[#8B1E2F] text-[#E8E3DA] font-semibold bg-[#8B1E2F]/10'
              : 'border-transparent text-[#8C929D] hover:text-[#E8E3DA]'
          }`}
        >
          EDGES ({connectedEdges.length})
        </button>
        <button
          onClick={() => setActiveTab('xai')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'xai'
              ? 'border-[#8B1E2F] text-[#E8E3DA] font-semibold bg-[#8B1E2F]/10'
              : 'border-transparent text-[#8C929D] hover:text-[#E8E3DA]'
          }`}
        >
          XAI REASON
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'sources'
              ? 'border-[#8B1E2F] text-[#E8E3DA] font-semibold bg-[#8B1E2F]/10'
              : 'border-transparent text-[#8C929D] hover:text-[#E8E3DA]'
          }`}
        >
          SOURCES
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
        {/* TAB: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* Role / Description */}
            {node.attributes.roleTitle && (
              <div className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932]">
                <p className="text-[9px] font-mono text-[#8C929D] uppercase">Investigative Assessment</p>
                <p className="text-xs text-[#E8E3DA] font-medium mt-0.5">
                  {node.attributes.roleTitle}
                </p>
              </div>
            )}

            {/* Aliases */}
            {node.aliases && node.aliases.length > 0 && (
              <div className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932]">
                <p className="text-[9px] font-mono text-[#8C929D] uppercase mb-1.5">Known Aliases / Monikers</p>
                <div className="flex flex-wrap gap-1.5">
                  {node.aliases.map((alias, idx) => (
                    <span key={idx} className="font-mono text-xs px-2 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40">
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Identity & Technical Attributes */}
            <div className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932] space-y-2">
              <p className="text-[9px] font-mono text-[#8C929D] uppercase">Entity Metadata</p>
              
              {node.attributes.identNumber && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">ID Reference:</span>
                  <span className="text-[#E8E3DA]">{node.attributes.identNumber}</span>
                </div>
              )}

              {node.attributes.phoneNumber && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">Phone Number:</span>
                  <span className="text-[#E8E3DA]">{node.attributes.phoneNumber}</span>
                </div>
              )}

              {node.attributes.carrier && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">Telecom Provider:</span>
                  <span className="text-[#8C929D]">{node.attributes.carrier}</span>
                </div>
              )}

              {node.attributes.accountNumber && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">Account No:</span>
                  <span className="text-[#E8E3DA]">{node.attributes.accountNumber}</span>
                </div>
              )}

              {node.attributes.balanceINR !== undefined && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">Ledger Balance:</span>
                  <span className="text-[#E8E3DA] font-bold">{formatINR(node.attributes.balanceINR)}</span>
                </div>
              )}

              {node.attributes.regNumber && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">Registration:</span>
                  <span className="text-[#E8E3DA]">{node.attributes.regNumber}</span>
                </div>
              )}

              {node.attributes.vehicleModel && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">Vehicle Model:</span>
                  <span className="text-[#8C929D]">{node.attributes.vehicleModel}</span>
                </div>
              )}

              {node.attributes.address && (
                <div className="py-1 border-b border-[#252932]">
                  <span className="text-[#8C929D] block text-[9px] font-mono">Registered Address:</span>
                  <span className="text-[#E8E3DA] text-xs">{node.attributes.address}</span>
                </div>
              )}

              {node.attributes.cin && (
                <div className="flex justify-between py-1 border-b border-[#252932] font-mono">
                  <span className="text-[#8C929D]">CIN:</span>
                  <span className="text-[#E8E3DA]">{node.attributes.cin}</span>
                </div>
              )}

              {node.attributes.ipcSection && (
                <div className="py-1">
                  <span className="text-[#8C929D] block text-[9px] font-mono">Sections Invoked:</span>
                  <span className="text-[#8B1E2F] font-mono text-xs font-bold">{node.attributes.ipcSection}</span>
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932] space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-[#8C929D]">
                <span>First Seen:</span>
                <span className="text-[#E8E3DA]">{formatDateTime(node.firstSeen)}</span>
              </div>
              <div className="flex justify-between text-[#8C929D]">
                <span>Last Activity:</span>
                <span className="text-[#E8E3DA]">{formatDateTime(node.lastSeen)}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB: EDGES & RELATIONSHIPS */}
        {activeTab === 'relations' && (
          <div className="space-y-2">
            <p className="text-[9px] font-mono text-[#8C929D] uppercase">
              Connected Relationships ({connectedEdges.length})
            </p>
            {connectedEdges.map((edge) => {
              const isSource = edge.source === node.id;
              const targetNodeId = isSource ? edge.target : edge.source;
              const otherNode = allNodes.find(n => n.id === targetNodeId);

              return (
                <div
                  key={edge.id}
                  onClick={() => otherNode && onSelectNode(otherNode)}
                  className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932] hover:border-[#8B1E2F]/60 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#8B1E2F] font-semibold">
                      {isSource ? `→ ${edge.type}` : `← ${edge.type}`}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">
                      {edge.dataSource}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#E8E3DA] font-medium group-hover:text-[#8B1E2F] transition-colors">
                      {otherNode ? otherNode.label : targetNodeId}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C929D]">
                      {Math.round(edge.confidence * 100)}% conf
                    </span>
                  </div>

                  {edge.properties?.amountINR && (
                    <div className="mt-1.5 text-xs font-mono text-[#E8E3DA] font-bold">
                      {formatINR(edge.properties.amountINR)}
                    </div>
                  )}

                  {edge.properties?.notes && (
                    <p className="mt-1 text-[11px] text-[#8C929D] italic">
                      "{edge.properties.notes}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB: EXPLAINABLE AI (XAI) */}
        {activeTab === 'xai' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-sm bg-[#12151B] border border-[#8B1E2F]/40">
              <p className="text-[9px] font-mono font-bold text-[#8B1E2F] uppercase mb-1">
                Neuro-Symbolic Reasoning Summary
              </p>
              <p className="text-xs text-[#E8E3DA] leading-relaxed">
                {node.xaiExplanation?.summary ||
                  'Flagged based on heterogeneous GNN node representation and anomalous multi-hop edge correlation with verified criminal entities.'}
              </p>
            </div>

            {/* Topology Scores */}
            <div className="grid grid-cols-2 gap-2 font-mono text-center">
              <div className="p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932]">
                <p className="text-[9px] text-[#8C929D] uppercase">Inter-Centrality</p>
                <p className="text-base font-bold text-[#E8E3DA]">
                  {node.interCentralityScore ? node.interCentralityScore.toFixed(3) : '0.420'}
                </p>
              </div>
              <div className="p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932]">
                <p className="text-[9px] text-[#8C929D] uppercase">Betweenness</p>
                <p className="text-base font-bold text-[#E8E3DA]">
                  {node.betweennessScore ? node.betweennessScore.toFixed(3) : '0.310'}
                </p>
              </div>
            </div>

            {/* Contributing Factor Weights */}
            {node.xaiExplanation?.factors && (
              <div className="space-y-2">
                <p className="text-[9px] font-mono text-[#8C929D] uppercase">
                  Contributing Analytical Factors
                </p>
                {node.xaiExplanation.factors.map((factor, fIdx) => (
                  <div key={fIdx} className="p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932]">
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-[#E8E3DA] font-semibold">{factor.factor}</span>
                      <span className="text-[#8B1E2F] font-bold">+{factor.contribution}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-none bg-[#12151B] overflow-hidden mb-1.5">
                      <div
                        className="h-full bg-[#8B1E2F]"
                        style={{ width: `${factor.contribution}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#8C929D] leading-tight">
                      {factor.description}
                    </p>
                    <div className="flex justify-between items-center mt-1.5 text-[9px] font-mono text-[#8C929D]/70">
                      <span>{factor.source}</span>
                      <span>{Math.round(factor.confidence * 100)}% Conf</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: SOURCE RECORDS */}
        {activeTab === 'sources' && (
          <div className="space-y-3">
            <p className="text-[9px] font-mono text-[#8C929D] uppercase">
              Evidentiary Records & Citations
            </p>
            <div className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#E8E3DA]">DOC-FIR-8821-P1</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-[#12151B] text-[#E8E3DA] border border-[#252932]">VERIFIED</span>
              </div>
              <p className="text-[11px] text-[#8C929D]">
                Primary State Cyber Crime FIR lodged under IPC 420/120B and PMLA Sections 3/4.
              </p>
              <div className="text-[9px] font-mono text-[#8C929D]/60">
                SHA-256: 7c9a62c4a9214b7e80d22081f9a2b5e4...
              </div>
            </div>

            <div className="p-3 rounded-sm bg-[#1C1F26] border border-[#252932] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#E8E3DA]">CDR-FEED-2026-SEP</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40">INFERRED</span>
              </div>
              <p className="text-[11px] text-[#8C929D]">
                Telecom tower dump and subscriber IMEI correlation logs covering NH-48 corridor.
              </p>
              <div className="text-[9px] font-mono text-[#8C929D]/60">
                SHA-256: 5e4b8812c310492ab1fe9941038ba981...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Notice */}
      <div className="p-3 bg-[#1C1F26] border-t border-[#252932] text-[10px] font-mono text-[#8C929D] text-center">
        CLASSIFIED DECISION SUPPORT // RESTRICTED ACCESS
      </div>
    </div>
  );
};
