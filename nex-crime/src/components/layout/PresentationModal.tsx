import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Shield, 
  Cpu, 
  GitFork, 
  HelpCircle, 
  Share2, 
  FileText, 
  Database,
  CheckCircle,
  Play
} from 'lucide-react';
import { ViewId } from './Sidebar';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: ViewId) => void;
}

interface Slide {
  step: number;
  title: string;
  subtitle: string;
  targetView: ViewId;
  icon: React.ElementType;
  accent: 'cyan' | 'emerald' | 'amber' | 'rose';
  problemStatement: string;
  solutionHighlight: string;
  keyPoints: string[];
  juryTakeaway: string;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToView,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides: Slide[] = [
    {
      step: 1,
      title: 'Problem Statement 26189 — Sovereign Criminal Network Analysis',
      subtitle: 'The Challenge of Fragmented Intelligence & Jurisdictional Silos',
      targetView: 'overview',
      icon: Shield,
      accent: 'rose',
      problemStatement: 'Law enforcement agencies face fragmented data across FIRs, CDRs, bank records, and state borders. Traditional investigations rely on manual cross-referencing, while black-box AI cannot be explained in court.',
      solutionHighlight: 'NexCrime delivers an AI-Powered Sovereign Criminal Network Intelligence platform: uniting multi-source records into an explainable, auditable, and sovereign network.',
      keyPoints: [
        'Multi-Jurisdiction Silos: Evidence dispersed across state police forces',
        'Heterogeneous Formats: Scanned FIRs, CDR spreadsheets, bank statements',
        'Legal Accountability: Police decisions require clear evidence chains, not black-box scores',
        'Investigative Decision Support: AI suggests leads; human officers verify facts'
      ],
      juryTakeaway: 'NexCrime is built specifically for law enforcement reality: rigorous, auditable, and legally defensible.'
    },
    {
      step: 2,
      title: 'Multimodal Ingestion & Indic Multilingual Processing',
      subtitle: 'From Scanned Regional FIRs to Structured Knowledge Graph',
      targetView: 'ingestion',
      icon: Database,
      accent: 'cyan',
      problemStatement: 'Indian police documentation is multilingual (Hindi, Gujarati, Marathi, English) with varying scan qualities, unstructured narrative FIRs, and disparate CDR columns.',
      solutionHighlight: 'Integrated IndicOCR and fine-tuned IndicBERT/LegalBERT pipeline performs automated Named Entity Recognition and resolves regional phonetic variations.',
      keyPoints: [
        'Multilingual Support: Real parsing for English, Hindi, Gujarati, and Marathi',
        'OCR Quality Scoring: Real-time confidence metrics flag poor scans for human review',
        'Entity Extraction: Parses suspect names, burner SIMs, vehicles, and IPC sections',
        'Privacy-Preserving Preprocessing: PII redactions before analytical indexing'
      ],
      juryTakeaway: 'Solves the primary bottleneck in Indian policing: transforming regional paperwork into instant graph intelligence.'
    },
    {
      step: 3,
      title: 'Heterogeneous Knowledge Graph & Multi-Hop Traversal',
      subtitle: 'Revealing the Hidden Multi-Hop Links Behind Organized Syndicates',
      targetView: 'workspace',
      icon: Cpu,
      accent: 'cyan',
      problemStatement: 'Syndicate kingpins never touch contraband or call operatives directly. They use 3 to 5 hops of proxy SIMs, mule accounts, and shell entities to conceal their role.',
      solutionHighlight: 'Interactive 8-node, 9-relationship knowledge graph with instant 1-hop to 4-hop radius expansion and algorithmic shortest-path discovery.',
      keyPoints: [
        'Heterogeneous Schema: Person, Phone, Vehicle, Location, Bank Account, Shell Org, Crime, Event',
        'Multi-Hop Breadth-First Traversal: Unmasks intermediaries connecting coordinator to illicit events',
        'Evidence Grading: Visual separation of Raw Data, AI Inferred, and Human-Verified nodes',
        'Sub-second Querying: Optimized for rapid investigative exploration in field commands'
      ],
      juryTakeaway: 'Investigators expose complex layering schemes in seconds instead of months of manual spreadsheet matching.'
    },
    {
      step: 4,
      title: 'Inter-Centrality Network Disruption Analysis (Key Differentiator)',
      subtitle: 'Surgically Dismantling Criminal Networks via Bridge Neutralization',
      targetView: 'disruption',
      icon: GitFork,
      accent: 'amber',
      problemStatement: 'Arresting high-degree foot soldiers (mules, drivers) does not stop syndicates; they are easily replaced. Traditional degree centrality fails to identify the true structural glue.',
      solutionHighlight: 'NexCrime calculates Inter-Centrality: ranking bridge nodes whose removal fractures the network into harmless, isolated sub-clusters.',
      keyPoints: [
        'Beyond Degree Centrality: Measures topological bottleneck between logistics and Hawala financing',
        'Interactive Disruption Simulation: One-click animation shows network splitting into disconnected components',
        'Quantified Impact: Measures dropped network efficiency (-78%) and disrupted capital flow (₹16+ Cr)',
        'Decision Support Only: Labels priority investigative nodes, not automated arrest targets'
      ],
      juryTakeaway: 'Provides tactical command with surgical disruption priorities to permanently dismantle criminal infrastructure.'
    },
    {
      step: 5,
      title: 'Explainable AI (XAI) & Evidence Subgraphs',
      subtitle: 'Transparent Reasoning: "Why Was This Entity Flagged?"',
      targetView: 'xai',
      icon: HelpCircle,
      accent: 'emerald',
      problemStatement: 'Black-box neural network scores cannot withstand cross-examination in court or justify wiretaps and search warrants.',
      solutionHighlight: 'GNNExplainer and SubgraphX decompose flags into percentage-weighted, human-readable evidence factors anchored by exact timestamps and data sources.',
      keyPoints: [
        'Factor Breakdown: Quantifies communication bursts (29%), Hawala conduits (23%), and co-location (12%)',
        'Evidence Subgraph: Highlights the isolated 5-node subnetwork triggering the analytical alert',
        'Non-Technical Legal Rationale: Plain-language summaries for prosecution officers and judges',
        'Source Traceability: Direct linkage back to original FIR and CDR timestamps'
      ],
      juryTakeaway: 'Bridges advanced Graph AI with courtroom admissibility and constitutional due process.'
    },
    {
      step: 6,
      title: 'Sovereign Federated Learning (FedGNN)',
      subtitle: 'Collaborative Intelligence Across State Jurisdictions Without Centralizing Raw Data',
      targetView: 'federated',
      icon: Share2,
      accent: 'cyan',
      problemStatement: 'State police departments (Gujarat, Maharashtra, Rajasthan, Delhi) operate under strict legal data-custody boundaries. Sensitive raw crime records cannot be centralized in one database.',
      solutionHighlight: 'Sovereign FedGNN architecture: State nodes train local Graph Neural Networks; only encrypted model gradients are exchanged with the Central NCRB Aggregator.',
      keyPoints: [
        'Local Data Custody: Sensitive raw records never leave state firewalls',
        'Zero-Knowledge & Differential Privacy: Prevents inversion attacks or suspect record leakage',
        'Syndicate Pattern Sharing: When Maharashtra uncovers a new Hawala trick, Gujarat benefits instantly',
        'Sovereign Architecture: Designed around Indian federalism and data sovereignty regulations'
      ],
      juryTakeaway: 'Enables nationwide collaborative intelligence without violating inter-state legal barriers.'
    },
    {
      step: 7,
      title: 'Auditable Evidence Dossier & Cryptographic Chain of Custody',
      subtitle: 'From Raw Lead to Tamper-Evident Courtroom Intelligence Dossier',
      targetView: 'dossier',
      icon: FileText,
      accent: 'emerald',
      problemStatement: 'Digital evidence faces intense evidentiary challenges regarding chain-of-custody, authenticity, and potential evidence tampering.',
      solutionHighlight: 'Prototype Cryptographic Integrity Ledger hash-chains every event (Ingest -> OCR -> NER -> Graph -> Human Review) with automated printable Dossier generation.',
      keyPoints: [
        'Immutable Audit Trail: SHA-256 block hashing and Merkle root verification',
        'Investigator Sign-off: Human-in-the-loop review recorded with investigator badge ID',
        'Printable Judicial Dossier: Formatted with confidentiality stamps, entity profiles, and evidence graphs',
        'Ethical & Responsible AI: Continuous bias monitoring and data minimization safeguards'
      ],
      juryTakeaway: 'Delivers an end-to-end, production-ready investigative system that stands up to scrutiny from intake to verdict.'
    }
  ];

