'use client'

import { motion } from 'framer-motion'

interface AstronautProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'floating' | 'walking' | 'celebrating' | 'thinking'
  className?: string
}

const sizeMap = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48'
}

export function Astronaut({ size = 'md', variant = 'floating', className = '' }: AstronautProps) {
  const animationVariants = {
    floating: {
      y: [0, -20, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    walking: {
      x: [0, 10, 0],
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    celebrating: {
      y: [0, -30, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    thinking: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div
      className={`${sizeMap[size]} ${className}`}
      animate={animationVariants[variant]}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow effect */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        {/* Body - Suit */}
        <ellipse cx="100" cy="120" rx="35" ry="45" fill="url(#suitGradient)" filter="url(#glow)"/>

        {/* Arms */}
        <circle cx="65" cy="110" r="12" fill="url(#suitGradient)" filter="url(#glow)"/>
        <circle cx="135" cy="110" r="12" fill="url(#suitGradient)" filter="url(#glow)"/>
        <rect x="60" y="105" width="10" height="30" rx="5" fill="#0284c7" opacity="0.8"/>
        <rect x="130" y="105" width="10" height="30" rx="5" fill="#0284c7" opacity="0.8"/>

        {/* Legs */}
        <rect x="85" y="155" width="12" height="35" rx="6" fill="#0284c7" opacity="0.9"/>
        <rect x="103" y="155" width="12" height="35" rx="6" fill="#0284c7" opacity="0.9"/>

        {/* Boots */}
        <ellipse cx="91" cy="195" rx="8" ry="6" fill="#1e293b"/>
        <ellipse cx="109" cy="195" rx="8" ry="6" fill="#1e293b"/>

        {/* Neck connector */}
        <rect x="92" y="70" width="16" height="12" fill="#0284c7" opacity="0.7"/>

        {/* Helmet - Glass dome */}
        <circle cx="100" cy="50" r="28" fill="url(#helmetGradient)" stroke="#38bdf8" strokeWidth="2" filter="url(#glow)"/>

        {/* Helmet shine effect */}
        <ellipse cx="88" cy="35" rx="10" ry="15" fill="#ffffff" opacity="0.2"/>

        {/* Eyes */}
        <circle cx="92" cy="48" r="3.5" fill="#38bdf8"/>
        <circle cx="108" cy="48" r="3.5" fill="#38bdf8"/>

        {/* Visor glow */}
        <circle cx="100" cy="50" r="22" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5"/>

        {/* Antenna */}
        <line x1="100" y1="22" x2="100" y2="5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="100" cy="3" r="2.5" fill="#a855f7"/>

        {/* Chest detail */}
        <rect x="88" y="100" width="24" height="20" rx="2" fill="#a855f7" opacity="0.3" stroke="#a855f7" strokeWidth="1"/>
        <circle cx="94" cy="110" r="2" fill="#38bdf8" opacity="0.6"/>
        <circle cx="100" cy="110" r="2" fill="#38bdf8" opacity="0.6"/>
        <circle cx="106" cy="110" r="2" fill="#38bdf8" opacity="0.6"/>

        {/* Badge */}
        <rect x="92" y="85" width="16" height="12" rx="1" fill="#fbbf24" opacity="0.8"/>
      </svg>
    </motion.div>
  )
}
