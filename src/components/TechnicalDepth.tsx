import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Cpu, CheckCircle2, TerminalSquare } from 'lucide-react'
import { skillCategories } from '../data/portfolioData'

export const TechnicalDepth: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 border-t border-ivory/8">
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
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            <span>03 // Technical Depth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ivory-bright font-sans">
            Toolchain, Runtimes &amp; <span className="font-serif italic font-normal text-ivory-soft">Engineering Competencies</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ivory-muted max-w-sm">
          Verified technical stack derived strictly from production codebases, hackathon implementations, and verified academic coursework.
        </div>
      </motion.div>

      {/* Skills Matrix Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-6 flex flex-col justify-between transition-colors hover:border-ivory/20"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-ivory/6">
                <h3 className="font-mono text-xs font-medium text-accent-cool uppercase tracking-wider">
                  {category.title}
                </h3>
              </div>
              <p className="mt-3 text-xs text-ivory-muted font-sans leading-relaxed">
                {category.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded border border-ivory/8 bg-charcoal-deep/70 px-3 py-1.5 font-mono text-xs text-ivory-soft"
                  >
                    <CheckCircle2 className="h-3 w-3 text-accent-emerald" aria-hidden="true" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Architecture Deep Dive Callout */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-12 rounded-lg border border-ivory/10 bg-charcoal-deep/60 p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-accent-emerald">
            <TerminalSquare className="h-4 w-4" />
            <span>VERIFIED ARCHITECTURAL BOUNDARY</span>
          </div>
          <h4 className="text-lg font-semibold text-ivory-bright font-sans">
            Deterministic Decision Making Over Probabilistic Risk
          </h4>
          <p className="text-sm text-ivory-muted max-w-3xl leading-relaxed font-sans">
            All production and hackathon systems follow strict defensive design principles: AI outputs are quarantined into typed Pydantic contracts and evaluated through explicit rule gates before critical financial or medical decisions are returned.
          </p>
        </div>

        <div className="shrink-0 font-mono text-xs text-ivory-soft bg-charcoal-elevated/80 border border-ivory/10 px-4 py-3 rounded">
          <span>ZERO_HALLUCINATION_POLICY = ENFORCED</span>
        </div>
      </motion.div>
    </section>
  )
}

