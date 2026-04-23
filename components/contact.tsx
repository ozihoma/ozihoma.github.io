"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageCircle, MapPin, Send, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = `Contact from Portfolio: ${formState.name}`
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    const mailtoLink = `mailto:azubuikeho@mail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink

    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a]">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-left">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl">
          {/* Contact Info */}
          <div>
            <h3 className="font-mono-title text-lg text-white mb-8">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono-text mb-1">Email</p>
                  <a href="mailto:azubuikeho@gmail.com" className="text-white hover:text-gray-300 transition-colors">
                    azubuikeho@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MessageCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono-text mb-1">WhatsApp</p>
                  <a href="https://wa.me/2348164503177" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                    +234 816 450 3177
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono-text mb-1">Location</p>
                  <p className="text-white">Nigeria</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-xs text-gray-500 uppercase font-mono-text mb-4">Quick Connect</p>
                <div className="w-32 h-32">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qr-20henry-4xj0jrORwEFQTQpGaYk00lcWRpJiwB.jpeg"
                    alt="WhatsApp QR Code"
                    width={128}
                    height={128}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-mono-title text-lg text-white mb-8">Send Message</h3>

            {isSubmitted && (
              <div className="mb-6 p-3 bg-[#549642]/20 border border-[#549642]/30 rounded text-[#7bc268] text-xs flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Thank you! Email client opening...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs text-gray-400 uppercase font-mono-text mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:border-white/30 focus:bg-white/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-gray-400 uppercase font-mono-text mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:border-white/30 focus:bg-white/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-gray-400 uppercase font-mono-text mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  className="bg-white/5 border border-white/10 text-white text-sm min-h-[120px] placeholder:text-gray-600 focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full custom-btn-primary inline-flex items-center justify-center"
              >
                <Send className="mr-2 h-4 w-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
