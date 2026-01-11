import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Sky, Cloud, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Achievement data
const achievements = [
    { id: 1, title: "MLOps Platform", category: "Project", icon: "🚀", color: "#ffd700" },
    { id: 2, title: "GenAI Security", category: "Innovation", icon: "🛡️", color: "#ff4500" },
    { id: 3, title: "Oracle Cloud Certified", category: "Certification", icon: "☁️", color: "#4682b4" },
    { id: 4, title: "Kafka Certified", category: "Certification", icon: "📜", color: "#32cd32" },
    { id: 5, title: "IIT Ropar Minor", category: "Education", icon: "🎓", color: "#8a2be2" },
    { id: 6, title: "Hackathon Champion", category: "Award", icon: "🥇", color: "#f59e0b" }
]

// Vinayag Model
function VinayagModel() {
    const { scene } = useGLTF('/models/vinayag.glb')
    const modelRef = useRef()

    useFrame((state) => {
        if (modelRef.current) {
            // Gentle hovering or breathing animation
            modelRef.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={8}
            position={[0, -3, 0]}
            rotation={[0, 0, 0]}
        />
    )
}

// Cube positioned on circumference
function OrbitingCubeWithCamera({ angle, selectedAchievement }) {
    const cubeRef = useRef()
    const { camera } = useThree()

    // Orbit parameters
    const orbitRadius = 6 // Slightly wider than the model
    const orbitHeight = 0 // Centered vertically relative to camera focus

    // Cube position
    const cubeX = Math.cos(angle) * orbitRadius
    const cubeZ = Math.sin(angle) * orbitRadius
    const cubeY = orbitHeight

    const achievement = achievements[selectedAchievement]

    useFrame(() => {
        // Camera follows the cube but stays outside
        const cameraDistance = 8
        const cameraHeight = 2

        const cameraRadius = orbitRadius + cameraDistance
        const camX = Math.cos(angle) * cameraRadius
        const camZ = Math.sin(angle) * cameraRadius
        const camY = cubeY + cameraHeight

        camera.position.set(camX, camY, camZ)
        camera.lookAt(0, 0, 0) // Look at the center (Vinayag)
    })

    return (
        <group position={[cubeX, cubeY, cubeZ]}>
            <mesh ref={cubeRef}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color={achievement.color}
                    emissive={achievement.color}
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            {/* Glow */}
            <pointLight distance={3} intensity={2} color={achievement.color} />
        </group>
    )
}

// Circular path indicator
function CircularPath() {
    const points = useMemo(() => {
        const pts = []
        const radius = 6
        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2
            pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
        }
        return pts
    }, [])

    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [points])

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
        </line>
    )
}

// Main 3D Scene
function Scene({ cubeAngle, selectedAchievement }) {
    return (
        <>
            {/* Sky Background */}
            <Sky sunPosition={[10, 10, -10]} turbidity={0.5} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Atmospheric Fog/Smoke */}
            <fog attach="fog" args={['#202030', 5, 30]} />

            {/* Clouds / Smoke Effects */}
            <Cloud position={[-4, -2, -5]} speed={0.2} opacity={0.5} color="white" />
            <Cloud position={[4, 2, -10]} speed={0.2} opacity={0.5} color="white" />
            <Cloud position={[0, 5, -5]} speed={0.2} opacity={0.3} color="white" />

            {/* Sparkles for divine effect */}
            <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#ffd700" />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
            <pointLight position={[-10, 5, 10]} intensity={0.5} color="#8a2be2" />
            <directionalLight position={[0, 10, 5]} intensity={1} castShadow />

            {/* The Main Model */}
            <VinayagModel />

            {/* Orbital Elements */}
            <CircularPath />
            <OrbitingCubeWithCamera
                angle={cubeAngle}
                selectedAchievement={selectedAchievement}
            />
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
                setCubeAngle(prev => prev - speed)
            }
            if (keysPressed.right) {
                setCubeAngle(prev => prev + speed)
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
