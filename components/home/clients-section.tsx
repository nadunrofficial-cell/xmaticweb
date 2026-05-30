'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const clientLogos = [
  {
    id: 1,
    name: 'Café NOVO',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-yWs0b91VbefOkJdE3uzrBPj2ptv3Ye.png',
  },
  {
    id: 2,
    name: 'Piggara',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-0AcAXOSvvjR5T165O1aEhh2zaPU9Yt.png',
  },
  {
    id: 3,
    name: 'Core Threads',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-AByA4RUXioKdXEqmtwPS0n8eh2nzCx.png',
  },
  {
    id: 4,
    name: 'Training Center',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-VFxT0JfTv3fk59H5ZnIxZTiJKoyMCM.png',
  },
  {
    id: 5,
    name: 'Intigo',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-640DbIDGKZIrNSjwqqHjOq1RycOMA2.png',
  },
  {
    id: 6,
    name: 'Sizzle Restaurant',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-m8jVWBLizQQlqVeppfX22M7bPaOpr5.png',
  },
  {
    id: 7,
    name: 'Custom Works',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-DfDNTTRaXEnLew8uKUVEjboowxSiLu.png',
  },
  {
    id: 8,
    name: 'Dapper',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-C88U9CKV2xaMqysgowXHbsQ2LSSzTS.png',
  },
  {
    id: 9,
    name: 'Mood Fit',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-LO3JIfTK6uOh9q03MM6uJ1aDOlADde.png',
  },
  {
    id: 10,
    name: 'Polish Glow Lab',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-oCTTxPN5wboynWvqu3domZd4473AxV.png',
  },
  {
    id: 11,
    name: 'ClickClick.lk',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-HIQAG8JJflv3hCf5ZEQOGgVTkEAKIn.png',
  },
  {
    id: 12,
    name: 'Sapporrosri Co Ltd',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-EsjGOzfB5nVzJIh18df12EwJJ01Yv3.png',
  },
  {
    id: 13,
    name: 'Zodiac 11:11',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-S2YOyuq5DrWGb9N4Ab1wREHy2NRrQE.png',
  },
  {
    id: 14,
    name: 'Hela Masks',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-xxR6D3ne8qyTl71pGkDk0cuG1f6ucL.png',
  },
  {
    id: 15,
    name: 'Minimal',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-77E8LoYLABr5a42SlUCcolABdFizS4.png',
  },
]

// Duplicate the logos for seamless scrolling
const duplicatedLogos = [...clientLogos, ...clientLogos]

export function ClientsSection() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Leading Brands</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We&apos;ve had the pleasure of partnering with innovative companies across diverse industries.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />

        {/* Marquee content */}
        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: isPaused ? 0 : [-1000, -3000],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
            paused: isPaused,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 w-40 h-32 flex items-center justify-center rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm hover:border-[#38bdf8]/50 hover:bg-card/60 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="relative w-full h-full flex items-center justify-center p-4">
                {/* Grayscale by default, color on hover */}
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  fill
                  className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 160px"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-12"
      >
        <p className="text-muted-foreground text-sm">
          Hover to pause • Scroll through {clientLogos.length}+ trusted partners
        </p>
      </motion.div>
    </section>
  )
}
