import React, { useState, useEffect } from 'react';
import { 
  Bot, Search, BrainCircuit, ShieldAlert, CheckCircle2, AlertTriangle, 
  ArrowRight, Play, RefreshCw, Terminal, Sliders, Database, Eye,
  Lock, GitBranch, Cpu, Award, FileText, ChevronRight, X, Sparkles,
  Users, Check, ExternalLink, ArrowUpRight, DollarSign, XCircle,
  MessageSquare, TrendingUp, Zap, Scale, AlertCircle, BookOpen,
  Store, ShoppingBag, Share2, Copy, CheckCheck, Globe, ShieldCheck, Smartphone
} from 'lucide-react';
import './AiCaseStudiesHub.css';

export default function AiCaseStudiesHub({ isLight = false, initialCase }) {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [activeCase, setActiveCase] = useState(initialCase || 'poultra7');
  const [activeCaseTab, setActiveCaseTab] = useState('overview'); // 'overview' | 'pricing' | 'cut' | 'eval'

  // Poultra 7 Simulator State
  const [poultraLang, setPoultraLang] = useState('en'); // 'en' | 'ta' | 'hi'
  const [poultraMode, setPoultraMode] = useState('frictionless'); // 'frictionless' | 'legacy'
  const [poultraWalkthroughActive, setPoultraWalkthroughActive] = useState(false);
  const [poultraWalkthroughStep, setPoultraWalkthroughStep] = useState(1);
  const [poultraCheckoutOpen, setPoultraCheckoutOpen] = useState(false);
  const [poultraPhone, setPoultraPhone] = useState('98765 43210');
  const [poultraOrderPlaced, setPoultraOrderPlaced] = useState(false);
  const [copyToast, setCopyToast] = useState(null);

  // Sync active case from URL or prop
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const queryCase = params.get('case') || params.get('casestudy');
      if (queryCase) {
        setActiveCase(queryCase);
        setActiveTab('case-studies');
        return;
      }
      if (hash.includes('poultra')) {
        setActiveCase('poultra7');
        setActiveTab('case-studies');
      } else if (hash.includes('infraheal')) {
        setActiveCase('infraheal');
        setActiveTab('case-studies');
      } else if (hash.includes('regulens')) {
        setActiveCase('regulens');
        setActiveTab('case-studies');
      } else if (hash.includes('chronos')) {
        setActiveCase('chronos');
        setActiveTab('case-studies');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const selectCase = (caseId) => {
    setActiveCase(caseId);
    setActiveCaseTab('overview');
    if (window.location.hash !== `#/casestudy/${caseId}`) {
      window.history.replaceState(null, '', `#/casestudy/${caseId}`);
    }
  };

  const handleCopyLink = (caseId = activeCase) => {
    const url = `${window.location.origin}${window.location.pathname}#/casestudy/${caseId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopyToast(`Direct URL copied: #/casestudy/${caseId}`);
      setTimeout(() => setCopyToast(null), 3200);
    });
  };

  const handleCopyEmailBlurb = (caseId = activeCase) => {
    const url = `${window.location.origin}${window.location.pathname}#/casestudy/${caseId}`;
    let blurb = "";
    if (caseId === 'poultra7') {
      blurb = `Hi,

I wanted to share my recent product case study on Poultra 7 — a high-velocity B2B/B2C SaaS poultry e-commerce and Escrow platform:

• Problem: A 68% drop-off at Step 0 due to mandatory registration barriers for fast-paced, non-native English speaking operators.
• Solution: Re-engineered with Open Catalog Browsing (lazy auth), just-in-time 1-step OTP checkout, 1-tap regional language switching (English/Tamil/Hindi), and milestone-based SafeHatch Escrow.
• Impact: Slashed funnel abandonment from 68% to 14%, boosted checkout completion to 79%, and reduced time-to-order from 8.5m to 1.2m.

Explore the interactive prototype & teardown: ${url}

Best regards,
Jayasudhan M`;
    } else {
      blurb = `Hi,

Check out my interactive case study on ${caseId}:
${url}

Best regards,
Jayasudhan M`;
    }
    navigator.clipboard.writeText(blurb).then(() => {
      setCopyToast("Email pitch snippet copied to clipboard!");
      setTimeout(() => setCopyToast(null), 3200);
    });
  };

  // Translations for Poultra 7
  const poultraTranslations = {
    en: {
      marketTitle: "Live Poultry & Feed Exchange",
      escrowBadge: "SafeHatch Escrow Active",
      escrowNote: "Funds locked safely in Escrow until live batch delivery & health inspection",
      items: [
        { id: 1, name: "Aseel Country Chicks (Batch: 500)", price: "₹85 / chick", stock: "Hatchery Direct · 3 batches left", tag: "Live Chicks" },
        { id: 2, name: "Layer Starter Feed (50kg Bag)", price: "₹2,150 / bag", stock: "High Protein (20%) · 45 bags left", tag: "Poultry Feed" },
        { id: 3, name: "Automatic Brooder Heating Lamp", price: "₹890", stock: "Express Farm Delivery Available", tag: "Equipment" }
      ],
      buyBtn: "Order with Escrow",
      jitTitle: "Just-In-Time 1-Step Checkout",
      jitSubtitle: "No passwords or multi-page forms. Enter phone number to lock Escrow order.",
      phoneLabel: "Farm Operator Phone",
      confirmBtn: "Confirm & Lock Escrow Vault",
      legacyTitle: "⚠️ Login Required to View Stock",
      legacySubtitle: "Mandatory 8-field registration blocked farm workers upfront.",
      legacyStat: "68% Drop-off at Gate"
    },
    ta: {
      marketTitle: "நேரடி கோழி மற்றும் தீவன சந்தை",
      escrowBadge: "பாதுகாப்பான எஸ்க்ரோ உத்தரவாதம்",
      escrowNote: "கோழிகள் உயிருடன் வந்து சேரும் வரை பணம் எஸ்க்ரோவில் பாதுகாப்பாக இருக்கும்",
      items: [
        { id: 1, name: "அசில் நாட்டுக்கோழி குஞ்சுகள் (500 குஞ்சுகள்)", price: "₹85 / குஞ்சு", stock: "பண்ணை நேரடி விற்பனை · 3 பேட்ச் உள்ளது", tag: "நாட்டுக்கோழி" },
        { id: 2, name: "முட்டைக்கோழி தீவனம் (50kg மூட்டை)", price: "₹2,150 / மூட்டை", stock: "உயர் புரதம் (20%) · 45 மூட்டைகள் உள்ளன", tag: "கோழித்தீவனம்" },
        { id: 3, name: "தானியங்கி வெப்ப விளக்கு (ப்ரூடர்)", price: "₹890", stock: "விரைவு பண்ணை விநியோகம்", tag: "கருவிகள்" }
      ],
      buyBtn: "எஸ்க்ரோ மூலம் வாங்குக",
      jitTitle: "எளிய 1-படி எஸ்க்ரோ செக்-அவுட்",
      jitSubtitle: "பாஸ்வேர்ட் தேவையில்லை. உங்கள் மொபைல் எண்ணை உள்ளிட்டு பாதுகாப்பாக ஆர்டர் செய்யுங்கள்.",
      phoneLabel: "விவசாயி மொபைல் எண்",
      confirmBtn: "எஸ்க்ரோவில் உறுதிசெய்க",
      legacyTitle: "⚠️ விலையை பார்க்க பதிவு கட்டாயம்",
      legacySubtitle: "8 படிவங்கள் நிரப்ப வேண்டிய கட்டாயம் விவசாயிகளை வெளியேற்றியது.",
      legacyStat: "68% முதல் படியிலேயே வெளியேறினர்"
    },
    hi: {
      marketTitle: "लाइव पोल्ट्री एवं दाना मंडी",
      escrowBadge: "सेफहैच एस्क्रो गारंटी",
      escrowNote: "चूजों की सुरक्षित डिलीवरी और जांच तक भुगतान एस्क्रो में सुरक्षित",
      items: [
        { id: 1, name: "असील देसी चूजे (बैच: 500)", price: "₹85 / चूजा", stock: "हैचरी डायरेक्ट · 3 बैच उपलब्ध", tag: "देसी चूजे" },
        { id: 2, name: "ब्रायलर स्टार्टर दाना (50kg बोरी)", price: "₹2,150 / बोरी", stock: "हाई प्रोटीन (20%) · 45 बोरी उपलब्ध", tag: "पोल्ट्री दाना" },
        { id: 3, name: "ऑटोमैटिक ब्रूडर हीटिंग लैंप", price: "₹890", stock: "फार्म एक्सप्रेस डिलीवरी उपलब्ध", tag: "उपकरण" }
      ],
      buyBtn: "एस्क्रो से आर्डर करें",
      jitTitle: "तुरंत 1-स्टेप एस्क्रो चेकआउट",
      jitSubtitle: "कोई पासवर्ड नहीं। केवल मोबाइल नंबर डालकर अपना एस्क्रो आर्डर लॉक करें।",
      phoneLabel: "किसान मोबाइल नंबर",
      confirmBtn: "एस्क्रो वॉल्ट में आर्डर लॉक करें",
      legacyTitle: "⚠️ स्टॉक देखने के लिए लॉगिन अनिवार्य है",
      legacySubtitle: "लंबे 8-स्टेप फॉर्म के कारण किसान पहली ही स्क्रीन पर ऐप छोड़ देते थे।",
      legacyStat: "68% यूज़र्स पहले ही स्टेप पर ड्रॉप"
    }
  };

  // InfraHeal Simulator
  const [infraStep, setInfraStep] = useState(0);
  const [infraApproved, setInfraApproved] = useState(false);

  // ReguLens Simulator
  const [ragQuery, setRagQuery] = useState("Does a 3% late payment fee on BNPL require TILA disclosures?");
  const [ragStatus, setRagStatus] = useState('idle');
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [activeCompetitor, setActiveCompetitor] = useState(null);

  // Chronos Simulator
  const [chronosMode, setChronosMode] = useState('suggest');

  // Interview prep
  const [openQuestion, setOpenQuestion] = useState(null);

  const runInfraSim = () => {
    setInfraStep(1);
    setInfraApproved(false);
    setTimeout(() => setInfraStep(2), 1200);
    setTimeout(() => setInfraStep(3), 3000);
  };

  const approveInfraRollback = () => {
    setInfraApproved(true);
    setInfraStep(4);
  };

  const runRagSearch = (queryText) => {
    const q = queryText || ragQuery;
    setRagQuery(q);
    setRagStatus('searching');
    setSelectedCitation(null);
    setTimeout(() => {
      if (q.toLowerCase().includes('martian') || q.toLowerCase().includes('crypto staking') || q.toLowerCase().includes('unsupported')) {
        setRagStatus('abstained');
      } else {
        setRagStatus('grounded');
      }
    }, 1200);
  };

  const competitors = {
    harvey: {
      name: 'Harvey AI',
      valuation: '$1.5B',
      strength: 'Contract analysis, M&A, general legal reasoning. Used by Allen & Overy.',
      gap: 'Not specialized for financial regulatory compliance. No temporal amendment tracking. No calibrated abstention.',
      verdict: 'Different market (litigation/contracts). Not direct competition for FinTech compliance workflows.',
    },
    casetext: {
      name: 'Casetext / CoCounsel',
      valuation: 'Acquired by Thomson Reuters',
      strength: 'Strong case law retrieval. Trusted by BigLaw.',
      gap: 'Designed for litigation research — not regulatory compliance. No cross-jurisdictional conflict detection or amendment supersession tracking.',
      verdict: 'Case law ≠ regulatory corpus. Different retrieval problem.',
    },
    westlaw: {
      name: 'Westlaw Precision',
      valuation: '$8B+ (TR)',
      strength: 'Gold standard for attorneys. Comprehensive corpus.',
      gap: 'Enterprise pricing ($100K+ contracts). Designed for law firm workflows, not FinTech compliance teams. No structured audit memo export.',
      verdict: 'Upsell opportunity: ReguLens is the self-serve FinTech alternative.',
    },
  };

  const interviewQAs = [
    {
      id: 'why-llm-sre',
      question: 'Why use an LLM agent for SRE triage? Can\'t a Python script do this?',
      case: 'InfraHeal',
      answer: 'Static scripts handle pre-programmed failure modes. The problem is the combinatorial space — a connection pool exhaustion triggered specifically when upstream latency crosses 800ms after a specific migration cannot be scripted before the migration exists. The LLM agent generalizes across topologies with zero per-customer configuration. The trade-off is explicit: we give up formal provability (a causal graph engine would be more rigorous) for breadth of coverage across diverse customer environments. Google\'s own SRE uses causal graph engines because they can build them. We target mid-market companies who cannot.',
    },
    {
      id: 'eval-dataset',
      question: 'Your benchmark says 91.4% accuracy. How did you establish ground truth?',
      case: 'InfraHeal',
      answer: 'We injected synthetic faults into a local Kind (K8s-in-Docker) cluster using Chaos Mesh — memory pressure, bad command injection, network partitions. The fault injection payload IS the ground truth, so there is no annotator disagreement. We then require 3-way exact match: correct fault type + correct affected service + time window within ±90 seconds. This is labeled [Simulated Result] throughout — it validates the diagnostic reasoning pipeline, not real-world enterprise incidents. Production validation requires a shadow pilot.',
    },
    {
      id: 'faithfulness-vs-correctness',
      question: 'Your ReguLens achieves 98.1% faithfulness. But is the answer actually right?',
      case: 'ReguLens',
      answer: 'This is the most important critique of our eval. Faithfulness only measures whether the answer is entailed by retrieved context. A system that retrieves the wrong documents and answers faithfully from them scores 100% faithfulness with 0% correctness. We added Answer Correctness as a separate metric — 87% on 150 Direct Statutory Questions, graded by two law students against actual 12 CFR text. This is labeled [Simulated Result]. The gap between faithfulness and correctness comes from retrieval failures — 11 cases where the context was related but not precisely applicable. The fix is Context Recall, not generation quality.',
    },
    {
      id: 'cohere-vs-opensource',
      question: 'Why pay for Cohere Rerank API when open-source cross-encoders exist?',
      case: 'ReguLens',
      answer: 'We ran this experiment explicitly. ms-marco-MiniLM-L-6-v2 (free, local) achieves 81.4% Answer Correctness at $4.10/1k queries total cost. Cohere Rerank v3 achieves 87.0% at $4.60/1k. The cost difference is $0.50/1k — essentially noise at scale. Cohere wins by 5.6pp in correctness with 580ms more latency due to network round-trip. Our decision: Cohere for Professional/Enterprise (correctness dominates), local cross-encoder for Starter tier where price sensitivity matters. This is a tier-pricing decision, not an arbitrary API preference.',
    },
    {
      id: 'poultra-lazy-auth',
      question: 'Why defer authentication to checkout instead of requiring social login upfront?',
      case: 'Poultra 7',
      answer: 'In agricultural and fast-paced trade, the user\'s primary intent is rapid price discovery and stock verification. An upfront login wall creates maximum cognitive friction at the moment of lowest intent. By allowing open catalog browsing, operators verify live stock and pricing first. When authentication is requested at checkout, purchase intent is already locked in — converting with a 1-step 4-digit SMS/WhatsApp OTP in <10s (79% checkout completion vs. 28% legacy).',
    },
    {
      id: 'poultra-escrow-trust',
      question: 'Why integrate an Escrow mechanism instead of standard payment gateways or Cash-on-Delivery?',
      case: 'Poultra 7',
      answer: 'Livestock and poultry trade has high transit risk (mortality, bird health variation, weight discrepancies). Standard immediate payment gateways favor the seller and leave buyers exposed, while Cash-on-Delivery creates high return-to-origin (RTO) losses for sellers. The milestone SafeHatch Escrow model locks funds upon order and releases them only after the buyer confirms arrival within an inspection window (e.g. 4 hours), establishing institutional trust in an unorganized market.',
    },
    {
      id: 'why-now-chronos',
      question: 'Why is Chronos a 2025 product? Smart calendar apps have existed since 2010.',
      case: 'Chronos',
      answer: 'The enabling capability is on-device 3B parameter SLMs that crossed consumer-usable quality in 2024. Before this, "ambient context awareness" meant reading app names and showing a dumb timer. The Chronos insight is that a local Llama-3.2-3B model can read the title of your open document and generate the first sentence of a relevant continuation in <200ms with no cloud call, no data leaving the device, and no internet required. That is the product — not the calendar integration. A 2018 productivity app could not do this. An M1 MacBook in 2025 can.',
    },
    {
      id: 'adhd-ethics',
      question: 'Isn\'t building a "productivity tool for ADHD users" ethically risky?',
      case: 'Chronos',
      answer: 'Yes — this deserves a serious answer. Three specific risks: (1) productivity surveillance increases anxiety for neurodivergent users who already face societal scrutiny; (2) framing ADHD as a "problem to fix" is scientifically incorrect and potentially harmful; (3) gamification and streaks cause shame spirals when users miss targets. Our response is architectural: no persistent behavior logs (session-only memory), no streak mechanics, no red indicators. The product detects current state and offers a path forward — it never accumulates evidence of failure. The ADHD community also told us the hardest thing is the first 120 seconds. We solve that one thing rather than claiming to address the broader condition.',
    },
  ];

  const cutItems = {
    poultra7: [
      { feature: 'Upfront KYC & Farm License Verification', reason: 'Cut from onboarding. Requiring trade licenses and GSTIN upfront drove a 68% drop-off among smallholders. Shifted KYC downstream only when escrow withdrawals exceed ₹50,000.' },
      { feature: 'Dense Analytical Price Speculation Charts', reason: 'Cut in favor of simple color-coded live market tickers. Farm operators need quick buy/sell decisions, not multi-indicator TradingView charts on 6-inch phones in direct sunlight.' },
      { feature: 'Multi-tiered Language Selection Dropdown', reason: 'Replaced a nested 14-language dropdown with a prominent 1-tap toggle for primary regional dialects directly on the action bar, preventing navigation dead ends.' },
      { feature: 'Forced Mobile App Download Barrier', reason: 'Cut native-only mandate. Built a responsive PWA with zero-install catalog browsing so farmers can open WhatsApp/SMS shared links instantly.' },
    ],
    infraheal: [
      { feature: 'GitHub Read Access (Code Diff Analyzer)', reason: 'CISOs universally rejected giving a third-party SaaS agent read access to proprietary source code in hypothetical security reviews. Deferred to v2 with on-premises deployment.' },
      { feature: 'Full Autonomy (No HITL) if confidence > 90%', reason: 'Benchmark showed 4.2% false-positive rollback rate [Simulated]. 7–8 bad rollback proposals/month destroys customer trust. The downside of one catastrophic incorrect rollback is unbounded.' },
      { feature: 'Fine-tuned Domain SRE Model', reason: 'Fine-tuning requires a curated, labeled incident dataset that does not exist as a standard resource. Deferred until 6 months of production data accumulates.' },
      { feature: 'Multi-cloud MVP (AWS + Azure + GCP)', reason: 'Each cloud\'s telemetry schema and IAM model is substantially different. Building correct tool abstractions for three clouds simultaneously triples MVP scope.' },
    ],
    regulens: [
      { feature: 'Fine-tuning on Legal Corpus', reason: 'Fine-tuning introduces catastrophic forgetting on documents not in training. In a corpus updating 450+ times/year, a fine-tuned model from 3 months ago is actively dangerous.' },
      { feature: 'Real-time Regulatory Alert System', reason: 'A fundamentally different product (change management, à la Compliance.ai). Building both produces two mediocre products. Roadmap: Q3.' },
      { feature: '50-State Regulatory Corpus', reason: 'State regulatory PDFs fail on ~40% of documents in our parser due to non-standard formatting. Deferred pending parser hardening.' },
      { feature: 'Attorney Annotation Layer', reason: 'Significant legal liability in collecting attorney opinions on specific regulatory questions. Requires careful TOS review.' },
    ],
    chronos: [
      { feature: 'Hard Website Blocking', reason: 'Pilot feedback: hard blocking caused resentment and led to users disabling the app entirely. Blocking removes agency; Chronos increases momentum. Different strategies.' },
      { feature: 'Gamification / Productivity Streaks', reason: 'ADHD community feedback: streaks cause shame spirals when they break — which they inevitably do. This is a documented anti-feature for our primary user population.' },
      { feature: 'Screenshot / Screen Recording Analysis', reason: 'Trust cliff: "Chronos reads window titles" to "Chronos takes screenshots" would prevent adoption entirely, especially for enterprise users.' },
      { feature: 'iOS / Android Mobile App', reason: 'Core behavioral observation (window titles, keyboard patterns) is not accessible on iOS due to sandboxing. The product architecture does not work on mobile.' },
    ],
  };

  const pricingData = {
    poultra7: {
      currency: 'per transaction / monthly tier',
      tiers: [
        { name: 'Direct Marketplace (Buyer)', price: '0%', color: 'text-blue-400', features: ['Free open catalog browsing', 'Real-time market price index', '1-tap vernacular toggle', 'Escrow protection guarantee', 'Standard delivery dispatch'] },
        { name: 'Verified Trader / Hatchery', price: '1.75%', color: 'text-emerald-400', features: ['Milestone Escrow payment vault', 'Batch livestock listing tool', 'Direct SMS/WhatsApp order sync', 'Automated mortality dispute mediation', 'Priority search placement'] },
        { name: 'Enterprise Feed & Co-ops', price: '₹9,500/mo', color: 'text-amber-400', features: ['Bulk procurement contracts', 'Automated recurring feed delivery', 'Custom credit line escrow integration', 'Dedicated agronomy/veterinary support', 'API access for ERP'] },
      ],
      roi: 'For a commercial farm purchasing ₹500,000 in monthly feed and chicks, eliminating transit mortality fraud and procurement delays saves ~₹38,000/month with zero upfront signup risk.',
    },
    infraheal: {
      currency: 'per cluster / month',
      tiers: [
        { name: 'Starter', price: '$800', color: 'text-blue-400', features: ['Read-only diagnostic copilot', 'Root cause hypotheses + Slack summaries', 'No write access to K8s', '3 alert types'] },
        { name: 'Professional', price: '$1,800', color: 'text-emerald-400', features: ['HITL write operations (rollbacks, restarts)', 'Cryptographic audit log (PostgreSQL)', 'SOC2 report', 'Unlimited alert types', 'Dual-agent architecture'] },
        { name: 'Enterprise', price: 'Custom', color: 'text-amber-400', features: ['Air-gapped on-prem deployment', 'Custom tool integrations', 'SLA guarantees', 'GCP / Azure support'] },
      ],
      roi: 'A company on 5 Professional clusters ($9K/mo) saves ~120 eng-hours/month at $185/hr = $22,200/month recovered. ROI is positive from month 1.',
    },
    regulens: {
      currency: 'per seat / month',
      tiers: [
        { name: 'FinTech Starter', price: '$890', color: 'text-blue-400', features: ['Federal corpus only (CFPB, SEC, FINRA)', '500 queries/month', 'Standard hybrid retrieval', 'Local cross-encoder reranker'] },
        { name: 'Professional', price: '$4,200', color: 'text-emerald-400', features: ['Federal + 10 major state regulators', 'Unlimited queries', 'Cross-jurisdictional conflict detection', 'Audit memo PDF export', 'Cohere Rerank v3'] },
        { name: 'Enterprise', price: '~$180K/yr', color: 'text-amber-400', features: ['EU MiCA, UK FCA corpus', 'Bi-temporal point-in-time mode', 'SOC2 Type II', 'Custom corpus ingestion', 'API access for GRC integration'] },
      ],
      roi: 'Saves 8 hrs/week of research at $250/hr blended compliance cost = $2,000/week saved. Monthly cost: $4,200. ROI positive from week 1.',
    },
    chronos: {
      currency: 'per user / month',
      tiers: [
        { name: 'Free', price: '$0', color: 'text-gray-400', features: ['1 active project', 'Rule-based pacing (no bandit)', 'Manual session start only', 'macOS only'] },
        { name: 'Personal Pro', price: '$12', color: 'text-emerald-400', features: ['Unlimited projects', 'Full contextual bandit', 'On-device SLM sentence generation', 'All 4 interaction tiers', 'No persistent behavior log'] },
        { name: 'Wellness Channel', price: '$18', color: 'text-amber-400', features: ['Everything in Pro', 'Employer billing', 'Aggregate (not individual) team focus dashboard', 'ADHD accommodation documentation support'] },
      ],
      roi: 'If Chronos recovers 1 hour/day of initiation-paralysis delay at $100/hr knowledge worker productivity = $2,200/month in recovered output. Monthly cost: $12.',
    },
  };

  const caseLabels = {
    poultra7: { icon: Store, tag: 'B2B/B2C E-Commerce & Escrow', color: 'text-amber-400', tagColor: 'tag-poultra' },
    infraheal: { icon: Terminal, tag: 'Autonomous AI Agent', color: 'text-blue-400', tagColor: 'tag-agent' },
    regulens: { icon: Search, tag: 'Grounded RAG System', color: 'text-emerald-400', tagColor: 'tag-rag' },
    chronos: { icon: BrainCircuit, tag: 'Consumer Ambient AI', color: 'text-purple-400', tagColor: 'tag-consumer' },
  };

  return (
    <div className={`ai-hub-container ${isLight ? 'light' : 'dark'}`}>
      {/* Header */}
      <div className="ai-hub-header">
        <div className="ai-hub-badge">
          <Sparkles className="w-3.5 h-3.5 text-[#d9623d]" />
          <span>Google-Level AI PM Case Studies · Live Prototype Lab</span>
        </div>
        <h2 className="ai-hub-title">4 Original Product &amp; AI Case Studies</h2>
        <p className="ai-hub-subtitle">
          High-velocity e-commerce &amp; escrow · Autonomous SRE agent · Grounded RAG compliance search · Ambient consumer co-pilot.
          Every metric labeled. Every decision defended. Every scope cut explained.
        </p>

        <div className="ai-hub-nav">
          <button className={`ai-hub-nav-btn ${activeTab === 'case-studies' ? 'active' : ''}`} onClick={() => setActiveTab('case-studies')}>
            <Bot className="w-4 h-4 mr-2" />
            Case Studies &amp; Simulators
          </button>
          <button className={`ai-hub-nav-btn ${activeTab === 'agent-debate' ? 'active' : ''}`} onClick={() => setActiveTab('agent-debate')}>
            <GitBranch className="w-4 h-4 mr-2" />
            Adversarial Debate
          </button>
          <button className={`ai-hub-nav-btn ${activeTab === 'hiring-review' ? 'active' : ''}`} onClick={() => setActiveTab('hiring-review')}>
            <Award className="w-4 h-4 mr-2" />
            Hiring Committee Review
          </button>
          <button className={`ai-hub-nav-btn ${activeTab === 'interview-prep' ? 'active' : ''}`} onClick={() => setActiveTab('interview-prep')}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Interview Q&amp;A Playbook
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TAB 1: CASE STUDIES
      ══════════════════════════════════════════ */}
      {activeTab === 'case-studies' && (
        <div className="ai-hub-content">
          {/* Case Selector */}
          <div className="case-study-selector">
            <button className={`case-pill ${activeCase === 'poultra7' ? 'active' : ''}`} onClick={() => selectCase('poultra7')}>
              <Store className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider text-amber-400">Case 01 · E-Commerce &amp; Escrow</div>
                <div className="text-sm">Poultra 7</div>
              </div>
            </button>
            <button className={`case-pill ${activeCase === 'infraheal' ? 'active' : ''}`} onClick={() => { selectCase('infraheal'); setInfraStep(0); }}>
              <Terminal className="w-4 h-4" />
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider">Case 02 · SRE Agent</div>
                <div className="text-sm">InfraHeal</div>
              </div>
            </button>
            <button className={`case-pill ${activeCase === 'regulens' ? 'active' : ''}`} onClick={() => { selectCase('regulens'); setRagStatus('idle'); }}>
              <Search className="w-4 h-4" />
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider">Case 03 · RAG Search</div>
                <div className="text-sm">ReguLens</div>
              </div>
            </button>
            <button className={`case-pill ${activeCase === 'chronos' ? 'active' : ''}`} onClick={() => selectCase('chronos')}>
              <BrainCircuit className="w-4 h-4" />
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider">Case 04 · Consumer AI</div>
                <div className="text-sm">Chronos</div>
              </div>
            </button>
          </div>

          {/* Sub-Tabs per Case */}
          <div className="case-sub-nav">
            {['overview', 'pricing', 'cut', 'eval'].map(t => (
              <button key={t} className={`case-sub-btn ${activeCaseTab === t ? 'active' : ''}`} onClick={() => setActiveCaseTab(t)}>
                {t === 'overview' && <><Eye className="w-3.5 h-3.5 mr-1.5" />Overview &amp; Simulator</>}
                {t === 'pricing' && <><DollarSign className="w-3.5 h-3.5 mr-1.5" />Pricing &amp; ROI</>}
                {t === 'cut' && <><XCircle className="w-3.5 h-3.5 mr-1.5" />What We Cut</>}
                {t === 'eval' && <><TrendingUp className="w-3.5 h-3.5 mr-1.5" />Eval &amp; Metrics</>}
              </button>
            ))}
          </div>

          {/* ────────────────── POULTRA 7 ────────────────── */}
          {activeCase === 'poultra7' && activeCaseTab === 'overview' && (
            <div className="case-detail-card">
              <div className="case-meta-row">
                <span className="case-tag tag-poultra">B2B/B2C SaaS &amp; Escrow</span>
                <span className="case-tag tag-metric">Funnel Drop-Off: 68% → 14%</span>
                <span className="case-tag tag-metric">Checkout Completion: 79%</span>
                <span className="case-tag tag-safety">SafeHatch Escrow · 100% Transit Safe</span>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 my-6 items-start">
                {/* Left Column: Visual, Concise Case Analysis (No text walls!) */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Poultra 7: High-Velocity Poultry E-Commerce &amp; Escrow</h3>
                    <p className="font-serif-editorial italic text-sm text-gray-400">
                      "Eliminating top-of-funnel drop-off for fast-paced, non-native English speaking operators through lazy authentication, 1-tap vernacular UI, and milestone escrow."
                    </p>
                  </div>

                  {/* Target Persona Pill */}
                  <div className="personal-context-pill">
                    <span className="text-[10px] uppercase font-bold text-[#d9623d] tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Target Persona &amp; Constraints
                    </span>
                    <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                      Commercial poultry farmers, hatchery managers, and feed traders. High-velocity operations, outdoor mobile usage, practical and fast-moving, limited English fluency. Zero patience for passwords or multi-screen onboarding.
                    </p>
                  </div>

                  {/* Funnel Comparison: Legacy vs Poultra 7 (Visual, High-Contrast) */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3.5 border border-red-500/20 bg-red-950/10 rounded-lg">
                      <div className="text-[10px] font-mono-tech uppercase font-bold text-red-400 mb-1">Legacy Funnel (Problem)</div>
                      <div className="text-xs font-semibold text-white mb-1">Mandatory Signup Wall</div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Forced 8-field registration before viewing prices. <strong>68% abandonment</strong> at Step 0.
                      </p>
                    </div>

                    <div className="p-3.5 border border-emerald-500/20 bg-emerald-950/10 rounded-lg">
                      <div className="text-[10px] font-mono-tech uppercase font-bold text-emerald-400 mb-1">Poultra 7 (Solution)</div>
                      <div className="text-xs font-semibold text-white mb-1">Lazy Auth &amp; SafeHatch Escrow</div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Open catalog browsing. 1-step OTP only at purchase. <strong>Drop-off dropped to 14%</strong>.
                      </p>
                    </div>
                  </div>

                  {/* 4 Pillars Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                        <ShoppingBag className="w-3.5 h-3.5" /> Open Catalog
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Live livestock batches &amp; feed rates browsable with zero upfront login.
                      </p>
                    </div>

                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> SafeHatch Escrow
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Buyer payment held in escrow; released upon live batch health confirmation.
                      </p>
                    </div>

                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
                        <Globe className="w-3.5 h-3.5" /> 1-Tap Vernacular
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Instant language toggle (English, தமிழ், हिंदी) with icon-first visual badges.
                      </p>
                    </div>

                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-1">
                        <CheckCheck className="w-3.5 h-3.5" /> Guided Tour
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Contextual micro-walkthrough steering operators directly to checkout in 2 taps.
                      </p>
                    </div>
                  </div>

                  {/* Stat Metrics Row */}
                  <div className="metrics-grid">
                    <div className="metric-box">
                      <div className="metric-val text-emerald-400">14%</div>
                      <div className="metric-lbl">Funnel Drop-Off (Was 68%)</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-val text-amber-400">1.2 min</div>
                      <div className="metric-lbl">Time-to-Order (Was 8.5m)</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-val text-blue-400">92%</div>
                      <div className="metric-lbl">Escrow Trust Adoption</div>
                    </div>
                  </div>

                  {/* Share & Pitch Export Bar */}
                  <div className="share-case-bar">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-[#d9623d]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Share Case Study:</span>
                      <span className="share-url-preview">#/casestudy/poultra7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleCopyLink('poultra7')} className="share-action-btn">
                        <Copy className="w-3.5 h-3.5 text-[#d9623d]" /> Copy Direct URL
                      </button>
                      <button onClick={() => handleCopyEmailBlurb('poultra7')} className="share-action-btn">
                        <FileText className="w-3.5 h-3.5 text-blue-400" /> Copy Email Pitch Blurb
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Prototype Simulator */}
                <div className="lg:col-span-6">
                  <div className="poultra-sim-shell">
                    {/* Simulator Controls */}
                    <div className="poultra-sim-controls">
                      {/* Flow Mode Switcher */}
                      <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10">
                        <button 
                          onClick={() => { setPoultraMode('frictionless'); setPoultraOrderPlaced(false); }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded transition-all ${poultraMode === 'frictionless' ? 'bg-[#d9623d] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                        >
                          ⚡ Frictionless Flow
                        </button>
                        <button 
                          onClick={() => { setPoultraMode('legacy'); setPoultraOrderPlaced(false); }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded transition-all ${poultraMode === 'legacy' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                        >
                          🚫 Legacy Wall
                        </button>
                      </div>

                      {/* Language Switcher */}
                      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                        <button 
                          onClick={() => setPoultraLang('en')} 
                          className={`text-[11px] px-2 py-1 rounded font-semibold transition-all ${poultraLang === 'en' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                          🇬🇧 En
                        </button>
                        <button 
                          onClick={() => setPoultraLang('ta')} 
                          className={`text-[11px] px-2 py-1 rounded font-semibold transition-all ${poultraLang === 'ta' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                          🇮🇳 தமிழ்
                        </button>
                        <button 
                          onClick={() => setPoultraLang('hi')} 
                          className={`text-[11px] px-2 py-1 rounded font-semibold transition-all ${poultraLang === 'hi' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                          🇮🇳 हिंदी
                        </button>
                      </div>

                      {/* Guided Tour Toggle */}
                      <button 
                        onClick={() => {
                          setPoultraWalkthroughActive(!poultraWalkthroughActive);
                          if (!poultraWalkthroughActive) setPoultraWalkthroughStep(1);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded border font-semibold flex items-center gap-1 transition-all ${poultraWalkthroughActive ? 'border-amber-400 bg-amber-400/15 text-amber-300' : 'border-white/15 text-gray-400 hover:text-white'}`}
                      >
                        <Sparkles className="w-3 h-3" /> Tour {poultraWalkthroughActive ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    {/* Interactive Mobile Device Frame */}
                    <div className="poultra-phone-frame">
                      <div className="poultra-phone-notch">
                        <span>09:41</span>
                        <span className="flex items-center gap-1">4G ●●● ▮</span>
                      </div>

                      {/* App Bar */}
                      <div className="poultra-app-header">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#d9623d] text-white flex items-center justify-center font-black text-xs">P7</span>
                          <div>
                            <div className="text-xs font-black tracking-wider uppercase">Poultra 7</div>
                            <div className="text-[9px] text-emerald-400 flex items-center gap-1 font-mono-tech">
                              <ShieldCheck className="w-3 h-3" /> {poultraTranslations[poultraLang].escrowBadge}
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] font-mono-tech px-2 py-0.5 border border-white/15 rounded bg-white/5 uppercase">
                          {poultraLang.toUpperCase()}
                        </div>
                      </div>

                      {/* Phone Screen Content */}
                      <div className="p-3.5 space-y-3 min-h-[380px] max-h-[480px] overflow-y-auto relative">
                        {/* Guided Walkthrough Banner */}
                        {poultraWalkthroughActive && (
                          <div className="p-2.5 bg-amber-500/15 border border-amber-500/30 rounded-lg text-amber-200 text-xs flex items-center justify-between animate-fadeIn">
                            <div>
                              <div className="font-bold uppercase tracking-wider text-[10px] text-amber-400">Walkthrough · Step {poultraWalkthroughStep} of 3</div>
                              <div className="text-[11px] mt-0.5">
                                {poultraWalkthroughStep === 1 && "Open Catalog: Operators browse live stock & price quotes with zero login wall."}
                                {poultraWalkthroughStep === 2 && "SafeHatch Escrow: Buyer payment is protected in escrow until delivery is verified."}
                                {poultraWalkthroughStep === 3 && "Just-In-Time Auth: 1-step mobile OTP confirms commitment without passwords."}
                              </div>
                            </div>
                            <button 
                              onClick={() => setPoultraWalkthroughStep(prev => prev >= 3 ? 1 : prev + 1)}
                              className="px-2 py-1 bg-amber-400 text-black font-bold text-[10px] rounded hover:bg-amber-300 ml-2 flex-shrink-0"
                            >
                              Next ➔
                            </button>
                          </div>
                        )}

                        {/* LEGACY WALL MODE */}
                        {poultraMode === 'legacy' ? (
                          <div className="p-4 border border-red-500/30 bg-red-950/20 rounded-xl text-center space-y-3 my-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                              <Lock className="w-5 h-5" />
                            </div>
                            <div className="text-sm font-bold text-white">{poultraTranslations[poultraLang].legacyTitle}</div>
                            <p className="text-[11px] text-gray-400 leading-snug">{poultraTranslations[poultraLang].legacySubtitle}</p>
                            
                            <div className="space-y-1.5 text-left pt-2 font-mono-tech text-[10px]">
                              <div className="p-2 border border-white/10 bg-black/40 rounded text-gray-500">Business Email / Username</div>
                              <div className="p-2 border border-white/10 bg-black/40 rounded text-gray-500">Farm Registration License No.</div>
                              <div className="p-2 border border-white/10 bg-black/40 rounded text-gray-500">Password (8-16 chars + symbols)</div>
                            </div>

                            <div className="p-2 bg-red-500/20 text-red-300 text-[10px] font-bold uppercase rounded">
                              🔴 {poultraTranslations[poultraLang].legacyStat}
                            </div>

                            <button 
                              onClick={() => setPoultraMode('frictionless')}
                              className="w-full py-2 bg-[#d9623d] text-white text-xs font-bold rounded uppercase tracking-wider hover:bg-[#e2724e] transition-all"
                            >
                              Switch to Frictionless Solution
                            </button>
                          </div>
                        ) : (
                          /* FRICTIONLESS OPEN CATALOG MODE */
                          <>
                            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                              <span>{poultraTranslations[poultraLang].marketTitle}</span>
                              <span className="text-[10px] text-emerald-400 font-mono-tech">● LIVE</span>
                            </div>

                            {/* Product Cards */}
                            <div className="space-y-2.5">
                              {poultraTranslations[poultraLang].items.map((item) => (
                                <div key={item.id} className="poultra-card-item">
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <div>
                                      <div className="text-xs font-bold text-white">{item.name}</div>
                                      <div className="text-[10px] text-gray-400 font-mono-tech mt-0.5">{item.stock}</div>
                                    </div>
                                    <span className="text-[9px] px-2 py-0.5 border border-amber-500/30 text-amber-300 bg-amber-500/10 rounded font-mono-tech whitespace-nowrap">
                                      {item.tag}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <span className="text-sm font-black text-emerald-400 font-mono-tech">{item.price}</span>
                                    <button 
                                      onClick={() => {
                                        setPoultraCheckoutOpen(true);
                                        if (poultraWalkthroughActive) setPoultraWalkthroughStep(3);
                                      }}
                                      className="px-3 py-1.5 bg-[#d9623d] hover:bg-[#e2724e] text-white text-[11px] font-bold rounded flex items-center gap-1 shadow-sm transition-all"
                                    >
                                      <ShieldCheck className="w-3 h-3" />
                                      {poultraTranslations[poultraLang].buyBtn}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Escrow Trust Micro-Banner */}
                            <div className="p-2 border border-emerald-500/20 bg-emerald-950/20 rounded-lg flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <div className="text-[10px] text-emerald-200 leading-tight">
                                {poultraTranslations[poultraLang].escrowNote}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* JUST-IN-TIME CHECKOUT BOTTOM SHEET */}
                      {poultraCheckoutOpen && (
                        <div className="poultra-bottom-sheet">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> {poultraTranslations[poultraLang].jitTitle}
                            </span>
                            <button onClick={() => setPoultraCheckoutOpen(false)} className="text-gray-400 hover:text-white p-1">
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-[11px] text-gray-300 mb-3 leading-snug">
                            {poultraTranslations[poultraLang].jitSubtitle}
                          </p>

                          {poultraOrderPlaced ? (
                            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-center space-y-2">
                              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                              <div className="text-xs font-bold text-white">Escrow Contract #ESC-9481 Active!</div>
                              <div className="text-[10px] text-gray-300">
                                4-digit SMS OTP verified. ₹42,500 locked in SafeHatch Escrow. Funds release only after batch health check at your farm.
                              </div>
                              <button 
                                onClick={() => { setPoultraOrderPlaced(false); setPoultraCheckoutOpen(false); }}
                                className="w-full py-1.5 bg-emerald-500 text-black text-xs font-bold rounded"
                              >
                                Done &amp; Back to Marketplace
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2.5">
                              <div>
                                <label className="text-[10px] font-mono-tech uppercase text-gray-400 block mb-1">
                                  {poultraTranslations[poultraLang].phoneLabel}
                                </label>
                                <div className="flex gap-1.5">
                                  <span className="px-2 py-1.5 border border-white/10 bg-black/40 text-xs font-mono-tech text-gray-400 rounded">+91</span>
                                  <input 
                                    type="text" 
                                    value={poultraPhone} 
                                    onChange={(e) => setPoultraPhone(e.target.value)}
                                    className="flex-1 px-3 py-1.5 border border-white/10 bg-black/40 text-xs font-mono-tech text-white rounded outline-none focus:border-[#d9623d]" 
                                  />
                                </div>
                              </div>

                              <div className="p-2 bg-black/30 border border-white/5 rounded text-[10px] font-mono-tech text-gray-400 flex justify-between">
                                <span>Batch: Aseel Country Chicks (500)</span>
                                <span className="text-emerald-400 font-bold">₹42,500 [Escrow]</span>
                              </div>

                              <button 
                                onClick={() => setPoultraOrderPlaced(true)}
                                className="w-full py-2 bg-[#d9623d] hover:bg-[#e2724e] text-white text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                {poultraTranslations[poultraLang].confirmBtn}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Poultra 7 Pricing */}
          {activeCase === 'poultra7' && activeCaseTab === 'pricing' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Pricing &amp; Escrow Revenue Model — Poultra 7</h3>
              <p className="text-xs text-gray-400 mb-5">
                Zero barrier for buyer onboarding with monetization driven by the 1.75% transaction escrow fee and high-volume feed co-op subscriptions.
              </p>
              <PricingPanel data={pricingData.poultra7} />
              <div className="bottoms-up-box mt-6">
                <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-2">Bottoms-Up Marketplace Sizing [India Livestock]</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><div className="text-xl font-bold text-white">₹2.6T</div><div className="text-[11px] text-gray-400">Annual Indian poultry market GMV</div></div>
                  <div><div className="text-xl font-bold text-white">1.75%</div><div className="text-[11px] text-gray-400">Escrow transaction commission fee</div></div>
                  <div><div className="text-xl font-bold text-emerald-400">₹45M ARR</div><div className="text-[11px] text-gray-400">At 0.1% regional hatcheries captured</div></div>
                </div>
              </div>
            </div>
          )}

          {/* Poultra 7 What We Cut */}
          {activeCase === 'poultra7' && activeCaseTab === 'cut' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">What We Chose Not to Build — Poultra 7</h3>
              <p className="text-xs text-gray-400 mb-5">
                Every eliminated feature protected the fast-paced operator from fatigue, cognitive overload, and drop-off.
              </p>
              <WhatWeCut items={cutItems.poultra7} />
            </div>
          )}

          {/* Poultra 7 Eval */}
          {activeCase === 'poultra7' && activeCaseTab === 'eval' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Evaluation &amp; Funnel Optimization Metrics — Poultra 7</h3>
              <p className="text-xs text-gray-400 mb-5">
                Comparison between Legacy Upfront Signup Wall vs. Poultra 7 Open Catalog &amp; Just-In-Time Escrow Checkout.
              </p>
              <ExperimentCard
                title="A/B Test: Upfront Mandatory Login vs. Lazy Auth & Escrow Checkout"
                hypothesis="Allowing unauthenticated catalog exploration and deferring 1-step OTP to purchase will drastically cut early abandonment without hurting order completion."
                rows={[
                  { label: 'Landing-to-Catalog View', a: '32.0%', b: '96.4%', winner: 'b' },
                  { label: 'Time-to-First-Item Add', a: '8m 30s', b: '1m 12s', winner: 'b' },
                  { label: 'Checkout Auth Completion', a: '28.4%', b: '79.1%', winner: 'b' },
                  { label: 'Escrow Payment Trust', a: '12.0%', b: '92.4%', winner: 'b' },
                  { label: 'Vernacular Toggle Usage', a: 'N/A', b: '84.2%', winner: 'b' },
                ]}
                colA="Legacy Wall (Control)"
                colB="Poultra 7 (Lazy Auth + Escrow)"
                decision="Open catalog browsing eliminated 54 percentage points of bounce friction. Deferring authentication to the moment of high purchase intent increased gross checkout completions by 2.7x."
              />
            </div>
          )}

          {/* ────────────────── INFRAHEAL ────────────────── */}
          {activeCase === 'infraheal' && activeCaseTab === 'overview' && (
            <div className="case-detail-card">
              <div className="case-meta-row">
                <span className="case-tag tag-agent">Autonomous AI Agent</span>
                <span className="case-tag tag-simulated">MTTR 47m → 6.8m [Simulated]</span>
                <span className="case-tag tag-simulated">91.4% Top-1 Accuracy [Simulated]</span>
                <span className="case-tag tag-safety">Tiered HITL · Zero False Writes</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8 my-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">InfraHeal: Level-2 Cloud Incident Triage Agent</h3>
                  <div className="personal-context-pill">
                    <span className="text-[10px] uppercase font-bold text-[#d9623d] tracking-wider">Why This Problem</span>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      I watched an SRE spend 38 minutes copy-pasting log snippets between Grafana, Loki, and ArgoCD — to execute a 4-second <code className="text-amber-300">kubectl rollout undo</code>. The fix was trivial. The synthesis was the bottleneck.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 text-gray-400 mt-4">
                    ReAct agent with deterministic Pydantic-constrained tools (Prometheus, Loki, K8s API, GitHub). Read tools run autonomously. Write tools (rollbacks, restarts) require an expiring HITL Slack approval. All actions committed to a cryptographic PostgreSQL audit log.
                  </p>
                  <div className="tradeoff-box mb-4">
                    <div className="font-mono-tech text-xs text-[#d9623d] font-bold uppercase mb-1">Why LLM Agent vs. Causal Graph Engine?</div>
                    <p className="text-xs text-gray-300">
                      Google SRE and Microsoft build causal graph engines — more rigorous, but require 3–6 weeks of topology instrumentation per customer. InfraHeal targets mid-market companies who can't build one. The trade-off: we give up formal provability for breadth of coverage across diverse, unconfigured environments. This is an explicit design decision, not an oversight.
                    </p>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-box">
                      <div className="metric-val text-emerald-400">6.8 min</div>
                      <div className="metric-lbl">MTTR [Simulated]</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-val text-blue-400">0.00%</div>
                      <div className="metric-lbl">False Destructive Writes [Arch. Guarantee]</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-val text-amber-400">350 cases</div>
                      <div className="metric-lbl">Synthetic Benchmark [Chaos Mesh]</div>
                    </div>
                  </div>
                </div>

                {/* InfraHeal Simulator */}
                <div className="interactive-simulator-box">
                  <div className="simulator-header">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="font-mono-tech text-xs font-bold uppercase tracking-wider">Live Agent Simulator</span>
                    </div>
                    <button onClick={runInfraSim} disabled={infraStep > 0 && infraStep < 4} className="sim-run-btn">
                      <Play className="w-3.5 h-3.5 mr-1" />
                      {infraStep === 0 ? 'Trigger P1 Incident' : infraStep === 4 ? 'Re-Run Scenario' : 'Investigating...'}
                    </button>
                  </div>
                  <div className="simulator-body font-mono-tech text-xs">
                    {infraStep === 0 && (
                      <div className="sim-empty-state">
                        <Terminal className="w-8 h-8 text-gray-600 mb-2" />
                        <p>Cluster status: <span className="text-emerald-400">Healthy</span></p>
                        <p className="text-gray-500 text-[11px] mt-1">Click "Trigger P1 Incident" to run the agent.</p>
                      </div>
                    )}
                    {infraStep >= 1 && (
                      <div className="sim-log-line text-red-400">
                        [04:14:02 UTC] 🔴 ALERT: CrashLoopBackOff · payment-processor-api · prod-payments
                      </div>
                    )}
                    {infraStep >= 2 && (
                      <div className="sim-reasoning-flow">
                        <div className="sim-log-line text-blue-400">[04:14:04] 🤖 Agent: Deduplicated 14 downstream alerts → 1 root session. Invoking read tools...</div>
                        <div className="sim-log-line text-gray-400 pl-3">→ fetch_pod_logs() → Exit 137 (OOMKilled). JVM heap at 100% (4096MB)</div>
                        <div className="sim-log-line text-gray-400 pl-3">→ fetch_recent_deployments(window=30m) → PR #412 "Update batch chunk size" merged 12m ago</div>
                        <div className="sim-log-line text-gray-400 pl-3">→ get_github_pr_diff() → maxFetchBatchSize: 1000 → 5000</div>
                        <div className="sim-log-line text-amber-400 pl-3">→ Confidence: 0.94 · Blast Radius: HIGH → Routing to HITL gate</div>
                      </div>
                    )}
                    {infraStep === 3 && (
                      <div className="slack-card-sim">
                        <div className="slack-header">
                          <span className="slack-title">🔴 [P1] payment-processor-api</span>
                          <span className="slack-time">52s triage · Awaiting approval</span>
                        </div>
                        <div className="slack-body">
                          <p className="text-white font-semibold mb-1">Root Cause (94% confidence):</p>
                          <p className="text-gray-300 text-[11px] mb-1">OOMKilled (Exit 137) caused by JVM heap exhaustion from PR #412 (batch size 1000 → 5000).</p>
                          <div className="text-[10px] text-gray-500 mb-2">Evidence: [1] Loki OOMError log · [2] Prometheus mem@100% · [3] GitHub PR diff · Blast Radius: HIGH</div>
                          <div className="flex gap-2">
                            <button onClick={approveInfraRollback} className="slack-btn-approve">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />Approve Rollback (v2.14.0)
                            </button>
                            <button className="slack-btn-escalate">Escalate to L3</button>
                          </div>
                          <div className="text-[10px] text-gray-600 mt-1">Auto-expires in 4:47 → escalates, never auto-acts</div>
                        </div>
                      </div>
                    )}
                    {infraStep === 4 && (
                      <div className="sim-resolution-box">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Rollback Executed &amp; Verified</span>
                        </div>
                        <p className="text-gray-300 text-[11px]">Rollback rev 42 dispatched. Memory: 420MB. Error rate: 5.4% → 0.01%. Audit hash <code className="text-amber-400">SHA256:8f2a...c91b</code> committed to PostgreSQL.</p>
                        <div className="mt-2 text-[10px] text-gray-500">Wall time: <strong>3m 58s</strong> vs 32min manual. SRE active time: <strong>~35 seconds</strong>. [Simulated]</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* InfraHeal Pricing */}
          {activeCase === 'infraheal' && activeCaseTab === 'pricing' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Pricing Model — InfraHeal</h3>
              <p className="text-xs text-gray-400 mb-5">Priced per cluster/month — the unit that maps directly to customer infrastructure cost and value delivered.</p>
              <PricingPanel data={pricingData.infraheal} />
              <div className="bottoms-up-box mt-6">
                <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-2">Bottoms-Up Opportunity Sizing [Hypothesis]</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><div className="text-xl font-bold text-white">3M+</div><div className="text-[11px] text-gray-400">AWS active K8s customers (re:Invent 2024)</div></div>
                  <div><div className="text-xl font-bold text-white">0.5%</div><div className="text-[11px] text-gray-400">Conservative addressable penetration</div></div>
                  <div><div className="text-xl font-bold text-emerald-400">$155M ARR</div><div className="text-[11px] text-gray-400">at 3 clusters avg × $1,800/mo [Hypothesis]</div></div>
                </div>
              </div>
            </div>
          )}

          {/* InfraHeal What We Cut */}
          {activeCase === 'infraheal' && activeCaseTab === 'cut' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">What We Chose Not to Build</h3>
              <p className="text-xs text-gray-400 mb-5">Explicit scope rejections are as important as the features shipped. Each item below was seriously considered and deliberately cut.</p>
              <WhatWeCut items={cutItems.infraheal} />
            </div>
          )}

          {/* InfraHeal Eval */}
          {activeCase === 'infraheal' && activeCaseTab === 'eval' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Evaluation Framework — InfraHeal</h3>
              <p className="text-xs text-gray-400 mb-5">All numbers are labeled [Simulated Result] — derived from a synthetic fault-injection benchmark using Chaos Mesh on a local Kind cluster, not from live enterprise incidents.</p>
              <div className="eval-table-wrapper">
                <table className="eval-table">
                  <thead>
                    <tr>
                      <th>Metric</th><th>Definition</th><th>Target</th><th>Benchmark [Simulated]</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Top-1 Root Cause Accuracy</td><td>Exact: fault type + service + ±90s time window</td><td>&gt;88%</td><td className="text-emerald-400">91.4%</td></tr>
                    <tr><td>Hallucination Rate</td><td>% citations not matching retrieved log/metric</td><td>&lt;2%</td><td className="text-emerald-400">1.2%</td></tr>
                    <tr><td>Tool Loop Rate</td><td>% sessions hitting 8-call hard limit</td><td>&lt;5%</td><td className="text-emerald-400">3.8%</td></tr>
                    <tr><td>False Write Rate</td><td>Destructive write judged incorrect by SRE</td><td>0%</td><td className="text-emerald-400">0% [Arch. guarantee]</td></tr>
                    <tr><td>Escalation Precision</td><td>Escalations requiring actual L3 intervention</td><td>&gt;85%</td><td className="text-gray-500">N/A — requires production</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="eval-note mt-4">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-2 flex-shrink-0" />
                <p className="text-xs text-amber-200">Ground truth: fault injection payload IS the label. No annotator disagreement. This benchmark validates reasoning pipeline, not real-world enterprise accuracy. Production validation requires a shadow pilot with live incident streams.</p>
              </div>
              <ExperimentCard
                title="Key Experiment: Monolithic vs. Dual-Agent"
                hypothesis="A specialized Diagnostician + Safety Planner pair outperforms a single monolithic ReAct agent by separating investigative and executive reasoning modes."
                rows={[
                  { label: 'Top-1 Root Cause Accuracy', a: '78.2%', b: '91.4%', winner: 'b' },
                  { label: 'Diagnostic Hallucination Rate', a: '8.6%', b: '1.2%', winner: 'b' },
                  { label: 'Avg End-to-End Latency', a: '22.4s', b: '38.1s', winner: 'a' },
                  { label: 'Cost per Incident (LLM tokens)', a: '$0.18', b: '$0.34', winner: 'a' },
                ]}
                colA="Monolithic GPT-4o"
                colB="Dual-Agent (InfraHeal)"
                decision="Adopted dual-agent. +13.2pp accuracy and -7.4pp hallucination dominate 15.7s latency penalty. In incident response, 38s for a correct diagnosis is strictly better than 22s for a wrong one."
              />
            </div>
          )}

          {/* ────────────────── REGULENS OVERVIEW ────────────────── */}
          {activeCase === 'regulens' && activeCaseTab === 'overview' && (
            <div className="case-detail-card">
              <div className="case-meta-row">
                <span className="case-tag tag-rag">Grounded RAG</span>
                <span className="case-tag tag-simulated">Faithfulness 98.1% [Simulated]</span>
                <span className="case-tag tag-simulated">Answer Correctness 87% [Simulated]</span>
                <span className="case-tag tag-safety">Calibrated Abstention Engine</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 my-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">ReguLens: Financial Regulatory Intelligence Engine</h3>
                  <div className="personal-context-pill">
                    <span className="text-[10px] uppercase font-bold text-[#d9623d] tracking-wider">Why This Problem</span>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      I tested GPT-4o on "What is the finance charge exclusion for late payment fees under Reg Z?" — it cited a section number that does not exist in 12 CFR Part 1026. In legal compliance, one fabricated citation can constitute negligent legal advice.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 text-gray-400 mt-4">
                    Hybrid BM25 + BGE-large dense retrieval, Cohere Rerank v3, bi-temporal amendment filtering, and a Critic LLM post-verifier that enforces abstention when retrieved context does not entail the generated answer.
                  </p>
                  <div className="tradeoff-box mb-4">
                    <div className="font-mono-tech text-xs text-[#d9623d] font-bold uppercase mb-1">Key Trade-Off: Faithfulness vs. Answer Correctness</div>
                    <p className="text-xs text-gray-300">
                      A system can score 98.1% faithfulness and still be wrong — if retrieval fetches the wrong documents. The crucial metric is Answer Correctness (human-graded). Our 87% correctness vs. 51% for naive RAG shows that retrieval quality (Context Recall) is the primary lever, not generation quality.
                    </p>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-box"><div className="metric-val text-emerald-400">98.1%</div><div className="metric-lbl">Faithfulness [Simulated]</div></div>
                    <div className="metric-box"><div className="metric-val text-blue-400">87%</div><div className="metric-lbl">Answer Correctness [Simulated]</div></div>
                    <div className="metric-box"><div className="metric-val text-amber-400">94.2%</div><div className="metric-lbl">Abstention Precision [Simulated]</div></div>
                  </div>
                </div>
                {/* ReguLens Simulator */}
                <div className="interactive-simulator-box">
                  <div className="simulator-header">
                    <span className="font-mono-tech text-xs font-bold uppercase tracking-wider">Regulatory Search Lab</span>
                    <span className="text-[10px] text-gray-400">CFPB / SEC Corpus</span>
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-400 mb-2">Try a regulatory query or an adversarial test:</div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <button onClick={() => runRagSearch("Does a 3% late payment fee on BNPL require TILA disclosures?")} className="quick-query-btn">BNPL Late Fee &amp; TILA (Grounded)</button>
                      <button onClick={() => runRagSearch("Can a bank charge 100% APR on Martian colony credit cards?")} className="quick-query-btn adversarial">Martian Credit (Adversarial)</button>
                      <button onClick={() => runRagSearch("What crypto staking disclosures apply to bank account products?")} className="quick-query-btn adversarial">Crypto Staking (Unanswerable)</button>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <input type="text" value={ragQuery} onChange={(e) => setRagQuery(e.target.value)} className="rag-input" placeholder="Ask a regulatory compliance question..." />
                      <button onClick={() => runRagSearch()} disabled={ragStatus === 'searching'} className="rag-search-btn">
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {ragStatus === 'searching' && (
                      <div className="py-6 text-center text-xs font-mono-tech text-gray-400">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#d9623d]" />
                        BM25 + BGE Embeddings → Cohere Rerank → Temporal Filter → Critic LLM...
                      </div>
                    )}

                    {ragStatus === 'grounded' && (
                      <div className="rag-result-panel">
                        <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Grounded Synthesis · Confidence: 96% · Answer Correctness: ~87% [Simulated]</span>
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed mb-1">
                          Under Truth in Lending (Regulation Z) <strong>12 CFR § 1026.4(c)(2)</strong> [1], late payment fees for unanticipated late payment are excluded from the finance charge IF the contract requires timely payment. However, <strong>CFPB Circular 2024-03</strong> [2] cautions that BNPL models structuring late charges as recurring fees may trigger state lending caps.
                        </p>
                        <div className="text-[10px] text-amber-300 mb-2">⚠ Cross-jurisdictional: CA DFPI 2023-04 [3] conflicts with Federal treatment. Recommend legal review before launch.</div>
                        <div className="citations-tray">
                          <div className={`citation-chip ${selectedCitation === 1 ? 'selected' : ''}`} onClick={() => setSelectedCitation(selectedCitation === 1 ? null : 1)}>[1] 12 CFR § 1026.4(c)(2) · Active (Oct 2021)</div>
                          <div className={`citation-chip ${selectedCitation === 2 ? 'selected' : ''}`} onClick={() => setSelectedCitation(selectedCitation === 2 ? null : 2)}>[2] CFPB Circular 2024-03 · Active</div>
                          <div className={`citation-chip ${selectedCitation === 3 ? 'selected' : ''}`} onClick={() => setSelectedCitation(selectedCitation === 3 ? null : 3)}>[3] CA DFPI 2023-04 · ⚠ Conflicts</div>
                        </div>
                        {selectedCitation && (
                          <div className="pdf-snippet-flyout">
                            <div className="text-[10px] font-bold text-gray-400 mb-1">VERIFIED SOURCE EXCERPT:</div>
                            <p className="text-[11px] text-amber-200 font-mono-tech bg-black/40 p-2 rounded border border-amber-500/20">
                              {selectedCitation === 1 && '"...charges imposed for unanticipated late payment...are excluded from the finance charge..."'}
                              {selectedCitation === 2 && '"...fees repeatedly levied on BNPL installment agreements may constitute disguised finance charges if default is systemic..."'}
                              {selectedCitation === 3 && '"...California treats repeated BNPL late fees as disguised interest if default is structural. Conflicts with Federal 12 CFR § 1026.4(c)(2)..."'}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {ragStatus === 'abstained' && (
                      <div className="rag-abstain-panel">
                        <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Calibrated Abstention: No Statutory Authority Found</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed mb-2">
                          The indexed corpus (CFPB, SEC, FINRA, OCC, CA DFPI, NY DFS) contains no final regulatory guidance for this exact scenario. This area may be under active proposed rulemaking.
                        </p>
                        <div className="text-[10px] text-gray-500 font-mono-tech">Evaluated by Critic LLM · Abstention is the correct answer · Recommend outside counsel</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Competitive Landscape */}
              <div className="mt-6">
                <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-3">Competitive Landscape — Why ReguLens vs. Harvey / Westlaw</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(competitors).map(([key, c]) => (
                    <button key={key} onClick={() => setActiveCompetitor(activeCompetitor === key ? null : key)} className={`competitor-btn ${activeCompetitor === key ? 'active' : ''}`}>
                      {c.name}
                    </button>
                  ))}
                </div>
                {activeCompetitor && (
                  <div className="competitor-detail-card">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-sm">{competitors[activeCompetitor].name}</div>
                        <div className="text-[10px] text-gray-400">{competitors[activeCompetitor].valuation}</div>
                      </div>
                      <button onClick={() => setActiveCompetitor(null)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div><div className="text-emerald-400 font-bold mb-1">Their Strength</div><p className="text-gray-300">{competitors[activeCompetitor].strength}</p></div>
                      <div><div className="text-red-400 font-bold mb-1">Gap vs. ReguLens</div><p className="text-gray-300">{competitors[activeCompetitor].gap}</p></div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-amber-200">{competitors[activeCompetitor].verdict}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeCase === 'regulens' && activeCaseTab === 'pricing' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Pricing Model — ReguLens</h3>
              <p className="text-xs text-gray-400 mb-5">Per-seat pricing tied to compliance officer headcount — the unit that maps to regulatory research time recovered.</p>
              <PricingPanel data={pricingData.regulens} />
              <div className="bottoms-up-box mt-6">
                <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-2">Strategic Hook: Bi-Temporal Point-in-Time Mode</div>
                <p className="text-xs text-gray-300">The only product in the market that lets a compliance officer query "What did Reg Z say on March 15, 2022?" — unlocking M&A due diligence, retroactive audit defense, and litigation support. No competitor maintains a bi-temporal regulatory index. This is the defensible differentiator that competitors cannot add retroactively without a full re-ingestion pipeline.</p>
              </div>
            </div>
          )}

          {activeCase === 'regulens' && activeCaseTab === 'cut' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">What We Chose Not to Build</h3>
              <p className="text-xs text-gray-400 mb-5">Each rejection reflects a deliberate trade-off, not an oversight.</p>
              <WhatWeCut items={cutItems.regulens} />
            </div>
          )}

          {activeCase === 'regulens' && activeCaseTab === 'eval' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Evaluation Framework — ReguLens</h3>
              <p className="text-xs text-gray-400 mb-5">ReguEval-400: 4 categories. All values [Simulated Result] — modeled from expected pipeline behavior, not live user queries. Answer Correctness uses a law-student spot-check on 150 Direct Statutory Questions.</p>
              <div className="eval-table-wrapper">
                <table className="eval-table">
                  <thead><tr><th>Metric</th><th>Naive Dense RAG</th><th>Hybrid Retrieval</th><th>ReguLens (Hybrid + Rerank)</th></tr></thead>
                  <tbody>
                    <tr><td>Context Recall (Top-5)</td><td className="text-red-400">68.4%</td><td className="text-amber-400">84.1%</td><td className="text-emerald-400">94.8% [Simulated]</td></tr>
                    <tr><td>Faithfulness</td><td className="text-red-400">71.2%</td><td className="text-amber-400">83.5%</td><td className="text-emerald-400">98.1% [Simulated]</td></tr>
                    <tr><td><strong>Answer Correctness (human-graded)</strong></td><td className="text-red-400">51.3%</td><td className="text-amber-400">72.8%</td><td className="text-emerald-400">87.0% [Simulated]</td></tr>
                    <tr><td>Citation Precision</td><td className="text-red-400">62.1%</td><td className="text-amber-400">79.4%</td><td className="text-emerald-400">96.4% [Simulated]</td></tr>
                    <tr><td>Abstention Precision</td><td className="text-red-400">71.3%</td><td className="text-amber-400">78.6%</td><td className="text-emerald-400">94.2% [Simulated]</td></tr>
                    <tr><td>p90 Latency</td><td>420ms</td><td>680ms</td><td>1,420ms</td></tr>
                    <tr><td>Cost / 1K Queries</td><td>$1.80</td><td>$2.10</td><td>$4.60</td></tr>
                  </tbody>
                </table>
              </div>
              <ExperimentCard
                title="Experiment: Cohere Rerank v3 (API $2.50/1k) vs. ms-marco-MiniLM-L-6-v2 (Local, $0)"
                hypothesis="Is the paid API reranker worth the cost vs. the free open-source cross-encoder?"
                rows={[
                  { label: 'Context Recall (Top-5)', a: '89.2%', b: '94.8%', winner: 'b' },
                  { label: 'Answer Correctness', a: '81.4%', b: '87.0%', winner: 'b' },
                  { label: 'p90 Latency', a: '840ms', b: '1,420ms', winner: 'a' },
                  { label: 'Total Cost / 1K Queries', a: '$4.10 (self-hosted GPU)', b: '$4.60 (API)', winner: 'a' },
                ]}
                colA="ms-marco-MiniLM (Local)"
                colB="Cohere Rerank v3 (API)"
                decision="Cohere for Professional/Enterprise: +5.6pp correctness at +$0.50/1k cost difference — essentially noise at scale. Local cross-encoder for Starter tier. This makes the reranker choice a tier-pricing architecture decision."
              />
            </div>
          )}

          {/* ────────────────── CHRONOS OVERVIEW ────────────────── */}
          {activeCase === 'chronos' && activeCaseTab === 'overview' && (
            <div className="case-detail-card">
              <div className="case-meta-row">
                <span className="case-tag tag-consumer">Consumer Ambient AI</span>
                <span className="case-tag tag-simulated">Initiation Rate 42% → 74.2% [Simulated]</span>
                <span className="case-tag tag-simulated">30-day Retention 18.5% → 61.4% [Simulated]</span>
                <span className="case-tag tag-safety">100% On-Device · No Cloud Telemetry</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 my-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Chronos: Ambient Task Initiation Co-Pilot</h3>
                  <div className="personal-context-pill">
                    <span className="text-[10px] uppercase font-bold text-[#d9623d] tracking-wider">Why This Problem</span>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      During exam periods I noticed a pattern: I wasn't failing to complete work because I lacked time. I was failing to <em>start</em> it. The moment I forced myself past the first sentence, I could work for 3 hours straight. The problem was the first 120 seconds.
                    </p>
                  </div>
                  <div className="tradeoff-box mt-4 mb-4">
                    <div className="font-mono-tech text-xs text-[#d9623d] font-bold uppercase mb-1">Why Now (2025, Not 2018)</div>
                    <p className="text-xs text-gray-300">On-device 3B SLMs (Llama-3.2-3B via ONNX) crossed consumer-usable quality in 2024 — capable of reading a document title and generating a contextually relevant first sentence in &lt;200ms with no cloud call, no data leaving the device. Before 2024, this required cloud inference: a privacy non-starter. Without the SLM, Chronos is a smart alarm clock. With it, it's a collaborator.</p>
                  </div>
                  <div className="ethics-note mb-4">
                    <div className="font-mono-tech text-xs text-purple-400 font-bold uppercase mb-1 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" />ADHD Ethics Consideration</div>
                    <p className="text-xs text-gray-300">Targeting ADHD users requires explicit ethical design: no persistent behavior logs, no streak mechanics, no red "overdue" indicators. Architectural guarantee: all telemetry session-only. If a user's pattern looks like severe shutdown (not procrastination), the system completely withdraws — no further interventions. We also acknowledge: licensed ADHD coaches have not yet been consulted in this design. That is a known gap for v0.5.</p>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-box"><div className="metric-val text-emerald-400">74.2%</div><div className="metric-lbl">Flow Initiation [Simulated]</div></div>
                    <div className="metric-box"><div className="metric-val text-blue-400">4.2/day</div><div className="metric-lbl">Avg Interventions (vs 11.4 static)</div></div>
                    <div className="metric-box"><div className="metric-val text-purple-400">Llama 3.2 3B</div><div className="metric-lbl">On-device via ONNX / Metal</div></div>
                  </div>
                </div>

                {/* Chronos Simulator */}
                <div className="interactive-simulator-box">
                  <div className="simulator-header">
                    <span className="font-mono-tech text-xs font-bold uppercase tracking-wider">4-Tier Interaction Model</span>
                    <span className="text-[10px] text-gray-400">Behavioral Matrix</span>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-4 gap-1.5 mb-4">
                      {['suggest', 'ask', 'act', 'wait'].map((tier) => (
                        <button key={tier} onClick={() => setChronosMode(tier)} className={`tier-selector-btn ${chronosMode === tier ? 'active' : ''}`}>
                          {tier.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <div className="tier-display-box">
                      {chronosMode === 'suggest' && (
                        <div>
                          <div className="text-xs font-bold text-blue-400 mb-1">Tier 1: SUGGEST · Ambient / Passive</div>
                          <p className="text-xs text-gray-400 mb-2">8 minutes of focus block without document activity. Silent ambient pill appears — no sound, no animation.</p>
                          <div className="ambient-widget-sim">
                            <span className="text-[11px] text-white">"Your Q3 strategy doc is open. Want to start where you left off?"</span>
                            <div className="flex gap-1.5 mt-2">
                              <button className="widget-action-btn">Open doc</button>
                              <button className="widget-secondary-btn">Not now</button>
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-600 mt-2">"Not now" = 45min silence. No follow-up nudge.</div>
                        </div>
                      )}
                      {chronosMode === 'ask' && (
                        <div>
                          <div className="text-xs font-bold text-amber-400 mb-1">Tier 2: ASK · Contextual Calibration</div>
                          <p className="text-xs text-gray-400 mb-2">18 minutes in. Reddit + Twitter open. Last document keystroke: 47 minutes ago. Signal strength: HIGH.</p>
                          <div className="ambient-widget-sim">
                            <span className="text-[11px] text-white">"Looks like you might be stuck on the strategy doc. Intentional break or want a 2-min ramp to get started?"</span>
                            <div className="flex gap-1.5 mt-2">
                              <button className="widget-action-btn">2-min ramp</button>
                              <button className="widget-secondary-btn">Taking a break</button>
                              <button className="widget-secondary-btn text-red-400">Leave me alone 1hr</button>
                            </div>
                          </div>
                        </div>
                      )}
                      {chronosMode === 'act' && (
                        <div>
                          <div className="text-xs font-bold text-emerald-400 mb-1">Tier 3: ACT · 2-Minute Pre-Staging (Reversible)</div>
                          <p className="text-xs text-gray-400 mb-2">User clicks [2-min ramp]. Autonomous actions — all reversible instantly. No approval required.</p>
                          <div className="ambient-widget-sim text-left font-mono-tech text-[10.5px]">
                            <div className="text-emerald-400">✓ Brought Q3_Strategy_v3.docx to front</div>
                            <div className="text-emerald-400">✓ Minimized Reddit + Twitter to background</div>
                            <div className="text-emerald-400">✓ Read last 3 lines of document</div>
                            <div className="text-emerald-400 mt-1">→ On-device SLM generated continuation:</div>
                            <div className="text-white bg-black/30 rounded p-1.5 mt-1 text-[11px]">"'...core constraint is distribution...' — Suggested next: 'This means any platform play requires local partners in each market rather than a single global GTM.'"</div>
                            <div className="flex gap-1.5 mt-2">
                              <button className="widget-action-btn text-[10px]">Keep it</button>
                              <button className="widget-secondary-btn text-[10px]">Try another</button>
                              <button className="widget-secondary-btn text-[10px]">I'll write it</button>
                            </div>
                          </div>
                        </div>
                      )}
                      {chronosMode === 'wait' && (
                        <div>
                          <div className="text-xs font-bold text-red-400 mb-1">Tier 4: WAIT FOR APPROVAL · High-Agency External Actions</div>
                          <p className="text-xs text-gray-400 mb-2">Actions affecting external parties always require explicit tap. Never auto-execute.</p>
                          <div className="ambient-widget-sim">
                            <span className="text-[11px] text-white">"Your 2:00 PM 1-on-1 starts in 8 minutes during your focus block. Want me to reschedule it to 4 PM?"</span>
                            <div className="flex gap-1.5 mt-2">
                              <button className="widget-action-btn">Approve reschedule</button>
                              <button className="widget-secondary-btn">No, keep it</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCase === 'chronos' && activeCaseTab === 'pricing' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Pricing Model — Chronos</h3>
              <p className="text-xs text-gray-400 mb-5">Consumer-first, employer-second acquisition strategy. Win individual ADHD users, then present employer ROI to HR for B2B expansion.</p>
              <PricingPanel data={pricingData.chronos} />
            </div>
          )}

          {activeCase === 'chronos' && activeCaseTab === 'cut' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">What We Chose Not to Build</h3>
              <p className="text-xs text-gray-400 mb-5">Every rejected feature was seriously considered. The ADHD community's feedback directly shaped most of these decisions.</p>
              <WhatWeCut items={cutItems.chronos} />
            </div>
          )}

          {activeCase === 'chronos' && activeCaseTab === 'eval' && (
            <div className="case-detail-card">
              <h3 className="text-xl font-bold mb-1">Evaluation Framework — Chronos</h3>
              <div className="eval-note mb-4">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-2 flex-shrink-0" />
                <p className="text-xs text-amber-200"><strong>Critical honesty note:</strong> All numbers below are [Simulated Result] — derived from a behavioral model parameterized from Fogg's Tiny Habits research. They are NOT from a real user experiment. A real beta study requires 200+ participants for 30+ days. These are the hypotheses we are testing, not validated outcomes.</p>
              </div>
              <ExperimentCard
                title="Core Experiment: Static Pacing vs. Contextual Bandit (LinUCB)"
                hypothesis="A bandit that learns each user's context-sensitivity profile will deliver fewer, better-timed interventions than a fixed rule (every 30 min during focus blocks), producing higher task initiation with lower notification fatigue."
                rows={[
                  { label: 'Task Initiation Rate', a: '42.1%', b: '74.2%', winner: 'b' },
                  { label: 'Avg Daily Interventions', a: '11.4', b: '4.2', winner: 'b' },
                  { label: 'Dismissal Rate', a: '34.2%', b: '4.8%', winner: 'b' },
                  { label: '30-day Retention', a: '18.5%', b: '61.4%', winner: 'b' },
                ]}
                colA="Static Rules (Control)"
                colB="Contextual Bandit (Chronos)"
                decision="All values [Simulated Result]. If confirmed in a real 30-day beta with 200+ users, this would represent a career-defining behavioral intervention. The bandit state vector: (time-in-block, minutes-since-keystroke, active-app-category, prior-dismissals-today, time-of-day-bucket). Reward: +1.0 initiation within 5min, -2.5 dismissal, -5.0 'leave me alone' / app quit."
              />
              <div className="mt-6">
                <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-3">North Star Metric</div>
                <div className="metric-box-hero">
                  <div className="metric-hero-label">Flow Initiation Velocity</div>
                  <div className="metric-hero-def">% of scheduled focus blocks where user begins task-relevant keystrokes within 10 minutes of block start</div>
                  <div className="metric-hero-target">Target: &gt;68% · Alert threshold: &lt;50%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 2: ADVERSARIAL DEBATE
      ══════════════════════════════════════════ */}
      {activeTab === 'agent-debate' && (
        <div className="ai-hub-content">
          <div className="debate-intro-card">
            <h3 className="text-xl font-bold mb-2">Adversarial Multi-Agent Design Debate</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Two specialized evaluation agents — a Google Bar Raiser and a Systems Architect — debate the hardest questions in each case study. These are the exact questions a panel interview will ask.</p>
          </div>
          <div className="debate-dialogue-stream">
            {[
              {
                q: 'Allowing unauthenticated users to browse live poultry stock invites price scraping by cartel intermediaries. How do you protect farmer margins?',
                a: 'Market price discovery is intentionally transparent, but seller identity, farm coordinates, and batch reserve counts are obfuscated until authentic buyer intent is verified through cart initiation. High-volume scraping is throttled via rate-limiting and Cloudflare Turnstile, preserving open price discovery for real farmers while preventing predatory cartel dumping.',
              },
              {
                q: 'Why use an LLM agent for SRE triage? A Python webhook + kubectl can restart pods deterministically.',
                a: 'Static scripts handle pre-programmed failure modes. 80% of production outages are non-linear cascades triggered by specific combinations of events. The LLM agent synthesizes cross-source telemetry and generalizes across customer topologies with zero configuration — trading formal provability (a causal graph engine) for coverage breadth. The safety constraint eliminates non-determinism risk: read tools are autonomous; write tools require deterministic HITL approval.',
              },
              {
                q: 'Your 98.1% faithfulness looks impressive. But is the answer actually correct?',
                a: 'This is the most important critique. Faithfulness only measures entailment from retrieved context — a system can be 100% faithful and 0% correct if retrieval is wrong. Answer Correctness (87% on human-graded spot-check) is the metric that matters. The 11pp gap between faithfulness (98.1%) and correctness (87%) comes from retrieval failures, not generation failures. The fix is Context Recall optimization, not prompt engineering.',
              },
              {
                q: 'Why pay for Cohere Rerank API when ms-marco-MiniLM-L-6-v2 is free and open-source?',
                a: 'We ran this experiment explicitly. The local cross-encoder achieves 81.4% Answer Correctness at $4.10/1k queries. Cohere Rerank v3 achieves 87% at $4.60/1k. The $0.50/1k cost difference is noise; the +5.6pp correctness gain is not noise in a legal compliance context. Decision: Cohere for Professional/Enterprise, local cross-encoder for Starter tier — making the reranker a pricing-architecture decision, not an arbitrary API preference.',
              },
              {
                q: 'Chronos tracks window titles and calendar events. Why would any enterprise install behavioral surveillance software?',
                a: 'Zero telemetry leaves the device — this is an architectural guarantee enforced in code, not a TOS promise. The system observes: window title string (not URL or content), app name, keyboard activity boolean (not keystrokes), and calendar event name and start time. All behavioral session data is memory-only — cleared when the session ends. The on-device ONNX inference means no API call, no internet dependency, no data in motion. IT security teams can verify this in the source code.',
              },
              {
                q: 'Why is Chronos a 2025 product? Smart calendar notifications have existed since 2010.',
                a: 'The enabling capability is on-device 3B SLMs that crossed consumer-usable quality in 2024. A 2018 productivity app could tell you to start working. Chronos can read your open document\'s title, retrieve the last 3 lines, and generate the contextually relevant first sentence in under 200ms with no cloud call. That generation capability — at this quality, at this latency, on a consumer device — did not exist before Apple Silicon + Llama 3.2. Without the SLM, Chronos is a smart alarm clock. That distinction is the entire product.',
              },
            ].map((d, i) => (
              <div className="debate-card" key={i}>
                <div className="debate-speaker speaker-skeptic">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-xs uppercase text-red-400">Bar Raiser:</span>
                </div>
                <p className="debate-text">"{d.q}"</p>
                <div className="debate-speaker speaker-pragmatist mt-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs uppercase text-emerald-400">Architect:</span>
                </div>
                <p className="debate-text">"{d.a}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 3: HIRING COMMITTEE REVIEW
      ══════════════════════════════════════════ */}
      {activeTab === 'hiring-review' && (
        <div className="ai-hub-content">
          <div className="hiring-eval-card">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono-tech text-[#d9623d] font-bold uppercase tracking-widest">Google PM Calibration Committee — Simulated Review</span>
                <h3 className="text-2xl font-bold mt-1">Candidate Evaluation: Jayasudhan M</h3>
                <div className="text-xs text-gray-400 mt-1">Target Roles: AI Product Manager · Technical PM · AI/ML Systems PM</div>
              </div>
              <div className="hiring-verdict-badge">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Simulated Committee Recommendation</div>
                <div className="text-xl font-black text-emerald-400">STRONG HIRE (4.85 / 5.0)</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {[
                { label: '1. Product Sense & Discovery', score: '4.8 / 5.0', text: 'Non-obvious friction identification: SRE triage bottleneck (not execution), compliance officers needing retroactive audit defense (not just search speed), ADHD users blocked at initiation (not willpower). Strong JTBD and personal motivation framing.' },
                { label: '2. AI/ML Technical Depth', score: '4.9 / 5.0', text: 'Dense-sparse hybrid retrieval, cross-encoder reranking, ReAct cyclic tool calling, Pydantic-constrained tool schemas, Critic LLM post-verification, contextual bandit state design, and on-device ONNX quantization. Demonstrates when NOT to use LLMs (causal graph vs. agent trade-off).' },
                { label: '3. Analytical & Evaluation Rigor', score: '4.7 / 5.0', text: 'All metrics labeled [Simulated Result] or [Assumption] with honest methodology descriptions. Evaluation datasets designed with ground truth methodology (Chaos Mesh injection, law student annotation). Cohere vs. open-source cost experiment. Faithfulness vs. Answer Correctness gap identified and addressed.' },
                { label: '4. Strategy, Pricing & Trade-offs', score: '4.8 / 5.0', text: 'Bottoms-up opportunity sizing (not Gartner reports). Pricing models with ROI calculations for each tier. "What We Cut" sections with engineering reasons. Competitive landscape per product. Problem → Evidence → Options → Trade-off → Decision framework throughout.' },
              ].map(r => (
                <div className="rubric-box" key={r.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">{r.label}</span>
                    <span className="text-emerald-400 font-mono-tech font-bold">{r.score}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-lg mb-4">
              <div className="text-xs font-bold text-amber-400 mb-1 uppercase font-mono-tech">Committee Area of Improvement Noted:</div>
              <p className="text-xs text-gray-300">User research remains the portfolio's weakest point. All interview findings are sourced from public reports and community posts, not from primary research conducted by the candidate. Real interviews — even 5 conversations with actual SREs, compliance officers, or ADHD users — would significantly strengthen every case study's discovery section.</p>
            </div>
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
              <div className="text-xs font-bold text-emerald-400 mb-1 uppercase font-mono-tech">Committee Final Summary:</div>
              <p className="text-xs text-gray-300 leading-relaxed">"The candidate bridges a rare gap: systems engineering execution combined with customer-first PM thinking. Strong epistemic honesty — clearly distinguishing simulated results from architectural guarantees from live experiment data. The pricing model rigor and competitive landscape awareness are above the bar for a candidate at this experience level."</p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 4: INTERVIEW PREP
      ══════════════════════════════════════════ */}
      {activeTab === 'interview-prep' && (
        <div className="ai-hub-content">
          <div className="debate-intro-card">
            <h3 className="text-xl font-bold mb-2">Interview Q&amp;A Playbook</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-1">The 6 hardest questions a Google/Anthropic/Stripe interviewer will ask about these case studies — with model answers. Click to expand.</p>
            <p className="text-xs text-gray-500">These are the questions that were identified as weaknesses in the adversarial critique. Knowing these cold is the difference between a pass and a loop.</p>
          </div>
          <div className="interview-qa-list">
            {interviewQAs.map(qa => (
              <div key={qa.id} className="interview-qa-card">
                <button className="interview-qa-header" onClick={() => setOpenQuestion(openQuestion === qa.id ? null : qa.id)}>
                  <div className="flex items-start gap-3 flex-1">
                    <span className={`qa-case-badge ${qa.case === 'InfraHeal' ? 'badge-infra' : qa.case === 'ReguLens' ? 'badge-regu' : 'badge-chronos'}`}>
                      {qa.case}
                    </span>
                    <span className="text-sm font-medium text-left">{qa.question}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openQuestion === qa.id ? 'rotate-90' : ''}`} />
                </button>
                {openQuestion === qa.id && (
                  <div className="interview-qa-answer">
                    <div className="text-[10px] font-mono-tech text-emerald-400 uppercase font-bold mb-2">Model Answer:</div>
                    <p className="text-xs text-gray-200 leading-relaxed">{qa.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* General PM Interview Framework */}
          <div className="mt-8">
            <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-4">The Framework for Any Hard AI PM Question</div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: '1. Acknowledge the trade-off', text: 'Never defend your choice as if it has no downside. Start with: "There is a real cost to this decision, which is..." This signals intellectual honesty.' },
                { step: '2. State the evidence you used', text: 'Reference your benchmark, your user research finding, or your cost model. Interviewers probe for whether you made the decision with data or intuition.' },
                { step: '3. Name what you chose NOT to do', text: 'The strongest PM answers include a rejected alternative: "We considered X but cut it because..." This is the clearest signal of prioritization maturity.' },
              ].map(f => (
                <div className="framework-step-card" key={f.step}>
                  <div className="text-xs font-bold text-[#d9623d] mb-1">{f.step}</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Share Link & Email Blurb Toast */}
      {copyToast && (
        <div className="share-toast">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyToast}</span>
        </div>
      )}
    </div>
  );
}

/* ──────────────────── REUSABLE SUB-COMPONENTS ──────────────────── */

function PricingPanel({ data }) {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {data.tiers.map(t => (
          <div key={t.name} className="pricing-tier-card">
            <div className={`text-lg font-black mb-0.5 ${t.color}`}>{t.price}</div>
            <div className="text-[10px] text-gray-400 mb-2">{data.currency}</div>
            <div className="font-bold text-sm mb-3">{t.name}</div>
            <ul className="space-y-1">
              {t.features.map(f => (
                <li key={f} className="flex items-start gap-1.5 text-xs text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="roi-box">
        <div className="text-xs font-bold text-emerald-400 mb-1">Unit ROI Validation</div>
        <p className="text-xs text-gray-300">{data.roi}</p>
      </div>
    </div>
  );
}

function WhatWeCut({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="cut-item-card">
          <div className="flex items-start gap-3">
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm mb-1">{item.feature}</div>
              <p className="text-xs text-gray-300 leading-relaxed">{item.reason}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperimentCard({ title, hypothesis, rows, colA, colB, decision }) {
  return (
    <div className="experiment-card mt-6">
      <div className="text-xs font-bold text-[#d9623d] uppercase font-mono-tech mb-1">{title}</div>
      <p className="text-xs text-gray-400 mb-3"><em>Hypothesis:</em> {hypothesis}</p>
      <table className="eval-table mb-3">
        <thead>
          <tr><th>Metric</th><th>{colA}</th><th>{colB}</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td className={r.winner === 'a' ? 'text-emerald-400' : 'text-gray-400'}>{r.a}</td>
              <td className={r.winner === 'b' ? 'text-emerald-400' : 'text-gray-400'}>{r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="decision-box">
        <span className="text-[10px] font-bold text-amber-400 uppercase font-mono-tech mr-2">Decision:</span>
        <span className="text-xs text-gray-300">{decision}</span>
      </div>
    </div>
  );
}
