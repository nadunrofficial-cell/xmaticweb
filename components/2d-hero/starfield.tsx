'use client'

import { motion } from 'framer-motion'
import React, { useMemo } from 'react'

interface StarfieldProps {
  mouseX?: number
  mouseY?: number
}

export function Starfield({ mouseX = 0, mouseY = 0 }: StarfieldProps) {
  // Generate random stars that stay consistent - smaller and fewer
  const stars = useMemo(() => {
    const starsArray = []
    for (let i = 0; i < 20; i++) {
      starsArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }
    return starsArray
  }, [])

  // Subtle parallax offset
  const offsetX = (mouseX / 1500) * 1
  const offsetY = (mouseY / 1500) * 1

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      animate={{
        x: offsetX,
        y: offsetY,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {stars.map((star) => (
          <motion.circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="#888888"
            opacity={star.opacity}
            animate={{
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

