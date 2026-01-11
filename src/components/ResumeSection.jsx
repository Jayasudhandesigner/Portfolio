export default function ResumeSection() {
    const handleDownload = () => {
        alert('Resume download would start here.')
    }

    return (
        <div
            className="canvas-wrapper"
            style={{
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="section-content">
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get My Resume</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Download my complete resume to learn more about my experience
                </p>
                <a href="/resume.pdf" download="Jayasudhan_Resume.pdf" className="download-btn" style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    textAlign: 'center',
                    lineHeight: 'initial' // Reset if needed, buttons usually center text
                }}>
                    Download Resume
                </a>
            </div>
        </div>
    )
}
