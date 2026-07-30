'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
}

export default function FullPage3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas to match window size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const particles: Particle[] = []

    // Create initial particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.6 ? '#00ff00' : '#549642',
        life: 1,
      })
    }

    let frameCount = 0
    let animationId: number

    const draw = () => {
      // Dark background with fade trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw pulsing background orbs
      frameCount++
      const time = frameCount * 0.02

      const orbData = [
        {
          x: canvas.width * 0.15,
          y: canvas.height * 0.25,
          baseRadius: 150,
          speed: 1,
          offset: 0,
        },
        {
          x: canvas.width * 0.85,
          y: canvas.height * 0.75,
          baseRadius: 180,
          speed: 0.8,
          offset: Math.PI / 2,
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5,
          baseRadius: 200,
          speed: 1.2,
          offset: Math.PI,
        },
        {
          x: canvas.width * 0.75,
          y: canvas.height * 0.25,
          baseRadius: 140,
          speed: 0.9,
          offset: (3 * Math.PI) / 2,
        },
      ]

      orbData.forEach((orb) => {
        const pulse = Math.sin(time * orb.speed + orb.offset) * 0.6 + 0.7
        const radius = orb.baseRadius * pulse

        // Create glowing gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius)
        gradient.addColorStop(0, `rgba(0, 255, 0, ${0.5 * pulse})`)
        gradient.addColorStop(0.4, `rgba(84, 150, 66, ${0.3 * pulse})`)
        gradient.addColorStop(0.7, `rgba(0, 200, 100, ${0.1 * pulse})`)
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(orb.x - radius, orb.y - radius, radius * 2, radius * 2)
      })

      // Spawn new particles occasionally
      if (frameCount % 5 === 0 && particles.length < 250) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 5 + 0.5,
          opacity: Math.random() * 0.9 + 0.1,
          color: Math.random() > 0.7 ? '#00ff00' : '#549642',
          life: 1,
        })
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.life -= 0.005

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Pulsing opacity
        const pulseOpacity = Math.sin(time * 2 + p.x * 0.01) * 0.3 + 0.7
        const finalOpacity = p.opacity * pulseOpacity * p.life

        // Draw particle with glow
        ctx.fillStyle = p.color
        ctx.globalAlpha = finalOpacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Outer glow
        ctx.strokeStyle = p.color
        ctx.lineWidth = 0.5
        ctx.globalAlpha = finalOpacity * 0.4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + 4, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw connecting network lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 20, particles.length); j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${0.25 * (1 - distance / 150)})`
            ctx.lineWidth = 1.5
            ctx.globalAlpha = 0.25 * (1 - distance / 150)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -100,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    />
  )
}
