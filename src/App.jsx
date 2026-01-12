import { useState, useEffect, useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import HeroSection from './components/HeroSection'
import SkillsSection from './components/SkillsSection'
import AchievementsSection from './components/AchievementsSection'
import FishSection from './components/FishSection'
import ModelsSection from './components/ModelsSection'
import ProjectsSection from './components/ProjectsSection'
import ResumeSection from './components/ResumeSection'
import { SoundProvider, MuteButton, useSound } from './components/SoundManager'
import GlobalPreloader from './components/GlobalPreloader'
import StaggeredMenu from './components/StaggeredMenu'
import TargetCursor from './components/TargetCursor'

// Inner App component that uses sound context
function AppContent() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  const { playHover, playClick, playTransition, playMouseWind } = useSound()

  const sections = ['Home', 'Skills', 'Achievements', 'Fish', 'Models', 'Projects', 'Resume']
  const totalSections = sections.length

  // Handle section change with new Ripple Transition logic
  const changeSection = useCallback((newSection) => {
    if (newSection === currentSection || isTransitioning) return

    setIsTransitioning(true)
    playTransition()

    // Simple fade of content synchronized with Ripple Overlay
    const sectionWrapper = document.querySelector('.section-wrapper')
    if (sectionWrapper) {
      gsap.to(sectionWrapper, {
        opacity: 0,
        y: newSection > currentSection ? -50 : 50, // More movement
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentSection(newSection)
          gsap.fromTo(sectionWrapper,
            { opacity: 0, y: newSection > currentSection ? 50 : -50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.2, // Wait for ripple to cover
              onComplete: () => setIsTransitioning(false)
            }
          )
        }
      })
    } else {
      setCurrentSection(newSection)
      setIsTransitioning(false)
    }
  }, [currentSection, isTransitioning, playTransition])



  // Touch/Swipe support for mobile
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0
    const minSwipeDistance = 50

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isTransitioning) return

      touchEndY = e.changedTouches[0].clientY
      const swipeDistance = touchStartY - touchEndY

      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped up - go to next section
          changeSection((currentSection + 1) % totalSections)
        } else {
          // Swiped down - go to previous section
          changeSection((currentSection - 1 + totalSections) % totalSections)
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [totalSections, currentSection, changeSection, isTransitioning])

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

  // Prepare menu items for StaggeredMenu
  const menuItems = sections.map((label, index) => ({
    label: label,
    link: `#${label.toLowerCase()} `,
    index: index // Store index for click handler
  }));

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/Jayasudhan-1050' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/jayasudhan-s/' },
    { label: 'Twitter', link: 'https://twitter.com/jayasudhan_' }
  ];

  return (
    <>
      <StaggeredMenu
        isFixed={true}
        items={menuItems}
        socialItems={socialItems}
        onItemClick={(item) => changeSection(item.index)}
      />

      <TargetCursor
        targetSelector="button, a, .nav-btn, .indicator-dot, .project-card, .skill-card, [role='button'], .sm-panel-item"
        spinDuration={2.7}
        hideDefaultCursor={true}
        hoverDuration={0.65}
        parallaxOn={false}
      />

      {/* Section Indicator */}
      <div className="section-indicator">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`indicator - dot ${currentSection === index ? 'active' : ''} `}
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
        {currentSection === 1 && <SkillsSection />}
        {currentSection === 2 && <AchievementsSection />}
        {currentSection === 3 && <FishSection />}
        {currentSection === 4 && <ModelsSection />}
        {currentSection === 5 && <ProjectsSection />}
        {currentSection === 6 && <ResumeSection />}
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
