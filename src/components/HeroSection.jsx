import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useRef, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'

function HeroModel() {
    const lightRef = useRef()
    const modelRef = useRef()
    const { scene } = useGLTF('/models/Shiv.glb')

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
    })

    return (
        <>
            {/* Dynamic cursor light - INTENSIFIED */}
            <pointLight
                ref={lightRef}
                intensity={500}
                distance={50}
                color="#ffffff"
            />

            {/* Additional strong lights to illuminate the model */}
            <pointLight position={[0, -2, 12]} intensity={25} color="#f59e0b" />
            <pointLight position={[3, 2, 10]} intensity={15} color="#ea580c" />
            <pointLight position={[-3, -1, 10]} intensity={10} color="#fbbf24" />

            {/* Model - using exact HTML coordinates */}
            <primitive
                ref={modelRef}
                object={scene}
                position={[0, -2, 14]}  // Exact position from HTML
                scale={10}              // Exact scale from HTML
                rotation={[0, 0, 0]}    // Exact rotation from HTML
            />
        </>
    )
}

// Post-processing effects component
function Effects() {
    return (
        <EffectComposer>
            {/* Bloom/Glow effect */}
            <Bloom
                intensity={1.5}           // Glow intensity
                luminanceThreshold={0.2}  // Brightness threshold for bloom
                luminanceSmoothing={0.9}  // Smoothness of the bloom
                mipmapBlur={true}         // High quality blur
                radius={0.8}              // Spread of the bloom
            />
            {/* Vignette for atmospheric edges */}
            <Vignette
                offset={0.3}
                darkness={0.7}
            />
        </EffectComposer>
    )
}

// Rotating titles component
function RotatingTitle() {
    const titles = [
        'AI Ops Engineer',
        'MLOps Engineer',
        'Production AI Systems',
        'Generative AI Professional'
    ]
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % titles.length)
                setIsAnimating(false)
            }, 300)
        }, 3000)

        return () => clearInterval(interval)
    }, [titles.length])

    return (
        <div className={`title text-bloom ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            {titles[currentIndex]}
        </div>
    )
}

export default function HeroSection() {
    return (
        <div className="canvas-wrapper hero-section">
            {/* Using orthographic camera */}
            <Canvas
                orthographic
                camera={{ position: [0, 0, 20], zoom: 160 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <color attach="background" args={['#000000']} />
                {/* Add fog for atmospheric depth */}
                <fog attach="fog" args={['#000', 10, 30]} />
                <Suspense fallback={null}>
                    <HeroModel />
                </Suspense>

                {/* Post-processing for glow */}
                <Effects />
            </Canvas>

            {/* Atmospheric overlays */}
            <div className="mist-overlay"></div>

            <div className="overlay-text">
                <div className="name text-bloom orange-text">Jayasudhan M</div>
                <RotatingTitle />
            </div>
        </div>
    )
}

// Preload the model
useGLTF.preload('/models/Shiv.glb')
