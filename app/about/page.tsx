"use client"

import { motion } from "framer-motion"
import { 
  Rocket, 
  Target, 
  Eye, 
  Linkedin, 
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { StarField } from "@/components/star-field"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const team = [
  {
    name: "Ashen Fernando",
    role: "Co-Founder & Creative Director",
    bio: "A visionary creative with 8+ years of experience in digital marketing and brand strategy. Ashen leads our creative vision and ensures every project pushes boundaries.",
    skills: ["Brand Strategy", "Creative Direction", "Content Production"],
  },
  {
    name: "Nadun Perera",
    role: "Co-Founder & Technical Lead",
    bio: "A tech innovator passionate about AI and automation. Nadun drives our technical excellence and ensures we stay ahead of the digital curve.",
    skills: ["AI Integration", "Web Development", "Digital Strategy"],
  },
]

const values = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We embrace cutting-edge technology and creative solutions to keep our clients ahead of the competition.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Every strategy we create is designed with measurable outcomes and ROI at its core.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in open communication, clear reporting, and honest partnerships with our clients.",
  },
]

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send contact form to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <StarField />
      <Navigation />
      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                About <span className="gradient-text">Xmatic Digital</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                We are a team of digital innovators on a mission to help brands 
                break through the noise and achieve extraordinary growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-card/50 border-border/50 h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-[#38bdf8]/20 flex items-center justify-center mb-6">
                      <Eye className="w-7 h-7 text-[#38bdf8]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To be the leading force in digital transformation, empowering brands 
                      and creators worldwide to reach their full potential through innovative 
                      AI-powered strategies and creative excellence.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-card/50 border-border/50 h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-[#a855f7]/20 flex items-center justify-center mb-6">
                      <Target className="w-7 h-7 text-[#a855f7]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To deliver measurable results through a perfect blend of creativity, 
                      technology, and strategy. We are committed to helping every client 
                      launch their brand into the next digital orbit.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="gradient-text">Values</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border/50 h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#38bdf8]/20 to-[#a855f7]/20 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-7 h-7 text-[#38bdf8]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet the <span className="gradient-text">Team</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The passionate individuals behind Xmatic Digital&apos;s success.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border/50 overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-[#38bdf8] to-[#a855f7]" />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#a855f7] shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-[#38bdf8] text-sm">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs rounded-full bg-[#38bdf8]/10 text-[#38bdf8]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <a href="#" className="text-muted-foreground hover:text-[#38bdf8] transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-[#38bdf8] transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ready to launch your brand? Let&apos;s start a conversation.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-card/50 border-border/50 h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/20 flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-[#38bdf8]" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:hello@xmaticdigital.com" className="text-muted-foreground hover:text-[#38bdf8] transition-colors">
                            hello@xmaticdigital.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-[#a855f7]" />
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+94771234567" className="text-muted-foreground hover:text-[#a855f7] transition-colors">
                            +94 77 123 4567
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ec4899]/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-[#ec4899]" />
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">Colombo, Sri Lanka</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
                          <Send className="w-8 h-8 text-[#25D366]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          We&apos;ll get back to you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+94 77 123 4567"
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us about your project..."
                            rows={4}
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppCTA />
    </>
  )
}
