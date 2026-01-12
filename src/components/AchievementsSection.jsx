import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, Sky, Cloud, Text, Float } from '@react-three/drei' // Added Text, Float
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { AutoSmoke } from './AutoSmoke' // Import new component

// Achievement data
const achievements = [
    { id: 1, title: "MLOps Platform", category: "Project", icon: "🚀", color: "#ffd700" },
    { id: 2, title: "GenAI Security", category: "Innovation", icon: "🛡️", color: "#ff4500" },
    { id: 3, title: "Oracle Cloud Certified", category: "Certification", icon: "☁️", color: "#4682b4" },
    { id: 4, title: "Kafka Certified", category: "Certification", icon: "📜", color: "#32cd32" },
    { id: 5, title: "IIT Ropar Minor", category: "Education", icon: "🎓", color: "#8a2be2" },
    { id: 6, title: "Hackathon Champion", category: "Award", icon: "🥇", color: "#f59e0b" }
]

// Auto Model orbiting on ring path
function OrbitingAuto({ angleRef, isMovingRef, carRef }) {
    const { scene } = useGLTF('/models/auto.glb')
    const orientRef = useRef()
    const posRef = useRef()
    const pitchGroupRef = useRef()
    const timeRef = useRef(0)
    const ampRef = useRef(0)
    const { camera } = useThree()

    // Sync external ref with internal specialized ref
    useEffect(() => {
        if (carRef && pitchGroupRef.current) {
            carRef.current = pitchGroupRef.current
        }
    }, [carRef])

    const offsetRadius = 5.2
    const basePathY = -1.5

    useFrame((state, delta) => {
        const angle = angleRef.current
        const isMoving = isMovingRef.current

        // Calculate position based on current REF angle
        const cubeX = Math.cos(angle) * offsetRadius
        const cubeZ = Math.sin(angle) * offsetRadius

        // Only advance time if moving
        if (isMoving) {
            timeRef.current += delta * 5
        }

        // Lerp amplitude
        const targetAmp = isMoving ? 1 : 0
        ampRef.current = THREE.MathUtils.lerp(ampRef.current, targetAmp, delta * 2)

        // Smooth Sine Wave Shifted
        const sineVal = Math.sin(timeRef.current)
        const shiftedWave = (sineVal * 1.5) - 0.5

        const yOffset = shiftedWave * ampRef.current
        const currentY = basePathY + yOffset

        if (posRef.current) {
            posRef.current.position.set(cubeX, currentY, cubeZ) // Update full position here
        }

        // Pitch and Roll
        const basePitchDeg = Math.cos(timeRef.current) * 30
        const noisePitch = (Math.sin(timeRef.current * 8.5) * 0.5 + Math.cos(timeRef.current * 3.2) * 0.5) * 2
        const noiseRoll = (Math.sin(timeRef.current * 4.2) * 0.5 + Math.cos(timeRef.current * 6.7) * 0.5) * 3

        const totalPitch = (basePitchDeg + noisePitch) * ampRef.current
        const totalRoll = noiseRoll * ampRef.current

        if (pitchGroupRef.current) {
            pitchGroupRef.current.rotation.x = THREE.MathUtils.degToRad(totalPitch)
            pitchGroupRef.current.rotation.z = THREE.MathUtils.degToRad(totalRoll)
        }

        // Camera Follow
        const cameraDistance = 6
        const cameraHeight = 1.5
        const cameraRadius = offsetRadius + cameraDistance
        const camX = Math.cos(angle) * cameraRadius
        const camZ = Math.sin(angle) * cameraRadius
        const camY = currentY + cameraHeight

        camera.position.set(camX, camY, camZ)
        camera.lookAt(cubeX, currentY, cubeZ)

        // Orientation
        if (orientRef.current) {
            orientRef.current.lookAt(
                Math.cos(angle + 0.1) * offsetRadius,
                currentY,
                Math.sin(angle + 0.1) * offsetRadius
            )
        }
    })

    return (
        <group ref={posRef}>
            <group ref={orientRef}>
                <group ref={pitchGroupRef}>
                    <primitive
                        object={scene}
                        scale={1.6}
                        rotation={[0, Math.PI / 2, 0]}
                    />
                </group>
            </group>
        </group>
    )
}

