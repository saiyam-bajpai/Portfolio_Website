import * as THREE from 'three'
import type { TimeOfDayEnvironment } from './TimeOfDaySystem'

/**
 * Procedural Assets & Geometries for the Continuous Cinematic Waterfront Journey
 *
 * PHASE 6 — CINEMATIC CAMERA SYSTEM, DRIVER POV & SCENE-AWARE PORTFOLIO DESIGN
 *
 * Features:
 * 1. Warm, Radiant Celestial Sun & Moon:
 *    - Self-luminous celestial sun with warm ivory-yellow center disc, golden-amber outer tint, and soft atmospheric corona.
 *    - Completely eliminates metallic grey or desaturated tone-mapping artifacts.
 *    - Moon rises from same horizon region, casting cool silver-blue sheen onto water and bridge.
 * 2. Synchronized Car Entrance:
 *    - Opening scene (p < 0.10): establishes sun, horizon, and bay water; car is hidden.
 *    - As bridge track emerges (p = 0.10 - 0.18), car appears in distance and smoothly drifts forward onto the approach ramp, locking into lane alignment.
 * 3. Slim Architectural Wayfinding Signs (Replacing Large X Elements):
 *    - Prominent crude X-braces replaced with horizontal structural members and illuminated rectangular wayfinding plaques:
 *      Tower 1: "SYSTEMS & VISION" // PERCEPTION & EXPLAINABILITY // WAYPOINT 01 // KM 0.38
 *      Tower 2: "DETERMINISTIC SYSTEMS" // SAFETY ARCHITECTURE & APIS // WAYPOINT 02 // KM 0.74
 *    - Checkpoint waypoints equipped with slim overhead gantry plaques.
 * 4. Driver's-Eye POV Interior/Cockpit Integration:
 *    - Cockpit lower cowl / dashboard silhouette visible during the dedicated first-person driving sequence.
 * 5. Detailed Procedural City Skyline:
 *    - Multi-tier setbacks, architectural fin mullions, rooftop mechanical bulkheads, water tanks, and radio masts with blinking beacons.
 *    - Central corridor (|X| < 8.0) kept calm and dark behind the single-line "SAIYAM BAJPAI" footer typography.
 */

// Deterministic Seeded Pseudo-Random Number Generator (Mulberry32)
function createSeededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Generates warm, self-luminous sun radial disc texture
function createSunRadialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const cx = 256
    const cy = 256
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256)
    grad.addColorStop(0.0, '#ffffff')
    grad.addColorStop(0.18, '#fffdf0')
    grad.addColorStop(0.42, '#fef08a') // warm ivory-yellow core
    grad.addColorStop(0.70, '#f59e0b') // golden amber
    grad.addColorStop(0.90, '#ea580c') // sunset orange outer tint
    grad.addColorStop(1.0, 'rgba(217, 119, 6, 0.0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

// Generates soft atmospheric corona halo texture
function createCoronaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const cx = 256
    const cy = 256
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256)
    grad.addColorStop(0.0, 'rgba(254, 215, 170, 0.85)')
    grad.addColorStop(0.28, 'rgba(249, 115, 22, 0.45)')
    grad.addColorStop(0.62, 'rgba(234, 88, 12, 0.15)')
    grad.addColorStop(1.0, 'rgba(194, 65, 12, 0.0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

// Generates luminous lunar disc texture with realistic maria and subtle craters
function createMoonDiscTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const cx = 256
    const cy = 256
    const radius = 236

    // 1. Base lunar surface with soft limb-darkening
    const baseGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
    baseGrad.addColorStop(0.0, '#ffffff')
    baseGrad.addColorStop(0.45, '#f4f8fc')
    baseGrad.addColorStop(0.78, '#e2edf6')
    baseGrad.addColorStop(0.92, '#cadbe8')
    baseGrad.addColorStop(1.0, '#9bb2c6')

    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.clip()

    ctx.fillStyle = baseGrad
    ctx.fillRect(0, 0, 512, 512)

    // 2. Realistic Lunar Maria (dark basalt plains: Oceanus Procellarum, Mare Imbrium, Mare Serenitatis)
    const maria = [
      { x: 195, y: 190, rx: 65, ry: 50, rot: -0.2, alpha: 0.28 },
      { x: 230, y: 165, rx: 45, ry: 38, rot: 0.15, alpha: 0.25 },
      { x: 310, y: 195, rx: 38, ry: 34, rot: 0.1, alpha: 0.26 },
      { x: 335, y: 245, rx: 42, ry: 32, rot: -0.3, alpha: 0.24 },
      { x: 375, y: 270, rx: 28, ry: 24, rot: 0.05, alpha: 0.22 },
      { x: 385, y: 190, rx: 22, ry: 18, rot: 0.3, alpha: 0.32 },
      { x: 205, y: 295, rx: 36, ry: 30, rot: -0.15, alpha: 0.25 },
      { x: 165, y: 310, rx: 24, ry: 20, rot: 0.2, alpha: 0.22 },
      { x: 270, y: 320, rx: 32, ry: 25, rot: 0.0, alpha: 0.18 },
    ]

    maria.forEach((m) => {
      ctx.save()
      ctx.translate(m.x, m.y)
      ctx.rotate(m.rot)
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(m.rx, m.ry))
      grad.addColorStop(0.0, `rgba(132, 155, 178, ${m.alpha * 1.2})`)
      grad.addColorStop(0.55, `rgba(148, 170, 192, ${m.alpha * 0.9})`)
      grad.addColorStop(0.85, `rgba(168, 188, 206, ${m.alpha * 0.35})`)
      grad.addColorStop(1.0, 'rgba(200, 218, 232, 0.0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, m.rx, m.ry, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // 3. Subtle crater ray highlights (Tycho ray structure in south)
    ctx.save()
    const rayCenter = { x: 255, y: 385 }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
    ctx.lineWidth = 1.5
    for (let angle = -0.8; angle <= 0.8; angle += 0.22) {
      ctx.beginPath()
      ctx.moveTo(rayCenter.x, rayCenter.y)
      const len = 90 + Math.sin(angle * 7) * 35
      ctx.lineTo(rayCenter.x + Math.sin(angle) * len, rayCenter.y - Math.cos(angle) * len)
      ctx.stroke()
    }
    const tychoGrad = ctx.createRadialGradient(rayCenter.x, rayCenter.y, 0, rayCenter.x, rayCenter.y, 14)
    tychoGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.75)')
    tychoGrad.addColorStop(0.4, 'rgba(240, 248, 255, 0.35)')
    tychoGrad.addColorStop(1.0, 'rgba(220, 235, 248, 0.0)')
    ctx.fillStyle = tychoGrad
    ctx.beginPath()
    ctx.arc(rayCenter.x, rayCenter.y, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // 4. Subtle cool outer limb highlight
    const rimGrad = ctx.createRadialGradient(cx, cy, radius - 16, cx, cy, radius)
    rimGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.0)')
    rimGrad.addColorStop(0.65, 'rgba(240, 248, 255, 0.25)')
    rimGrad.addColorStop(1.0, 'rgba(210, 230, 248, 0.65)')
    ctx.fillStyle = rimGrad
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

// Generates soft atmospheric moon corona halo texture
function createMoonCoronaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const cx = 256
    const cy = 256
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256)
    grad.addColorStop(0.0, 'rgba(240, 248, 255, 0.85)')
    grad.addColorStop(0.18, 'rgba(224, 242, 254, 0.50)')
    grad.addColorStop(0.45, 'rgba(186, 230, 253, 0.20)')
    grad.addColorStop(0.75, 'rgba(125, 211, 252, 0.06)')
    grad.addColorStop(1.0, 'rgba(14, 165, 233, 0.0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

// Generates crisp architectural wayfinding sign textures with emissive map
function createWayfindingSignTexture(
  title: string,
  subtitle: string,
  code: string,
  isCyan: boolean = true
): { map: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 160
  const ctx = canvas.getContext('2d')

  const emCanvas = document.createElement('canvas')
  emCanvas.width = 512
  emCanvas.height = 160
  const emCtx = emCanvas.getContext('2d')

  if (ctx && emCtx) {
    // 1. Dark structural plate
    ctx.fillStyle = '#080d15'
    ctx.fillRect(0, 0, 512, 160)
    emCtx.fillStyle = '#000000'
    emCtx.fillRect(0, 0, 512, 160)

    // 2. Fine boundary outline
    const borderColor = isCyan ? '#38bdf8' : '#e2e8f0'
    ctx.strokeStyle = borderColor
    ctx.lineWidth = 4
    ctx.strokeRect(6, 6, 500, 148)

    emCtx.strokeStyle = borderColor
    emCtx.lineWidth = 3
    emCtx.strokeRect(6, 6, 500, 148)

    // Corner optical register marks
    ctx.fillStyle = borderColor
    ctx.fillRect(6, 6, 12, 12)
    ctx.fillRect(494, 6, 12, 12)
    ctx.fillRect(6, 142, 12, 12)
    ctx.fillRect(494, 142, 12, 12)

    // Code Tag
    ctx.font = '600 17px monospace'
    ctx.fillStyle = isCyan ? '#7dd3fc' : '#cbd5e1'
    ctx.fillText(code, 28, 38)
    emCtx.font = '600 17px monospace'
    emCtx.fillStyle = isCyan ? '#38bdf8' : '#94a3b8'
    emCtx.fillText(code, 28, 38)

    // Main Title
    ctx.font = 'bold 34px monospace'
    ctx.fillStyle = '#f8fafc'
    ctx.fillText(title, 28, 88)
    emCtx.font = 'bold 34px monospace'
    emCtx.fillStyle = '#e2e8f0'
    emCtx.fillText(title, 28, 88)

    // Subtitle Telemetry
    ctx.font = '500 17px monospace'
    ctx.fillStyle = isCyan ? '#38bdf8' : '#a1a1aa'
    ctx.fillText(subtitle, 28, 126)
    emCtx.font = '500 17px monospace'
    emCtx.fillStyle = isCyan ? '#0284c7' : '#71717a'
    emCtx.fillText(subtitle, 28, 126)
  }

  const map = new THREE.CanvasTexture(canvas)
  const emissiveMap = new THREE.CanvasTexture(emCanvas)
  return { map, emissiveMap }
}

// Generates procedural skyscraper facade texture with architectural mullions and selective warm windows
function createSkyscraperFacadeTexture(isNear: boolean): { map: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  const emissiveCanvas = document.createElement('canvas')
  emissiveCanvas.width = 512
  emissiveCanvas.height = 512
  const emCtx = emissiveCanvas.getContext('2d')

  if (ctx && emCtx) {
    ctx.fillStyle = isNear ? '#0c121a' : '#080d14'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    emCtx.fillStyle = '#000000'
    emCtx.fillRect(0, 0, emissiveCanvas.width, emissiveCanvas.height)

    const cols = isNear ? 8 : 6
    const rows = isNear ? 16 : 12
    const padX = canvas.width / cols
    const padY = canvas.height / rows
    const winW = padX * 0.72
    const winH = padY * 0.58

    const rng = createSeededRandom(isNear ? 83921 : 19482)

    // Vertical structural mullions
    ctx.strokeStyle = '#151e2c'
    ctx.lineWidth = 2
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath()
      ctx.moveTo(c * padX, 0)
      ctx.lineTo(c * padX, canvas.height)
      ctx.stroke()
    }

    // Horizontal spandrel floor bands
    ctx.strokeStyle = '#0f1722'
    ctx.lineWidth = 3
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath()
      ctx.moveTo(0, r * padY)
      ctx.lineTo(canvas.width, r * padY)
      ctx.stroke()
    }

    // Window distribution
    for (let r = 0; r < rows; r++) {
      const floorActive = rng() > 0.35
      for (let c = 0; c < cols; c++) {
        const x = c * padX + (padX - winW) * 0.5
        const y = r * padY + (padY - winH) * 0.5
        const rand = rng()

        if (floorActive && rand < 0.12) {
          const warmTones = ['#fef3c7', '#fde68a', '#fef9c3', '#fed7aa']
          const tone = warmTones[Math.floor(rng() * warmTones.length)]
          ctx.fillStyle = tone
          ctx.fillRect(x, y, winW, winH)

          emCtx.fillStyle = tone
          emCtx.fillRect(x, y, winW, winH)
        } else if (floorActive && rand < 0.16) {
          ctx.fillStyle = '#bae6fd'
          ctx.fillRect(x, y, winW, winH)

          emCtx.fillStyle = '#7dd3fc'
          emCtx.fillRect(x, y, winW, winH)
        } else {
          ctx.fillStyle = isNear ? '#060a10' : '#04070c'
          ctx.fillRect(x, y, winW, winH)
        }
      }
    }
  }

  const map = new THREE.CanvasTexture(canvas)
  map.wrapS = THREE.ClampToEdgeWrapping
  map.wrapT = THREE.ClampToEdgeWrapping

  const emissiveMap = new THREE.CanvasTexture(emissiveCanvas)
  emissiveMap.wrapS = THREE.ClampToEdgeWrapping
  emissiveMap.wrapT = THREE.ClampToEdgeWrapping

  return { map, emissiveMap }
}

