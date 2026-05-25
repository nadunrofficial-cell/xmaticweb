'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

interface InteractiveAstronautProps {
  mouseX: number
  mouseY: number
  windowWidth: number
  windowHeight: number
}

export function InteractiveAstronaut({
  mouseX,
  mouseY,
  windowWidth,
  windowHeight,
}: InteractiveAstronautProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Motion values for smooth parallax
  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)

  // Spring physics for smooth, natural movement
  const springConfig = { stiffness: 100, damping: 30, mass: 1 }
  const x = useSpring(motionX, springConfig)
  const y = useSpring(motionY, springConfig)

  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-12, 12])

  // Detect mouse movement and set idle state
  useEffect(() => {
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current)
    }

    setIsMouseMoving(true)

    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (mouseX / windowWidth - 0.5) * 2
    const normalizedY = (mouseY / windowHeight - 0.5) * 2

    // Update motion values
    motionX.set(normalizedX * 50)
    motionY.set(normalizedY * 50)

    // Set to idle after 2 seconds of no movement
    mouseTimeoutRef.current = setTimeout(() => {
      setIsMouseMoving(false)
    }, 2000)

    return () => {
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
    }
  }, [mouseX, mouseY, windowWidth, windowHeight, motionX, motionY])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      {/* Glow effects for orange rings - positioned behind astronaut */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Left wrist glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-orange-500/40 blur-xl"
          style={{
            top: '52%',
            left: '28%',
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Right wrist glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-orange-500/40 blur-xl"
          style={{
            top: '52%',
            right: '28%',
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        {/* Left leg glow */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-orange-500/30 blur-lg"
          style={{
            bottom: '18%',
            left: '35%',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        {/* Right leg glow */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-orange-500/30 blur-lg"
          style={{
            bottom: '18%',
            right: '35%',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
        />
      </div>

      {/* Main astronaut with 3D parallax effect */}
      <motion.div
        className="relative z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          !isMouseMoving
            ? {
                y: [0, -15, 0],
                rotateZ: [-1, 1, -1],
              }
            : {}
        }
        transition={
          !isMouseMoving
            ? {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      >
        {/* Subtle shadow beneath astronaut */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-cyan-500/20 rounded-full blur-2xl"
          animate={
            !isMouseMoving
              ? {
                  opacity: [0.2, 0.4, 0.2],
                  scaleX: [1, 1.1, 1],
                }
              : { opacity: 0.3 }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Astronaut image */}
        <motion.div
          className="relative w-80 h-[500px] lg:w-96 lg:h-[600px]"
          style={{
            x,
            y,
          }}
        >
          <Image
            src="/astronaut-laptop.png"
            alt="Futuristic astronaut with laptop"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Ambient glow behind astronaut */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl -z-10"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
