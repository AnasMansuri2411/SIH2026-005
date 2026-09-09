import React from 'react';
import {
  LayoutDashboard,
  Search,
  Network,
  GitFork,
  Clock,
  CircleDollarSign,
  MapPin,
  Bell,
  Fingerprint,
  HelpCircle,
  FileText,
  ShieldAlert,
  Share2,
  FileInput,
  Award,
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { RoleType } from '../../types/intelligence';

export type ViewId =
  | 'overview'
  | 'workspace'
  | 'graph'
  | 'disruption'
  | 'temporal'
  | 'financial'
  | 'geospatial'
  | 'alerts'
  | 'resolution'
  | 'xai'
  | 'dossier'
  | 'custody'
  | 'federated'
  | 'ingestion'
  | 'quality'
  | 'architecture'
  | 'settings';

interface SidebarProps {
  currentView: ViewId;
  onViewChange: (view: ViewId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentRole: RoleType;
  unreadAlertsCount?: number;
}

interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  highlight?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  collapsed,
  onToggleCollapse,
  currentRole,
  unreadAlertsCount = 2,
}) => {
  const sections: NavSection[] = [
    {
      title: 'COMMAND & INVESTIGATION',
      items: [
        { id: 'overview', label: 'Intelligence Overview', icon: LayoutDashboard },
        { id: 'workspace', label: 'Investigation Workspace', icon: Search, highlight: true },
        { id: 'graph', label: 'Knowledge Graph', icon: Network },
      ],
    },
    {
      title: 'ADVANCED GRAPH AI',
      items: [
        { id: 'disruption', label: 'Inter-Centrality Disruption', icon: GitFork, badge: 'KEY' },
        { id: 'temporal', label: 'Temporal Analytics', icon: Clock },
        { id: 'financial', label: 'Hawala & Financial Flows', icon: CircleDollarSign },
        { id: 'geospatial', label: 'Geo-Spatial Movement', icon: MapPin },
        { id: 'alerts', label: 'Alert Center', icon: Bell, badge: unreadAlertsCount },
      ],
    },
    {
      title: 'EXPLAINABILITY & TRUST',
      items: [
        { id: 'xai', label: 'Explainable AI (XAI)', icon: HelpCircle, badge: 'XAI' },
        { id: 'resolution', label: 'Entity Resolution', icon: Fingerprint },
        { id: 'dossier', label: 'Evidence Dossier', icon: FileText },
        { id: 'custody', label: 'Chain of Custody Ledger', icon: ShieldAlert },
      ],
    },
    {
      title: 'SOVEREIGNTY & INGESTION',
      items: [
        { id: 'federated', label: 'Federated Graph Learning', icon: Share2 },
        { id: 'ingestion', label: 'Multilingual Ingestion', icon: FileInput },
        { id: 'quality', label: 'Data Quality & Fairness', icon: Award },
        { id: 'architecture', label: 'System Architecture', icon: Layers },
        { id: 'settings', label: 'Settings & Security', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#0B0C10] border-r border-[#1C1F26] transition-all duration-300 flex flex-col justify-between select-none z-20 sticky top-16 h-[calc(100vh-4rem)] ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <p className="px-2.5 text-[9px] font-mono tracking-widest text-[#8C929D]/60 uppercase font-bold">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-sm text-xs font-mono transition-all text-left group relative ${
                    isActive
                      ? 'bg-[#1C1F26] text-[#E8E3DA] border-l-2 border-[#8B1E2F] border-t-0 border-r-0 border-b-0 font-medium pl-3'
                      : 'text-[#8C929D] hover:bg-[#12151B] hover:text-[#E8E3DA] border-l-2 border-transparent pl-3'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-[#8B1E2F]' : 'text-[#8C929D] group-hover:text-[#E8E3DA]'
                    }`}
                  />
                  {!collapsed && (
                    <span className="truncate flex-1 tracking-tight">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-sm shrink-0 ${
                        typeof item.badge === 'number'
                          ? 'bg-[#8B1E2F] text-[#E8E3DA] font-bold'
                          : 'bg-[#12151B] text-[#8C929D] border border-[#252932]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8B1E2F]" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Footer: Role & Sovereignty Tag & Collapse Toggle */}
      <div className="p-2 border-t border-[#1C1F26] bg-[#0B0C10]">
        {!collapsed && (
          <div className="mb-2 p-2 bg-[#12151B] rounded-sm border border-[#1C1F26] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#8B1E2F]" />
              <div>
                <p className="text-[10px] font-mono font-semibold text-[#E8E3DA]">
                  {currentRole} CLEARANCE
                </p>
                <p className="text-[9px] font-mono text-[#8C929D]">
                  SOVEREIGN VAULT LOCKED
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-1.5 rounded-sm hover:bg-[#1C1F26] text-[#8C929D] hover:text-[#E8E3DA] transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
