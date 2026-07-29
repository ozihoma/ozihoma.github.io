"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const orbs: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }> = []

    // Create orbs
    for (let i = 0; i < 5; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 30 + 20,
        color: i % 2 === 0 ? "#549642" : "#00ff00",
      })
    }

    let animationFrameId: number

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw orbs
      orbs.forEach((orb) => {
        // Update position
        orb.x += orb.vx
        orb.y += orb.vy

        // Bounce off walls
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
          orb.vx *= -1
        }
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
          orb.vy *= -1
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 1.5)
        gradient.addColorStop(0, `${orb.color}40`)
        gradient.addColorStop(1, `${orb.color}00`)

        ctx.fillStyle = gradient
        ctx.fillRect(orb.x - orb.radius * 1.5, orb.y - orb.radius * 1.5, orb.radius * 3, orb.radius * 3)

        // Draw orb
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()

        // Draw outline
        ctx.strokeStyle = `${orb.color}80`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 rounded-lg opacity-50 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
