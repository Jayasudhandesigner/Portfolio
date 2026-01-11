import { useState, useEffect, useCallback, useRef } from 'react'

// 20 Different BUZZING STATIC ELECTRIC Sound Generators
const soundGenerators = {
    // 1. Electric Zap - Sharp electric discharge
    electricZap: (audioContext) => {
        const duration = 0.1
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 35) * (1 - Math.exp(-t * 800))
            const crackle = (Math.random() - 0.5) * 0.5 * Math.exp(-t * 40)
            data[i] = (Math.sin(2 * Math.PI * 2000 * t) * 0.4 + crackle) * envelope
        }
        return buffer
    },

    // 2. Static Burst - White noise burst with decay
    staticBurst: (audioContext) => {
        const duration = 0.12
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 25)
            data[i] = (Math.random() - 0.5) * envelope * 0.7
        }
        return buffer
    },

    // 3. Power Surge - Electrical power fluctuation
    powerSurge: (audioContext) => {
        const duration = 0.15
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.sin(Math.PI * t / duration) * Math.exp(-t * 10)
            const buzz = Math.sin(2 * Math.PI * 60 * t) * 0.5
            const harmonic = Math.sin(2 * Math.PI * 120 * t) * 0.3
            const static_ = (Math.random() - 0.5) * 0.2
            data[i] = (buzz + harmonic + static_) * envelope
        }
        return buffer
    },

    // 4. Circuit Fry - Electronic malfunction
    circuitFry: (audioContext) => {
        const duration = 0.18
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 15)
            const sizzle = (Math.random() - 0.5) * 0.4
            const glitch = Math.sin(2 * Math.PI * (2000 + Math.random() * 1000) * t) * 0.3
            data[i] = (sizzle + glitch) * envelope
        }
        return buffer
    },

    // 5. High Voltage - Dangerous electrical sound
    highVoltage: (audioContext) => {
        const duration = 0.12
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 20) * (1 - Math.exp(-t * 300))
            const buzz = Math.sin(2 * Math.PI * 100 * t) * 0.4
            const arc = Math.sin(2 * Math.PI * 3000 * t * (1 + Math.sin(t * 200) * 0.3)) * 0.3
            const crackle = (Math.random() - 0.5) * 0.3 * (Math.random() > 0.7 ? 1 : 0)
            data[i] = (buzz + arc + crackle) * envelope
        }
        return buffer
    },

    // 6. Spark Crackle - Electrical spark sound
    sparkCrackle: (audioContext) => {
        const duration = 0.08
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 50)
            const pop = (Math.random() > 0.8 ? (Math.random() - 0.5) * 0.8 : 0)
            const hiss = (Math.random() - 0.5) * 0.4
            data[i] = (pop + hiss + Math.sin(2 * Math.PI * 4000 * t) * 0.2) * envelope
        }
        return buffer
    },

    // 7. Tesla Coil - Iconic electric arc
    teslaCoil: (audioContext) => {
        const duration = 0.2
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 12)
            const base = Math.sin(2 * Math.PI * 50 * t) * 0.3
            const arc = Math.sin(2 * Math.PI * 800 * t * (1 + Math.sin(t * 100) * 0.5)) * 0.3
            const crackle = (Math.random() - 0.5) * 0.4 * envelope
            data[i] = (base + arc + crackle) * envelope
        }
        return buffer
    },

    // 8. Arc Welder - Industrial electric arc
    arcWelder: (audioContext) => {
        const duration = 0.15
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 18)
            const buzz = Math.sin(2 * Math.PI * 120 * t) * 0.4
            const sizzle = (Math.random() - 0.5) * 0.5
            data[i] = (buzz + sizzle) * envelope
        }
        return buffer
    },

    // 9. Short Circuit - Electrical failure
    shortCircuit: (audioContext) => {
        const duration = 0.1
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 30) * (1 - Math.exp(-t * 500))
            const pop = (t < 0.02) ? (Math.random() - 0.5) * 0.8 : 0
            const fizzle = (Math.random() - 0.5) * 0.3 * Math.exp(-t * 50)
            data[i] = (pop + fizzle + Math.sin(2 * Math.PI * 1500 * t) * 0.2) * envelope
        }
        return buffer
    },

    // 10. Transformer Hum - Electrical transformer buzz
    transformerHum: (audioContext) => {
        const duration = 0.18
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 12)
            data[i] = (Math.sin(2 * Math.PI * 60 * t) * 0.4 + Math.sin(2 * Math.PI * 120 * t) * 0.3 + Math.sin(2 * Math.PI * 180 * t) * 0.2 + Math.sin(2 * Math.PI * 240 * t) * 0.1) * envelope
        }
        return buffer
    },

    // 11. Neon Buzz - Neon sign flicker
    neonBuzz: (audioContext) => {
        const duration = 0.12
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 20)
            const flicker = (Math.random() > 0.9 ? 0.5 : 1)
            data[i] = (Math.sin(2 * Math.PI * 120 * t) * 0.3 + Math.sin(2 * Math.PI * 240 * t) * 0.2 + (Math.random() - 0.5) * 0.15) * envelope * flicker
        }
        return buffer
    },

    // 12. Interference - Radio/TV static interference
    interference: (audioContext) => {
        const duration = 0.15
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 15)
            const static_ = (Math.random() - 0.5) * 0.5
            const tone = Math.sin(2 * Math.PI * 1000 * t * (1 + Math.sin(t * 50) * 0.2)) * 0.2
            data[i] = (static_ + tone) * envelope
        }
        return buffer
    },

    // 13. Radio Static - Old radio tuning static
    radioStatic: (audioContext) => {
        const duration = 0.14
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 18)
            const carrier = Math.sin(2 * Math.PI * 500 * t) * 0.2
            const noise = (Math.random() - 0.5) * 0.5
            data[i] = (carrier * (1 + noise * 0.5) + noise * 0.3) * envelope
        }
        return buffer
    },

    // 14. Wire Sizzle - Hot wire touching
    wireSizzle: (audioContext) => {
        const duration = 0.2
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 10)
            const sizzle = (Math.random() - 0.5) * 0.6
            const lowBuzz = Math.sin(2 * Math.PI * 80 * t) * 0.2
            data[i] = (sizzle + lowBuzz) * envelope
        }
        return buffer
    },

    // 15. Plasma Arc - Plasma cutter sound
    plasmaArc: (audioContext) => {
        const duration = 0.15
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 15) * (1 - Math.exp(-t * 200))
            const arc = Math.sin(2 * Math.PI * 2500 * t * (1 + Math.sin(t * 150) * 0.3)) * 0.4
            const hiss = (Math.random() - 0.5) * 0.4
            data[i] = (arc + hiss) * envelope
        }
        return buffer
    },

    // 16. Capacitor Pop - Capacitor discharge
    capacitorPop: (audioContext) => {
        const duration = 0.08
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 60)
            const pop = (t < 0.01) ? 0.8 : 0
            const ring = Math.sin(2 * Math.PI * 300 * t) * Math.exp(-t * 80) * 0.4
            const static_ = (Math.random() - 0.5) * 0.3 * Math.exp(-t * 50)
            data[i] = (pop + ring + static_) * envelope
        }
        return buffer
    },

    // 17. Live Wire - Exposed wire sparking
    liveWire: (audioContext) => {
        const duration = 0.18
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 12)
            const buzz = Math.sin(2 * Math.PI * 60 * t) * 0.35
            const spark = (Math.random() > 0.95 ? (Math.random() - 0.5) * 0.6 : 0)
            const crackle = (Math.random() - 0.5) * 0.25
            data[i] = (buzz + spark + crackle) * envelope
        }
        return buffer
    },

    // 18. Static Shock - Electrostatic discharge
    staticShock: (audioContext) => {
        const duration = 0.06
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 80)
            const snap = (t < 0.005) ? 0.9 : 0
            const crackle = (Math.random() - 0.5) * 0.5 * Math.exp(-t * 100)
            data[i] = (snap + crackle) * envelope
        }
        return buffer
    },

    // 19. Bug Zapper - Electric insect zapper
    bugZapper: (audioContext) => {
        const duration = 0.1
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 25) * (1 - Math.exp(-t * 500))
            const zap = Math.sin(2 * Math.PI * 3000 * t) * 0.3
            const buzz = Math.sin(2 * Math.PI * 120 * t) * 0.3
            const crackle = (Math.random() - 0.5) * 0.4 * Math.exp(-t * 30)
            data[i] = (zap + buzz + crackle) * envelope
        }
        return buffer
    },

    // 20. Electric Fence - Fence pulse sound
    electricFence: (audioContext) => {
        const duration = 0.12
        const sampleRate = audioContext.sampleRate
        const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate
            const envelope = Math.exp(-t * 20) * (1 - Math.exp(-t * 400))
            const tick = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 40) * 0.4
            const buzz = Math.sin(2 * Math.PI * 60 * t) * 0.3
            const static_ = (Math.random() - 0.5) * 0.3
            data[i] = (tick + buzz + static_) * envelope
        }
        return buffer
    }
}

