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

    useFrame(({ mouse, camera }) => {
        // Light follows cursor position (same as HTML implementation)
        if (lightRef.current) {
            const mouseVector = new THREE.Vector2(
                mouse.x,
                mouse.y
            )

            const vector = new THREE.Vector3(mouseVector.x, mouseVector.y, 0.5).unproject(camera)
            const dir = vector.sub(camera.position).normalize()
            lightRef.current.position.copy(camera.position.clone().add(dir.multiplyScalar(10)))
        }

        // Optional: Gentle auto-rotation (you can remove if not needed)
        // if (modelRef.current) {
        //     modelRef.current.rotation.y += 0.002
        // }
    })

    return (
        <>
            {/* Ambient light for base visibility - INTENSIFIED */}
            <ambientLight intensity={1.5} />

            {/* Dynamic cursor light - INTENSIFIED */}
            <pointLight
                ref={lightRef}
                intensity={15}
                distance={50}
                color="#ffffff"
            />

            {/* Additional strong lights to illuminate the model */}
            <pointLight position={[0, 5, 5]} intensity={5} color="#ffffff" />

            {/* Model or fallback - using exact HTML coordinates */}
            {scene ? (
                <primitive
                    ref={modelRef}
                    object={scene}
                    position={[0, -2, 12]}  // Exact position from HTML
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
            {/* Using exact camera settings from HTML */}
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
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