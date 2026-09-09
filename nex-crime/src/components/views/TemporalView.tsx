import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle,
  PhoneCall,
  ArrowRightLeft,
  Navigation
} from 'lucide-react';
import { GraphEdge, GraphNode } from '../../types/intelligence';
import { formatDateTime, formatINR } from '../../utils/formatters';

interface TemporalViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
}

export const TemporalView: React.FC<TemporalViewProps> = ({
  nodes,
  edges,
  onSelectNode,
}) => {
  const [timeWindow, setTimeWindow] = useState<'24H' | '7D' | '30D' | '90D'>('7D');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubberIndex, setScrubberIndex] = useState(10);

  // Timeline events sorted chronologically
  const timelineEvents = [
    {
      timestamp: '2026-09-08T01:45:00Z',
      type: 'FINANCIAL_BURST',
      title: 'High-Value Hawala Transfer via Offshore Channel',
      summary: '₹8.10 Cr routed from ACC-ICICI-4411 to ACC-AXIS-7703 within 45 minutes.',
      sourceId: 'BA-02',
      targetId: 'BA-03',
      badge: 'FINANCIAL SPIKE',
      severity: 'CRITICAL',
    },
    {
      timestamp: '2026-09-07T23:55:00Z',
      type: 'CALL_BURST',
      title: 'Midnight Burner SIM Cluster Activation',
      summary: 'Burner SIM (+91 98765-0102) logged 14 encrypted outbound attempts within 20 mins.',
      sourceId: 'PH-02',
      targetId: 'PH-04',
      badge: 'COMMUNICATION BURST (4.7x)',
      severity: 'CRITICAL',
    },
    {
      timestamp: '2026-09-07T22:30:00Z',
      type: 'MOVEMENT',
      title: 'Heavy Freight Hauler Arrived at Surat Terminal',
      summary: 'Vehicle GJ-01-AB-4491 passed Bhestan toll plaza matching driver phone triangulation.',
      sourceId: 'VH-01',
      targetId: 'LOC-02',
      badge: 'CO-LOCATION EVENT',
      severity: 'WARNING',
    },
    {
      timestamp: '2026-09-04T02:15:00Z',
      type: 'COORDINATION_EVENT',
      title: 'Midnight Container Handover EVT-0914',
      summary: 'Co-presence of Devendra Joshi (Customs) and Rohan Shah (Fleet) during unmanifested gate passage.',
      sourceId: 'P-106',
      targetId: 'EVT-01',
      badge: 'CRIME LINK',
      severity: 'CRITICAL',
    },
    {
      timestamp: '2026-08-28T16:20:00Z',
      type: 'FINANCIAL_BURST',
      title: 'Layered Cash Injection into BlueGrid Trading',
      summary: '₹4.85 Cr structured deposit into ICICI corporate account.',
      sourceId: 'P-103',
      targetId: 'BA-02',
      badge: 'FINANCIAL FLOW',
      severity: 'WARNING',
    },
    {
      timestamp: '2026-08-10T09:00:00Z',
      type: 'FIR_ORIGIN',
      title: 'First Information Report Lodged (FIR-2024-CR-8821)',
      summary: 'Initial complaint filed on customs evasion and hawala routing through inland depots.',
      sourceId: 'CR-01',
      targetId: 'P-101',
      badge: 'ORIGIN DOCKET',
      severity: 'INFO',
    }
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Top Header Card */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                TEMPORAL GRAPH NETWORK (TGN)
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                DYNAMIC BURST ANALYTICS
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Temporal Intelligence & Activity Bursts
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Tracks relationship burst patterns, communication spikes, and sequential event sequencing across multi-week timelines.
            </p>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#12151B] p-1 rounded-sm border border-[#252932] font-mono text-xs">
            {(['24H', '7D', '30D', '90D'] as const).map((win) => (
              <button
                key={win}
                onClick={() => setTimeWindow(win)}
                className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                  timeWindow === win
                    ? 'bg-[#8B1E2F] text-[#E8E3DA] font-bold shadow-[0_0_10px_rgba(139,30,47,0.3)]'
                    : 'text-[#8C929D] hover:text-[#E8E3DA]'
                }`}
              >
                {win}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Temporal Burst Signal Box */}
      <div className="p-4 rounded-sm bg-[#12151B] border border-[#8B1E2F]/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40">
            <Zap className="w-5 h-5 text-[#8B1E2F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                TEMPORAL BURST DETECTED
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#8C929D] border border-[#252932]">
                LAST 48 HOURS
              </span>
            </div>
            <p className="text-xs font-sans text-[#8C929D] font-medium mt-0.5">
              Telecom and financial exchange velocity increased <span className="text-[#E8E3DA] font-bold">4.7×</span> preceding container movement EVT-0914.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-[#E8E3DA] hidden sm:inline font-semibold">
          ANOMALY CONFIDENCE: 94.6%
        </span>
      </div>

      {/* Interactive Timeline Scrubber Bar */}
      <div className="noir-panel p-5 border border-[#1C1F26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8B1E2F]" />
            <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
              TEMPORAL PLAYBACK SCRUBBER
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-sm bg-[#12151B] border border-[#252932] text-[#8C929D] hover:text-[#E8E3DA] transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => setScrubberIndex(10)}
              className="p-1.5 rounded-sm bg-[#12151B] border border-[#252932] text-[#8C929D] hover:text-[#E8E3DA] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Slider */}
        <div>
          <input
            type="range"
            min="0"
            max="20"
            value={scrubberIndex}
            onChange={(e) => setScrubberIndex(parseInt(e.target.value))}
            className="w-full accent-[#8B1E2F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#8C929D] mt-1">
            <span>2026-08-10 (FIR Inception)</span>
            <span className="text-[#E8E3DA] font-bold">2026-09-04 (Event 0914)</span>
            <span>2026-09-08 (Current Window)</span>
          </div>
        </div>
      </div>

      {/* Chronological Event Stream */}
      <div className="noir-panel p-5 border border-[#1C1F26]">
        <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#8B1E2F]" />
          Key Chronological Network Events
        </h3>

        <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-[1px] before:bg-[#252932]">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative pl-9 group">
              {/* Event Dot */}
              <div className="absolute left-2.5 top-3 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0B0C10] border-2 border-[#8B1E2F] group-hover:scale-125 transition-transform" />

              <div className="p-4 rounded-sm bg-[#12151B] border border-[#252932] hover:border-[#8B1E2F]/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                    {evt.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932]">
                      {evt.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C929D]">
                      {formatDateTime(evt.timestamp)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#8C929D] font-sans mt-1">
                  {evt.summary}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#252932] flex items-center gap-3 text-[11px] font-mono text-[#8C929D]">
                  <span>Entities: {evt.sourceId} ↔ {evt.targetId}</span>
                  <button
                    onClick={() => {
                      const n = nodes.find(node => node.id === evt.sourceId);
                      if (n) onSelectNode(n);
                    }}
                    className="text-[#8B1E2F] hover:text-[#A52438] cursor-pointer ml-auto font-bold"
                  >
                    View Subgraph →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
