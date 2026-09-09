import React, { useState } from 'react';
import { 
  FileInput, 
  Upload, 
  FileText, 
  CheckCircle, 
  Cpu, 
  Languages, 
  Sparkles, 
  ArrowRight,
  Database,
  RefreshCw
} from 'lucide-react';

export const IngestionView: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'ALL' | 'HIN' | 'GUJ' | 'MAR' | 'ENG'>('ALL');
  const [uploadStep, setUploadStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleFiles = [
    { name: 'FIR_8821_Bilingual_Hin_Eng.pdf', lang: 'Hindi / English', size: '2.4 MB', type: 'FIR Legal Docket' },
    { name: 'Surat_Port_Customs_Guj.pdf', lang: 'Gujarati (ગુજરાતી)', size: '1.8 MB', type: 'Port Gate Manifest' },
    { name: 'Mumbai_EOW_Transit_Mar.pdf', lang: 'Marathi (मराठी)', size: '3.1 MB', type: 'Financial Case Record' },
    { name: 'Western_Corridor_CDR_Dump.csv', lang: 'Structured CDR', size: '8.4 MB', type: 'Telecom Call Records' },
  ];

  const pipelineSteps = [
    'DOCUMENT_VALIDATING',
    'INDIC_OCR_PROCESSING',
    'INDIC_BERT_ENTITY_EXTRACTION',
    'RELATIONSHIP_EXTRACTION',
    'NEURO_SYMBOLIC_RESOLUTION',
    'GRAPH_TOPOLOGY_UPDATED',
  ];

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setUploadStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= pipelineSteps.length) {
        setUploadStep(current);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 700);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="noir-panel p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-[#8B1E2F]/15 border border-[#8B1E2F]/40 text-[#E8E3DA] text-[10px] font-mono font-bold tracking-wider">
                MULTIMODAL & MULTILINGUAL INGESTION
              </span>
              <span className="text-[10px] font-mono text-[#8C929D] uppercase tracking-widest">
                INDIC OCR & INDICBERT LEGAL NER
              </span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-[#E8E3DA] tracking-tight">
              Data Ingestion & Multilingual OCR Pipeline
            </h1>
            <p className="text-xs text-[#8C929D] font-sans mt-1 max-w-2xl leading-relaxed">
              Digitizes heterogeneous state police records (Hindi, Gujarati, Marathi, English) and maps unstructured legal text into the sovereign knowledge graph.
            </p>
          </div>

          <div className="p-3 bg-[#12151B] rounded-sm border border-[#252932] text-xs font-mono">
            <span className="text-[#8C929D] block text-[10px] uppercase tracking-wider">Supported Indic Dialects:</span>
            <span className="text-[#E8E3DA] font-bold">English • हिन्दी • ગુજરાતી • मराठी</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Lab & Live Extraction Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Simulation Area */}
        <div className="noir-panel p-6 border border-[#1C1F26] flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#8B1E2F]" />
              Ingest Police Documents (PDF, CSV, JSON, TXT)
            </h2>

            {/* Drag & Drop Simulation Box */}
            <div className="border border-dashed border-[#252932] hover:border-[#8B1E2F]/50 rounded-sm p-8 text-center bg-[#12151B] transition-colors cursor-pointer">
              <FileInput className="w-10 h-10 text-[#8B1E2F] mx-auto mb-3 opacity-80" />
              <p className="text-xs font-mono text-[#E8E3DA] font-bold tracking-wide">
                DRAG & DROP FIR DOCKETS OR TELECOM CDR DUMPS
              </p>
              <p className="text-[11px] text-[#8C929D] font-mono mt-1">
                Supports IndicOCR bilingual PDFs, GST exports, or CDR logs
              </p>
              <button
                onClick={handleSimulateUpload}
                disabled={isProcessing}
                className="mt-4 px-4 py-2 rounded-sm bg-[#8B1E2F] hover:bg-[#A52438] text-[#E8E3DA] font-mono text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(139,30,47,0.3)]"
              >
                {isProcessing ? 'PROCESSING PIPELINE...' : 'RUN DEMO INGESTION PIPELINE'}
              </button>
            </div>

            {/* Preloaded Sample Files */}
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-mono text-[#8C929D] uppercase tracking-wider">
                Sample Regional Test Dockets:
              </p>
              {sampleFiles.map((f, idx) => (
                <div
                  key={idx}
                  onClick={handleSimulateUpload}
                  className="p-2.5 rounded-sm bg-[#12151B] border border-[#252932] hover:border-[#8B1E2F]/40 flex items-center justify-between text-xs font-mono cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#8B1E2F]" />
                    <span className="text-[#E8E3DA]">{f.name}</span>
                  </div>
                  <span className="text-[10px] text-[#8C929D]">{f.lang}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Step Progress */}
          {uploadStep > 0 && (
            <div className="mt-6 pt-4 border-t border-[#252932] space-y-2 font-mono text-xs">
              <p className="text-[10px] text-[#8C929D] uppercase tracking-wider">Real-Time Ingestion Pipeline Log:</p>
              {pipelineSteps.map((step, sIdx) => {
                const isDone = uploadStep > sIdx + 1;
                const isCurrent = uploadStep === sIdx + 1;

                return (
                  <div
                    key={step}
                    className={`p-2 rounded-sm flex items-center justify-between text-[11px] ${
                      isDone
                        ? 'bg-[#12151B] text-[#E8E3DA] border border-[#252932]'
                        : isCurrent
                        ? 'bg-[#8B1E2F]/20 text-[#E8E3DA] border border-[#8B1E2F]/40 animate-pulse'
                        : 'bg-[#0B0C10] text-[#8C929D]/50 border border-[#1C1F26]'
                    }`}
                  >
                    <span>{step}</span>
                    <span>{isDone ? 'COMPLETED ✓' : isCurrent ? 'RUNNING...' : 'QUEUED'}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Multilingual Indic OCR & NER Showcase */}
        <div className="noir-panel p-6 border border-[#1C1F26] space-y-4">
          <h2 className="text-xs font-mono font-bold text-[#E8E3DA] uppercase tracking-wider flex items-center gap-2">
            <Languages className="w-4 h-4 text-[#8B1E2F]" />
            Multilingual Parsing Showcase (Indian Law Enforcement)
          </h2>

          {/* Multilingual token examples */}
          <div className="space-y-3 font-mono text-xs">
            {/* Hindi Docket */}
            <div className="p-3 rounded-sm bg-[#12151B] border border-[#252932]">
              <span className="text-[10px] text-[#8B1E2F] block mb-1 uppercase font-bold tracking-wider">
                HINDI PARSING // प्रथम सूचना रिपोर्ट (FIR)
              </span>
              <p className="text-[#E8E3DA] font-sans text-xs leading-relaxed">
                "अभियुक्त <span className="text-[#E8E3DA] font-bold border-b border-[#8B1E2F]">आरव मेहता</span> द्वारा फर्जी इनवॉइस और हवाला खातों के माध्यम से धन शोधन किया गया।"
              </p>
              <div className="mt-2 text-[10px] text-[#8C929D] flex items-center gap-2">
                <span>Extracted: Person="आरव मेहता"</span>
                <span>•</span>
                <span>Section="PMLA Sec 3/4"</span>
              </div>
            </div>

            {/* Gujarati Docket */}
            <div className="p-3 rounded-sm bg-[#12151B] border border-[#252932]">
              <span className="text-[10px] text-[#8B1E2F] block mb-1 uppercase font-bold tracking-wider">
                GUJARATI PARSING // સુરત કન્ટેનર ટર્મિનલ રિપોર્ટ
              </span>
              <p className="text-[#E8E3DA] font-sans text-xs leading-relaxed">
                "વાહન નંબર <span className="text-[#E8E3DA] font-bold border-b border-[#8B1E2F]">GJ-01-AB-4491</span> દ્વારા હજીરા બંદરે રાત્રે શંકાસ્પદ કાર્ગો હસ્તાંતરણ કરવામાં આવ્યું."
              </p>
              <div className="mt-2 text-[10px] text-[#8C929D] flex items-center gap-2">
                <span>Extracted: Vehicle="GJ-01-AB-4491"</span>
                <span>•</span>
                <span>Location="હજીરા બંદર (Surat)"</span>
              </div>
            </div>

            {/* Marathi Docket */}
            <div className="p-3 rounded-sm bg-[#12151B] border border-[#252932]">
              <span className="text-[10px] text-[#8B1E2F] block mb-1 uppercase font-bold tracking-wider">
                MARATHI PARSING // मुंबई गुन्हे शाखा अहवाल
              </span>
              <p className="text-[#E8E3DA] font-sans text-xs leading-relaxed">
                "संशयित <span className="text-[#E8E3DA] font-bold border-b border-[#8B1E2F]">विक्रम राव</span> यांच्या बँक खात्यातून <span className="text-[#8B1E2F] font-bold">₹8.10 कोटी</span> परदेशी हवाला द्वारे वर्ग करण्यात आले."
              </p>
              <div className="mt-2 text-[10px] text-[#8C929D] flex items-center gap-2">
                <span>Extracted: Person="विक्रम राव"</span>
                <span>•</span>
                <span>Amount="₹8.10 कोटी"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
