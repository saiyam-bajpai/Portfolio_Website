import type { ProfileData, ProjectDetail, SkillCategory, EducationItem, HackathonAchievement } from '../types'

export const profileData: ProfileData = {
  brandMark: 'Saiyam-Bajpai',
  fullName: 'Saiyam Bajpai',
  headline: 'Undergraduate in Computer Science & Data Science',
  editorialQuote: 'Bridging real-time perception with explainable AI and deterministic safety boundaries.',
  location: 'Gwalior, Madhya Pradesh, India',
  coordinates: '26.2183° N, 78.1828° E',
  email: 'saiyam.bajpai.code@gmail.com',
  phone: {
    number: '+91 8964045669',
    isPublic: false, // Phone is kept confidential per contract; not clickable tel: unless approved
  },
  githubUrl: 'https://github.com/saiyam-bajpai',
  linkedinUrl: 'https://linkedin.com/in/saiyam-bajpai',
  resumePath: '/Resume_2026.pdf',
  headshotPath: '/headshot.png',
  currentYear: 2026,
  domain: 'https://saiyam-bajpai.github.io',
}

export const primaryProjects: ProjectDetail[] = [
  {
    slug: 'roadwatch-ai',
    title: 'RoadWatch AI — Pothole Detection Model',
    subtitle: 'YOLOv8-based computer vision pipeline for real-time road hazard localization.',
    tag: 'CV // REAL-TIME PERCEPTION',
    category: 'Computer Vision',
    isFeatured: true,
    isCertified: false,
    timeline: 'Dec 2025 – Mar 2026',
    role: 'Core ML Engineer',
    teamContext: 'Team Hackathon Contribution',
    problemStatement:
      'Road surface degradation directly threatens vehicular safety and public transit infrastructure. Automated detection in unconstrained field imagery is complicated by harsh specular lighting, tree shadows, varied asphalt textures, and motion blur. Existing solutions often rely on prohibitive sensor hardware or high-latency cloud models unsuitable for moving vehicles.',
    implementation: [
      'Engineered an automated preprocessing and augmentation pipeline using OpenCV and NumPy, expanding raw asphalt captures into a balanced training set of 20,000 images with synthetic lighting, contrast adjustments, and geometric affine perturbations.',
      'Trained and optimized a YOLOv8 object detection model on Google Colab T4 GPU instances using the Ultralytics framework.',
      'Systematically calibrated hyperparameter distributions, tuning anchor box priors, warmup learning rates, and CIoU + Distribution Focal Loss (DFL) weights to penalize false alarms on asphalt shadows.',
      'Exported model weights for inference testing on held-out road image batches.',
    ],
    evidence: [
      { metric: 'Precision', value: '75.9%', description: 'Measured across unseen validation batches through hyperparameter tuning.' },
      { metric: 'Recall', value: '68.4%', description: 'High sensitivity maintained across varied surface textures and lighting.' },
      { metric: 'mAP@50', value: '0.75', description: 'Mean Average Precision at IoU threshold 0.50.' },
      { metric: 'Dataset', value: '20,000 Frames', description: 'Preprocessed and augmented road-damage imagery.' },
    ],
    limitations: [
      'Inference accuracy drops under zero-illumination night conditions without active vehicle headlight beams.',
      'Benchmarks reflect validation image batches; real-time video streaming latency on edge dashboard compute (e.g. Jetson Nano) remains to be measured in field vehicles.',
    ],
    nextSteps: [
      'Quantize weights to INT8 via TensorRT and ONNX Runtime to support embedded vehicular hardware.',
      'Integrate automated telemetry dispatch to log detected damage coordinates to municipal repair dashboards.',
    ],
    repoUrl: 'https://github.com/saiyam-bajpai/Pothole-Detection-Model-for-RoadWatch-AI',
    repoStatus: 'public',
    techStack: ['Python', 'YOLOv8', 'Ultralytics', 'OpenCV', 'NumPy', 'Google Colab T4'],
    verificationStatus: 'verified_fact',
  },
  {
    slug: 'finca-xai',
    title: 'FinCA XAI — Credit Risk Intelligence',
    subtitle: 'Machine learning credit scoring platform with SHAP explainability to eliminate algorithmic bias.',
    tag: 'XAI // RESPONSIBLE MODELING',
    category: 'Explainable AI',
    isFeatured: true,
    isCertified: false,
    timeline: 'Aug 2026 – Present',
    role: 'Lead Developer',
    problemStatement:
      'Conventional credit scoring algorithms operate as opaque black boxes. In addition to creating regulatory compliance hurdles, unexplainable models risk codifying socio-demographic biases, denying creditworthy applicants without providing actionable criteria or transparency on why an assessment was made.',
    implementation: [
      'Constructed a predictive credit scoring pipeline in Scikit-Learn utilizing ensemble decision models constrained against non-causal demographic proxy variables.',
      'Integrated TreeSHAP (SHapley Additive exPlanations) to decompose individual credit risk predictions into exact marginal feature contributions.',
      'Engineered institutional reviewer dashboards that render positive and negative feature attributions alongside financial eligibility calculators.',
      'Designed audit interfaces enabling credit officers to evaluate whether loan criteria adhere to fair lending standards.',
    ],
    evidence: [
      { metric: 'Attribution Fidelity', value: '100% SHAP', description: 'Deconstructs every decision into exact mathematical feature attributions.' },
      { metric: 'Bias Elimination', value: 'Proxy Audit', description: 'Explicit removal of non-causal demographic proxies from model inputs.' },
      { metric: 'Review Tooling', value: 'Live Dashboards', description: 'Combined risk prediction with institutional review calculators.' },
    ],
    limitations: [
      'The current codebase is in active private development; repository link is available on request.',
      'Model evaluation was performed on standard credit risk benchmarks; core integration with institutional banking ledgers is planned.',
    ],
    nextSteps: [
      'Implement counterfactual generation ("What minimal metric adjustments result in an approved status?").',
      'Conduct formal fairness auditing using demographic parity and equalized odds benchmarks.',
    ],
    repoStatus: 'pending_user_verification',
    techStack: ['Python', 'Scikit-Learn', 'SHAP', 'NumPy', 'Pandas', 'Risk Modeling'],
    verificationStatus: 'verified_fact',
  },
  {
    slug: 'sasti-dawai-aayu',
    title: 'Sasti Dawai — Medicine Packaging ML & Deterministic Matcher',
    subtitle: 'Vision-based strip extraction and deterministic equivalence engine for generic substitution.',
    tag: 'DETERMINISTIC AI // AAYU 2026',
    category: 'Deterministic Systems',
    isFeatured: true,
    isCertified: true,
    timeline: 'AAYU 2026 Hackathon',
    role: 'ML Subsystem Lead',
    teamContext: 'Team of 3 (Frontend, FastAPI Backend, ML Subsystem)',
    problemStatement:
      'Indian medicine packaging presents dense, tiny typography and non-standardized salt nomenclature. Probabilistic language models hallucinate generic substitutes when given medicine images, presenting critical safety hazards. A strict architectural separation is required where computer vision reads and deterministic code decides.',
    implementation: [
      'Formulated the core architectural principle: "AI reads. Verified data checks. Deterministic code decides."',
      'Implemented an image-quality gate that rejects unreadable captures based on Laplacian variance (blur < 100), brightness thresholds (40–235), and glare pixel saturation (>15% at 250+).',
      'Constructed a provider-agnostic extraction interface with strict Pydantic v2 validation contracts where uncertain or unreadable fields remain null.',
      'Engineered a multi-image reconciliation pipeline that flags contradictions across front and back strip captures.',
      'Built a canonical normalization layer mapping brand names, active ingredient salts, strengths, units, and release forms (SR, ER, XR).',
      'Developed a deterministic equivalence matcher that cross-references the Jan Aushadhi / PMBJP catalogue to output EXACT, CLOSE, or NONE tiers without probabilistic hallucination.',
    ],
    evidence: [
      { metric: 'Hackathon Award', value: 'Certified', description: 'AAYU 2026 Hackathon verified team contribution.' },
      { metric: 'Architecture', value: 'Fail-Closed', description: 'Zero unverified generic matches authorized by AI probability.' },
      { metric: 'Image Quality Gate', value: '3-Way Check', description: 'Hardware-agnostic filtering for blur, extreme brightness, and glare.' },
      { metric: 'Matcher Rules', value: '3 Tiers', description: 'Deterministic EXACT, CLOSE, or NONE classification.' },
    ],
    limitations: [
      'Current unit and integration test fixtures operate against a mock vision extractor; cloud OCR vision provider integration is in progress.',
      'End-to-end live public /v1/scan endpoint and golden evaluation on 100 real packaging photos are pending final backend synchronization.',
    ],
    nextSteps: [
      'Integrate live OCR cross-checking model (PaddleOCR / Vision Transformer).',
      'Incorporate physical 1D barcode and 2D GS1 DataMatrix decoding to corroborate physical packaging text.',
    ],
    repoUrl: 'https://github.com/saiyam-bajpai/medicine-intelligence-ml',
    repoStatus: 'in_progress',
    techStack: ['Python', 'Pydantic v2', 'OpenCV', 'RapidFuzz', 'SQLite', 'FastAPI', 'pytest'],
    verificationStatus: 'mock_tested_offline',
  },
  {
    slug: 'gestureflow',
    title: 'GestureFlow — Vision-Driven System Controller',
    subtitle: 'Real-time hands-free computer control scaling from terminal CLI to web-enabled vision application.',
    tag: 'HCI // VISION INTERFACE',
    category: 'HCI & Vision',
    isFeatured: true,
    isCertified: false,
    timeline: 'Feb 2026 – June 2026',
    role: 'Solo Developer',
    problemStatement:
      'Touchless computer interaction typically relies on expensive specialized peripheral hardware (infrared sensors or depth cameras) or suffers from high latency that breaks natural user interactions. A lightweight, commodity-camera solution is needed for accessible local desktop execution.',
    implementation: [
      'Utilized MediaPipe Hand landmark pipeline to stream and track 21 3D hand coordinates in real time from standard consumer webcams.',
      'Designed spatial vector calculations in OpenCV and NumPy to translate dynamic finger distances and gestures into OS-level scrolling, volume, and brightness adjustments.',
      'Iterated across 6 documented releases, scaling from an initial terminal CLI daemon (v1–v5) to a modular web-enabled application (v6).',
      'Configured local deployment for Windows environments without requiring external drivers or proprietary sensor hardware.',
    ],
    evidence: [
      { metric: 'Architecture', value: '6 Iterations', description: 'Documented progression from CLI daemon v1 to web app v6.' },
      { metric: 'Hardware', value: 'Zero Sensor Dept', description: 'Operates on standard consumer webcams without specialized hardware.' },
      { metric: 'Tracking Target', value: '21 Landmarks', description: 'Real-time 3D coordinate estimation per hand.' },
    ],
    limitations: [
      'Hand landmark tracking can suffer from occasional jitter in low-light environments or rapid off-axis motions.',
      'Public repository link is pending final code cleanup.',
    ],
    nextSteps: [
      'Implement temporal Kalman filtering to smooth landmark tracking trajectories.',
      'Expand gesture lexicon to support customized user-defined macro shortcuts.',
    ],
    repoStatus: 'pending_user_verification',
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'Git'],
    verificationStatus: 'verified_fact',
  },
  {
    slug: 'queueless-bharat',
    title: 'QueueLess Bharat — Automated Queue Intelligence',
    subtitle: 'Computer vision and ML pipeline for real-time public queue management and bottleneck elimination.',
    tag: 'APPLIED ML // HACKATHON 2026',
    category: 'Applied ML',
    isFeatured: true,
    isCertified: true,
    timeline: 'National Summer Hackathon SkillStation 2026',
    role: 'Machine Learning Lead',
    teamContext: 'Team of 4',
    problemStatement:
      'Unmonitored human congestion at public infrastructure counters results in extreme wait times, inefficient staff allocation, and a complete absence of real-time crowd flow transparency.',
    implementation: [
      'Led the 4-member machine learning team at National Summer Hackathon SkillStation 2026.',
      'Trained and deployed the core computer vision pipeline to estimate counter queue lengths, service throughput rates, and bottleneck risks.',
      'Integrated live pipeline telemetry with queue management dashboard interfaces to notify supervisors of counter delays.',
    ],
    evidence: [
      { metric: 'Achievement', value: 'Certified Lead', description: 'ML Lead for National Summer Hackathon SkillStation 2026.' },
      { metric: 'Team Scope', value: 'Team of 4', description: 'Coordinated end-to-end ML data pipelines with backend developers.' },
      { metric: 'Focus', value: 'Automated ML', description: 'Computer vision queue-management pipeline.' },
    ],
    limitations: [
      'Developed and demonstrated under intense hackathon sprint deadlines.',
      'Continuous multi-camera re-identification requires high-density hardware testing in production environments.',
    ],
    nextSteps: [
      'Introduce edge-based facial blurring to guarantee user privacy at public counters.',
      'Deploy on low-power edge gateways (Raspberry Pi / NVIDIA Jetson).',
    ],
    repoStatus: 'private',
    techStack: ['Python', 'Computer Vision', 'Applied ML', 'OpenCV', 'Scikit-Learn'],
    verificationStatus: 'verified_fact',
  },
]

