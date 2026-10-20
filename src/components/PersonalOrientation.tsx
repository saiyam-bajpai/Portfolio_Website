import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Compass, ShieldCheck, Cpu, Code2 } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export const PersonalOrientation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="orientation" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 border-t border-ivory/8">
      {/* Section Header */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-ivory/8"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent-cool uppercase tracking-widest mb-2">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>01 // Personal Orientation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ivory-bright font-sans">
            Foundations, Rigor &amp; <span className="font-serif italic font-normal text-ivory-soft">Engineering Intent</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ivory-muted max-w-sm">
          A dual-track academic foundation providing mathematical theory from IIT Madras and software systems depth from MITS Gwalior.
        </div>
      </motion.div>

      {/* Main Narrative & Values Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Narrative Column */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-ivory-soft font-sans"
        >
          <p className="text-lg font-serif italic text-ivory leading-relaxed">
            "I operate at the intersection of computer vision, machine learning, and explainable systems. I believe applied AI is only as trustworthy as its failure boundaries."
          </p>

          <p className="text-ivory-muted">
            Pursuing two simultaneous degrees — a <strong className="text-ivory-bright font-medium">B.Tech in Computer Science &amp; Design (Minor in Design)</strong> at MITS Gwalior and a <strong className="text-ivory-bright font-medium">BS in Data Science &amp; Applications</strong> from IIT Madras (2026–2030). The IIT Madras curriculum provides formal statistical theory, probability, and algorithmic rigor; MITS provides hands-on software engineering, design systems, and low-level computer architecture.
          </p>

          <p className="text-ivory-muted">
            Rather than relying on generic black-box APIs, my work focuses on building verifiable pipelines: training YOLOv8 on custom-augmented 20,000-image datasets for road damage detection, applying SHAP to eliminate demographic bias in credit underwriting, and engineering deterministic fail-closed safety matchers for generic medicine verification.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-ivory-muted">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cool" />
              <span>Location: {profileData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              <span>Status: Active Dual Undergraduate</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Engineering Principles Column */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 transition-colors hover:border-ivory/20">
            <div className="flex items-center gap-3 text-accent-cool font-mono text-xs mb-2">
              <Cpu className="h-4 w-4" aria-hidden="true" />
              <span>01 / MEASURABLE BENCHMARKS</span>
            </div>
            <h3 className="font-sans font-semibold text-ivory-bright text-base">
              Evidence Over Claims
            </h3>
            <p className="mt-1.5 font-sans text-xs text-ivory-muted leading-relaxed">
              Every precision, recall, and mAP metric is derived from hold-out validation batches through systematic hyperparameter optimization.
            </p>
          </div>

          <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 transition-colors hover:border-ivory/20">
            <div className="flex items-center gap-3 text-accent-cool font-mono text-xs mb-2">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>02 / FAIL-CLOSED ARCHITECTURE</span>
            </div>
            <h3 className="font-sans font-semibold text-ivory-bright text-base">
              AI Reads. Code Decides.
            </h3>
            <p className="mt-1.5 font-sans text-xs text-ivory-muted leading-relaxed">
              Probabilistic models are never permitted to authorize critical medical or financial matches independently without deterministic validation.
            </p>
          </div>

          <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 transition-colors hover:border-ivory/20">
            <div className="flex items-center gap-3 text-accent-cool font-mono text-xs mb-2">
              <Code2 className="h-4 w-4" aria-hidden="true" />
              <span>03 / ITERATIVE DISCIPLINE</span>
            </div>
            <h3 className="font-sans font-semibold text-ivory-bright text-base">
              Versioned Engineering History
            </h3>
            <p className="mt-1.5 font-sans text-xs text-ivory-muted leading-relaxed">
              From terminal CLI daemons to web applications, tracking design progression across documented software releases.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

