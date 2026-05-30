"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Nethmi Amarathunga",
    role: "Managing Director",
    company: "Japan Lanka Seiyo",
    content: "X Matic improved our digital marketing in a very structured way. We've seen a clear increase in quality inquiries and stronger online visibility, and we are now recognized and award-winning within our sector as a leading education and visa consultancy brand.",
    logo: "/clients/japan-lanka.png",
  },
  {
    name: "Ruchira De Silva",
    role: "Founder & Band Leader",
    company: "DeSilva Brothers",
    content: "From day one, X Matic understood our identity perfectly. They enhanced our digital presence without changing our style and helped us connect with music fans more organically.",
    logo: "/clients/desilva-brothers.png",
  },
  {
    name: "Rohitha Rukmal",
    role: "Founder & Owner",
    company: "MINIMAL",
    content: "It's not easy to find a marketing team that truly understands minimalist branding. X Matic refined our online presence exactly to match our identity, improving engagement and recognition.",
    logo: "/clients/minimal.png",
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
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 h-full hover:border-[#a855f7]/40 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm">
                {/* Animated background accent */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-[#a855f7]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <CardContent className="p-8 relative z-10 flex flex-col h-full">
                  {/* Client logo */}
                  <motion.div
                    className="mb-6 inline-flex"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 p-2 flex items-center justify-center overflow-hidden hover:border-[#a855f7]/40 transition-colors">
                      <Image
                        src={testimonial.logo}
                        alt={testimonial.company}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Testimonial content */}
                  <motion.p
                    className="text-muted-foreground leading-relaxed flex-grow mb-6 group-hover:text-foreground transition-colors text-sm md:text-base"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    &ldquo;{testimonial.content}&rdquo;
                  </motion.p>
                  
                  {/* Author info */}
                  <motion.div
                    className="border-t border-white/10 pt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground mb-1">{testimonial.role}</p>
                    <p className="text-xs font-medium text-[#a855f7]/70">{testimonial.company}</p>
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
