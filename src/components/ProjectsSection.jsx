import { useState } from 'react'

const projectsData = {
    ai: [
        { title: 'Neural Network Visualizer', description: 'Interactive ML model visualization' },
        { title: 'NLP Sentiment Analyzer', description: 'Real-time text sentiment analysis' },
        { title: 'Computer Vision App', description: 'Object detection and tracking' }
    ],
    web: [
        { title: 'E-commerce Platform', description: 'Full-stack online marketplace' },
        { title: 'Real-time Chat App', description: 'WebSocket-based messaging' },
        { title: 'Portfolio Generator', description: 'Dynamic portfolio builder' }
    ],
    mobile: [
        { title: 'Fitness Tracker', description: 'React Native health app' },
        { title: 'AR Shopping App', description: 'Augmented reality retail' },
        { title: 'Task Manager', description: 'Cross-platform productivity' }
    ]
}

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('ai')

    return (
        <div className="canvas-wrapper" style={{ background: '#000', overflowY: 'auto' }}>
            <div className="section-content" style={{ paddingTop: '5rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Projects</h2>

                <div className="project-categories">
                    <button
                        className={`category-btn ${activeCategory === 'ai' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('ai')}
                    >
                        AI/ML
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'web' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('web')}
                    >
                        Web Dev
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'mobile' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('mobile')}
                    >
                        Mobile
                    </button>
                </div>

                <div className="project-grid">
                    {projectsData[activeCategory].map((project, index) => (
                        <div key={index} className="project-card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                                {project.title}
                            </h3>
                            <p style={{ opacity: 0.8 }}>{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
