import { useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import HeroSection from './components/HeroSection'
import SkillsSection from './components/SkillsSection'
import ModelsSection from './components/ModelsSection'
import ProjectsSection from './components/ProjectsSection'
import ResumeSection from './components/ResumeSection'
import { SoundProvider, MuteButton, useSound } from './components/SoundManager'
import GlobalPreloader from './components/GlobalPreloader'

// Inner App component that uses sound context
function AppContent() {
  const [currentSection, setCurrentSection] = useState(0)
  const [cursorClass, setCursorClass] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { playHover, playClick, playScroll, playTransition } = useSound()

  const sections = ['Home', 'Skills', 'Models', 'Projects', 'Resume']
  const totalSections = sections.length

  // Handle section change with simple GSAP animation
  const changeSection = useCallback((newSection) => {
    if (newSection === currentSection || isTransitioning) return

    setIsTransitioning(true)
    playTransition()
    playScroll()

    // Simple fade transition using GSAP
    const sectionWrapper = document.querySelector('.section-wrapper')
    if (sectionWrapper) {
      gsap.to(sectionWrapper, {
        opacity: 0,
        y: newSection > currentSection ? -20 : 20,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentSection(newSection)
          gsap.fromTo(sectionWrapper,
            { opacity: 0, y: newSection > currentSection ? 20 : -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => setIsTransitioning(false)
            }
          )
        }
      })
    } else {
      setCurrentSection(newSection)
      setIsTransitioning(false)
    }
  }, [currentSection, isTransitioning, playTransition, playScroll])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let accDelta = 0
    let scrollTimeout = null

    const handleWheel = (e) => {
      if (isTransitioning) return

      e.preventDefault()
      accDelta += e.deltaY

      // Reset accumulated delta after a pause
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => { accDelta = 0 }, 150)

      if (Math.abs(accDelta) >= 60) {
        if (accDelta > 0) {
          changeSection((currentSection + 1) % totalSections)
        } else if (accDelta < 0) {
          changeSection((currentSection - 1 + totalSections) % totalSections)
        }
        accDelta = 0
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [totalSections, currentSection, changeSection, isTransitioning])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return

      if (e.key === 'ArrowDown') {
        changeSection((currentSection + 1) % totalSections)
      } else if (e.key === 'ArrowUp') {
        changeSection((currentSection - 1 + totalSections) % totalSections)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalSections, currentSection, changeSection, isTransitioning])

  // Add hover sound to interactive elements
  useEffect(() => {
    const interactiveElements = document.querySelectorAll(
      'button, a, .nav-btn, .indicator-dot, .project-card, .skill-card, [role="button"]'
    )

    const handleHover = () => playHover()
    const handleClick = () => playClick()

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('click', handleClick)
    })

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('click', handleClick)
      })
    }
  }, [currentSection, playHover, playClick])

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
        <button
          className="nav-btn"
          onClick={() => changeSection(0)}
          onMouseEnter={playHover}
        >
          Home
        </button>
        <button
          className="nav-btn"
          onClick={() => changeSection(1)}
          onMouseEnter={playHover}
        >
          Skills
        </button>
        <button
          className="nav-btn"
          onClick={() => changeSection(3)}
          onMouseEnter={playHover}
        >
          Projects
        </button>
        <button
          className="nav-btn"
          onClick={() => changeSection(4)}
          onMouseEnter={playHover}
        >
          Resume
        </button>
      </nav>

      {/* Section Indicator */}
      <div className="section-indicator">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`indicator-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => changeSection(index)}
            onMouseEnter={playHover}
          />
        ))}
      </div>

      {/* Mute Button */}
      <MuteButton />

      {/* Sections */}
      <div className="section-wrapper">
        {currentSection === 0 && <HeroSection />}
        {currentSection === 1 && <SkillsSection setCursorClass={setCursorClass} />}
        {currentSection === 2 && <ModelsSection />}
        {currentSection === 3 && <ProjectsSection />}
        {currentSection === 4 && <ResumeSection />}
      </div>
    </>
  )
}

// Main App with SoundProvider wrapper and GlobalPreloader
export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <SoundProvider>
      {isLoading && <GlobalPreloader onLoadComplete={handleLoadComplete} />}
      {!isLoading && <AppContent />}
    </SoundProvider>
  )
}
