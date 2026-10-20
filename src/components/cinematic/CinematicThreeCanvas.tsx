import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ProceduralSceneManager } from './ProceduralAssets'
import { TimeOfDayController } from './TimeOfDaySystem'
import { WaterSurface } from './WaterSurface'
import { SkyBackdrop } from './SkyBackdrop'
import { interpolateCamera } from './cameraChoreography'
import type { CameraKeyframe } from './types'

interface CinematicThreeCanvasProps {
  progress: number
  isReducedMotion: boolean
  onStageChange?: (keyframe: CameraKeyframe) => void
  className?: string
}

export const CinematicThreeCanvas: React.FC<CinematicThreeCanvasProps> = ({
  progress,
  isReducedMotion,
  onStageChange,
  className = 'absolute inset-0 h-full w-full overflow-hidden',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentProgressRef = useRef<number>(progress)
  const targetProgressRef = useRef<number>(progress)
  const lastKeyframeNameRef = useRef<string>('')

  // Sync target progress
  useEffect(() => {
    targetProgressRef.current = progress
  }, [progress])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene setup with atmospheric linear fog
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1c1e28)
    scene.fog = new THREE.Fog(0x1c1e28, 25, 130)

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      600
    )
    const cameraTarget = new THREE.Vector3(0, 1.0, 0)
    const fovHolder = { value: 45 }

    // 3. Renderer configuration
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    container.appendChild(renderer.domElement)

    // 4. Centralized Time-of-Day System & Environmental Backdrops
    const timeOfDayController = new TimeOfDayController()
    const skyBackdrop = new SkyBackdrop()
    const waterSurface = new WaterSurface()
    scene.add(skyBackdrop.mesh)
    scene.add(waterSurface.mesh)

    // 5. Dynamic Time-Of-Day Lighting System
    const sunLight = new THREE.DirectionalLight(0xf5a65b, 2.2)
    sunLight.position.set(-16, 4.5, -80)
    scene.add(sunLight)

    const moonLight = new THREE.DirectionalLight(0x7ea5cc, 0.0)
    moonLight.position.set(18, -10, -50)
    scene.add(moonLight)

    const ambientLight = new THREE.AmbientLight(0x1e222d, 1.2)
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(0x283248, 0x12161f, 1.1)
    scene.add(hemiLight)

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    cyanRimLight.position.set(12, 14, 10)
    scene.add(cyanRimLight)

    const warmFillLight = new THREE.DirectionalLight(0xf5b070, 1.2)
    warmFillLight.position.set(-14, 8, -20)
    scene.add(warmFillLight)

    // 6. Procedural Scene Manager
    const sceneManager = new ProceduralSceneManager()
    scene.add(sceneManager.rootGroup)

    // Initial immediate paint to guarantee 0ms visual readiness
    const initEnv = timeOfDayController.evaluate(currentProgressRef.current)
    skyBackdrop.update(initEnv)
    waterSurface.update(initEnv, 0, isReducedMotion)
    sceneManager.update(currentProgressRef.current, 0, initEnv)
    interpolateCamera(currentProgressRef.current, camera.position, cameraTarget, fovHolder)
    camera.lookAt(cameraTarget)
    renderer.render(scene, camera)

    // 7. Animation clock and render loop using performance.now()
    let animationFrameId: number
    const startTime = performance.now()
    let isTabVisible = true

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const renderLoop = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(renderLoop)

      if (!isTabVisible) return

      const elapsedTime = (currentTime - startTime) / 1000

      // Smooth progress lerp: 60fps buttery transition
      if (isReducedMotion) {
        currentProgressRef.current = targetProgressRef.current
      } else {
        const lerpSpeed = 0.085
        currentProgressRef.current +=
          (targetProgressRef.current - currentProgressRef.current) * lerpSpeed
      }

      const activeProgress = currentProgressRef.current

      // Evaluate Time-of-Day Environment
      const env = timeOfDayController.evaluate(activeProgress)

      // Update background and fog
      if (scene.background instanceof THREE.Color) {
        scene.background.copy(env.fogColor)
      } else {
        scene.background = env.fogColor
      }

      if (scene.fog && scene.fog instanceof THREE.Fog) {
        scene.fog.color.copy(env.fogColor)
        scene.fog.near = env.fogNear
        scene.fog.far = env.fogFar
      }

      // Update lighting
      sunLight.color.copy(env.sunColor)
      sunLight.intensity = env.sunIntensity
      sunLight.position.copy(env.sunPosition)

      moonLight.color.copy(env.moonColor)
      moonLight.intensity = env.moonIntensity
      moonLight.position.copy(env.moonPosition)

      ambientLight.color.copy(env.ambientColor)
      ambientLight.intensity = env.ambientIntensity

      hemiLight.color.copy(env.hemiSkyColor)
      hemiLight.groundColor.copy(env.hemiGroundColor)
      hemiLight.intensity = env.hemiIntensity

      cyanRimLight.intensity = env.bridgeCyanIntensity * 0.8
      warmFillLight.intensity = env.bridgeWarmIntensity * 0.8

      // Update Environmental Meshes
      skyBackdrop.update(env)
      waterSurface.update(env, elapsedTime, isReducedMotion)

      // Update camera and choreography
      const currentKeyframe = interpolateCamera(
        activeProgress,
        camera.position,
        cameraTarget,
        fovHolder
      )

      if (Math.abs(camera.fov - fovHolder.value) > 0.1) {
        camera.fov = fovHolder.value
        camera.updateProjectionMatrix()
      }

      camera.lookAt(cameraTarget)

      // Notify parent on stage changes
      if (
        onStageChange &&
        currentKeyframe.stageName !== lastKeyframeNameRef.current
      ) {
        lastKeyframeNameRef.current = currentKeyframe.stageName
        onStageChange(currentKeyframe)
      }

      // Update scene geometries and lights
      sceneManager.update(activeProgress, elapsedTime, env)

      // Render
      renderer.render(scene, camera)
    }

    renderLoop(performance.now())

    // 8. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        if (width === 0 || height === 0) continue

        camera.aspect = width / height
        if (camera.aspect < 1.0) {
          camera.fov = fovHolder.value + (1.0 - camera.aspect) * 14
        } else {
          camera.fov = fovHolder.value
        }
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
    })
    resizeObserver.observe(container)

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      resizeObserver.disconnect()
      skyBackdrop.dispose()
      waterSurface.dispose()
      sceneManager.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [isReducedMotion, onStageChange])

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
    />
  )
}
