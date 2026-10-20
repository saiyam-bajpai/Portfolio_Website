import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404 // Route Not Found — Saiyam Bajpai'
  }, [])

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center">
      <div className="rounded-lg border border-ivory/12 bg-charcoal-surface/90 p-8 sm:p-12 shadow-elevated">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-charcoal-elevated border border-ivory/10 text-accent-cool">
          <AlertCircle className="h-6 w-6" aria-hidden="true" />
        </div>

        <span className="mt-6 block font-mono text-xs uppercase tracking-widest text-accent-cool">
          ERROR 404 // ROUTE_NOT_FOUND
        </span>

        <h1 className="mt-2 text-3xl font-semibold text-ivory-bright font-sans">
          Endpoint Does Not Exist
        </h1>

        <p className="mt-4 text-sm sm:text-base text-ivory-muted max-w-md mx-auto leading-relaxed font-sans">
          The requested path does not map to any verified engineering dossier, case study, or research endpoint.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded bg-ivory px-5 py-2.5 font-medium text-charcoal-deep transition-all hover:bg-ivory-bright focus-visible:outline-accent-cool"
          >
            <Home className="h-4 w-4" />
            <span>Return to Primary Portfolio</span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded border border-ivory/15 bg-charcoal-elevated px-4 py-2.5 text-ivory-soft hover:text-ivory-bright transition-all focus-visible:outline-accent-cool"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous Page</span>
          </button>
        </div>
      </div>
    </div>
  )
}
