"use client"

import { motion } from "framer-motion"

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

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6 rounded-lg bg-white/5 border border-white/10 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
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
            <h3 className="font-mono-title text-base text-white mb-6">My Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium bg-white/5 border border-white/10 text-gray-300 rounded hover:border-white/30 hover:bg-white/10 transition-all"
                >
                  {tech}
                </span>
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
