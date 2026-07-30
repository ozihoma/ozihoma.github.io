"use client"

export default function AnimatedBackground() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: -50 }}
    />
  )
}
