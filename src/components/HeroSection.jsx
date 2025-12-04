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
        const gltf = useGLTF('/models/Shiv.glb')
        scene = gltf.scene
    } catch (error) {
        console.error('Model loading error:', error)
    }

    useFrame(({ mouse }) => {
        // Light follows cursor position - simplified for orthographic camera
        if (lightRef.current) {
            // Directly use mouse coordinates scaled up
            lightRef.current.position.set(
                mouse.x * 10,  // Scale mouse X to world coordinates
                mouse.y * 10,  // Scale mouse Y to world coordinates
                10             // Position slightly in front of model (model is at z=14)
            )
        }

        // Optional: Gentle auto-rotation (you can remove if not needed)
        // if (modelRef.current) {
        //     modelRef.current.rotation.y += 0.002
        // }
    })

    return (
        <>

            {/* Dynamic cursor light - INTENSIFIED */}
            <pointLight
                ref={lightRef}
                intensity={200}
                distance={50}
                color="#ffffff"
            />

            {/* Additional strong lights to illuminate the model */}
            <pointLight position={[0, -2, 12]} intensity={19} color="#085264ff" />

            {/* Model or fallback - using exact HTML coordinates */}
            {scene ? (
                <primitive
                    ref={modelRef}
                    object={scene}
                    position={[0, -2, 14]}  // Exact position from HTML
                    scale={10}              // Exact scale from HTML
                    rotation={[0, 0, 0]}    // Exact rotation from HTML
                />
            ) : (
                <mesh ref={modelRef} position={[0, -3, 0]}>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshPhongMaterial color="#6366f1" />
                </mesh>
            )}
        </>
    )
}

function Loader() {
    return (
        <>
            <ambientLight intensity={10} />
        </>
    )
}

export default function HeroSection() {
    return (
        <div className="canvas-wrapper">
            {/* Using orthographic camera */}
            <Canvas
                orthographic
                camera={{ position: [0, 0, 20], zoom: 160 }}
            >
                <color attach="background" args={['#000000']} />
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
useGLTF.preload('/models/Shiv.glb')