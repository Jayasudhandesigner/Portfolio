import { useState, useEffect, useRef } from 'react'
import { useProgress } from '@react-three/drei'

// Indian language character sets
const INDIAN_CHARS = {
    tamil: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன',
    hindi: 'अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह',
    telugu: 'అఆఇఈఉఊఎఏఐఒఓఔకఖగఘచఛజఝటఠడఢణతథదధనపఫబభమయరలవశషసహ',
    kannada: 'ಅಆಇಈಉಊಎಏಐಒಓಔಕಖಗಘಚಛಜಝಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹ',
    malayalam: 'അആഇഈഉഊഎഏഐഒഓഔകഖഗഘചഛജഝടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹ',
    bengali: 'অআইঈউঊএঐওঔকখগঘচছজঝটঠডঢণতথদধনপফবভমযরলশষসহ',
    gujarati: 'અઆઇઈઉઊએઐઓઔકખગઘચછજઝટઠડઢણતથદધનપફબભમયરલવશષસહ',
    punjabi: 'ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਚਛਜਝਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵਸ਼ਸਹ',
    odia: 'ଅଆଇଈଉଊଏଐଓଔକଖଗଘଚଛଜଝଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଵଶଷସହ'
}

// Combine all characters
const ALL_CHARS = Object.values(INDIAN_CHARS).join('')

// Get random character from all Indian languages
const getRandomChar = () => ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]

// Get random characters array
const getRandomChars = (count) => Array(count).fill(0).map(() => getRandomChar())

// Global Preloader Component with Indian language letters
export default function GlobalPreloader({ onLoadComplete }) {
    const { active, progress } = useProgress()
    const [displayProgress, setDisplayProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [rollingChars, setRollingChars] = useState(getRandomChars(30))
    const [typedName, setTypedName] = useState('')
    const targetName = 'JAYASUDHAN M'
    const intervalRef = useRef(null)

    // Typing effect for the name
    useEffect(() => {
        let charIndex = 0
        const typeInterval = setInterval(() => {
            if (charIndex <= targetName.length) {
                setTypedName(targetName.slice(0, charIndex))
                charIndex++
            } else {
                clearInterval(typeInterval)
            }
        }, 150)

        return () => clearInterval(typeInterval)
    }, [])

    // Rolling characters effect
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRollingChars(prev => {
                const newChars = [...prev]
                // Randomly update some characters
                for (let i = 0; i < 5; i++) {
                    const randomIndex = Math.floor(Math.random() * newChars.length)
                    newChars[randomIndex] = getRandomChar()
                }
                return newChars
            })
        }, 100)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    // Real progress synchronization
    useEffect(() => {
        // We ensure display progress catches up to real progress, 
        // but not instantly to keep animations smooth
        if (progress > displayProgress) {
            const diff = progress - displayProgress
            // Jump faster if difference is large
            const step = Math.max(1, Math.ceil(diff / 10))
            const timer = setTimeout(() => {
                setDisplayProgress(prev => Math.min(prev + step, 100))
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [progress, displayProgress])

    // Completion check
    useEffect(() => {
        // Finish when progress is 100 AND not active (sometimes active toggles)
        // We'll trust 100% progress primarily
        if (displayProgress >= 100) {
            const finishTimer = setTimeout(() => {
                setIsVisible(false)
                if (onLoadComplete) onLoadComplete()
            }, 800)
            return () => clearTimeout(finishTimer)
        }
    }, [displayProgress, onLoadComplete])


    if (!isVisible) return null

    return (
        <div className={`global-preloader ${displayProgress >= 100 ? 'fade-out' : ''}`}>
            {/* Background rolling characters */}
            <div className="preloader-background-chars">
                {[...Array(8)].map((_, rowIndex) => (
                    <div key={rowIndex} className={`char-row row-${rowIndex % 2 === 0 ? 'left' : 'right'}`}>
                        {rollingChars.map((char, i) => (
                            <span
                                key={i}
                                className="bg-char"
                                style={{
                                    animationDelay: `${(i * 0.1)}s`,
                                    opacity: 0.03 + (Math.random() * 0.05)
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Center content */}
            <div className="preloader-center-content">
                {/* Rolling characters above name */}
                <div className="rolling-chars-display">
                    {rollingChars.slice(0, 12).map((char, i) => (
                        <span
                            key={i}
                            className="rolling-char"
                            style={{
                                animationDelay: `${i * 0.05}s`,
                                color: `hsl(${30 + i * 3}, 90%, ${55 + i * 2}%)`
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>

                {/* Typing name effect */}
                <div className="typing-name-container">
                    <h1 className="typing-name">
                        {typedName}
                        <span className="cursor-blink">|</span>
                    </h1>
                </div>

                {/* Subtitle with rolling letters */}
                <div className="subtitle-container">
                    <div className="subtitle-rolling">
                        {['A', 'I', ' ', 'E', 'N', 'G', 'I', 'N', 'E', 'E', 'R'].map((letter, i) => (
                            <span
                                key={i}
                                className="subtitle-letter"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {displayProgress < 50 ?
                                    (Math.random() > 0.3 ? getRandomChar() : letter) :
                                    letter
                                }
                            </span>
                        ))}
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="indian-progress">
                    <div className="progress-chars">
                        {[...Array(10)].map((_, i) => (
                            <span
                                key={i}
                                className={`progress-char ${i < Math.floor(displayProgress / 10) ? 'active' : ''}`}
                            >
                                {getRandomChar()}
                            </span>
                        ))}
                    </div>
                    <div className="progress-percent">{Math.round(displayProgress)}%</div>
                </div>

                {/* Rolling bottom characters */}
                <div className="rolling-chars-display bottom">
                    {rollingChars.slice(12, 24).map((char, i) => (
                        <span
                            key={i}
                            className="rolling-char"
                            style={{
                                animationDelay: `${i * 0.05}s`,
                                color: `hsl(${40 + i * 2}, 85%, ${50 + i * 2}%)`
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            {/* Floating language labels */}
            <div className="language-labels">
                {Object.keys(INDIAN_CHARS).map((lang, i) => (
                    <span
                        key={lang}
                        className="lang-label"
                        style={{
                            animationDelay: `${i * 0.3}s`,
                            left: `${10 + (i % 3) * 35}%`,
                            top: `${15 + Math.floor(i / 3) * 25}%`
                        }}
                    >
                        {INDIAN_CHARS[lang].slice(0, 3)}
                    </span>
                ))}
            </div>
        </div>
    )
}
