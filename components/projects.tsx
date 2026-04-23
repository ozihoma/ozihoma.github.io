"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

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
            <motion.a
              key={project.title}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group block overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden rounded mb-4 bg-white/5">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 backdrop-blur text-white text-xs font-mono-text rounded">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-mono-title text-lg text-white group-hover:text-gray-300 transition-colors">{project.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{project.category}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
              </div>
              
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-white/5 border border-white/10 text-gray-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

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
