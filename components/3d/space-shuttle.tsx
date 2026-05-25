'use client'

import { motion } from 'framer-motion'

export function SpaceShuttle({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full filter drop-shadow-lg"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))',
        }}
      >
        {/* Main fuselage */}
        <defs>
          <linearGradient id="shuttleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e0e0e0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b0b0b0" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow effect */}
        <ellipse cx="200" cy="150" rx="80" ry="100" fill="url(#glowGradient)" opacity="0.3" />

        {/* Nose cone */}
        <path d="M 200 40 L 220 100 L 180 100 Z" fill="#e8e8e8" stroke="#333" strokeWidth="2" />

        {/* Main body */}
        <ellipse cx="200" cy="140" rx="60" ry="80" fill="url(#shuttleGradient)" stroke="#666" strokeWidth="2" />

        {/* Cockpit window */}
        <ellipse cx="200" cy="70" rx="20" ry="25" fill="#87CEEB" stroke="#333" strokeWidth="2" opacity="0.8" />

        {/* Left wing */}
        <path d="M 140 130 L 80 150 L 110 160 L 140 150 Z" fill="#d0d0d0" stroke="#666" strokeWidth="2" />

        {/* Right wing */}
        <path d="M 260 130 L 320 150 L 290 160 L 260 150 Z" fill="#d0d0d0" stroke="#666" strokeWidth="2" />

        {/* Tail fins */}
        <path d="M 190 210 L 160 260 L 180 240 Z" fill="#a0a0a0" stroke="#666" strokeWidth="2" />
        <path d="M 210 210 L 240 260 L 220 240 Z" fill="#a0a0a0" stroke="#666" strokeWidth="2" />

        {/* Main thruster engines - animated */}
        <motion.g
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        >
          {/* Left engine */}
          <circle cx="170" cy="220" r="12" fill="#ff6b6b" opacity="0.8" filter="url(#glowGradient)" />
          <circle cx="170" cy="220" r="8" fill="#ff4444" />

          {/* Right engine */}
          <circle cx="230" cy="220" r="12" fill="#ff6b6b" opacity="0.8" filter="url(#glowGradient)" />
          <circle cx="230" cy="220" r="8" fill="#ff4444" />
        </motion.g>

        {/* Thruster flames */}
        <motion.path
          d="M 170 230 Q 165 260 170 290 Q 175 260 170 230"
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="3"
          opacity="0.6"
          animate={{
            d: [
              'M 170 230 Q 165 260 170 290 Q 175 260 170 230',
              'M 170 230 Q 160 270 170 300 Q 180 270 170 230',
              'M 170 230 Q 165 260 170 290 Q 175 260 170 230',
            ],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
        />

        <motion.path
          d="M 230 230 Q 235 260 230 290 Q 225 260 230 230"
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="3"
          opacity="0.6"
          animate={{
            d: [
              'M 230 230 Q 235 260 230 290 Q 225 260 230 230',
              'M 230 230 Q 240 270 230 300 Q 220 270 230 230',
              'M 230 230 Q 235 260 230 290 Q 225 260 230 230',
            ],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
        />

        {/* Landing gear */}
        <line x1="180" y1="210" x2="175" y2="240" stroke="#666" strokeWidth="3" />
        <line x1="220" y1="210" x2="225" y2="240" stroke="#666" strokeWidth="3" />
        <circle cx="175" cy="245" r="4" fill="#333" />
        <circle cx="225" cy="245" r="4" fill="#333" />

        {/* Solar panels */}
        <rect x="130" y="140" width="15" height="40" fill="#ffd700" opacity="0.7" stroke="#666" strokeWidth="1" />
        <rect x="255" y="140" width="15" height="40" fill="#ffd700" opacity="0.7" stroke="#666" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}
