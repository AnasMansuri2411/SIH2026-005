import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  ArrowRight, 
  GitCommit, 
  Network, 
  User, 
  Phone, 
  Truck, 
  Landmark, 
  Building2, 
  MapPin, 
  Zap, 
  FileText,
  Sliders
} from 'lucide-react';
import { GraphNode, GraphEdge } from '../../types/intelligence';
import { NetworkGraph } from '../graph/NetworkGraph';
import { EntityDrawer } from '../graph/EntityDrawer';
import { findShortestPath } from '../../services/graphAnalytics';

interface InvestigationViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: GraphNode | null;
  onSelectNode: (node: GraphNode | null) => void;
  onNavigateToView?: (view: any) => void;
  onSimulateDisruption?: (nodeId: string) => void;
  onAddToDossier?: (nodeId: string) => void;
}

export const InvestigationView: React.FC<InvestigationViewProps> = ({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
  onNavigateToView,
  onSimulateDisruption,
  onAddToDossier,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourcePathId, setSourcePathId] = useState<string>('P-101');
  const [targetPathId, setTargetPathId] = useState<string>('ORG-03');
  const [highlightedPathIds, setHighlightedPathIds] = useState<string[]>([]);
  const [showPathTool, setShowPathTool] = useState(false);
  const [activeHops, setActiveHops] = useState<number>(4);

  // Execute shortest path query
  const handleCalculatePath = () => {
    if (!sourcePathId || !targetPathId) return;
    const path = findShortestPath(sourcePathId, targetPathId, edges);
    if (path) {
      setHighlightedPathIds(path.pathNodeIds);
    } else {
      setHighlightedPathIds([]);
    }
  };

  const handleClearPath = () => {
    setHighlightedPathIds([]);
  };

  // Quick preset targets
  const quickTargets = [
    { id: 'P-101', label: 'Aarav Mehta (Coordinator)' },
    { id: 'P-103', label: 'Vikram Rao (Hawala)' },
    { id: 'PH-02', label: 'Burner SIM (+91 98765-0102)' },
    { id: 'ORG-02', label: 'BlueGrid Trading (Shell)' },
    { id: 'LOC-02', label: 'Surat Terminal' },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col select-none overflow-hidden bg-[#0B0C10]">
      {/* Top Search & Investigative Workstation Toolbar */}
      <div className="bg-[#0B0C10] border-b border-[#1C1F26] px-4 py-2.5 z-10 flex flex-wrap items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8B1E2F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Case, Person, Phone (+91), Vehicle (GJ-), Account, Location, Org..."
              className="w-full h-8 bg-[#12151B] border border-[#252932] focus:border-[#8B1E2F]/60 rounded-sm pl-9 pr-3 text-xs font-mono text-[#E8E3DA] focus:outline-none"
            />
          </div>

          <button
            onClick={() => {
              const matched = nodes.find(n => 
                n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.id.toLowerCase().includes(searchQuery.toLowerCase())
              );
              if (matched) onSelectNode(matched);
            }}
            className="h-8 px-3 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold transition-all cursor-pointer shrink-0 shadow-[0_0_12px_rgba(139,30,47,0.3)]"
          >
            ANALYZE NETWORK
          </button>
        </div>

        {/* Quick Targets Strip & Shortest Path Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8C929D] hidden xl:inline uppercase tracking-wider">QUICK LEADS:</span>
          <div className="hidden lg:flex items-center gap-1.5">
            {quickTargets.map(tgt => (
              <button
                key={tgt.id}
                onClick={() => {
                  const n = nodes.find(node => node.id === tgt.id);
                  if (n) onSelectNode(n);
                }}
                className={`px-2 py-1 rounded-sm text-[10px] font-mono border transition-all ${
                  selectedNode?.id === tgt.id
                    ? 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]'
                    : 'bg-[#12151B] text-[#8C929D] border-[#252932] hover:border-[#8C929D]/50'
                }`}
              >
                {tgt.label}
              </button>
            ))}
          </div>

          {/* Shortest Path Tool Toggle */}
          <button
            onClick={() => setShowPathTool(!showPathTool)}
            className={`h-8 px-2.5 rounded-sm border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              showPathTool || highlightedPathIds.length > 0
                ? 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]'
                : 'bg-[#12151B] text-[#8C929D] border-[#252932] hover:border-[#8B1E2F]/40'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5 text-[#8B1E2F]" />
            <span>FIND PATH</span>
          </button>
        </div>
      </div>

      {/* Expandable Shortest Path Bar */}
      {showPathTool && (
        <div className="bg-[#12151B] border-b border-[#252932] px-4 py-2 flex flex-wrap items-center gap-3 text-xs font-mono z-10 animate-in slide-in-from-top-2">
          <span className="text-[10px] font-bold text-[#8B1E2F] uppercase tracking-wider">
            MULTI-HOP SHORTEST PATH ANALYSIS:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8C929D]">FROM:</span>
            <select
              value={sourcePathId}
              onChange={(e) => setSourcePathId(e.target.value)}
              className="bg-[#1C1F26] border border-[#252932] rounded-sm px-2 py-1 text-[#E8E3DA] focus:outline-none"
            >
              {nodes.map(n => (
                <option key={n.id} value={n.id}>{n.label} ({n.id})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C929D]">TO:</span>
            <select
              value={targetPathId}
              onChange={(e) => setTargetPathId(e.target.value)}
              className="bg-[#1C1F26] border border-[#252932] rounded-sm px-2 py-1 text-[#E8E3DA] focus:outline-none"
            >
              {nodes.map(n => (
                <option key={n.id} value={n.id}>{n.label} ({n.id})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculatePath}
            className="px-3 py-1 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-bold cursor-pointer transition-colors"
          >
            TRACE TRAVERSAL
          </button>

          {highlightedPathIds.length > 0 && (
            <button
              onClick={handleClearPath}
              className="px-2 py-1 rounded-sm bg-[#1C1F26] text-[#8C929D] hover:text-[#E8E3DA] border border-[#252932] cursor-pointer"
            >
              CLEAR PATH ({highlightedPathIds.length} NODES)
            </button>
          )}
        </div>
      )}

      {/* Main Workspace Body: Interactive Graph + Entity Drawer */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Interactive Graph Canvas Engine */}
        <div className="flex-1 h-full relative">
          <NetworkGraph
            nodes={nodes}
            edges={edges}
            selectedNode={selectedNode}
            onSelectNode={onSelectNode}
            highlightPathNodeIds={highlightedPathIds}
            maxHops={activeHops}
            onHopsChange={setActiveHops}
          />
        </div>

        {/* Entity Intelligence Drawer (Slides in on node selection) */}
        {selectedNode && (
          <EntityDrawer
            node={selectedNode}
            onClose={() => onSelectNode(null)}
            edges={edges}
            allNodes={nodes}
            onSelectNode={onSelectNode}
            onSimulateDisruption={onSimulateDisruption}
            onFilterHops={(hops) => setActiveHops(hops)}
            onAddToDossier={onAddToDossier}
          />
        )}
      </div>
    </div>
  );
};
