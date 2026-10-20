import * as THREE from 'three'
import type { CameraKeyframe } from './types'

/**
 * PHASE 6 — CINEMATIC CAMERA CHOREOGRAPHY WITH DRIVER POV
 *
 * Implements 7 distinct cinematic shot families:
 * Shot A: Aerial establishing shot (Scene 01: The Arrival, high wide 3/4 view, horizon & sun)
 * Shot D: High oblique follow shot (Scene 02: Track Emergence & Orientation)
 * Shot C: Lateral bridge glide (Scene 03: Two-Pathway Academics alongside Tower 1)
 * Shot E: Low tower reveal (Look upward from near deck toward pylon cables)
 * Shot F: Driver's-Eye POV (Dedicated first-person driving sequence inside car)
 * Shot B: Low road-level tracking shot (Scene 04: Project checkpoints)
 * Shot G: Wide crane readout & final pullback (Scene 05 & 06: City waterfront arrival)
 */

export const CINEMATIC_KEYFRAMES: CameraKeyframe[] = [
  // Shot A1: High, Distant Drone Establishing Shot (Horizon, water, distant skyline)
  {
    progress: 0.0,
    cameraPos: [2.2, 4.4, 12.0],
    targetPos: [0, 0.8, -32.0],
    fov: 44,
    stageName: 'THE_ARRIVAL',
    stageCode: '01',
    description: 'High distant drone view: warm sunset horizon, calm water, and distant skyline.',
  },
  // Shot A2: Aerial Push & Descent (Scale of environment established, car aligns)
  {
    progress: 0.10,
    cameraPos: [1.8, 3.2, 7.5],
    targetPos: [0, 0.6, -26.0],
    fov: 46,
    stageName: 'THE_ARRIVAL',
    stageCode: '01',
    description: 'Aerial push: road segments emerge across the bay as car appears in the approach.',
  },
  // Shot C1: Road-Level Oblique Follow (Orientation Section)
  {
    progress: 0.18,
    cameraPos: [3.8, 2.2, 3.5],
    targetPos: [0, 0.45, -18.0],
    fov: 48,
    stageName: 'ORIENTATION',
    stageCode: '02',
    description: 'Exterior oblique follow: vehicle aligns with lane markings and cruises onto the deck.',
  },
  // Shot C2: Lateral Bridge Glide (Two-Pathway Academic Timeline alongside Tower 1)
  {
    progress: 0.36,
    cameraPos: [4.8, 2.6, -24.0],
    targetPos: [0, 1.4, -44.0],
    fov: 49,
    stageName: 'ACADEMICS',
    stageCode: '03',
    description: 'Lateral bridge glide: revealing vertical cables, Tower 1, and dual academic pathways.',
  },
  // Shot B1: Forward Fly-Through Inside Bridge Structure (Entry between Tower 1 cables)
  {
    progress: 0.48,
    cameraPos: [1.1, 2.7, -34.0],
    targetPos: [0, 1.3, -62.0],
    fov: 50,
    stageName: 'SPAN_FLYTHROUGH',
    stageCode: '04',
    description: 'Forward bridge fly-through: gliding through structural space between towers and catenary cables.',
  },
  // Shot B2: Forward Fly-Through Inside Bridge Structure (Mid-span apex between towers)
  {
    progress: 0.56,
    cameraPos: [0.8, 3.0, -48.0],
    targetPos: [0, 1.2, -78.0],
    fov: 52,
    stageName: 'SPAN_FLYTHROUGH',
    stageCode: '04',
    description: 'Traversing the central suspension span with deep structural parallax toward the skyline.',
  },
  // Shot B3: Forward Fly-Through Transition toward Tower 2
  {
    progress: 0.64,
    cameraPos: [-0.9, 2.5, -62.0],
    targetPos: [0, 1.0, -90.0],
    fov: 50,
    stageName: 'SPAN_FLYTHROUGH',
    stageCode: '04',
    description: 'Smooth exterior glide clear of structural steel, approaching Tower 2 portal.',
  },
  // Shot C3: Road-Level Tracking Shot (Project Checkpoints CP-03 / CP-04)
  {
    progress: 0.70,
    cameraPos: [-2.8, 1.35, -72.0],
    targetPos: [0, 0.45, -96.0],
    fov: 50,
    stageName: 'PROJECT_CHECKPOINTS',
    stageCode: '04',
    description: 'Low road-level tracking: cable leading lines and checkpoint waypoints under moonrise.',
  },
  // Shot C4: Road-Level Tracking Shot (Project Checkpoint CP-05)
  {
    progress: 0.76,
    cameraPos: [2.6, 1.45, -84.0],
    targetPos: [0, 0.45, -106.0],
    fov: 50,
    stageName: 'PROJECT_CHECKPOINTS',
    stageCode: '04',
    description: 'Low road-level tracking accelerating toward waterfront approach under the moon.',
  },
  // Shot D: Elevated Oblique View (Technical Depth Engineering Schematic)
  {
    progress: 0.84,
    cameraPos: [5.2, 3.5, -92.0],
    targetPos: [0, 0.8, -120.0],
    fov: 48,
    stageName: 'TECHNICAL_DEPTH',
    stageCode: '05',
    description: 'Three-quarter aerial angle revealing bridge deck, water, and illuminated city skyline.',
  },
  // Shot E1: Stage 1 — High Distant Drone View (Establishing City Entry)
  {
    progress: 0.90,
    cameraPos: [3.4, 4.6, -102.0],
    targetPos: [0, 1.0, -135.0],
    fov: 46,
    stageName: 'CITY_ARRIVAL',
    stageCode: '06',
    description: 'High drone shot: bridge leading seamlessly into illuminated city boulevard at night.',
  },
  // Shot E2: Stage 2 — Exterior Tracking Aligned with City Road
  {
    progress: 0.93,
    cameraPos: [1.2, 1.9, -122.0],
    targetPos: [0, 0.7, -145.0],
    fov: 48,
    stageName: 'CITY_ARRIVAL',
    stageCode: '06',
    description: 'Exterior road tracking: car accelerates onto open city avenue between illuminated streetscapes.',
  },
  // Shot E3: Stage 3 — Dynamic Tracking of Fast Controlled Drift
  {
    progress: 0.955,
    cameraPos: [-2.0, 2.2, -138.0],
    targetPos: [1.0, 0.8, -158.0],
    fov: 49,
    stageName: 'CITY_ARRIVAL',
    stageCode: '06',
    description: 'Dynamic drift tracking: vehicle slides controlled on continuous road through avenue bend.',
  },
  // Shot E4: Stage 4 — Car Disappears Around Bend Behind Skyscraper
  {
    progress: 0.975,
    cameraPos: [-2.4, 3.2, -144.0],
    targetPos: [2.6, 1.4, -178.0],
    fov: 47,
    stageName: 'FINAL_REVEAL',
    stageCode: '06',
    description: 'Vehicle accelerates and naturally rounds the continuous bend behind corner skyscraper geometry.',
  },
  // Shot E5: Stage 5 — Final City Panoramic Pullback (Single-Line Name Framing)
  {
    progress: 1.0,
    cameraPos: [-0.4, 4.2, -130.0],
    targetPos: [2.0, 2.4, -205.0],
    fov: 46,
    stageName: 'FINAL_REVEAL',
    stageCode: '06',
    description: 'Panoramic final composition: moonlit water, illuminated skyline, and single-line Saiyam Bajpai reveal.',
  },
]

