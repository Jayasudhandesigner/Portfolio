import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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

// Static Cone - no rotation, positioned at center
function StaticCone() {
    return (
        <mesh position={[0, 0, 0]}>
            <coneGeometry args={[4, 6, 32, 1, true]} />
            <meshStandardMaterial
                color="#1a1a2e"
                wireframe={true}
                transparent
                opacity={0.7}
            />
        </mesh>
    )
}

// Cube positioned on cone's circumference edge
// Camera follows the cube from outside, looking at cube with cone behind
function OrbitingCubeWithCamera({ angle, selectedAchievement }) {
    const cubeRef = useRef()
    const { camera } = useThree()

    // Cone parameters
    const coneRadius = 4
    const coneHeight = 6

    // Position cube on the circumference edge with offset from base
    const heightFromBase = 1.5
    const y = -coneHeight / 2 + heightFromBase

    // Calculate radius at this height on the cone
    const normalizedY = (y + coneHeight / 2) / coneHeight
    const radiusAtHeight = coneRadius * (1 - normalizedY)

    // Add offset away from cone surface
    const offsetRadius = radiusAtHeight + 1.2

    // Cube position on circular path
    const cubeX = Math.cos(angle) * offsetRadius
    const cubeZ = Math.sin(angle) * offsetRadius
    const cubeY = y

    const achievement = achievements[selectedAchievement]

    // Camera position: outside the cone, looking at the cube
    // Camera -> Cube -> Cone (cone is behind the cube from camera's view)
    useFrame(() => {
        // Camera is positioned further out from the cube, on the same radial line
        // This way: camera is outside, cube is in middle, cone is behind cube
        const cameraDistance = 6 // Distance from cube to camera
        const cameraHeight = 1.5 // Slightly above cube level

        // Camera on the same radial direction as cube, but further out
        const cameraRadius = offsetRadius + cameraDistance
        const camX = Math.cos(angle) * cameraRadius
        const camZ = Math.sin(angle) * cameraRadius
        const camY = cubeY + cameraHeight

        camera.position.set(camX, camY, camZ)
        // Look at the cube (which has cone behind it)
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

// Circular path indicator
function CircularPath() {
    const points = useMemo(() => {
        const pts = []
        const coneRadius = 4
        const coneHeight = 6
        const heightFromBase = 1.5
        const y = -coneHeight / 2 + heightFromBase
        const normalizedY = (y + coneHeight / 2) / coneHeight
        const radiusAtHeight = coneRadius * (1 - normalizedY)
        const offsetRadius = radiusAtHeight + 1.2

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
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />
            <pointLight position={[5, 2, 5]} intensity={0.6} color="#f59e0b" />
            <pointLight position={[-5, 2, -5]} intensity={0.4} color="#8a2be2" />

            {/* Single static cone at center */}
            <StaticCone />

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
