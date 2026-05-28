'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InteractiveAstronaut } from '@/components/2d-hero/interactive-astronaut'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function CTASection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 })

  useEffect(() => {
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
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-[#38bdf8]/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#a855f7]/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Interactive Astronaut */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex justify-center"
          >
            <InteractiveAstronaut
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
              windowWidth={windowSize.width}
              windowHeight={windowSize.height}
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background card */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8]/20 via-[#a855f7]/20 to-[#38bdf8]/20 rounded-3xl blur-3xl" />
            
            <div className="relative glass rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 bg-[#38bdf8]/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
              
              <div className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
                    Ready to <span className="gradient-text">Launch Your Brand</span>?
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Book a free strategy call with our team and discover how we can help you reach new heights in the digital universe.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0 px-8 py-6 text-lg glow-blue group rounded-full"
                  >
                    <Link href="/about#contact">
                      <Calendar className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Book Call
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border-[#25D366] text-white bg-[#25D366] hover:bg-[#25D366]/90 px-8 py-6 text-lg rounded-full font-semibold"
                  >
                    <a
                      href="https://wa.me/940760755805?text=Hi%20Xmatic%20Digital!%20I'm%20interested%20in%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      WhatsApp
                    </a>
                  </Button>
                </motion.div>
                
                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 pt-4 border-t border-border"
                >
                  {[
                    { icon: '✓', text: 'No commitment required' },
                    { icon: '⏱', text: '30-min consultation' },
                    { icon: '🎯', text: 'Custom strategy' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <span className="text-[#38bdf8]">{item.icon}</span>
                      {item.text}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
