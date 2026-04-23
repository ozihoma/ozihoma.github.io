"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500 text-xs">
          <p>© {currentYear} Henry Azubuike. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
