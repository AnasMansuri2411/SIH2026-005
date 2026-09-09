import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Check, 
  Eye, 
  X, 
  Filter, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { DEMO_ALERTS } from '../../data/alertsData';
import { IntelligenceAlert } from '../../types/intelligence';
import { formatDateTime } from '../../utils/formatters';

interface AlertCenterViewProps {
  onInvestigateAlert: (entityIds: string[]) => void;
}

export const AlertCenterView: React.FC<AlertCenterViewProps> = ({
  onInvestigateAlert,
}) => {
  const [alerts, setAlerts] = useState<IntelligenceAlert[]>(DEMO_ALERTS);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'HIGH_PRIORITY',
    'NETWORK_SIGNAL',
    'FINANCIAL_SIGNAL',
    'TEMPORAL_SIGNAL',
    'ENTITY_RESOLUTION',
    'DATA_QUALITY',
  ];

  const filteredAlerts = alerts.filter((a) => {
    if (activeCategory === 'ALL') return true;
    return a.category === activeCategory;
  });

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'ACKNOWLEDGED' } : a))
    );
  };

  const handleDismiss = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'DISMISSED' } : a))
    );
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                THREAT MONITORING DISPATCH
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                REAL-TIME NEURO-SYMBOLIC SIGNALS
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Investigative Alerts & Signal Feeds
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Automated multi-hop anomaly detection, cross-border Hawala smurfing alerts, and phonetic alias matches across state police vaults.
            </p>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932] text-xs font-mono">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Active Critical:</span>
            <span className="text-xl font-bold text-[#8B1E2F]">
              {alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'DISMISSED').length} Signals
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#8B1E2F] text-[#E8E3DA] border-[#8B1E2F] font-bold shadow-[0_0_12px_rgba(139,30,47,0.3)]'
                : 'bg-[#1C1F26] text-[#8C929D] border-[#252932] hover:border-[#8C929D]/50'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const isDismissed = alert.status === 'DISMISSED';

          return (
            <div
              key={alert.id}
              className={`noir-panel p-5 transition-all ${
                alert.severity === 'CRITICAL'
                  ? 'border-l-2 border-l-[#8B1E2F] border-[#252932]'
                  : 'border-[#1C1F26]'
              } ${isDismissed ? 'opacity-40 line-through' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      alert.severity === 'CRITICAL' ? 'bg-[#8B1E2F] animate-ping' : 'bg-[#8C929D]'
                    }`}
                  />
                  <h3 className="text-xs font-bold font-mono text-[#E8E3DA] tracking-wide uppercase">
                    {alert.title}
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">
                    {alert.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[10px] text-[#8C929D]">{formatDateTime(alert.timestamp)}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-sm border font-bold uppercase ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]/40'
                        : 'bg-[#12151B] text-[#8C929D] border-[#252932]'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8C929D] font-sans leading-relaxed mb-3">
                {alert.reason}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1C1F26] text-xs font-mono">
                <div className="flex items-center gap-3 text-[11px] text-[#8C929D]">
                  <span>Source: {alert.source}</span>
                  <span>|</span>
                  <span className="text-[#E8E3DA]">Confidence: {Math.round(alert.confidence * 100)}%</span>
                  <span>|</span>
                  <span className="text-[#8C929D]">Status: {alert.status}</span>
                </div>

                {!isDismissed && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onInvestigateAlert(alert.relatedEntityIds)}
                      className="px-3 py-1 rounded-sm bg-[#8B1E2F] text-[#E8E3DA] font-bold text-[11px] hover:bg-[#A52438] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      INVESTIGATE
                    </button>
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-2.5 py-1 rounded-sm bg-[#12151B] hover:bg-[#252932] text-[#E8E3DA] border border-[#252932] text-[11px] transition-colors cursor-pointer"
                    >
                      ACKNOWLEDGE
                    </button>
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="p-1 rounded-sm bg-[#12151B] hover:bg-[#8B1E2F]/20 text-[#8C929D] hover:text-[#E8E3DA] border border-[#252932] transition-colors cursor-pointer"
                      title="Dismiss Alert"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
