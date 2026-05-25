'use client'

import { motion } from 'framer-motion'

export function Galaxy({ className = '' }: { className?: string }) {
  const stars = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    size: Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }))

  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden ${className}`}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 120,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* Galactic center glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#a855f7]/30 via-transparent to-transparent"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Stars in galaxy */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: Math.random() > 0.5 ? '#38bdf8' : '#a855f7',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Dust lanes */}
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(56, 189, 248, 0.1) 100%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}
