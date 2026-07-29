"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Tag, Layers } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  category: string
  featured?: boolean
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#549642]/30 rounded-xl shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-[#549642] text-white rounded-full transition-colors duration-200 border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-3/5 relative h-64 md:h-auto overflow-hidden bg-[#0a0a0a]">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]/20" />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-2/5 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-mono text-[#00ff00] uppercase tracking-wider px-2 py-1 bg-[#549642]/20 border border-[#549642]/30 rounded">
                  {project.category}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-mono-title">
                {project.title}
              </h2>
              
              <div className="flex-grow">
                <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-sm font-mono text-[#549642] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-[#549642]/10 border border-[#549642]/20 text-gray-300 rounded-full font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-sm font-mono text-gray-400 hover:text-white transition-colors duration-200 border border-white/5 rounded hover:bg-white/5"
                >
                  Back to Projects
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
