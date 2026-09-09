import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';
import { GraphNode } from '../../types/intelligence';

interface GeoSpatialViewProps {
  nodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
}

export const GeoSpatialView: React.FC<GeoSpatialViewProps> = ({
  nodes,
  onSelectNode,
}) => {
  const [selectedLocId, setSelectedLocId] = useState<string>('LOC-02');
  const [timeFilter, setTimeFilter] = useState<'24H' | '7D' | '30D'>('7D');

  const locationNodes = nodes.filter(n => n.type === 'LOCATION');
  const activeLocation = locationNodes.find(n => n.id === selectedLocId) || locationNodes[0];

  // Synthetic coordinate positions relative to stylized map view
  const mapCoordinates: Record<string, { x: number; y: number; city: string; risk: number; transitCount: number }> = {
    'LOC-01': { x: 38, y: 52, city: 'Ahmedabad Hub', risk: 68, transitCount: 14 },
    'LOC-02': { x: 42, y: 64, city: 'Surat Terminal', risk: 84, transitCount: 22 },
    'LOC-03': { x: 45, y: 76, city: 'Mumbai Docks', risk: 78, transitCount: 19 },
    'LOC-04': { x: 58, y: 28, city: 'Delhi Freight Corridor', risk: 58, transitCount: 9 },
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Header */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                SPATIO-TEMPORAL GEOLOCATION
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                WESTERN CORRIDOR LOGISTICS TRACKING
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Geo-Spatial Movement & Staging Hubs
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Correlates cell tower triangulation, Fastag toll passages, and GPS telematics across national highway freight corridors.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#12151B] p-1 rounded-sm border border-[#252932] font-mono text-xs">
            {(['24H', '7D', '30D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFilter(tf)}
                className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                  timeFilter === tf
                    ? 'bg-[#8B1E2F] text-[#E8E3DA] font-bold shadow-[0_0_10px_rgba(139,30,47,0.3)]'
                    : 'text-[#8C929D] hover:text-[#E8E3DA]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Vector Map & Location Intelligence Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dark Interactive Vector Map */}
        <div className="lg:col-span-2 noir-panel p-5 border border-[#1C1F26] flex flex-col justify-between min-h-[460px] relative overflow-hidden">
          {/* Map Controls Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#8B1E2F]" />
              <span className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                NH-48 INTERSTATE FREIGHT CORRIDOR
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">
              SYNTHETIC COORDINATES
            </span>
          </div>

          {/* SVG Vector Map Canvas */}
          <div className="relative w-full h-80 my-4 bg-[#0B0C10] rounded-sm border border-[#252932] overflow-hidden noir-grid">
            <svg className="w-full h-full">
              {/* Route lines connecting the 4 transit nodes */}
              <polyline
                points="58% 28%, 38% 52%, 42% 64%, 45% 76%"
                fill="none"
                stroke="#8B1E2F"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="opacity-70"
              />

              {/* Transit Nodes */}
              {locationNodes.map((loc) => {
                const coord = mapCoordinates[loc.id] || { x: 50, y: 50, city: loc.label, risk: 70, transitCount: 10 };
                const isSelected = selectedLocId === loc.id;

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${coord.x}%, ${coord.y}%)`}
                    onClick={() => setSelectedLocId(loc.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring */}
                    <circle
                      r={isSelected ? 18 : 12}
                      fill="none"
                      stroke={isSelected ? '#8B1E2F' : '#8C929D'}
                      strokeWidth="1.5"
                      opacity="0.5"
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />

                    {/* Node Core */}
                    <circle
                      r={isSelected ? 9 : 6}
                      fill={isSelected ? '#8B1E2F' : '#1C1F26'}
                      stroke={isSelected ? '#E8E3DA' : '#252932'}
                      strokeWidth="2"
                    />

                    {/* Label */}
                    <text
                      y="-14"
                      textAnchor="middle"
                      fill="#E8E3DA"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {coord.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Floating Legend */}
            <div className="absolute bottom-3 left-3 bg-[#12151B]/95 p-2 rounded-sm border border-[#252932] text-[10px] font-mono text-[#8C929D] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-0.5 bg-[#8B1E2F]" />
                <span>Primary Freight Highway (NH-48)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
                <span>Selected Port Staging Hub</span>
              </div>
            </div>
          </div>

          {/* Route Summary */}
          <div className="flex items-center justify-between text-xs font-mono text-[#8C929D] pt-2 border-t border-[#1C1F26]">
            <span>Route Segment: Delhi KMP → Ahmedabad Aslali → Surat Hazira → Mumbai MbPT</span>
            <span className="text-[#E8E3DA]">Live Fastag Status: 100% Monitored</span>
          </div>
        </div>

        {/* Right Col: Location Intelligence Details */}
        <div className="noir-panel p-5 border border-[#1C1F26] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B1E2F]" />
                <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                  Location Intelligence
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40 font-bold">
                RISK {activeLocation.riskScore}%
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932]">
                <p className="text-[10px] font-mono text-[#8C929D] uppercase">Terminal Hub</p>
                <h4 className="text-sm font-bold font-mono text-[#E8E3DA] mt-0.5">
                  {activeLocation.label}
                </h4>
                <p className="text-xs text-[#8C929D] mt-1 font-sans">
                  {activeLocation.attributes.address}
                </p>
              </div>

              {/* Observed Entities at this Hub */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-[#8C929D] uppercase tracking-wider">
                  Observed Entities at Hub:
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="p-2 rounded-sm bg-[#12151B] border border-[#252932] flex items-center justify-between">
                    <span className="text-[#E8E3DA]">Aarav Mehta (P-101)</span>
                    <span className="text-[10px] text-[#8C929D]">Tower Ping</span>
                  </div>
                  <div className="p-2 rounded-sm bg-[#12151B] border border-[#252932] flex items-center justify-between">
                    <span className="text-[#E8E3DA]">GJ-01-AB-4491 (VH-01)</span>
                    <span className="text-[10px] text-[#8C929D]">Fastag Log</span>
                  </div>
                  <div className="p-2 rounded-sm bg-[#12151B] border border-[#252932] flex items-center justify-between">
                    <span className="text-[#E8E3DA]">Karan Varma (P-105)</span>
                    <span className="text-[10px] text-[#8B1E2F]">Burner Handover</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectNode(activeLocation)}
            className="w-full mt-4 py-2 rounded-sm bg-[#12151B] hover:bg-[#8B1E2F]/20 border border-[#252932] hover:border-[#8B1E2F]/50 text-[#E8E3DA] font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>INSPECT IN INVESTIGATION WORKSPACE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
