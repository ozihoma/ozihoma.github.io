"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink, Zap } from "lucide-react"
import ProjectDetailModal from "./project-detail-modal"

function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / 20
    const y = (e.clientX - rect.left - rect.width / 2) / -20
    setRotation({ x, y })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group block overflow-hidden perspective cursor-pointer"
      style={{
        perspective: "1000px",
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div className="relative aspect-video overflow-hidden rounded mb-4 bg-gradient-to-br from-[#549642]/10 to-[#0a0a0a] border border-[#549642]/20 group-hover:border-[#549642]/50 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#549642]/30 to-transparent" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#549642] rounded-full blur-3xl opacity-10" />
        </div>

        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
        />

        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none group-hover:opacity-50 opacity-0 transition-opacity"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
          }}
        />

        {project.featured && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-[#549642] to-[#00ff00] text-black text-xs font-mono-text rounded font-bold flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            Featured
          </motion.div>
        )}
      </div>

      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-mono-title text-lg text-white group-hover:text-[#549642] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-[#549642] mt-1 font-mono">{project.category}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 45 }}
          className="text-[#549642] group-hover:text-[#00ff00] transition-colors"
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.div>
      </div>

      <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag: string, i: number) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ backgroundColor: "rgba(84, 150, 66, 0.5)" }}
            className="px-2 py-1 text-xs bg-white/5 border border-[#549642]/30 text-gray-300 rounded font-mono transition-all"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const projects = [
    {
      title: "Bankina",
      description:
        "A modern fintech platform offering seamless banking solutions, digital payments, and financial management tools for individuals and businesses.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bankina-ng-1024x768desktop-fd2004-5HTcEjRSYk1F66MoHippNfVnxOMyhN.png",
      tags: ["React Native", "Expo", "Fintech", "Typescript"],
      liveUrl: "https://bankina.ng/",
      category: "Fintech",
      featured: true,
    },
    {
      title: "Buy Energy",
      description:
        "Mobile app enabling seamless purchase and distribution of energy units. Simplifies utility bill payments with real-time transaction tracking.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/play-google-com-1440x810desktop-a72e59-GUzTFJZ3fjBbBPYpXGmDZRHjcZ5AFR.png",
      tags: ["React Native", "Fintech", "Mobile", "Node.js"],
      liveUrl: "https://play.google.com/store/apps/details?id=app.buyenergyunits.com",
      category: "Fintech",
      featured: true,
    },
    {
      title: "Gookway Marketplace",
      description:
        "E-commerce marketplace connecting vendors with customers. Features product listings, vendor management, reviews, and secure checkout integration.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/play-google-com-1440x810desktop-1f6c94-7ientP0gU9Ld19zO8heJyEgjhkS4w1.png",
      tags: ["React Native", "E-commerce", "Mobile", "Expo"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.gookway.app",
      category: "Web",
    },
    {
      title: "Synkd",
      description:
        "Collaborative platform for team synchronization and project management. Real-time updates, task tracking, and seamless team communication.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/synkd-life-1440x810desktop-c13219-QlI12ycBAJq46UGYdUlBNbCW2kNsNn.png",
      tags: ["React", "Node.js", "WebSocket", "MongoDB"],
      liveUrl: "https://synkd.life/",
      category: "Web",
    },
    {
      title: "United Evangelical Church",
      description: "A church website featuring live streaming, community resources, and event information.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uecnyanya-screenshot-xKbAzP6lyrTXTScLLZxFF0hBCLaRVe.jpg",
      tags: ["HTML", "CSS", "Next.js", "Responsive Design"],
      liveUrl: "https://uecnyanya.netlify.app/",
      category: "Web",
    },
    {
      title: "Ozioma Music Platform",
      description: "An interactive music education platform with lessons, tutorials, and community features.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ozihoma-screenshot-AURjNyyYWXbx6JrGlvTSOpp3Bazg9K.jpg",
      tags: ["React", "Tailwind CSS", "UI/UX Design"],
      liveUrl: "https://ozihoma.netlify.app/",
      category: "Education",
    },
    {
      title: "One Health Platform",
      description: "A healthcare platform providing medical services, information, and patient resources.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/onehealth-screenshot-XfI95qDvCODlYhV5z23lLCgO2y3QZW.jpg",
      tags: ["HTML", "Bootstrap", "Healthcare", "Javascript"],
      liveUrl: "https://web.onehealthng.com/",
      category: "Healthcare",
    },
    {
      title: "Lena Pay Platform",
      description:
        "A modern payment solution for global transactions. Transact different currencies with real-time exchange rates.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lenapay-screenshot-BlLfgYbsBvBIJqfNbWcv1XTJcNobqK.jpg",
      tags: ["Next.js", "Python", "E-commerce", "UI/UX Design"],
      liveUrl: "https://lenapay.netlify.app/",
      category: "Fintech",
    },
  ]

  const categories = ["All", "Fintech", "Healthcare", "Education", "Web"]
  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="section-padding bg-[#0a0a0a]">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-left">Featured Work</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1.5 text-xs font-mono-text rounded transition-all ${
                  activeFilter === category
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2 }}
        >
          <a href="#contact" className="custom-btn-primary inline-flex items-center">
            Get in Touch
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
