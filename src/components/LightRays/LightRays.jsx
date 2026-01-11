import React, { useEffect, useRef } from 'react';

// Color conversion util
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const LightRays = ({
    raysOrigin = 'top-center',
    raysColor = '#ffffff',
    raysSpeed = 0.8,
    lightSpread = 2.7,
    rayLength = 4,
    pulsating = true,
    fadeDistance = 1.5,
    saturation = 1, // Not used directly in RGB but could dampen color
    followMouse = false,
    mouseInfluence = 0.4,
    noiseAmount = 0.45,
    distortion = 0.05
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        if (followMouse) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [followMouse]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const rgb = hexToRgb(raysColor) || { r: 255, g: 255, b: 255 };

        // Precompute rays
        const rayCount = 20;
        const rays = Array.from({ length: rayCount }, (_, i) => ({
            angle: (Math.PI * 2 * i) / rayCount,
            speed: (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1) * raysSpeed * 0.01,
            width: Math.random() * 0.5 + 0.5,
            length: Math.random() * 0.5 + 0.5
        }));

        const render = () => {
            timeRef.current += 1;
            const t = timeRef.current;
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            // Determine origin
            let originX = width / 2;
            let originY = height / 2;

            if (raysOrigin === 'top-center') {
                originX = width / 2;
                originY = -50; // Above canvas
            }
            // Mouse influence
            if (followMouse) {
                // Lerp origin towards mouse based on influence
                originX += (mouseRef.current.x - width / 2) * mouseInfluence;
                originY += (mouseRef.current.y - height / 2) * mouseInfluence;
            }

            ctx.globalCompositeOperation = 'screen'; // Additive blending

            // Pulse effect
            const pulse = pulsating ? 1 + Math.sin(t * 0.05) * 0.1 : 1;

            rays.forEach((ray, i) => {
                ray.angle += ray.speed;

                // Add noise/distortion
                const noise = Math.sin(t * 0.02 + i) * distortion;
                const angle = ray.angle + noise;

                const length = Math.max(width, height) * rayLength * ray.length * (pulsating ? 1 + Math.sin(t * 0.1 + i) * 0.2 : 1);

                // Draw Triangle Ray
                ctx.save();
                ctx.translate(originX, originY);
                ctx.rotate(angle);

                const grad = ctx.createLinearGradient(0, 0, length, 0);
                // Reduce opacity with distance
                const opacity = 0.2 * pulse;
                grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
                grad.addColorStop(fadeDistance / rayLength, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

                ctx.fillStyle = grad;

                // Ray width spread
                const w = width * 0.1 * lightSpread * ray.width;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(length, -w / 2);
                ctx.lineTo(length, w / 2);
                ctx.fill();

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default LightRays;
