import React, { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Mail, Copy, Check, FileDown, ArrowUp, Phone, ShieldCheck, Terminal } from 'lucide-react'
import { profileData } from '../data/portfolioData'

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-12 border-t border-ivory/8">
      {/* Large Closing Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-ivory/8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-4"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-cool">
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            <span>05 // Contact Dossier &amp; Channels</span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl font-semibold text-ivory-bright font-sans tracking-tight leading-tight"
            >
              Initiate Direct Technical Dialogue
            </motion.h2>
          </div>

          <p className="text-lg text-ivory-soft font-serif italic max-w-lg leading-relaxed">
            "Available for machine learning engineering roles, computer vision collaboration, and systems architecture discussions."
          </p>

          <p className="text-xs text-ivory-muted max-w-md font-sans leading-relaxed">
            No simulated submission forms. All communications are routed directly to primary verified developer channels.
          </p>
        </motion.div>


        {/* Action Channels Card */}
        <div className="lg:col-span-6 space-y-4">
          {/* Primary Mailto & Copy Card */}
          <div className="rounded-lg border border-ivory/12 bg-charcoal-surface/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
            <div className="flex items-center gap-3.5">
              <div className="rounded p-2.5 bg-charcoal-elevated border border-ivory/8 text-accent-cool">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-mono text-[10px] text-ivory-faint uppercase tracking-wider">Verified Contact Email</span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="block font-mono text-sm text-ivory-bright hover:text-accent-cool transition-colors font-medium mt-0.5 focus-visible:outline-accent-cool"
                  aria-label={`Send email to ${profileData.email}`}
                >
                  {profileData.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded border border-ivory/15 bg-charcoal-elevated px-3 py-1.5 font-mono text-xs text-ivory-soft transition-all hover:border-accent-cool/40 hover:text-ivory-bright focus-visible:outline-accent-cool"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-accent-emerald" aria-hidden="true" />
                    <span className="text-accent-emerald">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-1.5 rounded bg-ivory px-3.5 py-1.5 font-mono text-xs font-medium text-charcoal-deep transition-all hover:bg-ivory-bright focus-visible:outline-accent-cool"
              >
                <span>Write</span>
              </a>
            </div>
          </div>

          {/* Phone Policy Block (Clickable ONLY if approved content file says it should be public) */}
          <div className="rounded-lg border border-ivory/8 bg-charcoal-deep/60 px-5 py-3.5 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3 text-ivory-muted">
              <Phone className="h-4 w-4 text-ivory-faint" aria-hidden="true" />
              <span>Voice / Cellular:</span>
            </div>

            {profileData.phone.isPublic ? (
              <a
                href={`tel:${profileData.phone.number}`}
                className="text-accent-cool hover:text-ivory-bright transition-colors font-mono focus-visible:outline-accent-cool"
              >
                {profileData.phone.number}
              </a>
            ) : (
              <span className="text-ivory-faint text-[11px] bg-charcoal-elevated/70 border border-ivory/6 px-2 py-0.5 rounded">
                Confidential // Available upon verified request
              </span>
            )}
          </div>

          {/* Social Profiles & Resume Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-ivory/10 bg-charcoal-surface/70 px-4 py-2 font-mono text-xs text-ivory-soft transition-all hover:border-ivory/30 hover:text-ivory-bright focus-visible:outline-accent-cool"
            >
              <GithubIcon className="h-4 w-4 text-ivory" />
              <span>github.com/saiyam-bajpai</span>
            </a>

            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-ivory/10 bg-charcoal-surface/70 px-4 py-2 font-mono text-xs text-ivory-soft transition-all hover:border-ivory/30 hover:text-ivory-bright focus-visible:outline-accent-cool"
            >
              <LinkedinIcon className="h-4 w-4 text-accent-cool" />
              <span>linkedin.com/in/saiyam-bajpai</span>
            </a>

            <a
              href={profileData.resumePath}
              download="Saiyam_Bajpai_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-accent-emerald/30 bg-charcoal-surface/70 px-4 py-2 font-mono text-xs text-accent-emerald transition-all hover:border-accent-emerald hover:bg-accent-emerald/10 focus-visible:outline-accent-cool"
            >
              <FileDown className="h-4 w-4 text-accent-emerald" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-Footer: Telemetry, Legal & Integrity */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-ivory-muted">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-ivory-bright">{profileData.brandMark}</span>
          <span className="text-ivory/20">|</span>
          <span className="inline-flex items-center gap-1.5 text-accent-emerald text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Primary Evidence Baseline Verified
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px]">
          <span>© {profileData.currentYear} Saiyam Bajpai. All rights reserved.</span>
          <span className="text-ivory/20">•</span>
          <span>Dual Track: MITS Gwalior (2025–2029) &amp; IIT Madras (2026–2030)</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-ivory-muted hover:text-ivory transition-colors focus-visible:outline-accent-cool"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
