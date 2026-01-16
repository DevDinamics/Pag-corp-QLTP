import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ================= CONFIGURACIÓN "QUALTOP PRO" =================
const GRID_WIDTH = 110       // Ancho del horizonte
const GRID_DEPTH = 60        // Profundidad de campo
const GRID_DENSITY = 0.7     // Densidad de puntos (calidad)
const POINT_COUNT = 14000    // Cantidad de partículas (Alta fidelidad)
const FLOATING_COUNT = 300   // Partículas de "polvo" flotante

// ================= PALETA DE COLORES =================
const COLOR_PRIMARY = new THREE.Color('#FF4D00') // Naranja Qualtop Intenso
const COLOR_SECONDARY = new THREE.Color('#FF8C00') // Naranja Ámbar (Brillo)

// ================= SHADER PERSONALIZADO (Puntos Redondos) =================
// Esto hace que los puntos se vean como esferas perfectas y no cuadrados
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
  
  // Flag para UX: Evita que la montaña aparezca sola en el centro al cargar
  const mouseMoved = useRef(false) 
  
  const { mouse } = useThree()

  // 1. GEOMETRÍA DEL SUELO (RED NEURONAL)
  const gridData = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3)
    const colors = new Float32Array(POINT_COUNT * 3)
    const initialY = new Float32Array(POINT_COUNT)

    let i = 0
    for (let ix = 0; ix < (GRID_WIDTH / GRID_DENSITY); ix++) {
      for (let iz = 0; iz < (GRID_DEPTH / GRID_DENSITY); iz++) {
        if (i >= POINT_COUNT) break
        
        // Centramos la grilla
        const x = (ix * GRID_DENSITY) - (GRID_WIDTH / 2)
        const z = (iz * GRID_DENSITY) - (GRID_DEPTH / 2) - 15 
        const y = -2 

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
        initialY[i] = y

        // Calculamos intensidad basada en la distancia al centro (Vignette)
        const distFromCenter = Math.sqrt(x*x + z*z)
        const intensity = Math.max(0.1, 1.2 - distFromCenter / 35)
        
        // Mezcla de colores aleatoria para realismo
        const c = new THREE.Color().copy(COLOR_PRIMARY).lerp(COLOR_SECONDARY, Math.random() * 0.5)
        
        colors[i * 3] = c.r * intensity
        colors[i * 3 + 1] = c.g * intensity
        colors[i * 3 + 2] = c.b * intensity
        
        i++
      }
    }
    return { positions, colors, initialY }
  }, [])

  // 2. GEOMETRÍA FLOTANTE (AMBIENTE)
  const floatingData = useMemo(() => {
    const positions = new Float32Array(FLOATING_COUNT * 3)
    const speeds = new Float32Array(FLOATING_COUNT)
    
    for (let i = 0; i < FLOATING_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * GRID_WIDTH
      positions[i * 3 + 1] = Math.random() * 15 - 5 
      positions[i * 3 + 2] = (Math.random() - 0.5) * GRID_DEPTH - 10
      speeds[i] = 0.02 + Math.random() * 0.05 // Velocidad vertical variable
    }
    return { positions, speeds }
  }, [])

  // ---------------------------------------------------------
  // LOOP DE ANIMACIÓN (60 FPS)
  // ---------------------------------------------------------
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Detectar primer movimiento del usuario
    if (!mouseMoved.current && (mouse.x !== 0 || mouse.y !== 0)) {
      mouseMoved.current = true
    }

    // Mapear mouse a coordenadas del mundo 3D
    const mX = mouse.x * (GRID_WIDTH / 2)
    const mZ = -mouse.y * (GRID_DEPTH / 2)

    // A) ANIMACIÓN DEL SUELO
    if (gridRef.current) {
      const pos = gridRef.current.geometry.attributes.position.array
      const iy = gridData.initialY
      
      for (let i = 0; i < POINT_COUNT; i++) {
        const i3 = i * 3
        const x = pos[i3]
        const z = pos[i3 + 2]
        
        // 1. Ondas Base (Respiración de la red)
        const wave1 = Math.sin(x * 0.15 + t * 0.8) * 0.8
        const wave2 = Math.cos(z * 0.2 + t * 0.5) * 0.8
        
        let mouseInfluence = 0
        
        // 2. Interacción del Mouse (Solo si se movió)
        if (mouseMoved.current) {
          const dx = x - mX
          const dz = z - mZ
          const dist = Math.sqrt(dx * dx + dz * dz)
          const radius = 12 // Radio de efecto
          
          if (dist < radius) {
            // Curva suave de elevación
            mouseInfluence = Math.pow(1 - dist / radius, 2) * 2.5
          }
        }
        
        // Aplicar altura final
        pos[i3 + 1] = iy[i] + wave1 + wave2 + mouseInfluence
      }
      gridRef.current.geometry.attributes.position.needsUpdate = true
    }

    // B) ANIMACIÓN FLOTANTE (Partículas subiendo)
    if (floatingRef.current) {
      const pos = floatingRef.current.geometry.attributes.position.array
      const speeds = floatingData.speeds
      
      for (let i = 0; i < FLOATING_COUNT; i++) {
        const i3 = i * 3
        pos[i3 + 1] += speeds[i]
        
        // Reiniciar partículas cuando suben mucho
        if (pos[i3 + 1] > 10) {
          pos[i3 + 1] = -5
          pos[i3] = (Math.random() - 0.5) * GRID_WIDTH
        }
      }
      floatingRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* CAPA 1: RED NEURONAL (SUELO) */}
      <points ref={gridRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            array={gridData.positions} 
            count={POINT_COUNT} 
            itemSize={3}
            usage={THREE.DynamicDrawUsage} 
          />
          <bufferAttribute 
            attach="attributes-color" 
            array={gridData.colors} 
            count={POINT_COUNT} 
            itemSize={3} 
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.18} 
          vertexColors 
          transparent 
          opacity={0.9} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending}
          onBeforeCompile={ROUND_POINT_SHADER.onBeforeCompile}
        />
      </points>

      {/* CAPA 2: DATOS FLOTANTES (AMBIENTE) */}
      <points ref={floatingRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            array={floatingData.positions} 
            count={FLOATING_COUNT} 
            itemSize={3}
            usage={THREE.DynamicDrawUsage} 
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#FF8C00" 
          size={0.15} 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending}
          onBeforeCompile={ROUND_POINT_SHADER.onBeforeCompile}
        />
      </points>
    </group>
  )
}