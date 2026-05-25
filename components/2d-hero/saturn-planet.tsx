'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface SaturnPlanetProps {
  mouseX?: number
  mouseY?: number
}

export function SaturnPlanet({ mouseX = 0, mouseY = 0 }: SaturnPlanetProps) {
  // Calculate parallax shift based on mouse position
  const parallaxX = (mouseX / window.innerWidth - 0.5) * 40
  const parallaxY = (mouseY / window.innerHeight - 0.5) * 40

  // Calculate subtle rotation based on mouse position
  const rotateX = (mouseY / 500) * 5
  const rotateY = (mouseX / 500) * 5

  return (
    <motion.div
      className="relative"
      animate={{
        x: parallaxX,
        y: parallaxY,
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 25,
      }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-96 h-96 drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Saturn planet gradient */}
          <radialGradient id="saturnGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#f4d4a8" stopOpacity="1" />
            <stop offset="40%" stopColor="#e8c490" stopOpacity="1" />
            <stop offset="70%" stopColor="#d4a574" stopOpacity="1" />
            <stop offset="100%" stopColor="#c29460" stopOpacity="1" />
          </radialGradient>

          {/* Core glow */}
          <radialGradient id="saturnCoreGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fff4e6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffd699" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
          </radialGradient>

          {/* Ring gradient */}
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8956a" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a8845a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#98744a" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Rotating rings - animated */}
        <motion.g
          animate={{
            rotateZ: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '200px 200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer ring */}
          <ellipse
            cx="200"
            cy="200"
            rx="240"
            ry="80"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="16"
            opacity="0.6"
          />

          {/* Middle ring */}
          <ellipse
            cx="200"
            cy="200"
            rx="220"
            ry="70"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="8"
            opacity="0.4"
          />

          {/* Inner ring */}
          <ellipse
            cx="200"
            cy="200"
            rx="200"
            ry="60"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="4"
            opacity="0.3"
          />
        </motion.g>

        {/* Planet body */}
        <circle cx="200" cy="200" r="160" fill="url(#saturnGradient)" />

        {/* Planet surface details - bands */}
        <ellipse
          cx="200"
          cy="170"
          rx="155"
          ry="20"
          fill="#d49a6a"
          opacity="0.3"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="155"
          ry="15"
          fill="#c28a5a"
          opacity="0.2"
        />
        <ellipse
          cx="200"
          cy="230"
          rx="155"
          ry="18"
          fill="#d49a6a"
          opacity="0.25"
        />

        {/* Core glow */}
        <circle cx="200" cy="200" r="165" fill="url(#saturnCoreGlow)" />

        {/* Atmospheric highlight */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="#fffaee"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Shadow side */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="#8b6f47"
          opacity="0.1"
        />
      </svg>
    </motion.div>
  )
}
