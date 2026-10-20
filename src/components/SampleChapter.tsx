import React, { useState, useEffect, useRef } from 'react'
import { Layers, Sliders, CheckCircle2, ShieldCheck, Database, ArrowDown, Activity } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

interface Milestone {
  id: number
  tag: string
  title: string
  italicPhrase: string
  description: string
  specs: { label: string; value: string }[]
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    tag: 'PHASE 01 // DATASET CURATION',
    title: 'Custom 20,000-Image Augmentation Pipeline',
    italicPhrase: 'Simulating severe road conditions through deterministic preprocessing.',
    description:
      'Road damage imagery suffers from harsh specular glare, shadowed asphalt, and varied surface textures. Built an automated preprocessing pipeline with OpenCV and NumPy to augment raw captures into a robust, balanced dataset of 20,000 samples.',
    specs: [
      { label: 'Dataset Volume', value: '20,000 Frames' },
      { label: 'Preprocessing', value: 'OpenCV / NumPy' },
      { label: 'Variations', value: 'Lighting, Texture, Noise' },
    ],
  },
  {
    id: 2,
    tag: 'PHASE 02 // ARCHITECTURE & TRAINING',
    title: 'YOLOv8 Optimization on Colab T4 GPU',
    italicPhrase: 'Hyperparameter tuning for real-time spatial localization.',
    description:
      'Leveraged the Ultralytics YOLOv8 architecture on cloud T4 GPU instances. Performed systematic hyperparameter search across anchor box priors, learning rate warmups, and feature pyramid network (FPN) neck scales to maximize detection stability.',
    specs: [
      { label: 'Framework', value: 'Ultralytics YOLOv8' },
      { label: 'Hardware', value: 'Google Colab (T4 GPU)' },
      { label: 'Loss Function', value: 'CIoU + DFL + BCE' },
    ],
  },
  {
    id: 3,
    tag: 'PHASE 03 // BENCHMARK VERIFICATION',
    title: 'Validation Batches & Metric Evidence',
    italicPhrase: 'Quantifiable accuracy validated against hold-out test distributions.',
    description:
      'Rigorous evaluation on unseen validation batches demonstrated dependable detection performance. Balanced false-alarm minimization against high detection sensitivity for municipal damage reporting.',
    specs: [
      { label: 'Precision', value: '75.9%' },
      { label: 'Recall', value: '68.4%' },
      { label: 'mAP@50', value: '0.75' },
    ],
  },
]

