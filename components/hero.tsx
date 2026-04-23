"use client"

import { ArrowRight, Github, Linkedin, Mail, Download, ChevronDown, Instagram } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="flex min-h-screen items-center justify-center relative bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center max-w-4xl">
            {/* Profile Image */}
            <div className="mb-12">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.6),0_0_80px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8),0_0_100px_rgba(34,197,94,0.4)] transition-shadow duration-300">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-image-69RGAEhzAKGbURY2ekgty8ZY3T2mFN.jpg"
                  alt="Henry Azubuike"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-6 leading-tight">
              Henry Azubuike
            </h1>

            {/* Tagline with IBM Plex Mono */}
            <p className="font-mono-text text-base sm:text-lg text-gray-400 text-center mb-6">
              Software Developer • Product Manager • Copywriter • AI Engineer
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 text-center mb-12 max-w-2xl leading-relaxed">
              Building high-performance, scalable applications with modern technologies. Full-stack development specialist.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={scrollToProjects}
                className="custom-btn-primary flex justify-center items-center whitespace-nowrap"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <a
                href="https://docs.google.com/document/d/1CePKaJxotsfo9KOkfm6YOr47FK9V6uXDmE5aHnypMdU/edit?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-btn-outline flex justify-center items-center whitespace-nowrap"
              >
                CV
                <Download className="ml-2 h-4 w-4" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-8">
              <a
                href="https://github.com/ozihoma"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com/in/ozihoma"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:azubuikeho@gmail.com"
                className="social-icon group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com/ozihoma"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  )
}
