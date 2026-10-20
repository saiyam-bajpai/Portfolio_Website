import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Award, FolderGit2 } from 'lucide-react'
import { primaryProjects, secondaryProjects } from '../data/portfolioData'

export const SelectedProjects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 border-t border-ivory/8">
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
            <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>02 // Selected Engineering Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ivory-bright font-sans">
            Primary Systems &amp; <span className="font-serif italic font-normal text-ivory-soft">Case Studies</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ivory-muted max-w-sm">
          Detailed technical evaluations with documented architectures, verified metrics, known limitations, and next steps.
        </div>
      </motion.div>

      {/* Primary Projects Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {primaryProjects.map((project, idx) => (
          <motion.article
            key={project.slug}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            className={`group rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-7 flex flex-col justify-between transition-all duration-300 hover:border-ivory/25 hover:bg-charcoal-surface shadow-card ${
              idx === 0 ? 'md:col-span-2' : ''
            }`}
          >
            <div>
              {/* Card Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ivory-muted pb-4 border-b border-ivory/6">
                <span className="text-accent-cool font-medium tracking-wider">{project.tag}</span>
                <div className="flex items-center gap-3">
                  {project.isCertified && (
                    <span className="inline-flex items-center gap-1 text-accent-emerald text-[11px] font-medium bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded">
                      <Award className="h-3 w-3" />
                      Certified Hackathon
                    </span>
                  )}
                  <span>{project.timeline}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-5 text-2xl font-semibold text-ivory-bright font-sans group-hover:text-accent-cool transition-colors">
                <Link to={`/projects/${project.slug}`} className="flex items-center justify-between gap-4 focus-visible:outline-accent-cool">
                  <span>{project.title}</span>
                  <ArrowUpRight className="h-5 w-5 text-ivory-muted group-hover:text-accent-cool transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" aria-hidden="true" />
                </Link>
              </h3>

              <p className="mt-2 text-base text-ivory-soft font-serif italic">
                "{project.subtitle}"
              </p>

              <p className="mt-4 text-sm leading-relaxed text-ivory-muted font-sans line-clamp-3">
                {project.problemStatement}
              </p>

              {/* Verified Metrics Chips */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.evidence.map((item) => (
                  <div key={item.metric} className="rounded border border-ivory/8 bg-charcoal-deep/60 px-3 py-1.5 font-mono text-xs">
                    <span className="text-ivory-faint text-[10px] block uppercase">{item.metric}</span>
                    <span className="text-ivory-bright font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer: Tech Stack & Read Action */}
            <div className="mt-8 pt-5 border-t border-ivory/8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-pill text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                className="font-mono text-xs text-accent-cool hover:text-ivory-bright transition-colors inline-flex items-center gap-1"
                aria-label={`Inspect full case study for ${project.title}`}
              >
                <span>Read Full Case Study</span>
                <span>→</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>


      {/* Explorations & Coursework Footnote Reel */}
      <div className="mt-16 pt-10 border-t border-ivory/8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-ivory-muted uppercase tracking-wider">
            Exploratory Systems &amp; Foundational Coursework // Compact Reel
          </span>
          <span className="font-mono text-xs text-ivory-faint">Non-Dominant Scope</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((item) => (
            <div key={item.title} className="rounded-lg border border-ivory/6 bg-charcoal-deep/50 p-5 font-sans">
              <div className="flex items-center justify-between font-mono text-[11px] text-ivory-faint">
                <span>{item.scope}</span>
              </div>
              <h4 className="mt-2 text-base font-semibold text-ivory-soft">
                {item.title}
              </h4>
              <p className="mt-1 font-mono text-[11px] text-accent-cool/80">
                {item.tech}
              </p>
              <p className="mt-2 text-xs text-ivory-muted leading-relaxed line-clamp-3">
                {item.description}
              </p>
              {item.repoUrl && (
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] text-ivory-soft hover:text-accent-cool transition-colors"
                >
                  <span>Inspect Code on GitHub</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
