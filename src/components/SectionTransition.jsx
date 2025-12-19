import { useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'react'
import { gsap } from 'gsap'

// Optimized Section Transition Component
const SectionTransition = forwardRef(({ children }, ref) => {
    const overlayRef = useRef(null)
    const wipeRef = useRef(null)
    const glowRef = useRef(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Memoize timeline configuration for performance
    const easeConfig = useMemo(() => ({
        in: 'power2.out',
        out: 'power2.in',
        smooth: 'power3.inOut'
    }), [])

    // Expose transition method to parent
    useImperativeHandle(ref, () => ({
        triggerTransition: (direction = 'down') => {
            return new Promise((resolve) => {
                if (isTransitioning) {
                    resolve()
                    return
                }
                setIsTransitioning(true)
                playTransition(direction, () => {
                    setIsTransitioning(false)
                    resolve()
                })
            })
        }
    }))

    const playTransition = (direction, onComplete) => {
        const overlay = overlayRef.current
        const wipe = wipeRef.current
        const glow = glowRef.current

        if (!overlay || !wipe || !glow) {
            onComplete?.()
            return
        }

        // Kill any existing animations
        gsap.killTweensOf([overlay, wipe, glow])

        const tl = gsap.timeline({
            onComplete,
            defaults: {
                ease: easeConfig.smooth
            }
        })

        // Direction-based values
        const yStart = direction === 'down' ? '-100%' : '100%'
        const yEnd = direction === 'down' ? '100%' : '-100%'
        const scaleStart = direction === 'down' ? 0.8 : 1.2

        // Set initial states
        tl.set(overlay, {
            display: 'block',
            opacity: 1,
            willChange: 'opacity'
        })
            .set(wipe, {
                y: yStart,
                scaleY: scaleStart,
                willChange: 'transform'
            })
            .set(glow, {
                opacity: 0,
                scale: 0.5,
                willChange: 'transform, opacity'
            })

            // Phase 1: Wipe slides in with glow
            .to(wipe, {
                y: '0%',
                scaleY: 1,
                duration: 0.35,
                ease: 'power4.out'
            })
            .to(glow, {
                opacity: 1,
                scale: 1.2,
                duration: 0.25,
                ease: easeConfig.in
            }, '<0.1')

            // Phase 2: Brief hold
            .to({}, { duration: 0.08 })

            // Phase 3: Wipe slides out
            .to(glow, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                ease: easeConfig.out
            })
            .to(wipe, {
                y: yEnd,
                scaleY: scaleStart,
                duration: 0.35,
                ease: 'power4.in'
            }, '<')
            .to(overlay, {
                opacity: 0,
                duration: 0.15,
                ease: easeConfig.out
            }, '-=0.1')

            // Cleanup
            .set(overlay, { display: 'none', willChange: 'auto' })
            .set(wipe, { willChange: 'auto' })
            .set(glow, { willChange: 'auto' })
    }

    return (
        <>
            {children}

            {/* Optimized Transition Overlay */}
            <div
                ref={overlayRef}
                className="transition-overlay"
                style={{ display: 'none' }}
            >
                {/* Single wipe layer with gradient */}
                <div ref={wipeRef} className="transition-wipe">
                    {/* Scanlines effect - CSS only */}
                    <div className="scanlines"></div>
                </div>

                {/* Center glow */}
                <div ref={glowRef} className="transition-glow-center"></div>

                {/* Chromatic edges - lightweight */}
                <div className="chromatic-edge chromatic-left"></div>
                <div className="chromatic-edge chromatic-right"></div>
            </div>
        </>
    )
})

SectionTransition.displayName = 'SectionTransition'

export default SectionTransition
