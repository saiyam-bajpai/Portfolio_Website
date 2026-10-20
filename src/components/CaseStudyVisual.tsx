import React from 'react'
import { ShieldCheck, AlertCircle, CheckCircle2, Cpu, Eye, Layers, GitBranch } from 'lucide-react'

interface CaseStudyVisualProps {
  slug: string
}

export const CaseStudyVisual: React.FC<CaseStudyVisualProps> = ({ slug }) => {
  switch (slug) {
    case 'roadwatch-ai':
      return <RoadWatchAIVisual />
    case 'finca-xai':
      return <FinCAXAIVisual />
    case 'sasti-dawai-aayu':
      return <SastiDawaiVisual />
    case 'gestureflow':
      return <GestureFlowVisual />
    case 'queueless-bharat':
      return <QueueLessBharatVisual />
    default:
      return null
  }
}

/**
 * 1. RoadWatch AI: Verified Pipeline & Detection IoU Evaluation Matrix
 */
const RoadWatchAIVisual: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Visual Pipeline Architecture */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-ivory/6">
          <span className="text-accent-cool uppercase tracking-wider flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Detection Pipeline Topology (Ultralytics YOLOv8 on Colab T4)
          </span>
          <span className="text-ivory-faint text-[11px]">Hardware: NVIDIA T4 Tensor Core</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="text-[10px] text-ivory-muted uppercase block">Stage 01: Capture</span>
            <span className="text-ivory-bright font-semibold block mt-1">20,000 Frames</span>
            <span className="text-[11px] text-ivory-faint mt-1 block">Asphalt hazard imagery + affine transforms</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="text-[10px] text-ivory-muted uppercase block">Stage 02: Backbone</span>
            <span className="text-ivory-bright font-semibold block mt-1">CSPDarknet53</span>
            <span className="text-[11px] text-ivory-faint mt-1 block">Cross-stage spatial feature pyramid (C2f)</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="text-[10px] text-ivory-muted uppercase block">Stage 03: Loss Tuning</span>
            <span className="text-ivory-bright font-semibold block mt-1">CIoU + DFL</span>
            <span className="text-[11px] text-ivory-faint mt-1 block">Distribution Focal Loss on asphalt shadows</span>
          </div>

          <div className="rounded border border-accent-emerald/30 bg-accent-emerald/5 p-3">
            <span className="text-[10px] text-accent-emerald uppercase block font-semibold">Stage 04: Validation</span>
            <span className="text-accent-emerald font-bold block mt-1">0.75 mAP@50</span>
            <span className="text-[11px] text-ivory-soft mt-1 block">75.9% Prec / 68.4% Recall</span>
          </div>
        </div>
      </div>

      {/* Detection Evidence Card with Clean Placeholder */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-deep/70 p-5 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ivory/6">
          <div className="flex items-center gap-2 text-ivory-soft">
            <Eye className="h-4 w-4 text-accent-cool" />
            <span>Field Validation Imagery &amp; Precision Boundary</span>
          </div>
          <span className="text-accent-emerald text-[11px] bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded">
            Resume Baseline Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Ground truth vs Model IoU Diagram */}
          <div className="rounded border border-ivory/8 bg-charcoal-surface/60 p-4 space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-ivory-muted">Intersection over Union (IoU):</span>
              <span className="text-ivory-bright font-semibold">Threshold 0.50</span>
            </div>
            <div className="h-2 w-full bg-charcoal-elevated rounded overflow-hidden">
              <div className="h-full bg-accent-emerald rounded" style={{ width: '75%' }} />
            </div>
            <p className="text-[11px] text-ivory-muted leading-relaxed font-sans pt-1">
              Calibrated against harsh road textures and directional shadows. Pothole boundary boxes evaluated with Complete IoU (CIoU) to prevent bounding box collapse.
            </p>
          </div>

          {/* Clean Evidence Placeholder for Field Captures */}
          <div className="rounded border border-dashed border-ivory/15 bg-charcoal-elevated/40 p-4 flex flex-col justify-between">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-ivory-muted shrink-0 mt-0.5" />
              <div>
                <span className="text-ivory-bright font-semibold text-xs block">Field Inference Output Imagery</span>
                <span className="text-ivory-muted text-[11px] font-sans block mt-1">
                  Raw annotated JPG prediction frames are archived in the model evaluation run directory. Repository weight checkpoints available on GitHub.
                </span>
              </div>
            </div>
            <a
              href="https://github.com/saiyam-bajpai/Pothole-Detection-Model-for-RoadWatch-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-[11px] text-accent-cool hover:text-ivory-bright inline-flex items-center gap-1"
            >
              <span>Inspect Ultralytics Training Weights on GitHub</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 2. FinCA XAI: TreeSHAP Feature Attribution Flow & Demographic Proxy Elimination
 */
