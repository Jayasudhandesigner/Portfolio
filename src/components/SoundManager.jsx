import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import sciFiClickSound from '../assets/sci-fi-click.wav'

// Sound Context for global sound management
const SoundContext = createContext(null)

// Custom hook to use sound
export const useSound = () => {
    const context = useContext(SoundContext)
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider')
    }
    return context
}

// Sound Provider Component
export function SoundProvider({ children }) {
    const [isMuted, setIsMuted] = useState(true) // Start muted, user must enable
    const [isInitialized, setIsInitialized] = useState(false)

    // Audio refs
    const clickSoundRef = useRef(null)
    const mellowTuneRef = useRef(null)
    const ambientMusicRef = useRef(null)

    // Throttle ref for mouse movement
    const lastMellowTime = useRef(0)

    // Initialize audio elements
    useEffect(() => {
        // Click sound using the wav file
        clickSoundRef.current = new Audio(sciFiClickSound)
        clickSoundRef.current.volume = 0.5

        // Generate mellow tune for mouse movement
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()

        const generateMellowTune = () => {
            const duration = 0.3
            const sampleRate = audioContext.sampleRate
            const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate)

            for (let channel = 0; channel < 2; channel++) {
                const data = buffer.getChannelData(channel)
                for (let i = 0; i < data.length; i++) {
                    const t = i / sampleRate
                    const progress = t / duration
                    // Soft, warm envelope
                    const envelope = Math.sin(Math.PI * progress) * Math.exp(-t * 4)

                    // Mellow harmonic tones (soft piano-like)
                    const note1 = Math.sin(2 * Math.PI * 440 * t) * 0.2  // A4
                    const note2 = Math.sin(2 * Math.PI * 554 * t) * 0.15 // C#5
                    const note3 = Math.sin(2 * Math.PI * 659 * t) * 0.1  // E5
                    // Soft sub harmonic for warmth
                    const sub = Math.sin(2 * Math.PI * 220 * t) * 0.1

                    data[i] = (note1 + note2 + note3 + sub) * envelope * 0.4
                }
            }

            // Convert to WAV blob URL
            const numChannels = buffer.numberOfChannels
            const format = 1
            const bitDepth = 16
            const bytesPerSample = bitDepth / 8
            const blockAlign = numChannels * bytesPerSample
            const dataLength = buffer.length * blockAlign
            const bufferLength = 44 + dataLength

            const arrayBuffer = new ArrayBuffer(bufferLength)
            const view = new DataView(arrayBuffer)

            const writeString = (view, offset, string) => {
                for (let i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i))
                }
            }

            writeString(view, 0, 'RIFF')
            view.setUint32(4, 36 + dataLength, true)
            writeString(view, 8, 'WAVE')
            writeString(view, 12, 'fmt ')
            view.setUint32(16, 16, true)
            view.setUint16(20, format, true)
            view.setUint16(22, numChannels, true)
            view.setUint32(24, sampleRate, true)
            view.setUint32(28, sampleRate * blockAlign, true)
            view.setUint16(32, blockAlign, true)
            view.setUint16(34, bitDepth, true)
            writeString(view, 36, 'data')
            view.setUint32(40, dataLength, true)

            let offset = 44
            for (let i = 0; i < buffer.length; i++) {
                for (let ch = 0; ch < numChannels; ch++) {
                    const sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]))
                    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
                    offset += 2
                }
            }

            const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
            return URL.createObjectURL(blob)
        }

        try {
            mellowTuneRef.current = new Audio(generateMellowTune())
            mellowTuneRef.current.volume = 0.25
        } catch (error) {
            console.warn('Could not generate mellow tune:', error)
        }

        // Generate ambient background music (longer looping drone)
        const generateAmbientMusic = () => {
            const duration = 8 // 8 seconds loop
            const sampleRate = 44100
            const tempContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate })
            const buffer = tempContext.createBuffer(2, sampleRate * duration, sampleRate)

            for (let channel = 0; channel < 2; channel++) {
                const data = buffer.getChannelData(channel)
                for (let i = 0; i < data.length; i++) {
                    const t = i / sampleRate
                    const progress = t / duration

                    // Slow evolving envelope for seamless loop
                    const loopEnv = 0.5 + 0.5 * Math.sin(2 * Math.PI * progress)

                    // Deep ambient layers
                    const warmth = Math.sin(2 * Math.PI * 65 * t) * 0.15
                    const drone = Math.sin(2 * Math.PI * 130 * t * (1 + Math.sin(t * 0.2) * 0.02)) * 0.12
                    const shimmer = Math.sin(2 * Math.PI * 260 * t * (1 + Math.sin(t * 0.3) * 0.01)) * 0.08
                    const sparkle = Math.sin(2 * Math.PI * 520 * t) * 0.04 * (0.5 + 0.5 * Math.sin(t * 0.5))

                    // Slow modulation for movement
                    const lfo = Math.sin(2 * Math.PI * 0.1 * t)
                    const pad = Math.sin(2 * Math.PI * (196 + lfo * 5) * t) * 0.06

                    data[i] = (warmth + drone + shimmer + sparkle + pad) * loopEnv * 0.4
                }
            }

            // Convert to WAV
            const numChannels = buffer.numberOfChannels
            const format = 1
            const bitDepth = 16
            const bytesPerSample = bitDepth / 8
            const blockAlign = numChannels * bytesPerSample
            const dataLength = buffer.length * blockAlign
            const bufferLength = 44 + dataLength

            const arrayBuffer = new ArrayBuffer(bufferLength)
            const view = new DataView(arrayBuffer)

            const writeStr = (v, o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)) }
            writeStr(view, 0, 'RIFF')
            view.setUint32(4, 36 + dataLength, true)
            writeStr(view, 8, 'WAVE')
            writeStr(view, 12, 'fmt ')
            view.setUint32(16, 16, true)
            view.setUint16(20, format, true)
            view.setUint16(22, numChannels, true)
            view.setUint32(24, sampleRate, true)
            view.setUint32(28, sampleRate * blockAlign, true)
            view.setUint16(32, blockAlign, true)
            view.setUint16(34, bitDepth, true)
            writeStr(view, 36, 'data')
            view.setUint32(40, dataLength, true)

            let offset = 44
            for (let i = 0; i < buffer.length; i++) {
                for (let ch = 0; ch < numChannels; ch++) {
                    const sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]))
                    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
                    offset += 2
                }
            }

            tempContext.close()
            const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
            return URL.createObjectURL(blob)
        }

        try {
            ambientMusicRef.current = new Audio(generateAmbientMusic())
            ambientMusicRef.current.volume = 0.15
            ambientMusicRef.current.loop = true
        } catch (error) {
            console.warn('Could not generate ambient music:', error)
        }

        audioContext.close()
        setIsInitialized(true)

        return () => {
            if (clickSoundRef.current) {
                clickSoundRef.current.pause()
                clickSoundRef.current = null
            }
            if (mellowTuneRef.current) {
                mellowTuneRef.current.pause()
                mellowTuneRef.current = null
            }
            if (ambientMusicRef.current) {
                ambientMusicRef.current.pause()
                ambientMusicRef.current = null
            }
        }
    }, [])

    // Toggle mute and control ambient music
    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newMuted = !prev
            if (ambientMusicRef.current) {
                if (newMuted) {
                    ambientMusicRef.current.pause()
                } else {
                    ambientMusicRef.current.play().catch(() => { })
                }
            }
            return newMuted
        })
    }, [])

    // Play click sound (only for actual clicks)
    const playClick = useCallback(() => {
        if (!isMuted && clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0
            clickSoundRef.current.play().catch(() => { })
        }
    }, [isMuted])

    // Play mellow tune on mouse movement (throttled)
    const playMouseMove = useCallback((speed = 1) => {
        const now = Date.now()
        // Only play if enough time has passed (200ms) and moving fast enough
        if (!isMuted && mellowTuneRef.current && speed > 8 && now - lastMellowTime.current > 200) {
            lastMellowTime.current = now
            mellowTuneRef.current.volume = Math.min(0.3, 0.1 + speed * 0.01)
            mellowTuneRef.current.currentTime = 0
            mellowTuneRef.current.play().catch(() => { })
        }
    }, [isMuted])

    const value = {
        isMuted,
        isInitialized,
        toggleMute,
        playHover: () => { },       // Disabled
        playClick,                  // Only clicks play sound
        playScroll: () => { },       // Disabled
        playTransition: () => { },   // Disabled
        playMouseWind: playMouseMove // Mellow tune on mouse movement
    }

    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    )
}

// Mute/Unmute Button Component
export function MuteButton() {
    const { isMuted, toggleMute } = useSound()

    return (
        <button
            onClick={toggleMute}
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isMuted ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)',
                border: `2px solid ${isMuted ? '#ff4444' : '#44ff44'}`,
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)'
            }}
            title={isMuted ? 'Enable Sound' : 'Mute Sound'}
        >
            {isMuted ? '🔇' : '🔊'}
        </button>
    )
}
