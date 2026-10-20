import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface SectionDividerProps {
  label?: string
  className?: string
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ label, className = '' }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-10 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-4">
        {/* SVG Drawing Line - Left Segment */}
        <div className="relative flex-1 h-[1px] overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="rgba(245, 242, 235, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>

        {/* Center Geometric Anchor / Monospace Telemetry */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-ivory-faint shrink-0 uppercase tracking-widest px-2 py-0.5 rounded border border-ivory/6 bg-charcoal-deep/50">
          <span className="h-1 w-1 rounded-full bg-accent-cool/60" />
          <span>{label || 'TELEMETRY // BREAKPOINT'}</span>
          <span className="h-1 w-1 rounded-full bg-accent-cool/60" />
        </div>

        {/* SVG Drawing Line - Right Segment */}
        <div className="relative flex-1 h-[1px] overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="rgba(245, 242, 235, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