export class ProceduralSceneManager {
  public rootGroup: THREE.Group
  public sunGroup: THREE.Group
  public moonGroup: THREE.Group
  public carGroup: THREE.Group
  public trackGroup: THREE.Group
  public bridgeGroup: THREE.Group
  public cityGroup: THREE.Group
  public checkpointsGroup: THREE.Group
  public arrivalApronGroup: THREE.Group
  public particlesGroup: THREE.Points

  // Dynamic lights
  public sunLight: THREE.PointLight
  public moonLight: THREE.PointLight
  public carCoreLight: THREE.PointLight
  public carHeadlightLeft: THREE.SpotLight
  public carHeadlightRight: THREE.SpotLight
  public towerSpotlights: THREE.SpotLight[] = []

  // Materials & Textures
  private sunRadialTexture: THREE.CanvasTexture
  private coronaTexture: THREE.CanvasTexture
  private moonTexture: THREE.CanvasTexture
  private moonCoronaTexture: THREE.CanvasTexture
  private sunMaterial: THREE.MeshBasicMaterial
  private sunCoronaMaterial: THREE.MeshBasicMaterial
  private moonMaterial: THREE.MeshBasicMaterial
  private moonCoronaMaterial: THREE.MeshBasicMaterial
  private carChassisMaterial: THREE.MeshStandardMaterial
  private carCanopyMaterial: THREE.MeshStandardMaterial
  private carCyanEmissiveMaterial: THREE.MeshBasicMaterial
  private trackGuideMaterial: THREE.MeshBasicMaterial
  private trackDeckMaterial: THREE.MeshStandardMaterial
  private bridgePylonMaterial: THREE.MeshStandardMaterial
  private bridgeTrussMaterial: THREE.MeshStandardMaterial
  private bridgeCableMaterial: THREE.MeshStandardMaterial
  private caissonMaterial: THREE.MeshStandardMaterial
  private nearBuildingMaterial: THREE.MeshStandardMaterial
  private midBuildingMaterial: THREE.MeshStandardMaterial
  private farBuildingMaterial: THREE.MeshStandardMaterial
  private windowEmissiveMaterial: THREE.MeshBasicMaterial

  private nearFacadeTextures: { map: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture }
  private midFacadeTextures: { map: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture }
  private signTexturesToDispose: THREE.CanvasTexture[] = []

  // Structure arrays
  private bridgeTowers: THREE.Group[] = []
  private anchoragePiers: THREE.Group[] = []
  private mainCablesGroup: THREE.Group

  // Road trajectory spline (continuous path across all scenes)
  public roadSpline: THREE.CatmullRomCurve3

  // Geometry dimensions
  public readonly roadWidth = 2.8
  public readonly cableHalfWidth = 2.15
  public readonly tower1Z = -38.0
  public readonly tower2Z = -74.0
  public readonly saddleHeight = 11.85
  public readonly northAnchorZ = -10.0
  public readonly southAnchorZ = -102.0

