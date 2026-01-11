// Extracted from Jayasudhan AI resume.pdf
export const resumeData = {
    name: "Jayasudhan M",
    titles: [
        "AI Ops Engineer",
        "MLOps Engineer",
        "Production AI Systems"
    ],
    contact: {
        phone: "+91-9787080805",
        email: "jayasudhanmuneeswaran@gmail.com",
        location: "Coimbatore, Tamil Nadu, India"
    },
    summary: "AI Ops Engineer with 2.5+ years of experience building and operating production-grade AI systems. Proven expertise in MLOps, AI pipeline reliability, automation, and cloud-native deployment. Strong focus on clean system design, observability, cost efficiency, and real-world scalability. Experienced in healthcare AI, GenAI security, and high-throughput inference systems.",
    skills: {
        aiOpsWrapper: "AI Ops & MLOps",
        aiOps: ["Model deployment", "CI/CD for ML", "Experiment Tracking", "Drift Awareness", "Rollback-safe releases"],
        cloudWrapper: "Cloud & DevOps",
        cloud: ["Docker", "Kubernetes", "AWS (EC2, S3)", "OCI", "GitHub Actions", "Terraform"],
        backendWrapper: "Backend & APIs",
        backend: ["Python", "FastAPI", "Flask", "REST APIs", "Async & Sync Inference Services"],
        aiMlWrapper: "AI/ML",
        aiMl: ["Scikit-learn", "NLP", "RAG", "LLM Orchestration", "TF-IDF", "SVD", "Ensemble Models"],
        dataWrapper: "Data",
        data: ["Pandas", "NumPy", "Power BI", "Plotly", "MLflow"],
        governanceWrapper: "Governance",
        governance: ["GenAI governance", "Runtime policy enforcement", "Workflow automation"]
    },
    experience: [
        {
            company: "TS Techy",
            role: "AI Ops Engineer",
            period: "Oct 2023 – Present",
            details: [
                "Built and operated production-ready AI pipelines, integrating ML models into business workflows for real-world clients.",
                "Implemented experiment tracking, evaluation metrics, and deployment readiness checks across ML systems.",
                "Developed AI-driven automation, anomaly detection systems, and real-time dashboards to monitor model health.",
                "Supported healthcare-tech and IoT-ML solutions, collaborating with delivery teams to ship client-facing AI."
            ]
        },
        {
            company: "TwirlTact Technology Solutions",
            role: "IoT with ML Intern",
            period: "May 2023 – Jun 2023",
            details: [
                "Built real-time IoT systems integrated with Machine Learning models for edge computing scenarios.",
                "Implemented end-to-end data collection, preprocessing, and predictive modeling pipelines.",
                "Supported edge and cloud ML workflows using Python and microcontrollers."
            ]
        },
        {
            company: "TS Techy",
            role: "Project Manager Intern",
            period: "Aug 2023 – Oct 2023",
            details: [
                "Coordinated cross-functional AI and engineering teams using Agile practices to ensure timely delivery.",
                "Managed sprint planning, timelines, and delivery tracking, translating business requirements into technical tasks."
            ]
        },
    ],
    projects: [
        {
            title: "MLOps System for Clinical Trial Risk Prediction",
            tech: ["Python", "FastAPI", "Docker", "AWS"],
            description: "Developed an MLOps platform to predict patient dropout risk, achieving 85% accuracy with 3-tier risk stratification."
        },
        {
            title: "PyGenGuard – GenAI Runtime Security Framework",
            tech: ["GenAI Ops", "Governance"],
            description: "Designed a deterministic security layer acting as middleware between applications and LLMs."
        },
        {
            title: "FlixMood – AI Content Recommendation System",
            tech: ["Scikit-learn", "Streamlit", "SVD"],
            description: "Engineered a hybrid recommendation engine combining Collaborative Filtering and TF-IDF."
        },
        {
            title: "RAG Chatbot using GROQ",
            tech: ["LLM", "RAG", "Semantic Retrieval"],
            description: "Built a high-speed RAG system leveraging GROQ LPU for ultra-low latency inference."
        }
    ],
    education: [
        {
            institution: "Sri Krishna College of Technology",
            degree: "B.Tech in Artificial Intelligence & Data Science",
            period: "2022 – 2026"
        },
        {
            institution: "Indian Institute of Technology, Ropar",
            degree: "Minor in Artificial Intelligence",
            period: "2025 – 2026"
        }
    ],
    certifications: [
        "Oracle Cloud Infrastructure 2023: DevOps Professional",
        "Generative AI Professional",
        "Data Science Professional",
        "Confluent Certified Developer: Apache Kafka"
    ]
}
