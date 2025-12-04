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
        const gltf = useGLTF('/Untitled.glb')
        scene = gltf.scene
    } catch (error) {
        console.error('Model loading error:', error)
    }

    useFrame(({ mouse, camera }) => {
        // Light follows cursor position
        if (lightRef.current) {
            const vector = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 5)
            lightRef.current.position.copy(vector)
        }

        // Subtle rotation on the model
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.002
        }
    })

    return (
        <>
            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.5} />

            {/* Dynamic cursor light */}
            <pointLight ref={lightRef} intensity={8} distance={40} color="#ffffff" />

            {/* Additional static lights */}
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Model or fallback */}
            {scene ? (
                <primitive ref={modelRef} object={scene} position={[0, -2, 0]} scale={8} />
            ) : (
                <mesh ref={modelRef}>
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
