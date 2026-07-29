"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AchievementBadgeProps {
  title: string
  description: string
  icon: string
  unlocked: boolean
  index: number
}

export default function AchievementBadge({
  title,
  description,
  icon,
  unlocked,
  index,
}: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
        unlocked
          ? "border-[#549642] bg-gradient-to-br from-[#549642]/10 to-[#0a0a0a]"
          : "border-gray-600 bg-black/50 opacity-50"
      }`}
    >
      {/* Glow effect on hover */}
      {isHovered && unlocked && (
        <motion.div
          layoutId={`achievement-glow-${title}`}
          className="absolute inset-0 bg-gradient-to-r from-[#549642] to-[#00ff00] rounded-lg opacity-20 blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}

      <div className="relative z-10">
        <div className="text-3xl mb-2">{icon}</div>
        <h4 className="font-mono-title text-sm text-[#549642]">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{description}</p>

        {unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t border-[#549642]/20"
          >
            <span className="text-[10px] text-[#00ff00] font-mono">✓ UNLOCKED</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
