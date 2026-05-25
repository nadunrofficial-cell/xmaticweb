'use client'

import { motion } from 'framer-motion'
import { Rocket, Search, Lightbulb, Zap, TrendingUp } from 'lucide-react'
import { Spaceman } from '@/components/3d/spaceman'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, audience, and goals to understand what makes you unique.',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: 'Strategy',
    description: 'Our team crafts a custom roadmap combining AI insights with creative strategy.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Launch',
    description: 'We execute your campaigns with precision, creating content that resonates and converts.',
  },
  {
    icon: Zap,
    step: '04',
    title: 'Optimize',
    description: 'Continuous monitoring and AI-powered optimizations ensure maximum performance.',
  },
  {
    icon: TrendingUp,
    step: '05',
    title: 'Scale',
    description: 'As results grow, we scale your success to new heights and new audiences.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden perspective-1000">
      {/* Cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="holographic-text">Our Journey Through</span>
            <br />
            <span className="text-foreground">Digital Space</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A structured approach to launching your brand to unprecedented heights
          </p>
        </motion.div>

        {/* Main timeline */}
        <div className="grid lg:grid-cols-5 gap-4 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection line (not for last item) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-24 left-full w-full h-1 bg-gradient-to-r from-[#38bdf8] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}

              {/* Card */}
              <motion.div
                className="glass-premium rounded-2xl p-6 text-center h-full group hover:shadow-lg hover:shadow-[#38bdf8]/30 transition-all"
                whileHover={{
                  rotateY: 10,
                  z: 20,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Step number with glow */}
                <motion.div
                  className="text-4xl font-bold mb-4 holographic-text"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {step.step}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38bdf8]/20 to-[#a855f7]/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all"
                  whileHover={{
                    scale: 1.15,
                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)',
                  }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <step.icon className="w-6 h-6 text-[#38bdf8]" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#38bdf8] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {step.description}
                </p>

                {/* Animated accent */}
                <motion.div
                  className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#a855f7]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Spaceman guide section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative glass-premium rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Spaceman */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex justify-center order-2 lg:order-1"
            >
              <div className="w-64 h-64">
                <Spaceman />
              </div>
            </motion.div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold mb-4">
                  <span className="holographic-text">Your Mission Guide</span>
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every mission needs an experienced spaceman. Our team guides you through each phase of your digital journey, ensuring you reach your destination with flying colors. Think of us as your mission control center in the digital universe.
                </p>

                <motion.div className="space-y-4">
                  {[
                    { icon: '🚀', label: 'Expert navigation' },
                    { icon: '🛰️', label: 'Real-time monitoring' },
                    { icon: '⭐', label: 'Course correction' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-foreground"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
