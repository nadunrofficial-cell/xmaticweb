'use client'

import { motion } from 'framer-motion'

const brands = [
  {
    name: 'Piyara',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-nlsnFPbalEV9z8WWQRl1vAE3j7AmWn.png',
  },
  {
    name: 'Café NOVO',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-glASQFRh58HGx2WTE4EPu1a7AaCO6s.png',
  },
  {
    name: 'De Silva Brothers',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-RruBEDdnahD614U6E2TDmOGFmoKlDx.png',
  },
  {
    name: 'INTIGO',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-6c0WyjuQcYuI5mR4y10oRsOeWAeyEL.png',
  },
  {
    name: 'Sizzle Restaurant',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-NiJX8M0uYrB71OvNHxKUJVcVgwOj0f.png',
  },
  {
    name: 'Custom Works',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-sMV1aaVnl4lIvo5UUENFQlrlnY9ZmM.png',
  },
  {
    name: 'Mood Fit',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-kYnemtFhfRIEmTXHsId53CjJOqmUSf.png',
  },
  {
    name: 'Polish Glow Lab',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-2nJgKTDIDEsE0ICXXLoGXVedUa5ZOj.png',
  },
  {
    name: 'ClickClick.lk',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-0aXA1sfME45y3Gq21nmXVBmTsFyAKl.png',
  },
  {
    name: 'Sapporoshi Co.Ltd',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-WYMSD5nbFI2MCGBUH1PfhbLaJk2qVI.png',
  },
  {
    name: 'Astrology 11:11',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-DyqDTP44Tx7jRZwF1tZ8f6aluaYcFi.png',
  },
  {
    name: 'Hela Masks',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-3fTFpx5qKSbIgV46CIk48M0oPERKYL.png',
  },
  {
    name: 'Minimal',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minimal-VSd6OCeILIbpvuu92Kl6DZtiEiXjdJ.png',
  },
  {
    name: 'Core Threats',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-jXJyDHkPqfeVWdCtBpNVUi27nsP3N4.png',
  },
  {
    name: 'Japan Lanka',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/japan%20lanka-JIowTbim3zkNUN9nFz32PZ8vud4IdG.png',
  },
]

function BrandLogo({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="flex-shrink-0 h-20 w-28 md:h-24 md:w-32 flex items-center justify-center px-6">
      <img
        src={logo}
        alt={name}
        className="h-full w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  )
}

export function TrustedBrandsSection() {
  // Create duplicate of brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands]

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-background/80">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Trusted by <span className="gradient-text">Leading Brands</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto text-balance">
            Join the businesses that trust us to elevate their digital presence and drive growth
          </p>
        </motion.div>

        {/* Marquee container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling container with CSS animation */}
          <div className="overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-100%);
                }
              }
              
              .marquee-track {
                display: flex;
                gap: 2rem;
                animation: marquee 40s linear infinite;
                will-change: transform;
              }
              
              @media (min-width: 768px) {
                .marquee-track {
                  gap: 3rem;
                }
              }
              
              .group:hover .marquee-track {
                animation-play-state: paused;
              }
            `}</style>
            <div className="marquee-track">
              {duplicatedBrands.map((brand, index) => (
                <BrandLogo key={`${brand.name}-${index}`} logo={brand.logo} name={brand.name} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
