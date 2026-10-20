import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  alpha: number
  baseAlpha: number
  twinkleSpeed: number
  color: string
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Render single static frame and exit
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < 70; i++) {
        ctx.beginPath()
        ctx.arc(Math.random() * width, Math.random() * height, 0.8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245, 242, 235, 0.35)'
        ctx.fill()
      }
      return
    }

    const starColors = [
      'rgba(245, 242, 235, ',  // warm ivory (primary)
      'rgba(245, 242, 235, ',  // warm ivory
      'rgba(245, 242, 235, ',  // warm ivory
      'rgba(125, 211, 252, ',  // restrained cool ice accent
    ]

    const stars: Star[] = Array.from({ length: 85 }, () => {
      const baseAlpha = 0.15 + Math.random() * 0.45
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.5 + Math.random() * 0.8,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.003 + Math.random() * 0.008,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      }
    })

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    let isDocumentVisible = !document.hidden
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let scrollY = window.scrollY
    const handleScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Slight parallax offset based on scroll
      const parallaxOffset = scrollY * 0.05

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Subtle alpha oscillation
        star.alpha += star.twinkleSpeed
        if (star.alpha > star.baseAlpha + 0.25 || star.alpha < star.baseAlpha - 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed
        }

        // Slow upward drift
        star.y -= 0.12
        if (star.y < 0) {
          star.y = height
          star.x = Math.random() * width
        }

        const renderY = (star.y - parallaxOffset + height * 2) % height

        ctx.beginPath()
        ctx.arc(star.x, renderY, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${star.color}${Math.max(0.05, Math.min(star.alpha, 0.75))})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    />
  )
}
