import React from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Share2, 
  Shield, 
  HelpCircle, 
  Code2, 
  Server,
  ArrowDown
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const stackLayers = [
    {
      layer: '01. MULTIMODAL INGESTION LAYER',
      tech: 'FastAPI, Tesseract IndicOCR, Apache Kafka, PyMuPDF',
      role: 'Ingests bilingual scanned FIRs, telecom CDR spreadsheets, and banking transaction dumps. Handles automated validation and text extraction.',
      color: '#8B1E2F',
    },
    {
      layer: '02. INDIC NLP & ENTITY RESOLUTION LAYER',
      tech: 'IndicBERT, LegalBERT, Hugging Face Transformers, Qdrant Vector DB',
      role: 'Parses regional entities across English, Hindi, Gujarati, and Marathi. Resolves phonetic variations, burner SIMs, and nominee directors.',
      color: '#E8E3DA',
    },
    {
      layer: '03. HETEROGENEOUS KNOWLEDGE GRAPH',
      tech: 'Neo4j Enterprise, Cypher Query Engine, NetworkX',
      role: 'Maintains an 8-entity-type, 9-relationship-type persistent knowledge graph with temporal indexing and sub-second multi-hop traversal.',
      color: '#8C929D',
    },
    {
      layer: '04. GRAPH NEURAL NETWORK (GNN) AI ENGINE',
      tech: 'PyTorch, PyTorch Geometric (PyG), Hetero-GAT, Temporal Graph Networks (TGN)',
      role: 'Calculates dynamic node representations, detects circular laundering paths, and computes Inter-Centrality structural disruption metrics.',
      color: '#8B1E2F',
    },
    {
      layer: '05. EXPLAINABLE AI (XAI) & AUDITABILITY',
      tech: 'GNNExplainer, SubgraphX, SHA-256 Prototype Integrity Ledger',
      role: 'Extracts minimal causal subgraphs and percentage-weighted factors. Immutably records every analytical transformation in the audit chain.',
      color: '#E8E3DA',
    },
    {
      layer: '06. SOVEREIGN FEDERATION LAYER',
      tech: 'Flower (flwr), PySyft, Zero-Knowledge Proofs, Differential Privacy',
      role: 'Coordinates decentralized FedGNN model training across Gujarat, Maharashtra, Rajasthan, and Delhi police vaults without moving raw records.',
      color: '#8C929D',
    },
    {
      layer: '07. INVESTIGATOR WORKSPACE FRONTEND',
      tech: 'React 18, TypeScript, Tailwind CSS, SVG/Canvas Engine, Bun',
      role: 'Production-quality command-center workstation providing interactive graph exploration, disruption simulation, and judicial dossier generation.',
      color: '#8B1E2F',
    },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                SOVEREIGN SYSTEM BLUEPRINT
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                PROBLEM STATEMENT 26189 SOLUTION STACK
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              NexCrime Full-Stack Technical Architecture
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              End-to-end sovereign framework bridging multimodal regional ingestion, heterogeneous Graph AI, privacy-preserving federation, and court-verifiable evidence dossier generation.
            </p>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932] text-xs font-mono">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Core Engine:</span>
            <span className="text-[#E8E3DA] font-bold">Neuro-Symbolic + Sovereign FedGNN</span>
          </div>
        </div>
      </div>

      {/* Layer-by-Layer Architectural Blueprint */}
      <div className="space-y-3">
        {stackLayers.map((layer, idx) => (
          <div
            key={idx}
            className="noir-panel p-5 border border-[#1C1F26] hover:border-[#8B1E2F]/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <h2 className="text-xs font-bold font-mono text-[#E8E3DA] tracking-wider uppercase">
                  {layer.layer}
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#E8E3DA] bg-[#12151B] px-2 py-0.5 rounded-sm border border-[#252932]">
                {layer.tech}
              </span>
            </div>

            <p className="text-xs text-[#8C929D] font-sans leading-relaxed">
              {layer.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
