import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/App.css';
import SplashCursor from './components/SplashCursor';
import StarBorder from './components/StarBorder';
import Dock from './components/Dock';
import { VscHome, VscCode, VscArchive, VscMail } from 'react-icons/vsc';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const experiences = [
  {
    title: 'Sourcing Analyst (Internship)',
    company: 'GEP Worldwide',
    date: 'Jan 2026 - Present',
    bullets: [
      'Supporting supplier identification and material sourcing activities',
      'Documenting sourcing workflows and operational requirements',
      'Assisting PMO discussions around automation opportunities',
      'Preparing sourcing data for internal tool usage and evaluation',
      'Contributing to AI-assisted procurement utility testing'
    ]
  },
  {
    title: 'AI Product Manager',
    company: 'TS Techy',
    date: 'Oct 2023 - Present',
    bullets: [
      'Built production-ready AI pipelines integrating ML models into business workflows',
      'Implemented experiment tracking, model evaluation, and deployment readiness',
      'Developed AI-driven automation, anomaly detection, and real-time dashboards',
      'Collaborated across operations and delivery teams to ship client-facing AI systems',
      'Supported healthcare-tech and IoT–ML use cases with Python solutions'
    ]
  },
  {
    title: 'Project Manager (Internship)',
    company: 'TS Techy',
    date: 'Aug 2023 - Oct 2023',
    bullets: [
      'Coordinated cross-functional teams delivering AI and tech-based projects',
      'Managed timelines, sprint planning, and delivery tracking using Agile tools',
      'Translated requirements into executable technical tasks for AI teams',
      'Identified delivery risks and improved project execution efficiency'
    ]
  },
  {
    title: 'Social Media Manager',
    company: 'Yummy Days with Kavitha',
    date: '2022 - Present',
    bullets: [
      'Manage digital presence for YouTube (160K+ subs) and Instagram (116K+ followers)',
      'Plan content strategy, posting schedules, and campaign calendars',
      'Optimize SEO (titles, tags, thumbnails) to improve channel reach',
      'Analyze data insights to track performance and implement growth strategies',
      'Coordinate brand collaborations and promotional campaigns'
    ]
  },
  {
    title: 'IoT with ML Intern',
    company: 'TwirlTact Technology Solutions',
    date: 'May 2025 - Jun 2025',
    bullets: [
      'Worked on real-time IoT systems integrated with machine learning models',
      'Implemented data collection, preprocessing, and predictive modeling workflows',
      'Supported edge and cloud-based ML pipelines using Python',
      'Contributed to prototype deployment of smart automation solutions'
    ]
  },
  {
    title: 'Head of Media & Creations',
    company: 'Avantaa\'24 (SKCT)',
    date: 'Oct 2023 - Feb 2026',
    bullets: [
      'Led media and creative delivery for large-scale technical events',
      'Coordinated design, content, and execution teams under tight timelines'
    ]
  }
];

const projects = [
  { 
    title: 'TrialGuard Pro', 
    link: 'https://trialguard-pro.vercel.app/'
  },
  { 
    title: 'PyGenGuard (PyPI)', 
    link: 'https://pypi.org/project/pygenguard/'
  },
  { 
    title: 'Enterprise RAG Intelligence', 
    link: 'https://github.com/Jayasudhandesigner/RAGMODEL-using-GROQ'
  },
  { 
    title: 'Content Recommendation System', 
    link: 'https://github.com/Jayasudhandesigner/Content-Recommendation-System'
  }
];

