'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const featuredMembers = [
  {
    name: 'Ashen Vidusha',
    position: 'Project Manager',
    description: 'Coordinates projects from planning to delivery, ensuring smooth communication, efficient workflows, and timely execution. Works closely with the team to maintain quality standards and keep every project on track.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ashen%20vidusha-zGlfnDkw8reKRpHfeNPDtTh6142YlO.png',
  },
  {
    name: 'Nadun Alahakoon',
    position: 'Creative Director',
    description: 'Leads Xmatic\'s creative vision, brand strategy, and marketing direction. Oversees content, branding, and digital campaigns while ensuring every project delivers meaningful results and a strong brand experience.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nadun%20alahakoon-iv1nv1k59CRVxZpzwpFZdDGjCVQ066.png',
  },
]

const secondaryMembers = [
  {
    name: 'Chathura Wickramasinghe',
    position: 'Videographer / Content Creator',
  },
  {
    name: 'Tharushi Jayawardena',
    position: 'Digital Marketing Specialist',
  },
  {
    name: 'Buddika Edirisinghe',
    position: 'Full Stack Developer',
  },
]

export function TeamSection() {
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
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Meet the <span className="gradient-text">Brilliant Minds</span> Behind Xmatic
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto text-balance">
            A talented team dedicated to transforming your digital vision into reality
          </p>
        </motion.div>

        {/* Featured Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          {featuredMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row gap-8 items-start"
            >
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-[#a855f7]/20 hover:ring-[#a855f7]/40 transition-all duration-300 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Animated overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/20 to-transparent opacity-0 hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div className="flex-1 pt-2">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-lg text-[#a855f7] font-semibold mb-4"
                >
                  {member.position}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-sm md:text-base leading-relaxed"
                >
                  {member.description}
                </motion.p>

                {/* Accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="h-1 bg-gradient-to-r from-[#a855f7] to-transparent mt-6"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-20"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
        </motion.div>

        {/* Secondary Members */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-balance">
            <span className="gradient-text">Supporting Team</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {secondaryMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-card/40 border-border/30 hover:border-[#a855f7]/40 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm h-full">
                  {/* Animated background accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-[#a855f7]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-[#a855f7] transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {member.position}
                      </p>
                    </motion.div>

                    {/* Accent bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: 40 }}
                      transition={{ duration: 0.3 }}
                      className="h-0.5 bg-gradient-to-r from-[#a855f7] to-transparent mt-4"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
