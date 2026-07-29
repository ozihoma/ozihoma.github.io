'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Procedurally generated realistic human-robot hybrid character
function HumanRobotCharacter() {
  const groupRef = useRef<THREE.Group>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Build procedural character
  useEffect(() => {
    if (!groupRef.current) return

    // Clear existing children
    groupRef.current.children.forEach((child) => groupRef.current?.remove(child))

    // Create head
    const headGeometry = new THREE.SphereGeometry(1, 32, 32)
    const skinMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b6f47,
      emissive: 0x1a1a1a,
      shininess: 20,
    })
    const head = new THREE.Mesh(headGeometry, skinMaterial)
    head.position.y = 1.5
    head.scale.set(0.9, 1, 0.85)
    groupRef.current.add(head)

    // Create metallic face plate (robotic left side)
    const faceGeometry = new THREE.PlaneGeometry(0.8, 0.9)
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.2,
    })
    const facePlate = new THREE.Mesh(faceGeometry, metalMaterial)
    facePlate.position.z = 0.86
    facePlate.position.x = -0.2
    facePlate.position.y = 1.5
    groupRef.current.add(facePlate)

    // Create LED eyes (robotic)
    const eyeGeometry = new THREE.CircleGeometry(0.15, 16)
    const ledMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      emissive: 0x00ff00,
    })
    const leftEye = new THREE.Mesh(eyeGeometry, ledMaterial)
    leftEye.position.set(-0.35, 1.8, 0.90)
    groupRef.current.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, ledMaterial)
    rightEye.position.set(-0.05, 1.8, 0.90)
    groupRef.current.add(rightEye)

    // Glow effect for eyes
    const glowGeometry = new THREE.CircleGeometry(0.18, 16)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.3,
    })
    const eyeGlow1 = new THREE.Mesh(glowGeometry, glowMaterial)
    eyeGlow1.position.set(-0.35, 1.8, 0.89)
    groupRef.current.add(eyeGlow1)

    const eyeGlow2 = new THREE.Mesh(glowGeometry, glowMaterial)
    eyeGlow2.position.set(-0.05, 1.8, 0.89)
    groupRef.current.add(eyeGlow2)

    // Create neck (hybrid)
    const neckGeometry = new THREE.CylinderGeometry(0.35, 0.4, 0.4, 16)
    const neckMaterial = new THREE.MeshPhongMaterial({
      color: 0x6b5a42,
      emissive: 0x0a0a0a,
    })
    const neck = new THREE.Mesh(neckGeometry, neckMaterial)
    neck.position.y = 0.85
    groupRef.current.add(neck)

    // Robotic neck segments
    for (let i = 0; i < 3; i++) {
      const segmentGeometry = new THREE.TorusGeometry(0.38, 0.08, 8, 16)
      const segmentMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.6,
        roughness: 0.3,
      })
      const segment = new THREE.Mesh(segmentGeometry, segmentMaterial)
      segment.rotation.x = Math.PI / 2
      segment.position.y = 0.8 - i * 0.12
      groupRef.current.add(segment)
    }

    // Create torso (human-like)
    const torsoGeometry = new THREE.CylinderGeometry(0.5, 0.55, 1.2, 16)
    const torsoMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      emissive: 0x0a0a0a,
    })
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial)
    torso.position.y = -0.1
    groupRef.current.add(torso)

    // Robotic chest panel
    const chestGeometry = new THREE.BoxGeometry(0.7, 0.8, 0.15)
    const chestMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.5,
      roughness: 0.4,
    })
    const chest = new THREE.Mesh(chestGeometry, chestMaterial)
    chest.position.z = 0.45
    chest.position.y = 0.05
    groupRef.current.add(chest)

    // Glowing chest details
    for (let i = 0; i < 3; i++) {
      const detailGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.02)
      const detailMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
      })
      const detail = new THREE.Mesh(detailGeometry, detailMaterial)
      detail.position.set(-0.18 + i * 0.2, 0.05, 0.5)
      groupRef.current.add(detail)
    }

    // Left arm (human side)
    const leftArmGeometry = new THREE.CylinderGeometry(0.18, 0.16, 0.9, 16)
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b6f47,
      emissive: 0x0a0a0a,
    })
    const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial)
    leftArm.position.set(-0.6, 0.35, 0)
    leftArm.rotation.z = 0.3
    groupRef.current.add(leftArm)

    // Right arm (robotic side)
    const rightArmGeometry = new THREE.CylinderGeometry(0.16, 0.14, 0.95, 16)
    const metalArmMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.7,
      roughness: 0.3,
    })
    const rightArm = new THREE.Mesh(rightArmGeometry, metalArmMaterial)
    rightArm.position.set(0.6, 0.35, 0)
    rightArm.rotation.z = -0.3
    groupRef.current.add(rightArm)

    // Robotic right hand
    const handGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.2)
    const roboticHandMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    })
    const rightHand = new THREE.Mesh(handGeometry, roboticHandMaterial)
    rightHand.position.set(0.65, -0.4, 0)
    groupRef.current.add(rightHand)

    // Robotic fingers
    for (let i = 0; i < 4; i++) {
      const fingerGeometry = new THREE.BoxGeometry(0.08, 0.25, 0.08)
      const finger = new THREE.Mesh(fingerGeometry, roboticHandMaterial)
      finger.position.set(0.65 - 0.12 + i * 0.08, -0.65, 0)
      groupRef.current.add(finger)
    }

    // Create legs
    const leftLegGeometry = new THREE.CylinderGeometry(0.18, 0.16, 1, 16)
    const legMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      emissive: 0x0a0a0a,
    })
    const leftLeg = new THREE.Mesh(leftLegGeometry, legMaterial)
    leftLeg.position.set(-0.25, -1.2, 0)
    groupRef.current.add(leftLeg)

    const rightLeg = new THREE.Mesh(leftLegGeometry, legMaterial)
    rightLeg.position.set(0.25, -1.2, 0)
    groupRef.current.add(rightLeg)

    // Robotic feet
    const footGeometry = new THREE.BoxGeometry(0.4, 0.15, 0.6)
    const footMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.6,
      roughness: 0.4,
    })
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial)
    leftFoot.position.set(-0.25, -1.75, 0)
    groupRef.current.add(leftFoot)

    const rightFoot = new THREE.Mesh(footGeometry, footMaterial)
    rightFoot.position.set(0.25, -1.75, 0)
    groupRef.current.add(rightFoot)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Head follows mouse
      groupRef.current.rotation.y = mousePos.x * 0.4
      groupRef.current.rotation.x = mousePos.y * 0.2

      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      // Rotating chest details
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          if ((child.material as any).emissive?.getHex?.() === 0x00ff00) {
            child.rotation.z += 0.02
          }
        }
      })
    }
  })

  return <group ref={groupRef} />
}

export function HumanRobotCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 3, 5]} intensity={0.5} color={0x00ff00} />
      <pointLight position={[5, -3, 5]} intensity={0.4} color={0x549642} />

      <HumanRobotCharacter />
      <Preload all />
    </Canvas>
  )
}

export default function HumanRobotBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 3, 5]} intensity={0.6} color={0x00ff00} />
        <pointLight position={[5, -3, 5]} intensity={0.5} color={0x549642} />

        <HumanRobotCharacter />
        <Preload all />
      </Canvas>

      {/* Fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-[#0a0a0a]/40 to-[#0a0a0a]/70 pointer-events-none" />
    </div>
  )
}
