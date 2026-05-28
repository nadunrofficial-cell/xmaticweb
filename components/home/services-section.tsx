'use client'

import { motion } from 'framer-motion'
import { Brain, Palette, Target, Users, Megaphone, Code } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Planet } from '@/components/3d/planet'

const services = [
  {
    icon: Megaphone,
    title: 'For Brands',
    description: 'Dominate your market with data-driven campaigns, compelling content, and AI-enhanced brand positioning.',
    color: '#a855f7',
    planetColor: '#a855f7',
  },
  {
    icon: Palette,
    title: 'For Creators',
    description: 'Transform your content into a sustainable business with strategic growth and community building.',
    color: '#ec4899',
    planetColor: '#38bdf8',
  },
  {
    icon: Brain,
    title: 'AI Branding',
    description: 'Leverage cutting-edge AI tools to create unique brand identities and automated content workflows.',
    color: '#38bdf8',
    planetColor: '#a855f7',
  },
  {
    icon: Target,
    title: 'Digital Strategy',
    description: 'Custom roadmaps designed to achieve your specific goals with measurable results and ROI.',
    color: '#a855f7',
    planetColor: '#38bdf8',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'High-converting websites and digital experiences that turn visitors into loyal customers.',
    color: '#ec4899',
    planetColor: '#a855f7',
  },
  {
    icon: Users,
    title: 'For Artists',
    description: 'Build your personal brand, grow your fanbase, and monetize your creativity with tailored digital strategies.',
    color: '#38bdf8',
    planetColor: '#38bdf8',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden perspective-1000">
      {/* Cosmic background */}
      <div className="absolute inset-0 cosmic-bg opacity-50" />

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
            <span className="holographic-text">Services for Every</span>
            <br />
            <span className="text-foreground">Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive services are designed to elevate your presence across the digital cosmos
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateY: 5, z: 50 }}
              className="perspective-1000"
            >
              <Card className="bg-card/50 border-border/50 hover:border-[#38bdf8]/50 transition-all duration-300 group h-full relative overflow-hidden glass-premium">
                {/* 3D rotating planet background */}
                <motion.div
                  className="absolute -top-12 -right-12 opacity-20 group-hover:opacity-40 transition-opacity"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Planet color={service.planetColor} size="sm" />
                </motion.div>

                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${service.color}, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                <CardContent className="p-6 relative z-10">
                  {/* Icon with hologram effect */}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all glass-premium"
                    style={{ backgroundColor: `${service.color}20` }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: `0 0 30px ${service.color}80`,
                    }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2 + index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </motion.div>

                  {/* Title with neon effect */}
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-[#38bdf8] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <motion.p
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Animated accent line */}
                  <motion.div
                    className="mt-4 h-1 rounded-full"
                    style={{ backgroundColor: service.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
