import * as THREE from 'three'

/**
 * Time-Of-Day System for Continuous Cinematic Waterfront Journey
 *
 * Restrained, elegant cinematic palette:
 * - Horizon: Warm muted peach, dusty rose, and amber -> twilight slate-blue -> midnight navy
 * - Sky Zenith: Deep slate-indigo -> cobalt -> obsidian navy
 * - Water: Deep slate-blue / blue-grey with localized sunset specular and moonlit sheen
 * - Direct Sun: Controlled warm amber/peach (NO garish oversaturated red)
 * - Moon: Cool silver-blue illumination rising during blue hour and night
 */

export interface TimeOfDayEnvironment {
  progress: number
  skyTopColor: THREE.Color
  skyBottomColor: THREE.Color
  fogColor: THREE.Color
  fogNear: number
  fogFar: number
  sunColor: THREE.Color
  sunIntensity: number
  sunPosition: THREE.Vector3
  moonColor: THREE.Color
  moonIntensity: number
  moonPosition: THREE.Vector3
  ambientColor: THREE.Color
  ambientIntensity: number
  hemiSkyColor: THREE.Color
  hemiGroundColor: THREE.Color
  hemiIntensity: number
  waterBaseColor: THREE.Color
  waterReflectionColor: THREE.Color
  waterSunHighlightColor: THREE.Color
  waterSunHighlightIntensity: number
  bridgeWarmIntensity: number
  bridgeCyanIntensity: number
  sunSphereColor: THREE.Color
  sunSphereIntensity: number
}

interface EnvironmentKeyframe {
  progress: number
  skyTop: string
  skyBottom: string
  fog: string
  fogNear: number
  fogFar: number
  sunColor: string
  sunIntensity: number
  sunPos: [number, number, number]
  moonColor: string
  moonIntensity: number
  moonPos: [number, number, number]
  ambient: string
  ambientIntensity: number
  hemiSky: string
  hemiGround: string
  hemiIntensity: number
  waterBase: string
  waterReflection: string
  waterSunHighlight: string
  waterSunIntensity: number
  bridgeWarm: number
  bridgeCyan: number
  sunSphereColor: string
  sunSphereIntensity: number
}

