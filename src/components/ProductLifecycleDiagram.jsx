import React, { useState } from 'react';
import { Compass, Target, Code2, ShieldCheck, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProductLifecycleDiagram({ isLight = true }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: "01",
      title: "Investigate Operational Friction",
      badge: "Root-Cause Discovery",
      icon: <Compass className="w-4 h-4 text-[#d9623d]" />,
      summary: "Shadowing real users, inspecting raw log trails, and mapping cognitive fatigue before writing any requirement.",
      keyQuestion: "Where does the workflow actually stall in the real world?",
      realWorldArtifact: "Discovered 53-point conversion drop on low-end Androids caused by keyboard softInputMode overlaying checkout button.",
      metricsWatched: ["Funnel Step-0 Drop-off", "Manual Analyst Hours", "Task Abandonment"]
    },
    {
      num: "02",
      title: "Define Guardrails & Latency Budgets",
      badge: "Unit Economics",
      icon: <Target className="w-4 h-4 text-[#f59e0b]" />,
      summary: "Locking acceptable latency thresholds (<500ms), cost-per-query bounds, and minimum precision floors before development.",
      keyQuestion: "Can this AI feature survive unit economics at 100k daily queries?",
      realWorldArtifact: "Mandated <5ms deterministic regex/trie gate for PyGenGuard rather than a 350ms LLM-as-a-judge classifier.",
      metricsWatched: ["P95 Latency Ceiling", "Cost per Query", "Evaluation Precision Floor"]
    },
    {
      num: "03",
      title: "Prototype with Code & Schemas",
      badge: "Technical Feasibility",
      icon: <Code2 className="w-4 h-4 text-[#38bdf8]" />,
      summary: "Validating edge cases directly in code using Python, LangGraph, and FastAPI rather than theoretical wireframes.",
      keyQuestion: "Does the system hold together when tool schemas and data streams fail?",
      realWorldArtifact: "Engineered Groq LPU model router with ChromaDB semantic cache layer to cut API token costs by 40–60%.",
      metricsWatched: ["Tool Call Success Rate", "Schema Validation Errors", "Cache Hit Ratio"]
    },
    {
      num: "04",
      title: "Deterministic Evals & Red-Teaming",
      badge: "Auditable Safety",
      icon: <ShieldCheck className="w-4 h-4 text-[#34d399]" />,
      summary: "Benchmarking against adversarial injections, hallucination rates, and establishing human-in-the-loop escalation gates.",
      keyQuestion: "What happens when an adversarial or corrupted payload enters the pipeline?",
      realWorldArtifact: "Public test suites on GitHub & PyPI testing PyGenGuard against 28 distinct jailbreak and injection categories.",
      metricsWatched: ["Adversarial Block Rate (~95%)", "False Positive Rate", "Human Escalation SLA"]
    },
    {
      num: "05",
      title: "Ship & Iterate on Telemetry",
      badge: "Observability Flywheel",
      icon: <TrendingUp className="w-4 h-4 text-[#fbbf24]" />,
      summary: "Instrumenting OpenTelemetry and MLflow to continuously monitor live drift, cache hit ratios, and ROI margins.",
      keyQuestion: "Is the deployed system still performing predictably 6 months after launch?",
      realWorldArtifact: "Deployed clinical trial risk model with OpenTelemetry spans and MLflow rollback-safe releases on AWS.",
      metricsWatched: ["Model Drift Delta", "Weekly Hours Saved", "Gross Margin Protection"]
    }
  ];

  const current = stages[activeStage];

  return (
    <div className={`p-6 sm:p-8 border my-6 transition-all ${isLight ? 'bg-white border-black/10 shadow-sm' : 'bg-[#0e0e12] border-white/10'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d9623d]"></span>
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d9623d] font-bold">
              Product Mindset · 5-Stage Operating Framework
            </span>
          </div>
          <h4 className={`text-xl font-display font-black uppercase mt-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            How Jayasudhan Builds Production AI Systems
          </h4>
        </div>

        <span className={`text-xs font-mono-tech uppercase tracking-widest font-semibold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
          Click stages to inspect lifecycle
        </span>
      </div>

      {/* 5-Step Horizontal Breadcrumb Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {stages.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStage(idx)}
            className={`p-3 border text-left transition-all relative ${
              activeStage === idx
                ? 'border-[#d9623d] bg-[#d9623d]/10'
                : isLight
                ? 'border-black/20 bg-white hover:border-[#d9623d] hover:bg-[#d9623d]/5'
                : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-mono-tech text-xs font-bold ${activeStage === idx ? 'text-[#d9623d]' : isLight ? 'text-[#141418]' : 'text-white/60'}`}>
                {st.num}
              </span>
              {st.icon}
            </div>
            <div className={`font-display text-xs font-bold uppercase truncate ${activeStage === idx ? 'text-[#d9623d]' : isLight ? 'text-[#141418]' : 'text-white'}`}>
              {st.title.split(' ')[0]} {st.title.split(' ')[1] || ''}
            </div>
            <div className={`text-[9px] font-mono-tech uppercase truncate font-medium ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
              {st.badge}
            </div>
            {activeStage === idx && (
              <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#d9623d]" />
            )}
          </button>
        ))}
      </div>

      {/* Deep-Dive Active Card */}
      <div className={`p-6 border grid md:grid-cols-12 gap-6 items-center ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/[0.02] border-white/10'}`}>
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-[#d9623d] font-bold px-2.5 py-0.5 border border-[#d9623d]/30 bg-[#d9623d]/10">
              Stage {current.num} · {current.badge}
            </span>
          </div>

          <h3 className={`text-2xl font-display font-black uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            {current.title}
          </h3>

          <p className={`text-sm leading-relaxed ${isLight ? 'text-[#141418]' : 'text-gray-300'}`}>
            {current.summary}
          </p>

          <div className={`p-3 border-l-2 border-[#d9623d] ${isLight ? 'bg-white border border-black/10 text-[#141418]' : 'bg-white/5 text-gray-200'}`}>
            <span className="font-mono-tech text-xs font-bold text-[#d9623d] block mb-1">Guiding Inversion Question:</span>
            <span className="font-serif-editorial italic text-sm">"{current.keyQuestion}"</span>
          </div>
        </div>

        <div className="md:col-span-5 space-y-4">
          <div className={`p-4 border ${isLight ? 'bg-white border-black/15' : 'bg-black/40 border-white/10'}`}>
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d9623d] font-bold block mb-2">
              Demonstrated Shipped Proof
            </span>
            <p className={`text-xs font-mono-tech leading-snug font-medium ${isLight ? 'text-[#141418]' : 'text-white/80'}`}>
              {current.realWorldArtifact}
            </p>
          </div>

          <div>
            <span className={`font-mono-tech text-[10px] uppercase tracking-widest font-bold block mb-2 ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
              Metrics Monitored
            </span>
            <div className="flex flex-wrap gap-1.5">
              {current.metricsWatched.map((m, mi) => (
                <span key={mi} className={`px-2 py-0.5 border text-[10px] font-mono-tech uppercase font-semibold ${isLight ? 'bg-white border-black/20 text-[#141418]' : 'bg-white/5 border-white/10 text-gray-300'}`}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
