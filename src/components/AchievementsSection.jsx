import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, Stars } from '@react-three/drei' // Removed Trail
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
function OrbitingAuto({ angle, isMoving, carRef }) {
    const { scene } = useGLTF('/models/auto.glb')
    const orientRef = useRef() // Ref for the group that handles orientation (Heading/Yaw)
    const posRef = useRef()    // Ref for the group that handles position (Y animation)
    const pitchGroupRef = useRef() // Ref for pitch rotation (X-axis)
    const timeRef = useRef(0)
    const ampRef = useRef(0)
    const pitchValRef = useRef(0) // Track linear pitch value for lerping
    const { camera } = useThree()

    // Sync external ref with internal specialized ref
    useEffect(() => {
        if (carRef && pitchGroupRef.current) {
            carRef.current = pitchGroupRef.current
        }
    }, [carRef])

    // Simplified ring parameters matching CircularPath
    const offsetRadius = 5.2
    const basePathY = -1.5 // Base Y position for the orbit

    // Position on circular path (X and Z are handled by React props, Y is animated)
    const cubeX = Math.cos(angle) * offsetRadius
    const cubeZ = Math.sin(angle) * offsetRadius

    // Animate Y axis: 0 -> 2 -> 0 -> -2 -> 0 loop relative to base
    useFrame((state, delta) => {
        // Only advance time if moving
        if (isMoving) {
            timeRef.current += delta * 5 // Speed factor for oscillation
        }

        // Lerp amplitude based on isMoving state
        const targetAmp = isMoving ? 1 : 0 // Target normalized amplitude
        ampRef.current = THREE.MathUtils.lerp(ampRef.current, targetAmp, delta * 2)

        // Smooth Sine Wave Shifted
        const sineVal = Math.sin(timeRef.current)
        const shiftedWave = (sineVal * 1.5) - 0.5

        const yOffset = shiftedWave * ampRef.current
        const currentY = basePathY + yOffset

        if (posRef.current) {
            posRef.current.position.setY(currentY)
        }

        // PHYSICAL TILT CALCULATION (Slope based)
        // Base Pitch from derivative of motion
        const basePitchDeg = Math.cos(timeRef.current) * 30

        // RANDOM SUSPENSION NOISE (Simulate realism)
        // Use non-harmonic frequencies to simulate randomness
        const t = timeRef.current
        const noisePitch = (Math.sin(t * 8.5) * 0.5 + Math.cos(t * 3.2) * 0.5) * 2 // slight X jitter
        const noiseRoll = (Math.sin(t * 4.2) * 0.5 + Math.cos(t * 6.7) * 0.5) * 3  // slight Z wobble (Roll)

        // Combine base slope + noise, scale by amplitude (motion intensity)
        const totalPitch = (basePitchDeg + noisePitch) * ampRef.current
        const totalRoll = noiseRoll * ampRef.current

        // Apply rotations
        if (pitchGroupRef.current) {
            // Apply Pitch (X-axis)
            pitchGroupRef.current.rotation.x = THREE.MathUtils.degToRad(totalPitch)
            // Apply Roll (Z-axis) - simulates uneven terrain/suspension
            pitchGroupRef.current.rotation.z = THREE.MathUtils.degToRad(totalRoll)
        }

        // Update camera to follow
        const cameraDistance = 6
        const cameraHeight = 1.5
        const cameraRadius = offsetRadius + cameraDistance

        const camX = Math.cos(angle) * cameraRadius
        const camZ = Math.sin(angle) * cameraRadius
        const camY = currentY + cameraHeight // Camera follows the car's animated height

        camera.position.set(camX, camY, camZ)
        camera.lookAt(cubeX, currentY, cubeZ) // Camera looks at the car's current position

        // Ensure auto faces the direction of travel (tangent)
        if (orientRef.current) {
            // Look at next point in orbit (in world coordinates)
            // The target Y is the currentY of the car to keep it level with its path
            orientRef.current.lookAt(
                Math.cos(angle + 0.1) * offsetRadius,
                currentY,
                Math.sin(angle + 0.1) * offsetRadius
            )
        }
    })

    return (
        // Outer group for position, X and Z are set by props, Y is animated in useFrame
        <group ref={posRef} position={[cubeX, basePathY, cubeZ]}>
            {/* Inner group for orientation, lookAt is applied here */}
            <group ref={orientRef}>
                {/* Inner group for Pitch (X-axis rotation) */}
                <group ref={pitchGroupRef}>
                    <primitive
                        object={scene}
                        scale={1.6} // Scaled down by x0.8 (2 * 0.8 = 1.6)
                        rotation={[0, Math.PI / 2, 0]} // Rotate the model itself to face "left" relative to its forward direction
                    />
                </group>
            </group>
        </group>
    )
}

