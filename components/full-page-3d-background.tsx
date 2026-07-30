'use client'

export default function FullPage3DBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{
        zIndex: -100,
        background: `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.3) 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(84, 150, 66, 0.25) 0%, transparent 45%),
          radial-gradient(circle at 40% 20%, rgba(0, 255, 0, 0.25) 0%, transparent 45%),
          radial-gradient(circle at 70% 30%, rgba(0, 200, 100, 0.2) 0%, transparent 50%)
        `,
        animation: 'pulse 10s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            background: radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.3) 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, rgba(84, 150, 66, 0.25) 0%, transparent 45%),
                        radial-gradient(circle at 40% 20%, rgba(0, 255, 0, 0.25) 0%, transparent 45%),
                        radial-gradient(circle at 70% 30%, rgba(0, 200, 100, 0.2) 0%, transparent 50%);
          }
          25% {
            background: radial-gradient(circle at 30% 60%, rgba(0, 255, 0, 0.35) 0%, transparent 45%),
                        radial-gradient(circle at 70% 70%, rgba(84, 150, 66, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 50% 30%, rgba(0, 255, 0, 0.3) 0%, transparent 45%),
                        radial-gradient(circle at 60% 50%, rgba(0, 200, 100, 0.25) 0%, transparent 50%);
          }
          50% {
            background: radial-gradient(circle at 40% 50%, rgba(0, 255, 0, 0.32) 0%, transparent 42%),
                        radial-gradient(circle at 60% 80%, rgba(84, 150, 66, 0.28) 0%, transparent 47%),
                        radial-gradient(circle at 60% 30%, rgba(0, 255, 0, 0.28) 0%, transparent 46%),
                        radial-gradient(circle at 80% 40%, rgba(0, 200, 100, 0.22) 0%, transparent 50%);
          }
          75% {
            background: radial-gradient(circle at 25% 60%, rgba(0, 255, 0, 0.34) 0%, transparent 44%),
                        radial-gradient(circle at 75% 75%, rgba(84, 150, 66, 0.26) 0%, transparent 46%),
                        radial-gradient(circle at 45% 40%, rgba(0, 255, 0, 0.26) 0%, transparent 44%),
                        radial-gradient(circle at 65% 25%, rgba(0, 200, 100, 0.23) 0%, transparent 50%);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-30px) translateX(-15px); }
          50% { transform: translateY(-60px) translateX(15px); }
          75% { transform: translateY(-30px) translateX(-15px); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        .floating-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(0, 255, 0, 0.8), rgba(84, 150, 66, 0.4));
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.7), 0 0 60px rgba(84, 150, 66, 0.4), inset -2px -2px 5px rgba(0, 0, 0, 0.5);
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }

        .orbiting-particle {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, rgba(0, 255, 0, 0.9), rgba(0, 150, 100, 0.5));
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
          left: 50%;
          top: 50%;
          animation: orbit 12s linear infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`float-${i}`}
          className="floating-particle"
          style={{
            width: `${Math.random() * 60 + 30}px`,
            height: `${Math.random() * 60 + 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}

      {/* Orbiting particles for extra visual effect */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`orbit-${i}`}
          className="orbiting-particle"
          style={{
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
