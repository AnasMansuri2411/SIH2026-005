import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar, ViewId } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { PresentationModal } from './components/layout/PresentationModal';

// Views
import { LandingView } from './components/views/LandingView';
import { LoginView } from './components/views/LoginView';
import { OverviewView } from './components/views/OverviewView';
import { InvestigationView } from './components/views/InvestigationView';
import { NetworkGraph } from './components/graph/NetworkGraph';
import { DisruptionSimulator } from './components/graph/DisruptionSimulator';
import { TemporalView } from './components/views/TemporalView';
import { FinancialView } from './components/views/FinancialView';
import { GeoSpatialView } from './components/views/GeoSpatialView';
import { AlertCenterView } from './components/views/AlertCenterView';
import { EntityResolutionView } from './components/views/EntityResolutionView';
import { XaiView } from './components/views/XaiView';
import { EvidenceDossierView } from './components/views/EvidenceDossierView';
import { ChainOfCustodyView } from './components/views/ChainOfCustodyView';
import { FederatedLearningView } from './components/views/FederatedLearningView';
import { IngestionView } from './components/views/IngestionView';
import { DataQualityView } from './components/views/DataQualityView';
import { ArchitectureView } from './components/views/ArchitectureView';
import { SettingsView } from './components/views/SettingsView';

// Data
import { DEMO_CASE, DEMO_NODES, DEMO_EDGES } from './data/syntheticCase';
import { RoleType, GraphNode } from './types/intelligence';

