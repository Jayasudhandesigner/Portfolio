import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer } from '@react-three/drei'
import { useRef, Suspense, useEffect } from 'react'
import * as THREE from 'three'

function ShivaModel() {
    // Load Shiv model from public folder
    const { scene } = useGLTF('/models/Shiv.glb')
    const lightRef = useRef()
    const modelRef = useRef()
    const groupRef = useRef()

    // Debug and setup model materials
    useEffect(() => {
        console.log('Shiv GLTF Scene loaded:', scene)

        // Traverse and configure all meshes
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log('Mesh found:', child.name, child)

                // Enable shadows
                child.castShadow = true
                child.receiveShadow = true

                // Ensure proper material rendering
                if (child.material) {
                    child.material.needsUpdate = true

                    // Enhance material properties for better visibility
                    if (child.material.isMeshStandardMaterial) {
                        child.material.metalness = Math.min(child.material.metalness, 0.5)
                        child.material.roughness = Math.max(child.material.roughness, 0.3)
                    }
                }

                // If no material exists, add a default one
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        metalness: 0.3,
                        roughness: 0.5
                    })
                }
            }
        })
    }, [scene])

    useFrame(({ mouse, camera }) => {
        // Parent light to cursor position
        if (lightRef.current) {
            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera)
            const dir = vector.sub(camera.position).normalize()
            lightRef.current.position.copy(camera.position.clone().add(dir.multiplyScalar(10)))
        }

        // Gentle rotation on the model
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.002
        }

        // Optional: Subtle floating animation
        if (groupRef.current) {
            groupRef.current.position.y = -3 + Math.sin(Date.now() * 0.0005) * 0.1
        }
    })

    return (
        <>
            {/* Ambient base lighting */}
            <ambientLight intensity={0.5} />

            {/* Cursor-parented dynamic light */}
            <pointLight
                ref={lightRef}
                intensity={4}
                distance={30}
                color="#ffffff"
                castShadow
            />

            {/* Additional accent lights */}
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
            />
            <pointLight
                position={[-10, -10, -10]}
                intensity={1}
                color="#4466ff"
            />
            <pointLight
                position={[10, -10, 10]}
                intensity={1}
                color="#ff4466"
            />

            {/* Model group */}
            <group ref={groupRef} position={[0, -3, 0]}>
                <primitive
                    ref={modelRef}
                    object={scene.clone()}
                    scale={10}
                />
            </group>
        </>
    )
}

function Loader() {
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color="#4ecdc4"
                wireframe
                emissive="#4ecdc4"
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default function IntroSection() {
    return (
        <div className="canvas-wrapper intro-section">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 45 }}
                shadows
                gl={{ antialias: true }}
            >
                {/* Background color */}
                <color attach="background" args={['#000']} />

                {/* Environment with custom lightformers */}
                <Environment background={false} blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />

                    {/* Colored accent lights */}
                    <Lightformer
                        intensity={2}
                        color="#6366f1"
                        position={[5, 5, -5]}
                        scale={[10, 10, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        color="#f43f5e"
                        position={[-5, -5, -5]}
                        scale={[10, 10, 1]}
                    />
                </Environment>

                {/* Fog for depth */}
                <fog attach="fog" args={['#000', 15, 30]} />

                {/* Suspense wrapper for async loading */}
                <Suspense fallback={<Loader />}>
                    <ShivaModel />
                </Suspense>

                {/* Optional: Uncomment for debugging */}
                {/* <OrbitControls makeDefault /> */}
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

// Preload the model
useGLTF.preload('/models/Shiv.glb')