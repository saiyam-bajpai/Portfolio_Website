import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  FileDown,
  Mail,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react'
import { CinematicThreeCanvas } from './CinematicThreeCanvas'
import { CinematicHUD } from './CinematicHUD'
import { profileData } from '../../data/portfolioData'
import type { CameraKeyframe } from './types'

interface Project3DCardProps {
  side?: 'left' | 'right' | 'center'
  isReducedMotion: boolean
  children: React.ReactNode
  className?: string
}

const Project3DCard: React.FC<Project3DCardProps> = ({
  side = 'left',
  isReducedMotion,
  children,
  className = '',
}) => {
  const baseRy = side === 'left' ? 5 : side === 'right' ? -5 : 0
  const baseRx = 2

  const [tilt, setTilt] = useState<{ rx: number; ry: number; tz: number; active: boolean }>({
    rx: baseRx,
    ry: baseRy,
    tz: 0,
    active: false,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({
      rx: baseRx - ny * 8,
      ry: baseRy + nx * 10,
      tz: 24,
      active: true,
    })
  }

  const handleMouseLeave = () => {
    if (isReducedMotion) return
    setTilt({
      rx: baseRx,
      ry: baseRy,
      tz: 0,
      active: false,
    })
  }

  const transformStyle = isReducedMotion
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${tilt.rx.toFixed(1)}deg) rotateY(${tilt.ry.toFixed(1)}deg) translateZ(${tilt.tz}px)`,
        transition: tilt.active
          ? 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.4s ease, background-color 0.35s ease',
      }

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative group max-w-lg lg:max-w-[430px] w-full rounded-2xl border border-ivory/12 bg-charcoal-deep/80 p-5 sm:p-6 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-accent-cool/50 hover:bg-charcoal-deep/95 hover:shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_35px_rgba(56,189,248,0.18)] ${className}`}
    >
      {children}
    </article>
  )
}

interface Architecture3DCardProps {
  corner: 'northwest' | 'northeast' | 'southwest' | 'southeast'
  entranceProgress: number
  isReducedMotion: boolean
  children: React.ReactNode
  className?: string
}

