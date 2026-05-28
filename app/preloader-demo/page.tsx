'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Preloader } from '@/components/preloader'

export default function PreloaderDemoPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show preloader for 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <div key="preloader" className="fixed inset-0 z-50">
          <Preloader />
        </div>
      ) : (
        <div key="content" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#070913] to-[#0f0920]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 holographic-text">Preloader Demo</h1>
            <p className="text-xl text-muted-foreground mb-8">
              The animated preloader displayed for 4 seconds above!
            </p>
            <a href="/" className="text-[#38bdf8] hover:text-[#a855f7] underline text-lg">
              Back to Home
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
