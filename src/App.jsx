import { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import SkillsSection from './components/SkillsSection'
import ModelsSection from './components/ModelsSection'
import ProjectsSection from './components/ProjectsSection'
import ResumeSection from './components/ResumeSection'

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [cursorClass, setCursorClass] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const sections = ['Home', 'Skills', 'Models', 'Projects', 'Resume']
  const totalSections = sections.length

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let accDelta = 0
    const handleWheel = (e) => {
      e.preventDefault()
      accDelta += e.deltaY

      if (Math.abs(accDelta) >= 50) {
        if (accDelta > 0) {
          setCurrentSection((prev) => (prev + 1) % totalSections)
        } else {
          setCurrentSection((prev) => (prev - 1 + totalSections) % totalSections)
        }
        accDelta = 0
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [totalSections])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setCurrentSection((prev) => (prev + 1) % totalSections)
      } else if (e.key === 'ArrowUp') {
        setCurrentSection((prev) => (prev - 1 + totalSections) % totalSections)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalSections])

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${cursorClass}`}
        style={{
          left: `${mousePos.x - 10}px`,
          top: `${mousePos.y - 10}px`,
        }}
      />

      {/* Navigation */}
      <nav className="main-nav">
        <button className="nav-btn" onClick={() => setCurrentSection(0)}>Home</button>
        <button className="nav-btn" onClick={() => setCurrentSection(1)}>Skills</button>
        <button className="nav-btn" onClick={() => setCurrentSection(3)}>Projects</button>
        <button className="nav-btn" onClick={() => setCurrentSection(4)}>Resume</button>
      </nav>

      {/* Section Indicator */}
      <div className="section-indicator">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`indicator-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </div>

      {/* Section Counter */}
      <div className="section-counter">
        {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
      </div>

      {/* Sections */}
      {currentSection === 0 && <HeroSection />}
      {currentSection === 1 && <SkillsSection setCursorClass={setCursorClass} />}
      {currentSection === 2 && <ModelsSection />}
      {currentSection === 3 && <ProjectsSection />}
      {currentSection === 4 && <ResumeSection />}
    </>
  )
}
