"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Sphere, Float } from "@react-three/drei"
import * as THREE from "three"

interface RobotProps {
  position: [number, number, number]
  scale?: number
}

function RobotModel({ position, scale = 1 }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Head tracking (looks at mouse)
    const headTarget = new THREE.Vector3(mousePos.current.x * 2, mousePos.current.y * 2, 3)
    const headCurrentPos = new THREE.Vector3().setFromMatrixPosition(groupRef.current.matrixWorld)
    const headDirection = new THREE.Vector3().subVectors(headTarget, headCurrentPos).normalize()

    // Body oscillation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.3 + position[1]
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1

    // Look around
    groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.15
    groupRef.current.rotation.y = headDirection.x * 0.5 + Math.cos(time * 0.2) * 0.2
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main body cube */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.3]} />
        <meshStandardMaterial color="#549642" emissive="#3d7030" emissiveIntensity={0.3} metalness={0.6} />
      </mesh>

      {/* Head sphere */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#549642" emissive="#3d7030" emissiveIntensity={0.4} metalness={0.7} />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.12, 1.35, 0.25]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.12, 1.35, 0.25]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
      </mesh>

      {/* Left arm */}
      <group position={[-0.25, 0.7, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#3d7030" metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.35, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#549642" emissive="#00ff00" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.25, 0.7, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#3d7030" metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.35, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#549642" emissive="#00ff00" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Left leg */}
      <group position={[-0.12, -0.1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.4, 16]} />
          <meshStandardMaterial color="#3d7030" metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#549642" />
        </mesh>
      </group>

      {/* Right leg */}
      <group position={[0.12, -0.1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.4, 16]} />
          <meshStandardMaterial color="#3d7030" metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#549642" />
        </mesh>
      </group>

      {/* Energy orbs around robot */}
      <EnergyOrbs />
    </group>
  )
}

function EnergyOrbs() {
  const orbsRef = useRef<THREE.Group[]>([])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    orbsRef.current.forEach((orb, i) => {
      const angle = (time * 0.5 + (i / 3) * Math.PI * 2) % (Math.PI * 2)
      const radius = 0.8
      orb.position.x = Math.cos(angle) * radius
      orb.position.z = Math.sin(angle) * radius
      orb.position.y = Math.sin(time * 0.6 + i) * 0.2
    })
  })

  return (
    <>
      {[0, 1, 2].map((i) => (
        <group key={i} ref={(el) => el && (orbsRef.current[i] = el)} position={[0.8, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={0.6}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#00ff00" transparent opacity={0.2} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  )
}

export default RobotModel
