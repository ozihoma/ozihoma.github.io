"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    // Globe parameters
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 70
    let rotation = 0
    const isDark = theme === "dark"

    // Create latitude and longitude lines
    const latitudes = 8
    const longitudes = 12

    // Animation function
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Rotate globe
      rotation += 0.005

      // Draw globe
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? "rgba(13, 25, 42, 0.5)" : "rgba(200, 220, 240, 0.5)"
      ctx.fill()

      // Draw latitude lines
      for (let i = 1; i < latitudes; i++) {
        const latRadius = (radius * i) / latitudes
        ctx.beginPath()
        ctx.arc(centerX, centerY, latRadius, 0, Math.PI * 2)
        ctx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.3)"
        ctx.stroke()
      }

      // Draw longitude lines
      for (let i = 0; i < longitudes; i++) {
        const angle = (i * Math.PI * 2) / longitudes + rotation
        ctx.beginPath()
        ctx.ellipse(centerX, centerY, radius, radius * 0.2, 0, 0, Math.PI * 2)
        ctx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.3)"
        ctx.stroke()

        // Rotate for next longitude
        ctx.rotate(angle)
      }

      // Draw a few random dots to represent locations
      const numDots = 15
      for (let i = 0; i < numDots; i++) {
        const dotAngle = Math.random() * Math.PI * 2
        const dotRadius = Math.random() * radius * 0.9
        const dotX = centerX + Math.cos(dotAngle + rotation) * dotRadius
        const dotY = centerY + Math.sin(dotAngle + rotation) * dotRadius * 0.5

        ctx.beginPath()
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? "rgba(147, 197, 253, 0.8)" : "rgba(30, 64, 175, 0.8)"
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [theme])

  return <canvas ref={canvasRef} width={200} height={200} className="opacity-70" aria-hidden="true" />
}
