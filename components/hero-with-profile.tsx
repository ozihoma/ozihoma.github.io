"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail, Download, ChevronDown, Instagram } from "lucide-react"
import { motion } from "framer-motion"

interface GameStats {
  level: number
  experience: number
  skills: number
  projects: number
}

export default function HeroWithProfile() {
  const [stats, setStats] = useState<GameStats>({
    level: 15,
    experience: 8540,
    skills: 12,
    projects: 8,
  })

  const [clickCount, setClickCount] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleClickProfile = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount % 10 === 0) {
      setShowLevelUp(true)
      setStats((prev) => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience + 1000,
      }))

      setTimeout(() => setShowLevelUp(false), 2000)
    }
  }

  return (
    <section id="home" className="relative flex lg:min-h-screen items-center justify-center bg-[#0a0a0a] overflow-hidden pt-16 lg:pt-20 pb-8 lg:pb-0">
      {/* Level Up Notification */}
      {showLevelUp && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-[#549642] to-[#00ff00] bg-clip-text text-transparent animate-pulse">
              ⬆ LEVEL UP! ⬆
            </div>
            <div className="text-2xl text-[#00ff00] mt-2 font-mono">Level {stats.level}</div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 lg:min-h-[calc(100vh-80px)]">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-xl"
          >
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-center lg:text-center flex flex-col lg:flex-col items-center"
            >
              <div className="flex items-center gap-3 lg:flex-col lg:gap-0 w-full justify-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight text-center">
                  Henry
                  <br />
                  <span className="bg-gradient-to-r from-[#549642] to-[#00ff00] bg-clip-text text-transparent">Azubuike</span>
                </h1>
                
                {/* Mobile profile image */}
                <div className="lg:hidden relative w-16 h-20 flex-shrink-0">
                  <Image
                    src="/profile.jpg"
                    alt="Henry Azubuike"
                    fill
                    className="object-cover rounded-lg"
                    priority
                    quality={75}
                  />
                </div>
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#549642] tracking-widest text-center mt-2">
                FULL_STACK | AI_ENGINEER | PRODUCT_MANAGER | COPYWRITER
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="relative bg-black/40 backdrop-blur-sm border border-[#549642] rounded p-4 md:p-5">
                <div
                  className="absolute inset-0 pointer-events-none rounded"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      rgba(0, 0, 0, 0.15) 0px,
                      rgba(0, 0, 0, 0.15) 1px,
                      transparent 1px,
                      transparent 2px
                    )`,
                  }}
                />
                <p className="relative text-gray-300 text-sm md:text-base leading-normal">
                  Transforming ideas into elegant, scalable solutions. With expertise in full-stack development, AI
                  integration, and product strategy, I craft digital experiences that matter.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-row gap-4 mb-8"
            >
              <button
                onClick={scrollToProjects}
                className="px-4 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#549642] to-[#00ff00] text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#549642]/50 transition-all duration-300 group"
              >
                View Projects
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <a
                href="#contact"
                className="px-4 py-2 sm:px-8 sm:py-3 text-sm sm:text-base border border-[#549642] text-[#549642] font-bold rounded-lg hover:bg-[#549642]/10 transition-all duration-300"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 justify-center"
            >
              <a href="#" className="text-gray-400 hover:text-[#549642] transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#549642] transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#549642] transition-colors">
                <Mail size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#549642] transition-colors">
                <Instagram size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image with 3D Effects - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleClickProfile}
            className="hidden lg:flex flex-1 justify-center items-center cursor-pointer"
          >
            <div className="relative w-72 h-96 sm:w-80 sm:h-96 md:w-96 md:h-[500px] max-w-md">
              {/* Glowing border */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(84, 150, 66, 0.5)",
                    "0 0 40px rgba(0, 255, 0, 0.6)",
                    "0 0 20px rgba(84, 150, 66, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl border-2 border-[#549642]"
              />

              {/* Hover effect background */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                <Image
                  src="/profile.jpg"
                  alt="Henry Azubuike"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                  quality={75}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-2xl" />

                {/* Interactive glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#549642]/20 to-[#00ff00]/20 rounded-2xl"
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#549642] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00ff00] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00ff00] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#549642] rounded-br-lg" />

                {/* Click indicator */}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                >
                  <div className="text-center pointer-events-none">
                    <div className="text-2xl font-bold text-[#00ff00] opacity-80">Click Count: {clickCount}</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* System status below image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-[#549642] rounded-lg p-3 w-fit whitespace-nowrap"
              >
                <div className="font-mono text-xs">
                  <span className="text-[#549642]">STATUS:</span> <span className="text-[#00ff00] animate-pulse">AVAILABLE</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-[#549642] animate-pulse" size={32} />
        </motion.div>
      </div>
    </section>
  )
}