function AnimationController({ angleRef, isMovingRef, setSelectedIndex, keysPressed }) {
    useFrame(() => {
        const speed = 0.025
        let moving = false

        if (keysPressed.current.left) {
            angleRef.current += speed
            moving = true
        }
        if (keysPressed.current.right) {
            angleRef.current -= speed
            moving = true
        }

        // isMovingRef updated by Scroll logic externally or keys here
        // If keys are active, override scroll moving state?
        // Let's OR them: isMoving is true if keys OR scroll.
        // But scroll sets it to true, we need to decay it?
        // Helper: if keys moving, set true. If not keys, wait for scroll timeout (handled in component).
        if (moving) isMovingRef.current = true

        // Sync UI
        const normalizedAngle = ((angleRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const index = Math.floor((normalizedAngle / (Math.PI * 2)) * achievements.length) % achievements.length
        setSelectedIndex(index)
    })
    return null
}

// ... VinayagModel, CircularPath unchanged ...

// Main 3D Scene
function Scene({ angleRef, isMovingRef, selectedAchievement, keysPressed, setSelectedIndex }) {
    const carRef = useRef()

    return (
        <>
            <AnimationController
                angleRef={angleRef}
                isMovingRef={isMovingRef}
                setSelectedIndex={setSelectedIndex}
                keysPressed={keysPressed}
            />

            {/* Blue Sky and Mist Environment */}
            <color attach="background" args={['#87CEEB']} />
            <fog attach="fog" args={['#87CEEB', 8, 35]} />

            {/* Mist Clouds */}
            <Cloud position={[0, -5, 0]} opacity={0.3} speed={0.2} width={20} depth={5} segments={10} color="#ffffff" />
            <Cloud position={[0, 5, -10]} opacity={0.3} speed={0.2} width={20} depth={5} segments={10} color="#ffffff" />

            {/* STRONG Lighting */}
            <ambientLight intensity={1.5} />
            <spotLight
                position={[0, 15, 10]}
                angle={0.5}
                penumbra={0.5}
                intensity={12}
                castShadow
                shadow-bias={-0.0001}
                color="#ffaa00"
            />
            <pointLight position={[10, 5, 10]} intensity={2} color="#f59e0b" />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#8a2be2" />
            <pointLight position={[0, -5, 5]} intensity={3} color="#ffffff" />

            <VinayagModel />

            {/* Floating 3D Title */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0.2, 0.5]}>
                <Text
                    fontSize={1.2}
                    maxWidth={5}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign="center"
                    position={[0, 5, 0]}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.04}
                    outlineColor="#000000"
                >
                    {achievements[selectedAchievement].title.toUpperCase()}
                </Text>
                <Text
                    fontSize={0.4}
                    position={[0, 4.2, 0]}
                    color={achievements[selectedAchievement].color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {achievements[selectedAchievement].category}
                </Text>
            </Float>

            <CircularPath />

            <OrbitingAuto
                angleRef={angleRef}
                isMovingRef={isMovingRef}
                carRef={carRef}
            />

            <AutoSmoke isMovingRef={isMovingRef} target={carRef} /> {/* AutoSmoke reads ref itself? No, AutoSmoke props. */}
            {/* AutoSmoke needs to know isMoving. Pass Ref? Or pass boolean? */}
            {/* AutoSmoke checks `if (isMoving && ...)` in useFrame. passing `isMovingRef.current` passes value AT RENDER time. */}
            {/* We need to pass the REF to AutoSmoke or update AutoSmoke to accept ref. */}
            {/* I will update AutoSmoke inline here by passing `isMovingRef`. */}
            {/* Wait, AutoSmoke expects `isMoving` boolean. */}
            {/* I should update AutoSmoke to accept `isMovingRef`. */}
            {/* OR: I'll hack it: AutoSmoke uses `useFrame`. */}
            {/* I'll pass `isMovingRef` as prop `isMovingRef` to AutoSmoke? */}
            {/* I'll update AutoSmoke usage: `<AutoSmoke isMovingRef={isMovingRef} target={carRef} />` */}
            {/* And I need to update AutoSmoke.jsx later to use the ref. */}
            {/* Check Step 708: AutoSmoke file was not edited. */}
            {/* I'll temporarily pass the ref as `movingRef` and update AutoSmoke in next step. */}

            <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    )
}

// Main Component
export default function AchievementsSection() {
    const angleRef = useRef(0)
    const isMovingRef = useRef(false)
    const keysPressed = useRef({ left: false, right: false })
    const [selectedAchievement, setSelectedAchievement] = useState(0)
    const scrollTimeout = useRef(null)

    // Handle keyboard input via Refs to avoid re-renders
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') keysPressed.current.left = true
            else if (e.key === 'ArrowRight') keysPressed.current.right = true
        }
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') {
                keysPressed.current.left = false
                isMovingRef.current = false
            } else if (e.key === 'ArrowRight') {
                keysPressed.current.right = false
                isMovingRef.current = false
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const handleMiddleWheel = (e) => {
        e.stopPropagation()
        // e.preventDefault() // React Synthetic event might not support all preventing?
        // IMPORTANT: To prevent default browser scroll, this handler might need to be non-passive.
        // React's onWheel is passive. 
        // We might need a native ref listener on the div.

        const speed = 0.005
        angleRef.current += e.deltaY * speed
        isMovingRef.current = true

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        scrollTimeout.current = setTimeout(() => {
            isMovingRef.current = false
        }, 100)
    }

    // Ref for the middle zone to attach non-passive listener
    const middleZoneRef = useRef(null)

    useEffect(() => {
        const el = middleZoneRef.current
        if (el) {
            const onWheel = (e) => {
                e.preventDefault()
                e.stopPropagation()
                const speed = 0.005
                angleRef.current += e.deltaY * speed
                isMovingRef.current = true // Direct ref update

                if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
                scrollTimeout.current = setTimeout(() => {
                    isMovingRef.current = false
                }, 100)
            }
            // Add non-passive listener
            el.addEventListener('wheel', onWheel, { passive: false })
            return () => el.removeEventListener('wheel', onWheel)
        }
    }, [])

    const currentAchievement = achievements[selectedAchievement]

    return (
        <div className="achievements-3d-section" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            {/* Scroll Zones Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '30vh', width: '100%', pointerEvents: 'none' }} /> {/* Top Zone: Scroll Through */}
                <div ref={middleZoneRef} style={{ height: '40vh', width: '100%', cursor: 'ew-resize' }} /> {/* Middle Zone: Intercept Scroll */}
                <div style={{ height: '30vh', width: '100%', pointerEvents: 'none' }} /> {/* Bottom Zone: Scroll Through */}
            </div>

            {/* 3D Canvas */}
            <div className="achievements-canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <Canvas
                    camera={{ position: [0, 2, 12], fov: 50 }}
                    style={{ background: 'transparent' }}
                >
                    <Scene
                        angleRef={angleRef}
                        isMovingRef={isMovingRef}
                        selectedAchievement={selectedAchievement}
                        keysPressed={keysPressed}
                        setSelectedIndex={setSelectedAchievement}
                    />
                </Canvas>
            </div>


            {/* UI Overlay */}
            <div className="achievements-3d-header">
                <h2>✨ Achievements</h2>
                <p>Use ← → arrow keys to orbit</p>
            </div>

            {/* Current Achievement Info */}
            <div className="achievement-info-panel" style={{ '--accent-color': currentAchievement.color }}>
                <span className="achievement-info-icon">{currentAchievement.icon}</span>
                <h3>{currentAchievement.title}</h3>
                <span className="achievement-info-category">{currentAchievement.category}</span>
            </div>

            {/* Navigation Hint */}
            <div className="achievement-nav-hint">
                <div className={`arrow-key left ${keysPressed.left ? 'active' : ''}`}>←</div>
                <span>Navigate</span>
                <div className={`arrow-key right ${keysPressed.right ? 'active' : ''}`}>→</div>
            </div>

            {/* Progress Indicator */}
            <div className="achievement-progress">
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className={`progress-dot ${index === selectedAchievement ? 'active' : ''}`}
                        style={{
                            backgroundColor: index === selectedAchievement
                                ? achievement.color
                                : 'rgba(255,255,255,0.2)'
                        }}
                    />
                ))}
            </div>
        </div>
    )
}


useGLTF.preload('/models/vinayag.glb')
useGLTF.preload('/models/auto.glb')