export const secondaryProjects = [
  {
    title: 'StreamX — RTMP Streaming Server',
    domain: 'Personal Live Video Streaming Server',
    tech: 'HTML, JavaScript, C++, OBS/RTMP',
    description: 'Personal streaming server enabling live video feed broadcast from OBS or RTMP encoders to any web browser. Built as a hands-on exploration of multimedia transport protocols.',
    repoUrl: 'https://github.com/saiyam-bajpai/StreamX---RTMP-Server',
    scope: 'Exploratory Systems Utility',
  },
  {
    title: 'DEAD-END — 3D Maze Game',
    domain: 'Computer Graphics Coursework Project',
    tech: 'C++, OpenGL, SDL2',
    description: 'A 3D maze game built from scratch in C++ to understand graphics rendering pipelines, transformation matrices, and game loop architecture. Kept as an academic foundational milestone.',
    repoUrl: 'https://github.com/saiyam-bajpai/DEAD-END---Think-Before-You-Turn',
    scope: 'Academic Graphics Coursework',
  },
  {
    title: 'HybridSN Lightweight Models',
    domain: 'Efficient Hyperspectral CNN Architecture',
    tech: 'Python, PyTorch / CNN, 3D+2D Convolution',
    description: 'Research implementation developing parameter-efficient variants of the HybridSN architecture, reducing redundant parameters while preserving hybrid 3D+2D feature extraction.',
    repoUrl: 'https://github.com/saiyam-bajpai/HybridSN_Lightweight_Models',
    scope: 'ML Research Exploration',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    title: '01. Computer Vision & Perception',
    description: 'Real-time spatial localization, video stream tracking, and image preprocessing.',
    items: ['YOLOv8 & Ultralytics', 'OpenCV', 'MediaPipe', 'Object Detection', 'Dataset Augmentation', 'Colab T4 Hardware Acceleration'],
  },
  {
    title: '02. Machine Learning & Explainable AI',
    description: 'Supervised modeling, mathematical feature attributions, and risk intelligence.',
    items: ['Scikit-Learn', 'SHAP (SHapley Additive exPlanations)', 'Risk Modeling', 'NumPy', 'Pandas', 'Matplotlib', 'RapidFuzz'],
  },
  {
    title: '03. Deterministic Safety & Backend',
    description: 'Contract-driven data validation, fail-closed matching, and service APIs.',
    items: ['Pydantic v2', 'FastAPI', 'Flask', 'SQLite & SQLAlchemy', 'MongoDB', 'Node.js', 'Docker', 'Git'],
  },
  {
    title: '04. Programming Languages & Foundations',
    description: 'Core languages used across production systems and academic coursework.',
    items: ['Python (Primary)', 'C/C++', 'SQL', 'JavaScript & TypeScript', 'HTML5 & CSS3', 'Object-Oriented Design'],
  },
]

