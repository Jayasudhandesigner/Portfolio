import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Network, Code2, Database, Workflow, Bot, BarChart3, Cloud, Layers, Cpu, Shield, 
  ArrowRight, Search, Zap, CheckCircle2, Terminal, Monitor, LayoutDashboard, BrainCircuit,
  Mail, Phone, FileText, Linkedin, Github, FileCode2, BookOpen, PenTool, Image, Video,
  Briefcase, ExternalLink, Home, Box, Code, MoveLeft, Sparkles
} from 'lucide-react';
import './styles/App.css';
import Dock from './components/Dock';

// Reusable Components
const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-20 md:mb-32">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-6"
    >
      <div className="h-[1px] w-12 bg-blue-500/50"></div>
      <span className="text-blue-400 text-xs font-mono tracking-[0.4em] uppercase">Discovery</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-gray-500 font-light max-w-3xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const NeuralHeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
        backgroundSize: '40px 40px' 
      }}></div>
      {/* Blueprint Dots */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
        backgroundImage: `radial-gradient(#fff 1px, transparent 0)`,
        backgroundSize: '40px 40px' 
      }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]"></div>
    </div>
  );
};

const TechMarquee = () => {
  const techs = [
    { name: "Python", icon: <FileCode2 className="w-5 h-5" /> },
    { name: "FastAPI", icon: <Zap className="w-5 h-5" /> },
    { name: "Docker", icon: <Box className="w-5 h-5" /> },
    { name: "Kubernetes", icon: <Layers className="w-5 h-5" /> },
    { name: "AWS", icon: <Cloud className="w-5 h-5" /> },
    { name: "Terraform", icon: <Database className="w-5 h-5" /> },
    { name: "MLflow", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "LangChain", icon: <BrainCircuit className="w-5 h-5" /> },
    { name: "PyGenGuard", icon: <Shield className="w-5 h-5" /> },
    { name: "React", icon: <Code className="w-5 h-5" /> },
    { name: "GitHub Actions", icon: <Workflow className="w-5 h-5" /> },
    { name: "Scikit-Learn", icon: <Cpu className="w-5 h-5" /> },
    { name: "RAG Systems", icon: <Search className="w-5 h-5" /> },
  ];

  return (
    <div className="relative w-full overflow-hidden py-10 border-y border-white/5 bg-white/[0.01]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center gap-4 px-12 group cursor-default">
            <div className="text-blue-500 group-hover:scale-125 transition-transform duration-500">
              {tech.icon}
            </div>
            <span className="text-white/40 group-hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
              {tech.name}
            </span>
            <div className="h-1 w-1 bg-white/10 rounded-none ml-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const experiences = [
    {
      role: "Sourcing Analyst",
      company: "GEP Worldwide",
      date: "Jan 2026 - Present",
      type: "Internship",
      bullets: [
        "Identified suppliers and documented sourcing workflows for operational requirements",
        "Assisted in PMO discussions regarding automation of manual sourcing tasks",
        "Prepared and cleaned sourcing datasets for internal utility evaluation",
        "Tested AI-assisted procurement tools in real-world sourcing scenarios"
      ],
      skills: ["Sourcing Workflows", "Data Preparation"]
    },
    {
      role: "AI Product Manager",
      company: "TS Techy",
      date: "Oct 2023 - Present",
      type: "Full-time",
      bullets: [
        "Built production AI pipelines integrating ML models into business workflows",
        "Implemented experiment tracking with MLflow and model evaluation metrics",
        "Developed anomaly detection systems and real-time monitoring dashboards",
        "Collaborated with engineering and delivery teams to ship client-facing systems",
        "Handled Python-based ML solutions for healthcare-tech and IoT use cases"
      ],
      skills: ["AI Pipelines", "MLflow", "Product Strategy"]
    },
    {
      role: "Head of Media and Creations",
      company: "Avantaa'24 (SKCT)",
      date: "Oct 2023 - Feb 2026",
      type: "Part-time",
      bullets: [
        "Led media and creative delivery for large-scale college technical events",
        "Coordinated design, content, and execution teams under tight timelines"
      ],
      skills: ["Project Management", "Operations"]
    },
    {
      role: "Social Media Manager",
      company: "Yummy Days with Kavitha",
      date: "2022 - Present",
      type: "Full-time",
      bullets: [
        "Managed digital presence for YouTube (160K+ subs) and Instagram (116K+ followers)",
        "Optimized uploads using SEO (titles, tags, thumbnails) to improve reach",
        "Analyzed platform analytics to implement data-driven content adjustments",
        "Coordinated brand collaborations and promotional campaigns"
      ],
      skills: ["Growth Analytics", "SEO", "Content Strategy"]
    },
    {
      role: "IoT with ML Intern",
      company: "TwirlTact Technology Solutions",
      date: "May 2025 - Jun 2025",
      type: "Internship",
      bullets: [
        "Developed real-time IoT systems integrated with predictive ML models",
        "Implemented data collection and preprocessing pipelines using microcontrollers",
        "Deployed ML workflows to edge and cloud environments using Python"
      ],
      skills: ["Edge ML", "Python", "IoT"]
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Accessibility: move focus to the section for screen readers
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-blue-500/30 font-sans tracking-tight">
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <motion.div className="h-full bg-blue-500" style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} />
      </div>

      {/* HERO SECTION */}
      <section id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505]">
        <NeuralHeroBackground />
        
        {/* Main Content Area */}
        <div className="flex-grow flex items-center relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-end">
            
            <div className="lg:col-span-7 flex flex-col items-start text-left pb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="px-4 py-1.5 mb-12 border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-none flex items-center gap-3"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-none"></span>
                <span className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase font-bold">AI Engineer & Product-Minded Builder</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-10 text-white uppercase"
              >
                Building AI<br/>
                Systems<br/>
                <span className="text-blue-500">From Prototype<br/>To Product</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-500 max-w-xl leading-relaxed mb-12 font-light"
              >
                Focused on scalable AI systems, workflow automation, and data products that bridge the gap between engineering and user experience.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <button 
                  onClick={() => scrollToSection('systems')} 
                  aria-label="View Technical Projects"
                  className="group px-8 py-5 bg-white text-black font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-4 text-xs uppercase tracking-[0.2em] rounded-none"
                >
                  Technical Projects <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  aria-label="Contact Jayasudhan"
                  className="px-8 py-5 border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-[0.2em] rounded-none"
                >
                  Contact Me
                </button>
              </motion.div>
            </div>

            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-5 hidden lg:flex flex-col items-center pb-20"
            >
              <div className="relative p-2 border border-white/10 bg-white/[0.02]">
                <div className="w-[400px] h-[500px] bg-zinc-900 overflow-hidden grayscale contrast-125">
                  <img src="images/JayasudhanM.png" alt="Jayasudhan Portrait" className="w-full h-full object-cover" />
                </div>
                <div className="mt-3 text-[10px] text-gray-500 font-mono uppercase tracking-[0.1em] text-center border-t border-white/5 pt-3">
                  AI PORTRAIT: Jayasudhan (AI Business Transformation Engineer)
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/5 bg-[#050505]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white leading-none">276K+</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-2">People Managed & Reach</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1 border border-white/10 p-1 bg-white/[0.02]">
              <button onClick={() => scrollToSection('top')} className="p-3 hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Home className="w-5 h-5" /></button>
              <button onClick={() => scrollToSection('systems')} className="p-3 hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Cpu className="w-5 h-5" /></button>
              <button onClick={() => scrollToSection('focus')} className="p-3 hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Terminal className="w-5 h-5" /></button>
              <button onClick={() => scrollToSection('contact')} className="p-3 hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Mail className="w-5 h-5" /></button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col text-right">
                <span className="text-3xl font-bold text-white leading-none">32+</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-2">AI Models Deployed</span>
              </div>
              <Sparkles className="w-8 h-8 text-white/20" />
            </div>
          </div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        
        {/* CORE COMPETENCIES */}
        <section id="focus" className="scroll-mt-32">
          <SectionHeading title="Core Competencies" subtitle="Where AI engineering meets digital marketing and creative production." />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-wrap gap-4">
              {[
                "Production AI Systems", "RAG & LLM Applications", "AI Product Strategy",
                "Digital Marketing & SEO", "Growth Analytics", "Brand & Creative Direction",
                "Workflow Automation", "MLOps & Deployment", "3D Visualization"
              ].map((tag, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-5 py-2.5 border border-white/10 bg-white/[0.02] text-gray-400 uppercase text-[10px] tracking-[0.2em] font-bold hover:border-indigo-500/50 hover:text-indigo-300 transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="border border-white/5 p-10 bg-white/[0.01] backdrop-blur-sm rounded-none">
              <h3 className="text-indigo-400 uppercase tracking-[0.3em] text-[10px] mb-6 font-mono font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-none animate-pulse"></span>
                Status: active_transformation
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Building at the intersection of AI engineering and business growth — shipping production ML pipelines, scaling digital audiences across YouTube and Instagram, and delivering creative assets that drive real engagement. Not just building AI, but transforming how businesses reach and serve people.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNICAL ECOSYSTEM */}
        <section id="tech-stack" className="scroll-mt-32">
          <SectionHeading title="Technical Ecosystem" subtitle="The production-grade stack driving AI business transformation." />
          <TechMarquee />
        </section>

        {/* CASE STUDIES */}
        <section id="systems">
          <SectionHeading title="Technical Case Studies" subtitle="Specific problems solved and technical trade-offs made." />
          <div className="space-y-16">
            {[
              {
                title: "TrialGuard Pro",
                role: "AI Engineer",
                problem: "Clinical trials face high patient dropout rates, delaying approvals and increasing costs.",
                solution: "FastAPI inference service deployed via Docker on AWS EC2 with MLflow model tracking.",
                tech: ["Python", "FastAPI", "Docker", "AWS", "MLflow"],
                metrics: "85% accuracy in 3-tier risk stratification.",
                tradeoff: "Initial hallucination rates in reporting were reduced using deterministic validation middleware.",
                link: "https://trialguard-pro.vercel.app/"
              },
              {
                title: "RAG Retrieval Pipeline",
                role: "AI Engineer",
                problem: "Dense enterprise document lakes required slow, manual keyword searches.",
                solution: "High-speed retrieval system using semantic search over 40k+ documents.",
                tech: ["LangChain", "Pinecone", "GROQ LPU", "Python"],
                metrics: "Processed 40k+ documents with sub-second semantic retrieval.",
                tradeoff: "Optimized retrieval latency by reducing embedding dimensions from 1536 to 384 with minimal precision loss.",
                link: "https://github.com/Jayasudhandesigner/RAGMODEL-using-GROQ"
              },
              {
                title: "PyGenGuard",
                role: "Lead Developer",
                problem: "LLM applications required a security layer to prevent policy violations at runtime.",
                solution: "Deterministic security framework published as a Python package acting as middleware.",
                tech: ["Python", "Middleware Architecture", "PyPI"],
                metrics: "Successfully published to PyPI; enforces runtime safety policies.",
                tradeoff: "Traded off slightly higher latency for 100% deterministic policy enforcement.",
                link: "https://pypi.org/project/pygenguard/"
              },
              {
                title: "Content Recommendation Engine",
                role: "ML Developer",
                problem: "Low engagement rates due to generic content feeds.",
                solution: "Hybrid recommendation engine combining Collaborative Filtering and TF-IDF.",
                tech: ["SVD", "TF-IDF", "Pandas", "NumPy"],
                metrics: "Recommendation quality evaluated using offline ranking metrics.",
                tradeoff: "Selected SVD over complex neural architectures for better explainability and lower compute cost.",
                link: "https://github.com/Jayasudhandesigner/Content-Recommendation-System"
              }
            ].map((study, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative flex flex-col lg:flex-row gap-8 p-1 rounded-none bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10 lg:w-1/3 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className="text-[10px] font-mono text-indigo-400 mb-6 uppercase tracking-[0.4em]">{study.role}</div>
                  <h3 className="text-4xl font-bold mb-8 tracking-tight leading-tight">{study.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {study.tech.map((t, j) => (
                      <span key={j} className="text-[9px] px-3 py-1.5 bg-white/5 border border-white/10 text-gray-500 font-mono rounded-none uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-5">
                    <a 
                      href={study.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label={`View GitHub repository for ${study.title}`}
                      className="inline-flex items-center gap-3 text-white hover:text-indigo-400 transition-colors text-[10px] font-bold tracking-[0.2em] uppercase focus:outline-none focus:text-indigo-400"
                    >
                      <Github className="w-5 h-5" /> Repository
                    </a>
                  </div>
                </div>

                <div className="relative z-10 lg:w-2/3 flex flex-col gap-10 p-8 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4 font-bold">Problem Space</h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4 font-bold">Invention</h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">{study.solution}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mt-auto">
                    <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-none">
                      <h4 className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] mb-3 font-bold">Impact</h4>
                      <p className="text-white text-sm font-medium leading-relaxed">{study.metrics}</p>
                    </div>
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-none">
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3 font-bold">Engineering Trade-offs</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-light">{study.tradeoff}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="scroll-mt-32">
          <SectionHeading title="Experience" subtitle="AI engineering, digital marketing, creative leadership — the full transformation stack." />
          <div className="relative ml-4 md:ml-12 space-y-16 pb-12">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 via-indigo-500/20 to-transparent"></div>

            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative pl-12 group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-none bg-indigo-500 border-2 border-[#050505] group-hover:scale-150 transition-transform duration-500 z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">{exp.role}</h3>
                    <div className="flex items-center gap-3 text-indigo-300/80 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                      <Briefcase className="w-3 h-3" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-gray-500 font-mono text-[10px] px-4 py-1.5 border border-white/10 bg-white/[0.02] rounded-none uppercase tracking-widest whitespace-nowrap">
                    {exp.date}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-10 max-w-4xl">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-gray-400 flex items-start gap-4 text-sm leading-relaxed">
                      <span className="text-indigo-500 mt-1.5 font-bold flex-shrink-0">/</span>
                      <span className="font-light">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {exp.skills.map((skill, j) => (
                    <span key={j} className="px-4 py-1.5 text-[9px] border border-white/5 bg-white/[0.01] text-gray-500 uppercase tracking-widest font-bold rounded-none group-hover:border-indigo-500/20 group-hover:text-gray-300 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>



        {/* CREATIVE PORTFOLIO - UPDATED UI */}
        <section id="creative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">Creative Portfolio</h2>
            <a 
              href="https://www.artstation.com/jayasudhanmuneeswaran" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-none border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 uppercase text-xs font-bold tracking-widest"
            >
              View ArtStation 
              <div className="w-8 h-8 rounded-none border border-current flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                <MoveLeft className="w-4 h-4" />
              </div>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "3D Digital Art", img: "images/3d.jpg" },
              { label: "Campaign Design", img: "images/markettingposter.png" },
              { label: "Product Visualization", img: "images/product.jpg" },
              { label: "Packaging Design", img: "images/packaging_design.png" },
            ].map((work, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden group rounded-none bg-zinc-900"
              >
                <img 
                  src={work.img} 
                  alt={work.label} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-medium uppercase tracking-widest text-sm">{work.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative py-24 border-t border-white/10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900/30 via-black to-black -z-10"></div>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 uppercase">Let's Transform.</h2>
          <p className="text-xl text-gray-400 mb-12 font-mono">Open for roles in AI Business Transformation, Product Engineering, and Digital Growth.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:jayasudhanmuneeswaran@gmail.com" className="px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto flex justify-center items-center gap-2 uppercase tracking-widest text-sm">
              <Mail className="w-5 h-5" /> Email
            </a>
            <a href="tel:9787080805" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 transition-colors w-full sm:w-auto flex justify-center items-center gap-2 uppercase tracking-widest text-sm">
              <Phone className="w-5 h-5" /> Call
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 mt-16">
            <a href="https://www.linkedin.com/in/jayasudhan-m-a0b9b2244/" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="https://github.com/Jayasudhandesigner" className="text-gray-400 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
          </div>
        </section>

      </div>

      {/* FLOATING DOCK NAVIGATION */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none z-[1000] pb-8">
        <div className="pointer-events-auto flex justify-center">
          <Dock 
            items={[
              { icon: <Home size={22} />, label: 'Home', onClick: () => scrollToSection('top') },
              { icon: <Box size={22} />, label: 'Experience', onClick: () => scrollToSection('experience') },
              { icon: <Code size={22} />, label: 'Projects', onClick: () => scrollToSection('systems') },
              { icon: <Mail size={22} />, label: 'Contact', onClick: () => scrollToSection('contact') }
            ]}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            distance={150}
          />
        </div>
      </div>
    </div>
  );
}
