import * as THREE from 'three'
import type { TimeOfDayEnvironment } from './TimeOfDaySystem'

/**
 * Waterfront Bay Surface
 *
 * Implements a calm, expansive coastal bay water plane beneath the suspension bridge.
 * Features:
 * - Multi-octave gentle ripples
 * - Physically-inspired Fresnel reflection gradient with deep blue-grey base
 * - Localized sunset specular reflection trail (no whole-body red flood)
 * - Moonlit silver-blue specular sheen at night (no black hole)
 * - Restrained bridge guide-rail cyan reflection streaks
 * - Seamless atmospheric distance fog falloff
 * - 100% deterministic scroll-driven time-of-day color transitions
 */

export class WaterSurface {
  public mesh: THREE.Mesh
  private material: THREE.ShaderMaterial
  private geometry: THREE.PlaneGeometry

  constructor() {
    // Expansive bay plane: 500m across, 520m along bridge trajectory
    this.geometry = new THREE.PlaneGeometry(500, 520, 96, 96)

    this.material = new THREE.ShaderMaterial({
      transparent: false,
      depthWrite: true,
      uniforms: {
        uTime: { value: 0.0 },
        uProgress: { value: 0.0 },
        uWaterBaseColor: { value: new THREE.Color(0x111a28) },
        uReflectionColor: { value: new THREE.Color(0x8a6258) },
        uSunHighlightColor: { value: new THREE.Color(0xf5b070) },
        uSunHighlightIntensity: { value: 1.5 },
        uSunPos: { value: new THREE.Vector3(-16, 4.5, -80) },
        uMoonColor: { value: new THREE.Color(0x8cb5df) },
        uMoonIntensity: { value: 0.0 },
        uMoonPos: { value: new THREE.Vector3(18, -10, -50) },
        uBridgeCyanColor: { value: new THREE.Color(0x38bdf8) },
        uBridgeCyanIntensity: { value: 0.8 },
        uFogColor: { value: new THREE.Color(0x1c1e28) },
        uFogNear: { value: 25.0 },
        uFogFar: { value: 130.0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);

          // Calm, gentle bay surface swells (amplitude <= 0.035m to prevent clipping)
          float wave1 = sin(worldPos.x * 0.06 + uTime * 0.70 + worldPos.z * 0.025) * 0.022;
          float wave2 = cos(worldPos.z * 0.08 - uTime * 0.50 + worldPos.x * 0.035) * 0.016;
          worldPos.y += wave1 + wave2;

          vWorldPos = worldPos.xyz;

          // Compute perturbed normal from analytical wave derivatives
          float dHdx = 0.06 * cos(worldPos.x * 0.06 + uTime * 0.70 + worldPos.z * 0.025) * 0.022;
          float dHdz = -0.08 * sin(worldPos.z * 0.08 - uTime * 0.50 + worldPos.x * 0.035) * 0.016;
          vec3 displacedNormal = normalize(vec3(-dHdx, 1.0, -dHdz));
          vNormal = (modelMatrix * vec4(displacedNormal, 0.0)).xyz;

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec3 uWaterBaseColor;
        uniform vec3 uReflectionColor;
        uniform vec3 uSunHighlightColor;
        uniform float uSunHighlightIntensity;
        uniform vec3 uSunPos;
        uniform vec3 uMoonColor;
        uniform float uMoonIntensity;
        uniform vec3 uMoonPos;
        uniform vec3 uBridgeCyanColor;
        uniform float uBridgeCyanIntensity;
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;

        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec2 vUv;

        // Lightweight procedural ripple perturbation
        float ripple(vec2 p, float speed) {
          vec2 p1 = p * 0.8 + vec2(uTime * 0.03 * speed, uTime * 0.02 * speed);
          vec2 p2 = p * 1.5 - vec2(uTime * 0.025 * speed, uTime * 0.035 * speed);
          return sin(p1.x * 3.5 + p1.y * 2.8) * 0.5 + cos(p2.x * 4.2 - p2.y * 3.1) * 0.5;
        }

        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPos);

          // Fine surface ripple normal perturbation
          float r = ripple(vWorldPos.xz * 0.15, 1.0);
          float rFine = ripple(vWorldPos.xz * 0.40, 1.3) * 0.5;
          vec3 normal = normalize(vNormal + vec3((r + rFine) * 0.035, 0.0, (r - rFine) * 0.035));

          // 1. Fresnel Reflection (grazing angles show subtle sky/horizon reflection)
          float NdotV = max(dot(normal, viewDir), 0.0);
          float fresnel = clamp(pow(1.0 - NdotV, 4.0), 0.0, 1.0);

          // 2. Base Deep Slate-Blue Water Color (always visible, never pure black)
          vec3 waterCol = uWaterBaseColor;

          // 3. Sky Reflection Blend (restrained, no flat color flood)
          vec3 skyRefl = uReflectionColor;
          vec3 finalColor = mix(waterCol, skyRefl, fresnel * 0.45);

          // Subtle ambient water surface sheen to guarantee visual contrast from night sky
          finalColor += vec3(0.02, 0.032, 0.05) * (normal.y * 0.5 + 0.5);

          // 4. Localized Sunset Sun Specular Trail on the Water
          if (uSunPos.y > -2.0 && uSunHighlightIntensity > 0.02) {
            vec3 sunDir = normalize(uSunPos - vWorldPos);
            vec3 halfVecSun = normalize(viewDir + sunDir);
            float NdotH = max(dot(normal, halfVecSun), 0.0);

            float sunStreak = pow(NdotH, 32.0);
            float sunSpread = pow(NdotH, 8.0) * 0.2;
            // Localized strictly to corridor beneath sun position
            float sunCorridor = 1.0 - smoothstep(3.0, 28.0, abs(vWorldPos.x - uSunPos.x * 0.35));
            vec3 sunHighlight = uSunHighlightColor * (sunStreak * 1.5 + sunSpread) * sunCorridor * uSunHighlightIntensity;
            finalColor += sunHighlight;
          }

          // 5. Moonlit Specular Glint & Sheen at Night (Narrow, softly broken reflection)
          if (uMoonIntensity > 0.02 && uMoonPos.y > -2.0) {
            vec3 moonDir = normalize(uMoonPos - vWorldPos);
            vec3 halfVecMoon = normalize(viewDir + moonDir);
            float NdotHMoon = max(dot(normal, halfVecMoon), 0.0);

            // Shimmering water highlights along the reflection corridor stretching toward the viewer
            float moonGlisten = pow(NdotHMoon, 32.0) * (1.1 + 0.6 * rFine);
            float moonStreak = pow(NdotHMoon, 16.0) * (0.85 + 0.35 * rFine);
            float moonSpread = pow(NdotHMoon, 4.5) * 0.28;

            // Longitudinal reflection column stretching from city horizon toward camera
            float moonCorridor = 1.0 - smoothstep(1.5, 34.0, abs(vWorldPos.x - uMoonPos.x * 0.25));
            vec3 moonHighlight = uMoonColor * (moonGlisten * 1.8 + moonStreak * 1.2 + moonSpread) * moonCorridor * (uMoonIntensity * 1.1);
            finalColor += moonHighlight;

            // Ambient cool moonlight fill across bay water surface
            finalColor += uMoonColor * (0.05 * uMoonIntensity) * (normal.y * 0.4 + 0.6);
          }

          // 6. Restrained Cyan Bridge Under-Glow Reflection (near bridge deck corridor x = [-3, 3])
          float bridgeCorridor = 1.0 - smoothstep(0.5, 6.0, abs(vWorldPos.x));
          float cyanGlint = pow(max(dot(normal, vec3(0.0, 0.95, 0.3)), 0.0), 16.0);
          finalColor += uBridgeCyanColor * cyanGlint * bridgeCorridor * (uBridgeCyanIntensity * 0.28);

          // 7. Distant City Skyline Water Reflection Sheen (across the bay harbor)
          if (vWorldPos.z < -60.0) {
            float cityDepth = smoothstep(-55.0, -165.0, vWorldPos.z);
            float cityCorridor = 1.0 - smoothstep(8.0, 95.0, abs(vWorldPos.x));
            float cityGlint = pow(max(dot(normal, vec3(0.0, 0.94, -0.34)), 0.0), 10.0);
            vec3 cityReflectionColor = mix(vec3(0.98, 0.92, 0.78), vec3(0.48, 0.78, 0.96), 0.35);
            finalColor += cityReflectionColor * (cityGlint * 0.55 + 0.04 * (0.5 + 0.5 * r)) * cityCorridor * cityDepth;
          }

          // 8. Atmospheric Distance Fog Falloff (Seamless Horizon Dissolve)
          float dist = length(cameraPosition - vWorldPos);
          float fogFactor = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
          finalColor = mix(finalColor, uFogColor, fogFactor);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI / 2
    // Positioned below road deck (y = 0.0 to 0.38) and above caisson bottoms (y = -3.5)
    this.mesh.position.set(0, -1.65, -140.0)
    this.mesh.receiveShadow = true
  }

  public update(env: TimeOfDayEnvironment, elapsedTime: number, isReducedMotion: boolean) {
    if (!isReducedMotion) {
      this.material.uniforms.uTime.value = elapsedTime
    }
    this.material.uniforms.uProgress.value = env.progress
    this.material.uniforms.uWaterBaseColor.value.copy(env.waterBaseColor)
    this.material.uniforms.uReflectionColor.value.copy(env.waterReflectionColor)
    this.material.uniforms.uSunHighlightColor.value.copy(env.waterSunHighlightColor)
    this.material.uniforms.uSunHighlightIntensity.value = env.waterSunHighlightIntensity
    this.material.uniforms.uSunPos.value.copy(env.sunPosition)
    this.material.uniforms.uMoonColor.value.copy(env.moonColor)
    this.material.uniforms.uMoonIntensity.value = env.moonIntensity
    this.material.uniforms.uMoonPos.value.copy(env.moonPosition)
    this.material.uniforms.uBridgeCyanIntensity.value = env.bridgeCyanIntensity
    this.material.uniforms.uFogColor.value.copy(env.fogColor)
    this.material.uniforms.uFogNear.value = env.fogNear
    this.material.uniforms.uFogFar.value = env.fogFar
  }

  public dispose() {
    this.geometry.dispose()
    this.material.dispose()
  }
}
