/**
 * Design Tokens: Saiyam Bajpai Engineering Portfolio
 * Direction: Dark charcoal & warm ivory, restrained cool accent, fine rules, layered depth.
 */

export const colors = {
  // Background Charcoals
  charcoal: {
    DEFAULT: '#0b0d10',
    deep: '#07080a',
    surface: '#111419',
    elevated: '#171b22',
    hover: '#1d222b',
  },
  // Warm Ivory Text & Elements
  ivory: {
    DEFAULT: '#f5f2eb',
    bright: '#ffffff',
    soft: '#e8e3d8',
    muted: '#9e998e',
    faint: '#6e6960',
  },
  // Restrained Cool Accent (Ice Cyan / Deep Celestial)
  accent: {
    cool: '#38bdf8',
    coolMuted: 'rgba(56, 189, 248, 0.16)',
    coolGlow: 'rgba(56, 189, 248, 0.08)',
    emerald: '#34d399',
  },
  // Fine Structural Rules & Borders
  border: {
    faint: 'rgba(245, 242, 235, 0.06)',
    subtle: 'rgba(245, 242, 235, 0.10)',
    medium: 'rgba(245, 242, 235, 0.18)',
    active: 'rgba(56, 189, 248, 0.40)',
  },
} as const

export const typography = {
  fontSans: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  fontSerif: '"Newsreader", Georgia, serif',
  fontMono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  scale: {
    xs: '0.75rem',    // 12px
    sm: '0.8125rem',  // 13px
    base: '0.9375rem',// 15px
    lg: '1.0625rem',  // 17px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
} as const

export const radii = {
  none: '0px',
  sm: '3px',
  md: '6px',
  lg: '10px',
  full: '9999px',
} as const

export const shadows = {
  flat: 'none',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.4)',
  card: '0 4px 20px -2px rgba(0, 0, 0, 0.65)',
  elevated: '0 12px 36px -4px rgba(0, 0, 0, 0.8)',
  insetRule: 'inset 0 1px 0 rgba(245, 242, 235, 0.05)',
} as const

export const motion = {
  duration: {
    instant: 0,
    quick: 0.18,
    standard: 0.35,
    extended: 0.6,
  },
  easing: {
    standard: [0.16, 1, 0.3, 1] as const,
    subtle: [0.25, 0.1, 0.25, 1] as const,
  },
} as const
