import React, { useState } from 'react';
import { Database, Cpu, Zap, ArrowRight, CheckCircle2, GitBranch, Layers, Sparkles, Filter } from 'lucide-react';

export default function SemanticCacheDiagram({ isLight = true }) {
  const [queryType, setQueryType] = useState('cache-hit'); // 'cache-hit' | 'cheap-router' | 'deep-model'

  const paths = {
    'cache-hit': {
      title: 'Semantic Cache Hit (Cosine >= 0.88)',
      tag: '0ms LATENCY · $0.00 COST',
      query: 'What is the standard SLA for urgent equipment dispatch in Region 2?',
      similarity: '0.94 (Exact Semantic Match)',
      route: 'ChromaDB Local Vector Cache',
      latency: '12 ms',
      cost: '$0.0000',
      tokensSaved: '100% of generation tokens',
      note: 'Query resolved from high-dimension vector cache without invoking model inference.'
    },
    'cheap-router': {
      title: 'Low-Complexity Query Routed to Groq LPU',
      tag: 'FAST LANE · 300+ TOK/S',
      query: 'Extract the order number and delivery date from this dispatch email.',
      similarity: '0.42 (Cache Miss · Low Reasoning Need)',
      route: 'Groq LPU (Llama 3.3 70B Fast Lane)',
      latency: '240 ms',
      cost: '$0.0004',
      tokensSaved: '65% cheaper than Frontier model',
      note: 'Extraction queries bypass deep reasoning models, running on ultra-fast LPUs to preserve compute budgets.'
    },
    'deep-model': {
      title: 'High-Complexity Query Routed to Frontier Model',
      tag: 'MULTI-STEP SYNTHESIS',
      query: 'Reconcile cross-border VAT exemptions against customs manifests for Q3 audits.',
      similarity: '0.21 (Cache Miss · Deep Reasoning)',
      route: 'Frontier Reasoning Engine + Python REPL',
      latency: '1,420 ms',
      cost: '$0.0120',
      tokensSaved: '0% (Full reasoning applied)',
      note: 'Allocated full compute only for queries requiring multi-step verification and mathematical reasoning.'
    }
  };

  const active = paths[queryType];

  return (
    <div className={`p-6 sm:p-8 border my-6 transition-all ${isLight ? 'bg-white border-black/10 shadow-sm' : 'bg-[#0e0e12] border-white/10'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d9623d]"></span>
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d9623d] font-bold">
              Inference Economics & Latency Router
            </span>
          </div>
          <h4 className={`text-xl font-display font-black uppercase mt-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            Semantic Caching & Intelligent Model Routing
          </h4>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setQueryType('cache-hit')}
            className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase font-bold tracking-wider transition-all border ${
              queryType === 'cache-hit'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : isLight
                ? 'bg-white hover:border-[#d9623d] hover:text-[#d9623d] text-[#141418] border-black/20'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
            }`}
          >
            Cache Hit (0.94)
          </button>
          <button
            onClick={() => setQueryType('cheap-router')}
            className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase font-bold tracking-wider transition-all border ${
              queryType === 'cheap-router'
                ? 'bg-[#d9623d] text-white border-[#d9623d] shadow-sm'
                : isLight
                ? 'bg-white hover:border-[#d9623d] hover:text-[#d9623d] text-[#141418] border-black/20'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
            }`}
          >
            Groq LPU Route
          </button>
          <button
            onClick={() => setQueryType('deep-model')}
            className={`px-3 py-1.5 text-[11px] font-mono-tech uppercase font-bold tracking-wider transition-all border ${
              queryType === 'deep-model'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : isLight
                ? 'bg-white hover:border-[#d9623d] hover:text-[#d9623d] text-[#141418] border-black/20'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
            }`}
          >
            Frontier Reasoning
          </button>
        </div>
      </div>

      {/* Visual Dynamic Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Node 1: Vector Cache Evaluation */}
        <div className={`p-4 border flex flex-col justify-between ${isLight ? 'bg-[#faf7f2] border-black/15' : 'bg-white/[0.02] border-white/10'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-mono-tech text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>01 · COSINE EVALUATION</span>
              <Database className="w-3.5 h-3.5 text-[#d9623d]" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>ChromaDB Cache Check</div>
            <div className={`text-[11px] font-mono-tech p-2 border leading-snug mb-3 ${isLight ? 'bg-white border-black/15 text-[#141418] font-medium' : 'bg-black/40 border-white/5 text-gray-300'}`}>
              "{active.query}"
            </div>
          </div>
          <div className={`pt-2 border-t border-black/10 text-[11px] font-mono-tech ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            Similarity: <span className="font-bold text-[#d9623d]">{active.similarity}</span>
          </div>
        </div>

        {/* Node 2: Decision Routing Gate */}
        <div className={`p-4 border flex flex-col justify-between ${
          queryType === 'cache-hit' ? 'bg-emerald-500/10 border-emerald-500/50' : isLight ? 'bg-[#faf7f2] border-black/15' : 'bg-white/[0.02] border-white/10'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#d9623d] font-bold">02 · ROUTING ENGINE</span>
              <GitBranch className="w-3.5 h-3.5 text-[#d9623d]" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>Dispatched Destination</div>
            <div className={`p-2 border font-mono-tech text-xs font-bold my-2 text-center ${isLight ? 'bg-white border-black/15 text-[#141418]' : 'bg-black/40 border-white/10 text-white'}`}>
              {active.route}
            </div>
            <p className={`text-[11px] leading-snug font-medium ${isLight ? 'text-[#141418]' : 'text-white/80'}`}>
              {active.note}
            </p>
          </div>
          <div className={`pt-2 border-t border-black/10 text-[10px] font-mono-tech ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            Threshold Gate: <span className="font-bold">Cosine 0.88 Boundary</span>
          </div>
        </div>

        {/* Node 3: Telemetry & Economics */}
        <div className={`p-4 border flex flex-col justify-between ${isLight ? 'bg-[#faf7f2] border-black/15' : 'bg-white/[0.02] border-white/10'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-mono-tech text-[10px] uppercase tracking-wider font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>03 · OBSERVED METRICS</span>
              <Zap className="w-3.5 h-3.5 text-[#d9623d]" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-2 ${isLight ? 'text-[#141418]' : 'text-white'}`}>Unit Telemetry</div>
            <div className="space-y-1.5 text-[11px] font-mono-tech">
              <div className="flex justify-between">
                <span className={isLight ? 'text-[#141418] font-medium' : 'text-white/60'}>Turnaround:</span>
                <span className={`font-bold ${isLight ? 'text-[#141418]' : 'text-white'}`}>{active.latency}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-[#141418] font-medium' : 'text-white/60'}>Unit Cost:</span>
                <span className="font-bold text-[#d9623d]">{active.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-[#141418] font-medium' : 'text-white/60'}>Savings:</span>
                <span className="font-bold text-emerald-600">{active.tokensSaved}</span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-black/10 flex items-center gap-1.5 text-[10px] font-mono-tech text-emerald-600 font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Economics Protected</span>
          </div>
        </div>

      </div>

      <div className={`p-4 border text-xs font-mono-tech flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isLight ? 'bg-white border-black/15 text-[#141418] shadow-sm' : 'bg-white/5 border-white/10 text-gray-200'}`}>
        <div className="flex items-start sm:items-center gap-2">
          <span className="font-bold text-[#d9623d] uppercase tracking-wider whitespace-nowrap">Production Impact:</span>
          <span className={isLight ? 'text-[#141418] font-medium' : 'text-gray-200'}>40–60% total API token expenditure cut; median P50 response latency dropped by 57%.</span>
        </div>
        <a
          href="https://github.com/Jayasudhandesigner/RAGMODEL-using-GROQ"
          target="_blank"
          rel="noreferrer"
          className="pm-btn-primary !py-1.5 !px-3 !text-[11px] self-start sm:self-auto"
        >
          View GitHub Repository →
        </a>
      </div>
    </div>
  );
}
