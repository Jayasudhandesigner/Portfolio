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
                <button className="download-btn" onClick={handleDownload}>
                    Download Resume
                </button>
            </div>
        </div>
    )
}
