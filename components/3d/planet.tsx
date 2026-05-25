'use client'

import { motion } from 'framer-motion'

interface PlanetProps {
  color?: string
  size?: 'sm' | 'md' | 'lg'
  withRings?: boolean
  className?: string
  hasAtmosphere?: boolean
}

export function Planet({
  color = '#38bdf8',
  size = 'md',
  withRings = false,
  hasAtmosphere = false,
  className = '',
}: PlanetProps) {
  const sizeMap = { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-40 h-40' }
  const viewBoxSize = size === 'sm' ? 100 : size === 'md' ? 150 : 300

  return (
    <motion.div
      className={`${sizeMap[size]} ${className}`}
      animate={{
        rotateY: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 0 30px ${color}80)`,
        }}
      >
        <defs>
          <radialGradient id={`planetGradient-${color}`} cx="35%" cy="35%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="70%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </radialGradient>
          {hasAtmosphere && (
            <radialGradient id={`atmosphere-${color}`}>
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="100%" stopColor={color} stopOpacity="0.2" />
            </radialGradient>
          )}
        </defs>

        {/* Atmosphere glow */}
        {hasAtmosphere && (
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={viewBoxSize / 2 + 10}
            fill={`url(#atmosphere-${color})`}
          />
        )}

        {/* Planet body */}
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={viewBoxSize / 2}
          fill={`url(#planetGradient-${color})`}
          stroke={color}
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Planet surface details */}
        <motion.circle
          cx={viewBoxSize * 0.35}
          cy={viewBoxSize * 0.35}
          r={viewBoxSize * 0.15}
          fill={color}
          opacity="0.3"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Surface patches */}
        <circle
          cx={viewBoxSize * 0.6}
          cy={viewBoxSize * 0.55}
          r={viewBoxSize * 0.1}
          fill={color}
          opacity="0.2"
        />

        {/* Lighting highlight */}
        <motion.ellipse
          cx={viewBoxSize * 0.25}
          cy={viewBoxSize * 0.25}
          rx={viewBoxSize * 0.12}
          ry={viewBoxSize * 0.18}
          fill="white"
          opacity="0.15"
          animate={{
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </svg>

      {/* Rings */}
      {withRings && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotateX: [20, 20, 20],
            rotateZ: 360,
          }}
          transition={{
            rotateZ: { duration: 25, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 0.5 },
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            viewBox={`0 0 ${viewBoxSize + 80} ${viewBoxSize + 80}`}
            className="w-full h-full absolute"
            style={{
              width: `${size === 'sm' ? 'calc(100% + 40px)' : size === 'md' ? 'calc(100% + 60px)' : 'calc(100% + 100px)'}`,
              height: `${size === 'sm' ? 'calc(100% + 40px)' : size === 'md' ? 'calc(100% + 60px)' : 'calc(100% + 100px)'}`,
              left: size === 'sm' ? '-20px' : size === 'md' ? '-30px' : '-50px',
              top: size === 'sm' ? '-20px' : size === 'md' ? '-30px' : '-50px',
            }}
          >
            <defs>
              <linearGradient id={`ringGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="20%" stopColor={color} stopOpacity="0.5" />
                <stop offset="50%" stopColor={color} stopOpacity="0.7" />
                <stop offset="80%" stopColor={color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <ellipse
              cx={`${(viewBoxSize + 80) / 2}`}
              cy={`${(viewBoxSize + 80) / 2}`}
              rx={`${(viewBoxSize + 80) / 2 - 15}`}
              ry={`${(viewBoxSize + 80) / 4}`}
              fill="none"
              stroke={`url(#ringGradient-${color})`}
              strokeWidth="12"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}
