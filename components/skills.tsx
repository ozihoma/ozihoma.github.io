"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Zap } from "lucide-react"

function SkillBadge({ skill, index }: { skill: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow background on hover */}
      {isHovered && (
        <motion.div
          layoutId={`glow-${skill}`}
          className="absolute inset-0 bg-gradient-to-r from-[#549642] to-[#00ff00] rounded opacity-20 blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}

      <span className="relative px-3 py-1.5 text-xs font-medium bg-gradient-to-br from-[#549642]/10 to-[#0a0a0a] border border-[#549642]/30 text-gray-300 rounded transition-all duration-300 cursor-pointer group-hover:border-[#549642] group-hover:text-[#00ff00] group-hover:shadow-[0_0_20px_rgba(84,150,66,0.5)] block">
        <span className="flex items-center gap-1">
          {isHovered && <Zap className="w-3 h-3 animate-pulse" />}
          {skill}
        </span>
      </span>
    </motion.div>
  )
}

function SkillCategory({ category, index }: { category: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / 25
    const y = (e.clientX - rect.left - rect.width / 2) / -25
    setRotation({ x, y })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      key={index}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="p-6 rounded-lg border border-[#549642]/20 bg-gradient-to-br from-[#549642]/5 to-[#0a0a0a] hover:border-[#549642]/50 transition-all duration-300 group"
    >
      {/* Corner accent lights */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#549642] rounded-full blur-3xl opacity-0 group-hover:opacity-5 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#00ff00] rounded-full blur-3xl opacity-0 group-hover:opacity-5 transition-opacity" />

      <h3 className="font-mono-title text-base mb-6 text-[#549642] group-hover:text-[#00ff00] transition-colors duration-300 relative z-10">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill: string, i: number) => (
          <SkillBadge key={i} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React Native", "Expo", "Typescript", "Flutter", "Dart", "Tailwind", "Nativewind", "Angular", "React", "Redux", "Next.js", "Vue.js"],
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Express", "Nest.js", "PHP", "Python", "MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      title: "Design",
      skills: ["UX Research", "Web Design", "Mobile Design", "Prototyping", "Figma", "UI/UX Design", "Visual Design", "Canva"],
    },
    {
      title: "Other Skills",
      skills: ["SEO Auditing", "Analytics", "Copywriting", "Translation", "Git", "AWS", "Google Analytics"],
    },
  ]

  return (
    <section id="skills" className="section-padding bg-[#0a0a0a]">
      <div className="section-container">
        {/* Skills & Expertise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white">Skills & Expertise</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory key={index} category={category} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
