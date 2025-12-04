import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function HeroModel() {
    const lightRef = useRef()
    const modelRef = useRef()

    // Try to load the model
    let scene
    try {
        const gltf = useGLTF('/Shiv.glb')
        scene = gltf.scene
    } catch (error) {
        console.error('Model loading error:', error)
    }

    useFrame(({ mouse, camera }) => {
        // Light follows cursor but stays behind the model
        if (lightRef.current && modelRef.current) {
            // Get model position
            const modelPos = modelRef.current.position

            // Calculate cursor position in world space
            const vector = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0)

            // Position light behind the model (negative Z from model)
            lightRef.current.position.set(
                vector.x,
                vector.y,
                modelPos.z - 5 // 5 units behind the model
            )
        }
    })

    return (
        <>
            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.3} />

            {/* Dynamic cursor light positioned behind the model */}
            <pointLight
                ref={lightRef}
                intensity={10}
                distance={50}
                color="#ffffff"
                castShadow
            />

            {/* Rim lights from behind */}
            <pointLight position={[5, 3, -8]} intensity={2} color="#6366f1" />
            <pointLight position={[-5, -3, -8]} intensity={2} color="#f43f5e" />

            {/* Subtle fill light from front */}
            <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />

            {/* Model or fallback - positioned close to camera */}
            {scene ? (
                <primitive
                    ref={modelRef}
                    object={scene}
                    position={[0, 0, 0]} // Close to origin, camera is at z=15
                    scale={8}
                />
            ) : (
                <mesh ref={modelRef} position={[0, 0, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="#6366f1" />
                </mesh>
            )}
        </>
    )
}

function Loader() {
    return (
        <>
            <ambientLight intensity={1} />
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#667eea" wireframe />
            </mesh>
        </>
    )
}

export default function HeroSection() {
    return (
        <div className="canvas-wrapper">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <color attach="background" args={['#0a0a0f']} />
                <Suspense fallback={<Loader />}>
                    <HeroModel />
                </Suspense>
            </Canvas>

            <div className="overlay-text">
                <div className="name">Jayasudhan M</div>
                <div className="title">
                    <span className="bold">AI</span> engineer
                </div>
            </div>
        </div>
    )
}

// Preload the model
useGLTF.preload('/Shiv.glb')