const FinCAXAIVisual: React.FC = () => {
  const shapAttributions = [
    { feature: 'Debt-to-Income (DTI) Ratio', effect: '-0.34 (Increases Risk)', weight: 85, isPositive: false },
    { feature: 'On-Time Payment History (36 Mo)', effect: '+0.42 (Decreases Risk)', weight: 95, isPositive: true },
    { feature: 'Credit Utilization Ratio (<30%)', effect: '+0.28 (Decreases Risk)', weight: 70, isPositive: true },
    { feature: 'Recent Unsecured Credit Inquiries', effect: '-0.19 (Increases Risk)', weight: 45, isPositive: false },
  ]

  return (
    <div className="space-y-6">
      {/* SHAP Architecture Flow */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-ivory/6">
          <span className="text-accent-cool uppercase tracking-wider flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Explainable AI Architecture: Scikit-Learn + TreeSHAP
          </span>
          <span className="text-accent-emerald text-[11px]">Fairness Policy Enforced</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="text-[10px] text-ivory-muted uppercase block">1. Input Sanitation</span>
            <span className="text-ivory-bright font-semibold block mt-1">Zero Proxy Biases</span>
            <p className="text-[11px] text-ivory-faint mt-1 font-sans">
              Explicit exclusion of demographic, postal code, and protected attributes from training matrices.
            </p>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="text-[10px] text-ivory-muted uppercase block">2. Risk Estimation</span>
            <span className="text-ivory-bright font-semibold block mt-1">Ensemble Classifier</span>
            <p className="text-[11px] text-ivory-faint mt-1 font-sans">
              Gradient-boosted decision trees trained strictly on substantiated financial liquidity metrics.
            </p>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="text-[10px] text-ivory-muted uppercase block">3. Local Explanation</span>
            <span className="text-ivory-bright font-semibold block mt-1">TreeSHAP Decomposition</span>
            <p className="text-[11px] text-ivory-faint mt-1 font-sans">
              Calculates exact Shapley values for each applicant, showing positive and negative marginal impacts.
            </p>
          </div>
        </div>
      </div>

      {/* SHAP Attribution Waterfall Illustration */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-deep/70 p-5 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ivory/6">
          <span className="text-ivory-bright font-semibold">Local Feature Attribution Decomposition (SHAP Values)</span>
          <span className="text-ivory-muted text-[11px]">Baseline Expected Value E[f(x)] = 0.52</span>
        </div>

        <div className="space-y-3 pt-2">
          {shapAttributions.map((item) => (
            <div key={item.feature} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-ivory-soft">{item.feature}</span>
                <span className={item.isPositive ? 'text-accent-emerald font-semibold' : 'text-amber-400 font-semibold'}>
                  {item.effect}
                </span>
              </div>
              <div className="h-1.5 w-full bg-charcoal-elevated rounded overflow-hidden">
                <div
                  className={`h-full rounded ${item.isPositive ? 'bg-accent-emerald' : 'bg-amber-400'}`}
                  style={{ width: `${item.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-ivory/6 text-[11px] text-ivory-muted font-sans flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-accent-emerald shrink-0" />
          <span>Institutional review dashboard enables credit officers to provide applicants with actionable, compliant rejection reasons rather than black-box scores.</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 3. Sasti Dawai: Verified Vision-to-Deterministic Pipeline Architecture
 */
const SastiDawaiVisual: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 5-Stage Architecture Topology based on Sasti_Dawai_ML_README.md */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-ivory/6">
          <span className="text-accent-cool uppercase tracking-wider flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Subsystem Architecture: Vision Ingestion → Deterministic Equivalence
          </span>
          <span className="text-accent-emerald text-[11px]">AAYU 2026 Certified</span>
        </div>

        {/* Pipeline Steps Flow */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-2 text-center text-[11px]">
          <div className="rounded border border-ivory/8 bg-charcoal-deep/80 p-3">
            <span className="text-ivory-faint block uppercase text-[9px]">Stage 01</span>
            <span className="text-ivory-bright font-semibold block mt-0.5">Image Quality Gate</span>
            <span className="text-accent-cool text-[10px] block mt-1 font-mono">Laplacian &lt; 100</span>
            <span className="text-ivory-faint text-[10px] block">Glare &gt; 15% rejected</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/80 p-3">
            <span className="text-ivory-faint block uppercase text-[9px]">Stage 02</span>
            <span className="text-ivory-bright font-semibold block mt-0.5">Vision Extraction</span>
            <span className="text-accent-cool text-[10px] block mt-1 font-mono">Pydantic v2</span>
            <span className="text-ivory-faint text-[10px] block">Unknowns stay null</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/80 p-3">
            <span className="text-ivory-faint block uppercase text-[9px]">Stage 03</span>
            <span className="text-ivory-bright font-semibold block mt-0.5">Multi-Reconciliation</span>
            <span className="text-accent-cool text-[10px] block mt-1 font-mono">Front / Back Check</span>
            <span className="text-ivory-faint text-[10px] block">Flags contradictions</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/80 p-3">
            <span className="text-ivory-faint block uppercase text-[9px]">Stage 04</span>
            <span className="text-ivory-bright font-semibold block mt-0.5">Canonical Normalizer</span>
            <span className="text-accent-cool text-[10px] block mt-1 font-mono">Salts &amp; Release</span>
            <span className="text-ivory-faint text-[10px] block">SR/ER/XR dosage forms</span>
          </div>

          <div className="rounded border border-accent-emerald/30 bg-accent-emerald/5 p-3">
            <span className="text-accent-emerald block uppercase text-[9px] font-semibold">Stage 05</span>
            <span className="text-accent-emerald font-semibold block mt-0.5">Safety Matcher</span>
            <span className="text-accent-emerald text-[10px] block mt-1 font-mono">EXACT | CLOSE | NONE</span>
            <span className="text-ivory-soft text-[10px] block">Code decides</span>
          </div>
        </div>
      </div>

      {/* Truthful Implementation Status Callout from PRD */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-deep/70 p-5 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ivory/6">
          <span className="text-ivory-bright font-semibold">Verified Subsystem Implementation vs. Pending Integration Status</span>
          <span className="text-ivory-faint text-[11px]">Source: brief/Sasti_Dawai_ML_README.md</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-xs">
          {/* Confirmed & Tested Components */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-accent-emerald uppercase font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent-emerald" />
              Confirmed &amp; Offline Tested (Saiyam's ML Subsystem)
            </span>
            <ul className="space-y-1.5 text-ivory-muted pl-4 list-disc">
              <li>Pydantic schemas and strict null validation contracts</li>
              <li>Image quality gate (blur, extreme brightness 40–235, glare saturation)</li>
              <li>Multi-image front/back strip contradiction detection</li>
              <li>Canonical medicine normalization (salts, strengths, units, release forms)</li>
              <li>Deterministic 3-tier safety equivalence matcher (EXACT, CLOSE, NONE)</li>
              <li>Jan Aushadhi catalogue ETL pipeline with provenance tracking</li>
            </ul>
          </div>

          {/* Pending Full Pipeline Integration */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-amber-400 uppercase font-semibold flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
              Pending Full Pipeline Integration
            </span>
            <ul className="space-y-1.5 text-ivory-muted pl-4 list-disc">
              <li>Live cloud vision model integration (currently tested against mock vision extractor)</li>
              <li>Live OCR cross-check in production pipeline (PaddleOCR / Vision Transformer)</li>
              <li>Physical packaging barcode and 2D GS1 DataMatrix decoding</li>
              <li>Golden evaluation dataset benchmark on 50–100 physical Indian medicine pack photos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 4. GestureFlow: 6-Iteration Engineering Progression & Gesture Lexicon
 */
const GestureFlowVisual: React.FC = () => {
  const iterationPhases = [
    { version: 'v1 – v2', type: 'CLI Prototype', detail: 'Single-hand landmark tracking via MediaPipe. Terminal stdout coordinate stream.' },
    { version: 'v3 – v4', type: 'Spatial Vector Engine', detail: 'Euclidean distance thresholds between index & thumb for OS volume and scrolling triggers.' },
    { version: 'v5', type: 'Fault Tolerance', detail: 'Off-axis angle compensation and frame smoothing to eliminate false gesture triggers.' },
    { version: 'v6', type: 'Modular Application', detail: 'Modular web-enabled architecture with local desktop execution and configuration controls.' },
  ]

  return (
    <div className="space-y-6">
      {/* 6-Iteration Evolution Road */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-ivory/6">
          <span className="text-accent-cool uppercase tracking-wider flex items-center gap-2">
            <Layers className="h-4 w-4" />
            6-Release Engineering Progression (CLI v1 to Web App v6)
          </span>
          <span className="text-ivory-faint text-[11px]">Commodity Webcam Only</span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {iterationPhases.map((phase) => (
            <div key={phase.version} className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
              <span className="text-accent-cool font-semibold block">{phase.version}</span>
              <span className="text-ivory-bright font-medium text-[11px] block mt-0.5">{phase.type}</span>
              <p className="text-[11px] text-ivory-muted font-sans mt-1.5 leading-relaxed">
                {phase.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hand Landmark Mapping & Demo Footage Status */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-deep/70 p-5 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ivory/6">
          <span className="text-ivory-bright font-semibold">21 3D Hand Landmarks &amp; Action Trigger Lexicon</span>
          <span className="text-accent-emerald text-[11px]">Zero Sensor Dependency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-[11px]">
          <div className="rounded border border-ivory/8 bg-charcoal-surface/60 p-3">
            <span className="text-accent-cool block font-semibold">Pinch Gesture</span>
            <span className="text-ivory-muted text-[10px] block mt-0.5">Thumb tip (4) to Index tip (8)</span>
            <span className="text-ivory-bright block mt-1">Scroll Dynamic Delta</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-surface/60 p-3">
            <span className="text-accent-cool block font-semibold">Vertical Vector</span>
            <span className="text-ivory-muted text-[10px] block mt-0.5">Index tip Y displacement</span>
            <span className="text-ivory-bright block mt-1">OS Volume Control</span>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-surface/60 p-3">
            <span className="text-accent-cool block font-semibold">Horizontal Span</span>
            <span className="text-ivory-muted text-[10px] block mt-0.5">Wrist (0) to Middle tip (12)</span>
            <span className="text-ivory-bright block mt-1">Display Brightness Slider</span>
          </div>
        </div>

        {/* Clean Placeholder for Demo Footage */}
        <div className="rounded border border-dashed border-ivory/15 bg-charcoal-elevated/40 p-4 flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-ivory-muted shrink-0 mt-0.5" />
          <div className="font-sans text-xs">
            <span className="text-ivory-bright font-semibold font-mono block">Demo Video Asset Status</span>
            <span className="text-ivory-muted block mt-1">
              Screen recording demonstration of the hands-free desktop control loop is stored in offline project archives. Public walkthrough is available on request during technical interviews.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 5. QueueLess Bharat: Verified ML Lead Contribution at Hackathon 2026
 */
const QueueLessBharatVisual: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hackathon Lead Responsibility Scope */}
      <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-ivory/6">
          <span className="text-accent-cool uppercase tracking-wider flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Machine Learning Lead Scope (National Summer Hackathon SkillStation 2026)
          </span>
          <span className="text-accent-emerald text-[11px]">Certified Lead Award</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="font-mono text-[10px] text-accent-cool uppercase block">01 / ML Architecture</span>
            <span className="font-semibold text-ivory-bright block mt-1">Queue Density Estimation</span>
            <p className="text-ivory-muted mt-1 leading-relaxed text-[11px]">
              Trained computer vision models to track spatial headcount and queue length bounding regions across counter waiting zones.
            </p>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="font-mono text-[10px] text-accent-cool uppercase block">02 / Team Leadership</span>
            <span className="font-semibold text-ivory-bright block mt-1">Coordinated Team of 4</span>
            <p className="text-ivory-muted mt-1 leading-relaxed text-[11px]">
              Structured data exchange schemas between the ML prediction pipeline and backend service endpoints to stream real-time throughput metrics.
            </p>
          </div>

          <div className="rounded border border-ivory/8 bg-charcoal-deep/70 p-3">
            <span className="font-mono text-[10px] text-accent-cool uppercase block">03 / Bottleneck Alerts</span>
            <span className="font-semibold text-ivory-bright block mt-1">Threshold Dispatch</span>
            <p className="text-ivory-muted mt-1 leading-relaxed text-[11px]">
              Engineered trigger criteria alerting supervisory personnel when counter dwell times exceeded acceptable public service thresholds.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Hackathon Context Note */}
      <div className="rounded-lg border border-ivory/8 bg-charcoal-deep/60 p-4 font-mono text-xs flex items-start gap-3">
        <ShieldCheck className="h-4 w-4 text-accent-emerald shrink-0 mt-0.5" />
        <div className="font-sans text-xs">
          <span className="font-mono text-ivory-bright font-semibold block">Confirmed Hackathon Contribution Baseline</span>
          <span className="text-ivory-muted block mt-1">
            Documentation is strictly limited to verified hackathon responsibilities as Machine Learning Lead. No speculative claims regarding commercial deployments, patented algorithms, or municipal integration are made.
          </span>
        </div>
      </div>
    </div>
  )
}