const Architecture3DCard: React.FC<Architecture3DCardProps> = ({
  corner,
  entranceProgress,
  isReducedMotion,
  children,
  className = '',
}) => {
  const [hoverTilt, setHoverTilt] = useState<{ rx: number; ry: number; tz: number; active: boolean }>({
    rx: 0,
    ry: 0,
    tz: 0,
    active: false,
  })

  // Distinct 4-corner directional origin offsets
  // Top-left (NW): comes from -X, -Y
  // Top-right (NE): comes from +X, -Y
  // Bottom-left (SW): comes from -X, +Y
  // Bottom-right (SE): comes from +X, +Y
  const cornerOffsets = {
    northwest: { x: -180, y: -130, z: -80, ry: -14, rx: 10 },
    northeast: { x: 180, y: -130, z: -80, ry: 14, rx: 10 },
    southwest: { x: -180, y: 130, z: -80, ry: -14, rx: -10 },
    southeast: { x: 180, y: 130, z: -80, ry: 14, rx: -10 },
  }[corner]

  const e = entranceProgress * entranceProgress * (3 - 2 * entranceProgress)
  const invE = 1 - e

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || entranceProgress < 0.95) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setHoverTilt({
      rx: -ny * 9,
      ry: nx * 11,
      tz: 20,
      active: true,
    })
  }

  const handleMouseLeave = () => {
    if (isReducedMotion) return
    setHoverTilt({
      rx: 0,
      ry: 0,
      tz: 0,
      active: false,
    })
  }

  let transformStyle: React.CSSProperties = {}
  if (!isReducedMotion) {
    if (e < 0.999) {
      // Actively entering from respective corner
      const tx = cornerOffsets.x * invE
      const ty = cornerOffsets.y * invE
      const tz = cornerOffsets.z * invE
      const rY = cornerOffsets.ry * invE
      const rX = cornerOffsets.rx * invE
      transformStyle = {
        transform: `perspective(1000px) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) rotateY(${rY.toFixed(1)}deg) rotateX(${rX.toFixed(1)}deg)`,
        opacity: Math.max(0, Math.min(1, e * 1.25)),
      }
    } else {
      // Settled in 2x2 grid with interactive 3D pointer hover
      transformStyle = {
        transform: `perspective(1000px) rotateX(${hoverTilt.rx.toFixed(1)}deg) rotateY(${hoverTilt.ry.toFixed(1)}deg) translateZ(${hoverTilt.tz}px)`,
        opacity: 1,
        transition: hoverTilt.active
          ? 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease',
      }
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative group space-y-3 p-5 sm:p-6 rounded-2xl border border-ivory/10 bg-charcoal-deep/80 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-accent-cool/45 hover:bg-charcoal-deep/95 hover:shadow-[0_16px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(56,189,248,0.15)] ${className}`}
    >
      {children}
    </div>
  )
}

export const ContinuousCinematicJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState<number>(0)
  const [activeStage, setActiveStage] = useState<CameraKeyframe | null>(null)
  const [emailCopied, setEmailCopied] = useState<boolean>(false)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  // Synchronize natural vertical page scroll with progress timeline [0.0 -> 1.0]
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current
          if (!container) {
            ticking = false
            return
          }

          const rect = container.getBoundingClientRect()
          const totalScrollableDistance = container.offsetHeight - window.innerHeight

          if (totalScrollableDistance <= 0) {
            setProgress(0)
            ticking = false
            return
          }

          const currentScrolled = -rect.top
          const rawProgress = currentScrolled / totalScrollableDistance
          const clamped = Math.max(0, Math.min(1, rawProgress))

          setProgress(clamped)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Programmatic seeking
  const handleSeek = useCallback((targetProgress: number) => {
    const container = containerRef.current
    if (!container) return

    const totalScrollableDistance = container.offsetHeight - window.innerHeight
    const targetScrollY = container.offsetTop + targetProgress * totalScrollableDistance

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }, [])

  // Scroll to semantic section by ID
  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      id="continuous-cinematic-journey"
      className="relative w-full bg-[#07080a] text-ivory selection:bg-accent-cool/30 selection:text-ivory-bright overflow-x-clip"
    >
      {/* 1. Persistent 3D Three.js Canvas Backdrop */}
      <CinematicThreeCanvas
        progress={progress}
        isReducedMotion={isReducedMotion}
        onStageChange={setActiveStage}
        className="fixed inset-0 h-full w-full overflow-hidden pointer-events-none z-0"
      />

      {/* 2. Floating Minimal HUD Overlay */}
      <CinematicHUD
        progress={progress}
        activeStage={activeStage}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={() => setIsReducedMotion((prev) => !prev)}
        onSeek={handleSeek}
        onScrollToSection={handleScrollToSection}
      />

      {/* 3. Coordinated HTML Content Flow Across the 6 Scenes */}
      <div className="relative z-10 w-full pointer-events-auto">
        {/* ============================================================ */}
        {/* SCENE 01: The Arrival                                        */}
        {/* ============================================================ */}
        <section
          id="arrival"
          aria-label="Scene 01: The Arrival"
          className="relative min-h-screen flex flex-col justify-between items-center px-6 lg:px-12 pt-28 pb-12 text-center"
        >
          {/* Core Identity & Statement */}
          <div className="max-w-6xl space-y-6 my-auto">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[9.5rem] font-bold tracking-tight text-ivory-bright font-sans leading-none">
              Saiyam Bajpai
            </h1>
            <p className="text-xl sm:text-3xl lg:text-4xl text-ivory-soft font-serif italic max-w-3xl mx-auto leading-relaxed">
              "I build systems that see, explain, and decide."
            </p>
          </div>

          {/* Subtle Scroll Cue */}
          <div className="flex flex-col items-center gap-2 font-mono text-xs text-ivory-muted/70">
            <span className="tracking-widest uppercase text-[11px]">Scroll to enter journey</span>
            <ArrowDown className="h-4 w-4 animate-bounce text-accent-cool" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* SCENE 02: Track Emergence & Orientation Editorial System     */}
        {/* ============================================================ */}
        <section
          id="orientation"
          aria-label="Scene 02: Core Engineering Disciplines"
          className="relative min-h-[120vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 pointer-events-none"
        >
          {/* Top Structural Header */}
          <div className="pointer-events-auto max-w-4xl space-y-3 pb-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ivory-bright font-sans">
              Engineering Foundations
            </h2>
            <p className="text-sm sm:text-lg text-ivory-soft font-serif italic max-w-2xl leading-relaxed">
              "Grounding real-time perception in physical systems and deterministic safety boundaries."
            </p>
          </div>

          {/* Three Separate Typographic Focus Compositions */}
          <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl pt-2">
            {/* Focus 01: Machine Learning & Computer Vision */}
            <div className="relative group space-y-3 p-5 sm:p-6 rounded-2xl border border-ivory/10 bg-charcoal-deep/70 backdrop-blur-md transition-all duration-300 hover:border-accent-cool/40">
              <div className="border-b border-ivory/8 pb-2">
                <span className="font-mono text-[10px] uppercase text-ivory-muted tracking-wider block">
                  Real-Time Perception
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-semibold text-ivory-bright group-hover:text-accent-cool transition-colors">
                Machine Learning &amp; Computer Vision
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-soft leading-relaxed">
                Real-time road hazard perception, object localization, and GPU inference on 20,000 augmented asphalt captures.
              </p>
              <div className="pt-2 border-t border-ivory/8 flex items-center gap-2 font-mono text-[11px] text-accent-cool">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cool" />
                <span>YOLOv8 &bull; OpenCV &bull; Edge Inference</span>
              </div>
            </div>

            {/* Focus 02: Explainable AI */}
            <div className="relative group space-y-3 p-5 sm:p-6 rounded-2xl border border-ivory/10 bg-charcoal-deep/70 backdrop-blur-md transition-all duration-300 hover:border-accent-emerald/40">
              <div className="border-b border-ivory/8 pb-2">
                <span className="font-mono text-[10px] uppercase text-ivory-muted tracking-wider block">
                  Responsible Modeling
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-semibold text-ivory-bright group-hover:text-accent-emerald transition-colors">
                Explainable AI
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-soft leading-relaxed">
                Responsible credit risk modeling with exact mathematical feature attribution via TreeSHAP to eliminate non-causal proxy biases.
              </p>
              <div className="pt-2 border-t border-ivory/8 flex items-center gap-2 font-mono text-[11px] text-accent-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                <span>100% TreeSHAP Fidelity &bull; Fair Lending</span>
              </div>
            </div>

            {/* Focus 03: Practical Software Systems */}
            <div className="relative group space-y-3 p-5 sm:p-6 rounded-2xl border border-ivory/10 bg-charcoal-deep/70 backdrop-blur-md transition-all duration-300 hover:border-ivory/30">
              <div className="border-b border-ivory/8 pb-2">
                <span className="font-mono text-[10px] uppercase text-ivory-muted tracking-wider block">
                  Deterministic Boundaries
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-semibold text-ivory-bright group-hover:text-ivory transition-colors">
                Practical Software Systems
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory-soft leading-relaxed">
                Deterministic safety boundaries, schema validation contracts, and fail-closed gates where code governs critical decisions.
              </p>
              <div className="pt-2 border-t border-ivory/8 flex items-center gap-2 font-mono text-[11px] text-ivory-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                <span>Pydantic v2 &bull; Fail-Closed Architecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SCENE 03: Education — Connected Academic Timeline            */}
        {/* ============================================================ */}
        <section
          id="academics"
          aria-label="Scene 03: Education — Synchronous Academic Pathways"
          className="relative min-h-[120vh] flex items-center justify-end px-6 md:px-16 py-24 pointer-events-none"
        >
          {/* Semantic anchor alias for backwards compatibility */}
          <div id="metamorphosis" className="absolute -top-12" aria-hidden="true" />

          {/* Connected Academic Timeline Architecture */}
          <div className="pointer-events-auto max-w-xl w-full space-y-6">
            {/* Header */}
            <div className="space-y-3 border-b border-ivory/10 pb-4">
              <h2 className="text-2xl sm:text-4xl font-light text-ivory-bright font-sans tracking-tight">
                Parallel Academic Pathways
              </h2>
              <p className="font-serif italic text-xs sm:text-sm text-ivory-soft leading-relaxed">
                "Concurrently pursuing systems engineering and statistical learning theory across two institutions (2025–2030)."
              </p>
            </div>

            {/* Continuous Vertical Timeline Spine */}
            <div className="relative pl-6 space-y-8">
              {/* Vertical Architectural Spine */}
              <div
                className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-accent-cool via-ivory/25 to-accent-emerald"
                aria-hidden="true"
              />

              {/* Institution 01: MITS Gwalior */}
              <div className="relative pl-6 space-y-2.5 group">
                {/* Node Marker */}
                <div
                  className="absolute -left-[19px] top-1 h-4 w-4 rounded-full border-2 border-accent-cool bg-charcoal-deep flex items-center justify-center transition-transform group-hover:scale-110"
                  aria-hidden="true"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-accent-cool" />
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-sans text-xs font-semibold text-accent-cool tracking-wide">
                    Systems Architecture
                  </span>
                  <span className="font-mono text-[11px] text-ivory-muted">
                    2025 – 2029 (Active)
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-ivory-bright font-sans">
                  Madhav Institute of Technology and Science (MITS), Gwalior
                </h3>
                <p className="font-mono text-xs text-ivory-soft font-medium">
                  B.Tech in Computer Science and Design (Minor in Design)
                </p>
                <p className="font-sans text-xs text-ivory-muted leading-relaxed">
                  Focus on core systems engineering, graphics rendering pipelines, design principles, algorithm design, and human-computer interfaces.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="tech-pill text-[10px]">Systems Architecture</span>
                  <span className="tech-pill text-[10px]">Graphics Pipelines</span>
                  <span className="tech-pill text-[10px]">Algorithm Design</span>
                  <span className="tech-pill text-[10px]">HCI Interfaces</span>
                </div>
              </div>

              {/* Institution 02: IIT Madras */}
              <div className="relative pl-6 space-y-2.5 group">
                {/* Node Marker */}
                <div
                  className="absolute -left-[19px] top-1 h-4 w-4 rounded-full border-2 border-accent-emerald bg-charcoal-deep flex items-center justify-center transition-transform group-hover:scale-110"
                  aria-hidden="true"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-sans text-xs font-semibold text-accent-emerald tracking-wide">
                    Statistical Learning
                  </span>
                  <span className="font-mono text-[11px] text-ivory-muted">
                    2026 – 2030 (Active)
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-ivory-bright font-sans">
                  Indian Institute of Technology (IIT), Madras
                </h3>
                <p className="font-mono text-xs text-ivory-soft font-medium">
                  BS in Data Science and Applications (Remote Track)
                </p>
                <p className="font-sans text-xs text-ivory-muted leading-relaxed">
                  Focus on rigorous mathematical foundations, formal statistical learning theory, data analysis, and scalable machine learning algorithms.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="tech-pill text-[10px]">Statistical Learning</span>
                  <span className="tech-pill text-[10px]">Probability Theory</span>
                  <span className="tech-pill text-[10px]">Data Analysis</span>
                  <span className="tech-pill text-[10px]">Scalable ML</span>
                </div>
              </div>
            </div>

            {/* Academic Credentials Verification Link */}
            <div className="pt-4 border-t border-ivory/10 flex items-center justify-end text-xs font-mono">
              <a
                href="/Resume_2026.pdf"
                download="Saiyam_Bajpai_Resume_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-cool hover:underline"
              >
                <span>Verify Academic Credentials &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* SCENE 04: Projects as Bridge Checkpoint Dossiers             */}
        {/* ============================================================ */}
        <section
          id="projects"
          aria-label="Scene 04: Projects as Bridge Checkpoint Dossiers"
          className="relative min-h-[320vh] px-6 md:px-16 lg:px-24 py-28 flex flex-col justify-between"
        >
          {/* Section Heading Banner */}
          <div className="max-w-2xl mx-auto text-center space-y-3 pb-12">
            <h2 className="text-3xl sm:text-5xl font-light text-ivory-bright font-sans tracking-tight">
              Engineering Waypoints
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-ivory-soft leading-relaxed max-w-xl mx-auto">
              Stationed telemetry checkpoints along the suspension span. Select any waypoint to examine the complete engineering dossier.
            </p>
          </div>

          {/* Project 01: RoadWatch AI (Metric-Forward Engineering Schematic) */}
          <div className="w-full flex justify-start my-8 md:my-12 lg:pl-6 xl:pl-16">
            <Project3DCard side="left" isReducedMotion={isReducedMotion}>
              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-ivory-bright font-sans group-hover:text-accent-cool transition-colors">
                  <Link to="/projects/roadwatch-ai" className="flex items-center gap-2 focus-visible:outline-accent-cool">
                    <span>RoadWatch AI — Pothole Detection Model</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>
              </div>

              <p className="mt-2 font-serif italic text-xs sm:text-sm text-ivory-soft leading-relaxed">
                "Real-time road hazard localization pipeline running YOLOv8 edge inference on 20,000 augmented asphalt frames."
              </p>

              {/* Metric-Forward Quantitative Readout Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2 p-2.5 rounded-xl border border-ivory/8 bg-charcoal-surface/60">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] text-ivory-muted uppercase">mAP@50</span>
                  <p className="font-mono text-sm font-semibold text-accent-emerald">0.75</p>
                  <span className="font-sans text-[9px] text-ivory-muted hidden sm:block">IoU 0.50 Threshold</span>
                </div>
                <div className="space-y-0.5 border-x border-ivory/8 px-2">
                  <span className="font-mono text-[10px] text-ivory-muted uppercase">Precision</span>
                  <p className="font-mono text-sm font-semibold text-accent-emerald">75.9%</p>
                  <span className="font-sans text-[9px] text-ivory-muted hidden sm:block">Validation Batches</span>
                </div>
                <div className="space-y-0.5 pl-1.5">
                  <span className="font-mono text-[10px] text-ivory-muted uppercase">Dataset</span>
                  <p className="font-mono text-sm font-semibold text-ivory-bright">20K</p>
                  <span className="font-sans text-[9px] text-ivory-muted hidden sm:block">Augmented Frames</span>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-4 pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="tech-pill text-[10px]">YOLOv8</span>
                  <span className="tech-pill text-[10px]">Ultralytics</span>
                  <span className="tech-pill text-[10px]">OpenCV</span>
                  <span className="tech-pill text-[10px]">Colab T4</span>
                </div>
                <Link
                  to="/projects/roadwatch-ai"
                  className="font-mono text-xs text-accent-cool hover:underline flex items-center gap-1"
                >
                  <span>Examine Dossier &rarr;</span>
                </Link>
              </div>
            </Project3DCard>
          </div>

          {/* Project 02: FinCA XAI (Horizontal Attribution Schematic) */}
          <div className="w-full flex justify-end my-8 md:my-12 lg:pr-6 xl:pr-16">
            <Project3DCard side="right" isReducedMotion={isReducedMotion}>
              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-ivory-bright font-sans group-hover:text-accent-cool transition-colors">
                  <Link to="/projects/finca-xai" className="flex items-center gap-2 focus-visible:outline-accent-cool">
                    <span>FinCA XAI — Credit Risk Intelligence</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>
              </div>

              <p className="mt-2 font-serif italic text-xs sm:text-sm text-ivory-soft leading-relaxed">
                "Interpretable credit scoring architecture with TreeSHAP mathematical feature attribution to eliminate algorithmic proxy biases."
              </p>

              {/* Horizontal Feature Attribution Pipeline Schematic */}
              <div className="mt-4 p-2.5 rounded-xl border border-ivory/8 bg-charcoal-surface/60 space-y-1.5">
                <span className="font-mono text-[10px] text-ivory-muted uppercase tracking-wider block">
                  Attribution Pipeline Schematic
                </span>
                <div className="flex items-center justify-between gap-1 font-mono text-[10px] text-ivory-soft overflow-x-auto py-0.5">
                  <span className="tech-pill shrink-0">Input Features</span>
                  <span className="text-accent-cool shrink-0">&rarr;</span>
                  <span className="tech-pill shrink-0 border-accent-cool/30 text-accent-cool">Proxy Audit</span>
                  <span className="text-accent-cool shrink-0">&rarr;</span>
                  <span className="tech-pill shrink-0">Ensembles</span>
                  <span className="text-accent-cool shrink-0">&rarr;</span>
                  <span className="tech-pill shrink-0 border-accent-emerald/40 text-accent-emerald font-semibold">
                    100% TreeSHAP
                  </span>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-4 pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="tech-pill text-[10px]">Scikit-Learn</span>
                  <span className="tech-pill text-[10px]">TreeSHAP</span>
                  <span className="tech-pill text-[10px]">Risk Modeling</span>
                  <span className="tech-pill text-[10px]">Bias Audit</span>
                </div>
                <Link
                  to="/projects/finca-xai"
                  className="font-mono text-xs text-accent-cool hover:underline flex items-center gap-1"
                >
                  <span>Examine Dossier &rarr;</span>
                </Link>
              </div>
            </Project3DCard>
          </div>

          {/* Project 03: Sasti Dawai (Dual-Boundary Safety Schematic) */}
          <div className="w-full flex justify-start my-8 md:my-12 lg:pl-6 xl:pl-16">
            <Project3DCard side="left" isReducedMotion={isReducedMotion} className="hover:border-accent-emerald/50">
              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-ivory-bright font-sans group-hover:text-accent-emerald transition-colors">
                  <Link to="/projects/sasti-dawai-aayu" className="flex items-center gap-2 focus-visible:outline-accent-cool">
                    <span>Sasti Dawai — Medicine Packaging ML &amp; Matcher</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>
              </div>

              <p className="mt-2 font-serif italic text-xs sm:text-sm text-ivory-soft leading-relaxed">
                "Vision-based strip text extraction paired with a deterministic equivalence engine and fail-closed safety gate for generic drug matching."
              </p>

              {/* Dual-Boundary Architectural Separation Schematic */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl border border-ivory/8 bg-charcoal-surface/60">
                <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-ivory/8 pb-2 sm:pb-0 sm:pr-2.5">
                  <span className="font-mono text-[10px] text-accent-cool font-semibold uppercase tracking-wider block">
                    Boundary A: AI Reads
                  </span>
                  <p className="font-sans text-[11px] text-ivory-muted leading-relaxed">
                    Laplacian blur filter (&lt;100) &bull; Glare gate (&gt;15%) &bull; Pydantic v2 strict schema contracts.
                  </p>
                </div>
                <div className="space-y-1 sm:pl-1">
                  <span className="font-mono text-[10px] text-accent-emerald font-semibold uppercase tracking-wider block">
                    Boundary B: Code Decides
                  </span>
                  <p className="font-sans text-[11px] text-ivory-muted leading-relaxed">
                    Jan Aushadhi matcher &bull; 3-tier EXACT / CLOSE / NONE &bull; Zero probabilistic hallucination.
                  </p>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-4 pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="tech-pill text-[10px]">Pydantic v2</span>
                  <span className="tech-pill text-[10px]">OpenCV</span>
                  <span className="tech-pill text-[10px]">RapidFuzz</span>
                  <span className="tech-pill text-[10px]">FastAPI</span>
                </div>
                <Link
                  to="/projects/sasti-dawai-aayu"
                  className="font-mono text-xs text-accent-cool hover:underline flex items-center gap-1"
                >
                  <span>Examine Dossier &rarr;</span>
                </Link>
              </div>
            </Project3DCard>
          </div>

          {/* Project 04: GestureFlow (Evolutionary Trajectory & Coordinate Schematic) */}
          <div className="w-full flex justify-end my-8 md:my-12 lg:pr-6 xl:pr-16">
            <Project3DCard side="right" isReducedMotion={isReducedMotion}>
              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-ivory-bright font-sans group-hover:text-accent-cool transition-colors">
                  <Link to="/projects/gestureflow" className="flex items-center gap-2 focus-visible:outline-accent-cool">
                    <span>GestureFlow — Vision Controller</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>
              </div>

              <p className="mt-2 font-serif italic text-xs sm:text-sm text-ivory-soft leading-relaxed">
                "Real-time hands-free computer control scaling from terminal CLI to web vision application via 21 3D hand coordinates."
              </p>

              {/* Evolutionary Progression & Hardware Telemetry Schematic */}
              <div className="mt-4 p-2.5 rounded-xl border border-ivory/8 bg-charcoal-surface/60 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-ivory-muted uppercase">
                  <span>Evolutionary Releases</span>
                  <span className="text-accent-emerald font-semibold">21 3D Landmarks</span>
                </div>
                <div className="flex items-center justify-between gap-1 font-mono text-[10px] text-ivory-soft overflow-x-auto py-0.5">
                  <span className="tech-pill shrink-0">CLI Daemon (v1–v3)</span>
                  <span className="text-accent-cool shrink-0">&rarr;</span>
                  <span className="tech-pill shrink-0">OS Vector Engine (v4–v5)</span>
                  <span className="text-accent-cool shrink-0">&rarr;</span>
                  <span className="tech-pill shrink-0 border-accent-cool/40 text-accent-cool">
                    Web Vision App (v6)
                  </span>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-4 pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="tech-pill text-[10px]">MediaPipe</span>
                  <span className="tech-pill text-[10px]">OpenCV</span>
                  <span className="tech-pill text-[10px]">NumPy</span>
                  <span className="tech-pill text-[10px]">Zero Sensor Dept</span>
                </div>
                <Link
                  to="/projects/gestureflow"
                  className="font-mono text-xs text-accent-cool hover:underline flex items-center gap-1"
                >
                  <span>Examine Dossier &rarr;</span>
                </Link>
              </div>
            </Project3DCard>
          </div>

          {/* Project 05: QueueLess Bharat (Operational Dispatch & Hackathon Lead Schematic) */}
          <div className="w-full flex justify-start my-8 md:my-12 lg:pl-6 xl:pl-16">
            <Project3DCard side="left" isReducedMotion={isReducedMotion}>
              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-ivory-bright font-sans group-hover:text-accent-cool transition-colors">
                  <Link to="/projects/queueless-bharat" className="flex items-center gap-2 focus-visible:outline-accent-cool">
                    <span>QueueLess Bharat — Queue Intelligence</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>
              </div>

              <p className="mt-2 font-serif italic text-xs sm:text-sm text-ivory-soft leading-relaxed">
                "Computer vision and machine learning pipeline for real-time public queue management and bottleneck elimination."
              </p>

              {/* Operational Dispatch Telemetry */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 p-3 rounded-xl border border-ivory/8 bg-charcoal-surface/60">
                <div className="space-y-0.5 border-r border-ivory/8 pr-2.5">
                  <span className="font-mono text-[10px] text-ivory-muted uppercase">Leadership Scope</span>
                  <p className="font-mono text-xs font-semibold text-accent-emerald">
                    ML Lead &bull; Team of 4
                  </p>
                  <span className="font-sans text-[9px] text-ivory-muted block">End-to-end data pipelines</span>
                </div>
                <div className="space-y-0.5 pl-2">
                  <span className="font-mono text-[10px] text-ivory-muted uppercase">Telemetry</span>
                  <p className="font-mono text-xs font-semibold text-ivory-bright">
                    Queue Throughput
                  </p>
                  <span className="font-sans text-[9px] text-ivory-muted block">Real-time delay notifications</span>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-4 pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="tech-pill text-[10px]">Applied ML</span>
                  <span className="tech-pill text-[10px]">OpenCV</span>
                  <span className="tech-pill text-[10px]">Scikit-Learn</span>
                  <span className="tech-pill text-[10px]">SkillStation 2026</span>
                </div>
                <Link
                  to="/projects/queueless-bharat"
                  className="font-mono text-xs text-accent-cool hover:underline flex items-center gap-1"
                >
                  <span>Examine Dossier &rarr;</span>
                </Link>
              </div>
            </Project3DCard>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SCENE 05: Technical Depth — Engineering Architecture         */}
        {/* ============================================================ */}
        {(() => {
          // Staggered four-corner directional entrance animation for Scene 05
          const pHead = Math.max(0, Math.min(1, (progress - 0.72) / 0.05))
          const eHead = pHead * pHead * (3 - 2 * pHead)

          const pNW = Math.max(0, Math.min(1, (progress - 0.73) / 0.065))
          const pNE = Math.max(0, Math.min(1, (progress - 0.745) / 0.065))
          const pSW = Math.max(0, Math.min(1, (progress - 0.76) / 0.065))
          const pSE = Math.max(0, Math.min(1, (progress - 0.775) / 0.065))

          return (
            <section
              id="skills"
              aria-label="Scene 05: Engineering Specifications and Technical Architecture"
              className="relative min-h-[120vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-6xl mx-auto w-full pointer-events-none"
            >
              <div id="architecture" className="absolute -top-12" aria-hidden="true" />

              {/* Engineering Specifications Panel */}
              <div className="pointer-events-auto w-full space-y-8">
                {/* Header - Enters from North */}
                <div
                  style={
                    isReducedMotion
                      ? {}
                      : {
                          transform: `translate3d(0, ${(-48 * (1 - eHead)).toFixed(1)}px, 0) rotateX(${(8 * (1 - eHead)).toFixed(1)}deg)`,
                          opacity: eHead,
                        }
                  }
                  className="space-y-3 border-b border-ivory/10 pb-4 transition-opacity duration-75"
                >
                  <h2 className="text-2xl sm:text-4xl font-light text-ivory-bright font-sans tracking-tight">
                    Technical Architecture &amp; Systems
                  </h2>
                  <p className="font-serif italic text-xs sm:text-sm text-ivory-soft max-w-3xl leading-relaxed">
                    "Defensive systems design grounded in formal statistical learning, real-time edge perception, and deterministic execution boundaries."
                  </p>
                </div>

                {/* 4 Engineering System Rails (Entering from 4 Distinct Corners) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Rail 01: Computer Vision & Perception (Enters from Northwest) */}
                  <Architecture3DCard
                    corner="northwest"
                    entranceProgress={pNW}
                    isReducedMotion={isReducedMotion}
                  >
                    <div className="border-b border-ivory/8 pb-2">
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-ivory-bright">
                        Computer Vision &amp; Perception
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-ivory-soft leading-relaxed">
                      Real-time visual perception, feature extraction, and edge inference pipelines.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="tech-pill text-[10px]">YOLOv8 &amp; Ultralytics</span>
                      <span className="tech-pill text-[10px]">OpenCV</span>
                      <span className="tech-pill text-[10px]">MediaPipe (21 Landmarks)</span>
                      <span className="tech-pill text-[10px]">Synthetic Augmentation</span>
                      <span className="tech-pill text-[10px]">Google Colab (T4 GPU)</span>
                      <span className="tech-pill text-[10px]">Hazard Localization</span>
                    </div>
                  </Architecture3DCard>

                  {/* Rail 02: Machine Learning & Explainable AI (Enters from Northeast) */}
                  <Architecture3DCard
                    corner="northeast"
                    entranceProgress={pNE}
                    isReducedMotion={isReducedMotion}
                  >
                    <div className="border-b border-ivory/8 pb-2">
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-ivory-bright">
                        Machine Learning &amp; Explainable AI
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-ivory-soft leading-relaxed">
                      Interpretable predictive modeling with mathematical feature attribution and fair risk scoring.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="tech-pill text-[10px]">TreeSHAP Explainability</span>
                      <span className="tech-pill text-[10px]">Scikit-Learn Ensembles</span>
                      <span className="tech-pill text-[10px]">Credit Risk Modeling</span>
                      <span className="tech-pill text-[10px]">RapidFuzz Alignment</span>
                      <span className="tech-pill text-[10px]">Pandas &amp; NumPy</span>
                      <span className="tech-pill text-[10px]">Matplotlib</span>
                    </div>
                  </Architecture3DCard>

                  {/* Rail 03: Backend & Deterministic Systems (Enters from Southwest) */}
                  <Architecture3DCard
                    corner="southwest"
                    entranceProgress={pSW}
                    isReducedMotion={isReducedMotion}
                  >
                    <div className="border-b border-ivory/8 pb-2">
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-ivory-bright">
                        Backend &amp; Deterministic Systems
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-ivory-soft leading-relaxed">
                      Hard fail-closed architectures, strict schema validation, and secure RESTful services.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="tech-pill text-[10px]">Pydantic v2 Contracts</span>
                      <span className="tech-pill text-[10px]">Fail-Closed Gate</span>
                      <span className="tech-pill text-[10px]">FastAPI &amp; Flask</span>
                      <span className="tech-pill text-[10px]">SQLite &amp; SQLAlchemy</span>
                      <span className="tech-pill text-[10px]">Docker Containers</span>
                      <span className="tech-pill text-[10px]">Git CI/CD</span>
                    </div>
                  </Architecture3DCard>

                  {/* Rail 04: Programming & Core Foundations (Enters from Southeast) */}
                  <Architecture3DCard
                    corner="southeast"
                    entranceProgress={pSE}
                    isReducedMotion={isReducedMotion}
                  >
                    <div className="border-b border-ivory/8 pb-2">
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-ivory-bright">
                        Programming &amp; Core Foundations
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-ivory-soft leading-relaxed">
                      Fundamental language fluency, systems-level logic, and computer graphics foundations.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="tech-pill text-[10px]">Python (Primary)</span>
                      <span className="tech-pill text-[10px]">C / C++ Systems</span>
                      <span className="tech-pill text-[10px]">SQL Query Architecture</span>
                      <span className="tech-pill text-[10px]">TypeScript &amp; React</span>
                      <span className="tech-pill text-[10px]">Three.js Graphics</span>
                      <span className="tech-pill text-[10px]">Object-Oriented Design</span>
                    </div>
                  </Architecture3DCard>
                </div>

                {/* Resume Download Action */}
                <div className="pt-4 border-t border-ivory/10 flex items-center justify-end font-mono text-xs">
                  <a
                    href="/Resume_2026.pdf"
                    download="Saiyam_Bajpai_Resume_2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-cool hover:underline transition-colors"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    <span>Download Technical Resume &rarr;</span>
                  </a>
                </div>
              </div>
            </section>
          )
        })()}

        {/* ============================================================ */}
        {/* SCENE 06: Final City Arrival & Monumental Name Reveal        */}
        {/* ============================================================ */}
        <section
          id="contact"
          aria-label="Scene 06: Final City Arrival and Monumental Name Reveal"
          className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 pt-16 pb-12 select-none"
        >

          {/* Monumental Typography (Single Line across desktop & mobile) */}
          <div className="my-auto py-12 text-center space-y-4 relative max-w-7xl mx-auto w-full px-4 overflow-hidden">
            {/* Restrained calm atmospheric vignette ensuring 100% typography contrast over city skyline */}
            <div className="absolute inset-0 -inset-x-8 bg-gradient-to-r from-transparent via-charcoal-deep/80 to-transparent blur-2xl pointer-events-none -z-10" />
            <h2 className="whitespace-nowrap font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-ivory-bright via-ivory to-ivory/60 uppercase leading-none select-none text-center drop-shadow-[0_20px_48px_rgba(0,0,0,0.95)] text-[clamp(2.5rem,10.2vw,11.5rem)] sm:text-[clamp(3.2rem,10.5vw,12.0rem)]">
              Saiyam Bajpai
            </h2>
            <p className="font-serif italic text-base sm:text-2xl text-ivory-soft max-w-2xl mx-auto drop-shadow-md">
              "I build systems that see, explain, and decide."
            </p>
          </div>

          {/* Contact Channels & Verified Footer Actions */}
          <div className="w-full space-y-6 pt-6 border-t border-ivory/10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Verified Email Card with Copy & Write */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-lg border border-ivory/15 bg-charcoal-deep/80 px-4 py-2 font-mono text-xs text-ivory-bright backdrop-blur-md">
                  <Mail className="h-3.5 w-3.5 text-accent-cool" />
                  <span>{profileData.email}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ivory/15 bg-charcoal-elevated/80 px-3.5 py-2 font-mono text-xs text-ivory-soft hover:text-ivory hover:border-ivory/30 transition-all backdrop-blur-md"
                  aria-label="Copy verified email address"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-accent-emerald" />
                      <span className="text-accent-emerald">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-ivory px-4 py-2 font-mono text-xs font-medium text-charcoal-deep hover:bg-ivory-bright transition-all"
                >
                  <span>Write</span>
                </a>
              </div>

              {/* Profiles & Resume */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-ivory/15 bg-charcoal-deep/80 px-4 py-2 font-mono text-xs text-ivory-soft hover:text-ivory hover:border-ivory/30 transition-all backdrop-blur-md"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 text-ivory-muted" />
                </a>

                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-ivory/15 bg-charcoal-deep/80 px-4 py-2 font-mono text-xs text-ivory-soft hover:text-ivory hover:border-ivory/30 transition-all backdrop-blur-md"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3 text-accent-cool" />
                </a>

                <a
                  href="/Resume_2026.pdf"
                  download="Saiyam_Bajpai_Resume_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-cool/40 bg-accent-cool/10 px-4 py-2 font-mono text-xs text-accent-cool hover:bg-accent-cool/20 transition-all backdrop-blur-md"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  <span>Resume.pdf</span>
                </a>
              </div>
            </div>

            {/* Bottom Telemetry & Return to Origin */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-ivory-muted/70 pt-4 border-t border-ivory/8">
              <span>&copy; {profileData.currentYear} Saiyam Bajpai. All rights reserved.</span>
              <span className="hidden sm:inline">Dual Track: MITS Gwalior (2025&ndash;2029) &bull; IIT Madras (2026&ndash;2030)</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-accent-cool hover:text-ivory-bright transition-colors"
                aria-label="Return to the beginning of the journey"
              >
                <span>Return to Origin</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
