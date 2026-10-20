import * as THREE from 'three'
import type { TimeOfDayEnvironment } from './TimeOfDaySystem'

/**
 * Atmospheric Sky & Celestial Backdrop
 *
 * Renders an expansive sky gradient dome encompassing the waterfront crossing.
 * Features:
 * - Seamless atmospheric horizon dissolution matching water fog
 * - Horizon transition: warm muted peach / dusty rose -> slate blue -> midnight navy
 * - Controlled celestial sun disc that sets as evening progresses
 * - Rising moon disc that emerges during blue hour and casts cool moonlight at night
 * - 100% deterministic scroll synchronization
 */

export class SkyBackdrop {
  public mesh: THREE.Mesh
  private material: THREE.ShaderMaterial
  private geometry: THREE.SphereGeometry

  constructor() {
    // 320m radius sphere encompassing the entire 130m bridge crossing
    this.geometry = new THREE.SphereGeometry(320, 32, 24)

    this.material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uSkyTopColor: { value: new THREE.Color(0x161c2e) },
        uSkyBottomColor: { value: new THREE.Color(0xd8926c) },
        uFogColor: { value: new THREE.Color(0x1c1e28) },
        uSunPos: { value: new THREE.Vector3(-16, 4.5, -80) },
        uSunColor: { value: new THREE.Color(0xf5a65b) },
        uSunIntensity: { value: 2.2 },
        uMoonPos: { value: new THREE.Vector3(14, 18, -78) },
        uMoonColor: { value: new THREE.Color(0x93bce0) },
        uMoonIntensity: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        varying vec3 vViewDir;

        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vViewDir = normalize(worldPos.xyz - cameraPosition);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uSkyTopColor;
        uniform vec3 uSkyBottomColor;
        uniform vec3 uFogColor;
        uniform vec3 uSunPos;
        uniform vec3 uSunColor;
        uniform float uSunIntensity;
        uniform vec3 uMoonPos;
        uniform vec3 uMoonColor;
        uniform float uMoonIntensity;

        varying vec3 vWorldPos;
        varying vec3 vViewDir;

        void main() {
          // Normalize altitude relative to horizon (y = 0)
          // Range: -20m (below water horizon) to +220m (zenith)
          float normY = clamp((vWorldPos.y + 10.0) / 180.0, 0.0, 1.0);

          // 1. Base Gradient: Seamless blend from uFogColor at the horizon up into uSkyTopColor
          float t = pow(normY, 0.65);
          vec3 skyColor = mix(uFogColor, uSkyTopColor, t);

          // 2. Warm Horizon Glow Band: Smooth atmospheric scattering above horizon
          float horizonBand = smoothstep(0.0, 0.08, normY) * (1.0 - smoothstep(0.12, 0.65, normY));
          skyColor = mix(skyColor, uSkyBottomColor, horizonBand * 0.75);

          // 3. Atmospheric Celestial Sun Corona Glow in Sky Dome
          vec3 dirToSun = normalize(uSunPos);
          float cosAngleSun = dot(vViewDir, dirToSun);
          if (cosAngleSun > 0.0 && uSunIntensity > 0.05 && uSunPos.y > -8.0) {
            float sunGlow = pow(max(cosAngleSun, 0.0), 32.0) * 0.35 + pow(max(cosAngleSun, 0.0), 8.0) * 0.12;
            skyColor += uSunColor * sunGlow * (uSunIntensity * 0.8);
          }

          // 4. Atmospheric Celestial Moon Corona Glow in Sky Dome
          vec3 dirToMoon = normalize(uMoonPos);
          float cosAngleMoon = dot(vViewDir, dirToMoon);
          if (cosAngleMoon > 0.0 && uMoonIntensity > 0.05 && uMoonPos.y > -4.0) {
            float moonHalo = pow(max(cosAngleMoon, 0.0), 28.0) * 0.25 + pow(max(cosAngleMoon, 0.0), 6.0) * 0.08;
            skyColor += uMoonColor * moonHalo * (uMoonIntensity * 0.6);
          }

          gl_FragColor = vec4(skyColor, 1.0);
        }
      `,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(0, -10, -55)
    this.mesh.renderOrder = -100
  }

  public update(env: TimeOfDayEnvironment) {
    this.material.uniforms.uSkyTopColor.value.copy(env.skyTopColor)
    this.material.uniforms.uSkyBottomColor.value.copy(env.skyBottomColor)
    this.material.uniforms.uFogColor.value.copy(env.fogColor)
    this.material.uniforms.uSunPos.value.copy(env.sunPosition)
    this.material.uniforms.uSunColor.value.copy(env.sunColor)
    this.material.uniforms.uSunIntensity.value = env.sunIntensity
    this.material.uniforms.uMoonPos.value.copy(env.moonPosition)
    this.material.uniforms.uMoonColor.value.copy(env.moonColor)
    this.material.uniforms.uMoonIntensity.value = env.moonIntensity
  }

  public dispose() {
    this.geometry.dispose()
    this.material.dispose()
  }
}
