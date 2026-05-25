"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechStart Labs",
    content: "Xmatic Digital transformed our entire digital presence. Their AI-powered approach helped us secure funding and establish ourselves as market leaders in just 6 months.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "Artist & Producer",
    content: "Working with Xmatic was a game-changer for my music career. They understand the creative industry and delivered results that exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "CEO, Luxe Fashion Co.",
    content: "The team at Xmatic combines creativity with data-driven insights perfectly. Our conversion rates doubled within the first quarter of working together.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7]/5 to-transparent" />
      
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
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Do not just take our word for it. Hear from the brands and creators we have helped reach new heights.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-card/50 border-border/50 h-full hover:border-[#a855f7]/50 transition-all duration-300 group relative overflow-hidden">
                {/* Animated background accent */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <CardContent className="p-6 relative z-10">
                  {/* Quote icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Quote className="w-10 h-10 text-[#a855f7]/40 mb-4" />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.p
                    className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    &ldquo;{testimonial.content}&rdquo;
                  </motion.p>
                  
                  {/* Rating */}
                  <motion.div
                    className="flex gap-1 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        <Star className="w-4 h-4 fill-[#38bdf8] text-[#38bdf8]" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Author */}
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#a855f7]"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
