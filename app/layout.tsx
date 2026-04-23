import type React from "react"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Henry Azubuike - Portfolio",
  description: "Software Developer | Product Manager | Copywriter | AI Engineer",
  keywords: ["Software Developer", "Product Manager", "Copywriter", "AI Engineer", "Henry Azubuike", "Portfolio"],
  authors: [{ name: "Henry Azubuike" }],
  creator: "Henry Azubuike",
  openGraph: {
    title: "Henry Azubuike - Portfolio",
    description: "Software Developer | Product Manager | Copywriter | AI Engineer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Azubuike - Portfolio",
    description: "Software Developer | Product Manager | Copywriter | AI Engineer",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-[#0a0a0a] scroll-smooth">
      <body className={`${inter.className} ${ibmPlexMono.variable} dark bg-[#0a0a0a] text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AnimatedBackground />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
