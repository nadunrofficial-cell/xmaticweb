'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function Preloader() {
  // Generate animated particles
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * Math.PI * 2,
      distance: 60,
      size: Math.random() * 8 + 4,
    }))
  }, [])

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const floatVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 3 + i * 0.2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.1,
      },
    }),
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#070913] z-50">
      {/* Gradient background */}
      <div className="absolute inset-0 cosmic-bg" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-32 h-32 flex items-center justify-center"
      >
        {/* Outer rotating ring */}
        <motion.div
          variants={orbitVariants}
          animate="animate"
          className="absolute w-32 h-32 border-2 border-transparent rounded-full"
          style={{
            borderTopColor: '#38bdf8',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: '#a855f7',
          }}
        />

        {/* Middle rotating ring (opposite direction) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-24 h-24 border-2 border-transparent rounded-full"
          style={{
            borderTopColor: '#a855f7',
            borderRightColor: '#38bdf8',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
        />

        {/* Inner pulsing core */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, #38bdf8, #a855f7)',
            boxShadow: '0 0 30px rgba(56, 189, 248, 0.8), 0 0 60px rgba(168, 85, 247, 0.4)',
          }}
        />

        {/* Orbiting particles */}
        <motion.div
          variants={orbitVariants}
          animate="animate"
          className="absolute w-32 h-32"
        >
          {particles.map((particle) => {
            const x = Math.cos(particle.angle) * particle.distance
            const y = Math.sin(particle.angle) * particle.distance

            return (
              <motion.div
                key={particle.id}
                custom={particle.id}
                variants={floatVariants}
                animate="animate"
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  background: particle.id % 2 === 0 ? '#38bdf8' : '#a855f7',
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.id % 2 === 0 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(168, 85, 247, 0.8)'}`,
                }}
              />
            )
          })}
        </motion.div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-16 text-center"
      >
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Launching your brand...
        </p>
        <div className="flex gap-2 justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-[#38bdf8]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
