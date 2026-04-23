"use client"

import { motion } from "framer-motion"
import { CheckCircle, Code, Lightbulb, Rocket } from "lucide-react"

export default function Approach() {

  const approaches = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Discovery & Planning",
      description:
        "I begin by understanding your goals, target audience, and requirements. This phase involves research, strategy development, and creating a roadmap for your project.",
      points: [
        "Requirement gathering and analysis",
        "User research and persona development",
        "Competitive analysis",
        "Project scope definition",
        "Technology stack selection",
      ],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Design & Development",
      description:
        "With a solid plan in place, I move to designing and developing your solution. I focus on creating intuitive interfaces and writing clean, efficient code.",
      points: [
        "Wireframing and prototyping",
        "UI/UX design with user feedback",
        "Responsive frontend development",
        "Backend system implementation",
        "Integration of third-party services",
      ],
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Testing & Deployment",
      description:
        "Quality is paramount. I thoroughly test all aspects of your project before deployment, ensuring it's optimized, secure, and ready for your users.",
      points: [
        "Comprehensive testing across devices",
        "Performance optimization",
        "Security implementation",
        "Deployment to production",
        "Post-launch support and maintenance",
      ],
    },
  ]

  // Each card gets a different tilt direction
  const tiltDirections = [
    { rotateY: -8, rotateX: 4 },
    { rotateY: 0, rotateX: -6 },
    { rotateY: 8, rotateX: 4 },
  ]

  return (
    <section id="approach" className="section-padding bg-[#0a0a0a]">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-left"
          initial={{ opacity: 0, rotateX: -10 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ perspective: 600 }}
        >
          My Development Approach
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: 800 }}>
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                rotateY: tiltDirections[index].rotateY,
                rotateX: tiltDirections[index].rotateX,
              }}
              whileInView={{ opacity: 1, rotateY: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border border-white/10 rounded p-6 hover:border-white/20 transition-colors"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-4 p-3 w-12 h-12 rounded bg-white/5 text-white flex items-center justify-center">
                {approach.icon}
              </div>

              <h3 className="font-mono-title text-lg text-white mb-3">{approach.title}</h3>
              <p className="text-sm text-gray-400 mb-5">{approach.description}</p>

              <ul className="space-y-2">
                {approach.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
