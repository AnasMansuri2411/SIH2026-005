import React from 'react';
import { 
  Network, 
  Search, 
  GitFork, 
  CircleDollarSign, 
  ShieldAlert, 
  Database, 
  ArrowRight, 
  Activity, 
  CheckCircle,
  Clock,
  Sparkles,
  Phone,
  Landmark,
  Building2,
  MapPin,
  User
} from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { DEMO_CASE, DEMO_NODES } from '../../data/syntheticCase';
import { DEMO_ALERTS } from '../../data/alertsData';
import { formatINR } from '../../utils/formatters';
import { ViewId } from '../layout/Sidebar';

interface OverviewViewProps {
  onNavigateToWorkspace: () => void;
  onNavigateToView: (view: ViewId) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateToWorkspace,
  onNavigateToView,
}) => {
  return (
    <div className="space-y-6 select-none font-sans">
      {/* Command Center Header Banner */}
      <div className="noir-panel rounded-sm p-6 border border-[#1C1F26] relative overflow-hidden bg-[#12151B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#8C929D] text-xs font-mono font-bold border border-[#252932]">
                COMMAND HUB
              </span>
              <span className="text-xs font-mono text-[#8C929D]">
                WESTERN INTELLIGENCE CORRIDOR
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              NexCrime Intelligence Command Center
            </h1>
            <p className="text-xs text-[#8C929D] font-mono mt-1">
              Active Monitoring: Hawala Layering, Inter-State Logistics & Syndicate Conduits
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToWorkspace}
              className="px-4 py-2.5 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(139,30,47,0.3)] transition-all cursor-pointer border border-[#8B1E2F]"
            >
              <span>OPEN INVESTIGATION WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          label="ACTIVE CASES"
          value="4"
          subValue="Dockets"
          icon={Search}
          variant="cyan"
          trend="+1 New Case"
          trendPositive={true}
        />
        <StatCard
          label="NETWORKS"
          value="18"
          subValue="Syndicates"
          icon={Network}
          variant="cyan"
          trend="8 State Links"
          trendPositive={true}
        />
        <StatCard
          label="RESOLVED"
          value="142"
          subValue="Entities"
          icon={CheckCircle}
          variant="emerald"
          trend="94.2% Conf"
          trendPositive={true}
        />
        <StatCard
          label="SIGNALS"
          value="9"
          subValue="Critical"
          icon={ShieldAlert}
          variant="rose"
          trend="Action Req."
          trendPositive={false}
          onClick={() => onNavigateToView('alerts')}
        />
        <StatCard
          label="EVIDENCE TRAILS"
          value="38"
          subValue="Audited"
          icon={GitFork}
          variant="amber"
          trend="Tamper-Proof"
          trendPositive={true}
          onClick={() => onNavigateToView('custody')}
        />
        <StatCard
          label="DATA SOURCES"
          value="7"
          subValue="Feeds"
          icon={Database}
          variant="cyan"
          trend="Multilingual"
          trendPositive={true}
          onClick={() => onNavigateToView('ingestion')}
        />
      </div>

      {/* Live Intelligence Activity Hero: Multi-Hop Signal Discovery */}
      <div className="noir-panel rounded-sm p-6 border border-[#1C1F26] relative overflow-hidden bg-[#12151B]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E2F] animate-ping" />
            <h2 className="text-sm font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
              LIVE MULTI-HOP RELATIONSHIP DISCOVERY
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#8C929D] border border-[#252932]">
            HETERO-GAT SIGNAL DETECTED
          </span>
        </div>

        <p className="text-xs text-[#8C929D] font-sans mb-4 max-w-2xl">
          Automated cross-jurisdiction entity resolution discovered an unmanifested 5-hop relationship connecting coordinator <strong className="text-[#E8E3DA]">Aarav Mehta</strong> to offshore shell company <strong className="text-[#E8E3DA]">Apex Transit FZE</strong> via burner SIM and mule accounts.
        </p>

        {/* Animated 5-Hop Traversal Chain */}
        <div className="p-4 rounded-sm bg-[#0B0C10] border border-[#1C1F26] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] gap-2 font-mono text-xs">
            {/* HOP 1 */}
            <div className="flex flex-col items-center text-center p-2.5 rounded-sm bg-[#1C1F26] border border-[#8B1E2F]/60 w-36">
              <User className="w-5 h-5 text-[#8B1E2F] mb-1" />
              <span className="font-bold text-[#E8E3DA]">Aarav Mehta</span>
              <span className="text-[9px] text-[#8C929D]">P-101 (Coordinator)</span>
            </div>

            <div className="flex flex-col items-center text-[#8B1E2F]">
              <span className="text-[9px] text-[#8C929D]">CALL (CDR)</span>
              <span className="text-lg">→</span>
            </div>

            {/* HOP 2 */}
            <div className="flex flex-col items-center text-center p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932] w-36">
              <Phone className="w-5 h-5 text-[#8C929D] mb-1" />
              <span className="font-bold text-[#E8E3DA]">+91 98765-0102</span>
              <span className="text-[9px] text-[#8C929D]">Burner SIM (Hazira)</span>
            </div>

            <div className="flex flex-col items-center text-[#8B1E2F]">
              <span className="text-[9px] text-[#8C929D]">CO-LOCATED</span>
              <span className="text-lg">→</span>
            </div>

            {/* HOP 3 */}
            <div className="flex flex-col items-center text-center p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932] w-36">
              <MapPin className="w-5 h-5 text-[#8C929D] mb-1" />
              <span className="font-bold text-[#E8E3DA]">Surat Terminal</span>
              <span className="text-[9px] text-[#8C929D]">LOC-02 (Transshipment)</span>
            </div>

            <div className="flex flex-col items-center text-[#8B1E2F]">
              <span className="text-[9px] text-[#8B1E2F]">₹2.4 Cr WIRE</span>
              <span className="text-lg">→</span>
            </div>

            {/* HOP 4 */}
            <div className="flex flex-col items-center text-center p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932] w-36">
              <Landmark className="w-5 h-5 text-[#E8E3DA] mb-1" />
              <span className="font-bold text-[#E8E3DA]">ACC-HDFC-9912</span>
              <span className="text-[9px] text-[#8C929D]">Mule Aggregator</span>
            </div>

            <div className="flex flex-col items-center text-[#8B1E2F]">
              <span className="text-[9px] text-[#8C929D]">SHELL EXPORT</span>
              <span className="text-lg">→</span>
            </div>

            {/* HOP 5 */}
            <div className="flex flex-col items-center text-center p-2.5 rounded-sm bg-[#1C1F26] border border-[#252932] w-36">
              <Building2 className="w-5 h-5 text-[#E8E3DA] mb-1" />
              <span className="font-bold text-[#E8E3DA]">Apex Transit FZE</span>
              <span className="text-[9px] text-[#8C929D]">Offshore Conduit</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C929D]">
            <Clock className="w-3.5 h-3.5" />
            <span>Discovered 42 minutes ago from multi-state graph synchronization</span>
          </div>
          <button
            onClick={onNavigateToWorkspace}
            className="px-3 py-1.5 rounded-sm bg-[#1C1F26] hover:bg-[#252932] border border-[#252932] text-xs font-mono text-[#E8E3DA] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>ANALYZE THIS PATH IN WORKSPACE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B1E2F]" />
          </button>
        </div>
      </div>

      {/* Two Column Grid: Active Case Dossier & Priority Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Demo Case Brief */}
        <div className="noir-panel rounded-sm p-5 border border-[#1C1F26]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
              <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                PRIMARY CASE DOSSIER: {DEMO_CASE.id}
              </h3>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40">
              {DEMO_CASE.priority} PRIORITY
            </span>
          </div>

          <h4 className="text-base font-bold font-mono text-[#E8E3DA] mb-1">
            {DEMO_CASE.codeName}
          </h4>
          <p className="text-xs text-[#8C929D] font-sans mb-4">
            {DEMO_CASE.summary}
          </p>

          <div className="grid grid-cols-3 gap-2 font-mono text-center mb-4">
            <div className="p-2.5 rounded-sm bg-[#12151B] border border-[#252932]">
              <p className="text-[9px] text-[#8C929D] uppercase">Entities</p>
              <p className="text-sm font-bold text-[#E8E3DA]">{DEMO_CASE.stats.totalEntities}</p>
            </div>
            <div className="p-2.5 rounded-sm bg-[#12151B] border border-[#252932]">
              <p className="text-[9px] text-[#8C929D] uppercase">Edges</p>
              <p className="text-sm font-bold text-[#E8E3DA]">{DEMO_CASE.stats.totalRelationships}</p>
            </div>
            <div className="p-2.5 rounded-sm bg-[#12151B] border border-[#252932]">
              <p className="text-[9px] text-[#8C929D] uppercase">Flow Tracked</p>
              <p className="text-sm font-bold text-[#E8E3DA]">{formatINR(DEMO_CASE.stats.financialFlowINR)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#252932] text-xs font-mono">
            <span className="text-[#8C929D]">Lead: {DEMO_CASE.leadInvestigator}</span>
            <button
              onClick={onNavigateToWorkspace}
              className="text-[#E8E3DA] hover:text-[#8B1E2F] flex items-center gap-1 transition-colors"
            >
              Enter Workspace →
            </button>
          </div>
        </div>

        {/* Priority Signals & Alerts */}
        <div className="noir-panel rounded-sm p-5 border border-[#1C1F26]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#8B1E2F]" />
              <h3 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider">
                REAL-TIME INVESTIGATIVE SIGNALS
              </h3>
            </div>
            <button
              onClick={() => onNavigateToView('alerts')}
              className="text-[10px] font-mono text-[#8C929D] hover:text-[#E8E3DA]"
            >
              View All ({DEMO_ALERTS.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {DEMO_ALERTS.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                onClick={() => onNavigateToView('alerts')}
                className="p-3 rounded-sm bg-[#12151B] border border-[#252932] hover:border-[#8B1E2F]/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-[#E8E3DA]">
                    {alert.title}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded-sm border uppercase ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]/40'
                        : 'bg-[#1C1F26] text-[#8C929D] border-[#252932]'
                    }`}
                  >
                    {alert.category}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C929D] font-sans line-clamp-2">
                  {alert.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
