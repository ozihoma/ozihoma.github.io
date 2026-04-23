"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface AnimatedSvgProps {
  type: "earth" | "code" | "rocket" | "stars"
  className?: string
  width?: number
  height?: number
}

export default function AnimatedSvg({ type, className = "", width = 200, height = 200 }: AnimatedSvgProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const svgVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.05, duration: 0.5 },
      },
    }),
  }

  if (type === "earth") {
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={width}
        height={height}
        className={className}
        initial="hidden"
        animate="visible"
        variants={svgVariants}
      >
        {/* Earth */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill={isDark ? "#1a1a2e" : "#e6f7ff"}
          stroke={isDark ? "#4dabf7" : "#1864ab"}
          strokeWidth="2"
          variants={pathVariants}
          custom={0}
        />

        {/* Continents */}
        <motion.path
          d="M60,80 Q80,60 100,70 T140,90 Q160,100 130,120 T80,130 Q60,120 60,80"
          fill={isDark ? "#3b5bdb" : "#1971c2"}
          variants={pathVariants}
          custom={1}
        />
        <motion.path
          d="M120,60 Q140,70 130,90 T110,110 Q90,115 100,90 T120,60"
          fill={isDark ? "#3b5bdb" : "#1971c2"}
          variants={pathVariants}
          custom={2}
        />

        {/* Orbit */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="95"
          ry="30"
          fill="none"
          stroke={isDark ? "#a5d8ff" : "#1864ab"}
          strokeWidth="1"
          strokeDasharray="5,5"
          variants={pathVariants}
          custom={3}
        />

        {/* Satellite */}
        <motion.circle
          cx="30"
          cy="100"
          r="5"
          fill={isDark ? "#f8f9fa" : "#212529"}
          variants={pathVariants}
          custom={4}
          animate={{
            cx: [30, 170, 30],
            cy: [100, 100, 100],
            transition: {
              duration: 10,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            },
          }}
        />
      </motion.svg>
    )
  }

  if (type === "code") {
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={width}
        height={height}
        className={className}
        initial="hidden"
        animate="visible"
        variants={svgVariants}
      >
        {/* Code brackets */}
        <motion.path
          d="M60,50 L30,100 L60,150"
          fill="none"
          stroke={isDark ? "#a5d8ff" : "#1864ab"}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          custom={0}
        />
        <motion.path
          d="M140,50 L170,100 L140,150"
          fill="none"
          stroke={isDark ? "#a5d8ff" : "#1864ab"}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          custom={1}
        />

        {/* Code lines */}
        <motion.path
          d="M120,40 L80,160"
          fill="none"
          stroke={isDark ? "#da77f2" : "#9c36b5"}
          strokeWidth="8"
          strokeLinecap="round"
          variants={pathVariants}
          custom={2}
        />
      </motion.svg>
    )
  }

  if (type === "rocket") {
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={width}
        height={height}
        className={className}
        initial="hidden"
        animate="visible"
        variants={svgVariants}
      >
        {/* Rocket body */}
        <motion.path
          d="M100,20 L120,100 L100,180 L80,100 Z"
          fill={isDark ? "#845ef7" : "#5f3dc4"}
          stroke={isDark ? "#c0a0ff" : "#4c3d96"}
          strokeWidth="2"
          variants={pathVariants}
          custom={0}
        />

        {/* Rocket wings */}
        <motion.path
          d="M80,100 L40,120 L60,100 L40,80 Z"
          fill={isDark ? "#da77f2" : "#9c36b5"}
          stroke={isDark ? "#f3d9fa" : "#862e9c"}
          strokeWidth="2"
          variants={pathVariants}
          custom={1}
        />
        <motion.path
          d="M120,100 L160,120 L140,100 L160,80 Z"
          fill={isDark ? "#da77f2" : "#9c36b5"}
          stroke={isDark ? "#f3d9fa" : "#862e9c"}
          strokeWidth="2"
          variants={pathVariants}
          custom={1}
        />

        {/* Rocket window */}
        <motion.circle
          cx="100"
          cy="80"
          r="10"
          fill={isDark ? "#a5d8ff" : "#1864ab"}
          stroke={isDark ? "#e7f5ff" : "#1c7ed6"}
          strokeWidth="2"
          variants={pathVariants}
          custom={2}
        />

        {/* Rocket flames */}
        <motion.path
          d="M90,180 Q100,220 110,180"
          fill="none"
          stroke={isDark ? "#ffa94d" : "#e8590c"}
          strokeWidth="4"
          strokeLinecap="round"
          variants={pathVariants}
          custom={3}
          animate={{
            d: [
              "M90,180 Q100,220 110,180",
              "M90,180 Q100,200 110,180",
              "M90,180 Q100,230 110,180",
              "M90,180 Q100,210 110,180",
            ],
            transition: {
              duration: 1,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
        />
      </motion.svg>
    )
  }

  if (type === "stars") {
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={width}
        height={height}
        className={className}
        initial="hidden"
        animate="visible"
        variants={svgVariants}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const x = Math.random() * 200
          const y = Math.random() * 200
          const size = Math.random() * 3 + 1
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill={isDark ? "#f8f9fa" : "#1864ab"}
              variants={pathVariants}
              custom={i * 0.1}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                },
              }}
            />
          )
        })}
      </motion.svg>
    )
  }

  return null
}
