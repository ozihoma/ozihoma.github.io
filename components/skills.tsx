"use client"

import { motion } from "framer-motion"

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

          <div className="grid md:grid-cols-2 gap-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h3 className="font-mono-title text-base mb-6 text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-gray-300 rounded hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
