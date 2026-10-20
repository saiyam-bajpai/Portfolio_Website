import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CinematicThreeCanvas } from './CinematicThreeCanvas'
import { CinematicHUD } from './CinematicHUD'
import type { CameraKeyframe } from './types'

interface CinematicHeroProps {
  onExplorePortfolio?: () => void
  onSwitchToClassic?: () => void
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onExplorePortfolio,
  onSwitchToClassic,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState<number>(0)
  const [activeStage, setActiveStage] = useState<CameraKeyframe | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  // Synchronize natural page scroll with progress timeline [0 -> 1]
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
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Programmatic seeking (when scrubbing slider or clicking perspective presets)
  const handleSeek = useCallback((targetProgress: number) => {
    const container = containerRef.current
    if (!container) return

    const totalScrollableDistance = container.offsetHeight - window.innerHeight
    const targetScrollY = container.offsetTop + targetProgress * totalScrollableDistance

    window.scrollTo({
      top: targetScrollY,
      behavior: 'auto',
    })
    setProgress(targetProgress)
  }, [])

  // Skip down to main portfolio content
  const handleSkipToPortfolio = useCallback(() => {
    if (onExplorePortfolio) {
      onExplorePortfolio()
      return
    }
    const target = document.getElementById('portfolio-content')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      const container = containerRef.current
      if (container) {
        window.scrollTo({
          top: container.offsetTop + container.offsetHeight,
          behavior: 'smooth',
        })
      }
    }
  }, [onExplorePortfolio])

  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion((prev) => !prev)
  }, [])

  return (
    <section
      ref={containerRef}
      id="cinematic-hero"
      aria-label="Cinematic 3D Portfolio Journey"
      className="relative w-full min-h-[380vh] bg-charcoal-deep"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07080a]">
        {/* Three.js Canvas */}
        <CinematicThreeCanvas
          progress={progress}
          isReducedMotion={isReducedMotion}
          onStageChange={setActiveStage}
        />

        {/* Accessible HUD Overlay */}
        <CinematicHUD
          progress={progress}
          activeStage={activeStage}
          isReducedMotion={isReducedMotion}
          onToggleReducedMotion={toggleReducedMotion}
          onSeek={handleSeek}
          onSkipToPortfolio={handleSkipToPortfolio}
          onSwitchToClassic={onSwitchToClassic}
        />
      </div>
    </section>
  )
}
