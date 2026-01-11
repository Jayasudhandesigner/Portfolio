import { useState } from 'react'

const projectsData = {
    mlops: [
        { title: 'Clinical Trial Risk Prediction', description: 'MLOps platform achieving 85% accuracy with 3-tier risk stratification. Dockerized FastAPI service, reduced image size by 78%.' },
        { title: 'Production AI Pipelines', description: 'Real-time anomaly detection and model health dashboards for healthcare-tech clients.' }
    ],
    genai: [
        { title: 'PyGenGuard', description: 'Runtime Security Framework for LLMs enforcing intent, cost, and compliance policies.' },
        { title: 'RAG Chatbot with GROQ', description: 'High-speed RAG system using GROQ LPU for ultra-low latency inference and PDF ingestion.' }
    ],
    systems: [
        { title: 'FlixMood', description: 'Hybrid recommendation engine combining Collaborative Filtering and TF-IDF with 72%+ accuracy.' },
        { title: 'IoT Edge ML', description: 'Real-time IoT systems integrated with Machine Learning models for edge computing.' }
    ]
}

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('mlops')

    return (
        <div className="canvas-wrapper" style={{ background: '#000', overflowY: 'auto' }}>
            <div className="section-content" style={{ paddingTop: '5rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Projects</h2>

                <div className="project-categories">
                    <button
                        className={`category-btn ${activeCategory === 'mlops' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('mlops')}
                    >
                        MLOps
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'genai' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('genai')}
                    >
                        GenAI
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'systems' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('systems')}
                    >
                        AI Systems
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
