"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Download, Mail } from "lucide-react"

export default function CTASection() {

  const clipReveal: Variants = {
    hidden: { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <section className="section-padding bg-black/30 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#549642]/20 via-[#3d7030]/20 to-[#549642]/20 animate-gradient-x" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <motion.div
        className="section-container relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={clipReveal}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-[#549642]/15 border border-[#549642]/30 rounded-full text-sm font-medium text-[#7bc268] mb-6">
              Ready to Start Your Project?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Let's Build Something Amazing Together
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm currently available for freelance projects and full-time opportunities. Whether you need a modern
            website, a mobile app, or a complete digital transformation, I'm here to help bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="custom-btn-primary text-lg px-8 py-4 flex items-center group shadow-lg shadow-[#549642]/50"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://docs.google.com/document/d/1CePKaJxotsfo9KOkfm6YOr47FK9V6uXDmE5aHnypMdU/edit?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn-outline text-lg px-8 py-4 flex items-center group"
            >
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              Download CV
            </a>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#549642] rounded-full animate-pulse" />
              <span>Available for Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#549642] rounded-full animate-pulse" />
              <span>Quick Response Time</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
