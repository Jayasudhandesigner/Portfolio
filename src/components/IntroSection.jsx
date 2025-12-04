import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

function ShivaModel() {
    const { scene } = useGLTF('/Untitled.glb')
    const lightRef = useRef()
    const modelRef = useRef()

    useFrame(({ mouse, camera }) => {
        if (lightRef.current) {
            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera)
            const dir = vector.sub(camera.position).normalize()
            lightRef.current.position.copy(camera.position.clone().add(dir.multiplyScalar(10)))
        }

        // Gentle rotation on the model
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.002
        }
    })

    return (
        <>
            <pointLight ref={lightRef} intensity={4} distance={30} />
            <primitive ref={modelRef} object={scene} position={[0, -3, 0]} scale={10} />
        </>
    )
}

function Loader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#6366f1" />
        </mesh>
    )
}

export default function IntroSection() {
    return (
        <div className="canvas-wrapper intro-section">
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <color attach="background" args={['#000']} />
                <Suspense fallback={<Loader />}>
                    <ShivaModel />
                </Suspense>
            </Canvas>

            <div className="overlay-text intro-overlay">
                <div className="intro-welcome">Welcome to</div>
                <div className="name">My Portfolio</div>
                <div className="intro-tagline">
                    Innovative Solutions • Creative Design • Cutting-Edge Technology
                </div>
                <div className="scroll-hint">
                    <span>↓ Scroll to Explore ↓</span>
                </div>
            </div>
        </div>
    )
}
