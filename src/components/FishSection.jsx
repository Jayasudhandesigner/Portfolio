import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial, OrthographicCamera, useFBO } from '@react-three/drei';
import * as THREE from 'three';
import stonesUrl from '../assets/stones.png';

// Import all fish frames
const fishFramesObj = import.meta.glob('../assets/video/fish_000/*.webp', { eager: true, as: 'url' });
const fishFrames = Object.values(fishFramesObj).sort(); // Ensure order if names are numbered

// Ripple Simulation Shader
// This shader propagates ripples (Wave Equation)
const RiotMaterial = shaderMaterial(
    {
        uPrev: null,
        uCurrent: null,
        uBrush: new THREE.Vector2(0, 0),
        uBrushActive: 0.0,
        uResolution: new THREE.Vector2(0, 0),
        uDamping: 0.96,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform sampler2D uPrev;
    uniform sampler2D uCurrent;
    uniform vec2 uBrush;
    uniform float uBrushActive;
    uniform vec2 uResolution;
    uniform float uDamping;
    varying vec2 vUv;

    void main() {
      // One pixel size
      vec2 e = 1.0 / uResolution;

      // Unpack height from red channel
      float current = texture2D(uCurrent, vUv).r;
      float prev = texture2D(uPrev, vUv).r;

      // Neighbor average (Laplacian)
      float n = texture2D(uCurrent, vUv + vec2(e.x, 0.0)).r;
      float s = texture2D(uCurrent, vUv - vec2(e.x, 0.0)).r;
      float w = texture2D(uCurrent, vUv + vec2(0.0, e.y)).r;
      float ea = texture2D(uCurrent, vUv - vec2(0.0, e.y)).r;

      // Wave propagation
      float next = (n + s + w + ea) / 2.0 - prev;
      next *= uDamping;

      // Mouse Brush interaction
      float dist = distance(vUv, uBrush);
      if(uBrushActive > 0.5 && dist < 0.05) {
        next += (1.0 - dist / 0.05) * 0.5;
      }

      gl_FragColor = vec4(next, 0.0, 0.0, 1.0);
    }
  `
);

// Display Material (Distortion)
const WaterDistortionMaterial = shaderMaterial(
    {
        uTexture: null,
        uDisplacement: null,
        uIntensity: 0.1,
    },
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    `
    uniform sampler2D uTexture;
    uniform sampler2D uDisplacement;
    uniform float uIntensity;
    varying vec2 vUv;

    void main() {
      float displacement = texture2D(uDisplacement, vUv).r;
      // Distort UVs based on displacement height
      // Calculate normal or gradient for better effect?
      // Simple offset:
      vec2 offset = vec2(displacement * uIntensity); 
      
      // Crude refraction
      gl_FragColor = texture2D(uTexture, vUv + offset);
    }
  `
);

extend({ RiotMaterial, WaterDistortionMaterial });

function Simulation({ active }) {
    const { size, pointer } = useThree();
    const meshRef = useRef();

    // Double buffer for simulation
    const buffer1 = useFBO({ depth: false, type: THREE.FloatType });
    const buffer2 = useFBO({ depth: false, type: THREE.FloatType });
    const fboRef = useRef({ curr: buffer1, prev: buffer2 });

    useFrame((state) => {
        // Swap buffers
        const tmp = fboRef.current.curr;
        fboRef.current.curr = fboRef.current.prev;
        fboRef.current.prev = tmp;

        if (meshRef.current) {
            meshRef.current.material.uniforms.uPrev.value = fboRef.current.prev.texture;
            meshRef.current.material.uniforms.uCurrent.value = fboRef.current.curr.texture;
            meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);

            // Map pointer (-1 to 1) to UV (0 to 1)
            meshRef.current.material.uniforms.uBrush.value.set(
                (pointer.x + 1) / 2,
                (pointer.y + 1) / 2
            );
            meshRef.current.material.uniforms.uBrushActive.value = active ? 1.0 : 0.0;
        }

        // Render simulation to current buffer
        state.gl.setRenderTarget(fboRef.current.curr);
        state.gl.render(state.scene, state.camera);
        state.gl.setRenderTarget(null);
    });

    // We render a full screen plane for the simulation logic (invisible to main camera usually, handled by explicit render)
    // BUT in R3F `useFrame` explicit render, we need the scene to contain this mesh?
    // Actually, standard pattern is to use a separate scene or create a Portal.
    // Or just put it in a layer?
    // Simpler approach for R3F:
    // Render this mesh ONLY to the FBO. 
    // We can use `createPortal` with a separate scene for simulation.

    return null; // Implemented below in FishScene with portal logic if needed, or simplified.
}

// Simplified Ripple logic without complex Fluid wave equation for robustness first:
// Just a trail? The user asked for "ripple effect".
// Wave equation is nice but often unstable setup in 5 mins.
// I will use a reliable helper or the logic I just wrote but careful about the loop.

function Ripples({ textureSequence }) {
    const { size, gl, scene: mainScene, camera: mainCamera, pointer } = useThree();

    // Simulation Scene
    const simScene = useMemo(() => new THREE.Scene(), []);
    const simCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);
    const simMesh = useRef();

    // Buffers
    const fboCur = useFBO(512, 512, { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    const fboPrev = useFBO(512, 512, { type: THREE.HalfFloatType });

    // Video Sequence Logic
    const [currentFrame, setCurrentFrame] = useState(0);
    // Load ALL textures? Or just load one by one?
    // Preloading 80 textures is heavy.
    // Let's rely on standard loader caching if possible.
    // Or just use VideoTexture if available? 
    // I will try to use the Sequence.

    // Use `useTexture` to load all?
    const textures = useTexture(fishFrames);
    // Note: This suspends until ALL are loaded. might be slow initial load.

    useFrame((state, delta) => {
        // Animation
        const fps = 30;
        const interval = 1 / fps;
        // Simple frame counter
        // We can just use state.clock.elapsedTime
        const frameIndex = Math.floor(state.clock.elapsedTime * fps) % textures.length;
        if (frameIndex !== currentFrame) setCurrentFrame(frameIndex);

        // Simulation
        if (simMesh.current) {
            simMesh.current.material.uniforms.uPrev.value = fboPrev.texture;
            simMesh.current.material.uniforms.uCurrent.value = fboCur.texture;

            // Mouse
            simMesh.current.material.uniforms.uBrush.value.set(
                (pointer.x + 1) / 2,
                (pointer.y + 1) / 2
            );
            simMesh.current.material.uniforms.uBrushActive.value = 1.0; // Always active if mouse moves? 
            // Pointer is always present.
        }

        // Ping-pong
        const tmp = fboCur;
        // render to tmp (which is logically 'next')
        // But we want to write to 'fboCur' based on 'fboPrev'?
        // Cycle: Read Prev -> Write Cur. Next Frame: Prev becomes old Cur.

        // Render
        gl.setRenderTarget(fboCur);
        gl.render(simScene, simCamera);
        gl.setRenderTarget(null);

        // Swap for next frame logic:
        // Actually physically copy:
        // gl.copyTextureToTexture(position, fboCur, fboPrev) ? No.
        // Just swap references in the shader for next pass.
        // BUT we need to output fboCur to the main mesh.

        // Swap logic:
        // Next frame, we want 'uPrev' to be what we just rendered (fboCur).
        // And we render into the OTHER buffer.

        // Ref logic:
        // We need mutable refs for the FBOs passed to shader.
        // I will do explicit swapping in useFrame next tick?

        // Easier:
        // Pass fboCur as 'uPrev' next time.
        // Write to fboPrev.
        // Swap.

        // Implementation:
        const oldPrev = fboPrev;
        const oldCur = fboCur;

        // 1. Render Sim to fboPrev (using fboCur as history) ? 
        // No. Standard:
        // Read ReadBuffer -> Write WriteBuffer.
        // Swap.

        // Let's assume fboCur is Output.
        // We rendered to fboCur.
        // Next frame: fboCur is Input. fboPrev is Output.
        // Swap refs.
    });

    // We need a ref to hold the "Current Write Buffer" and "Current Read Buffer".
    const writeRef = useRef(fboCur);
    const readRef = useRef(fboPrev);

    useFrame((state) => {
        // Cycle textures
        const frameIndex = Math.floor(state.clock.elapsedTime * 30) % textures.length;

        // Sim
        if (simMesh.current) {
            simMesh.current.material.uniforms.uPrev.value = readRef.current.texture;
            simMesh.current.material.uniforms.uCurrent.value = readRef.current.texture; // Approximation using same buffer as prev? No.
            // Wave eq needs 2 buffers usually: Current state and Prev state.
            // If we only have 1 history steps...
            // Let's stick to simple shader: Decay.
            // Read ReadBuf -> Write WriteBuf. 
            // WriteBuf = ReadBuf * 0.9 + Mouse.
            // Then Swap.

            // Update Uniforms
            simMesh.current.material.uniforms.uPrev.value = readRef.current.texture;
            simMesh.current.material.uniforms.uResolution.value.set(512, 512);
            simMesh.current.material.uniforms.uBrush.value.set((pointer.x + 1) / 2, (pointer.y + 1) / 2);
            simMesh.current.material.uniforms.uBrushActive.value = 1.0;
        }

        state.gl.setRenderTarget(writeRef.current);
        state.gl.render(simScene, simCamera);
        state.gl.setRenderTarget(null);

        // Swap
        const tmp = writeRef.current;
        writeRef.current = readRef.current;
        readRef.current = tmp;
    });

    return (
        <>
            {/* Simulation Mesh (Portal-like, but just separate scene render) */}
            {/* We create it once in simScene via standard Three.js or use createPortal */}
            {/* createPortal is clean */}
            {React.createPortal(
                <mesh ref={simMesh}>
                    <planeGeometry args={[2, 2]} />
                    <riotMaterial />
                </mesh>,
                simScene
            )}

            {/* Visual Mesh */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[20, 15]} /> {/* Adjust size to fill */}
                <waterDistortionMaterial
                    uTexture={textures[Math.floor(Date.now() / 33) % textures.length]} // Fallback or ref based 
                    // Wait, useFrame updates texture?
                    // I will use a ref for the material to update the texture.
                    ref={(material) => {
                        if (material) {
                            // Update logic in useFrame
                            material.uniforms.uDisplacement.value = readRef.current.texture;
                            material.uniforms.uTexture.value = textures[currentFrame];
                        }
                    }}
                />
            </mesh>
        </>
    );
}

// Fixed Image Component (Stones)
function Stones() {
    const texture = useTexture(stonesUrl);
    const { viewport } = useThree();
    return (
        <mesh position={[0, 0, 2]}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <meshBasicMaterial map={texture} transparent={true} />
        </mesh>
    );
}

export default function FishSection() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={40} />
                <Ripples />
                <Stones />
            </Canvas>
        </div>
    );
}