const soundNames = {
    electricZap: "1. Electric Zap",
    staticBurst: "2. Static Burst",
    powerSurge: "3. Power Surge",
    circuitFry: "4. Circuit Fry",
    highVoltage: "5. High Voltage",
    sparkCrackle: "6. Spark Crackle",
    teslaCoil: "7. Tesla Coil",
    arcWelder: "8. Arc Welder",
    shortCircuit: "9. Short Circuit",
    transformerHum: "10. Transformer Hum",
    neonBuzz: "11. Neon Buzz",
    interference: "12. Interference",
    radioStatic: "13. Radio Static",
    wireSizzle: "14. Wire Sizzle",
    plasmaArc: "15. Plasma Arc",
    capacitorPop: "16. Capacitor Pop",
    liveWire: "17. Live Wire",
    staticShock: "18. Static Shock",
    bugZapper: "19. Bug Zapper",
    electricFence: "20. Electric Fence"
}

export default function SoundSelector({ onSelectSound, onClose }) {
    const [selectedSound, setSelectedSound] = useState(null)
    const audioContextRef = useRef(null)

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [])

    const playSound = useCallback((soundKey) => {
        if (!audioContextRef.current) return

        const buffer = soundGenerators[soundKey](audioContextRef.current)
        const source = audioContextRef.current.createBufferSource()
        const gainNode = audioContextRef.current.createGain()

        source.buffer = buffer
        gainNode.gain.value = 0.5
        source.connect(gainNode)
        gainNode.connect(audioContextRef.current.destination)
        source.start()
    }, [])

    const handleSelect = (soundKey) => {
        setSelectedSound(soundKey)
        playSound(soundKey)
    }

    const handleConfirm = () => {
        if (selectedSound && onSelectSound) {
            onSelectSound(selectedSound, soundGenerators[selectedSound])
        }
    }

    return (
        <div className="sound-selector-overlay">
            <div className="sound-selector-modal">
                <div className="sound-selector-header">
                    <h2>🔊 Select Click Sound</h2>
                    <p>Click on any sound to preview, then confirm your selection</p>
                </div>

                <div className="sound-grid">
                    {Object.keys(soundGenerators).map((key) => (
                        <button
                            key={key}
                            className={`sound-option ${selectedSound === key ? 'selected' : ''}`}
                            onClick={() => handleSelect(key)}
                        >
                            <span className="sound-icon">🔈</span>
                            <span className="sound-name">{soundNames[key]}</span>
                        </button>
                    ))}
                </div>

                <div className="sound-selector-footer">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn-confirm"
                        onClick={handleConfirm}
                        disabled={!selectedSound}
                    >
                        Confirm Selection
                    </button>
                </div>
            </div>
        </div>
    )
}

// Export the generators for use in SoundManager
export { soundGenerators, soundNames }
