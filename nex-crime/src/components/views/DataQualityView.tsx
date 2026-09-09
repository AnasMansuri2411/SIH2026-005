import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  BarChart, 
  HelpCircle,
  FileCheck,
  Scale
} from 'lucide-react';
import { DataQualityMetric } from '../../types/intelligence';

export const DataQualityView: React.FC = () => {
  const qualityMetrics: DataQualityMetric[] = [
    {
      metric: 'IndicOCR Character Confidence',
      value: 96.8,
      target: 95.0,
      status: 'OPTIMAL',
      description: 'Measures optical character recognition precision across bilingual FIR scans.'
    },
    {
      metric: 'Named Entity Extraction F1-Score',
      value: 94.2,
      target: 90.0,
      status: 'OPTIMAL',
      description: 'Fine-tuned LegalBERT accuracy on Indian criminal legal jargon and names.'
    },
    {
      metric: 'Entity Deduplication Precision',
      value: 92.4,
      target: 90.0,
      status: 'OPTIMAL',
      description: 'Accuracy in matching burner handsets and regional phonetic aliases.'
    },
    {
      metric: 'Missing Metadata Rate',
      value: 3.8,
      target: 5.0,
      status: 'OPTIMAL',
      description: 'Incomplete or unmapped fields in incoming telecom and port gate records.'
    },
    {
      metric: 'Source Cross-Verification Reliability',
      value: 89.6,
      target: 85.0,
      status: 'OPTIMAL',
      description: 'Multi-source confirmation between telecom CDR dumps and ground FIRs.'
    },
    {
      metric: 'Unresolved Proxy Entities',
      value: 7.2,
      target: 8.0,
      status: 'WARNING',
      description: 'Nominee directors and proxy SIMs pending manual field verification.'
    }
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                DATA INTEGRITY & RESPONSIBLE AI
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                FAIRNESS, ACCURACY & CONSTITUTIONAL SAFEGUARDS
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Data Quality & Responsible AI Dashboard
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Maintains strict quality thresholds, monitors demographic fairness constraints, and enforces human-in-the-loop oversight before judicial reliance.
            </p>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932] text-xs font-mono">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Overall Quality Index:</span>
            <span className="text-xl font-bold text-[#E8E3DA]">94.8% OPTIMAL</span>
          </div>
        </div>
      </div>

      {/* 6 Quality Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qualityMetrics.map((m, idx) => (
          <div key={idx} className="noir-panel p-5 border border-[#1C1F26]">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold text-[#E8E3DA] leading-snug">
                {m.metric}
              </span>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded-sm border uppercase font-bold ${
                  m.status === 'OPTIMAL'
                    ? 'bg-[#12151B] text-[#E8E3DA] border-[#252932]'
                    : 'bg-[#8B1E2F]/20 text-[#E8E3DA] border-[#8B1E2F]/40'
                }`}
              >
                {m.status}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold font-mono text-[#E8E3DA]">
                {m.value}%
              </span>
              <span className="text-[10px] font-mono text-[#8C929D]">
                Target: &gt;{m.target}%
              </span>
            </div>

            <div className="w-full h-1.5 rounded-none bg-[#12151B] border border-[#252932] overflow-hidden my-2.5">
              <div
                className="h-full bg-[#8B1E2F]"
                style={{ width: `${Math.min(100, m.value)}%` }}
              />
            </div>

            <p className="text-[11px] text-[#8C929D] font-sans leading-tight">
              {m.description}
            </p>
          </div>
        ))}
      </div>

      {/* Responsible AI & Fairness Principles */}
      <div className="noir-panel p-6 border border-[#1C1F26]">
        <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-4 flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#8B1E2F]" />
          Constitutional & Responsible AI Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-sm bg-[#12151B] border border-[#252932]">
            <h3 className="font-mono font-bold text-[#E8E3DA] mb-1 text-xs uppercase tracking-wider">Human-in-the-Loop Mandate</h3>
            <p className="text-[#8C929D] leading-relaxed text-[11px]">
              No algorithmic recommendation is executed autonomously. All network signals must be verified and signed off by a credentialed investigating officer.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-[#12151B] border border-[#252932]">
            <h3 className="font-mono font-bold text-[#E8E3DA] mb-1 text-xs uppercase tracking-wider">Bias & Parity Safeguards</h3>
            <p className="text-[#8C929D] leading-relaxed text-[11px]">
              Continuous parity testing ensures graph centrality scoring is based strictly on verified criminal conduits, preventing demographic or regional profiling.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-[#12151B] border border-[#252932]">
            <h3 className="font-mono font-bold text-[#E8E3DA] mb-1 text-xs uppercase tracking-wider">Data Minimization</h3>
            <p className="text-[#8C929D] leading-relaxed text-[11px]">
              PII redactions are applied prior to graph embedding generation. Only relevant evidentiary identifiers are indexed into the sovereign repository.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
