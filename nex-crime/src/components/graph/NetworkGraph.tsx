import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Filter, 
  Layers, 
  Search, 
  Info,
  GitCommit,
  User,
  Phone,
  Truck,
  Landmark,
  Building2,
  MapPin,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { GraphNode, GraphEdge, EntityType, RelationshipType } from '../../types/intelligence';
import { getMultiHopSubgraph, findShortestPath } from '../../services/graphAnalytics';

interface NetworkGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: GraphNode | null;
  onSelectNode: (node: GraphNode | null) => void;
  disruptedNodeId?: string | null;
  highlightPathNodeIds?: string[];
  maxHops?: number;
  onHopsChange?: (hops: number) => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
  disruptedNodeId = null,
  highlightPathNodeIds = [],
  maxHops = 4,
  onHopsChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilters, setTypeFilters] = useState<Record<EntityType, boolean>>({
    PERSON: true,
    PHONE: true,
    VEHICLE: true,
    LOCATION: true,
    BANK_ACCOUNT: true,
    ORGANIZATION: true,
    CRIME: true,
    EVENT: true,
  });
  const [minConfidence, setMinConfidence] = useState(0.5);
  const [selectedHops, setSelectedHops] = useState(maxHops);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<GraphEdge | null>(null);

  // Dynamic node positions state
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n, idx) => {
      pos[n.id] = {
        x: n.x || 100 + (idx % 5) * 160 + (Math.random() * 40 - 20),
        y: n.y || 100 + Math.floor(idx / 5) * 140 + (Math.random() * 40 - 20),
      };
    });
    return pos;
  });

  // Calculate multi-hop active node IDs if a node is selected
  const multiHopResult = useMemo(() => {
    if (!selectedNode || selectedHops >= 4) return null;
    return getMultiHopSubgraph(selectedNode.id, selectedHops, edges);
  }, [selectedNode, selectedHops, edges]);

  // Handle disruption displacement simulation
  useEffect(() => {
    if (!disruptedNodeId) return;

    // Shift nodes in different clusters apart
    setNodePositions((prev) => {
      const updated = { ...prev };
      nodes.forEach((n) => {
        if (n.id === disruptedNodeId) {
          // Keep at center, faded
        } else if (n.communityCluster === 'MULE_NETWORK' || n.communityCluster === 'SHELL_CORP') {
          // Push to the right
          if (updated[n.id]) updated[n.id] = { x: updated[n.id].x + 80, y: updated[n.id].y };
        } else if (n.communityCluster === 'LOGISTICS_PROXY') {
          // Push to the left
          if (updated[n.id]) updated[n.id] = { x: updated[n.id].x - 80, y: updated[n.id].y };
        }
      });
      return updated;
    });
  }, [disruptedNodeId, nodes]);

  // Filter nodes
  const visibleNodes = useMemo(() => {
    return nodes.filter((n) => {
      if (!typeFilters[n.type]) return false;
      if (n.confidence < minConfidence) return false;
      if (searchQuery && !n.label.toLowerCase().includes(searchQuery.toLowerCase()) && !n.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [nodes, typeFilters, minConfidence, searchQuery]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  // Filter edges
  const visibleEdges = useMemo(() => {
    return edges.filter((e) => {
      if (!visibleNodeIds.has(e.source) || !visibleNodeIds.has(e.target)) return false;
      if (disruptedNodeId && (e.source === disruptedNodeId || e.target === disruptedNodeId)) {
        return false; // Severed by disruption
      }
      return true;
    });
  }, [edges, visibleNodeIds, disruptedNodeId]);

  // Node styles per entity type (Dark Cyber-Noir 4-step progression)
  const getNodeColor = (type: EntityType) => {
    switch (type) {
      case 'PERSON': return { fill: '#1C1F26', stroke: '#8B1E2F', text: '#E8E3DA', glow: 'rgba(139, 30, 47, 0.45)' };
      case 'PHONE': return { fill: '#12151B', stroke: '#8C929D', text: '#E8E3DA', glow: 'rgba(232, 227, 218, 0.15)' };
      case 'VEHICLE': return { fill: '#12151B', stroke: '#8C929D', text: '#E8E3DA', glow: 'rgba(232, 227, 218, 0.15)' };
      case 'BANK_ACCOUNT': return { fill: '#1C1F26', stroke: '#E8E3DA', text: '#E8E3DA', glow: 'rgba(232, 227, 218, 0.25)' };
      case 'ORGANIZATION': return { fill: '#1C1F26', stroke: '#8B1E2F', text: '#E8E3DA', glow: 'rgba(139, 30, 47, 0.35)' };
      case 'LOCATION': return { fill: '#12151B', stroke: '#8C929D', text: '#E8E3DA', glow: 'rgba(232, 227, 218, 0.15)' };
      case 'CRIME': return { fill: '#251115', stroke: '#8B1E2F', text: '#E8E3DA', glow: 'rgba(139, 30, 47, 0.5)' };
      case 'EVENT': return { fill: '#1C1F26', stroke: '#8C929D', text: '#E8E3DA', glow: 'rgba(232, 227, 218, 0.15)' };
      default: return { fill: '#1C1F26', stroke: '#8C929D', text: '#8C929D', glow: 'rgba(140, 146, 157, 0.2)' };
    }
  };

  // Node Icons renderer
  const renderNodeIcon = (type: EntityType, x: number, y: number, color: string) => {
    const size = 16;
    const offset = -8;
    return (
      <g transform={`translate(${x + offset}, ${y + offset})`} pointerEvents="none">
        {type === 'PERSON' && <User width={size} height={size} color={color} />}
        {type === 'PHONE' && <Phone width={size} height={size} color={color} />}
        {type === 'VEHICLE' && <Truck width={size} height={size} color={color} />}
        {type === 'BANK_ACCOUNT' && <Landmark width={size} height={size} color={color} />}
        {type === 'ORGANIZATION' && <Building2 width={size} height={size} color={color} />}
        {type === 'LOCATION' && <MapPin width={size} height={size} color={color} />}
        {type === 'CRIME' && <AlertTriangle width={size} height={size} color={color} />}
        {type === 'EVENT' && <Calendar width={size} height={size} color={color} />}
      </g>
    );
  };

  // Pan and Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    } else if (draggingNodeId) {
      setNodePositions((prev) => ({
        ...prev,
        [draggingNodeId]: {
          x: (e.clientX - pan.x) / zoom - dragOffset.x,
          y: (e.clientY - pan.y) / zoom - dragOffset.y,
        },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: GraphNode) => {
    e.stopPropagation();
    const pos = nodePositions[node.id] || { x: 0, y: 0 };
    setDraggingNodeId(node.id);
    setDragOffset({
      x: (e.clientX - pan.x) / zoom - pos.x,
      y: (e.clientY - pan.y) / zoom - pos.y,
    });
    onSelectNode(node);
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedHops(4);
    if (onHopsChange) onHopsChange(4);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-full bg-[#0B0C10] noir-grid overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-[#12151B]/95 backdrop-blur-md p-2 rounded-sm border border-[#1C1F26] shadow-2xl">
        {/* Node Search */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#8B1E2F] absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search graph..."
            className="w-36 sm:w-48 h-7 bg-[#1C1F26] text-xs font-mono text-[#E8E3DA] pl-8 pr-2 rounded-sm border border-[#252932] focus:outline-none focus:border-[#8B1E2F]/50"
          />
        </div>

        {/* Multi-Hop Filter Selector */}
        <div className="flex items-center gap-1 bg-[#1C1F26] border border-[#252932] rounded-sm px-1.5 py-0.5 text-xs font-mono">
          <span className="text-[10px] text-[#8C929D] mr-1">HOPS:</span>
          {[1, 2, 3, 4].map((hop) => (
            <button
              key={hop}
              onClick={() => {
                setSelectedHops(hop);
                if (onHopsChange) onHopsChange(hop);
              }}
              className={`px-1.5 py-0.5 rounded-sm text-[11px] font-mono transition-all ${
                selectedHops === hop
                  ? 'bg-[#8B1E2F] text-[#E8E3DA] font-bold shadow-[0_0_8px_rgba(139,30,47,0.4)]'
                  : 'text-[#8C929D] hover:text-[#E8E3DA]'
              }`}
            >
              {hop}H
            </button>
          ))}
        </div>

        {/* Confidence Slider */}
        <div className="hidden md:flex items-center gap-2 bg-[#1C1F26] border border-[#252932] rounded-sm px-2 py-0.5 text-xs font-mono">
          <span className="text-[10px] text-[#8C929D]">CONF:</span>
          <input
            type="range"
            min="0"
            max="0.95"
            step="0.05"
            value={minConfidence}
            onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
            className="w-16 accent-[#8B1E2F] cursor-pointer"
          />
          <span className="text-[11px] text-[#E8E3DA] font-bold">
            {Math.round(minConfidence * 100)}%
          </span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1 border-l border-[#252932] pl-2">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
            className="p-1 rounded-sm hover:bg-[#1C1F26] text-[#8C929D] hover:text-[#E8E3DA]"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))}
            className="p-1 rounded-sm hover:bg-[#1C1F26] text-[#8C929D] hover:text-[#E8E3DA]"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1 rounded-sm hover:bg-[#1C1F26] text-[#8C929D] hover:text-[#E8E3DA]"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Type Filter Pills (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 max-w-xl bg-[#12151B]/95 backdrop-blur-md p-2 rounded-sm border border-[#1C1F26] shadow-2xl">
        <span className="text-[10px] font-mono text-[#8C929D] mr-1 uppercase">ENTITY FILTERS:</span>
        {(Object.keys(typeFilters) as EntityType[]).map((type) => {
          const color = getNodeColor(type);
          const active = typeFilters[type];
          return (
            <button
              key={type}
              onClick={() => setTypeFilters((prev) => ({ ...prev, [type]: !prev[type] }))}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-mono border transition-all ${
                active
                  ? 'bg-[#1C1F26] text-[#E8E3DA]'
                  : 'bg-transparent text-[#8C929D]/40 border-[#1C1F26] line-through opacity-60'
              }`}
              style={{ borderColor: active ? color.stroke : undefined }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.stroke }} />
              <span>{type}</span>
            </button>
          );
        })}
      </div>

      {/* Disruption Active Banner */}
      {disruptedNodeId && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-[#8B1E2F]/20 border border-[#8B1E2F]/60 backdrop-blur-md px-4 py-2 rounded-sm text-xs font-mono text-[#E8E3DA] flex items-center gap-2 shadow-[0_0_20px_rgba(139,30,47,0.3)] animate-pulse">
          <AlertTriangle className="w-4 h-4 text-[#8B1E2F]" />
          <span>INTER-CENTRALITY DISRUPTION ACTIVE — SYNDICATE NODE SEVERED</span>
        </div>
      )}

      {/* SVG Canvas */}
      <svg
        className="w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        <defs>
          {/* Arrow markers for edges */}
          <marker
            id="arrow-crimson"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B1E2F" opacity="0.85" />
          </marker>
          <marker
            id="arrow-bone"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#E8E3DA" opacity="0.85" />
          </marker>
          <marker
            id="arrow-slate"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#8C929D" opacity="0.4" />
          </marker>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Draw Edges */}
        <g>
          {visibleEdges.map((edge) => {
            const srcPos = nodePositions[edge.source];
            const tgtPos = nodePositions[edge.target];
            if (!srcPos || !tgtPos) return null;

            const isHighlighted =
              highlightPathNodeIds.includes(edge.source) && highlightPathNodeIds.includes(edge.target);
            const isSelectedHop =
              multiHopResult ? multiHopResult.edgeIds.has(edge.id) : true;
            const isConnectedToSelected =
              selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id);

            const strokeColor = isHighlighted
              ? '#8B1E2F'
              : isConnectedToSelected
              ? '#E8E3DA'
              : edge.type === 'TRANSFERRED'
              ? '#8B1E2F'
              : edge.type === 'CALLED'
              ? '#8C929D'
              : 'rgba(232, 227, 218, 0.16)';

            const strokeWidth = isHighlighted ? 2.5 : isConnectedToSelected ? 2 : 1;
            const opacity = isSelectedHop ? 1 : 0.2;

            return (
              <g key={edge.id}>
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={edge.status === 'AI_INFERRED' ? '4 3' : undefined}
                  opacity={opacity}
                  markerEnd={edge.type === 'TRANSFERRED' || isHighlighted ? 'url(#arrow-crimson)' : isConnectedToSelected ? 'url(#arrow-bone)' : 'url(#arrow-slate)'}
                  onMouseEnter={() => setHoveredEdge(edge)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  className="transition-opacity duration-200 cursor-pointer"
                />

                {/* Relationship label on hover or if connected to selected */}
                {(isConnectedToSelected || hoveredEdge?.id === edge.id) && (
                  <text
                    x={(srcPos.x + tgtPos.x) / 2}
                    y={(srcPos.y + tgtPos.y) / 2 - 6}
                    fill="#E8E3DA"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="bg-[#0B0C10] px-1 pointer-events-none"
                  >
                    {edge.type} {edge.properties?.amountINR ? `(₹)` : ''}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* 2. Draw Nodes */}
        <g>
          {visibleNodes.map((node) => {
            const pos = nodePositions[node.id] || { x: 0, y: 0 };
            const isSelected = selectedNode?.id === node.id;
            const isTargetDisrupted = disruptedNodeId === node.id;
            const isPathNode = highlightPathNodeIds.includes(node.id);
            const isInHopRadius = multiHopResult ? multiHopResult.nodeIds.has(node.id) : true;
            const colors = getNodeColor(node.type);

            const radius = node.type === 'PERSON' || node.type === 'CRIME' ? 24 : 20;
            const opacity = isTargetDisrupted ? 0.3 : isInHopRadius ? 1 : 0.25;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-opacity duration-200"
                style={{ opacity }}
              >
                {/* Pulse Ring for high risk/coordinator */}
                {(node.id === 'P-101' || isSelected) && (
                  <circle
                    r={radius + 8}
                    fill="none"
                    stroke={isSelected ? '#8B1E2F' : '#E8E3DA'}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ transformOrigin: '0 0', animationDuration: '8s' }}
                  />
                )}

                {/* Outer Glow on selection or hover */}
                {(isSelected || hoveredNode?.id === node.id || isPathNode) && (
                  <circle
                    r={radius + 4}
                    fill="none"
                    stroke={isSelected ? '#8B1E2F' : isPathNode ? '#8B1E2F' : colors.stroke}
                    strokeWidth="2.5"
                    opacity="0.6"
                    filter="url(#glow)"
                  />
                )}

                {/* Node Body */}
                <circle
                  r={radius}
                  fill={colors.fill}
                  stroke={isSelected ? '#8B1E2F' : isPathNode ? '#8B1E2F' : colors.stroke}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />

                {/* Node Icon */}
                {renderNodeIcon(node.type, 0, 0, isSelected ? '#8B1E2F' : colors.text)}

                {/* Node Label Below */}
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  fill="#E8E3DA"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {node.label}
                </text>

                {/* Entity ID Subtitle */}
                <text
                  y={radius + 25}
                  textAnchor="middle"
                  fill="#8C929D"
                  fontSize="8"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Node Hover Tooltip */}
      {hoveredNode && (
        <div
          className="absolute bottom-20 right-4 z-20 bg-[#12151B]/95 border border-[#1C1F26] p-3 rounded-sm shadow-2xl max-w-xs font-mono text-xs pointer-events-none"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-[#E8E3DA]">{hoveredNode.label}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-[#1C1F26] text-[#8C929D] border border-[#252932]">
              {hoveredNode.type}
            </span>
          </div>
          <p className="text-[11px] text-[#8C929D] font-sans">
            {hoveredNode.attributes.roleTitle || hoveredNode.id}
          </p>
          <div className="mt-2 pt-1.5 border-t border-[#1C1F26] flex justify-between text-[10px]">
            <span className="text-[#8C929D]">Confidence: {Math.round(hoveredNode.confidence * 100)}%</span>
            <span className="text-[#8B1E2F] font-semibold">Click to inspect</span>
          </div>
        </div>
      )}
    </div>
  );
};