// Vinayag Model at center
function VinayagModel() {
    const { scene } = useGLTF('/models/vinayag.glb')
    // Enable shadows for the model
    scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })
    return (
        <primitive
            object={scene}
            scale={8}
            position={[0, -3.5, 0]} // Brought down by 1 (was -2.5)
            rotation={[0, 0, 0]}
        />
    )
}

// CircularPath (unchanged)
function CircularPath() {
    const points = useMemo(() => {
        const pts = []
        const coneRadius = 4
        const y = -1.5
        const offsetRadius = coneRadius + 1.2

        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2
            pts.push(new THREE.Vector3(
                Math.cos(a) * offsetRadius,
                y,
                Math.sin(a) * offsetRadius
            ))
        }
        return pts
    }, [])

    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [points])

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color="#f59e0b" opacity={0.3} transparent />
        </line>
    )
}

// Main 3D Scene
function Scene({ cubeAngle, selectedAchievement, isMoving }) {
    const carRef = useRef()

    return (
        <>
            {/* Stary Sky Background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* STRONG Lighting */}
            <ambientLight intensity={1.5} /> {/* Increased base brightness */}

            {/* Spotlight for the model */}
            <spotLight
                position={[0, 15, 10]}
                angle={0.5}
                penumbra={0.5}
                intensity={12} // Increased form 5 to 12
                castShadow
                shadow-bias={-0.0001}
                color="#ffaa00"
            />
            {/* Extra Fill lights */}
            <pointLight position={[10, 5, 10]} intensity={2} color="#f59e0b" />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#8a2be2" />
            <pointLight position={[0, -5, 5]} intensity={3} color="#ffffff" /> {/* Uplight */}

            {/* Vinayag Model at center */}
            <VinayagModel />

            {/* Circular path the cube follows */}
            <CircularPath />

            {/* Single cube on circumference, camera follows from outside */}
            {/* Auto Model */}
            <OrbitingAuto
                angle={cubeAngle}
                isMoving={isMoving}
                carRef={carRef}
            />

            {/* Auto Smoke detached from hierarchy */}
            <AutoSmoke isMoving={isMoving} target={carRef} />

            {/* Post Processing for Motion Blur/Bloom */}
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
    const [cubeAngle, setCubeAngle] = useState(0)
    const [selectedAchievement, setSelectedAchievement] = useState(0)
    const [keysPressed, setKeysPressed] = useState({ left: false, right: false })

    // Continuous smooth movement with arrow keys
    useEffect(() => {
        const speed = 0.025
        let animationId

        const animate = () => {
            if (keysPressed.left) {
                setCubeAngle(prev => prev + speed) // Inverted direction
            }
            if (keysPressed.right) {
                setCubeAngle(prev => prev - speed) // Inverted direction
            }
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [keysPressed])

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setKeysPressed(prev => ({ ...prev, left: true }))
            } else if (e.key === 'ArrowRight') {
                setKeysPressed(prev => ({ ...prev, right: true }))
            }
        }

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') {
                setKeysPressed(prev => ({ ...prev, left: false }))
            } else if (e.key === 'ArrowRight') {
                setKeysPressed(prev => ({ ...prev, right: false }))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // Update selected achievement based on cube angle
    useEffect(() => {
        const normalizedAngle = ((cubeAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const index = Math.floor((normalizedAngle / (Math.PI * 2)) * achievements.length) % achievements.length
        setSelectedAchievement(index)
    }, [cubeAngle])

    const currentAchievement = achievements[selectedAchievement]

    const isMoving = keysPressed.left || keysPressed.right

    return (
        <div className="achievements-3d-section">
            {/* 3D Canvas */}
            <div className="achievements-canvas-container">
                <Canvas
                    camera={{ position: [0, 2, 12], fov: 50 }}
                    style={{ background: 'transparent' }}
                >
                    <Scene
                        cubeAngle={cubeAngle}
                        selectedAchievement={selectedAchievement}
                        isMoving={isMoving}
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