function smoothHermite(t: number): number {
  return t * t * (3 - 2 * t)
}

export function interpolateCamera(
  progress: number,
  outCamPos: THREE.Vector3,
  outTargetPos: THREE.Vector3,
  outFov: { value: number }
): CameraKeyframe {
  const p = Math.max(0, Math.min(1, progress))

  let i = 0
  while (i < CINEMATIC_KEYFRAMES.length - 1 && CINEMATIC_KEYFRAMES[i + 1].progress < p) {
    i++
  }

  const k1 = CINEMATIC_KEYFRAMES[i]
  const k2 = CINEMATIC_KEYFRAMES[Math.min(i + 1, CINEMATIC_KEYFRAMES.length - 1)]

  const range = k2.progress - k1.progress
  const localT = range > 0.0001 ? (p - k1.progress) / range : 0
  const easedT = smoothHermite(localT)

  outCamPos.set(
    THREE.MathUtils.lerp(k1.cameraPos[0], k2.cameraPos[0], easedT),
    THREE.MathUtils.lerp(k1.cameraPos[1], k2.cameraPos[1], easedT),
    THREE.MathUtils.lerp(k1.cameraPos[2], k2.cameraPos[2], easedT)
  )

  outTargetPos.set(
    THREE.MathUtils.lerp(k1.targetPos[0], k2.targetPos[0], easedT),
    THREE.MathUtils.lerp(k1.targetPos[1], k2.targetPos[1], easedT),
    THREE.MathUtils.lerp(k1.targetPos[2], k2.targetPos[2], easedT)
  )

  outFov.value = THREE.MathUtils.lerp(k1.fov, k2.fov, easedT)

  return localT < 0.5 ? k1 : k2
}
