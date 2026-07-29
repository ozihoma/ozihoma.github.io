"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, Github, Linkedin, Mail, Download, ChevronDown, Instagram, Zap } from "lucide-react"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("./3d-scene"), { ssr: false })

interface GameStats {
  level: number
  experience: number
  skills: number
  projects: number
}

export default function Hero3D() {
  const [stats, setStats] = useState<GameStats>({
    level: 15,
    experience: 8540,
    skills: 12,
    projects: 8,
  })

  const [isHovering, setIsHovering] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const sceneContainerRef = useRef<HTMLDivElement>(null)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleClickRobot = () => {
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
    <section id="home" className="relative flex min-h-screen items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* 3D Canvas Background */}
      <div
        ref={sceneContainerRef}
        className="absolute inset-0 cursor-crosshair"
        onClick={handleClickRobot}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Scene3D showRobot={true} particleCount={800} />
      </div>

      {/* Level Up Notification */}
      {showLevelUp && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-[#549642] to-[#00ff00] bg-clip-text text-transparent animate-pulse">
              ⬆ LEVEL UP! ⬆
            </div>
            <div className="text-2xl text-[#00ff00] mt-2 font-mono">Level {stats.level}</div>
          </div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Game Stats HUD */}
          <div className="absolute top-20 left-4 sm:left-8 bg-black/60 backdrop-blur-sm border border-[#549642] rounded-lg p-4 w-fit">
            <div className="font-mono text-sm">
              <div className="text-[#549642] mb-2">[ STATS ]</div>
              <div className="text-white/80 text-xs space-y-1">
                <div>
                  LEVEL: <span className="text-[#00ff00]">{stats.level}</span>
                </div>
                <div>
                  EXP: <span className="text-[#00ff00]">{stats.experience}</span>
                </div>
                <div>
                  SKILLS: <span className="text-[#00ff00]">{stats.skills}</span>
                </div>
                <div>
                  PROJECTS: <span className="text-[#00ff00]">{stats.projects}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side system status */}
          <div className="absolute top-20 right-4 sm:right-8 bg-black/60 backdrop-blur-sm border border-[#549642] rounded-lg p-4 w-fit">
            <div className="font-mono text-sm">
              <div className="text-[#549642] mb-2">[ SYSTEM ]</div>
              <div className="text-white/80 text-xs space-y-1">
                <div>
                  STATUS: <span className="text-[#00ff00] animate-pulse">ONLINE</span>
                </div>
                <div>
                  CLICKS: <span className="text-[#00ff00]">{clickCount}</span>
                </div>
                <div>
                  FRAME RATE: <span className="text-[#00ff00]">60 FPS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col items-center max-w-4xl text-center">
            {/* Glitch effect text */}
            <div className="mb-8 relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-2 font-mono tracking-wider">
                HENRY
                <span className="block text-[#549642]">AZUBUIKE</span>
              </h1>
              <div className="absolute inset-0 text-4xl sm:text-5xl md:text-7xl font-bold pointer-events-none font-mono tracking-wider overflow-hidden">
                <div
                  className="text-white opacity-50 animate-pulse"
                  style={{
                    textShadow: "2px 2px 0 #00ff00, -2px -2px 0 #549642",
                    animation: "glitch 0.3s infinite",
                  }}
                >
                  HENRY AZUBUIKE
                </div>
              </div>
            </div>

            {/* Tagline with typing effect */}
            <p className="font-mono text-base sm:text-lg text-[#00ff00] mb-2">
              &gt; software_developer.init()
            </p>
            <p className="font-mono text-xs sm:text-sm text-[#549642] mb-8 tracking-widest">
              FULL_STACK | AI_ENGINEER | PRODUCT_MANAGER | COPYWRITER
            </p>

            {/* Description with scanlines effect */}
            <div className="mb-12 max-w-2xl">
              <div className="relative bg-black/40 backdrop-blur-sm border border-[#549642] rounded p-6 md:p-8">
                <div
                  className="absolute inset-0 pointer-events-none rounded"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      rgba(84, 150, 66, 0.03) 0px,
                      rgba(84, 150, 66, 0.03) 1px,
                      transparent 1px,
                      transparent 2px
                    )`,
                    animation: "scanlines 8s linear infinite",
                  }}
                />
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10">
                  Building high-performance, scalable applications with modern technologies. Full-stack development
                  specialist. Currently leveling up in AI and machine learning.
                </p>
              </div>
            </div>

            {/* CTA Buttons with glow effect */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 relative z-10">
              <button
                onClick={scrollToProjects}
                className="group relative px-8 py-3 bg-gradient-to-r from-[#549642] to-[#3d7030] text-white font-mono font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(84,150,66,0.8)]"
              >
                <span className="relative flex items-center justify-center">
                  VIEW PROJECTS
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -translate-x-full group-hover:translate-x-full transition-all duration-500" />
              </button>

              <a
                href="https://docs.google.com/document/d/1CePKaJxotsfo9KOkfm6YOr47FK9V6uXDmE5aHnypMdU/edit?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-3 bg-transparent border-2 border-[#549642] text-white font-mono font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(84,150,66,0.6)]"
              >
                <span className="relative flex items-center justify-center">
                  DOWNLOAD CV
                  <Download className="ml-2 h-4 w-4" />
                </span>
                <div className="absolute inset-0 bg-[#549642] opacity-0 group-hover:opacity-10 transition-all duration-300" />
              </a>
            </div>

            {/* Social Links with hover glow */}
            <div className="flex justify-center gap-8 mb-16 relative z-10">
              {[
                {
                  icon: Github,
                  href: "https://github.com/ozihoma",
                  label: "GitHub",
                  color: "#ffffff",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/ozihoma",
                  label: "LinkedIn",
                  color: "#0A66C2",
                },
                {
                  icon: Mail,
                  href: "mailto:azubuikeho@gmail.com",
                  label: "Email",
                  color: "#EA4335",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com/ozihoma",
                  label: "Instagram",
                  color: "#E4405F",
                },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-lg"
                      style={{
                        background: `radial-gradient(circle, ${social.color}, transparent)`,
                      }}
                    />
                    <Icon className="h-6 w-6 text-white relative transition-all group-hover:scale-125 group-hover:text-[#549642]" />
                  </a>
                )
              })}
            </div>

            {/* Combo counter and streak */}
            {clickCount > 0 && (
              <div className="text-center mb-8 relative z-10">
                <div className="font-mono text-sm text-[#00ff00] animate-pulse">
                  COMBO x{clickCount} | CLICK THE ROBOT FOR REWARDS!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator with pulsing animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="relative">
          <ChevronDown className="h-6 w-6 text-[#549642] animate-pulse" />
          <div className="absolute inset-0 text-[#00ff00] animate-pulse opacity-50">
            <Zap className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes glitch {
          0% {
            text-shadow: 2px 2px 0 #00ff00, -2px -2px 0 #549642;
          }
          20% {
            text-shadow: -2px -2px 0 #00ff00, 2px 2px 0 #549642;
          }
          40% {
            text-shadow: 0 0 0 #00ff00, 0 0 0 #549642;
          }
          60% {
            text-shadow: 2px -2px 0 #00ff00, -2px 2px 0 #549642;
          }
          80% {
            text-shadow: -2px 2px 0 #00ff00, 2px -2px 0 #549642;
          }
          100% {
            text-shadow: 2px 2px 0 #00ff00, -2px -2px 0 #549642;
          }
        }

        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  )
}
