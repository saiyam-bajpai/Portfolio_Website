import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { StarfieldCanvas } from './StarfieldCanvas'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout: React.FC = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-charcoal text-ivory overflow-x-clip">
      {/* Procedural Canvas Starfield */}
      <StarfieldCanvas />

      {/* Main Structural Layout */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        {!isHome && <Footer />}
      </div>
    </div>
  )
}
