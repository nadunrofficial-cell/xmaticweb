'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface OrbitalRingsProps {
  mouseX?: number
  mouseY?: number
}

export function OrbitalRings({ mouseX = 0, mouseY = 0 }: OrbitalRingsProps) {
  // Rings rotate based on mouse position for parallax effect
  const offsetX = (mouseX / 500) * 8
  const offsetY = (mouseY / 500) * 8

  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        x: offsetX,
        y: offsetY,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 40,
      }}
    >
      <defs>
        <linearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <motion.circle
        cx="200"
        cy="200"
        r="220"
        fill="none"
        stroke="url(#ringGradient1)"
        strokeWidth="1.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* Middle ring */}
      <motion.circle
        cx="200"
        cy="200"
        r="270"
        fill="none"
        stroke="url(#ringGradient2)"
        strokeWidth="1"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* Inner accent ring */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill="none"
        stroke="#00d4ff"
        strokeWidth="0.5"
        opacity="0.3"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* Decorative accent points */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      >
        <circle cx="200" cy="80" r="2" fill="#ff6b35" opacity="0.7" />
        <circle cx="320" cy="200" r="2" fill="#00d4ff" opacity="0.7" />
        <circle cx="200" cy="320" r="2" fill="#ff6b35" opacity="0.7" />
        <circle cx="80" cy="200" r="2" fill="#00d4ff" opacity="0.7" />
      </motion.g>
    </motion.svg>
  )
}
