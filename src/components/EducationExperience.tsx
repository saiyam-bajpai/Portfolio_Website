import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react'
import { educationHistory, hackathonAchievements, profileData } from '../data/portfolioData'

export const EducationExperience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 40%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="academics" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 border-t border-ivory/8">
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
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>04 // Education &amp; Certified Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ivory-bright font-sans">
            Academic Track &amp; <span className="font-serif italic font-normal text-ivory-soft">Demonstrated Leadership</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ivory-muted max-w-sm">
          Simultaneous dual undergraduate degrees combining theoretical data science foundations with engineering depth.
        </div>
      </motion.div>

      {/* Main Grid: Education & Portrait + Hackathons */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Education Pathways with Animated Timeline Line */}
        <div className="lg:col-span-7 space-y-8">
          <h3 className="font-mono text-xs text-ivory-muted uppercase tracking-wider">
            Dual Undergraduate Programs (In Progress)
          </h3>

          <div ref={timelineRef} className="relative pl-6 sm:pl-8 space-y-6">
            {/* SVG Progress Line */}
            <div className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-ivory/10 -translate-x-1/2">
              <motion.div
                className="w-full bg-accent-cool origin-top"
                style={shouldReduceMotion ? { height: '100%' } : { scaleY, height: '100%' }}
              />
            </div>

            {educationHistory.map((item, idx) => (
              <motion.div
                key={item.institution}
                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                className="relative rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-6 transition-colors hover:border-ivory/20"
              >
                {/* Node Anchor Dot */}
                <div className="absolute -left-[calc(1.5rem+5px)] sm:-left-[calc(2rem+5px)] top-7 h-2.5 w-2.5 rounded-full border-2 border-charcoal bg-accent-cool shadow-sm" />

                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-accent-cool pb-2 border-b border-ivory/6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ivory-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <h4 className="mt-4 text-xl font-semibold text-ivory-bright font-sans">
                  {item.degree}
                </h4>
                <p className="mt-1 font-mono text-xs text-ivory-soft font-medium">
                  {item.institution}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ivory-muted font-sans">
                  {item.focus}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certified Hackathon Leadership */}
          <div className="pt-6">
            <h3 className="font-mono text-xs text-ivory-muted uppercase tracking-wider mb-4">
              Certified Hackathon Leadership
            </h3>

            <div className="space-y-4">
              {hackathonAchievements.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                  className="rounded-lg border border-accent-emerald/20 bg-charcoal-deep/70 p-5 font-sans"
                >
                  <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-ivory/6">
                    <span className="text-accent-emerald font-medium flex items-center gap-1.5">
                      <Award className="h-4 w-4" />
                      {item.name}
                    </span>
                    <span className="text-ivory-faint">{item.year}</span>
                  </div>
                  <h4 className="mt-2 text-base font-semibold text-ivory-bright">
                    {item.role} — <span className="text-accent-cool">{item.project}</span>
                  </h4>
                  <p className="mt-2 text-xs text-ivory-muted leading-relaxed font-sans">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Portrait & Identity Dossier */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="rounded-lg border border-ivory/12 bg-charcoal-surface/90 p-5 shadow-elevated overflow-hidden">
            <div className="relative aspect-square w-full rounded overflow-hidden border border-ivory/8 bg-charcoal-deep">
              <img
                src={profileData.headshotPath}
                alt={`${profileData.fullName} portrait`}
                className="h-full w-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 font-mono text-[11px] text-ivory-soft bg-charcoal/80 backdrop-blur-md px-3 py-1.5 rounded border border-ivory/10 flex items-center justify-between">
                <span>{profileData.fullName}</span>
                <span className="text-accent-cool">B.Tech &amp; BS</span>
              </div>
            </div>

            <div className="mt-5 space-y-3 font-mono text-xs text-ivory-soft">
              <div className="flex justify-between py-1.5 border-b border-ivory/6">
                <span className="text-ivory-muted">Current Base:</span>
                <span>{profileData.location}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-ivory/6">
                <span className="text-ivory-muted">Direct Email:</span>
                <span className="text-ivory-bright">{profileData.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-ivory/6">
                <span className="text-ivory-muted">Credentials:</span>
                <span className="text-accent-emerald">Verified Primary Records</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

