import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Award, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, GitFork, Lock, Clock } from 'lucide-react'
import { primaryProjects, profileData } from '../data/portfolioData'
import { CaseStudyVisual } from '../components/CaseStudyVisual'

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const project = primaryProjects.find((p) => p.slug === slug)

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Saiyam Bajpai`
      window.scrollTo(0, 0)
    }
  }, [project])

  if (!project) {
    return <Navigate to="/404" replace />
  }

  return (
    <article className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-12">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-ivory/8 font-mono text-xs text-ivory-muted">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-accent-cool hover:text-ivory-bright transition-colors focus-visible:outline-accent-cool"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <span>PROJECTS</span>
          <span className="text-ivory/20">/</span>
          <span className="text-ivory-soft uppercase">{project.category}</span>
        </div>
      </div>

      {/* Project Header Banner */}
      <div className="mt-10 pb-12 border-b border-ivory/8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-4">
          <span className="text-accent-cool font-medium tracking-wider">{project.tag}</span>
          <span className="text-ivory/20">•</span>
          <span className="text-ivory-muted">{project.timeline}</span>
          {project.isCertified && (
            <>
              <span className="text-ivory/20">•</span>
              <span className="inline-flex items-center gap-1 text-accent-emerald text-[11px] font-medium bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded">
                <Award className="h-3 w-3" />
                Certified Achievement
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ivory-bright font-sans">
          {project.title}
        </h1>

        <p className="mt-4 text-xl sm:text-2xl text-ivory-soft font-serif italic max-w-3xl leading-relaxed">
          "{project.subtitle}"
        </p>

        {/* Role & Verification Badge Header */}
        <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-ivory-soft bg-charcoal-surface/80 border border-ivory/10 rounded-lg p-4">
          <div>
            <span className="text-ivory-faint block text-[10px] uppercase">My Role</span>
            <span className="text-ivory-bright font-semibold mt-0.5 block">{project.role}</span>
          </div>

          {project.teamContext && (
            <div>
              <span className="text-ivory-faint block text-[10px] uppercase">Team Context</span>
              <span className="text-ivory-soft font-medium mt-0.5 block">{project.teamContext}</span>
            </div>
          )}

          <div>
            <span className="text-ivory-faint block text-[10px] uppercase">Verification Status</span>
            <span className="text-accent-emerald font-medium mt-0.5 inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Primary Record Verified
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="mt-12 space-y-16">
        {/* 1. Problem Statement */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent-cool flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cool" />
            01 // Problem Statement
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ivory-soft font-sans">
            {project.problemStatement}
          </p>
        </section>

        {/* 2. Implementation Architecture */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent-cool flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cool" />
            02 // Implementation &amp; Technical Execution
          </h2>
          <div className="space-y-3 font-sans">
            {project.implementation.map((step, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-ivory/8 bg-charcoal-surface/60 p-4 flex items-start gap-3.5 text-sm sm:text-base text-ivory-soft leading-relaxed"
              >
                <span className="font-mono text-xs text-accent-cool mt-0.5 shrink-0">0{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2.5 Verified Visual Topology & Evidence Diagrams */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent-cool flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cool" />
            02.5 // Verified Subsystem Topology &amp; Architecture Flow
          </h2>
          <CaseStudyVisual slug={project.slug} />
        </section>

        {/* 3. Substantiated Evidence & Results */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent-emerald flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
            03 // Evidence &amp; Substantiated Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.evidence.map((item) => (
              <div
                key={item.metric}
                className="rounded-lg border border-accent-emerald/20 bg-charcoal-surface/80 p-4 font-mono"
              >
                <span className="text-[11px] text-ivory-muted uppercase block">{item.metric}</span>
                <span className="text-2xl font-bold text-accent-emerald mt-1 block">{item.value}</span>
                <span className="text-[11px] text-ivory-faint mt-2 block font-sans leading-relaxed">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </section>


        {/* 4. Limitations (Truthful Engineering Bounds) */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            04 // Known Limitations &amp; Operational Constraints
          </h2>
          <div className="rounded-lg border border-amber-400/20 bg-charcoal-deep/60 p-5 space-y-2.5 font-sans">
            {project.limitations.map((limitation, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-ivory-muted">
                <span className="text-amber-400 shrink-0">•</span>
                <span>{limitation}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Repository & Verification Links */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent-cool flex items-center gap-2">
            <GitFork className="h-4 w-4" />
            05 // Code Repository &amp; Artifact Availability
          </h2>

          <div className="rounded-lg border border-ivory/10 bg-charcoal-surface/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-ivory-muted block">Status:</span>
              <span className="text-ivory-bright font-medium mt-0.5 block">
                {project.repoStatus === 'public' && 'Public Open-Source Repository'}
                {project.repoStatus === 'private' && 'Private Internal Repository (Review on request)'}
                {project.repoStatus === 'in_progress' && 'In Progress (Active Hackathon Sync)'}
                {project.repoStatus === 'pending_user_verification' && 'Code Review Available on Request'}
              </span>
            </div>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-ivory px-4 py-2 font-medium text-charcoal-deep hover:bg-ivory-bright transition-colors focus-visible:outline-accent-cool"
              >
                <span>Inspect Repository on GitHub</span>
                <ArrowUpRight className="h-4 w-4 text-charcoal-deep" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 text-ivory-muted bg-charcoal-deep px-3 py-1.5 rounded border border-ivory/8">
                <Lock className="h-3.5 w-3.5 text-ivory-faint" />
                <span>Code walkthrough available during technical interview</span>
              </div>
            )}
          </div>
        </section>

        {/* 6. Forward Engineering & Next Steps */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent-cool flex items-center gap-2">
            <Clock className="h-4 w-4" />
            06 // Forward Engineering &amp; Next Steps
          </h2>
          <div className="rounded-lg border border-ivory/8 bg-charcoal-surface/60 p-5 space-y-2.5 font-sans">
            {project.nextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-ivory-muted">
                <ArrowRight className="h-4 w-4 text-accent-cool shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Detail Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-ivory/8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-ivory-muted">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-accent-cool hover:text-ivory-bright transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Primary Portfolio</span>
        </Link>

        <a
          href={profileData.resumePath}
          download="Saiyam_Bajpai_Resume_2026.pdf"
          className="hover:text-ivory transition-colors"
        >
          Download Verified Resume.pdf
        </a>
      </div>
    </article>
  )
}
