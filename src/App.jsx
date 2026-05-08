import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Network, Code2, Database, Workflow, Bot, BarChart3, Cloud, Layers, Cpu, Shield, 
  ArrowRight, Search, Zap, CheckCircle2, Terminal, Monitor, LayoutDashboard, BrainCircuit,
  Mail, Phone, FileText, Linkedin, Github, FileCode2, BookOpen, PenTool, Image, Video,
  Briefcase, ExternalLink, Home, Box, Code, MoveLeft
} from 'lucide-react';
import './styles/App.css';
import Dock from './components/Dock';

// Reusable Components
const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-16 md:mb-24 border-l-4 border-blue-500 pl-6">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-light tracking-tight mb-4 uppercase tracking-widest"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-gray-400 font-light max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-zinc-950 to-black"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-30"></div>
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
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-blue-500/30 font-sans">
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <motion.div className="h-full bg-blue-500" style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} />
      </div>

      {/* HERO SECTION */}
      <section id="top" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-sm mb-8 uppercase tracking-widest font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              AI Engineer & Product-Minded Builder
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 uppercase"
            >
              Building AI Systems <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">from Prototype to Product</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed mb-10"
            >
              Focused on scalable AI systems, workflow automation, and data products that bridge the gap between engineering and user experience.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button onClick={() => scrollToSection('systems')} className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 uppercase tracking-wider text-sm">
                Technical Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-wider text-sm">
                Contact
              </button>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative w-full aspect-square border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden flex items-center justify-center group shadow-[0_0_50px_rgba(59,130,246,0.1)] hover:border-blue-500/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img src="images/JayasudhanM.png" alt="Profile" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          </div>
        </div>

        {/* METRICS STRIP */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Shipped Systems", value: "5+" },
              { label: "Managed Reach", value: "276K+" },
              { label: "Latency Optimization", value: "Sub-second" },
              { label: "Focus", value: "RAG & MLOps" }
            ].map((metric, i) => (
              <div key={i} className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-3xl font-medium text-white">{metric.value}</span>
                <span className="text-xs text-blue-400 uppercase tracking-widest mt-1">{metric.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        
        {/* CURRENT FOCUS */}
        <section id="focus">
          <SectionHeading title="Core Competencies" subtitle="Technical focus areas in applied AI and data engineering." />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-wrap gap-3">
              {[
                "Production AI Systems", "RAG & LLM Applications", "AI Product Strategy",
                "Workflow Automation", "MLOps & Deployment", "Analytics Systems"
              ].map((tag, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 border border-blue-500/30 bg-blue-500/5 text-blue-200 uppercase text-xs tracking-wider font-semibold"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="border border-white/5 p-8 bg-zinc-950">
              <h3 className="text-blue-400 uppercase tracking-widest text-sm mb-4 font-mono">Status: active_development</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Currently building high-throughput retrieval pipelines and refining deterministic security layers for GenAI applications. Focusing on reducing hallucination rates and optimizing inference costs.
              </p>
            </div>
          </div>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col lg:flex-row gap-8 p-10 bg-zinc-950 border border-white/5 hover:border-blue-500/50 transition-colors"
              >
                <div className="lg:w-1/3">
                  <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest">{study.role}</div>
                  <h3 className="text-3xl font-medium mb-6 uppercase">{study.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tech.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-1 bg-white/5 border border-white/10 text-gray-300 font-mono">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href={study.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors uppercase text-sm font-semibold tracking-wider">
                      <Github className="w-4 h-4" /> Repository
                    </a>
                    <a href={study.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest">
                      <ExternalLink className="w-3 h-3" /> Live Demo
                    </a>
                  </div>
                </div>
                <div className="lg:w-2/3 flex flex-col gap-6">
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Problem</h4>
                    <p className="text-gray-300 leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Implementation</h4>
                    <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-500/5 border border-blue-500/20">
                      <h4 className="text-xs text-blue-400 uppercase tracking-widest mb-2">Metrics</h4>
                      <p className="text-white font-medium">{study.metrics}</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10">
                      <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Trade-offs</h4>
                      <p className="text-gray-300 text-sm">{study.tradeoff}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience">
          <SectionHeading title="Experience" subtitle="Professional history focusing on AI operations and product engineering." />
          <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 pb-8">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-blue-500 border-4 border-black"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <h3 className="text-2xl font-medium uppercase tracking-wide">{exp.role}</h3>
                  <div className="text-cyan-400 font-mono text-sm px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 w-fit">
                    {exp.date}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 mb-6 font-mono text-sm uppercase">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-semibold text-blue-300">{exp.company}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-gray-300 flex items-start gap-3">
                      <span className="text-blue-500 mt-1.5 font-mono">▹</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, j) => (
                    <span key={j} className="px-3 py-1 text-xs border border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research">
          <SectionHeading title="Research Interests" subtitle="Exploring applied artificial intelligence in healthcare and multi-agent workflows." />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Healthcare AI", topic: "Clinical Risk Stratification Models" },
              { title: "Edge Computing", topic: "IoT + Edge Computing AI" },
              { title: "Multi-Agent Systems", topic: "Orchestration and Deterministic Guardrails" },
              { title: "RAG Architectures", topic: "Vector Retrieval Optimization" }
            ].map((pub, i) => (
              <div key={i} className="flex gap-4 p-6 bg-zinc-950 border border-white/5 hover:border-white/20 transition-colors">
                <div className="mt-1"><BookOpen className="text-blue-400 w-6 h-6" /></div>
                <div>
                  <h3 className="text-xl font-medium mb-1 uppercase tracking-wide">{pub.title}</h3>
                  <p className="text-gray-400 font-mono text-sm">{pub.topic}</p>
                </div>
              </div>
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
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-500 uppercase text-xs font-bold tracking-widest"
            >
              View ArtStation 
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
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
                className="relative aspect-square overflow-hidden group rounded-[2rem] bg-zinc-900"
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
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 uppercase">Let's Build.</h2>
          <p className="text-xl text-gray-400 mb-12 font-mono">Open for roles in AI Engineering, Product Management, and MLOps.</p>
          
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
