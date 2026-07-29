"use client"

import { motion } from "framer-motion"

export default function Experience() {

  const experiences = [
    {
      title: "Mobile Developer",
      company: "360 Impact Initiative",
      period: "2026 - Present",
      description: [
        "Building and maintaining cross-platform mobile application features using React Native.",
        "Translating product requirements into smooth, performant mobile experiences.",
        "Implementing intuitive UI components and smooth user experiences across devices.",
        "Integrating APIs and third-party services for real-time data and app functionality.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "HEDREG",
      period: "2026",
      description: [
        "Developing and maintaining responsive frontend interfaces for web products.",
        "Implementing reusable components and scalable architecture for maintainability.",
        "Optimizing application performance through code splitting and efficient state management.",
        "Collaborating with product and backend teams to deliver scalable user experiences.",
      ],
    },
    {
      title: "Mobile Developer (Flutter)",
      company: "Naelix Tech Group (NTGC)",
      period: "2025 - Present",
      description: [
        "Developing mobile applications using Flutter for business and consumer use cases.",
        "Integrating backend services and APIs to enable dynamic application features.",
        "Debugging and optimizing applications for speed, efficiency, and reliability.",
        "Working with cross-functional teams to deliver high-quality mobile solutions.",
      ],
    },
    {
      title: "Frontend Web Developer",
      company: "Skiflux",
      period: "2025",
      description: [
        "Led frontend development for Africa's largest social media platform connecting developers with mentorship opportunities.",
        "Built a cross-platform SaaS solution with shared backend architecture serving web and mobile.",
        "Implemented advanced features: live tutoring, project showcases, networking, and talent recruitment marketplace.",
        "Optimized performance for high-traffic with code splitting, lazy loading, and efficient state management.",
      ],
    },
    {
      title: "Front-End Developer",
      company: "Andela",
      period: "2021 - 2025",
      description: [
        "Developed responsive web applications using HTML, CSS, JavaScript, React, and Next.js.",
        "Implemented dynamic routing and component-based architecture to enhance UX.",
        "Collaborated with design teams to translate UI/UX mockups into pixel-perfect interfaces.",
        "Optimized performance through code splitting, lazy loading, and SEO best practices.",
        "Integrated RESTful APIs and ensured seamless data flow with backend teams.",
      ],
    },
    {
      title: "UI/UX Designer",
      company: "BreezeLearning",
      period: "2021 - 2025",
      description: [
        "Designed intuitive user interfaces for web applications using Figma with user-centered principles.",
        "Conducted user research and usability testing to inform design decisions.",
        "Created wireframes, prototypes, and design systems for consistency.",
        "Collaborated with development teams on design feasibility and implementation.",
        "Developed visual design elements and branding materials to enhance product identity.",
      ],
    },
    {
      title: "Translator & Editor",
      company: "OneForma",
      period: "2024 - 2025",
      description: [
        "Translated texts including articles, blog posts, website content, and marketing materials.",
        "Reviewed and edited translations to ensure accuracy, clarity, and cultural relevance.",
      ],
    },
    {
      title: "IT Intern",
      company: "Abia Tech Hub",
      period: "2019 - 2021",
      description: [
        "Developed skills in programming languages, data analysis, and technologies.",
        "Assisted staff and users with technical issues including hardware, software, and networks.",
        "Managed IT support and trained new staff on software tools.",
      ],
    },
    {
      title: "Administrative Assistant",
      company: "Charis Events",
      period: "2017 - 2018",
      description: [
        "Organized corporate events end-to-end and coordinated vendors.",
        "Ensured smooth execution and maintained detailed event checklists.",
      ],
    },
    {
      title: "IT Intern",
      company: "Kings Computer College",
      period: "2018 - 2019",
      description: [
        "Assisted in IT support, installed workstations, and created user accounts.",
        "Learned foundational IT administration and conducted system audits.",
      ],
    },
  ]

  return (
    <section id="experience" className="section-padding bg-[#0a0a0a]">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="border-l border-white/10 pl-6 py-2"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <div>
                  <h3 className="font-mono-title text-lg text-white">{exp.title}</h3>
                  <p className="text-sm text-gray-400">{exp.company}</p>
                </div>
                <span className="text-xs font-mono-text text-gray-500 md:text-right">{exp.period}</span>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-600 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
