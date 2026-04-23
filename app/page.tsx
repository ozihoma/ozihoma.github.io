import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Approach from "@/components/approach"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Approach />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
