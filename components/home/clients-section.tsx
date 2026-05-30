'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ClientLogo {
  id: string
  name: string
  image: string
  width: number
  height: number
}

const clients: ClientLogo[] = [
  { id: 1, name: 'TechVision', image: '/client-logo-1.png', width: 120, height: 60 },
  { id: 2, name: 'CreativeFlow', image: '/client-logo-2.png', width: 120, height: 60 },
  { id: 3, name: 'FinanceHub', image: '/client-logo-3.png', width: 120, height: 60 },
  { id: 4, name: 'ShopHub', image: '/client-logo-4.png', width: 120, height: 60 },
  { id: 5, name: 'CloudSync', image: '/client-logo-5.png', width: 120, height: 60 },
  { id: 6, name: 'MarketPro', image: '/client-logo-6.png', width: 120, height: 60 },
]

export function ClientsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38bdf8]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Clients</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by leading brands and innovative creators worldwide. Together, we&apos;ve achieved remarkable growth and digital transformation.
          </p>
        </motion.div>

        {/* Logos grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <motion.div
                className="relative w-full h-24 sm:h-28 md:h-32 flex items-center justify-center group cursor-pointer"
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* Grayscale to color effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-muted/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <motion.div
                  className="relative w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500"
                  whileHover={{ y: -4 }}
                >
                  <Image
                    src={client.image}
                    alt={client.name}
                    width={client.width}
                    height={client.height}
                    className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain"
                  />
                </motion.div>

                {/* Subtle border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-[#a855f7]/0 group-hover:border-[#a855f7]/30 transition-all duration-300"
                  initial={{ borderColor: 'rgba(168, 85, 247, 0)' }}
                  whileHover={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            ...and many more brands we&apos;re proud to work with
          </p>
        </motion.div>
      </div>
    </section>
  )
}
