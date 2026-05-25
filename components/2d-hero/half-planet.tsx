'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface HalfPlanetProps {
  mouseX?: number
  mouseY?: number
}

export function HalfPlanet({ mouseX = 0, mouseY = 0 }: HalfPlanetProps) {
  // Calculate subtle rotation based on mouse position
  const rotateX = (mouseY / 500) * 5
  const rotateY = (mouseX / 500) * 5

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
      }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-lg drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer planet shell - teal/blue gradient */}
        <defs>
          <radialGradient id="planetGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#0099cc" stopOpacity="1" />
            <stop offset="100%" stopColor="#0052a3" stopOpacity="1" />
          </radialGradient>

          {/* Core glow gradient */}
          <radialGradient id="coreGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff8c42" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
          </radialGradient>

          {/* Mantle gradient */}
          <linearGradient id="mantleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8c42" stopOpacity="1" />
            <stop offset="50%" stopColor="#ff6b35" stopOpacity="1" />
            <stop offset="100%" stopColor="#d94820" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Background circle - crust layer */}
        <circle cx="200" cy="200" r="180" fill="url(#planetGradient)" />

        {/* Cutaway effect - darker edge */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="#003d7a" strokeWidth="2" opacity="0.5" />

        {/* Inner cutaway for depth - mantle layer */}
        <circle cx="200" cy="200" r="140" fill="url(#mantleGradient)" opacity="0.85" />

        {/* Core - orange/red glowing center */}
        <circle cx="200" cy="200" r="80" fill="#ff6b35" />

        {/* Core glow effect */}
        <circle cx="200" cy="200" r="85" fill="url(#coreGlow)" />

        {/* Subtle inner core highlight */}
        <circle cx="200" cy="200" r="50" fill="#ffaa66" opacity="0.4" />

        {/* Add some continental-like texture on the crust */}
        <path
          d="M 280 180 Q 300 200 280 220 Q 260 210 280 180"
          fill="#006699"
          opacity="0.3"
        />
        <path
          d="M 200 120 Q 220 140 200 160 Q 180 150 200 120"
          fill="#006699"
          opacity="0.25"
        />

        {/* Atmospheric glow at edge */}
        <circle
          cx="200"
          cy="200"
          r="185"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="3"
          opacity="0.3"
          filter="blur(2px)"
        />
      </svg>
    </motion.div>
  )
}
