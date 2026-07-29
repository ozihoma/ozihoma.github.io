"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => { handleNext() }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  }

  const testimonials = [
    { name: "Sarah Johnson", role: "CEO, TechStart Inc.", image: "/placeholder.svg?height=100&width=100", content: "Working with Henry was an absolute pleasure. His attention to detail and ability to translate our vision into a stunning website exceeded all expectations.", rating: 5 },
    { name: "Michael Chen", role: "Product Manager, HealthCare Solutions", image: "/placeholder.svg?height=100&width=100", content: "Henry's expertise in React and Next.js really shines through. He delivered our healthcare platform ahead of schedule with exceptional quality.", rating: 5 },
    { name: "Emily Rodriguez", role: "Founder, EduLearn Platform", image: "/placeholder.svg?height=100&width=100", content: "The UI/UX design Henry created for our education platform is intuitive and beautiful. Our user engagement has increased by 40% since launch.", rating: 5 },
    { name: "David Thompson", role: "CTO, FinanceFlow", image: "/placeholder.svg?height=100&width=100", content: "Henry's technical skills are top-notch. He built our fintech platform with security and performance in mind. The codebase is clean and well-documented.", rating: 5 },
  ]

  const handleNext = () => { setDirection(1); setCurrentIndex((p) => (p + 1) % testimonials.length) }
  const handlePrev = () => { setDirection(-1); setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length) }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 1000 : -1000, opacity: 0 }),
  }

  return (
    <section id="testimonials" className="section-padding bg-black/30 backdrop-blur-sm relative">
      <div className="section-container">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <span className="gradient-text">Client Testimonials</span>
        </motion.h2>
        <motion.p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto" variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          Don&apos;t just take my word for it - hear what my clients have to say.
        </motion.p>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.15 } }}>
                <Card className="bg-black/40 border border-gray-800 hover:border-[#549642]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(84,150,66,0.3)]">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex justify-center mb-6"><div className="bg-[#549642]/20 p-4 rounded-full"><Quote className="h-8 w-8 text-[#7bc268]" /></div></div>
                    <p className="text-lg md:text-xl text-gray-300 text-center mb-8 leading-relaxed italic">&ldquo;{testimonials[currentIndex].content}&rdquo;</p>
                    <div className="flex justify-center mb-4">{[...Array(testimonials[currentIndex].rating)].map((_, i) => (<Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />))}</div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#549642]"><Image src={testimonials[currentIndex].image || "/placeholder.svg"} alt={testimonials[currentIndex].name} width={64} height={64} className="object-cover w-full h-full" /></div>
                      <div className="text-left"><h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4><p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={handlePrev} className="bg-[#549642]/20 hover:bg-[#549642]/30 border border-[#549642]/30 rounded-full p-3 transition-all duration-300 hover:scale-110" aria-label="Previous testimonial"><ChevronLeft className="h-6 w-6 text-[#7bc268]" /></button>
            <div className="flex items-center gap-2">{testimonials.map((_, index) => (<button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index) }} className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#549642]" : "w-3 bg-gray-600 hover:bg-gray-500"}`} aria-label={`Go to testimonial ${index + 1}`} />))}</div>
            <button onClick={handleNext} className="bg-[#549642]/20 hover:bg-[#549642]/30 border border-[#549642]/30 rounded-full p-3 transition-all duration-300 hover:scale-110" aria-label="Next testimonial"><ChevronRight className="h-6 w-6 text-[#7bc268]" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
