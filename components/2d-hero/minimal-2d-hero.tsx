'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'
import { Starfield } from './starfield'
import { InteractiveAstronaut } from './interactive-astronaut'

export function Minimal2DHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 })

  // Generate random blinking circles
  const blinkingCircles = useMemo(() => {
    const circles = []
    const isSmallScreen = windowSize.width < 1024
    for (let i = 0; i < 8; i++) {
      circles.push({
        id: i,
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        size: isSmallScreen ? Math.random() * 20 + 5 : Math.random() * 40 + 15,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      })
    }
    return circles
  }, [windowSize.width])

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050810]">
      {/* Darker background with minimal gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#050810] to-[#0a0e1a]">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-[#00d4ff]/1 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tl from-[#ff6b35]/1 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Blinking white circles scattered in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {blinkingCircles.map((circle) => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${circle.top}%`,
              left: `${circle.left}%`,
              width: circle.size,
              height: circle.size,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              delay: circle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Starfield background - darker and smaller */}
      <Starfield mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center justify-center px-6 sm:px-8 lg:px-12 py-20 lg:py-0">
        {/* Left side - Typography and CTA */}
        <motion.div
          className="flex flex-col justify-center space-y-6 sm:space-y-8 order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main headline - Original content restored */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
          >
            Launch Your Brand{' '}
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#38bdf8] bg-clip-text text-transparent">
              Into the Digital Space
            </span>
          </motion.h1>

          {/* Subtitle - Original content restored */}
          <motion.p 
            variants={itemVariants} 
            className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed"
          >
            Elevate your brand with cutting-edge digital marketing strategies designed to propel your business to new heights in the digital universe.
          </motion.p>

          {/* CTA Button with magnetic effect */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="relative w-fit"
              animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#a855f7] rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300" />
              <Link
                href="/about#contact"
                className="group relative px-8 py-4 bg-[#050810]/80 backdrop-blur-md border border-[#38bdf8]/30 rounded-full text-white font-semibold flex items-center gap-3 hover:border-[#38bdf8]/60 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Your Journey
                <motion.span
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 sm:gap-8 pt-4 border-t border-[#38bdf8]/10"
          >
            {[
              { value: '500+', label: 'Projects Launched' },
              { value: '150+', label: 'Happy Clients' },
              { value: '6+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-[#38bdf8]">{stat.value}</span>
                <span className="text-xs sm:text-sm text-gray-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile - Interactive Astronaut */}
        <motion.div
          className="relative w-full h-auto flex items-center justify-center order-2 lg:hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative w-full max-w-xs h-[350px]">
            <Image
              src="/astronaut-laptop.png"
              alt="Futuristic astronaut with laptop"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Desktop - Interactive Astronaut with Full Effects */}
        <motion.div
          className="hidden lg:flex relative w-full h-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <InteractiveAstronaut
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            windowWidth={windowSize.width}
            windowHeight={windowSize.height}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#38bdf8]/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-[#38bdf8]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}



