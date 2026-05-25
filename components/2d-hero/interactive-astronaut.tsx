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
  windowHeight 
}: InteractiveAstronautProps) {
  const [isMouseIdle, setIsMouseIdle] = useState(true)
  const lastMouseRef = useRef({ x: mouseX, y: mouseY })
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Motion values for smooth tracking
  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)

  // Spring physics for smooth, natural movement
  const springConfig = { stiffness: 100, damping: 30, mass: 1 }
  const x = useSpring(motionX, springConfig)
  const y = useSpring(motionY, springConfig)

  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-12, 12])

  // Detect mouse idle state
  useEffect(() => {
    const hasMouseMoved = 
      Math.abs(mouseX - lastMouseRef.current.x) > 2 || 
      Math.abs(mouseY - lastMouseRef.current.y) > 2

    if (hasMouseMoved) {
      setIsMouseIdle(false)
      lastMouseRef.current = { x: mouseX, y: mouseY }

      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }

      idleTimeoutRef.current = setTimeout(() => {
        setIsMouseIdle(true)
      }, 2000)
    }

    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
  }, [mouseX, mouseY])

  // Update motion values based on mouse position
  useEffect(() => {
    if (!isMouseIdle && windowWidth > 0 && windowHeight > 0) {
      const normalizedX = (mouseX / windowWidth - 0.5) * 100
      const normalizedY = (mouseY / windowHeight - 0.5) * 100
      motionX.set(normalizedX)
      motionY.set(normalizedY)
    }
  }, [mouseX, mouseY, windowWidth, windowHeight, isMouseIdle, motionX, motionY])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow effects for orange rings - pulsing emission */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Wrist glow - left */}
        <div className="absolute top-[52%] left-[22%] w-16 h-8 bg-orange-500/40 rounded-full blur-xl" />
        {/* Wrist glow - right */}
        <div className="absolute top-[52%] right-[22%] w-16 h-8 bg-orange-500/40 rounded-full blur-xl" />
        {/* Leg glow - left */}
        <div className="absolute bottom-[18%] left-[32%] w-12 h-6 bg-orange-500/30 rounded-full blur-lg" />
        {/* Leg glow - right */}
        <div className="absolute bottom-[18%] right-[32%] w-12 h-6 bg-orange-500/30 rounded-full blur-lg" />
      </motion.div>

      {/* Main astronaut container with 3D transforms */}
      <motion.div
        className="relative w-full max-w-md lg:max-w-lg aspect-[3/4]"
        style={{
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            x: isMouseIdle ? 0 : x,
            y: isMouseIdle ? 0 : y,
            rotateX: isMouseIdle ? 0 : rotateX,
            rotateY: isMouseIdle ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={isMouseIdle ? {
            y: [0, -15, 0, 15, 0],
            rotateZ: [0, -1, 0, 1, 0],
          } : {}}
          transition={isMouseIdle ? {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {
            type: 'spring',
            stiffness: 100,
            damping: 30,
          }}
        >
          {/* Astronaut image */}
          <Image
            src="/astronaut-laptop.png"
            alt="Futuristic astronaut holding laptop"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />

          {/* Additional glow overlay on image for ring emission effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-cyan-500/10 rounded-full blur-2xl" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ambient light effect around astronaut */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </motion.div>
    </div>
  )
}
