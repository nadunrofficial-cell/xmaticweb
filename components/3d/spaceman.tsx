'use client'

import { motion } from 'framer-motion'

export function Spaceman({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -15, 0],
        x: [0, 8, 0],
        rotateZ: [-5, 5, -5],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 200 400"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.4))',
        }}
      >
        <defs>
          <radialGradient id="helmetGlow">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#e8e8e8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d0d0d0" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Helmet glow */}
        <ellipse cx="100" cy="80" rx="50" ry="55" fill="url(#helmetGlow)" />

        {/* Helmet */}
        <circle cx="100" cy="80" r="50" fill="#e6f2ff" stroke="#333" strokeWidth="2" />

        {/* Helmet visor */}
        <ellipse cx="100" cy="85" rx="35" ry="40" fill="#38bdf8" opacity="0.6" stroke="#0284c7" strokeWidth="2" />

        {/* Visor shine/reflection */}
        <motion.ellipse
          cx="80"
          cy="60"
          rx="15"
          ry="20"
          fill="white"
          opacity="0.5"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Head inside helmet */}
        <circle cx="100" cy="70" r="12" fill="#f5d5b8" />

        {/* Neck ring */}
        <ellipse cx="100" cy="135" rx="25" ry="15" fill="#a0a0a0" stroke="#666" strokeWidth="1.5" />

        {/* Main suit body - torso */}
        <path
          d="M 80 150 Q 75 200 80 250 L 120 250 Q 125 200 120 150 Z"
          fill="url(#suitGradient)"
          stroke="#666"
          strokeWidth="2"
        />

        {/* Left arm */}
        <motion.g animate={{ rotateZ: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity }}>
          <path d="M 80 160 Q 50 170 40 210" stroke="url(#suitGradient)" strokeWidth="18" fill="none" strokeLinecap="round" />
          {/* Left glove */}
          <circle cx="40" cy="215" r="12" fill="#e8e8e8" stroke="#666" strokeWidth="1.5" />
        </motion.g>

        {/* Right arm */}
        <motion.g animate={{ rotateZ: [20, -20, 20] }} transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}>
          <path d="M 120 160 Q 150 170 160 210" stroke="url(#suitGradient)" strokeWidth="18" fill="none" strokeLinecap="round" />
          {/* Right glove */}
          <circle cx="160" cy="215" r="12" fill="#e8e8e8" stroke="#666" strokeWidth="1.5" />
        </motion.g>

        {/* Suit details - chest panel */}
        <rect x="90" y="170" width="20" height="60" fill="#a855f7" opacity="0.4" rx="3" stroke="#666" strokeWidth="1" />

        {/* Suit controls/buttons */}
        <circle cx="100" cy="185" r="2" fill="#38bdf8" />
        <circle cx="100" cy="200" r="2" fill="#a855f7" />
        <circle cx="100" cy="215" r="2" fill="#38bdf8" />

        {/* Left leg */}
        <path d="M 85 250 Q 80 310 85 370" stroke="url(#suitGradient)" strokeWidth="16" fill="none" strokeLinecap="round" />
        {/* Left boot */}
        <rect x="78" y="370" width="14" height="20" fill="#333" stroke="#111" strokeWidth="1.5" rx="2" />

        {/* Right leg */}
        <path d="M 115 250 Q 120 310 115 370" stroke="url(#suitGradient)" strokeWidth="16" fill="none" strokeLinecap="round" />
        {/* Right boot */}
        <rect x="108" y="370" width="14" height="20" fill="#333" stroke="#111" strokeWidth="1.5" rx="2" />

        {/* Backpack/PLSS (Primary Life Support System) */}
        <motion.g
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <rect x="115" y="165" width="25" height="70" fill="#e8e8e8" stroke="#666" strokeWidth="1.5" rx="4" />
          <circle cx="122" cy="180" r="3" fill="#38bdf8" />
          <circle cx="130" cy="180" r="3" fill="#a855f7" />
          <circle cx="122" cy="195" r="3" fill="#38bdf8" />
          <circle cx="130" cy="195" r="3" fill="#a855f7" />
          <circle cx="122" cy="210" r="3" fill="#38bdf8" />
          <circle cx="130" cy="210" r="3" fill="#a855f7" />

          {/* Thruster exhaust glow */}
          <ellipse cx="127" cy="235" rx="8" ry="15" fill="#ff6b6b" opacity="0.4" />
        </motion.g>

        {/* Life support line connection */}
        <line x1="127" y1="145" x2="127" y2="165" stroke="#0284c7" strokeWidth="2" opacity="0.6" />

        {/* Utility belt */}
        <ellipse cx="100" cy="255" rx="28" ry="8" fill="#666" stroke="#333" strokeWidth="1.5" />
        <rect x="75" y="252" width="8" height="6" fill="#a855f7" opacity="0.7" />
        <rect x="118" y="252" width="8" height="6" fill="#38bdf8" opacity="0.7" />
      </svg>
    </motion.div>
  )
}
