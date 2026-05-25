'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const PLANETS = [
  {
    name: 'Earth',
    colors: {
      outer: '#0099cc',
      middle: '#00d4ff',
      core: '#ff6b35',
      accent: '#006699',
    },
    description: 'Our Blue Planet',
  },
  {
    name: 'Mars',
    colors: {
      outer: '#d94820',
      middle: '#ff6b35',
      core: '#ff8c42',
      accent: '#a03020',
    },
    description: 'The Red Planet',
  },
  {
    name: 'Jupiter',
    colors: {
      outer: '#cc8844',
      middle: '#dd9955',
      core: '#ffaa66',
      accent: '#996633',
    },
    description: 'Gas Giant',
  },
  {
    name: 'Neptune',
    colors: {
      outer: '#0052a3',
      middle: '#0099cc',
      core: '#00d4ff',
      accent: '#003d7a',
    },
    description: 'Ice Giant',
  },
]

interface PlanetRotatorProps {
  mouseX?: number
  mouseY?: number
}

export function PlanetRotator({ mouseX = 0, mouseY = 0 }: PlanetRotatorProps) {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentPlanet = PLANETS[currentPlanetIndex]

  // Auto-rotate every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length)
        setIsTransitioning(false)
      }, 300)
    }, 60000) // 60 seconds

    return () => clearInterval(interval)
  }, [])

  // Rotate on wheel scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      clearTimeout(scrollTimeout)
      setIsTransitioning(true)

      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length)
        } else {
          setCurrentPlanetIndex((prev) => (prev - 1 + PLANETS.length) % PLANETS.length)
        }
        setIsTransitioning(false)
      }, 150)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const rotateX = (mouseY / 500) * 8
  const rotateY = (mouseX / 500) * 8

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
      {/* Planet Container */}
      <motion.div
        className="relative"
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
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.svg
          viewBox="0 0 400 400"
          className="w-80 h-80 drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            opacity: isTransitioning ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <defs>
            <radialGradient id="planetGradient" cx="35%" cy="35%">
              <stop offset="0%" stopColor={currentPlanet.colors.outer} stopOpacity="1" />
              <stop offset="50%" stopColor={currentPlanet.colors.middle} stopOpacity="1" />
              <stop offset="100%" stopColor={currentPlanet.colors.core} stopOpacity="0.8" />
            </radialGradient>

            <radialGradient id="coreGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={currentPlanet.colors.core} stopOpacity="0.6" />
              <stop offset="50%" stopColor={currentPlanet.colors.middle} stopOpacity="0.3" />
              <stop offset="100%" stopColor={currentPlanet.colors.core} stopOpacity="0" />
            </radialGradient>

            <linearGradient id="mantleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentPlanet.colors.middle} stopOpacity="1" />
              <stop offset="50%" stopColor={currentPlanet.colors.core} stopOpacity="1" />
              <stop offset="100%" stopColor={currentPlanet.colors.accent} stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Outer shell */}
          <circle cx="200" cy="200" r="180" fill="url(#planetGradient)" />

          {/* Shell border */}
          <circle cx="200" cy="200" r="180" fill="none" stroke={currentPlanet.colors.accent} strokeWidth="2" opacity="0.4" />

          {/* Mantle layer */}
          <circle cx="200" cy="200" r="140" fill="url(#mantleGradient)" opacity="0.85" />

          {/* Core */}
          <circle cx="200" cy="200" r="80" fill={currentPlanet.colors.core} />

          {/* Core glow */}
          <circle cx="200" cy="200" r="85" fill="url(#coreGlow)" />

          {/* Inner core highlight */}
          <circle cx="200" cy="200" r="50" fill={currentPlanet.colors.middle} opacity="0.3" />

          {/* Surface features */}
          <path
            d="M 280 180 Q 300 200 280 220 Q 260 210 280 180"
            fill={currentPlanet.colors.accent}
            opacity="0.2"
          />
          <path
            d="M 200 120 Q 220 140 200 160 Q 180 150 200 120"
            fill={currentPlanet.colors.accent}
            opacity="0.15"
          />

          {/* Atmospheric glow */}
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke={currentPlanet.colors.middle}
            strokeWidth="2"
            opacity="0.25"
            filter="blur(2px)"
          />
        </motion.svg>
      </motion.div>

      {/* Planet Info Display */}
      <motion.div
        className="text-center"
        animate={{
          opacity: isTransitioning ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white mb-1">{currentPlanet.name}</h3>
        <p className="text-sm text-gray-400">{currentPlanet.description}</p>
      </motion.div>

      {/* Planet Indicators */}
      <div className="flex gap-2">
        {PLANETS.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentPlanetIndex
                ? 'bg-[#00d4ff]'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentPlanetIndex(index)
                setIsTransitioning(false)
              }, 300)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