const ENVIRONMENT_KEYFRAMES: EnvironmentKeyframe[] = [
  // 1. Scene 01: Warm Sunset Arrival (0.00 - 0.15)
  // Sun clearly visible, warm ivory-gold disc with amber halo above the horizon; distant skyline silhouetted
  {
    progress: 0.0,
    skyTop: '#161e30',
    skyBottom: '#d08664',
    fog: '#222938',
    fogNear: 45,
    fogFar: 440,
    sunColor: '#ffb366',
    sunIntensity: 2.4,
    sunPos: [-22, 16.0, -190],
    moonColor: '#dbeafe',
    moonIntensity: 0.0,
    moonPos: [0, -14.0, -285],
    ambient: '#222b3a',
    ambientIntensity: 1.25,
    hemiSky: '#324056',
    hemiGround: '#141c28',
    hemiIntensity: 1.15,
    waterBase: '#1a2638',
    waterReflection: '#34445c',
    waterSunHighlight: '#ffc285',
    waterSunIntensity: 1.8,
    bridgeWarm: 1.2,
    bridgeCyan: 0.8,
    sunSphereColor: '#fef08a',
    sunSphereIntensity: 2.4,
  },

  // 2. Scene 02: Lowering Sun / Amber Twilight (0.24)
  // Sun slowly lowers and shifts toward golden-amber; track emerges
  {
    progress: 0.24,
    skyTop: '#13192b',
    skyBottom: '#bf7052',
    fog: '#1c2332',
    fogNear: 42,
    fogFar: 430,
    sunColor: '#f59e0b',
    sunIntensity: 2.0,
    sunPos: [-22, 9.5, -190],
    moonColor: '#dbeafe',
    moonIntensity: 0.0,
    moonPos: [0, -10.0, -285],
    ambient: '#1e2636',
    ambientIntensity: 1.15,
    hemiSky: '#2b364c',
    hemiGround: '#121824',
    hemiIntensity: 1.05,
    waterBase: '#162234',
    waterReflection: '#2d3b50',
    waterSunHighlight: '#f59e0b',
    waterSunIntensity: 1.45,
    bridgeWarm: 1.1,
    bridgeCyan: 1.0,
    sunSphereColor: '#fde68a',
    sunSphereIntensity: 1.9,
  },

  // 3. Scene 03: Sun Approaching Horizon / Orange-Pink Twilight (0.40)
  // Sun touches horizon; suspension bridge expands
  {
    progress: 0.40,
    skyTop: '#101628',
    skyBottom: '#8e5462',
    fog: '#161e2c',
    fogNear: 40,
    fogFar: 420,
    sunColor: '#ea580c',
    sunIntensity: 1.5,
    sunPos: [-22, 2.5, -190],
    moonColor: '#dbeafe',
    moonIntensity: 0.08,
    moonPos: [0, -4.0, -285],
    ambient: '#1a2232',
    ambientIntensity: 1.05,
    hemiSky: '#242f44',
    hemiGround: '#101520',
    hemiIntensity: 1.0,
    waterBase: '#131d2e',
    waterReflection: '#243246',
    waterSunHighlight: '#ea580c',
    waterSunIntensity: 1.0,
    bridgeWarm: 0.8,
    bridgeCyan: 1.3,
    sunSphereColor: '#f97316',
    sunSphereIntensity: 1.3,
  },

  // 4. Sun Sunset / Dusk Transition (0.52)
  // Sun sinks below horizon; violet dusk settles across waterfront; moon starts rising behind central skyline
  {
    progress: 0.52,
    skyTop: '#0d1324',
    skyBottom: '#4e3852',
    fog: '#131826',
    fogNear: 38,
    fogFar: 410,
    sunColor: '#7a3e4e',
    sunIntensity: 0.35,
    sunPos: [-22, -4.5, -190],
    moonColor: '#d5e4f5',
    moonIntensity: 0.45,
    moonPos: [0, 5.0, -285],
    ambient: '#161e2c',
    ambientIntensity: 1.05,
    hemiSky: '#1f283c',
    hemiGround: '#0d121c',
    hemiIntensity: 1.05,
    waterBase: '#121c2e',
    waterReflection: '#1f2b40',
    waterSunHighlight: '#7a3e4e',
    waterSunIntensity: 0.2,
    bridgeWarm: 0.5,
    bridgeCyan: 1.5,
    sunSphereColor: '#7a3e4e',
    sunSphereIntensity: 0.3,
  },

  // 5. Scene 04: Cool Blue Hour & Moonrise (0.68)
  // Moon appears behind central city skyline and ascends; blue hour sky
  {
    progress: 0.68,
    skyTop: '#091022',
    skyBottom: '#1a253c',
    fog: '#0f1524',
    fogNear: 35,
    fogFar: 400,
    sunColor: '#1e1c28',
    sunIntensity: 0.0,
    sunPos: [-22, -10.0, -190],
    moonColor: '#d8e8f8',
    moonIntensity: 1.15,
    moonPos: [0, 20.0, -285],
    ambient: '#141c2a',
    ambientIntensity: 1.15,
    hemiSky: '#1c283e',
    hemiGround: '#0d131f',
    hemiIntensity: 1.15,
    waterBase: '#121e32',
    waterReflection: '#1d2a42',
    waterSunHighlight: '#38bdf8',
    waterSunIntensity: 0.0,
    bridgeWarm: 0.2,
    bridgeCyan: 1.7,
    sunSphereColor: '#1a253c',
    sunSphereIntensity: 0.0,
  },

  // 6. Scene 05: Deep Twilight / High Moon (0.84)
  // Moon high in the night sky behind central skyline, casting moonlight onto water and bridge
  {
    progress: 0.84,
    skyTop: '#060a18',
    skyBottom: '#11182a',
    fog: '#0c111e',
    fogNear: 35,
    fogFar: 400,
    sunColor: '#12121c',
    sunIntensity: 0.0,
    sunPos: [-22, -14.0, -190],
    moonColor: '#e0effc',
    moonIntensity: 1.55,
    moonPos: [0, 32.0, -285],
    ambient: '#131b2a',
    ambientIntensity: 1.25,
    hemiSky: '#1a253a',
    hemiGround: '#0a0f18',
    hemiIntensity: 1.25,
    waterBase: '#132034',
    waterReflection: '#1f2e46',
    waterSunHighlight: '#38bdf8',
    waterSunIntensity: 0.0,
    bridgeWarm: 0.1,
    bridgeCyan: 1.8,
    sunSphereColor: '#11182a',
    sunSphereIntensity: 0.0,
  },

  // 7. Scene 06: Deep Navy Night & City Waterfront Arrival (1.00)
  // Moonlit city waterfront, illuminated skyline towers, deep blue-grey water with surface detail
  {
    progress: 1.0,
    skyTop: '#040712',
    skyBottom: '#0a0e1c',
    fog: '#080d18',
    fogNear: 35,
    fogFar: 400,
    sunColor: '#0a0a10',
    sunIntensity: 0.0,
    sunPos: [-22, -18.0, -190],
    moonColor: '#e2f0fd',
    moonIntensity: 1.85,
    moonPos: [0, 38.0, -285],
    ambient: '#141d2c',
    ambientIntensity: 1.35,
    hemiSky: '#1b263c',
    hemiGround: '#0c121e',
    hemiIntensity: 1.35,
    waterBase: '#142236',
    waterReflection: '#22344c',
    waterSunHighlight: '#38bdf8',
    waterSunIntensity: 0.0,
    bridgeWarm: 0.05,
    bridgeCyan: 1.9,
    sunSphereColor: '#0a0e1c',
    sunSphereIntensity: 0.0,
  },
]

