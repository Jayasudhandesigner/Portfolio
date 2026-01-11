import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, Stars } from '@react-three/drei'
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

// Cube positioned on ring path
function OrbitingCubeWithCamera({ angle, selectedAchievement }) {
    const cubeRef = useRef()
    const { camera } = useThree()

    // Simplified ring parameters matching CircularPath
    const offsetRadius = 5.2 // 4 + 1.2
    const y = -1.5

    // Cube position on circular path
    const cubeX = Math.cos(angle) * offsetRadius
    const cubeZ = Math.sin(angle) * offsetRadius
    const cubeY = y

    const achievement = achievements[selectedAchievement]

    // Camera position: outside the ring, looking at the cube
    useFrame(() => {
        const cameraDistance = 6
        const cameraHeight = 1.5

        const cameraRadius = offsetRadius + cameraDistance
        const camX = Math.cos(angle) * cameraRadius
        const camZ = Math.sin(angle) * cameraRadius
        const camY = cubeY + cameraHeight

        camera.position.set(camX, camY, camZ)
        camera.lookAt(cubeX, cubeY, cubeZ)
    })

    return (
        <group position={[cubeX, cubeY, cubeZ]}>
            {/* Main cube */}
            <mesh ref={cubeRef}>
                <boxGeometry args={[0.6, 0.6, 0.6]} />
                <meshStandardMaterial
                    color={achievement.color}
                    emissive={achievement.color}
                    emissiveIntensity={0.4}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Subtle glow around cube */}
            <mesh>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshBasicMaterial
                    color={achievement.color}
                    transparent
                    opacity={0.12}
                />
            </mesh>
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
            position={[0, -4, 0]}
            rotation={[0, 0, 0]}
        />
    )
}

// Circular path indicator
function CircularPath() {
    const points = useMemo(() => {
        const pts = []
        const coneRadius = 4
        // Adjusted for visual fit around the model
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

// Main 3D Scene - no rotation, static elements
function Scene({ cubeAngle, selectedAchievement }) {
    return (
        <>
            {/* Stary Sky Background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />

            {/* Spotlight for the model */}
            <spotLight
                position={[0, 15, 10]}
                angle={0.3}
                penumbra={1}
                intensity={5}
                castShadow
                shadow-bias={-0.0001}
                color="#ffaa00"
            />
            {/* Fill lights */}
            <pointLight position={[10, 5, 10]} intensity={0.5} color="#f59e0b" />
            <pointLight position={[-10, 5, -10]} intensity={0.5} color="#8a2be2" />

            {/* Vinayag Model at center */}
            <VinayagModel />

            {/* Circular path the cube follows */}
            <CircularPath />

            {/* Single cube on circumference, camera follows from outside */}
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

useGLTF.preload('/models/vinayag.glb')
