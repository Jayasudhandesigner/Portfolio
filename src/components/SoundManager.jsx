import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

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
    const bgMusicRef = useRef(null)
    const hoverSoundRef = useRef(null)
    const clickSoundRef = useRef(null)
    const scrollSoundRef = useRef(null)
    const transitionSoundRef = useRef(null)

    // Scroll throttle ref
    const lastScrollSoundTime = useRef(0)

    // Initialize audio elements
    useEffect(() => {
        // Background ambient music - using a data URI for a simple sine wave tone
        // In production, replace with actual audio files
        bgMusicRef.current = new Audio()
        bgMusicRef.current.loop = true
        bgMusicRef.current.volume = 0.15

        // Hover sound
        hoverSoundRef.current = new Audio()
        hoverSoundRef.current.volume = 0.3

        // Click sound
        clickSoundRef.current = new Audio()
        clickSoundRef.current.volume = 0.4

        // Scroll wind sound
        scrollSoundRef.current = new Audio()
        scrollSoundRef.current.volume = 0.2

        // Section transition sound
        transitionSoundRef.current = new Audio()
        transitionSoundRef.current.volume = 0.35

        // Generate procedural sounds using Web Audio API
        generateSounds()

        setIsInitialized(true)

        return () => {
            // Cleanup
            if (bgMusicRef.current) bgMusicRef.current.pause()
        }
    }, [])

    // Generate procedural sci-fi sounds using Web Audio API
    const generateSounds = useCallback(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()

        // Generate ambient drone
        const generateAmbientDrone = () => {
            const duration = 10
            const sampleRate = audioContext.sampleRate
            const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate)

            for (let channel = 0; channel < 2; channel++) {
                const data = buffer.getChannelData(channel)
                for (let i = 0; i < data.length; i++) {
                    const t = i / sampleRate
                    // Layered sine waves for ambient drone
                    const freq1 = 55 + Math.sin(t * 0.1) * 5
                    const freq2 = 82.5 + Math.sin(t * 0.15) * 3
                    const freq3 = 110 + Math.sin(t * 0.2) * 7

                    data[i] = (
                        Math.sin(2 * Math.PI * freq1 * t) * 0.3 +
                        Math.sin(2 * Math.PI * freq2 * t) * 0.2 +
                        Math.sin(2 * Math.PI * freq3 * t) * 0.15 +
                        (Math.random() - 0.5) * 0.02 // Subtle noise
                    ) * (0.3 + Math.sin(t * 0.5) * 0.1)
                }
            }
            return bufferToWav(buffer)
        }

        // Generate hover/clatter sound
        const generateHoverSound = () => {
            const duration = 0.15
            const sampleRate = audioContext.sampleRate
            const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < data.length; i++) {
                const t = i / sampleRate
                const envelope = Math.exp(-t * 20)
                // Sci-fi click/clatter
                data[i] = (
                    Math.sin(2 * Math.PI * 2000 * t) * 0.3 +
                    Math.sin(2 * Math.PI * 3500 * t) * 0.2 +
                    Math.sin(2 * Math.PI * 800 * t * (1 + t * 10)) * 0.3 +
                    (Math.random() - 0.5) * 0.1
                ) * envelope
            }
            return bufferToWav(buffer)
        }

        // Generate click sound
        const generateClickSound = () => {
            const duration = 0.1
            const sampleRate = audioContext.sampleRate
            const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < data.length; i++) {
                const t = i / sampleRate
                const envelope = Math.exp(-t * 30)
                data[i] = (
                    Math.sin(2 * Math.PI * 1500 * t) * 0.4 +
                    Math.sin(2 * Math.PI * 2200 * t) * 0.3 +
                    (Math.random() - 0.5) * 0.15
                ) * envelope
            }
            return bufferToWav(buffer)
        }

        // Generate scroll zoom sound (sci-fi zooming effect)
        const generateScrollSound = () => {
            const duration = 0.35
            const sampleRate = audioContext.sampleRate
            const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate)

            for (let channel = 0; channel < 2; channel++) {
                const data = buffer.getChannelData(channel)
                for (let i = 0; i < data.length; i++) {
                    const t = i / sampleRate
                    const progress = t / duration
                    const envelope = Math.sin(Math.PI * progress) * Math.exp(-t * 3)

                    // Zooming frequency sweep (low to high)
                    const freqStart = 150
                    const freqEnd = 800
                    const freq = freqStart + (freqEnd - freqStart) * progress

                    // Sci-fi zoom with harmonics
                    data[i] = (
                        Math.sin(2 * Math.PI * freq * t) * 0.4 +
                        Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.2 +
                        Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.15 +
                        (Math.random() - 0.5) * 0.05 // Subtle noise
                    ) * envelope * 0.6
                }
            }
            return bufferToWav(buffer)
        }

        // Generate transition whoosh sound
        const generateTransitionSound = () => {
            const duration = 0.5
            const sampleRate = audioContext.sampleRate
            const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate)

            for (let channel = 0; channel < 2; channel++) {
                const data = buffer.getChannelData(channel)
                for (let i = 0; i < data.length; i++) {
                    const t = i / sampleRate
                    const envelope = Math.sin(Math.PI * t / duration) * Math.exp(-t * 2)
                    const freqSweep = 200 + (1 - t / duration) * 1500
                    data[i] = (
                        Math.sin(2 * Math.PI * freqSweep * t) * 0.3 +
                        (Math.random() - 0.5) * 0.2 +
                        Math.sin(2 * Math.PI * 100 * t) * 0.2
                    ) * envelope
                }
            }
            return bufferToWav(buffer)
        }

        // Convert AudioBuffer to WAV blob URL
        function bufferToWav(buffer) {
            const numChannels = buffer.numberOfChannels
            const sampleRate = buffer.sampleRate
            const format = 1 // PCM
            const bitDepth = 16

            const bytesPerSample = bitDepth / 8
            const blockAlign = numChannels * bytesPerSample

            const dataLength = buffer.length * blockAlign
            const bufferLength = 44 + dataLength

            const arrayBuffer = new ArrayBuffer(bufferLength)
            const view = new DataView(arrayBuffer)

            // WAV header
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

            // Write audio data
            let offset = 44
            for (let i = 0; i < buffer.length; i++) {
                for (let ch = 0; ch < numChannels; ch++) {
                    const sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]))
                    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
                    offset += 2
                }
            }

            function writeString(view, offset, string) {
                for (let i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i))
                }
            }

            const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
            return URL.createObjectURL(blob)
        }

        // Generate and assign sounds
        try {
            bgMusicRef.current.src = generateAmbientDrone()
            hoverSoundRef.current.src = generateHoverSound()
            clickSoundRef.current.src = generateClickSound()
            scrollSoundRef.current.src = generateScrollSound()
            transitionSoundRef.current.src = generateTransitionSound()
        } catch (error) {
            console.warn('Could not generate procedural sounds:', error)
        }

        audioContext.close()
    }, [])

    // Toggle mute
    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newMuted = !prev
            if (bgMusicRef.current) {
                if (newMuted) {
                    bgMusicRef.current.pause()
                } else {
                    bgMusicRef.current.play().catch(() => { })
                }
            }
            return newMuted
        })
    }, [])

    // Play hover sound
    const playHover = useCallback(() => {
        if (!isMuted && hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0
            hoverSoundRef.current.play().catch(() => { })
        }
    }, [isMuted])

    // Play click sound
    const playClick = useCallback(() => {
        if (!isMuted && clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0
            clickSoundRef.current.play().catch(() => { })
        }
    }, [isMuted])

    // Play scroll sound (throttled)
    const playScroll = useCallback(() => {
        const now = Date.now()
        if (!isMuted && scrollSoundRef.current && now - lastScrollSoundTime.current > 300) {
            lastScrollSoundTime.current = now
            scrollSoundRef.current.currentTime = 0
            scrollSoundRef.current.play().catch(() => { })
        }
    }, [isMuted])

    // Play section transition sound
    const playTransition = useCallback(() => {
        if (!isMuted && transitionSoundRef.current) {
            transitionSoundRef.current.currentTime = 0
            transitionSoundRef.current.play().catch(() => { })
        }
    }, [isMuted])

    const value = {
        isMuted,
        isInitialized,
        toggleMute,
        playHover,
        playClick,
        playScroll,
        playTransition
    }

    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    )
}

// Mute Button Component with scroll hint
export function MuteButton() {
    const { isMuted, toggleMute } = useSound()

    return (
        <div className="sound-controls">
            <div className="scroll-discover-hint">
                Scroll down to discover.
            </div>
            <button
                className="mute-button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Turn sound on' : 'Turn sound off'}
            >
                <div className="mute-button-inner">
                    {isMuted ? (
                        // Muted icon
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        // Sound on icon
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                </div>
                <span className="mute-button-label">
                    {isMuted ? 'Sound: Off' : 'Sound: On'}
                </span>
            </button>
        </div>
    )
}

export default SoundProvider
