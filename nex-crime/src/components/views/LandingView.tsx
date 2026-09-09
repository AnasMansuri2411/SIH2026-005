import React from 'react';
import { 
  Shield, 
  ArrowRight, 
  Network, 
  GitFork, 
  HelpCircle, 
  Share2, 
  CheckCircle,
  Layers,
  FileText
} from 'lucide-react';

interface LandingViewProps {
  onEnterConsole: () => void;
  onExploreArchitecture: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onEnterConsole,
  onExploreArchitecture,
}) => {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#E8E3DA] select-none flex flex-col justify-between font-sans">
      {/* Top Classified Header Bar */}
      <nav className="h-20 border-b border-[#1C1F26] px-6 sm:px-12 flex items-center justify-between bg-[#0B0C10]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/60 flex items-center justify-center text-[#8B1E2F] shadow-[0_0_15px_rgba(139,30,47,0.3)]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-base tracking-widest text-[#E8E3DA]">
                NEXCRIME
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#1C1F26] text-[#8C929D] border border-[#252932] rounded-sm uppercase tracking-wider">
                SOV-INTEL // PS-26189
              </span>
            </div>
            <p className="text-[10px] text-[#8C929D] font-mono tracking-tight">
              AI-Powered Sovereign Criminal Network Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onExploreArchitecture}
            className="hidden sm:block text-xs font-mono text-[#8C929D] hover:text-[#E8E3DA] transition-colors tracking-wider"
          >
            ARCHITECTURE BLUEPRINT
          </button>
          <button
            onClick={onEnterConsole}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold shadow-[0_0_20px_rgba(139,30,47,0.3)] transition-all cursor-pointer border border-[#8B1E2F]/80"
          >
            <span>ENTER CLASSIFIED CONSOLE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Dossier Section */}
      <section className="relative px-6 sm:px-12 py-16 sm:py-24 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Classified Dossier Watermark */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#1C1F26] border border-[#252932] text-xs font-mono text-[#8C929D] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#8B1E2F] animate-ping" />
          <span>TOP SECRET // LAW-ENFORCEMENT INTELLIGENCE ARCHITECTURE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-[#E8E3DA] max-w-4xl leading-tight">
          Deconstruct Organized Criminal Networks.
        </h1>

        <p className="text-base sm:text-lg text-[#8C929D] max-w-3xl mt-6 font-sans leading-relaxed">
          NexCrime unifies fragmented law-enforcement records into sovereign heterogeneous knowledge graphs — revealing hidden syndicate hierarchies, financial smurfing conduits, and key disruption targets with court-verifiable Explainable AI.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={onEnterConsole}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-sm font-bold shadow-[0_0_25px_rgba(139,30,47,0.35)] transition-all cursor-pointer border border-[#8B1E2F]"
          >
            <span>LAUNCH INVESTIGATOR CONSOLE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreArchitecture}
            className="flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#1C1F26] border border-[#252932] text-[#E8E3DA] font-mono text-sm hover:border-[#8B1E2F]/50 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#8B1E2F]" />
            <span>SYSTEM ARCHITECTURE</span>
          </button>
        </div>

        {/* Conceptual Pipeline Flow Visualizer */}
        <div className="w-full mt-16 p-5 rounded-sm noir-panel border border-[#1C1F26]">
          <p className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest mb-3 text-left">
            NEXCRIME INTELLIGENCE PIPELINE // END-TO-END WORKFLOW
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">EVIDENCE INGEST</span>
            <span className="text-[#8B1E2F]">→</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932]">
              MULTIMODAL NLP
            </span>
            <span className="text-[#8B1E2F]">→</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#12151B] text-[#8C929D] border border-[#252932]">ENTITY RESOLUTION</span>
            <span className="text-[#8B1E2F]">→</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#8B1E2F]/40 font-semibold">
              KNOWLEDGE GRAPH
            </span>
            <span className="text-[#8B1E2F]">→</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40">
              INTER-CENTRALITY
            </span>
            <span className="text-[#8B1E2F]">→</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#1C1F26] text-[#E8E3DA] border border-[#252932]">
              EXPLAINABLE AI (XAI)
            </span>
            <span className="text-[#8B1E2F]">→</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#8B1E2F] text-[#E8E3DA] font-bold border border-[#8B1E2F]">
              COURT DOSSIER
            </span>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="px-6 sm:px-12 py-16 bg-[#12151B] border-t border-[#1C1F26]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Sovereign Strategic Intelligence for Modern Investigators
            </h2>
            <p className="text-sm text-[#8C929D] font-sans mt-2">
              Engineered specifically for state cybercrime cells, intelligence wings, and economic offenses bureaus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="noir-panel rounded-sm p-5 border border-[#1C1F26] hover:border-[#8B1E2F]/50 transition-all">
              <div className="p-2.5 rounded-sm bg-[#12151B] text-[#8B1E2F] w-fit mb-4 border border-[#252932]">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-mono text-[#E8E3DA] mb-2 tracking-wider">
                MULTI-HOP DISCOVERY
              </h3>
              <p className="text-xs text-[#8C929D] leading-relaxed font-sans">
                Traverses complex intermediary networks across FIR dockets, telecom CDR dumps, and banking ledgers in real-time.
              </p>
            </div>

            <div className="noir-panel rounded-sm p-5 border border-[#1C1F26] hover:border-[#8B1E2F]/50 transition-all">
              <div className="p-2.5 rounded-sm bg-[#12151B] text-[#8B1E2F] w-fit mb-4 border border-[#252932]">
                <GitFork className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-mono text-[#E8E3DA] mb-2 tracking-wider">
                SURGICAL DISRUPTION
              </h3>
              <p className="text-xs text-[#8C929D] leading-relaxed font-sans">
                Identifies mathematically critical conduit nodes using Inter-Centrality, enabling optimal syndicate collapse.
              </p>
            </div>

            <div className="noir-panel rounded-sm p-5 border border-[#1C1F26] hover:border-[#8B1E2F]/50 transition-all">
              <div className="p-2.5 rounded-sm bg-[#12151B] text-[#8B1E2F] w-fit mb-4 border border-[#252932]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-mono text-[#E8E3DA] mb-2 tracking-wider">
                EXPLAINABLE AI (XAI)
              </h3>
              <p className="text-xs text-[#8C929D] leading-relaxed font-sans">
                Replaces black-box scores with GNNExplainer attribution and evidentiary paths meeting Section 65B legal standards.
              </p>
            </div>

            <div className="noir-panel rounded-sm p-5 border border-[#1C1F26] hover:border-[#8B1E2F]/50 transition-all">
              <div className="p-2.5 rounded-sm bg-[#12151B] text-[#8B1E2F] w-fit mb-4 border border-[#252932]">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-mono text-[#E8E3DA] mb-2 tracking-wider">
                PRIVACY FEDERATION
              </h3>
              <p className="text-xs text-[#8C929D] leading-relaxed font-sans">
                Preserves strict state jurisdictional data custody while training global cross-border FedGNN models collaboratively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Bottleneck vs Sovereign Solution */}
      <section className="px-6 sm:px-12 py-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PROBLEM */}
          <div className="noir-panel rounded-sm p-6 border border-[#252932] bg-[#12151B]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E2F]" />
              <h3 className="text-sm font-mono font-bold text-[#E8E3DA] tracking-wider uppercase">
                TRADITIONAL BOTTLENECKS
              </h3>
            </div>
            <ul className="space-y-3 font-sans text-xs text-[#8C929D]">
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E2F] font-mono font-bold">✕</span>
                <span><strong>Siloed Evidence:</strong> FIRs, CDR calls, and bank statements scattered across isolated spreadsheets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E2F] font-mono font-bold">✕</span>
                <span><strong>Manual Correlation:</strong> Investigators spending weeks manually cross-referencing phone numbers and aliases.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E2F] font-mono font-bold">✕</span>
                <span><strong>Layered Intermediaries:</strong> Kingpins concealed behind 3-4 hops of proxy accounts and burner SIMs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E2F] font-mono font-bold">✕</span>
                <span><strong>Inadmissible AI:</strong> Black-box machine learning scores dismissed by judges for lack of transparency.</span>
              </li>
            </ul>
          </div>

          {/* SOLUTION */}
          <div className="noir-panel rounded-sm p-6 border border-[#8B1E2F]/40 bg-[#1C1F26]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E2F]" />
              <h3 className="text-sm font-mono font-bold text-[#E8E3DA] tracking-wider uppercase">
                NEXCRIME SOVEREIGN ARCHITECTURE
              </h3>
            </div>
            <ul className="space-y-3 font-sans text-xs text-[#E8E3DA]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                <span><strong>Multimodal Graph Ingestion:</strong> Ingests telecom CDRs, banking Excel dumps, and multilingual police FIRs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                <span><strong>Probabilistic Entity Matching:</strong> Discovers alias clusters, shared IMEI hardware, and mule networks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                <span><strong>Network Disruption Engine:</strong> Pinpoints high-centrality bridges to achieve maximum cartel fragmentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                <span><strong>Section 65B Dossier Generation:</strong> Generates court-ready evidentiary dossiers backed by SHA-256 custody chains.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1C1F26] bg-[#0B0C10] py-8 px-6 sm:px-12 text-center text-xs font-mono text-[#8C929D]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[#8B1E2F] font-bold">NEXCRIME</span>
          <span>//</span>
          <span className="text-[#E8E3DA]">Sovereign Criminal Network Intelligence Platform</span>
        </div>
        <p className="text-[11px] text-[#8C929D]/70">
          Problem Statement 26189 // Dark Cyber-Noir Intelligence Architecture // Synthetic Demo Dataset
        </p>
      </footer>
    </div>
  );
};