function hermite(t: number): number {
  return t * t * (3 - 2 * t)
}

export class TimeOfDayController {
  private tempColorA = new THREE.Color()
  private tempColorB = new THREE.Color()

  public evaluate(progress: number): TimeOfDayEnvironment {
    const p = Math.max(0, Math.min(1, progress))

    let i = 0
    while (
      i < ENVIRONMENT_KEYFRAMES.length - 1 &&
      ENVIRONMENT_KEYFRAMES[i + 1].progress < p
    ) {
      i++
    }

    const k1 = ENVIRONMENT_KEYFRAMES[i]
    const k2 = ENVIRONMENT_KEYFRAMES[Math.min(i + 1, ENVIRONMENT_KEYFRAMES.length - 1)]

    const span = k2.progress - k1.progress
    const localT = span > 0.0001 ? (p - k1.progress) / span : 0
    const t = hermite(localT)

    const lerpColor = (hex1: string, hex2: string): THREE.Color => {
      this.tempColorA.set(hex1)
      this.tempColorB.set(hex2)
      return this.tempColorA.clone().lerp(this.tempColorB, t)
    }

    const sunPos = new THREE.Vector3(
      THREE.MathUtils.lerp(k1.sunPos[0], k2.sunPos[0], t),
      THREE.MathUtils.lerp(k1.sunPos[1], k2.sunPos[1], t),
      THREE.MathUtils.lerp(k1.sunPos[2], k2.sunPos[2], t)
    )

    const moonPos = new THREE.Vector3(
      THREE.MathUtils.lerp(k1.moonPos[0], k2.moonPos[0], t),
      THREE.MathUtils.lerp(k1.moonPos[1], k2.moonPos[1], t),
      THREE.MathUtils.lerp(k1.moonPos[2], k2.moonPos[2], t)
    )

    return {
      progress: p,
      skyTopColor: lerpColor(k1.skyTop, k2.skyTop),
      skyBottomColor: lerpColor(k1.skyBottom, k2.skyBottom),
      fogColor: lerpColor(k1.fog, k2.fog),
      fogNear: THREE.MathUtils.lerp(k1.fogNear, k2.fogNear, t),
      fogFar: THREE.MathUtils.lerp(k1.fogFar, k2.fogFar, t),
      sunColor: lerpColor(k1.sunColor, k2.sunColor),
      sunIntensity: THREE.MathUtils.lerp(k1.sunIntensity, k2.sunIntensity, t),
      sunPosition: sunPos,
      moonColor: lerpColor(k1.moonColor, k2.moonColor),
      moonIntensity: THREE.MathUtils.lerp(k1.moonIntensity, k2.moonIntensity, t),
      moonPosition: moonPos,
      ambientColor: lerpColor(k1.ambient, k2.ambient),
      ambientIntensity: THREE.MathUtils.lerp(k1.ambientIntensity, k2.ambientIntensity, t),
      hemiSkyColor: lerpColor(k1.hemiSky, k2.hemiSky),
      hemiGroundColor: lerpColor(k1.hemiGround, k2.hemiGround),
      hemiIntensity: THREE.MathUtils.lerp(k1.hemiIntensity, k2.hemiIntensity, t),
      waterBaseColor: lerpColor(k1.waterBase, k2.waterBase),
      waterReflectionColor: lerpColor(k1.waterReflection, k2.waterReflection),
      waterSunHighlightColor: lerpColor(k1.waterSunHighlight, k2.waterSunHighlight),
      waterSunHighlightIntensity: THREE.MathUtils.lerp(k1.waterSunIntensity, k2.waterSunIntensity, t),
      bridgeWarmIntensity: THREE.MathUtils.lerp(k1.bridgeWarm, k2.bridgeWarm, t),
      bridgeCyanIntensity: THREE.MathUtils.lerp(k1.bridgeCyan, k2.bridgeCyan, t),
      sunSphereColor: lerpColor(k1.sunSphereColor, k2.sunSphereColor),
      sunSphereIntensity: THREE.MathUtils.lerp(k1.sunSphereIntensity, k2.sunSphereIntensity, t),
    }
  }
}
