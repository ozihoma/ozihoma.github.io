"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Terminal3DProps {
  lines?: string[]
  title?: string
  speed?: number
}

export default function Terminal3D({ 
  lines = [
    "$ npm install @react-three/fiber",
    "$ node build-3d-portfolio.js",
    "",
    "✓ Initializing 3D scene...",
    "✓ Loading robot model...",
    "✓ Rendering particles...",
    "✓ Compiling shaders...",
    "",
    "Performance: 60 FPS",
    "Status: RENDERING ACTIVE",
    "Memory: 45.2 MB",
  ],
  title = "TERMINAL [ v1.0 ]",
  speed = 50,
}: Terminal3DProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex]
      
      if (displayedText.length < currentLine.length) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText + currentLine[displayedText.length])
        }, speed)
      } else {
        timeout = setTimeout(() => {
          setDisplayedText("")
          setCurrentLineIndex(currentLineIndex + 1)
        }, 800)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, currentLineIndex, lines, speed])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-2xl mx-auto bg-black border-2 border-[#549642] rounded-lg overflow-hidden"
    >
      {/* Window header */}
      <div className="bg-gradient-to-r from-[#549642] to-[#3d7030] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-xs text-black font-bold">{title}</span>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm bg-black min-h-64 relative overflow-hidden">
        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
            animation: "scanlines 8s linear infinite",
          }}
        />

        {/* Terminal text */}
        <div className="relative z-10">
          {lines.slice(0, currentLineIndex).map((line, i) => (
            <div
              key={i}
              className={`text-[#00ff00] mb-1 ${
                line.startsWith("✓") ? "text-[#549642]" : ""
              }`}
            >
              {line}
            </div>
          ))}

          {/* Current typing line */}
          {currentLineIndex < lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#00ff00]"
            >
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-5 ml-1 bg-[#549642]"
              />
            </motion.div>
          )}

          {/* Completed state */}
          {currentLineIndex >= lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#549642] mt-4 font-bold"
            >
              BUILD COMPLETE ✓
            </motion.div>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#549642] to-[#00ff00] rounded-lg opacity-0 group-hover:opacity-20 blur -z-10 transition-opacity" />

      <style>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </motion.div>
  )
}
