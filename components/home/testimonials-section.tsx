"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Nethmi Amarathunga",
    role: "Managing Director",
    company: "Japan Lanka Seiyo",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/japan%20lanka-33IIMFjxo8saYXIKxrtQLRY8I6WC6P.png",
    content: "X Matic improved our digital marketing in a very structured way. We've seen a clear increase in quality inquiries and stronger online visibility, and we are now recognized and award-winning within our sector as a leading education and visa consultancy brand.",
    rating: 5,
  },
  {
    name: "Ruchira De Silva",
    role: "Founder & Band Leader",
    company: "DeSilva Brothers",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/desilva%20brothers-q4PdEesxhbAa2kYLww2Su7EbNvD33q.png",
    content: "From day one, X Matic understood our identity perfectly. They enhanced our digital presence without changing our style and helped us connect with music fans more organically.",
    rating: 5,
  },
  {
    name: "Rohitha Rukmal",
    role: "Founder & Owner",
    company: "MINIMAL",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minimal-ne6ZN057JL8xeJDZaTTXqw5vSeh7ht.png",
    content: "It's not easy to find a marketing team that truly understands minimalist branding. X Matic refined our online presence exactly to match our identity, improving engagement and recognition.",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-card/40 border-border/30 h-full hover:border-[#a855f7]/40 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm">
                {/* Animated background accent */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <CardContent className="p-8 relative z-10 flex flex-col h-full">
                  {/* Client Logo - Circular */}
                  <motion.div
                    className="mb-6 flex-shrink-0"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={testimonial.logo}
                      alt={testimonial.company}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#a855f7]/20 shadow-lg"
                    />
                  </motion.div>

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
                    <Quote className="w-8 h-8 text-[#a855f7]/30 mb-4" />
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors text-sm md:text-base flex-grow"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    &ldquo;{testimonial.content}&rdquo;
                  </motion.p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#a855f7]/20 to-transparent mb-5" />

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
                        <Star className="w-4 h-4 fill-[#a855f7] text-[#a855f7]" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Author Info */}
                  <motion.div whileHover={{ x: 2 }} className="mt-auto">
                    <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-[#a855f7]/70 font-medium mt-1">{testimonial.company}</p>
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
