import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, CornerDownLeft, Shield, User, Phone, Truck, Landmark, Building2, MapPin, AlertTriangle, Presentation } from 'lucide-react';
import { ViewId } from './Sidebar';
import { DEMO_NODES } from '../../data/syntheticCase';
import { GraphNode } from '../../types/intelligence';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: ViewId) => void;
  onSelectNode: (node: GraphNode) => void;
  onOpenPresentation: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectView,
  onSelectNode,
  onOpenPresentation,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter navigation commands
  const navCommands = [
    { label: 'Intelligence Overview', view: 'overview' as ViewId, desc: 'Command Center & KPI activity' },
    { label: 'Investigation Workspace', view: 'workspace' as ViewId, desc: 'Search entities & explore graph' },
    { label: 'Interactive Knowledge Graph', view: 'graph' as ViewId, desc: 'Full-screen topological network' },
    { label: 'Inter-Centrality Disruption', view: 'disruption' as ViewId, desc: 'Simulate structural network fragmentation' },
    { label: 'Temporal Graph Analytics', view: 'temporal' as ViewId, desc: 'Timeline bursts & event sequencing' },
    { label: 'Hawala & Financial Flows', view: 'financial' as ViewId, desc: 'Transaction routes & laundering loops' },
    { label: 'Geo-Spatial Movement Map', view: 'geospatial' as ViewId, desc: 'Port corridors & GPS triangulation' },
    { label: 'Explainable AI (XAI)', view: 'xai' as ViewId, desc: 'GNNExplainer & factor weightings' },
    { label: 'Entity Resolution', view: 'resolution' as ViewId, desc: 'Deduplicate aliases & burner SIMs' },
    { label: 'Evidence Dossier Generator', view: 'dossier' as ViewId, desc: 'Export court-ready intelligence brief' },
    { label: 'Chain of Custody Ledger', view: 'custody' as ViewId, desc: 'Prototype cryptographic hash integrity' },
    { label: 'Federated Graph Learning', view: 'federated' as ViewId, desc: 'Multi-state sovereign FedGNN network' },
    { label: 'Multilingual Ingestion', view: 'ingestion' as ViewId, desc: 'IndicOCR & IndicBERT FIR ingestion' },
    { label: 'System Architecture', view: 'architecture' as ViewId, desc: 'Technical stack & API specifications' },
  ].filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.desc.toLowerCase().includes(query.toLowerCase()));

  // Filter entities
  const matchingEntities = DEMO_NODES.filter(node => 
    node.label.toLowerCase().includes(query.toLowerCase()) ||
    node.id.toLowerCase().includes(query.toLowerCase()) ||
    (node.aliases && node.aliases.some(a => a.toLowerCase().includes(query.toLowerCase())))
  ).slice(0, 6);

  const totalItems = navCommands.length + matchingEntities.length + 1; // +1 for presentation mode

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'PERSON': return User;
      case 'PHONE': return Phone;
      case 'VEHICLE': return Truck;
      case 'BANK_ACCOUNT': return Landmark;
      case 'ORGANIZATION': return Building2;
      case 'LOCATION': return MapPin;
      case 'CRIME': return AlertTriangle;
      default: return Shield;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#1C1F26] border border-[#252932] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#252932] bg-[#12151B]">
          <Search className="w-5 h-5 text-[#8B1E2F] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search command, suspect, phone, vehicle, account, or case..."
            className="w-full bg-transparent text-sm text-[#E8E3DA] placeholder:text-[#8C929D]/50 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-[#1C1F26] px-2 py-0.5 rounded-sm text-[#8C929D] border border-[#252932]">
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {/* Quick Action: Presentation Mode */}
          {('presentation'.includes(query.toLowerCase()) || query === '') && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8C929D] px-3 py-1 font-bold">
                Featured Action
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenPresentation();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-sm bg-[#8B1E2F]/15 hover:bg-[#8B1E2F]/25 border border-[#8B1E2F]/40 text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <Presentation className="w-4 h-4 text-[#8B1E2F]" />
                  <div>
                    <p className="text-xs font-mono font-bold text-[#E8E3DA]">
                      Launch Hackathon Jury Briefing Deck
                    </p>
                    <p className="text-[10px] text-[#8C929D] font-mono">
                      7-step guided showcase: Sovereign Architecture, Graph AI, and Inter-Centrality
                    </p>
                  </div>
                </div>
                <CornerDownLeft className="w-3.5 h-3.5 text-[#8B1E2F]" />
              </button>
            </div>
          )}

          {/* Matching Entities */}
          {matchingEntities.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8B1E2F] px-3 py-1 font-bold">
                Matching Case Entities ({matchingEntities.length})
              </p>
              <div className="space-y-1">
                {matchingEntities.map((node) => {
                  const NodeIcon = getNodeIcon(node.type);
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        onSelectNode(node);
                        onSelectView('workspace');
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-sm hover:bg-[#252932] text-left transition-colors border border-transparent hover:border-[#8B1E2F]/30 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-sm bg-[#12151B] text-[#8B1E2F] group-hover:bg-[#8B1E2F]/20 transition-colors border border-[#252932]">
                          <NodeIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-semibold text-[#E8E3DA]">
                              {node.label}
                            </span>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">
                              {node.id}
                            </span>
                            {node.riskScore > 80 && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40">
                                RISK {node.riskScore}%
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] font-mono text-[#8C929D] truncate max-w-md">
                            {node.attributes.roleTitle || node.type}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C929D] group-hover:text-[#E8E3DA] transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Views */}
          {navCommands.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8C929D] px-3 py-1 font-bold">
                Navigation & Intelligence Modules
              </p>
              <div className="space-y-1">
                {navCommands.map((cmd) => (
                  <button
                    key={cmd.view}
                    onClick={() => {
                      onSelectView(cmd.view);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm hover:bg-[#252932] text-left transition-colors border border-transparent hover:border-[#252932] group"
                  >
                    <div>
                      <p className="text-xs font-mono font-medium text-[#E8E3DA] group-hover:text-[#E8E3DA] transition-colors">
                        {cmd.label}
                      </p>
                      <p className="text-[10px] font-mono text-[#8C929D]">
                        {cmd.desc}
                      </p>
                    </div>
                    <CornerDownLeft className="w-3 h-3 text-[#8C929D] group-hover:text-[#8B1E2F] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#12151B] border-t border-[#252932] flex items-center justify-between text-[10px] font-mono text-[#8C929D]">
          <span>Navigate with arrows or mouse</span>
          <span className="text-[#8B1E2F] font-bold">NexCrime Command Engine</span>
        </div>
      </div>
    </div>
  );
};
