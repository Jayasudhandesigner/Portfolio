import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

class Particle {
    constructor(x, y, z) {
        this.lifeSpan = Math.floor(Math.random() * 60 + 60);
        this.initialLifeSpan = this.lifeSpan;
        // 3D Velocity: spread slightly in X/Z, move down/back in Y/Z?
        // User logic was 2D: x += vel.x, y += vel.y. y moves up (-0.4...).
        // In 3D: We want smoke to "puff" out from the car.
        // Assuming car is at (0,0,0) relative to parent, smoke should move opposite to direction?
        // Or just "puff" generally. User logic is generic "rise/fall" physics.
        // Adapted logic:
        this.velocity = new THREE.Vector3(
            (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10), // X random
            (Math.random() * 0.2), // Y rises slightly (smoke)
            (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10) // Z random
        )
        this.position = new THREE.Vector3(x, y, z);
        this.baseDimension = 0.5; // Scale down for 3D world (unit size)
    }

    update() {
        this.position.add(this.velocity);

        // Drag / Gravity logic from user snippet:
        // this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
        // this.velocity.y -= Math.random() / 600; (Gravity? Smoke usually rises).
        // User snippet: velocity.y -= ... -> Gravity pulls down.
        // But for smoke trail, maybe up? I'll stick to user logic.
        this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
        this.velocity.y -= Math.random() / 600;
        this.velocity.z += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;

        this.lifeSpan--;
    }
}

export function AutoSmoke({ isMoving, target }) {
    const particlesRef = useRef([]);
    const geometryRef = useRef(new THREE.BufferGeometry());
    const materialRef = useRef();
    const pointsRef = useRef();
    const positions = useRef(new Float32Array(3000)); // Max particles * 3
    const scales = useRef(new Float32Array(1000));   // Max particles * 1
    const opacities = useRef(new Float32Array(1000));

    // Texture for "fluid/bubble" look? 
    // User provided `BubbleCursor` and `FluidCursor` full code.
    // Implementing purely canvas 2D logic in 3D?
    // The user provided TWO snippets:
    // 1. `Particle` class with canvas `context.arc` (BubbleCursor).
    // 2. `useFluidCursor` which is a full WebGL fluid simulation.
    // USER REQUEST: "use the logic i am going to give for the smoke (BubbleCursor Particle logic) ... use this for the smoke look (Fluid logic section?)".
    // "remove the smoke trail and use the logic ... parented to the auto".

    // The fluid simulation is screen-space WebGL. Hooking that to a 3D object's local position is extremely hard (projection mapping).
    // The `Particle` class logic (first snippet) is much easier to adapt to 3D particles.
    // The user confusingly pasted `BubbleCursor` then said "use this logic for smoke physics" then pasted `useFluidCursor` and said "use this for the smoke look".
    // 
    // Interpreting:
    // 1. Physics: Use the `Particle` class behavior (velocity exp decay etc).
    // 2. Look: "Fluid" look.
    //
    // However, the `useFluidCursor` is a global screen effect. I cannot arguably "parent" a full-screen fluid sim to a small 3D car easily without FBO tricks.
    // BUT the `Particle` logic snippet (first one) draws circles. It looks like bubbles.
    // The user likely wants the Particles (Snippet 1) to be emitted from the car.
    //
    // I will implement the **Particle System** (Snippet 1) adapted for 3D R3F.
    // Physics: Copied from Snippet 1.
    // Rendering: Billboards (Points) or Mesh instances.
    //
    // Logic:
    // On each frame, if `isMoving`, spawn particles at (0,0,0) (Car center).
    // Update all particles.
    // Update Geometry attributes.

    useFrame(() => {
        // Spawn
        if (isMoving && target && target.current) {
            const spawnPos = new THREE.Vector3();
            target.current.getWorldPosition(spawnPos);

            // Spawn slight offset from center? (Exhaust pipe?)
            // Model is rotated 90 deg. Exhaust usually at back.
            // We can let spawnPos be center for now + user's random offset in class.
            // Actually, Particle class takes x,y,z.

            // Spawn 2 per frame
            particlesRef.current.push(new Particle(spawnPos.x, spawnPos.y, spawnPos.z));
            particlesRef.current.push(new Particle(spawnPos.x, spawnPos.y, spawnPos.z));
        }

        // Update
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            if (p.lifeSpan < 0) {
                particles.splice(i, 1);
            }
        }

        // Rebuild Buffer
        const positionsArr = positions.current;
        const scalesArr = scales.current;
        const opacitiesArr = opacities.current; // simulate alpha interaction?

        particles.forEach((p, i) => {
            if (i >= 1000) return;
            positionsArr[i * 3] = p.position.x;
            positionsArr[i * 3 + 1] = p.position.y;
            positionsArr[i * 3 + 2] = p.position.z;

            const scale = 0.2 + (p.initialLifeSpan - p.lifeSpan) / p.initialLifeSpan;
            scalesArr[i] = p.baseDimension * scale;
            opacitiesArr[i] = (p.lifeSpan / p.initialLifeSpan); // Fade out
        });

        // Set Draw Range
        geometryRef.current.setDrawRange(0, particles.length);

        // Update attributes
        // THREE.Points usually takes one geometry. Manual buffer update needed.
        // Simplified: Use helper from drei? `Instances` is better for performance but Points is fine for <1000.
        // Let's use standard BufferGeometry updates.
        geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positionsArr.subarray(0, particles.length * 3), 3));
        geometryRef.current.setAttribute('scale', new THREE.BufferAttribute(scalesArr.subarray(0, particles.length), 1));
        geometryRef.current.setAttribute('opacity', new THREE.BufferAttribute(opacitiesArr.subarray(0, particles.length), 1));

        // Attributes need update flag?
        // geometryRef.current.attributes.position.needsUpdate = true; // New instance each time usually.
    });

    // Custom Shader Material for "Bubble/Fluid" look (Snippet 1 style: Circle path fill)
    // Snippet 1 style is simple 2D circle with border.
    // I will use a simple circle texture on Points.

    const texture = new THREE.TextureLoader().load('/textures/smoke.png'); // Or generate procedural circle.

    // Shader to handle per-particle scale/opacity
    const shader = {
        vertexShader: `
            attribute float scale;
            attribute float opacity;
            varying float vOpacity;
            void main() {
                vOpacity = opacity;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = scale * 50.0 * (1.0 / -mvPosition.z); // Perspective scale
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying float vOpacity;
            void main() {
                // Circle shape
                vec2 coord = gl_PointCoord - vec2(0.5);
                if(length(coord) > 0.5) discard;
                
                // Style: #e6f1f7 fill, #3a92c5 stroke (from snippet)
                // Simplified to soft sphere/bubble
                gl_FragColor = vec4(0.9, 0.94, 0.97, vOpacity); // Light blueish
            }
        `
    };

    return (
        <points>
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={1000}
                    array={positions.current}
                    itemSize={3}
                />
                {/* Needs custom attributes added manually in useEffect/Ref usually */}
            </bufferGeometry>
            <shaderMaterial
                vertexShader={shader.vertexShader}
                fragmentShader={shader.fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
