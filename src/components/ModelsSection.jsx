import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import * as THREE from 'three'

function Model({ geometry, color, position, isActive }) {
    const meshRef = useRef()

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01

            // FIX: Smooth scale transition
            const targetScale = isActive ? 1.2 : 1
            meshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                delta * 5
            )

            // FIX: Smooth position transition
            meshRef.current.position.lerp(position, delta * 5)
        }
    })

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshPhongMaterial color={color} specular={0x222222} shininess={100} />
        </mesh>
    )
}

function Scene({ currentIndex }) {
    // FIX: Models defined inside Scene to access currentIndex
    const models = [
        { geometry: new THREE.SphereGeometry(1.5, 32, 32), color: 0xff6b6b },
        { geometry: new THREE.ConeGeometry(1.5, 3, 32), color: 0x4ecdc4 },
        { geometry: new THREE.OctahedronGeometry(1.5), color: 0xffe66d }
    ]

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />

            {models.map((model, index) => {
                const offset = index - currentIndex
                return (
                    <Model
                        key={index}
                        geometry={model.geometry}
                        color={model.color}
                        position={new THREE.Vector3(offset * 5, 0, 0)}
                        isActive={index === currentIndex}
                    />
                )
            })}
        </>
    )
}

export default function ModelsSection() {
    // FIX: State lifted to component level for proper button interaction
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + 3) % 3)
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % 3)
    }

    return (
        <div className="canvas-wrapper">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={['#000']} />
                <Scene currentIndex={currentIndex} />
            </Canvas>

            <div className="slider-container">
                <button className="slider-btn" onClick={handlePrev}>←</button>
                <button className="slider-btn" onClick={handleNext}>→</button>
            </div>
        </div>
    )
}
