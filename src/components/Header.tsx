import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileDown, Menu, X } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ivory/8 bg-charcoal-deep/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Cinematic Personal Wordmark */}
        <Link
          to="/"
          className="font-sans text-base sm:text-lg font-semibold tracking-tight text-ivory-bright transition-colors hover:text-accent-cool focus-visible:outline-accent-cool"
          aria-label={`${profileData.fullName} Home`}
        >
          {profileData.fullName}
        </Link>

        {/* Minimal Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {isHome ? (
            <>
              <a
                href="#projects"
                className="font-sans text-xs tracking-wider uppercase text-ivory-soft/80 transition-colors hover:text-ivory-bright"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="font-sans text-xs tracking-wider uppercase text-ivory-soft/80 transition-colors hover:text-ivory-bright"
              >
                Architecture
              </a>
              <a
                href="#contact"
                className="font-sans text-xs tracking-wider uppercase text-ivory-soft/80 transition-colors hover:text-ivory-bright"
              >
                Contact
              </a>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="font-sans text-xs tracking-wider uppercase text-ivory-soft/80 transition-colors hover:text-ivory-bright"
              >
                Overview
              </Link>
              <Link
                to="/#projects"
                className="font-sans text-xs tracking-wider uppercase text-ivory-soft/80 transition-colors hover:text-ivory-bright"
              >
                Projects
              </Link>
              <Link
                to="/#skills"
                className="font-sans text-xs tracking-wider uppercase text-ivory-soft/80 transition-colors hover:text-ivory-bright"
              >
                Architecture
              </Link>
            </>
          )}

          {/* Restrained Resume Action */}
          <a
            href={profileData.resumePath}
            download="Saiyam_Bajpai_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-ivory/15 bg-charcoal-elevated/70 px-3.5 py-1.5 font-mono text-xs text-ivory-soft transition-all hover:border-ivory/30 hover:bg-charcoal-hover hover:text-ivory-bright focus-visible:outline-accent-cool"
            aria-label="Download verified Resume PDF"
          >
            <FileDown className="h-3.5 w-3.5 text-accent-cool" aria-hidden="true" />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex md:hidden items-center justify-center rounded p-2 text-ivory-soft hover:text-ivory focus-visible:outline-accent-cool"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-charcoal-deep/95 backdrop-blur-xl border-b border-ivory/8 p-6 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="flex flex-col gap-6 font-sans text-sm" aria-label="Mobile Navigation">
            {isHome ? (
              <>
                <a
                  href="#projects"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-ivory-soft hover:text-ivory-bright py-2 border-b border-ivory/6 tracking-wide"
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-ivory-soft hover:text-ivory-bright py-2 border-b border-ivory/6 tracking-wide"
                >
                  Architecture
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-ivory-soft hover:text-ivory-bright py-2 border-b border-ivory/6 tracking-wide"
                >
                  Contact
                </a>
              </>
            ) : (
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-ivory-soft hover:text-ivory-bright py-2 border-b border-ivory/6 tracking-wide"
              >
                Back to Overview
              </Link>
            )}

            <a
              href={profileData.resumePath}
              download="Saiyam_Bajpai_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ivory/15 bg-charcoal-elevated/80 p-3 font-mono text-xs text-ivory hover:text-accent-cool transition-colors"
            >
              <FileDown className="h-4 w-4 text-accent-cool" aria-hidden="true" />
              <span>Resume (PDF)</span>
            </a>
          </nav>

          <div className="pt-6 font-mono text-xs text-ivory-muted/60 border-t border-ivory/6">
            Press <kbd className="bg-charcoal-elevated px-1.5 py-0.5 rounded border border-ivory/10 text-ivory-soft">Esc</kbd> to close menu
          </div>
        </div>
      )}
    </header>
  )
}