export const educationHistory: EducationItem[] = [
  {
    institution: 'Madhav Institute of Technology and Science (MITS), Gwalior',
    degree: 'B.Tech in Computer Science and Design (Minor in Design)',
    timeline: 'August 2025 – August 2029',
    status: 'In Progress (Active Undergraduate)',
    location: 'Gwalior, Madhya Pradesh',
    focus: 'Core computer science, systems engineering, design principles, algorithm design, and human-computer interfaces.',
  },
  {
    institution: 'Indian Institute of Technology (IIT), Madras',
    degree: 'BS in Data Science and Applications (Remote)',
    timeline: 'August 2026 – May 2030',
    status: 'In Progress (Active Undergraduate)',
    location: 'Chennai, Tamil Nadu (Remote Track)',
    focus: 'Rigorous mathematical foundations, statistical learning, data analysis, and scalable machine learning theory.',
  },
]

export const hackathonAchievements: HackathonAchievement[] = [
  {
    name: 'National Summer Hackathon SkillStation 2026',
    project: 'QueueLess Bharat',
    role: 'Machine Learning Lead (Team of 4)',
    year: '2026',
    certified: true,
    description: 'Trained the core machine learning pipeline to automate queue length estimation and throughput tracking at public service counters.',
  },
  {
    name: 'AAYU 2026 Hackathon',
    project: 'Sasti Dawai',
    role: 'Machine Learning Subsystem Lead (Team of 3)',
    year: '2026',
    certified: true,
    description: 'Constructed the computer vision preprocessing, image quality gate, and deterministic Jan Aushadhi generic equivalence engine.',
  },
]
