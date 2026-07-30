'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Particle system that spans entire page
function ParticleField() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (!particlesRef.current) return

    const count = 2000
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      velocities[i * 3] = (Math.random() - 0.5) * 0.03
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03
    }

    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    ;(particlesRef.current.userData as any).velocities = velocities
  }, [])

  useFrame(() => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const velocities = (particlesRef.current.userData as any).velocities

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i]
      positions[i + 1] += velocities[i + 1]
      positions[i + 2] += velocities[i + 2]

      // Wrap around
      if (positions[i] > 15) positions[i] = -15
      if (positions[i] < -15) positions[i] = 15
      if (positions[i + 1] > 15) positions[i + 1] = -15
      if (positions[i + 1] < -15) positions[i + 1] = 15
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" count={2000} array={new Float32Array(6000)} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.3} sizeAttenuation={true} color={0x00ff00} opacity={1} transparent={false} wireframe={false} />
    </points>
  )
}

// Rotating code helix/DNA strand visualization
function CodeHelix() {
  const helixRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (helixRef.current) {
      helixRef.current.rotation.z += 0.001
      helixRef.current.rotation.x += 0.0005
      helixRef.current.position.y += Math.sin(Date.now() * 0.0001) * 0.001
    }
  })

  return (
    <group ref={helixRef}>
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 4
        const x = Math.cos(angle) * 3
        const y = (i / 30) * 2 - 1
        const z = Math.sin(angle) * 3

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={0x00ff00} emissive={0x00ff00} metalness={0.9} roughness={0.1} wireframe={false} />
          </mesh>
        )
      })}
    </group>
  )
}

// Floating code symbols and matrix effects
function FloatingCode() {
  const codeGroupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (codeGroupRef.current) {
      codeGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3
      codeGroupRef.current.rotation.y += 0.0005
    }
  })

  const codeSymbols = ['{ }', '< >', '[ ]', '( )', '* *', '= =', '& &', '| |']

  return (
    <group ref={codeGroupRef} position={[0, 0, -5]}>
      {codeSymbols.map((symbol, i) => {
        const angle = (i / codeSymbols.length) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? 0x549642 : 0x00ff00}
              emissive={i % 2 === 0 ? 0x234f1e : 0x00aa00}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function FullPage3DBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false, dpr: [1, 1.5], preserveDrawingBuffer: true }}
        style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}
        dpr={[1, 1.5]}
        onCreated={(state) => {
          state.scene.background = new THREE.Color(0x0a0a0a)
          state.scene.fog = new THREE.Fog(0x0a0a0a, 15, 40)
        }}
      >
        {/* Lighting setup for depth */}
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, 5]} intensity={1.2} color={0x549642} />
        <pointLight position={[0, 10, -10]} intensity={1} color={0x00ff00} />

        {/* Background layers */}
        <ParticleField />
        <CodeHelix />
        <FloatingCode />
      </Canvas>

      {/* Multiple gradient overlays for visual depth - kept subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/5 to-[#0a0a0a]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/5 via-transparent to-[#0a0a0a]/5" />
      </div>

      {/* Scanlines effect for retro gaming aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.08) 0px,
            rgba(0, 0, 0, 0.08) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  )
}
