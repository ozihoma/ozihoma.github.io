"use client"

import { motion } from "framer-motion"

export default function Education() {
  return (
    <section id="education" className="section-padding bg-[#0a0a0a]">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Education
        </motion.h2>
        
        <motion.div
          className="border-l border-white/10 pl-6 py-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="space-y-1">
            <p className="font-medium text-white">University of Abuja</p>
            <p className="text-sm text-gray-400">Bachelor of Arts in English</p>
            <p className="text-xs text-gray-500 mt-2">2025</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
