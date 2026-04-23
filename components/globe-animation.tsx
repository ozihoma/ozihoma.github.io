'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003 // Ultra-smooth rotation
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshPhongMaterial
        color="#06b6d4"
        emissive="#0891b2"
        emissiveIntensity={0.2}
        wireframe={false}
        shininess={30}
      />
    </Sphere>
  )
}

export default function GlobeAnimation() {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          precision: 'lowp',
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Globe />
      </Canvas>
    </div>
  )
}