const techSkills = {
  col1: {
    title: 'AGENTIC AI & AGENTS',
    items: [
      { name: 'n8n / CrewAI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/n8n/n8n-original.svg' },
      { name: 'LangChain / AutoGen', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'LlamaIndex / RAG', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
      { name: 'Pinecone / Vector DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' }
    ]
  },
  col2: {
    title: 'AI INFRA & MODELS',
    items: [
      { name: 'FastAPI / Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'TensorFlow / PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
      { name: 'AWS / MLOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Hugging Face / LLMs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' }
    ]
  },
  col3: {
    title: 'DESIGN & PRODUCT',
    items: [
      { name: 'Figma / UI Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: '3D Artist / Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
      { name: 'Product Management', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg' },
      { name: 'Adobe Creative Suite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' }
    ]
  }
};

function App() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["AI Generalist", "3D Artist", "Operations Manager", "Product Manager"];

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hoveredProject) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredProject]);

  return (
    <div className="portfolio-container">
      <SplashCursor />
      
      {/* Removed Navbar */}
      <main className="content">
        
        {/* HERO SECTION */}
      <div className="hero-full-width" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', minHeight: '100vh' }}>
        <section className="hero" style={{ position: 'relative', overflow: 'hidden', padding: '0 4%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Background Image filling display */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/images/neural_hero.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }} />
          
          {/* Left Side Dark Overlay for Text Visibility */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
            zIndex: 2
          }} />

          {/* Hero Content aligned to the same max-width as the rest of the site */}
          <div style={{ 
            position: 'relative', 
            zIndex: 3, 
            width: '100%', 
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left'
          }}>
            <div className="hero-massive-text" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div>
                <h1 style={{ 
                  marginBottom: '1rem', 
                  fontSize: 'clamp(3rem, 10vw, 9rem)', 
                  whiteSpace: 'nowrap', 
                  color: '#fff',
                  lineHeight: 1,
                  textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>JAYASUDHAN</h1>
                <div className="hero-role-loop" style={{ minHeight: '1.5em', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentRoleIndex}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', 
                        fontWeight: 300, 
                        color: '#8b5cf6', 
                        textTransform: 'uppercase', 
                        letterSpacing: '8px',
                        textShadow: '0 5px 15px rgba(0,0,0,0.5)'
                      }}
                    >
                      {roles[currentRoleIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Circular Profile Photo in same line */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  width: 'min(200px, 15vw)',
                  height: 'min(200px, 15vw)',
                  borderRadius: '50%',
                  border: '4px solid #8b5cf6',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
                  zIndex: 4,
                  flexShrink: 0
                }}
              >
                <img 
                  src="/images/JayasudhanM.png" 
                  alt="Jayasudhan" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} 
                />
              </motion.div>
            </div>
          </div>
          
          {/* Trust & Bio Row (Aligned to bottom) */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            maxWidth: '1400px',
            margin: '4rem auto 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div className="hero-trust">
              <div className="trust-avatars">
                <div className="avatar" style={{backgroundColor: '#3b82f6'}}>PY</div>
                <div className="avatar" style={{backgroundColor: '#8b5cf6'}}>AI</div>
                <div className="avatar" style={{backgroundColor: '#10b981'}}>ML</div>
                <div className="avatar" style={{backgroundColor: '#f59e0b'}}>AW</div>
              </div>
              <div className="trust-text">
                <div className="stars">★★★★★</div>
                <span style={{ color: '#fff' }}>Shipped 5+ Production AI Systems</span>
              </div>
            </div>
            
            <div className="hero-desc-block">
              <p className="bio" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Versatile technologist bridging the gap between sophisticated AI systems, scalable infrastructure, and human-centric design. Focused on building high-impact digital products.
              </p>
              <StarBorder as="a" href="#projects" className="pill-btn" color="#3b82f6">
                <span className="btn-text">VIEW PORTFOLIO</span>
                <span className="arrow-circle">←</span>
              </StarBorder>
            </div>
          </div>
        </section>
      </div>

        {/* TECHNOLOGIES SECTION */}
        <section id="technologies" className="section split-section tech-section">
          <div className="split-left">
            <h2 className="section-title">MY<br/>TECHNOLOGIES</h2>
            <p style={{marginTop: '4rem', marginBottom: '2rem', maxWidth: '300px', color: '#999'}}>
              A personalized approach to every project — for the best results.
            </p>
          </div>
          <div className="split-right tech-grid">
            {Object.values(techSkills).map((col, idx) => (
              <div key={idx} className="tech-col">
                <div className="tech-col-header">
                  <span>{col.title}</span>
                  <span className="tech-col-arrow">↘</span>
                </div>
                <div className="tech-list">
                  {col.items.map((item, i) => (
                    <div key={i} className="tech-item">
                      <div className="tech-icon">
                        <img src={item.icon} alt={item.name} style={{ width: '100%', height: '100%' }} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section split-section">
          <div className="split-left">
            <h2 className="section-title">MY EXPERIENCE</h2>
          </div>
          <div className="split-right">
            <div className="timeline">
              {experiences.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-meta">
                    <span className="company">{exp.company}</span>
                    <span className="date">{exp.date}</span>
                  </div>
                  <h3>{exp.title}</h3>
                  <ul>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN SHOWCASE SECTION */}
        <section id="design" className="section split-section" style={{ display: 'block' }}>
          <div className="section-header" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 className="section-title">CREATIVE PORTFOLIO</h2>
            <StarBorder as="a" href="https://www.artstation.com/sudhanartist" target="_blank" rel="noreferrer" className="pill-btn" color="#00ffff">
              <span className="btn-text">VIEW ARTSTATION</span>
              <span className="arrow-circle">←</span>
            </StarBorder>
          </div>
          <div className="design-grid" style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2rem'
          }}>
            {[
              { src: '/images/3d.jpg', title: '3D Modeling' },
              { src: '/images/markettingposter.png', title: 'Marketing Campaign Design' },
              { src: '/images/product.jpg', title: 'Product Visualization' },
              { src: '/images/packaging_design.png', title: 'Premium Packaging Design' }
            ].map((item, idx) => (
              <div key={idx} className="design-item" style={{
                width: '100%', 
                aspectRatio: '1/1', 
                backgroundColor: '#111', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid #222',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.1)';
                e.currentTarget.querySelector('.overlay').style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.overlay').style.opacity = '0';
              }}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div className="overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section split-section">
          <div className="split-left">
            <h2 className="section-title">MY PROJECTS</h2>
          </div>
          <div className="split-right">
            <div className="projects-massive-list">
              {projects.map((proj, idx) => (
                <a 
                  key={idx} 
                  href={proj.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="project-massive-item"
                  onMouseEnter={(e) => {
                    setHoveredProject(proj);
                    setMousePos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <span className="project-arrow">→</span>
                  <span className="project-title-text">{proj.title}</span>
                </a>
              ))}
            </div>
            <div style={{marginTop: '4rem', textAlign: 'right'}}>
              <p className="projects-side-text" style={{maxWidth: '300px', marginLeft: 'auto', marginBottom: '2rem'}}>
                Unlock the countless benefits that come with working with my AI systems.
              </p>
              <StarBorder as="a" href="https://github.com/Jayasudhandesigner" target="_blank" rel="noreferrer" className="pill-btn" color="#10b981">
                <span className="btn-text">GITHUB PROFILE</span>
                <span className="arrow-circle">←</span>
              </StarBorder>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section contact-section">
          <div className="contact-header">
            <div>
              <h2 className="contact-title">WANT A SYSTEM<br/>THAT WORKS?</h2>
              <p className="contact-subtitle">We're Here — Message or Call Me.</p>
            </div>
          </div>
          
          <div className="contact-content">
            <div className="contact-info-box">
              <div className="info-group">
                <a href="mailto:jayasudhanmuneeswaran@gmail.com" style={{ fontSize: '1.4rem' }}>jayasudhanmuneeswaran@gmail.com</a>
              </div>
              <div className="info-group" style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <a href="tel:9787080805" style={{ fontSize: '1.4rem', color: '#fff', textDecoration: 'none' }}>+91 97870 80805</a>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <StarBorder as="a" href="tel:9787080805" className="talk-btn" color="#8b5cf6">
                  <span className="btn-text">CALL ME NOW</span>
                  <span className="arrow-circle">→</span>
                </StarBorder>
              </div>
              <div className="social-icons" style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <a href="https://github.com/Jayasudhandesigner" target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '1.5rem', color: '#fff' }}><FaGithub /></a>
                <a href="https://www.linkedin.com/in/jayasudhan-m-a0b9b2244/" target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '1.5rem', color: '#fff' }}><FaLinkedin /></a>
              </div>
            </div>

            <div className="contact-cta-large" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#8b5cf6' }}>AVAILABLE FOR WORK</h3>
                <p style={{ color: '#999' }}>Ready to ship your next high-impact AI system.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* MASSIVE BOTTOM TEXT */}
        <section className="bottom-massive-text">
          <h2>LET'S BUILD<br/>THE FUTURE TOGETHER</h2>
        </section>
        
      </main>

      {/* Floating Link Preview */}
      <div 
        className={`link-preview ${hoveredProject ? 'active' : ''}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      >
        {hoveredProject && (
          <>
            <div className="link-preview-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              <span>{hoveredProject.title}</span>
            </div>
            <div className="link-preview-url">
              {hoveredProject.link.replace('https://', '')}
            </div>
          </>
        )}
      </div>

      {/* FIXED BOTTOM DOCK */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 1000, paddingBottom: '1rem' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <Dock 
            items={[
              { icon: <VscHome size={22} />, label: 'Top', onClick: () => window.scrollTo(0, 0) },
              { icon: <VscArchive size={22} />, label: 'Experience', onClick: () => document.getElementById('experience').scrollIntoView() },
              { icon: <VscCode size={22} />, label: 'Projects', onClick: () => document.getElementById('projects').scrollIntoView() },
              { icon: <VscMail size={22} />, label: 'Contact', onClick: () => document.getElementById('contact').scrollIntoView() }
            ]}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
