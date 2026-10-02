import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Terminal, Cpu, Shield, 
  Mail, Phone, Linkedin, Github, ExternalLink,
  Compass, ArrowUpRight, Sun, Moon, Asterisk,
  Copy, Layers, GitBranch, Database, Zap, BookOpen, User, Award, Check
} from 'lucide-react';
import './styles/App.css';
import AiCaseStudiesHub from './components/AiCaseStudiesHub';
import PyGenGuardDiagram from './components/PyGenGuardDiagram';
import PoultraFunnelDiagram from './components/PoultraFunnelDiagram';
import ProductLifecycleDiagram from './components/ProductLifecycleDiagram';

// Coded before/after Android checkout mockups for the COD-conversion regression case study
const AndroidCheckoutMockup = ({ isLight = true }) => {
  const otp = ['2', '7', '4', '1'];
  const kbRow = (n) => Array.from({ length: n });
  return (
    <div className="grid sm:grid-cols-2 gap-6 my-6">
      {/* BEFORE */}
      <div className={`p-5 sm:p-6 border ${isLight ? 'bg-red-50/60 border-red-500/30' : 'bg-red-950/10 border-red-500/30'}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono-tech text-xs font-bold uppercase tracking-widest text-red-500">Before · v4.12 Regression</span>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 bg-red-500/15 text-red-500 uppercase font-bold">COD 91% → 38%</span>
        </div>
        <div className="w-36 mx-auto border-[6px] border-black rounded-[1.6rem] bg-black p-1.5 shadow-lg">
          <div className="relative bg-white rounded-[1.1rem] overflow-hidden h-64">
            <div className="flex items-center justify-between px-3 pt-1.5 text-[7px] font-mono-tech text-black/70">
              <span>9:41</span><span>●●● ▮</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5">
              <div className="w-5 h-5 rounded bg-black/10 flex-none" />
              <div className="text-[7px] text-black/80 font-semibold leading-tight">Wireless Earbuds<br/>₹1,499</div>
            </div>
            <div className="px-3 pt-2.5">
              <div className="text-[6px] text-black/50 mb-1">Enter the 4-digit code</div>
              <div className="flex gap-1">
                {otp.map((d, i) => (
                  <div key={i} className="w-5 h-6 border border-black/20 rounded flex items-center justify-center text-[8px] font-bold text-black">{d}</div>
                ))}
              </div>
            </div>
            <div className="absolute left-3 right-3 top-[102px]">
              <div className="border border-dashed border-red-500 text-red-500 text-[6px] text-center py-1 rounded leading-tight">
                "Confirm Order" — hidden below keyboard
              </div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 bg-gray-300/90" style={{ height: '58%' }}>
              <div className="grid grid-cols-10 gap-[2px] p-1.5">
                {kbRow(30).map((_, i) => <div key={i} className="h-2 bg-white rounded-[1px]" />)}
              </div>
            </div>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-[11px] text-red-600 font-mono-tech leading-snug">
          <li>→ Keyboard covers ~60% of viewport on 720p, 1.25x font scale</li>
          <li>→ "Confirm Order" primary CTA pushed below screen fold</li>
          <li>→ Session replays: users tap repeatedly without finding button</li>
        </ul>
      </div>

      {/* AFTER */}
      <div className={`p-5 sm:p-6 border ${isLight ? 'bg-emerald-50/60 border-emerald-500/30' : 'bg-emerald-950/10 border-emerald-500/30'}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono-tech text-xs font-bold uppercase tracking-widest text-emerald-600">After · Single-Line Hotfix</span>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 bg-emerald-500/15 text-emerald-600 uppercase font-bold">COD Rebounded to 89%</span>
        </div>
        <div className="w-36 mx-auto border-[6px] border-black rounded-[1.6rem] bg-black p-1.5 shadow-lg">
          <div className="relative bg-white rounded-[1.1rem] overflow-hidden h-64">
            <div className="flex items-center justify-between px-3 pt-1.5 text-[7px] font-mono-tech text-black/70">
              <span>9:41</span><span>●●● ▮</span>
            </div>
            <div className="px-3 pt-2">
              <div className="text-[6px] text-black/50 mb-1">Enter the 4-digit code</div>
              <div className="flex gap-1 mb-2">
                {otp.map((d, i) => (
                  <div key={i} className="w-5 h-6 border border-emerald-400 rounded flex items-center justify-center text-[8px] font-bold text-black relative">
                    {d}
                    {i === 3 && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 absolute -right-1 -top-1" />}
                  </div>
                ))}
              </div>
              <div className="bg-emerald-600 text-white text-[7.5px] font-bold text-center rounded py-1.5">Confirm Order</div>
              <div className="text-[6px] text-emerald-600 font-mono-tech text-center mt-1">Auto-submitting on 4th digit…</div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 bg-gray-300/90" style={{ height: '58%' }}>
              <div className="grid grid-cols-10 gap-[2px] p-1.5">
                {kbRow(30).map((_, i) => <div key={i} className="h-2 bg-white rounded-[1px]" />)}
              </div>
            </div>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-[11px] text-emerald-700 font-mono-tech leading-snug">
          <li>→ Added windowSoftInputMode="adjustResize" to AndroidManifest</li>
          <li>→ Auto-submit on 4th OTP digit: CTA removed from critical path</li>
          <li>→ Low-dpi device regression tests permanently added to CI/CD</li>
        </ul>
      </div>
    </div>
  );
};

// Reusable Editorial Section Heading
const EditorialHeading = ({ number, title, subtitle, tag = "DISCOVERY", isLight = true }) => (
  <div className={`mb-8 border-b pb-4 ${isLight ? 'border-black/15' : 'border-white/10'}`}>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <span className="font-mono-tech text-xs text-[#d9623d] font-bold tracking-[0.3em] uppercase">
          [{number}]
        </span>
        <span className="h-[1px] w-8 bg-[#d9623d]/60"></span>
        <span className={`font-mono-tech text-xs tracking-[0.25em] uppercase font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
          {tag}
        </span>
      </div>
    </div>
    
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase mb-3 ${isLight ? 'text-[#141418]' : 'text-white'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`font-serif-editorial italic text-base md:text-xl font-light max-w-4xl leading-relaxed ${isLight ? 'text-[#141418]' : 'text-gray-300'}`}>
        "{subtitle}"
      </p>
    )}
  </div>
);

// Tech Marquee Strip with editorial dividers
const EditorialMarquee = ({ isLight = true }) => {
  const techs = [
    "Product Sense & Inversion", "Deterministic Safety Gates", "Sub-5ms Latency Budgets",
    "PyGenGuard Architecture", "ChromaDB Semantic Caching", "Model Routing & Unit Economics",
    "JIT Authentication Funnels", "SafeHatch Escrow Engine", "Root-Cause Funnel Segmentation",
    "OpenTelemetry Spans", "FastAPI & LangGraph", "CI/CD Safety Evals"
  ];

  return (
    <div className={`w-full overflow-hidden py-3.5 border-y ${isLight ? 'border-black/15 bg-[#f4efe6]' : 'border-white/10 bg-[#0c0c10]'}`}>
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center gap-5 px-5 cursor-default">
            <Asterisk className="w-3 h-3 text-[#d9623d]" />
            <span className={`transition-colors text-[11px] font-mono-tech uppercase tracking-[0.22em] font-bold ${isLight ? 'text-[#141418] hover:text-[#d9623d]' : 'text-white/70 hover:text-white'}`}>
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Theme state: defaults to elegant editorial LIGHT mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jayasudhan_theme') || 'light';
  });

  const [activeSection, setActiveSection] = useState('overview');
  const [copyToast, setCopyToast] = useState(null);

  const isLight = theme === 'light';

  useEffect(() => {
    localStorage.setItem('jayasudhan_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // Clean up static #/casestudy/... from URL on load and set clean dynamic hash tracking
  useEffect(() => {
    const rawHash = window.location.hash;
    if (rawHash && rawHash.includes('casestudy')) {
      // Clean up the static case study hash to clean section link
      window.history.replaceState(null, '', `${window.location.pathname}#artifacts`);
      setActiveSection('artifacts');
      setTimeout(() => {
        const el = document.getElementById('artifacts');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (rawHash) {
      const cleanId = rawHash.replace('#', '');
      setActiveSection(cleanId);
    }

    // Scroll spy: update active section and window URL hash dynamically as user scrolls
    const sections = ['overview', 'mindset', 'artifacts', 'teardown', 'experience', 'creative', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          if (activeSection !== sections[i]) {
            setActiveSection(sections[i]);
            if (window.location.hash !== `#${sections[i]}`) {
              window.history.replaceState(null, '', `#${sections[i]}`);
            }
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    window.history.replaceState(null, '', `#${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyBlurb = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyToast("Copied to clipboard!");
      setTimeout(() => setCopyToast(null), 3000);
    });
  };

  // Structured Work Experience Data
  const experiences = [
    {
      num: "01",
      role: "Co-Founder & AI Product Manager",
      company: "TS Techy",
      date: "Oct 2023 – Present · 3 yrs",
      type: "Full-time · Remote",
      bullets: [
        "Led 0→1 development of 4 production GenAI systems from problem discovery, PRD definition, and architecture schemas to live telemetry.",
        "Founded PyGenGuard, an open-source deterministic AI safety framework blocking ~95% of tested prompt injection attacks at <5ms latency without network calls.",
        "Architected semantic caching and model routing across RAG pipelines, cutting inference token expenditures by 40–60% and median latency by 57%."
      ],
      skills: ["Product Strategy", "PRDs", "Deterministic AI Safety", "Model Routing", "Semantic Caching", "FastAPI"]
    },
    {
      num: "02",
      role: "Sourcing Analyst — Agentic AI Focused",
      company: "GEP Worldwide",
      date: "Jan 2026 – Present · 9 mos",
      type: "Internship · Greater Coimbatore Area · On-site",
      bullets: [
        "Engineered custom LLM automation workflows and agentic pipelines for supplier discovery, eliminating 15+ hours/week of manual data gathering.",
        "Translated procurement SOPs into structured AI product specifications and validation scripts, cutting the specific demand-to-allocation search step ~70% (from 3–4 days to 1–2 hours).",
        "Designed human-in-the-loop review gates across high-volume vendor catalogs to ensure compliance and prevent inaccurate allocations."
      ],
      skills: ["Agentic AI", "Enterprise SOP Automation", "Human-in-the-Loop", "Turnaround Optimization"]
    },
    {
      num: "03",
      role: "IoT with ML Intern",
      company: "TwirlTact Technology Solutions",
      date: "May 2025 – Jun 2025 · 2 mos",
      type: "Internship · Coimbatore South · On-site",
      bullets: [
        "Developed machine learning telemetry models for IoT sensor data, implementing real-time ingestion pipelines and threshold anomaly detection in Python."
      ],
      skills: ["Python", "MLOps", "Real-Time Telemetry", "Anomaly Detection"]
    },
    {
      num: "04",
      role: "Head of Media & Operations",
      company: "Avantaa'24 (SKCT)",
      date: "Oct 2023 – Feb 2026",
      type: "Cross-Functional Leadership",
      bullets: [
        "Orchestrated brand narrative, digital assets, and live technical demonstrations driving high engagement across 10,000+ attendees under strict delivery deadlines."
      ],
      skills: ["Cross-Functional Leadership", "Operations", "Stakeholder Management"]
    }
  ];

  return (
    <div className={`min-h-screen font-sans bg-grain relative transition-colors duration-300 ${isLight ? 'bg-[#faf7f2] text-[#141418] selection:bg-[#d9623d]/20 selection:text-[#141418]' : 'bg-[#070709] text-white selection:bg-[#d9623d]/40 selection:text-white'}`}>
      
      {/* Top Reading Progress Bar */}
      <div className={`fixed top-0 left-0 w-full h-[2px] z-50 ${isLight ? 'bg-[#e5dfd5]' : 'bg-zinc-900'}`}>
        <motion.div className="h-full bg-[#d9623d]" style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} />
      </div>

      {/* EDITORIAL TOP NAVIGATION BAR */}
      <header className={`w-full border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${isLight ? 'border-black/10 bg-[#faf7f2]/90' : 'border-white/10 bg-[#070709]/90'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`font-display font-black text-xl tracking-tighter uppercase flex items-center gap-1.5 ${isLight ? 'text-[#141418]' : 'text-white'}`}>
              <Asterisk className="w-4 h-4 text-[#d9623d]" /> Jayasudhan.
            </span>
            <span className={`hidden sm:inline-block px-2.5 py-0.5 border text-[9px] font-mono-tech uppercase tracking-widest font-bold ${isLight ? 'border-black/20 bg-white text-[#141418]' : 'border-white/10 bg-white/5 text-white/70'}`}>
              AI PM • 0→1 BUILDER
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech tracking-widest uppercase font-semibold">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'mindset', label: 'Mindset' },
              { id: 'artifacts', label: 'Artifacts' },
              { id: 'teardown', label: 'Teardown' },
              { id: 'experience', label: 'Experience' },
              { id: 'creative', label: 'Creative' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors py-1 relative ${
                  activeSection === item.id
                    ? 'text-[#d9623d] font-bold'
                    : isLight
                    ? 'text-[#141418] hover:text-[#d9623d]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d9623d]" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Light / Dark Mode Switcher */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Light / Dark Mode"
              className={`p-2 border transition-all flex items-center gap-1.5 text-xs font-mono-tech uppercase font-bold tracking-wider ${isLight ? 'border-[#141418] bg-white hover:bg-black/5 text-[#141418]' : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'}`}
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-[#d9623d]" /> : <Sun className="w-3.5 h-3.5 text-[#f59e0b]" />}
              <span className="hidden sm:inline-block text-[10px]">{isLight ? 'Dark' : 'Light'}</span>
            </button>

            <a 
              href="mailto:jayasudhanmuneeswaran@gmail.com"
              className="pm-btn-primary !py-2 !px-4"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION: REFINED EDITORIAL ARCHITECTURAL LAYOUT */}
      <section id="overview" className={`relative overflow-hidden pt-8 pb-12 border-b scroll-mt-24 ${isLight ? 'border-black/15' : 'border-white/10'}`}>
        
        {/* Giant Backdrop Outline Typography */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.08]">
          <span className="font-display font-black text-[16vw] leading-none uppercase tracking-tighter text-stroke">
            PRODUCT
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Top Status & Education Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className={`flex items-center gap-2 px-3 py-1 border text-[10px] font-mono-tech uppercase tracking-widest ${isLight ? 'border-black/20 bg-white text-[#141418] font-bold shadow-sm' : 'border-white/10 bg-white/5 text-white/70'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open for AI Product Manager & 0→1 Technical Roles
            </div>
            <div className={`text-[10px] font-mono-tech uppercase tracking-widest flex items-center gap-2 font-semibold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
              <Award className="w-3.5 h-3.5 text-[#d9623d]" />
              <span>SKCT • Affiliated with IIT Ropar • Anabin H+ Recognized</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Bio Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              <div className="font-serif-editorial italic text-lg sm:text-xl text-[#d9623d] font-normal mb-1">
                Portfolio & Engineering Schematics
              </div>

              <h1 className={`text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.92] uppercase mb-5 ${isLight ? 'text-[#141418]' : 'text-white'}`}>
                Jayasudhan<br/>
                <span className="text-stroke">Muneeswaran</span>
              </h1>

              <div className={`inline-block px-3 py-1 mb-6 border-l-2 border-[#d9623d] text-xs sm:text-sm font-mono-tech uppercase tracking-widest font-semibold ${isLight ? 'bg-white border border-black/10 text-[#141418] shadow-sm' : 'bg-white/[0.02] text-white/80'}`}>
                AI Product Manager • Technical PM (AI/ML) • 0→1 System Builder
              </div>

              {/* Bio Statement */}
              <div className={`space-y-4 max-w-2xl leading-relaxed text-sm mb-8 ${isLight ? 'text-[#141418] font-normal' : 'text-gray-300 font-light'}`}>
                <p>
                  Turning ambiguous operational friction into deployed production systems. With a technical background in Artificial Intelligence & Data Science (Sri Krishna College of Technology, affiliated with IIT Ropar), I combine rigorous problem discovery with hands-on systems architecture—defining PRDs, designing stateful agentic workflows, benchmarking deterministic safety gates, and managing unit economics in live production.
                </p>
                <p className={`font-serif-editorial italic text-base border-l-2 pl-4 ${isLight ? 'text-[#141418] border-black/40 font-medium' : 'text-white/90 border-white/20'}`}>
                  "I don't just spec features—I inspect latency bottlenecks, validate token margins, and build working prototypes that ground strategy into measurable business impact."
                </p>
              </div>

              {/* Direct Section Anchors: Unified PM Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => scrollToSection('artifacts')} 
                  className="pm-btn-primary group"
                >
                  Inspect Production Artifacts
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('mindset')} 
                  className="pm-btn-secondary"
                >
                  Product Mindset
                </button>
                <button 
                  onClick={() => scrollToSection('teardown')} 
                  className="pm-btn-secondary"
                >
                  53-Pt UX Teardown
                </button>
              </div>
            </div>

            {/* Right Column: Framed Portrait with Architectural Plaque */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className={`relative z-10 w-[270px] sm:w-[320px] border shadow-xl overflow-hidden ${isLight ? 'bg-white border-black/20 shadow-black/5' : 'bg-[#0d0d12] border-white/20'}`}>
                <div className="w-full h-[310px] sm:h-[360px] overflow-hidden grayscale contrast-125 relative bg-zinc-900">
                  <img 
                    src="images/JayasudhanM.png" 
                    alt="Jayasudhan Muneeswaran - AI Product Manager" 
                    className="w-full h-full object-cover object-top" 
                  />
                  <div className={`absolute inset-0 pointer-events-none ${isLight ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent' : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'}`}></div>
                </div>

                {/* Architectural Blueprint Nameplate Plaque */}
                <div className={`p-4 border-t text-left ${isLight ? 'bg-[#f5efe6] border-black/15 text-[#141418]' : 'bg-[#121218] border-white/15 text-white'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono-tech text-[#d9623d] uppercase tracking-[0.2em] font-bold">
                      AI PRODUCT MANAGER
                    </span>
                    <span className={`text-[8px] font-mono-tech uppercase px-1.5 py-0.5 border font-bold ${isLight ? 'border-black/20 text-[#141418] bg-white' : 'border-white/20 text-white/80 bg-white/5'}`}>
                      0→1 SYSTEMS
                    </span>
                  </div>
                  <div className={`text-base font-display font-black tracking-tight uppercase leading-tight ${isLight ? 'text-[#141418]' : 'text-white'}`}>
                    Jayasudhan Muneeswaran
                  </div>
                  <div className={`text-[10px] font-mono-tech uppercase mt-1.5 flex items-center gap-1.5 font-medium ${isLight ? 'text-[#141418]/80' : 'text-white/60'}`}>
                    <Award className="w-3.5 h-3.5 text-[#d9623d] flex-shrink-0" />
                    <span>SKCT • Affiliated with IIT Ropar</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METRICS & DELIVERED IMPACT STRIP */}
      <section className={`w-full border-b ${isLight ? 'border-black/15 bg-[#f5efe6]' : 'border-white/10 bg-[#0c0c10]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className={`border-r pr-6 ${isLight ? 'border-black/15' : 'border-white/10'}`}>
            <span className={`font-display text-2xl sm:text-3xl font-black block ${isLight ? 'text-[#141418]' : 'text-white'}`}>4 SYSTEMS</span>
            <span className="font-mono-tech text-[10px] text-[#d9623d] uppercase tracking-widest font-bold block mt-1">Shipped in Production</span>
            <span className={`text-[11px] font-medium mt-0.5 block ${isLight ? 'text-[#141418]' : 'text-white/40'}`}>0→1 enterprise & developer deployments</span>
          </div>

          <div className={`border-r pr-6 ${isLight ? 'border-black/15' : 'border-white/10'}`}>
            <span className={`font-display text-2xl sm:text-3xl font-black block ${isLight ? 'text-[#141418]' : 'text-white'}`}>&lt;5ms / ~95%</span>
            <span className={`font-mono-tech text-[10px] uppercase tracking-widest font-bold block mt-1 ${isLight ? 'text-[#141418]' : 'text-white/70'}`}>Runtime Safety Defense</span>
            <span className={`text-[11px] font-medium mt-0.5 block ${isLight ? 'text-[#141418]' : 'text-white/40'}`}>PyGenGuard sub-5ms injection barrier</span>
          </div>

          <div className={`border-r pr-6 ${isLight ? 'border-black/15' : 'border-white/10'}`}>
            <span className={`font-display text-2xl sm:text-3xl font-black block ${isLight ? 'text-[#141418]' : 'text-white'}`}>68% → 14%</span>
            <span className={`font-mono-tech text-[10px] uppercase tracking-widest font-bold block mt-1 ${isLight ? 'text-[#141418]' : 'text-white/70'}`}>Funnel Drop-Off Slash</span>
            <span className={`text-[11px] font-medium mt-0.5 block ${isLight ? 'text-[#141418]' : 'text-white/40'}`}>Poultra 7 lazy auth & vernacular UX</span>
          </div>

          <div>
            <span className={`font-display text-2xl sm:text-3xl font-black block ${isLight ? 'text-[#141418]' : 'text-white'}`}>15+ hrs/wk</span>
            <span className={`font-mono-tech text-[10px] uppercase tracking-widest font-bold block mt-1 ${isLight ? 'text-[#141418]' : 'text-white/70'}`}>Saved per Ops Team</span>
            <span className={`text-[11px] font-medium mt-0.5 block ${isLight ? 'text-[#141418]' : 'text-white/40'}`}>Enterprise SOP & procurement automation</span>
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <EditorialMarquee isLight={isLight} />

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        
        {/* SECTION 01: PRODUCT MINDSET & OPERATING PRINCIPLES */}
        <section id="mindset" className="scroll-mt-24">
          <EditorialHeading 
            number="01"
            tag="OPERATING FRAMEWORK"
            title="Product Mindset & Operating Principles"
            subtitle="Real product management begins with deep customer empathy and ends with deterministic unit economics. Here is how I structure and deliver production AI systems."
            isLight={isLight}
          />
          <ProductLifecycleDiagram isLight={isLight} />
        </section>

        {/* SECTION 02: PRODUCTION ARTIFACTS & SYSTEM SCHEMATICS */}
        <section id="artifacts" className="scroll-mt-24">
          <EditorialHeading 
            number="02"
            tag="PRODUCTION ARTIFACTS"
            title="Selected Production Systems"
            subtitle="Visual architecture schematics and deterministic impact metrics across open-source infrastructure, high-throughput caching, and high-velocity commerce."
            isLight={isLight}
          />

          <div className="space-y-8">
            
            {/* Artifact 1: PyGenGuard */}
            <div className={`border p-6 sm:p-8 transition-all ${isLight ? 'bg-white border-black/15 shadow-sm' : 'bg-[#0c0c10] border-white/10'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono-tech text-xs text-[#d9623d] font-bold uppercase">[Artifact 01]</span>
                    <span className={`text-[10px] font-mono-tech px-2 py-0.5 border uppercase font-bold ${isLight ? 'border-black/20 bg-black/5 text-[#141418]' : 'border-white/10 bg-white/5 text-white/70'}`}>AI Safety • Developer Infrastructure</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-display font-black uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>
                    PyGenGuard — Deterministic GenAI Runtime Governance Layer
                  </h3>
                  <p className={`font-serif-editorial italic text-sm mt-1 font-medium ${isLight ? 'text-[#141418]' : 'text-gray-400'}`}>
                    "Sub-5ms prompt injection & data exfiltration defense middleware without LLM-as-a-judge latency."
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href="https://pypi.org/project/pygenguard/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="pm-btn-primary !py-2 !px-4"
                  >
                    PyPI Release <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Interactive Visual Architecture Diagram */}
              <PyGenGuardDiagram isLight={isLight} />

              {/* Verified Infographic Asset */}
              <div className={`p-4 border mt-6 flex flex-col md:flex-row items-center gap-6 ${isLight ? 'bg-[#faf7f2] border-black/15' : 'bg-black/20 border-white/10'}`}>
                <div className="w-full md:w-1/3 max-h-48 overflow-hidden border border-black/15">
                  <img 
                    src="images/pygenguard_jev_architecture.jpg" 
                    alt="PyGenGuard JEV Architecture Infographic" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d9623d] font-bold">
                    Architecture Specification
                  </span>
                  <h4 className={`font-display font-bold uppercase text-sm ${isLight ? 'text-[#141418]' : 'text-white'}`}>Deterministic Security Inversion</h4>
                  <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-[#141418]' : 'text-gray-300'}`}>
                    Traditional guardrails rely on secondary LLM judges, adding 300–500ms of latency and non-trivial token billing. PyGenGuard inverts this paradigm by enforcing compiled Aho-Corasick string tries and vector distance thresholds directly in memory, stopping 95% of attacks before external APIs are invoked.
                  </p>
                </div>
              </div>
            </div>

            {/* Artifact 02: Poultra 7 */}
            <div className={`border p-6 sm:p-8 transition-all ${isLight ? 'bg-white border-black/15 shadow-sm' : 'bg-[#0c0c10] border-white/10'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono-tech text-xs text-[#d9623d] font-bold uppercase">[Artifact 02]</span>
                    <span className={`text-[10px] font-mono-tech px-2 py-0.5 border uppercase font-bold ${isLight ? 'border-black/20 bg-black/5 text-[#141418]' : 'border-white/10 bg-white/5 text-white/70'}`}>Marketplace Architecture • UX Accessibility • Escrow</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-display font-black uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>
                    Poultra 7 — High-Velocity Poultry E-Commerce & Escrow
                  </h3>
                  <p className={`font-serif-editorial italic text-sm mt-1 font-medium ${isLight ? 'text-[#141418]' : 'text-gray-400'}`}>
                    "SaaS B2B marketplace slashing Step 0 drop-off from 68% to 14% via lazy auth, vernacular UX, and SafeHatch Escrow."
                  </p>
                </div>
              </div>

              {/* Interactive Poultra Funnel Diagram */}
              <PoultraFunnelDiagram isLight={isLight} />
            </div>

          </div>

          {/* Interactive Google-Level AI Case Studies Hub */}
          <AiCaseStudiesHub isLight={isLight} />
        </section>

        {/* SECTION 03: ROOT-CAUSE TEARDOWN (53-POINT CONVERSION REGRESSION) */}
        <section id="teardown" className="scroll-mt-24">
          <EditorialHeading 
            number="03"
            tag="ROOT-CAUSE TEARDOWN"
            title="A 53-Point Conversion Drop, Traced to One Line"
            subtitle="COD conversion on Tier-2/3 Android devices regressed from 91% down to 38% after release v4.12. Here is the visual diagnostic and the single-line hotfix."
            isLight={isLight}
          />

          <AndroidCheckoutMockup isLight={isLight} />

          {/* Metric Comparison & Screenshot Infographic */}
          <div className="grid md:grid-cols-12 gap-6 items-center mt-6">
            <div className={`md:col-span-4 border p-2 ${isLight ? 'bg-white border-black/15 shadow-sm' : 'bg-black/20 border-white/10'}`}>
              <img 
                src="images/checkout_ui_light.jpg" 
                alt="Checkout UI Teardown Screen" 
                className="w-full h-auto object-cover border border-black/10" 
              />
              <span className={`text-[10px] font-mono-tech uppercase block text-center mt-2 font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
                Live Checkout Screen Audit
              </span>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`p-3 border ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                  <span className={`font-display text-2xl font-black block ${isLight ? 'text-[#141418]' : 'text-white'}`}>91%</span>
                  <span className={`text-[10px] font-mono-tech uppercase font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>Baseline COD Rate</span>
                </div>
                <div className={`p-3 border ${isLight ? 'bg-red-50 border-red-500/30 text-red-600' : 'bg-red-950/20 border-red-500/20 text-red-400'}`}>
                  <span className="font-display text-2xl font-black block">38%</span>
                  <span className="text-[10px] font-mono-tech uppercase font-bold">Post-Release Drop</span>
                </div>
                <div className={`p-3 border ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                  <span className={`font-display text-2xl font-black block ${isLight ? 'text-[#141418]' : 'text-white'}`}>~60%</span>
                  <span className={`text-[10px] font-mono-tech uppercase font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>Screen Covered</span>
                </div>
                <div className={`p-3 border ${isLight ? 'bg-emerald-50 border-emerald-500/30 text-emerald-600' : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400'}`}>
                  <span className="font-display text-2xl font-black block">89%</span>
                  <span className="text-[10px] font-mono-tech uppercase font-bold">Post-Hotfix Recovery</span>
                </div>
              </div>

              <div className={`p-4 border text-xs font-mono-tech leading-relaxed ${isLight ? 'bg-white border-black/15 text-[#141418] shadow-sm' : 'bg-black/40 border-white/10 text-gray-200'}`}>
                <span className="font-bold text-[#d9623d] block mb-1">PM Investigative Method:</span>
                "When aggregate conversion drops, never average the metric. Segment by OS, device resolution, and input method. Session replays revealed users on 720p screens were aggressively tapping the inactive upper screen because the keyboard overlay blocked the CTA."
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: CAREER TIMELINE & EDUCATION */}
        <section id="experience" className="scroll-mt-24">
          <EditorialHeading 
            number="04"
            tag="CAREER TIMELINE"
            title="Work Experience & Education"
            subtitle="Track record of turning enterprise friction into automated systems, scalable architectures, and measurable efficiency."
            isLight={isLight}
          />

          <div className="space-y-5 mb-8">
            {experiences.map((exp, i) => (
              <div 
                key={i}
                className={`p-6 sm:p-8 border transition-all ${isLight ? 'bg-white border-black/15 hover:border-[#d9623d] shadow-sm' : 'bg-[#0c0c10] border-white/10 hover:border-[#d9623d]/50'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b pb-4 mb-4 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-xs text-[#d9623d] font-bold">[{exp.num}]</span>
                      <h3 className={`text-xl sm:text-2xl font-display font-bold uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>
                        {exp.role}
                      </h3>
                    </div>
                    <div className={`text-xs font-mono-tech uppercase tracking-wider font-semibold ${isLight ? 'text-[#141418]' : 'text-white/60'} mt-1`}>
                      {exp.company} • {exp.type}
                    </div>
                  </div>
                  <span className={`text-xs font-mono-tech uppercase px-2.5 py-1 border font-bold ${isLight ? 'border-black/20 bg-white text-[#141418]' : 'border-white/10 bg-white/5 text-white/80'} self-start sm:self-auto`}>
                    {exp.date}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className={`text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 font-medium ${isLight ? 'text-[#141418]' : 'text-gray-300 font-light'}`}>
                      <span className="text-[#d9623d] font-bold mt-0.5">/</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${isLight ? 'border-black/10' : 'border-white/5'}`}>
                  {exp.skills.map((s, si) => (
                    <span key={si} className={`text-[9px] font-mono-tech uppercase px-2 py-0.5 border font-semibold ${isLight ? 'border-black/20 bg-white text-[#141418]' : 'border-white/10 bg-white/5 text-white/70'}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Box */}
          <div className={`p-6 sm:p-8 border ${isLight ? 'bg-[#f8f5ee] border-black/15 shadow-sm' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono-tech text-xs text-[#d9623d] font-bold uppercase">[ACADEMIC CREDENTIALS]</span>
              <span className="h-[1px] w-6 bg-[#d9623d]/60"></span>
              <span className="text-xs font-mono-tech uppercase text-emerald-600 font-bold">Anabin H+ Certified</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h4 className={`font-display font-bold text-lg uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>B.Tech in Artificial Intelligence & Data Science</h4>
                <div className={`text-xs font-mono-tech font-bold ${isLight ? 'text-[#141418]' : 'text-white/70'}`}>
                  Sri Krishna College of Technology (SKCT) · 2022 – 2026
                </div>
                <div className="text-xs font-mono-tech text-[#d9623d] font-bold">
                  CGPA: 8.0 · First Class with Distinction
                </div>
              </div>

              <div className="space-y-1">
                <h4 className={`font-display font-bold text-lg uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>Affiliated Minor in Artificial Intelligence</h4>
                <div className={`text-xs font-mono-tech font-bold ${isLight ? 'text-[#141418]' : 'text-white/70'}`}>
                  Indian Institute of Technology, Ropar (IIT Ropar) · 2025 – 2026
                </div>
                <div className={`text-xs font-mono-tech font-medium ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>
                  Core curriculum in deep learning, optimization, and probabilistic modeling.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: CREATIVE DIRECTION & 3D ASSETS */}
        <section id="creative" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono-tech text-xs text-[#d9623d] font-bold">[05]</span>
                <span className={`text-xs font-mono-tech uppercase font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>DESIGN & VISUAL CRAFT</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-display font-black uppercase ${isLight ? 'text-[#141418]' : 'text-white'}`}>
                Creative Direction & 3D Shaders
              </h2>
            </div>
            <a 
              href="https://www.artstation.com/jayasudhanmuneeswaran" 
              target="_blank" 
              rel="noreferrer"
              className="pm-btn-secondary !py-2 !px-4 self-start sm:self-auto"
            >
              ArtStation Portfolio <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "3D Digital Art & Shaders", img: "images/3d.jpg" },
              { label: "Campaign & Product Design", img: "images/markettingposter.png" },
              { label: "Product Visualization", img: "images/product.jpg" },
              { label: "Packaging & Brand Identity", img: "images/packaging_design.png" }
            ].map((work, i) => (
              <div key={i} className={`relative aspect-square overflow-hidden group border ${isLight ? 'border-black/15 shadow-sm' : 'border-black/10'}`}>
                <img 
                  src={work.img} 
                  alt={work.label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-mono-tech text-xs font-bold uppercase">{work.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: DIRECT REACHOUT & CALL TO ACTION */}
        <section id="contact" className={`relative py-12 border p-6 sm:p-10 text-center scroll-mt-24 ${isLight ? 'border-black/15 bg-white shadow-sm' : 'border-white/10 bg-[#0c0c10]'}`}>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#d9623d]/30 bg-[#d9623d]/10 text-xs font-mono-tech text-[#d9623d] uppercase tracking-widest font-bold">
              <Asterisk className="w-3.5 h-3.5 animate-spin-slow" /> Let's Create Impact
            </div>

            <h2 className={`text-3xl sm:text-5xl font-display font-black uppercase tracking-tight ${isLight ? 'text-[#141418]' : 'text-white'}`}>
              Have an Ambitious Problem?
            </h2>

            <p className={`font-serif-editorial italic text-base sm:text-lg ${isLight ? 'text-[#141418] font-medium' : 'text-gray-300 font-light'}`}>
              "Open for AI Product Manager, Technical PM (AI/ML), and 0→1 System Builder opportunities."
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href="mailto:jayasudhanmuneeswaran@gmail.com" 
                className="pm-btn-primary !py-3.5 !px-6 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" /> jayasudhanmuneeswaran@gmail.com
              </a>
              <a 
                href="tel:9787080805" 
                className="pm-btn-secondary !py-3.5 !px-6 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" /> +91 9787080805
              </a>
            </div>

            <div className={`pt-8 flex flex-wrap items-center justify-center gap-6 border-t text-xs font-mono-tech uppercase tracking-widest ${isLight ? 'border-black/15 text-[#141418]' : 'border-white/10 text-white/60'}`}>
              <a href="https://www.linkedin.com/in/jayasudhan-m-a0b9b2244/" target="_blank" rel="noreferrer" className="hover:text-[#d9623d] transition-colors flex items-center gap-1.5 font-bold">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href="https://github.com/Jayasudhandesigner" target="_blank" rel="noreferrer" className="hover:text-[#d9623d] transition-colors flex items-center gap-1.5 font-bold">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href="https://pypi.org/project/pygenguard/" target="_blank" rel="noreferrer" className="hover:text-[#d9623d] transition-colors flex items-center gap-1.5 font-bold">
                <Shield className="w-3.5 h-3.5" /> PyPI
              </a>
            </div>
          </div>
        </section>

      </div>



      {/* Floating Blurb Toast */}
      {copyToast && (
        <div className="share-toast">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyToast}</span>
        </div>
      )}
    </div>
  );
}