export const SampleChapter: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState<number>(1)
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(65)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Robust forward and reverse scroll synchronizer
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45
      let closestStep = 1
      let minDistance = Infinity

      stepRefs.current.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - viewportCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestStep = index + 1
        }
      })

      setActiveMilestone(closestStep)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="sample-chapter" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-12 border-t border-ivory/8">
      {/* Chapter Masthead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-ivory/8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent-cool uppercase tracking-widest mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cool animate-pulse" />
            <span>Interactive Project Chapter // Sticky Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ivory-bright font-sans">
            RoadWatch AI: <span className="font-serif italic font-normal text-ivory-soft">Perception Lifecycle</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ivory-muted max-w-xs text-left md:text-right">
          Synchronized scroll-linked visualizer. Click milestones or scroll to navigate forward and reverse.
        </div>
      </div>

      {/* Touch / Quick Segment Controller (Accessible bypass for touch devices and rapid navigation) */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
        <span className="text-ivory-faint shrink-0 pr-2">JUMP TO PHASE:</span>
        {MILESTONES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setActiveMilestone(m.id)
              stepRefs.current[m.id - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className={`shrink-0 px-3 py-1.5 rounded border transition-all ${
              activeMilestone === m.id
                ? 'border-accent-cool bg-accent-cool/10 text-ivory-bright font-medium'
                : 'border-ivory/10 bg-charcoal-elevated/50 text-ivory-muted hover:text-ivory hover:border-ivory/20'
            }`}
          >
            0{m.id}. {m.tag.split('//')[1]?.trim() || m.title}
          </button>
        ))}
      </div>

      {/* Sticky-Scroll Container */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Narrative Milestones (Forward & Reverse friendly spacing) */}
        <div className="lg:col-span-6 space-y-20 py-4">
          {MILESTONES.map((milestone, idx) => {
            const isActive = activeMilestone === milestone.id
            return (
              <div
                key={milestone.id}
                ref={(el) => {
                  stepRefs.current[idx] = el
                }}
                onClick={() => setActiveMilestone(milestone.id)}
                className={`cursor-pointer transition-all duration-300 rounded-lg p-6 border ${
                  isActive
                    ? 'border-accent-cool/50 bg-charcoal-surface/90 shadow-card'
                    : 'border-ivory/6 bg-charcoal-deep/30 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs text-accent-cool mb-3">
                  <span className="font-medium tracking-wider">{milestone.tag}</span>
                  <span className="text-ivory-muted">0{milestone.id} / 03</span>
                </div>

                <h3 className="text-2xl font-semibold text-ivory-bright font-sans">
                  {milestone.title}
                </h3>

                <p className="mt-2 text-base text-ivory-soft font-serif italic">
                  "{milestone.italicPhrase}"
                </p>

                <p className="mt-4 text-sm leading-relaxed text-ivory-muted font-sans">
                  {milestone.description}
                </p>

                {/* Specs List */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-ivory/8 pt-4">
                  {milestone.specs.map((spec) => (
                    <div key={spec.label} className="font-mono text-xs">
                      <span className="block text-ivory-faint text-[10px] uppercase">{spec.label}</span>
                      <span className="block text-ivory-soft font-medium mt-0.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column: Sticky Reactive Architectural Visualizer (Cannot trap user) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div className="rounded-lg border border-ivory/12 bg-charcoal-surface/95 shadow-elevated overflow-hidden backdrop-blur-md max-h-[calc(100vh-7rem)] overflow-y-auto">
            {/* Visualizer Frame Header */}
            <div className="flex items-center justify-between border-b border-ivory/8 bg-charcoal-elevated/80 px-4 py-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-ivory-soft">
                <Layers className="h-4 w-4 text-accent-cool" aria-hidden="true" />
                <span>STATE // STAGE_0{activeMilestone}_SYNCHRONIZED</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-accent-emerald text-[11px]">
                <Activity className="h-3 w-3 animate-pulse" />
                ACTIVE
              </span>
            </div>

            {/* Visualizer Display Canvas */}
            <div className="p-6 min-h-[380px] flex flex-col justify-between">
              {/* STATE 1: Animated Technical Pipeline Nodes */}
              {activeMilestone === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ivory-muted uppercase tracking-wider">
                      Dataset Processing Pipeline Nodes
                    </span>
                    <span className="tech-pill text-accent-cool">20,000 augmented frames</span>
                  </div>

                  {/* Flow Diagram with Animated Nodes */}
                  <div className="space-y-3 font-mono text-xs">
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35 }}
                      className="rounded border border-ivory/10 bg-charcoal-deep/80 p-3.5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 text-ivory">
                        <Database className="h-4 w-4 text-accent-cool" />
                        <span className="font-medium">Node 1: Raw Asphalt Capture Ingestion</span>
                      </div>
                      <span className="text-ivory-muted text-[11px] bg-charcoal-elevated px-2 py-0.5 rounded">JPG / PNG</span>
                    </motion.div>

                    <div className="flex justify-center text-ivory/30">
                      <ArrowDown className="h-3.5 w-3.5 text-accent-cool/60" />
                    </div>

                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 }}
                      className="rounded border border-accent-cool/30 bg-charcoal-elevated/80 p-3.5"
                    >
                      <div className="flex items-center justify-between text-ivory">
                        <span className="text-accent-cool font-medium">Node 2: OpenCV + NumPy Transformations</span>
                        <span className="text-[11px] text-accent-emerald flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
                          Processing
                        </span>
                      </div>
                      <div className="mt-2.5 grid grid-cols-3 gap-2 text-[11px] text-ivory-muted">
                        <span className="bg-charcoal-deep/70 px-2 py-1 rounded text-center">Gamma Contrast</span>
                        <span className="bg-charcoal-deep/70 px-2 py-1 rounded text-center">Affine Rotation</span>
                        <span className="bg-charcoal-deep/70 px-2 py-1 rounded text-center">Shadow Masking</span>
                      </div>
                    </motion.div>

                    <div className="flex justify-center text-ivory/30">
                      <ArrowDown className="h-3.5 w-3.5 text-accent-cool/60" />
                    </div>

                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.3 }}
                      className="rounded border border-ivory/10 bg-charcoal-deep/80 p-3.5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 text-ivory">
                        <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                        <span className="font-medium">Node 3: Normalized Training Tensors</span>
                      </div>
                      <span className="text-ivory-soft text-[11px] bg-charcoal-elevated px-2 py-0.5 rounded">640×640 Anchors</span>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* STATE 2: Training & Optimization Visualizer */}
              {activeMilestone === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ivory-muted uppercase tracking-wider">
                      YOLOv8 Optimization Graph
                    </span>
                    <span className="tech-pill text-accent-cool">Colab T4 Hardware</span>
                  </div>

                  {/* Convergence Progress Lines */}
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-ivory-muted mb-1">
                        <span>Box Loss Convergence</span>
                        <span className="text-ivory-soft">0.038 (stable)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-charcoal-deep overflow-hidden">
                        <motion.div
                          initial={shouldReduceMotion ? { width: '84%' } : { width: 0 }}
                          animate={{ width: '84%' }}
                          transition={{ duration: 0.6 }}
                          className="h-full bg-accent-cool"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-ivory-muted mb-1">
                        <span>Classification Loss (Pothole Class)</span>
                        <span className="text-ivory-soft">0.019 (minimized)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-charcoal-deep overflow-hidden">
                        <motion.div
                          initial={shouldReduceMotion ? { width: '92%' } : { width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="h-full bg-accent-emerald"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-ivory-muted mb-1">
                        <span>DFL Anchor Alignment</span>
                        <span className="text-ivory-soft">0.045 (optimal)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-charcoal-deep overflow-hidden">
                        <motion.div
                          initial={shouldReduceMotion ? { width: '78%' } : { width: 0 }}
                          animate={{ width: '78%' }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="h-full bg-ivory-soft"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded border border-ivory/8 bg-charcoal-deep/60 p-3.5 font-mono text-[11px] text-ivory-muted">
                    <p className="text-accent-cool">// Command parameters</p>
                    <p>yolo task=detect mode=train model=yolov8n.pt epochs=100 imgsz=640</p>
                  </div>
                </div>
              )}

              {/* STATE 3: Restrained Evidence-Plot Entrances */}
              {activeMilestone === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ivory-muted uppercase tracking-wider">
                      Verified Validation Benchmarks
                    </span>
                    <span className="tech-pill text-accent-emerald">Hold-out Tested</span>
                  </div>

                  {/* Metric Cards (Verified Facts Only) with Entry Transitions */}
                  <div className="grid grid-cols-3 gap-3">
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded border border-ivory/10 bg-charcoal-deep/70 p-3.5 text-center"
                    >
                      <span className="block font-mono text-[11px] text-ivory-muted uppercase">Precision</span>
                      <span className="block text-2xl font-bold font-mono text-accent-emerald mt-1">75.9%</span>
                      <div className="mt-2 h-1 w-full bg-charcoal rounded-full overflow-hidden">
                        <div className="h-full bg-accent-emerald" style={{ width: '75.9%' }} />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="rounded border border-ivory/10 bg-charcoal-deep/70 p-3.5 text-center"
                    >
                      <span className="block font-mono text-[11px] text-ivory-muted uppercase">Recall</span>
                      <span className="block text-2xl font-bold font-mono text-accent-emerald mt-1">68.4%</span>
                      <div className="mt-2 h-1 w-full bg-charcoal rounded-full overflow-hidden">
                        <div className="h-full bg-accent-emerald" style={{ width: '68.4%' }} />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="rounded border border-ivory/10 bg-charcoal-deep/70 p-3.5 text-center"
                    >
                      <span className="block font-mono text-[11px] text-ivory-muted uppercase">mAP@50</span>
                      <span className="block text-2xl font-bold font-mono text-accent-cool mt-1">0.75</span>
                      <div className="mt-2 h-1 w-full bg-charcoal rounded-full overflow-hidden">
                        <div className="h-full bg-accent-cool" style={{ width: '75%' }} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Interactive Threshold Slider */}
                  <div className="rounded border border-ivory/10 bg-charcoal-deep/50 p-4 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-ivory-soft">
                      <span className="flex items-center gap-1.5">
                        <Sliders className="h-3.5 w-3.5 text-accent-cool" />
                        Confidence Calibration Threshold
                      </span>
                      <span className="text-ivory-bright font-semibold">{confidenceThreshold}%</span>
                    </div>

                    <input
                      type="range"
                      min="30"
                      max="90"
                      value={confidenceThreshold}
                      onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg bg-charcoal-elevated accent-accent-cool cursor-pointer"
                      aria-label="Adjust detection confidence threshold"
                    />

                    <div className="flex justify-between text-[11px] text-ivory-muted pt-1">
                      <span>Low false-positives</span>
                      <span className="text-accent-cool">Balanced inference</span>
                      <span>High sensitivity</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visualizer Status Footer */}
              <div className="border-t border-ivory/8 pt-4 flex items-center justify-between font-mono text-[11px] text-ivory-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-emerald" />
                  Primary Evidence Checked
                </span>
                <span className="text-ivory-soft">Milestone 0{activeMilestone} of 03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
