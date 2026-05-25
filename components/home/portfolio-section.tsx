'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Astronaut } from '@/components/astronaut'

const portfolioItems = [
  {
    title: "Urban Beats Records",
    category: "Artist Branding",
    description: "Complete brand identity and social media strategy for an emerging record label.",
    metrics: "+320% Social Growth",
    gradient: "from-[#38bdf8] to-[#0ea5e9]",
  },
  {
    title: "Luxe Fashion Co.",
    category: "E-commerce",
    description: "AI-powered content strategy and web redesign for a luxury fashion brand.",
    metrics: "2.5x Conversion Rate",
    gradient: "from-[#a855f7] to-[#7c3aed]",
  },
  {
    title: "TechStart Labs",
    category: "Startup Launch",
    description: "Full digital presence build for a tech startup from zero to market leader.",
    metrics: "$2M in Funding Secured",
    gradient: "from-[#ec4899] to-[#db2777]",
  },
  {
    title: "Wellness Journey",
    category: "Content Creator",
    description: "Personal brand development and monetization strategy for a wellness influencer.",
    metrics: "100K+ Followers in 6 Months",
    gradient: "from-[#38bdf8] to-[#a855f7]",
  },
]

export function PortfolioSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real results for real brands. See how we have helped businesses launch into their next orbit.
          </p>
        </motion.div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-card/50 border-border/50 overflow-hidden hover:border-[#38bdf8]/50 transition-all duration-300 h-full hover:shadow-lg hover:shadow-[#38bdf8]/20">
                <CardContent className="p-0">
                  {/* Gradient header */}
                  <motion.div
                    className={`h-48 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="absolute inset-0 bg-[#070913]/40" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div
                        className="w-16 h-16 rounded-full glass flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.15 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </motion.div>
                    </div>
                    {/* Metric badge */}
                    <motion.div
                      className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-sm font-medium text-white"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.metrics}
                    </motion.div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <span className="text-[#38bdf8] text-sm font-medium uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">{item.description}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                    >
                      <Button variant="ghost" size="sm" className="text-[#38bdf8] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 p-0">
                        View Case Study <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Celebrating astronaut */}
          <motion.div
            className="absolute -bottom-20 -right-10 opacity-30 md:opacity-100 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Astronaut size="md" variant="celebrating" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