  const slide = slides[currentSlide];
  const SlideIcon = slide.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  const handleJumpToLiveView = () => {
    onNavigateToView(slide.targetView);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0C10]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-200 font-sans">
      {/* Top Bar: Progress and Exit */}
      <div className="flex items-center justify-between border-b border-[#1C1F26] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/60 text-[#8B1E2F]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#E8E3DA] tracking-widest">
                NEXCRIME // JURY BRIEFING DECK
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#1C1F26] text-[#8C929D] border border-[#252932]">
                SLIDE {currentSlide + 1} OF {slides.length}
              </span>
            </div>
            <p className="text-xs text-[#8C929D] font-mono">
              Problem Statement 26189 — Sovereign Criminal Network Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress Indicators */}
          <div className="hidden md:flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-none transition-all ${
                  idx === currentSlide
                    ? 'w-8 bg-[#8B1E2F]'
                    : idx < currentSlide
                    ? 'w-3 bg-[#E8E3DA]/60'
                    : 'w-3 bg-[#1C1F26]'
                }`}
                title={`Step ${s.step}: ${s.title}`}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-[#1C1F26] hover:bg-[#8B1E2F]/20 text-[#8C929D] hover:text-[#E8E3DA] border border-[#252932] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 my-6 flex flex-col justify-center max-w-5xl mx-auto w-full">
        {/* Step Badge & Title */}
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-sm bg-[#8B1E2F]/20 border border-[#8B1E2F]/60 text-[#E8E3DA] text-xs font-mono font-bold tracking-wider">
            STEP 0{slide.step} // BRIEFING FLOW
          </span>
          <span className="text-xs font-mono text-[#8C929D] uppercase">
            {slide.subtitle}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold font-mono text-[#E8E3DA] tracking-tight mb-6">
          {slide.title}
        </h1>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem vs Solution Card */}
          <div className="space-y-4">
            <div className="noir-panel rounded-sm p-5 border border-[#8B1E2F]/40 bg-[#12151B]">
              <p className="text-xs font-mono font-bold text-[#8B1E2F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8B1E2F]" />
                The Operational Problem
              </p>
              <p className="text-sm text-[#8C929D] leading-relaxed font-sans">
                {slide.problemStatement}
              </p>
            </div>

            <div className="noir-panel rounded-sm p-5 border border-[#252932] bg-[#1C1F26]">
              <p className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <SlideIcon className="w-4 h-4 text-[#8B1E2F]" />
                NexCrime Solution Architecture
              </p>
              <p className="text-sm text-[#E8E3DA] leading-relaxed font-sans">
                {slide.solutionHighlight}
              </p>
            </div>
          </div>

          {/* Key Engineering Features & Jury Takeaway */}
          <div className="noir-panel rounded-sm p-5 border border-[#252932] flex flex-col justify-between bg-[#1C1F26]">
            <div>
              <p className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-3">
                Key Engineering & Sovereign Capabilities
              </p>
              <ul className="space-y-2.5">
                {slide.keyPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs text-[#E8E3DA]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#8B1E2F] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 p-3.5 rounded-sm bg-[#12151B] border border-[#252932]">
              <p className="text-[10px] font-mono text-[#8B1E2F] uppercase font-bold mb-1">
                JURY TAKEAWAY
              </p>
              <p className="text-xs font-mono text-[#E8E3DA]">
                {slide.juryTakeaway}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="border-t border-[#1C1F26] pt-4 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-xs border transition-all ${
            currentSlide === 0
              ? 'border-[#1C1F26] text-[#8C929D]/40 cursor-not-allowed'
              : 'border-[#252932] bg-[#1C1F26] text-[#E8E3DA] hover:bg-[#252932]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          PREVIOUS
        </button>

        {/* Jump into live screen button */}
        <button
          onClick={handleJumpToLiveView}
          className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#1C1F26] hover:bg-[#252932] border border-[#252932] text-xs font-mono text-[#E8E3DA] shadow-md transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 text-[#8B1E2F]" />
          INTERACT WITH THIS SCREEN LIVE IN CONSOLE
        </button>

        <button
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-5 py-2 rounded-sm font-mono text-xs font-bold border transition-all ${
            currentSlide === slides.length - 1
              ? 'border-[#1C1F26] text-[#8C929D]/40 cursor-not-allowed'
              : 'border-[#8B1E2F] bg-[#8B1E2F] text-[#E8E3DA] hover:bg-[#A52438] shadow-[0_0_20px_rgba(139,30,47,0.35)]'
          }`}
        >
          NEXT SLIDE
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
