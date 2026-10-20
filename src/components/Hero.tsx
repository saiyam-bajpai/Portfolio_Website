import React, { useState, useEffect } from 'react'
import { Terminal, ArrowDownRight, CheckCircle2, Cpu } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { profileData } from '../data/portfolioData'

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'stack'>('overview')
  const shouldReduceMotion = useReducedMotion()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const handleScroll = () => {
      // Clamped restrained parallax offset (max 30px)
      setScrollY(Math.min(window.scrollY * 0.08, 30))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldReduceMotion])

  // Motion variants
  const easeCurve = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="hero"
      className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-12 lg:pt-24"
      style={{
        transform: shouldReduceMotion ? 'none' : `translate3d(0, -${scrollY}px, 0)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Top Telemetry Line */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeCurve }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/8 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-cool">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cool animate-pulse" />
            {profileData.location.toUpperCase()} // {profileData.coordinates}
          </span>
          <span className="text-ivory/20 font-mono text-xs">|</span>
          <span className="font-mono text-xs text-ivory-muted">
            DUAL-DEGREE CS &amp; DATA SCIENCE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-ivory-muted">
          <span className="text-accent-cool font-medium">IIT MADRAS (2026–2030)</span>
          <span className="text-ivory/30">•</span>
          <span className="text-ivory-soft">MITS GWALIOR (2025–2029)</span>
        </div>
      </motion.div>

      {/* Main Grid: Masked Headline & Interactive Terminal Dossier */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Left Column (Editorial Typography with Masked Reveals) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: easeCurve }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-cool mb-4"
          >
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Applied ML &amp; Vision Engineer</span>
          </motion.div>

          {/* Masked Headline Reveal */}
          <div className="overflow-hidden pb-1">
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: easeCurve }}
              className="text-4xl font-semibold tracking-tight text-ivory-bright sm:text-5xl lg:text-6xl font-sans"
            >
              {profileData.fullName}
            </motion.h1>
          </div>

          {/* Masked Serif Italic Quote Reveal */}
          <div className="overflow-hidden mt-4 pb-1">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
              className="text-xl sm:text-2xl text-ivory-soft font-serif italic leading-relaxed"
            >
              "{profileData.editorialQuote}"
            </motion.p>
          </div>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
            className="mt-5 text-sm sm:text-base leading-relaxed text-ivory-muted max-w-2xl font-sans"
          >
            Undergraduate in Computer Science &amp; Design (Minor in Design) at MITS Gwalior and Data Science &amp; Applications at IIT Madras (2026–2030). Building road-surface computer vision models, explainable credit scoring platforms, and deterministic medicine verification systems.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: easeCurve }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#sample-chapter"
              className="inline-flex items-center gap-2 rounded bg-ivory px-5 py-2.5 font-mono text-xs font-medium text-charcoal-deep transition-all hover:bg-ivory-bright focus-visible:outline-accent-cool shadow-sm"
            >
              <span>Inspect Sample Chapter</span>
              <ArrowDownRight className="h-3.5 w-3.5 text-charcoal-deep" aria-hidden="true" />
            </a>

            <a
              href={profileData.resumePath}
              download="Saiyam_Bajpai_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-ivory/15 bg-charcoal-elevated/60 px-5 py-2.5 font-mono text-xs text-ivory transition-all hover:border-ivory/30 hover:bg-charcoal-hover hover:text-ivory-bright focus-visible:outline-accent-cool"
            >
              <span>Download Verified Resume</span>
            </a>
          </motion.div>

          {/* Verification Badges */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-6 border-t border-ivory/8 pt-6"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent-emerald" aria-hidden="true" />
              <span className="font-mono text-xs text-ivory-soft">
                RoadWatch AI: <strong className="text-ivory-bright font-medium">0.75 mAP@50</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent-emerald" aria-hidden="true" />
              <span className="font-mono text-xs text-ivory-soft">
                FinCA XAI: <strong className="text-ivory-bright font-medium">SHAP Explainability</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent-emerald" aria-hidden="true" />
              <span className="font-mono text-xs text-ivory-soft">
                AAYU 2026: <strong className="text-ivory-bright font-medium">ML Layer Lead</strong>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Monospace Terminal Dossier (Slide-In) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeCurve }}
          className="lg:col-span-5"
        >
          <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/85 shadow-card overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-ivory/8 bg-charcoal-elevated/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-accent-cool" aria-hidden="true" />
                <span className="font-mono text-xs text-ivory-soft">system_telemetry.log</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ivory/20" />
                <span className="h-2 w-2 rounded-full bg-ivory/20" />
                <span className="h-2 w-2 rounded-full bg-accent-cool/80" />
              </div>
            </div>

            {/* Tab Selectors */}
            <div className="flex border-b border-ivory/8 bg-charcoal-deep/50 px-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 transition-colors border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-accent-cool text-ivory-bright font-medium'
                    : 'border-transparent text-ivory-muted hover:text-ivory'
                }`}
              >
                profile.py
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-2 transition-colors border-b-2 ${
                  activeTab === 'architecture'
                    ? 'border-accent-cool text-ivory-bright font-medium'
                    : 'border-transparent text-ivory-muted hover:text-ivory'
                }`}
              >
                benchmarks.json
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-2 transition-colors border-b-2 ${
                  activeTab === 'stack'
                    ? 'border-accent-cool text-ivory-bright font-medium'
                    : 'border-transparent text-ivory-muted hover:text-ivory'
                }`}
              >
                stack.env
              </button>
            </div>

            {/* Terminal Body Content */}
            <div className="p-5 font-mono text-xs leading-relaxed text-ivory-soft overflow-x-auto min-h-[260px]">
              {activeTab === 'overview' && (
                <div className="space-y-2 text-ivory-muted">
                  <p className="text-ivory/40"># Identity &amp; Educational Trajectory</p>
                  <p>
                    <span className="text-accent-cool">student</span> = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-ivory">"name"</span>: <span className="text-ivory-bright">"{profileData.fullName}"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-ivory">"degrees"</span>: [
                  </p>
                  <p className="pl-8 text-ivory-bright">
                    "B.Tech Computer Science &amp; Design (MITS Gwalior)",
                  </p>
                  <p className="pl-8 text-ivory-bright">
                    "BS Data Science &amp; Applications (IIT Madras, 2026–2030)"
                  </p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">
                    <span className="text-ivory">"core_focus"</span>: [
                  </p>
                  <p className="pl-8 text-accent-cool">"Real-time Computer Vision",</p>
                  <p className="pl-8 text-accent-cool">"Explainable AI (SHAP)",</p>
                  <p className="pl-8 text-accent-cool">"Deterministic Equivalence Systems"</p>
                  <p className="pl-4">]</p>
                  <p>&#125;</p>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-2 text-ivory-muted">
                  <p className="text-ivory/40">// Primary Verified Metrics (Resume &amp; PRD Baseline)</p>
                  <p>&#123;</p>
                  <p className="pl-4">
                    <span className="text-accent-cool">"RoadWatch_AI"</span>: &#123;
                  </p>
                  <p className="pl-8">
                    "dataset_augmented": <span className="text-ivory-bright">20000</span>,
                  </p>
                  <p className="pl-8">
                    "precision": <span className="text-accent-emerald">0.759</span>,
                  </p>
                  <p className="pl-8">
                    "recall": <span className="text-accent-emerald">0.684</span>,
                  </p>
                  <p className="pl-8">
                    "mAP50": <span className="text-accent-emerald">0.75</span>
                  </p>
                  <p className="pl-4">&#125;,</p>
                  <p className="pl-4">
                    <span className="text-accent-cool">"Sasti_Dawai_AAYU26"</span>: &#123;
                  </p>
                  <p className="pl-8">"team_size": 3,</p>
                  <p className="pl-8">"role": "ML_Subsystem_Lead",</p>
                  <p className="pl-8">"rule": "AI reads. Code decides."</p>
                  <p className="pl-4">&#125;</p>
                  <p>&#125;</p>
                </div>
              )}

              {activeTab === 'stack' && (
                <div className="space-y-1.5 text-ivory-muted">
                  <p className="text-ivory/40"># Verified Tooling &amp; Runtime</p>
                  <p>
                    <span className="text-ivory font-medium">LANGUAGES</span>=Python, C/C++, SQL, JavaScript
                  </p>
                  <p>
                    <span className="text-ivory font-medium">ML_VISION</span>=YOLOv8, Ultralytics, OpenCV, MediaPipe
                  </p>
                  <p>
                    <span className="text-ivory font-medium">XAI_DATA</span>=SHAP, Scikit-Learn, NumPy, Pandas, RapidFuzz
                  </p>
                  <p>
                    <span className="text-ivory font-medium">FRAMEWORKS</span>=FastAPI, Flask, React, Node.js
                  </p>
                  <p>
                    <span className="text-ivory font-medium">PLATFORMS</span>=Colab T4, Docker, GCP, Git, MongoDB
                  </p>
                  <p className="pt-2 text-accent-emerald/90">
                    STATUS=ALL_DEPENDENCIES_VERIFIED
                  </p>
                </div>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="flex items-center justify-between border-t border-ivory/8 bg-charcoal-elevated/40 px-4 py-2 font-mono text-[11px] text-ivory-muted">
              <span>mode: production_spec</span>
              <span className="text-accent-emerald font-medium">● telemetry online</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
