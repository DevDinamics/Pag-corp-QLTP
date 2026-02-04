import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ================= CONFIGURACIÓN =================
const GRID_WIDTH = 160       
const GRID_DEPTH = 80       
const GRID_DENSITY = 0.7    
const POINT_COUNT = 24000    
const FLOATING_COUNT = 400   

const COLOR_PRIMARY = new THREE.Color('#FF2A00') 
const COLOR_SECONDARY = new THREE.Color('#FF5500') 

const ROUND_POINT_SHADER = {
  onBeforeCompile: (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <clipping_planes_fragment>`,
      `
      #include <clipping_planes_fragment>
      vec2 c = 2.0 * gl_PointCoord - 1.0;
      if (dot(c, c) > 1.0) discard;
      `
    )
  }
}

export default function NeuralNetwork() {
  const gridRef = useRef()
  const floatingRef = useRef()
  
  // Referencias para la lógica del mouse
  const smoothedMouse = useRef(new THREE.Vector3(0, -8, 0)) // Guardamos X, Y, Z (Mundo)
  const mouseMoved = useRef(false)
  
  // Herramientas para el Raycasting (Detectar profundidad real)
  // Las creamos una sola vez para no saturar la memoria
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 8), []) // Plano a la altura y=-8
  const target = useMemo(() => new THREE.Vector3(), [])

  const { camera, mouse } = useThree()

  // 1. GEOMETRÍA DEL SUELO
  const gridData = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3)
    const colors = new Float32Array(POINT_COUNT * 3)
    const initialY = new Float32Array(POINT_COUNT)

    let i = 0
    for (let ix = 0; ix < (GRID_WIDTH / GRID_DENSITY); ix++) {
      for (let iz = 0; iz < (GRID_DEPTH / GRID_DENSITY); iz++) {
        if (i >= POINT_COUNT) break
        
        const x = (ix * GRID_DENSITY) - (GRID_WIDTH / 2)
        const z = (iz * GRID_DENSITY) - (GRID_DEPTH / 2) + 20 
        const y = -8

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
        initialY[i] = y

        const distFromCenter = Math.sqrt(x*x + z*z)
        const intensity = Math.max(0.2, 1.3 - distFromCenter / 60) 

        const c = new THREE.Color().copy(COLOR_PRIMARY).lerp(COLOR_SECONDARY, Math.random() * 0.5)
        
        colors[i * 3] = c.r * intensity
        colors[i * 3 + 1] = c.g * intensity
        colors[i * 3 + 2] = c.b * intensity
        
        i++
      }
    }
    return { positions, colors, initialY }
  }, [])

  // 2. GEOMETRÍA FLOTANTE
  const floatingData = useMemo(() => {
    const positions = new Float32Array(FLOATING_COUNT * 3)
    const speeds = new Float32Array(FLOATING_COUNT)
    for (let i = 0; i < FLOATING_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * GRID_WIDTH
      positions[i * 3 + 1] = Math.random() * 15 - 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * GRID_DEPTH 
      speeds[i] = 0.02 + Math.random() * 0.05
    }
    return { positions, speeds }
  }, [])

  // LOOP DE ANIMACIÓN
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // --- LÓGICA DE MOUSE CORREGIDA (RAYCASTING) ---
    // Lanzamos un rayo desde la cámara hacia donde apunta el mouse
    raycaster.setFromCamera(mouse, camera)
    
    // Calculamos dónde choca ese rayo con el "suelo" (y=-8)
    // Esto nos da la posición exacta en el mundo 3D, sin importar la profundidad
    if (raycaster.ray.intersectPlane(plane, target)) {
        if (!mouseMoved.current) {
            smoothedMouse.current.copy(target) // Sincronización inicial
            mouseMoved.current = true
        } else {
            // LERP: Movemos el punto suavemente hacia el destino (0.1 = velocidad de suavizado)
            smoothedMouse.current.x += (target.x - smoothedMouse.current.x) * 0.1
            smoothedMouse.current.z += (target.z - smoothedMouse.current.z) * 0.1
        }
    }

    // Coordenadas reales del mouse en el mundo 3D
    const mX = smoothedMouse.current.x
    const mZ = smoothedMouse.current.z

    // A) ANIMACIÓN DEL SUELO
    if (gridRef.current) {
      const pos = gridRef.current.geometry.attributes.position.array
      const iy = gridData.initialY
      
      const radius = 15 
      const maxElevation = 2.5 

      for (let i = 0; i < POINT_COUNT; i++) {
        const i3 = i * 3
        const x = pos[i3]
        const z = pos[i3 + 2]
        
        const wave1 = Math.sin(x * 0.15 + t * 0.8) * 0.8
        const wave2 = Math.cos(z * 0.2 + t * 0.5) * 0.8
        
        let mouseInfluence = 0
        
        if (mouseMoved.current) {
          // CHECK DE RENDIMIENTO:
          // Solo calculamos la distancia real si estamos cerca del mouse (bounding box simple)
          // Esto evita hacer 24,000 raíces cuadradas si el punto está muy lejos.
          if (Math.abs(x - mX) < radius && Math.abs(z - mZ) < radius) {
              const dx = x - mX
              const dz = z - mZ
              const distSq = dx * dx + dz * dz // Distancia al cuadrado (más rápido)
              
              if (distSq < radius * radius) {
                const dist = Math.sqrt(distSq)
                const factor = 1 - dist / radius
                mouseInfluence = (factor * factor) * maxElevation
              }
          }
        }
        
        pos[i3 + 1] = iy[i] + wave1 + wave2 + mouseInfluence
      }
      gridRef.current.geometry.attributes.position.needsUpdate = true
    }

    // B) ANIMACIÓN FLOTANTE
    if (floatingRef.current) {
      const pos = floatingRef.current.geometry.attributes.position.array
      const speeds = floatingData.speeds
      for (let i = 0; i < FLOATING_COUNT; i++) {
        const i3 = i * 3
        pos[i3 + 1] += speeds[i]
        if (pos[i3 + 1] > 10) {
          pos[i3 + 1] = -5
          pos[i3] = (Math.random() - 0.5) * GRID_WIDTH
        }
      }
      floatingRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group rotation={[-0.2, 0, 0]}>
      <points ref={gridRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={gridData.positions} count={POINT_COUNT} itemSize={3} usage={THREE.DynamicDrawUsage} />
          <bufferAttribute attach="attributes-color" array={gridData.colors} count={POINT_COUNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.22} 
          vertexColors 
          transparent={false} 
          blending={THREE.NormalBlending} 
          sizeAttenuation 
          onBeforeCompile={ROUND_POINT_SHADER.onBeforeCompile}
        />
      </points>

      <points ref={floatingRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={floatingData.positions} count={FLOATING_COUNT} itemSize={3} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial 
          color="#FF3300" 
          size={0.18} 
          transparent={false}
          blending={THREE.NormalBlending}
          sizeAttenuation 
          onBeforeCompile={ROUND_POINT_SHADER.onBeforeCompile}
        />
      </points>
    </group>
  )
}