import { motion } from 'framer-motion';

const RippleTransition = ({ isActive, direction = 'up' }) => {
    return (
        <>
            {isActive && (
                <motion.div
                    className="ripple-overlay"
                    initial={{
                        clipPath: `circle(0% at 50% ${direction === 'up' ? '100%' : '0%'})`,
                        opacity: 0.8
                    }}
                    animate={{
                        clipPath: `circle(150% at 50% ${direction === 'up' ? '100%' : '0%'})`,
                        opacity: 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'linear-gradient(to top, #5227FF, #000000)',
                        pointerEvents: 'none',
                        zIndex: 9999,
                        mixBlendMode: 'overlay', // or 'hard-light' for glitch effect
                    }}
                />
            )}

            {/* Chromatic Aberration Visual Trigger */}
            {isActive && (
                <style>{`
            body {
                animation: chromatic-shake 0.5s ease-in-out forwards;
            }
            @keyframes chromatic-shake {
                0% { filter: none; }
                20% { filter: drop-shadow(-2px 0 red) drop-shadow(2px 0 cyan); transform: translateX(-1px); }
                40% { filter: drop-shadow(2px 0 red) drop-shadow(-2px 0 cyan); transform: translateX(1px); }
                60% { filter: drop-shadow(-1px 0 red) drop-shadow(1px 0 cyan); }
                100% { filter: none; }
            }
          `}</style>
            )}
        </>
    );
};

export default RippleTransition;
