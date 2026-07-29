"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, Sphere, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import RobotModel from "./3d-robot"

interface Scene3DProps {
  showRobot?: boolean
  particleCount?: number
}

function ParticleField({ count = 1000 }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const positionsArray = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8
      positions[i + 1] = (Math.random() - 0.5) * 8
      positions[i + 2] = (Math.random() - 0.5) * 8
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.002
      if (positions[i + 1] < -4) {
        positions[i + 1] = 4
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.z += 0.0001
  })

  return (
    <Points ref={pointsRef} positions={positionsArray} stride={3} frustumCulled={true}>
      <PointMaterial sizeAttenuation={true} size={0.05} color="#549642" sizeDecay={100} transparent />
    </Points>
  )
}

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group[]>([])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    cubesRef.current.forEach((cube, i) => {
      if (cube) {
        cube.rotation.x += 0.003 + i * 0.001
        cube.rotation.y += 0.004 + i * 0.001
        cube.rotation.z += 0.002
        cube.position.y += Math.sin(time * 0.3 + i) * 0.001
      }
    })
  })

  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <group
          key={i}
          ref={(el) => el && (cubesRef.current[i] = el)}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 3,
            Math.sin((i / 5) * Math.PI * 2) * 3,
            -2 + i * 0.5,
          ]}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial
              color="#3d7030"
              emissive="#549642"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0]} scale={[1.3, 1.3, 1.3]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshBasicMaterial color="#549642" transparent opacity={0.1} wireframe />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Scene3DContent({ showRobot = true, particleCount = 800 }: Scene3DProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#549642" />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#00ff00" distance={8} />

      {/* Background environment */}
      <fog attach="fog" args={["#0a0a0a", 5, 15]} />

      {/* Particle field */}
      <ParticleField count={particleCount} />

      {/* Floating cubes */}
      <FloatingCubes />

      {/* Main robot */}
      {showRobot && <RobotModel position={[0, -0.5, 0]} scale={1} />}

      {/* Orbit controls with mouse movement */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </>
  )
}

export default function Scene3D(props: Scene3DProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
        pixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      }}
      shadows
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Scene3DContent {...props} />
      </Suspense>
    </Canvas>
  )
}
