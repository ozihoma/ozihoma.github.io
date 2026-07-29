"use client"

import { motion } from "framer-motion"
import FloatingOrbs from "./floating-orbs"
import { useState, useRef } from "react"

function TechStackBadge({ tech, index }: { tech: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const badgeRef = useRef<HTMLSpanElement>(null)

  return (
    <motion.span
      ref={badgeRef}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group px-4 py-2 text-sm font-medium bg-gradient-to-br from-[#549642]/10 to-[#0a0a0a] border border-[#549642]/30 text-gray-300 rounded transition-all cursor-pointer"
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          layoutId={`tech-glow-${tech}`}
          className="absolute inset-0 bg-gradient-to-r from-[#549642] to-[#00ff00] rounded opacity-0 blur-lg group-hover:opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative group-hover:text-[#549642] transition-colors duration-300">{tech}</span>
    </motion.span>
  )
}

export default function About() {
  const techStack = ["React", "Next.js", "Flutter", "Figma", "Node.js", "React Native", "TypeScript", "Python", "PostgreSQL"]

  const stats = [
    { number: "45+", label: "Projects Completed" },
    { number: "7", label: "Years of Experience" },
    { number: "20+", label: "Clients Served" },
  ]

  // Slide from left animation
  const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <section id="about" className="section-padding-first bg-[#0a0a0a]">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={slideLeft}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          About Me
        </motion.h2>

        {/* Stats Grid with 3D effects */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => {
            const [rotation, setRotation] = useState({ x: 0, y: 0 })
            const cardRef = useRef<HTMLDivElement>(null)

            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              if (!cardRef.current) return
              const rect = cardRef.current.getBoundingClientRect()
              const x = (e.clientY - rect.top - rect.height / 2) / 20
              const y = (e.clientX - rect.left - rect.width / 2) / -20
              setRotation({ x, y })
            }

            const handleMouseLeave = () => {
              setRotation({ x: 0, y: 0 })
            }

            return (
              <motion.div
                ref={cardRef}
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  perspective: "1000px",
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: "transform 0.15s ease-out",
                }}
                className="p-6 rounded-lg bg-gradient-to-br from-[#549642]/10 to-[#0a0a0a] border border-[#549642]/30 text-center group cursor-pointer hover:border-[#549642]/60 transition-all"
              >
                <motion.div initial={{ y: 0 }} whileHover={{ y: -5 }} className="relative z-10">
                  <div className="text-2xl md:text-3xl font-bold text-[#549642] mb-2 group-hover:text-[#00ff00] transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <div className="max-w-3xl">
          {/* Main Intro */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-300 leading-relaxed mb-6"
          >
            I design and develop high-performance web and mobile experiences that blend creativity with cutting-edge technology.
          </motion.p>

          {/* Secondary Intro */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-300 leading-relaxed mb-6"
          >
            From startups to global businesses, I deliver scalable solutions that drive real-world results.
          </motion.p>

          {/* Expertise Intro */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-300 leading-relaxed mb-10"
          >
            With deep expertise in React, Next.js, Figma, and backend systems, I turn bold ideas into seamless digital products.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-10"
          >
            <h3 className="font-mono-title text-base text-[#549642] mb-6 group-hover:text-[#00ff00] transition-colors">My Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <TechStackBadge key={index} tech={tech} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Mission */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-base text-gray-400 leading-relaxed italic"
          >
            Passionate about solving problems, one line of code at a time.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
