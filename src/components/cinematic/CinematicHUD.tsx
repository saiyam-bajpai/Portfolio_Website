import React, { useState } from 'react'
import { FileText, ArrowUp, Compass, ChevronUp, ChevronDown } from 'lucide-react'
import { CINEMATIC_KEYFRAMES } from './cameraChoreography'
import type { CameraKeyframe } from './types'

interface CinematicHUDProps {
  progress: number
  activeStage: CameraKeyframe | null
  isReducedMotion?: boolean
  onToggleReducedMotion?: () => void
  onSeek: (progress: number) => void
  onScrollToSection?: (sectionId: string) => void
  onSkipToPortfolio?: () => void
  onSwitchToClassic?: () => void
}

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  progress,
  activeStage,
  onSeek,
  onScrollToSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const percent = Math.round(progress * 100)
  const stage = activeStage || CINEMATIC_KEYFRAMES[0]

  const stageQuickLinks = [
    { label: 'Sunset', progress: 0.0, sectionId: 'arrival' },
    { label: 'Orientation', progress: 0.18, sectionId: 'orientation' },
    { label: 'Academics', progress: 0.36, sectionId: 'academics' },
    { label: 'Span Fly-Thru', progress: 0.52, sectionId: 'projects' },
    { label: 'Projects', progress: 0.70, sectionId: 'projects' },
    { label: 'Architecture', progress: 0.84, sectionId: 'skills' },
    { label: 'City Arrival', progress: 1.0, sectionId: 'contact' },
  ]

  return (
    <aside
      aria-label="Cinematic Navigation & Telemetry"
      className="pointer-events-none fixed bottom-6 right-6 z-40 select-none max-w-sm flex flex-col items-end gap-2"
    >
      {/* Expandable Quick Nav Panel */}
      {isExpanded && (
        <div className="pointer-events-auto mb-2 w-72 rounded-xl border border-ivory/15 bg-charcoal-deep/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-ivory/10 font-mono text-[11px] text-accent-cool uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5" />
              <span>Waypoints</span>
            </span>
            <span className="text-ivory/40">{percent}%</span>
          </div>

          {/* Scrub bar */}
          <div className="py-3">
            <label htmlFor="hud-scrubber" className="sr-only">
              Scroll timeline scrubber
            </label>
            <input
              id="hud-scrubber"
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={progress}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="w-full h-1 bg-ivory/15 rounded-lg appearance-none cursor-pointer accent-accent-cool focus:outline-none"
            />
          </div>

          {/* Waypoint buttons */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {stageQuickLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (onScrollToSection) {
                    onScrollToSection(item.sectionId)
                  } else {
                    onSeek(item.progress)
                  }
                }}
                className={`rounded px-2.5 py-1.5 font-sans text-xs text-left transition-colors border ${
                  Math.abs(progress - item.progress) < 0.12
                    ? 'border-accent-cool bg-accent-cool/15 text-accent-cool font-medium'
                    : 'border-ivory/8 bg-charcoal-elevated/70 text-ivory-soft hover:text-ivory hover:border-ivory/25'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick links footer */}
          <div className="mt-3 pt-3 border-t border-ivory/10 flex items-center justify-between gap-2">
            <a
              href="/Resume_2026.pdf"
              download="Saiyam_Bajpai_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-ivory-muted hover:text-accent-cool transition-colors"
            >
              <FileText className="h-3 w-3 text-accent-cool" />
              <span>Resume</span>
            </a>

            <button
              type="button"
              onClick={() => {
                if (onScrollToSection) {
                  onScrollToSection('arrival')
                } else {
                  onSeek(0)
                }
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-ivory-muted hover:text-ivory transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Floating Minimal Bar */}
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-ivory/15 bg-charcoal-deep/85 px-3.5 py-1.5 shadow-xl backdrop-blur-md">
        {/* Stage Name */}
        <div className="flex items-center gap-2 pr-2 border-r border-ivory/10">
          <span className="font-sans text-xs text-ivory-bright font-medium tracking-wide">
            {stage.stageName.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Progress percent */}
        <span className="font-mono text-xs text-ivory-muted">
          {percent}%
        </span>

        {/* Expand/Collapse Waypoints Trigger */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="rounded-full p-1.5 border border-ivory/10 bg-charcoal-elevated/70 text-ivory-muted hover:text-ivory hover:border-ivory/25 transition-colors"
          title={isExpanded ? 'Collapse waypoints menu' : 'Expand journey waypoints'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>
    </aside>
  )
}
