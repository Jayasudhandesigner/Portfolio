import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
// Import static image
import stonesUrl from '../assets/stones.png';

// --- Shaders ---
const rippleVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const rippleFragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

// Simple pseudo-random
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  
  // Mouse interaction ripple (Watery distortion)
  float dist = distance(uv, uMouse);
  float strength = smoothstep(0.4, 0.0, dist); 
  
  float wave = sin(dist * 20.0 - uTime * 5.0) * 0.05 * strength; 
  float noiseDisplace = noise(uv * 10.0 + uTime) * 0.005;
  
  vec2 distortedUv = uv + vec2(wave) + noiseDisplace;
  
  vec4 color = texture2D(uTexture, distortedUv);
  gl_FragColor = color;
}
`;

function FishPlane() {
    const meshRef = useRef();
    const { viewport } = useThree();

    // Load Frames using Glob
    const frameUrls = useMemo(() => {
        const glob = import.meta.glob('../assets/video/fish_000/*.webp', { eager: true });
        return Object.keys(glob).sort().map(key => glob[key].default);
    }, []);

    const textures = useTexture(frameUrls);

    // Animation State
    const [currentFrame, setCurrentFrame] = useState(0);
    const uniforms = useRef({
        uTexture: { value: null },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    });

    // Cycle Frames
    useEffect(() => {
        if (textures.length === 0) return;
        const interval = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % textures.length);
        }, 40);
        return () => clearInterval(interval);
    }, [textures]);

    // Update Uniforms
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
            const u = (state.pointer.x + 1) / 2;
            const v = (state.pointer.y + 1) / 2;
            meshRef.current.material.uniforms.uMouse.value.set(u, v);

            if (textures.length > 0) {
                meshRef.current.material.uniforms.uTexture.value = textures[currentFrame];
            }
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={rippleVertexShader}
                fragmentShader={rippleFragmentShader}
                uniforms={uniforms.current}
            />
        </mesh>
    );
}

function StonesPlane() {
    const texture = useTexture(stonesUrl);
    const { viewport } = useThree();

    return (
        <mesh position={[0, 0, 2]} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} transparent={true} />
        </mesh>
    );
}

export default function FishSection() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: 'black' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={1} />
                <FishPlane />
                <StonesPlane />
            </Canvas>
            <div style={{
                position: 'absolute', top: 20, left: 20, color: 'white',
                fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 'bold', mixBlendMode: 'difference'
            }}>
                Water Ripple & Video Sequence
            </div>
        </div>
    );
}