  constructor() {
    this.rootGroup = new THREE.Group()
    this.sunGroup = new THREE.Group()
    this.moonGroup = new THREE.Group()
    this.carGroup = new THREE.Group()
    this.trackGroup = new THREE.Group()
    this.bridgeGroup = new THREE.Group()
    this.cityGroup = new THREE.Group()
    this.checkpointsGroup = new THREE.Group()
    this.arrivalApronGroup = new THREE.Group()
    this.mainCablesGroup = new THREE.Group()

    // 1. Continuous Engineered Road Spline from Bridge Approach through City Avenue (Z = 8.0 to -225.0)
    const splinePoints = [
      new THREE.Vector3(0, 0.0, 8.0),
      new THREE.Vector3(0, 0.0, 0.0),
      new THREE.Vector3(0, 0.14, -12.0),
      new THREE.Vector3(0, 0.32, -38.0), // Tower 1
      new THREE.Vector3(0, 0.38, -56.0), // Mid-span apex
      new THREE.Vector3(0, 0.32, -74.0), // Tower 2
      new THREE.Vector3(0, 0.14, -100.0),
      new THREE.Vector3(0, 0.06, -116.0),
      new THREE.Vector3(0, 0.06, -135.0),
      new THREE.Vector3(0.3, 0.06, -152.0),
      new THREE.Vector3(1.6, 0.06, -172.0),
      new THREE.Vector3(5.2, 0.06, -196.0),
      new THREE.Vector3(11.5, 0.06, -225.0),
    ]
    this.roadSpline = new THREE.CatmullRomCurve3(splinePoints, false, 'catmullrom', 0.15)

    // 2. Textures & Materials
    this.sunRadialTexture = createSunRadialTexture()
    this.coronaTexture = createCoronaTexture()
    this.nearFacadeTextures = createSkyscraperFacadeTexture(true)
    this.midFacadeTextures = createSkyscraperFacadeTexture(false)
    this.moonTexture = createMoonDiscTexture()
    this.moonCoronaTexture = createMoonCoronaTexture()

    // Self-luminous celestial sun materials
    this.sunMaterial = new THREE.MeshBasicMaterial({
      map: this.sunRadialTexture,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
      fog: false,
    })

    this.sunCoronaMaterial = new THREE.MeshBasicMaterial({
      map: this.coronaTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      fog: false,
    })

    // Luminous lunar disc and atmospheric corona materials
    this.moonMaterial = new THREE.MeshBasicMaterial({
      map: this.moonTexture,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
      fog: false,
    })

    this.moonCoronaMaterial = new THREE.MeshBasicMaterial({
      map: this.moonCoronaTexture,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      fog: false,
    })

    this.carChassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x18202c,
      emissive: 0x09121c,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.4,
    })

    this.carCanopyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1420,
      emissive: 0x061422,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.65,
      side: THREE.FrontSide, // Crucial for driver POV: interior forward view is completely clear
    })

    this.carCyanEmissiveMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    })

    this.trackGuideMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
    })

    this.trackDeckMaterial = new THREE.MeshStandardMaterial({
      color: 0x141822,
      emissive: 0x060910,
      emissiveIntensity: 0.2,
      roughness: 0.78,
      metalness: 0.15,
    })

    this.bridgePylonMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e2533,
      emissive: 0x0f1520,
      emissiveIntensity: 0.3,
      roughness: 0.52,
      metalness: 0.35,
    })

    this.bridgeTrussMaterial = new THREE.MeshStandardMaterial({
      color: 0x181f2b,
      emissive: 0x0a0f18,
      emissiveIntensity: 0.22,
      roughness: 0.6,
      metalness: 0.35,
    })

    this.bridgeCableMaterial = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.5,
      roughness: 0.32,
      metalness: 0.7,
    })

    this.caissonMaterial = new THREE.MeshStandardMaterial({
      color: 0x171d26,
      roughness: 0.88,
      metalness: 0.1,
    })

    // Skyscraper Layer Materials
    this.nearBuildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2230,
      map: this.nearFacadeTextures.map,
      emissive: 0xfffbeb,
      emissiveMap: this.nearFacadeTextures.emissiveMap,
      emissiveIntensity: 0.4,
      roughness: 0.55,
      metalness: 0.35,
    })

    this.midBuildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x121824,
      map: this.midFacadeTextures.map,
      emissive: 0xfef3c7,
      emissiveMap: this.midFacadeTextures.emissiveMap,
      emissiveIntensity: 0.35,
      roughness: 0.7,
      metalness: 0.25,
    })

    this.farBuildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1220,
      roughness: 0.9,
      metalness: 0.15,
    })

    this.windowEmissiveMaterial = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
    })

    // Dynamic Scene Lights
    this.sunLight = new THREE.PointLight(0xffb366, 3.2, 90, 1.4)
    this.moonLight = new THREE.PointLight(0xe0effe, 0.0, 75, 1.4)
    this.carCoreLight = new THREE.PointLight(0x38bdf8, 1.2, 10, 1.8)
    this.carHeadlightLeft = new THREE.SpotLight(0xa5f3fc, 0.4, 38, Math.PI / 7, 0.3, 1.2)
    this.carHeadlightRight = new THREE.SpotLight(0xa5f3fc, 0.4, 38, Math.PI / 7, 0.3, 1.2)

    // Build Components
    this.buildCelestialBodies()
    this.buildTrack()
    this.buildBridge()
    this.buildCheckpoints()
    this.buildFuturisticCar()
    this.buildCitySkyline()
    this.buildCityBoulevardAndArrival()
    this.particlesGroup = this.buildAtmosphericParticles()

    // Assemble Root Group
    this.rootGroup.add(this.trackGroup)
    this.rootGroup.add(this.bridgeGroup)
    this.rootGroup.add(this.mainCablesGroup)
    this.rootGroup.add(this.checkpointsGroup)
    this.rootGroup.add(this.arrivalApronGroup)
    this.rootGroup.add(this.cityGroup)
    this.rootGroup.add(this.sunGroup)
    this.rootGroup.add(this.moonGroup)
    this.rootGroup.add(this.carGroup)
    this.rootGroup.add(this.particlesGroup)
    this.towerSpotlights.forEach((spot) => {
      this.rootGroup.add(spot)
      this.rootGroup.add(spot.target)
    })
  }

  public getCableElevation(z: number): number {
    const yAnchor = 0.35
    const ySaddle = this.saddleHeight
    const yMidSag = 2.15

    if (z > this.northAnchorZ) {
      return yAnchor
    }

    if (z >= this.tower1Z) {
      const t = (z - this.northAnchorZ) / (this.tower1Z - this.northAnchorZ)
      return yAnchor + (ySaddle - yAnchor) * (t - 0.05 * Math.sin(Math.PI * t))
    }

    if (z >= this.tower2Z) {
      const midZ = (this.tower1Z + this.tower2Z) * 0.5
      const halfSpan = (this.tower1Z - this.tower2Z) * 0.5
      const normDist = (z - midZ) / halfSpan
      return yMidSag + (ySaddle - yMidSag) * (normDist * normDist)
    }

    if (z >= this.southAnchorZ) {
      const t = (z - this.tower2Z) / (this.southAnchorZ - this.tower2Z)
      return ySaddle + (yAnchor - ySaddle) * (t + 0.05 * Math.sin(Math.PI * t))
    }

    return yAnchor
  }

  public getDeckElevation(z: number): number {
    const clampedZ = Math.max(-225.0, Math.min(8.0, z))
    const totalDist = 8.0 - -225.0
    const u = (8.0 - clampedZ) / totalDist
    return this.roadSpline.getPointAt(Math.max(0, Math.min(1, u))).y + 0.07
  }

  /**
   * 1. Celestial Bodies: Radiant Warm Sun & Rising Moon
   */
  private buildCelestialBodies() {
    // 1A. Celestial Sun
    const sunCoreGeo = new THREE.PlaneGeometry(16.0, 16.0)
    const sunCore = new THREE.Mesh(sunCoreGeo, this.sunMaterial)

    const sunCoronaGeo = new THREE.PlaneGeometry(28.0, 28.0)
    const sunCorona = new THREE.Mesh(sunCoronaGeo, this.sunCoronaMaterial)
    sunCorona.position.set(0, 0, -0.2)

    this.sunGroup.add(sunCore, sunCorona, this.sunLight)
    this.sunGroup.position.set(-32.0, 22.0, -260.0)

    // 1B. Celestial Moon (Aligned with visual center of composition behind skyline)
    const moonCoreGeo = new THREE.PlaneGeometry(16.0, 16.0)
    const moonCore = new THREE.Mesh(moonCoreGeo, this.moonMaterial)

    const moonCoronaGeo = new THREE.PlaneGeometry(38.0, 38.0)
    const moonCorona = new THREE.Mesh(moonCoronaGeo, this.moonCoronaMaterial)
    moonCorona.position.set(0, 0, -0.1)

    this.moonGroup.add(moonCore, moonCorona, this.moonLight)
    this.moonGroup.position.set(0.0, -14.0, -285.0)
    this.moonGroup.visible = false
  }

  /**
   * 2. Emerging Continuous Road Track
   * 
   * Single unified road deck spanning from the bridge south approach (Z = 8.0)
   * all the way across the suspension bridge and through the city avenue (Z = -225.0).
   * Guarantees 100% geometric and visual continuity:
   * - Identical width (2.8m)
   * - Identical asphalt material
   * - Continuous uninterrupted cyan guide rails
   * - Centerline glowing dashed lane markers
   */
  private buildTrack() {
    const segmentLength = 1.5
    const totalLength = 233.0
    const count = Math.floor(totalLength / segmentLength)

    for (let i = 0; i < count; i++) {
      const u1 = i / count
      const u2 = (i + 1) / count
      const p1 = this.roadSpline.getPointAt(u1)
      const p2 = this.roadSpline.getPointAt(u2)
      const tangent = this.roadSpline.getTangentAt(u1).normalize()

      const segGroup = new THREE.Group()

      // Asphalt Road Deck Slab (Same exact dimensions and material throughout)
      const segGeo = new THREE.BoxGeometry(this.roadWidth, 0.14, segmentLength * 0.995)
      const deckMesh = new THREE.Mesh(segGeo, this.trackDeckMaterial)
      deckMesh.castShadow = true
      deckMesh.receiveShadow = true
      segGroup.add(deckMesh)

      // Dual Continuous Luminous Cyan Edge Guide Rails
      const railGeo = new THREE.BoxGeometry(0.06, 0.1, segmentLength * 0.995)
      const leftRail = new THREE.Mesh(railGeo, this.trackGuideMaterial)
      leftRail.position.set(-this.roadWidth * 0.5 + 0.04, 0.08, 0)

      const rightRail = new THREE.Mesh(railGeo, this.trackGuideMaterial)
      rightRail.position.set(this.roadWidth * 0.5 - 0.04, 0.08, 0)
      segGroup.add(leftRail, rightRail)

      // Outer Safety Barrier Stanchions
      const barrierGeo = new THREE.BoxGeometry(0.05, 0.28, segmentLength * 0.995)
      const barrierL = new THREE.Mesh(barrierGeo, this.bridgeTrussMaterial)
      barrierL.position.set(-this.roadWidth * 0.5 - 0.06, 0.18, 0)

      const barrierR = new THREE.Mesh(barrierGeo, this.bridgeTrussMaterial)
      barrierR.position.set(this.roadWidth * 0.5 + 0.06, 0.18, 0)
      segGroup.add(barrierL, barrierR)

      // Centerline Glowing Dashed Road Markers
      if (i % 2 === 0) {
        const dashGeo = new THREE.PlaneGeometry(0.08, segmentLength * 0.55)
        const dashMat = new THREE.MeshBasicMaterial({
          color: 0x7dd3fc,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
        })
        const dash = new THREE.Mesh(dashGeo, dashMat)
        dash.rotation.x = -Math.PI / 2
        dash.position.set(0, 0.076, 0)
        segGroup.add(dash)
      }

      // Transverse Expansion Joints (Bridge span)
      const midZ = (p1.z + p2.z) * 0.5
      if (i % 10 === 0 && midZ > -110.0 && midZ < 2.0) {
        const jointGeo = new THREE.BoxGeometry(this.roadWidth * 1.04, 0.02, 0.1)
        const jointMat = new THREE.MeshStandardMaterial({
          color: 0x334155,
          metalness: 0.8,
          roughness: 0.35,
        })
        const joint = new THREE.Mesh(jointGeo, jointMat)
        joint.position.set(0, 0.077, 0)
        segGroup.add(joint)
      }

      // Under-Deck Stiffening Steel Warren Truss Chords (Bridge span over water)
      if (midZ > -112.0) {
        const trussBeamGeo = new THREE.BoxGeometry(0.12, 0.32, segmentLength * 0.995)
        const trussL = new THREE.Mesh(trussBeamGeo, this.bridgeTrussMaterial)
        trussL.position.set(-this.roadWidth * 0.46, -0.22, 0)
        const trussR = new THREE.Mesh(trussBeamGeo, this.bridgeTrussMaterial)
        trussR.position.set(this.roadWidth * 0.46, -0.22, 0)

        const floorBeamGeo = new THREE.BoxGeometry(this.roadWidth * 0.94, 0.12, 0.14)
        const floorBeam = new THREE.Mesh(floorBeamGeo, this.bridgeTrussMaterial)
        floorBeam.position.set(0, -0.32, 0)
        segGroup.add(trussL, trussR, floorBeam)
      }

      // Approach Pilings and Water Footings outside main suspension span
      if (i % 3 === 0 && (midZ > -10.0 || (midZ < -102.0 && midZ > -122.0))) {
        const pillarGeo = new THREE.CylinderGeometry(0.14, 0.18, 2.8, 12)
        const pillar = new THREE.Mesh(pillarGeo, this.bridgeTrussMaterial)
        pillar.position.set(0, -1.35, 0)
        segGroup.add(pillar)

        const caissonGeo = new THREE.BoxGeometry(1.6, 1.4, 1.6)
        const caisson = new THREE.Mesh(caissonGeo, this.caissonMaterial)
        caisson.position.set(0, -2.3, 0)
        segGroup.add(caisson)
      }

      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)
      segGroup.position.copy(midPoint)
      segGroup.lookAt(midPoint.clone().add(tangent))

      segGroup.userData = {
        baseY: midPoint.y,
        emergeProgress: Math.min(0.40, u1 * 0.38 + 0.1),
        u: u1,
      }

      this.trackGroup.add(segGroup)
    }
  }

  /**
   * 3. Suspension Bridge Infrastructure with Architectural Wayfinding Signs
   */
  private buildBridge() {
    const towerZPositions = [this.tower1Z, this.tower2Z]

    towerZPositions.forEach((towerZ, tIdx) => {
      const towerGroup = new THREE.Group()
      const towerHeight = 13.5
      const towerWidth = 4.8

      // Caisson footings
      const caissonGeo = new THREE.BoxGeometry(1.6, 2.4, 2.6)
      const caissonL = new THREE.Mesh(caissonGeo, this.caissonMaterial)
      caissonL.position.set(-this.cableHalfWidth, -0.85, 0)
      const caissonR = new THREE.Mesh(caissonGeo, this.caissonMaterial)
      caissonR.position.set(this.cableHalfWidth, -0.85, 0)
      towerGroup.add(caissonL, caissonR)

      // Vertical Columns
      const pylonGeo = new THREE.BoxGeometry(0.48, towerHeight, 0.65)
      const leftPylon = new THREE.Mesh(pylonGeo, this.bridgePylonMaterial)
      leftPylon.position.set(-this.cableHalfWidth, towerHeight * 0.5, 0)

      const rightPylon = new THREE.Mesh(pylonGeo, this.bridgePylonMaterial)
      rightPylon.position.set(this.cableHalfWidth, towerHeight * 0.5, 0)

      // Sub-deck Floor Support Beam
      const subDeckBeamGeo = new THREE.BoxGeometry(towerWidth, 0.35, 0.55)
      const subDeckBeam = new THREE.Mesh(subDeckBeamGeo, this.bridgePylonMaterial)
      subDeckBeam.position.set(0, -0.15, 0)

      // Portal Arch Beam (clearing road vehicular headroom at y = 3.6m)
      const portalBeamGeo = new THREE.BoxGeometry(towerWidth, 0.36, 0.48)
      const portalBeam = new THREE.Mesh(portalBeamGeo, this.bridgePylonMaterial)
      portalBeam.position.set(0, 3.6, 0)

      // Mid-Tower Crossbeam at y = 7.2m
      const midBeamGeo = new THREE.BoxGeometry(towerWidth, 0.3, 0.42)
      const midBeam = new THREE.Mesh(midBeamGeo, this.bridgePylonMaterial)
      midBeam.position.set(0, 7.2, 0)

      // REPLACED LARGE X ELEMENTS:
      // Horizontal structural struts and slim, illuminated architectural wayfinding sign plaque
      const strutLowerGeo = new THREE.BoxGeometry(towerWidth - 0.35, 0.18, 0.32)
      const strutLower = new THREE.Mesh(strutLowerGeo, this.bridgePylonMaterial)
      strutLower.position.set(0, 4.5, 0)

      const strutUpperGeo = new THREE.BoxGeometry(towerWidth - 0.35, 0.18, 0.32)
      const strutUpper = new THREE.Mesh(strutUpperGeo, this.bridgePylonMaterial)
      strutUpper.position.set(0, 6.3, 0)

      const plaqueWidth = 3.4
      const plaqueHeight = 0.95
      const plaqueThickness = 0.08
      const signPlaqueGeo = new THREE.BoxGeometry(plaqueWidth, plaqueHeight, plaqueThickness)

      const isSouthTower = tIdx === 0
      const signData = isSouthTower
        ? {
            title: 'SYSTEMS & VISION',
            subtitle: 'PERCEPTION // EXPLAINABILITY',
            code: 'WAYPOINT 01 // KM 0.38',
          }
        : {
            title: 'DETERMINISTIC SYSTEMS',
            subtitle: 'SAFETY ARCHITECTURE // APIS',
            code: 'WAYPOINT 02 // KM 0.74',
          }

      const signTex = createWayfindingSignTexture(
        signData.title,
        signData.subtitle,
        signData.code,
        isSouthTower
      )
      this.signTexturesToDispose.push(signTex.map, signTex.emissiveMap)

      const signMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        map: signTex.map,
        emissive: isSouthTower ? 0x38bdf8 : 0x7dd3fc,
        emissiveMap: signTex.emissiveMap,
        emissiveIntensity: 0.65,
        roughness: 0.35,
        metalness: 0.5,
      })

      const signMesh = new THREE.Mesh(signPlaqueGeo, signMat)
      signMesh.position.set(0, 5.4, 0)
      signMesh.name = `towerSign_${tIdx}`

      // Mounting brackets
      const bracketGeo = new THREE.BoxGeometry(0.35, 0.12, 0.12)
      const bracketL = new THREE.Mesh(bracketGeo, this.bridgeTrussMaterial)
      bracketL.position.set(-plaqueWidth * 0.5 - 0.15, 5.4, 0)
      const bracketR = new THREE.Mesh(bracketGeo, this.bridgeTrussMaterial)
      bracketR.position.set(plaqueWidth * 0.5 + 0.15, 5.4, 0)

      // Upper Crown Beam
      const crownBeamGeo = new THREE.BoxGeometry(towerWidth + 0.35, 0.45, 0.55)
      const crownBeam = new THREE.Mesh(crownBeamGeo, this.bridgePylonMaterial)
      crownBeam.position.set(0, 11.5, 0)

      // Cable Saddle Housings
      const saddleGeo = new THREE.BoxGeometry(0.55, 0.35, 0.85)
      const saddleL = new THREE.Mesh(saddleGeo, this.bridgeTrussMaterial)
      saddleL.position.set(-this.cableHalfWidth, this.saddleHeight, 0)
      const saddleR = new THREE.Mesh(saddleGeo, this.bridgeTrussMaterial)
      saddleR.position.set(this.cableHalfWidth, this.saddleHeight, 0)

      // Spires & Warning Beacons
      const spireGeo = new THREE.CylinderGeometry(0.04, 0.1, 1.2, 8)
      const spireL = new THREE.Mesh(spireGeo, this.bridgePylonMaterial)
      spireL.position.set(-this.cableHalfWidth, towerHeight + 0.6, 0)
      const spireR = new THREE.Mesh(spireGeo, this.bridgePylonMaterial)
      spireR.position.set(this.cableHalfWidth, towerHeight + 0.6, 0)

      const beaconGeo = new THREE.SphereGeometry(0.16, 16, 16)
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      const beaconL = new THREE.Mesh(beaconGeo, beaconMat)
      beaconL.position.set(-this.cableHalfWidth, towerHeight + 1.25, 0)
      beaconL.name = 'towerBeacon'
      const beaconR = new THREE.Mesh(beaconGeo, beaconMat)
      beaconR.position.set(this.cableHalfWidth, towerHeight + 1.25, 0)
      beaconR.name = 'towerBeacon'

      towerGroup.add(
        caissonL,
        caissonR,
        leftPylon,
        rightPylon,
        subDeckBeam,
        portalBeam,
        strutLower,
        strutUpper,
        signMesh,
        bracketL,
        bracketR,
        midBeam,
        crownBeam,
        saddleL,
        saddleR,
        spireL,
        spireR,
        beaconL,
        beaconR
      )

      towerGroup.position.set(0, 0, towerZ)
      this.bridgeTowers.push(towerGroup)
      this.bridgeGroup.add(towerGroup)

      // Tower Floodlights
      const towerSpotL = new THREE.SpotLight(0xf5a65b, 1.4, 24, Math.PI / 6, 0.4, 1.2)
      towerSpotL.position.set(-this.cableHalfWidth - 0.5, 0.4, towerZ + 2.5)
      towerSpotL.target.position.set(-this.cableHalfWidth, 8.0, towerZ)
      towerSpotL.name = `towerSpot_${tIdx}_L`

      const towerSpotR = new THREE.SpotLight(0xf5a65b, 1.4, 24, Math.PI / 6, 0.4, 1.2)
      towerSpotR.position.set(this.cableHalfWidth + 0.5, 0.4, towerZ + 2.5)
      towerSpotR.target.position.set(this.cableHalfWidth, 8.0, towerZ)
      towerSpotR.name = `towerSpot_${tIdx}_R`

      this.towerSpotlights.push(towerSpotL, towerSpotR)
    })

    // Side Anchorage Piers
    const anchorZPositions = [this.northAnchorZ, this.southAnchorZ]
    anchorZPositions.forEach((anchorZ) => {
      const pierGroup = new THREE.Group()

      const pierGeo = new THREE.BoxGeometry(1.2, 2.2, 2.8)
      const pierL = new THREE.Mesh(pierGeo, this.caissonMaterial)
      pierL.position.set(-this.cableHalfWidth, -0.75, 0)

      const collarGeo = new THREE.BoxGeometry(0.48, 0.35, 0.75)
      const collarL = new THREE.Mesh(collarGeo, this.bridgeTrussMaterial)
      collarL.position.set(-this.cableHalfWidth, 0.35, 0)

      const pierR = new THREE.Mesh(pierGeo, this.caissonMaterial)
      pierR.position.set(this.cableHalfWidth, -0.75, 0)

      const collarR = new THREE.Mesh(collarGeo, this.bridgeTrussMaterial)
      collarR.position.set(this.cableHalfWidth, 0.35, 0)

      const sillGeo = new THREE.BoxGeometry(this.cableHalfWidth * 2.2, 0.3, 0.8)
      const sill = new THREE.Mesh(sillGeo, this.caissonMaterial)
      sill.position.set(0, -0.5, 0)

      pierGroup.add(pierL, collarL, pierR, collarR, sill)
      pierGroup.position.set(0, 0, anchorZ)
      this.anchoragePiers.push(pierGroup)
      this.bridgeGroup.add(pierGroup)
    })

    // Catenary Cables
    this.buildMainCatenaryCablesAndHangers()
  }

  /**
   * Continuous 3D Catenary Cables and Vertical Hangers
   */
  private buildMainCatenaryCablesAndHangers() {
    const sampleCount = 96
    const leftCablePoints: THREE.Vector3[] = []
    const rightCablePoints: THREE.Vector3[] = []

    for (let i = 0; i <= sampleCount; i++) {
      const t = i / sampleCount
      const z = THREE.MathUtils.lerp(this.northAnchorZ, this.southAnchorZ, t)
      const y = this.getCableElevation(z)

      leftCablePoints.push(new THREE.Vector3(-this.cableHalfWidth, y, z))
      rightCablePoints.push(new THREE.Vector3(this.cableHalfWidth, y, z))
    }

    const leftCurve = new THREE.CatmullRomCurve3(leftCablePoints, false, 'catmullrom', 0.1)
    const rightCurve = new THREE.CatmullRomCurve3(rightCablePoints, false, 'catmullrom', 0.1)

    const tubeGeoL = new THREE.TubeGeometry(leftCurve, 96, 0.045, 8, false)
    const tubeMeshL = new THREE.Mesh(tubeGeoL, this.bridgeCableMaterial)
    const tubeGeoR = new THREE.TubeGeometry(rightCurve, 96, 0.045, 8, false)
    const tubeMeshR = new THREE.Mesh(tubeGeoR, this.bridgeCableMaterial)
    this.mainCablesGroup.add(tubeMeshL, tubeMeshR)

    // Vertical Hangers
    const hangerInterval = 2.0
    const startZ = this.northAnchorZ - 2.0
    const endZ = this.southAnchorZ + 2.0
    const hangerCount = Math.floor((startZ - endZ) / hangerInterval)

    const hangerMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.25,
      metalness: 0.85,
      roughness: 0.28,
    })

    for (let i = 0; i <= hangerCount; i++) {
      const hz = startZ - i * hangerInterval

      if (Math.abs(hz - this.tower1Z) < 1.6 || Math.abs(hz - this.tower2Z) < 1.6) {
        continue
      }

      const cableY = this.getCableElevation(hz)
      const deckY = this.getDeckElevation(hz)

      const hangerHeight = cableY - deckY
      if (hangerHeight <= 0.2) continue

      const hangerGeo = new THREE.CylinderGeometry(0.012, 0.012, hangerHeight, 6)
      hangerGeo.translate(0, hangerHeight * 0.5, 0)

      const hangerL = new THREE.Mesh(hangerGeo, hangerMat)
      hangerL.position.set(-this.cableHalfWidth, deckY, hz)

      const hangerR = new THREE.Mesh(hangerGeo, hangerMat)
      hangerR.position.set(this.cableHalfWidth, deckY, hz)

      this.mainCablesGroup.add(hangerL, hangerR)
    }
  }

  /**
   * 4. Project Destination Checkpoints with Waypoint Signage
   */
  private buildCheckpoints() {
    const checkpoints = [
      { z: -46.0, code: 'CP-01', title: 'CV / ROADWATCH', sub: 'POTHOLE DETECTION // YOLOV8' },
      { z: -58.0, code: 'CP-02', title: 'XAI / FINCA', sub: 'CREDIT RISK // TREESHAP' },
      { z: -70.0, code: 'CP-03', title: 'ML / SASTI DAWAI', sub: 'PACKAGING ML // FAIL-CLOSED' },
      { z: -82.0, code: 'CP-04', title: 'HCI / GESTUREFLOW', sub: 'HAND TRACKING // MEDIAPIPE' },
      { z: -96.0, code: 'CP-05', title: 'APP / QUEUELESS', sub: 'QUEUE INTELLIGENCE // ML' },
    ]

    checkpoints.forEach((cp) => {
      const checkpointGroup = new THREE.Group()
      const gateWidth = 3.8
      const gateHeight = 4.2
      const deckY = this.getDeckElevation(cp.z)

      const postGeo = new THREE.BoxGeometry(0.1, gateHeight, 0.1)
      const postMat = new THREE.MeshStandardMaterial({
        color: 0x1b2330,
        emissive: 0x09141f,
        emissiveIntensity: 0.35,
        roughness: 0.45,
      })
      const postL = new THREE.Mesh(postGeo, postMat)
      postL.position.set(-gateWidth * 0.5, gateHeight * 0.5, 0)
      const postR = new THREE.Mesh(postGeo, postMat)
      postR.position.set(gateWidth * 0.5, gateHeight * 0.5, 0)

      const beaconGeo = new THREE.RingGeometry(0.12, 0.22, 16)
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
      })
      const beaconL = new THREE.Mesh(beaconGeo, beaconMat)
      beaconL.position.set(-gateWidth * 0.5, gateHeight - 0.2, 0)
      const beaconR = new THREE.Mesh(beaconGeo, beaconMat)
      beaconR.position.set(gateWidth * 0.5, gateHeight - 0.2, 0)

      const beamGeo = new THREE.BoxGeometry(gateWidth, 0.05, 0.05)
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
      })
      const beam = new THREE.Mesh(beamGeo, beamMat)
      beam.position.set(0, gateHeight, 0)

      // Wayfinding Sign Plate mounted on the checkpoint gantry
      const signTex = createWayfindingSignTexture(cp.title, cp.sub, cp.code, true)
      this.signTexturesToDispose.push(signTex.map, signTex.emissiveMap)

      const signGeo = new THREE.BoxGeometry(2.4, 0.65, 0.04)
      const signMat = new THREE.MeshStandardMaterial({
        color: 0x0d141e,
        map: signTex.map,
        emissive: 0x38bdf8,
        emissiveMap: signTex.emissiveMap,
        emissiveIntensity: 0.7,
        roughness: 0.4,
      })
      const signMesh = new THREE.Mesh(signGeo, signMat)
      signMesh.position.set(0, gateHeight - 0.38, 0)

      checkpointGroup.add(postL, postR, beaconL, beaconR, beam, signMesh)
      checkpointGroup.position.set(0, deckY, cp.z)
      this.checkpointsGroup.add(checkpointGroup)
    })
  }

  /**
   * 5. Minimal Futuristic Aerodynamic Car with Cockpit Interior
   */
  private buildFuturisticCar() {
    const bodyGeo = new THREE.BoxGeometry(1.25, 0.28, 2.8)
    const bodyMesh = new THREE.Mesh(bodyGeo, this.carChassisMaterial)
    bodyMesh.position.set(0, 0.22, 0)

    const noseGeo = new THREE.BoxGeometry(1.05, 0.14, 0.8)
    const noseMesh = new THREE.Mesh(noseGeo, this.carChassisMaterial)
    noseMesh.position.set(0, 0.15, -1.3)

    const tailGeo = new THREE.BoxGeometry(1.15, 0.18, 0.7)
    const tailMesh = new THREE.Mesh(tailGeo, this.carChassisMaterial)
    tailMesh.position.set(0, 0.24, 1.4)

    // Canopy glass
    const canopyGeo = new THREE.BoxGeometry(0.88, 0.28, 1.5)
    const canopyMesh = new THREE.Mesh(canopyGeo, this.carCanopyMaterial)
    canopyMesh.position.set(0, 0.44, 0.05)

    const headlampGeo = new THREE.BoxGeometry(0.3, 0.04, 0.08)
    const headlampL = new THREE.Mesh(headlampGeo, this.carCyanEmissiveMaterial)
    headlampL.position.set(-0.38, 0.18, -1.68)
    const headlampR = new THREE.Mesh(headlampGeo, this.carCyanEmissiveMaterial)
    headlampR.position.set(0.38, 0.18, -1.68)

    const strakeGeo = new THREE.BoxGeometry(0.04, 0.05, 1.8)
    const strakeL = new THREE.Mesh(strakeGeo, this.carCyanEmissiveMaterial)
    strakeL.position.set(-0.63, 0.2, 0)
    const strakeR = new THREE.Mesh(strakeGeo, this.carCyanEmissiveMaterial)
    strakeR.position.set(0.63, 0.2, 0)

    const taillampGeo = new THREE.BoxGeometry(1.1, 0.045, 0.05)
    const taillamp = new THREE.Mesh(taillampGeo, this.carCyanEmissiveMaterial)
    taillamp.position.set(0, 0.28, 1.74)

    const podGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.14, 24)
    podGeo.rotateZ(Math.PI / 2)

    const podPositions = [
      [-0.6, 0.18, -0.9],
      [0.6, 0.18, -0.9],
      [-0.6, 0.18, 0.9],
      [0.6, 0.18, 0.9],
    ]

    podPositions.forEach((pos) => {
      const pod = new THREE.Mesh(podGeo, this.carChassisMaterial)
      pod.position.set(pos[0], pos[1], pos[2])

      const ringGeo = new THREE.RingGeometry(0.12, 0.21, 16)
      const ring = new THREE.Mesh(ringGeo, this.carCyanEmissiveMaterial)
      ring.rotation.y = pos[0] > 0 ? Math.PI / 2 : -Math.PI / 2
      ring.position.set(pos[0] > 0 ? 0.075 : -0.075, 0, 0)
      pod.add(ring)

      this.carGroup.add(pod)
    })

    const underglowGeo = new THREE.PlaneGeometry(1.3, 2.6)
    const underglowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    })
    const underglow = new THREE.Mesh(underglowGeo, underglowMat)
    underglow.rotation.x = -Math.PI / 2
    underglow.position.set(0, 0.04, 0)
    underglow.name = 'carUnderglow'

    this.carHeadlightLeft.position.set(-0.38, 0.2, -1.65)
    this.carHeadlightLeft.target.position.set(-0.38, 0, -18)
    this.carHeadlightRight.position.set(0.38, 0.2, -1.65)
    this.carHeadlightRight.target.position.set(0.38, 0, -18)

    this.carCoreLight.position.set(0, 0.35, 0)

    this.carGroup.add(
      bodyMesh,
      noseMesh,
      tailMesh,
      canopyMesh,
      headlampL,
      headlampR,
      strakeL,
      strakeR,
      taillamp,
      underglow,
      this.carCoreLight,
      this.carHeadlightLeft,
      this.carHeadlightLeft.target,
      this.carHeadlightRight,
      this.carHeadlightRight.target
    )

    // Hidden until bridge begins emerging at p = 0.10
    this.carGroup.position.set(0, 0.2, 6.0)
    this.carGroup.visible = false
  }

  /**
   * 6. Distant Procedural City Skyline with Tiered Setbacks and Rooftop Architectural Geometry
   */
  private buildCitySkyline() {
    const rng = createSeededRandom(421337)

    // LAYER 1: Near Waterfront Skyline (Z = -195 to -230)
    const nearGroup = new THREE.Group()
    const nearCount = 30
    const nearZBase = -210.0

    for (let i = 0; i < nearCount; i++) {
      let x = (rng() - 0.5) * 165.0
      // Leave central corridor open and dark behind footer typography
      if (Math.abs(x) < 8.0) {
        x += x >= 0 ? 8.5 : -8.5
      }

      const z = nearZBase + (rng() - 0.5) * 28.0
      const width = 4.5 + rng() * 4.0
      const depth = 4.5 + rng() * 3.5
      const height = 12.0 + rng() * 14.0

      const bldgGroup = new THREE.Group()

      // Main tower body
      const bodyGeo = new THREE.BoxGeometry(width, height, depth)
      const bodyMesh = new THREE.Mesh(bodyGeo, this.nearBuildingMaterial)
      bodyMesh.position.set(0, height * 0.5, 0)
      bldgGroup.add(bodyMesh)

      // Step-back architecture & roof features
      const roofType = rng()
      if (roofType < 0.45) {
        // Multi-tier setback crown
        const crownH = 2.5 + rng() * 3.0
        const crownW = width * 0.72
        const crownD = depth * 0.72
        const crownGeo = new THREE.BoxGeometry(crownW, crownH, crownD)
        const crownMesh = new THREE.Mesh(crownGeo, this.nearBuildingMaterial)
        crownMesh.position.set(0, height + crownH * 0.5, 0)
        bldgGroup.add(crownMesh)

        // Antenna spire atop setback
        const spireH = 2.5 + rng() * 4.0
        const spireGeo = new THREE.CylinderGeometry(0.04, 0.1, spireH, 6)
        const spireMesh = new THREE.Mesh(spireGeo, this.bridgeTrussMaterial)
        spireMesh.position.set(0, height + crownH + spireH * 0.5, 0)

        // Subtle aviation warning beacon
        const beaconGeo = new THREE.SphereGeometry(0.12, 8, 8)
        const beaconMat = new THREE.MeshBasicMaterial({ color: rng() > 0.5 ? 0xf87171 : 0x38bdf8 })
        const beacon = new THREE.Mesh(beaconGeo, beaconMat)
        beacon.position.set(0, height + crownH + spireH, 0)
        bldgGroup.add(spireMesh, beacon)
      } else if (roofType < 0.75) {
        // Mechanical penthouse + rooftop water tank
        const mechH = 1.6
        const mechGeo = new THREE.BoxGeometry(width * 0.55, mechH, depth * 0.55)
        const mechMesh = new THREE.Mesh(mechGeo, this.caissonMaterial)
        mechMesh.position.set(0, height + mechH * 0.5, 0)

        // Water tank cylinder on legs
        const tankGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.4, 12)
        const tankMesh = new THREE.Mesh(tankGeo, this.bridgeTrussMaterial)
        tankMesh.position.set(width * 0.2, height + mechH + 0.7, depth * 0.2)
        bldgGroup.add(mechMesh, tankMesh)
      } else {
        // Angled penthouse glass atrium
        const pentH = 2.0 + rng() * 2.0
        const pentGeo = new THREE.CylinderGeometry(width * 0.1, width * 0.6, pentH, 4)
        pentGeo.rotateY(Math.PI / 4)
        const pentMesh = new THREE.Mesh(pentGeo, this.nearBuildingMaterial)
        pentMesh.position.set(0, height + pentH * 0.5, 0)
        bldgGroup.add(pentMesh)
      }

      bldgGroup.position.set(x, -1.65, z)
      nearGroup.add(bldgGroup)
    }

    // LAYER 2: Middle Skyline (Z = -240 to -285)
    const midGroup = new THREE.Group()
    const midCount = 44
    const midZBase = -260.0

    for (let i = 0; i < midCount; i++) {
      let x = (rng() - 0.5) * 225.0
      if (Math.abs(x) < 7.0) {
        x += x >= 0 ? 8.0 : -8.0
      }

      const z = midZBase + (rng() - 0.5) * 36.0
      const width = 5.5 + rng() * 5.0
      const depth = 5.5 + rng() * 4.5
      const height = 20.0 + rng() * 18.0

      const bldgGroup = new THREE.Group()

      const bodyGeo = new THREE.BoxGeometry(width, height, depth)
      const bodyMesh = new THREE.Mesh(bodyGeo, this.midBuildingMaterial)
      bodyMesh.position.set(0, height * 0.5, 0)
      bldgGroup.add(bodyMesh)

      if (rng() > 0.40) {
        const spireH = 3.5 + rng() * 6.0
        const spireGeo = new THREE.CylinderGeometry(0.06, 0.18, spireH, 6)
        const spireMesh = new THREE.Mesh(spireGeo, this.bridgeTrussMaterial)
        spireMesh.position.set(0, height + spireH * 0.5, 0)

        const beaconGeo = new THREE.SphereGeometry(0.15, 8, 8)
        const beacon = new THREE.Mesh(beaconGeo, new THREE.MeshBasicMaterial({ color: 0xf87171 }))
        beacon.position.set(0, height + spireH, 0)
        bldgGroup.add(spireMesh, beacon)
      }

      bldgGroup.position.set(x, -1.65, z)
      midGroup.add(bldgGroup)
    }

    // Central Skyline Silhouette Towers framing and naturally occluding lower moonrise (Z = -262.0)
    const cen1W = 5.2
    const cen1H = 17.5
    const cen1D = 5.2
    const cen1Geo = new THREE.BoxGeometry(cen1W, cen1H, cen1D)
    const cen1Mesh = new THREE.Mesh(cen1Geo, this.midBuildingMaterial)
    cen1Mesh.position.set(-2.6, cen1H * 0.5 - 1.65, -262.0)

    const cen2W = 5.4
    const cen2H = 19.5
    const cen2D = 5.4
    const cen2Geo = new THREE.BoxGeometry(cen2W, cen2H, cen2D)
    const cen2Mesh = new THREE.Mesh(cen2Geo, this.midBuildingMaterial)
    cen2Mesh.position.set(2.8, cen2H * 0.5 - 1.65, -264.0)

    const cenSpireGeo = new THREE.CylinderGeometry(0.06, 0.16, 5.0, 6)
    const cenSpireMesh = new THREE.Mesh(cenSpireGeo, this.bridgeTrussMaterial)
    cenSpireMesh.position.set(2.8, cen2H + 0.8, -264.0)

    midGroup.add(cen1Mesh, cen2Mesh, cenSpireMesh)

    // Iconic Central Landmark Skyscraper
    const landmarkGroup = new THREE.Group()
    const lmH = 48.0
    const lmW = 7.8
    const lmGeo = new THREE.BoxGeometry(lmW, lmH, lmW)
    const lmMesh = new THREE.Mesh(lmGeo, this.midBuildingMaterial)
    lmMesh.position.set(0, lmH * 0.5, 0)

    const lmCrownH = 6.5
    const lmCrownGeo = new THREE.CylinderGeometry(1.2, lmW * 0.5, lmCrownH, 4)
    lmCrownGeo.rotateY(Math.PI / 4)
    const lmCrown = new THREE.Mesh(lmCrownGeo, this.nearBuildingMaterial)
    lmCrown.position.set(0, lmH + lmCrownH * 0.5, 0)

    const lmSpireH = 12.5
    const lmSpireGeo = new THREE.CylinderGeometry(0.08, 0.22, lmSpireH, 8)
    const lmSpire = new THREE.Mesh(lmSpireGeo, this.bridgeTrussMaterial)
    lmSpire.position.set(0, lmH + lmCrownH + lmSpireH * 0.5, 0)

    const lmBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    )
    lmBeacon.position.set(0, lmH + lmCrownH + lmSpireH, 0)

    landmarkGroup.add(lmMesh, lmCrown, lmSpire, lmBeacon)
    landmarkGroup.position.set(16.0, -1.65, -255.0)
    midGroup.add(landmarkGroup)

    // LAYER 3: Far Skyline Silhouettes (Z = -300 to -370)
    const farGroup = new THREE.Group()
    const farCount = 56
    const farZBase = -335.0

    for (let i = 0; i < farCount; i++) {
      const x = (rng() - 0.5) * 320.0
      const z = farZBase + (rng() - 0.5) * 55.0
      const width = 7.0 + rng() * 8.0
      const depth = 7.0 + rng() * 7.0
      const height = 28.0 + rng() * 24.0

      const geo = new THREE.BoxGeometry(width, height, depth)
      const mesh = new THREE.Mesh(geo, this.farBuildingMaterial)
      mesh.position.set(x, height * 0.5 - 1.65, z)
      farGroup.add(mesh)
    }

    this.cityGroup.add(nearGroup, midGroup, farGroup)
  }

  /**
   * 7. City Boulevard, Continuous Roadway & Urban Arrival Gateway
   *
   * Extends the road past the suspension bridge (Z = -118) deep into the illuminated city.
   * Features:
   * - Continuous asphalt roadway (Z = -118 to -186) curving rightward past Z = -143.
   * - Flanking illuminated sidewalk borders and architectural streetlight pylons.
   * - Corner Landmark Skyscraper (X = 3.8, Z = -158) providing genuine physical occlusion for the car's exit.
   * - Gateway entrance city towers framing the urban avenue.
   */
  private buildCityBoulevardAndArrival() {
    // 7A. Slender Streetlight Columns Along Continuous Avenue
    const lampPostGeo = new THREE.CylinderGeometry(0.05, 0.07, 3.4, 8)
    const lampHeadGeo = new THREE.BoxGeometry(0.35, 0.06, 0.16)
    const lampLightMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd })

    const lampPositionsZ = [-122.0, -134.0, -146.0, -158.0, -170.0, -182.0, -194.0, -206.0]
    lampPositionsZ.forEach((lz) => {
      const u = (8.0 - lz) / (8.0 - -225.0)
      const pt = this.roadSpline.getPointAt(Math.max(0, Math.min(1, u)))
      const tangent = this.roadSpline.getTangentAt(Math.max(0, Math.min(1, u))).normalize()
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()

      // Left sidewalk lamp
      const postL = new THREE.Mesh(lampPostGeo, this.caissonMaterial)
      const posL = pt.clone().add(normal.clone().multiplyScalar(-2.2))
      postL.position.set(posL.x, 1.7, posL.z)
      const headL = new THREE.Mesh(lampHeadGeo, lampLightMat)
      headL.position.set(0, 1.7, 0)
      postL.add(headL)

      // Right sidewalk lamp
      const postR = new THREE.Mesh(lampPostGeo, this.caissonMaterial)
      const posR = pt.clone().add(normal.clone().multiplyScalar(2.2))
      postR.position.set(posR.x, 1.7, posR.z)
      const headR = new THREE.Mesh(lampHeadGeo, lampLightMat)
      headR.position.set(0, 1.7, 0)
      postR.add(headR)

      this.arrivalApronGroup.add(postL, postR)
    })

    // 7B. Landmark Corner Skyscraper (Direct Geometric Occlusion Architecture)
    // Placed at X = 6.8, Z = -168.0 along the inside curve of the avenue.
    // As the car rounds the bend and travels past Z = -175 to -215, it passes behind this building.
    const cornerTowerGroup = new THREE.Group()
    const ctWidth = 7.5
    const ctDepth = 9.5
    const ctHeight = 36.0

    const ctBodyGeo = new THREE.BoxGeometry(ctWidth, ctHeight, ctDepth)
    const ctBodyMesh = new THREE.Mesh(ctBodyGeo, this.nearBuildingMaterial)
    ctBodyMesh.position.set(0, ctHeight * 0.5, 0)
    cornerTowerGroup.add(ctBodyMesh)

    // Tiered setback crown
    const ctCrownH = 4.5
    const ctCrownGeo = new THREE.BoxGeometry(ctWidth * 0.75, ctCrownH, ctDepth * 0.75)
    const ctCrownMesh = new THREE.Mesh(ctCrownGeo, this.nearBuildingMaterial)
    ctCrownMesh.position.set(0, ctHeight + ctCrownH * 0.5, 0)

    // Antenna mast & beacon
    const ctSpireH = 6.0
    const ctSpireGeo = new THREE.CylinderGeometry(0.06, 0.14, ctSpireH, 6)
    const ctSpireMesh = new THREE.Mesh(ctSpireGeo, this.bridgeTrussMaterial)
    ctSpireMesh.position.set(0, ctHeight + ctCrownH + ctSpireH * 0.5, 0)

    const ctBeaconGeo = new THREE.SphereGeometry(0.18, 8, 8)
    const ctBeacon = new THREE.Mesh(ctBeaconGeo, new THREE.MeshBasicMaterial({ color: 0xf87171 }))
    ctBeacon.position.set(0, ctHeight + ctCrownH + ctSpireH, 0)

    cornerTowerGroup.add(ctCrownMesh, ctSpireMesh, ctBeacon)
    cornerTowerGroup.position.set(6.8, 0, -168.0)
    this.arrivalApronGroup.add(cornerTowerGroup)

    // 7C. Avenue Gateway Buildings (Framing the Urban Corridor)
    const gateLeft1 = new THREE.Mesh(new THREE.BoxGeometry(7.5, 24.0, 9.0), this.nearBuildingMaterial)
    gateLeft1.position.set(-9.5, 12.0, -142.0)

    const gateLeft2 = new THREE.Mesh(new THREE.BoxGeometry(8.5, 30.0, 11.0), this.nearBuildingMaterial)
    gateLeft2.position.set(-13.0, 15.0, -168.0)

    const gateLeft3 = new THREE.Mesh(new THREE.BoxGeometry(9.5, 34.0, 11.0), this.nearBuildingMaterial)
    gateLeft3.position.set(-16.0, 17.0, -195.0)

    const gateRight1 = new THREE.Mesh(new THREE.BoxGeometry(7.0, 26.0, 8.5), this.nearBuildingMaterial)
    gateRight1.position.set(9.0, 13.0, -145.0)

    const gateRight3 = new THREE.Mesh(new THREE.BoxGeometry(9.5, 34.0, 11.0), this.nearBuildingMaterial)
    gateRight3.position.set(16.0, 17.0, -198.0)

    this.arrivalApronGroup.add(gateLeft1, gateLeft2, gateLeft3, gateRight1, gateRight3)
  }

  /**
   * 8. Atmospheric Particle Field
   */
  private buildAtmosphericParticles(): THREE.Points {
    const particleCount = 280
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 36.0
      pos[i * 3 + 1] = Math.random() * 9.0 - 1.0
      pos[i * 3 + 2] = Math.random() * -125.0 + 10.0
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })

    return new THREE.Points(geo, mat)
  }

  /**
   * Calculates continuous, deterministic vehicle 3D transform, yaw drift slip angle,
   * speed ramp, and building occlusion across all 6 journey stages.
   */
  public getVehicleState(p: number): {
    x: number
    y: number
    z: number
    rotY: number
    rollZ: number
    scale: number
    visible: boolean
    isDrifting: boolean
  } {
    if (p < 0.10) {
      return { x: 0, y: 0.2, z: 6.0, rotY: 0, rollZ: 0, scale: 0.01, visible: false, isDrifting: false }
    }

    if (p < 0.18) {
      const t = (p - 0.10) / 0.08
      const easeDrift = t * t * (3 - 2 * t)
      const z = THREE.MathUtils.lerp(5.0, -6.0, easeDrift)
      const y = this.getDeckElevation(z) + 0.12
      const scale = THREE.MathUtils.lerp(0.25, 1.0, t)
      return { x: 0, y, z, rotY: 0, rollZ: 0, scale, visible: true, isDrifting: false }
    }

    if (p < 0.36) {
      const z = THREE.MathUtils.lerp(-6.0, -32.0, (p - 0.18) / (0.36 - 0.18))
      return { x: 0, y: this.getDeckElevation(z) + 0.12, z, rotY: 0, rollZ: 0, scale: 1.0, visible: true, isDrifting: false }
    }

    if (p < 0.78) {
      const z = THREE.MathUtils.lerp(-32.0, -94.0, (p - 0.36) / (0.78 - 0.36))
      return { x: 0, y: this.getDeckElevation(z) + 0.12, z, rotY: 0, rollZ: 0, scale: 1.0, visible: true, isDrifting: false }
    }

    if (p < 0.88) {
      const z = THREE.MathUtils.lerp(-94.0, -114.0, (p - 0.78) / (0.88 - 0.78))
      return { x: 0, y: this.getDeckElevation(z) + 0.12, z, rotY: 0, rollZ: 0, scale: 1.0, visible: true, isDrifting: false }
    }

    // Stage 1: Bridge exit approach onto city boulevard (0.88 -> 0.915)
    if (p < 0.915) {
      const t = (p - 0.88) / (0.915 - 0.88)
      const z = THREE.MathUtils.lerp(-114.0, -130.0, t)
      const u = (8.0 - z) / 233.0
      const pt = this.roadSpline.getPointAt(Math.max(0, Math.min(1, u)))
      const tangent = this.roadSpline.getTangentAt(Math.max(0, Math.min(1, u)))
      const rotY = Math.atan2(tangent.x, -tangent.z)
      return { x: pt.x, y: pt.y + 0.12, z, rotY, rollZ: 0, scale: 1.0, visible: true, isDrifting: false }
    }

    // Stage 2: Enter city avenue with speed ramp (0.915 -> 0.938)
    if (p < 0.938) {
      const t = (p - 0.915) / (0.938 - 0.915)
      const z = THREE.MathUtils.lerp(-130.0, -148.0, t)
      const u = (8.0 - z) / 233.0
      const pt = this.roadSpline.getPointAt(Math.max(0, Math.min(1, u)))
      const tangent = this.roadSpline.getTangentAt(Math.max(0, Math.min(1, u)))
      const rotY = Math.atan2(tangent.x, -tangent.z)
      return { x: pt.x, y: pt.y + 0.12, z, rotY, rollZ: 0, scale: 1.0, visible: true, isDrifting: false }
    }

    // Stage 3: Fast Controlled Cinematic Drift on Continuous Road (0.938 -> 0.965)
    if (p < 0.965) {
      const t = (p - 0.938) / (0.965 - 0.938)
      const z = THREE.MathUtils.lerp(-148.0, -174.0, t)
      const u = (8.0 - z) / 233.0
      const pt = this.roadSpline.getPointAt(Math.max(0, Math.min(1, u)))
      const tangent = this.roadSpline.getTangentAt(Math.max(0, Math.min(1, u)))
      const pathAngle = Math.atan2(tangent.x, -tangent.z)

      // Controlled slip angle: vehicle body swings tail-out with smooth entry and recovery
      const driftSlip = Math.sin(t * Math.PI) * 0.40 // ~23 deg
      const rotY = pathAngle + driftSlip
      const rollZ = -Math.sin(t * Math.PI) * 0.07

      return { x: pt.x, y: pt.y + 0.12, z, rotY, rollZ, scale: 1.0, visible: true, isDrifting: true }
    }

    // Stage 4: Acceleration & Disappearance Around Bend Behind Skyscraper (0.965 -> 0.985)
    if (p < 0.985) {
      const t = (p - 0.965) / (0.985 - 0.965)
      const z = THREE.MathUtils.lerp(-174.0, -215.0, t)
      const u = (8.0 - z) / 233.0
      const pt = this.roadSpline.getPointAt(Math.max(0, Math.min(1, u)))
      const tangent = this.roadSpline.getTangentAt(Math.max(0, Math.min(1, u)))
      const pathAngle = Math.atan2(tangent.x, -tangent.z)

      return { x: pt.x, y: pt.y + 0.12, z, rotY: pathAngle, rollZ: 0, scale: 1.0, visible: true, isDrifting: false }
    }

    // Stage 5: Final Reveal — Permanently Occluded Behind Corner Skyscraper Architecture (0.985 -> 1.0)
    const finalU = (8.0 - -215.0) / 233.0
    const finalPt = this.roadSpline.getPointAt(Math.max(0, Math.min(1, finalU)))
    const finalTangent = this.roadSpline.getTangentAt(Math.max(0, Math.min(1, finalU)))
    const finalAngle = Math.atan2(finalTangent.x, -finalTangent.z)
    return {
      x: finalPt.x,
      y: finalPt.y + 0.12,
      z: -215.0,
      rotY: finalAngle,
      rollZ: 0,
      scale: 1.0,
      visible: true,
      isDrifting: false,
    }
  }

  public getVehicleZ(p: number): number {
    return this.getVehicleState(p).z
  }

  /**
   * Continuous Deterministic Update Driven by Scroll Progress [0.0 -> 1.0] and Time-Of-Day
   */
  public update(progress: number, elapsedTime: number, env?: TimeOfDayEnvironment) {
    const p = Math.max(0, Math.min(1, progress))

    // DYNAMIC TIME-OF-DAY MATERIAL & CELESTIAL MODULATION
    if (env) {
      this.bridgePylonMaterial.emissive.copy(env.sunColor)
      this.bridgePylonMaterial.emissiveIntensity = env.bridgeWarmIntensity * 0.18
      this.bridgeCableMaterial.emissiveIntensity = 0.25 + env.bridgeCyanIntensity * 0.35

      this.towerSpotlights.forEach((spot) => {
        spot.color.copy(env.sunColor)
        spot.intensity = env.bridgeWarmIntensity * 1.4
      })

      const cityWindowGlow = THREE.MathUtils.lerp(0.05, 0.75, Math.max(0, (p - 0.35) / 0.65))
      this.nearBuildingMaterial.emissiveIntensity = cityWindowGlow
      this.midBuildingMaterial.emissiveIntensity = cityWindowGlow * 0.8
    }

    // CELESTIAL TIMELINE (SUN DESCENT & MOONRISE)
    if (p < 0.58) {
      this.sunGroup.visible = true
      let sunY: number
      let sunIntensity: number

      if (p < 0.15) {
        sunY = THREE.MathUtils.lerp(22.0, 18.0, p / 0.15)
        sunIntensity = 2.4
      } else if (p < 0.30) {
        sunY = THREE.MathUtils.lerp(18.0, 10.0, (p - 0.15) / 0.15)
        sunIntensity = 2.0
      } else if (p < 0.46) {
        sunY = THREE.MathUtils.lerp(10.0, 2.5, (p - 0.30) / 0.16)
        sunIntensity = 1.5
      } else {
        sunY = THREE.MathUtils.lerp(2.5, -9.0, (p - 0.46) / 0.12)
        sunIntensity = THREE.MathUtils.lerp(1.5, 0.0, (p - 0.46) / 0.12)
      }

      this.sunGroup.position.set(-32.0, sunY, -260.0)
      this.sunMaterial.opacity = THREE.MathUtils.clamp(sunIntensity / 1.5, 0.0, 1.0)
      this.sunCoronaMaterial.opacity = THREE.MathUtils.clamp(sunIntensity / 2.4 * 0.85, 0.0, 0.85)
      this.sunLight.intensity = sunIntensity * 1.6

      if (env) {
        this.sunLight.color.copy(env.sunColor)
      }
    } else {
      this.sunGroup.visible = false
      this.sunMaterial.opacity = 0.0
      this.sunLight.intensity = 0.0
    }

    // Moon Emergence & Rise Behind Central Skyline
    if (p >= 0.42) {
      this.moonGroup.visible = true
      let moonY: number
      let moonOpacity: number
      let moonIntensity: number

      if (p < 0.72) {
        // Transition from behind skyline to emerging above buildings
        const moonT = (p - 0.42) / 0.30
        const easeT = moonT * moonT * (3 - 2 * moonT)
        // Starts at Y = -4.0 (hidden behind buildings), rises to 20.0 (emerging above rooftops)
        moonY = THREE.MathUtils.lerp(-4.0, 20.0, easeT)
        moonOpacity = THREE.MathUtils.clamp(moonT * 1.5, 0.0, 1.0)
        moonIntensity = THREE.MathUtils.lerp(0.2, 1.25, easeT)
      } else {
        const nightT = (p - 0.72) / 0.28
        // Continues ascending above central skyline into night sky
        moonY = THREE.MathUtils.lerp(20.0, 38.0, nightT)
        moonOpacity = 1.0
        moonIntensity = THREE.MathUtils.lerp(1.25, 1.85, nightT)
      }

      // Moon positioned strictly behind the central city skyline
      this.moonGroup.position.set(0.0, moonY, -285.0)

      this.moonMaterial.opacity = moonOpacity
      this.moonCoronaMaterial.opacity = moonOpacity * 0.75
      this.moonLight.intensity = moonIntensity * 2.4

      if (env) {
        this.moonLight.color.copy(env.moonColor)
      }
    } else {
      this.moonGroup.visible = false
      this.moonMaterial.opacity = 0.0
      this.moonLight.intensity = 0.0
    }

    // Road Track Emergence (0.10 -> 0.38)
    this.trackGroup.children.forEach((child) => {
      const uThreshold = (child as any).userData?.emergeProgress ?? 0.2
      const baseY = (child as any).userData?.baseY ?? 0

      if (p < uThreshold - 0.08) {
        child.position.y = baseY - 3.2
        child.scale.set(0.01, 0.01, 0.01)
        ;(child as any).visible = false
      } else if (p < uThreshold) {
        const localEmerge = (p - (uThreshold - 0.08)) / 0.08
        const easeEmerge = localEmerge * localEmerge * (3 - 2 * localEmerge)
        child.position.y = THREE.MathUtils.lerp(baseY - 3.2, baseY, easeEmerge)
        child.scale.set(easeEmerge, easeEmerge, easeEmerge)
        ;(child as any).visible = true
      } else {
        child.position.y = baseY
        child.scale.set(1, 1, 1)
        ;(child as any).visible = true
      }
    })

    // Bridge Towers & Catenary Cables Emergence (0.22 -> 0.60)
    this.bridgeTowers.forEach((tower, idx) => {
      const towerThreshold = 0.22 + idx * 0.18
      if (p < towerThreshold) {
        tower.position.y = -12.0
        tower.visible = false
      } else if (p < towerThreshold + 0.1) {
        const localT = (p - towerThreshold) / 0.1
        tower.position.y = THREE.MathUtils.lerp(-12.0, 0, localT)
        tower.visible = true
      } else {
        tower.position.y = 0
        tower.visible = true
      }
    })

    if (p < 0.22) {
      this.mainCablesGroup.visible = false
    } else if (p < 0.34) {
      const cableEmerge = (p - 0.22) / 0.12
      this.mainCablesGroup.visible = true
      this.mainCablesGroup.position.y = THREE.MathUtils.lerp(-10.0, 0, cableEmerge)
    } else {
      this.mainCablesGroup.visible = true
      this.mainCablesGroup.position.y = 0
    }

    this.anchoragePiers.forEach((pier) => {
      if (p < 0.22) {
        pier.position.y = -10.0
        pier.visible = false
      } else if (p < 0.32) {
        const localT = (p - 0.22) / 0.1
        pier.position.y = THREE.MathUtils.lerp(-10.0, 0, localT)
        pier.visible = true
      } else {
        pier.position.y = 0
        pier.visible = true
      }
    })

    // VEHICLE TRAJECTORY & SYNCHRONIZED ENTRANCE
    const vState = this.getVehicleState(p)
    this.carGroup.visible = vState.visible
    this.carGroup.position.set(vState.x, vState.y, vState.z)
    this.carGroup.rotation.set(0, vState.rotY, vState.rollZ)
    this.carGroup.scale.set(vState.scale, vState.scale, vState.scale)

    if (p < 0.938 && vState.visible) {
      this.carGroup.position.y += Math.sin(elapsedTime * 28.0) * 0.0018
    }

    // Headlight and Underglow Scaling
    let headlightPower = THREE.MathUtils.lerp(0.5, 4.8, Math.max(0, (p - 0.30) / 0.70))
    let underglowPower = THREE.MathUtils.lerp(0.2, 0.75, Math.max(0, (p - 0.30) / 0.70))
    let coreLightPower = THREE.MathUtils.lerp(1.2, 3.2, Math.max(0, (p - 0.40) / 0.60))

    if (vState.isDrifting) {
      headlightPower *= 1.4
      underglowPower = 0.95
      coreLightPower = 4.2
    }

    this.carHeadlightLeft.intensity = headlightPower
    this.carHeadlightRight.intensity = headlightPower
    this.carCoreLight.intensity = coreLightPower

    const underglow = this.carGroup.getObjectByName('carUnderglow') as THREE.Mesh
    if (underglow && underglow.material) {
      ;(underglow.material as THREE.MeshBasicMaterial).opacity = underglowPower
    }

    // Atmospheric stardust drift
    this.particlesGroup.rotation.y = elapsedTime * 0.02
  }

  public dispose() {
    this.sunRadialTexture.dispose()
    this.coronaTexture.dispose()
    this.moonTexture.dispose()
    this.moonCoronaTexture.dispose()
    this.sunMaterial.dispose()
    this.sunCoronaMaterial.dispose()
    this.moonMaterial.dispose()
    this.moonCoronaMaterial.dispose()
    this.carChassisMaterial.dispose()
    this.carCanopyMaterial.dispose()
    this.carCyanEmissiveMaterial.dispose()
    this.trackGuideMaterial.dispose()
    this.trackDeckMaterial.dispose()
    this.bridgePylonMaterial.dispose()
    this.bridgeTrussMaterial.dispose()
    this.bridgeCableMaterial.dispose()
    this.caissonMaterial.dispose()
    this.nearBuildingMaterial.dispose()
    this.midBuildingMaterial.dispose()
    this.farBuildingMaterial.dispose()
    this.windowEmissiveMaterial.dispose()
    this.nearFacadeTextures.map.dispose()
    this.nearFacadeTextures.emissiveMap.dispose()
    this.midFacadeTextures.map.dispose()
    this.midFacadeTextures.emissiveMap.dispose()
    this.signTexturesToDispose.forEach((tex) => tex.dispose())
  }
}