export function App() {
  // Navigation & Authentication states
  const [appState, setAppState] = useState<'landing' | 'login' | 'app'>('app');
  const [currentView, setCurrentView] = useState<ViewId>('overview');
  const [currentRole, setCurrentRole] = useState<RoleType>('INVESTIGATOR');
  const [officerId, setOfficerId] = useState('IND-CYB-8821');
  const [department, setDepartment] = useState('State Cyber Crime & Economic Offenses Command');
  const [demoMode, setDemoMode] = useState(true);

  // Layout states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Investigation & Graph states
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(DEMO_NODES[0]); // Default: Aarav Mehta
  const [disruptedNodeId, setDisruptedNodeId] = useState<string | null>(null);

  // Login handler
  const handleLoginSuccess = (role: RoleType, id: string, dept: string) => {
    setCurrentRole(role);
    setOfficerId(id);
    setDepartment(dept);
    setAppState('app');
    setCurrentView('overview');
  };

  // Switch to investigation with specific node selected
  const handleInvestigateAlert = (entityIds: string[]) => {
    if (entityIds.length > 0) {
      const node = DEMO_NODES.find(n => n.id === entityIds[0]);
      if (node) setSelectedNode(node);
    }
    setCurrentView('workspace');
  };

  // Toggle Disruption Simulation
  const handleApplyDisruption = (nodeId: string | null) => {
    setDisruptedNodeId(nodeId);
  };

  // 1. Landing View
  if (appState === 'landing') {
    return (
      <LandingView
        onEnterConsole={() => setAppState('app')}
        onExploreArchitecture={() => {
          setAppState('app');
          setCurrentView('architecture');
        }}
      />
    );
  }

  // 2. Login View
  if (appState === 'login') {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // 3. Main Authenticated Application
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#E8E3DA] flex flex-col font-sans select-none">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        demoMode={demoMode}
        onToggleDemoMode={() => setDemoMode(!demoMode)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeCaseId={DEMO_CASE.id}
      />

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Rail */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentRole={currentRole}
        />

        {/* Dynamic View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0B0C10]">
          {/* Top Quick Breadcrumb Strip */}
          <div className="flex items-center justify-between text-xs font-mono text-[#8C929D] mb-4 pb-2 border-b border-[#1C1F26]">
            <div className="flex items-center gap-2">
              <span className="text-[#8B1E2F] font-bold tracking-wider">NEXCRIME</span>
              <span className="text-[#8C929D]/40">/</span>
              <span className="uppercase text-[#E8E3DA] font-semibold">{currentView}</span>
              {selectedNode && (
                <>
                  <span className="text-[#8C929D]/40">/</span>
                  <span className="text-[#E8E3DA] border-b border-[#8B1E2F]/60 pb-0.5">{selectedNode.label}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={() => setAppState('landing')}
                className="hover:text-[#E8E3DA] transition-colors"
              >
                Classified Briefing
              </button>
              <span className="text-[#8C929D]/30">•</span>
              <button
                onClick={() => setAppState('login')}
                className="hover:text-[#8B1E2F] transition-colors"
              >
                Switch Clearance / Logout
              </button>
            </div>
          </div>

          {/* VIEW SWITCHER */}
          {currentView === 'overview' && (
            <OverviewView
              onNavigateToWorkspace={() => setCurrentView('workspace')}
              onNavigateToView={setCurrentView}
            />
          )}

          {currentView === 'workspace' && (
            <InvestigationView
              nodes={DEMO_NODES}
              edges={DEMO_EDGES}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
              onNavigateToView={setCurrentView}
              onSimulateDisruption={(id) => {
                setDisruptedNodeId(id);
                setCurrentView('disruption');
              }}
            />
          )}

          {currentView === 'graph' && (
            <div className="h-[calc(100vh-8rem)] noir-panel rounded-sm overflow-hidden border border-[#E8E3DA]/10">
              <NetworkGraph
                nodes={DEMO_NODES}
                edges={DEMO_EDGES}
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
                disruptedNodeId={disruptedNodeId}
              />
            </div>
          )}

          {currentView === 'disruption' && (
            <DisruptionSimulator
              nodes={DEMO_NODES}
              edges={DEMO_EDGES}
              onApplyDisruption={handleApplyDisruption}
              activeDisruptedNodeId={disruptedNodeId}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setCurrentView('workspace');
              }}
            />
          )}

          {currentView === 'temporal' && (
            <TemporalView
              nodes={DEMO_NODES}
              edges={DEMO_EDGES}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setCurrentView('workspace');
              }}
            />
          )}

          {currentView === 'financial' && (
            <FinancialView
              nodes={DEMO_NODES}
              edges={DEMO_EDGES}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setCurrentView('workspace');
              }}
            />
          )}

          {currentView === 'geospatial' && (
            <GeoSpatialView
              nodes={DEMO_NODES}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setCurrentView('workspace');
              }}
            />
          )}

          {currentView === 'alerts' && (
            <AlertCenterView onInvestigateAlert={handleInvestigateAlert} />
          )}

          {currentView === 'resolution' && <EntityResolutionView />}

          {currentView === 'xai' && (
            <XaiView
              nodes={DEMO_NODES}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setCurrentView('workspace');
              }}
            />
          )}

          {currentView === 'dossier' && (
            <EvidenceDossierView
              caseData={DEMO_CASE}
              nodes={DEMO_NODES}
              edges={DEMO_EDGES}
            />
          )}

          {currentView === 'custody' && <ChainOfCustodyView />}

          {currentView === 'federated' && <FederatedLearningView />}

          {currentView === 'ingestion' && <IngestionView />}

          {currentView === 'quality' && <DataQualityView />}

          {currentView === 'architecture' && <ArchitectureView />}

          {currentView === 'settings' && (
            <SettingsView
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
              officerId={officerId}
              department={department}
            />
          )}
        </main>
      </div>

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectView={setCurrentView}
        onSelectNode={(node) => {
          setSelectedNode(node);
          setCurrentView('workspace');
        }}
        onOpenPresentation={() => setIsPresentationOpen(true)}
      />

      {/* Presentation Mode Modal (Jury Walkthrough) */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        onNavigateToView={setCurrentView}
      />
    </div>
  );
}

export default App;
