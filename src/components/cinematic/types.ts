export interface CameraKeyframe {
  progress: number
  cameraPos: [number, number, number]
  targetPos: [number, number, number]
  fov: number
  stageName: string
  stageCode: string
  description: string
}

export interface CinematicState {
  progress: number
  stageIndex: number
  stageName: string
  stageCode: string
  description: string
  isReducedMotion: boolean
  isMobile: boolean
}
