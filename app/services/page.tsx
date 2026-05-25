"use client"

import { motion } from "framer-motion"
import { 
  Share2, 
  Camera, 
  Brain, 
  Code, 
  Target, 
  Music,
  Check,
  ArrowRight
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { StarField } from "@/components/star-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    id: "social-media",
    icon: Share2,
    title: "Social Media Management",
    description: "Dominate social platforms with data-driven strategies that grow your audience and drive engagement.",
    color: "#38bdf8",
    features: [
      "Content calendar creation and scheduling",
      "Community management and engagement",
      "Performance analytics and reporting",
      "Platform-specific strategy optimization",
      "Influencer collaboration management",
      "Crisis management and reputation monitoring",
    ],
    outcomes: [
      "Increased brand awareness and reach",
      "Higher engagement rates",
      "Stronger community connections",
      "Consistent brand voice across platforms",
    ],
  },
  {
    id: "content",
    icon: Camera,
    title: "Content Creation & Production",
    description: "Captivating visual and written content that tells your brand story and converts viewers into customers.",
    color: "#a855f7",
    features: [
      "Professional photography and videography",
      "Graphic design and visual branding",
      "Copywriting and content strategy",
      "Reel and short-form video production",
      "Podcast and audio content creation",
      "User-generated content campaigns",
    ],
    outcomes: [
      "Scroll-stopping visual content",
      "Consistent brand aesthetics",
      "Higher content engagement",
      "Versatile content library",
    ],
  },
  {
    id: "ai-branding",
    icon: Brain,
    title: "AI-Based Branding & Content",
    description: "Leverage cutting-edge AI tools to create unique brand identities and automated content workflows.",
    color: "#ec4899",
    features: [
      "AI-powered brand identity development",
      "Automated content generation workflows",
      "Personalized marketing at scale",
      "Predictive analytics and trend forecasting",
      "AI chatbot and customer service integration",
      "Machine learning audience insights",
    ],
    outcomes: [
      "Faster content production cycles",
      "Data-driven creative decisions",
      "Personalized customer experiences",
      "Competitive edge through innovation",
    ],
  },
  {
    id: "web-design",
    icon: Code,
    title: "Web Design & Development",
    description: "High-converting websites and digital experiences that turn visitors into loyal customers.",
    color: "#38bdf8",
    features: [
      "Custom website design and development",
      "E-commerce platform creation",
      "Landing page optimization",
      "Mobile-first responsive design",
      "Performance optimization and SEO",
      "Maintenance and ongoing support",
    ],
    outcomes: [
      "Improved conversion rates",
      "Better user experience",
      "Faster loading times",
      "Higher search engine rankings",
    ],
  },
  {
    id: "digital-strategy",
    icon: Target,
    title: "Digital Strategy & Paid Advertising",
    description: "Custom roadmaps and targeted campaigns designed to achieve your specific goals with measurable ROI.",
    color: "#a855f7",
    features: [
      "Comprehensive digital audits",
      "Multi-channel marketing strategy",
      "Paid social advertising (Meta, TikTok, LinkedIn)",
      "Google Ads and search marketing",
      "Retargeting and remarketing campaigns",
      "Budget optimization and ROAS tracking",
    ],
    outcomes: [
      "Clear path to business goals",
      "Optimized ad spend efficiency",
      "Higher return on investment",
      "Scalable growth systems",
    ],
  },
  {
    id: "creative-industry",
    icon: Music,
    title: "Creative Industry Solutions",
    description: "Specialized services for artists, musicians, and creative professionals looking to build their brand.",
    color: "#ec4899",
    features: [
      "Artist brand development",
      "Music release and promotion strategy",
      "Fan engagement and community building",
      "Merchandise and e-commerce setup",
      "Tour and event marketing",
      "Streaming platform optimization",
    ],
    outcomes: [
      "Stronger artist identity",
      "Increased streams and sales",
      "Loyal fanbase development",
      "Sustainable creative career",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ServicesPage() {
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
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Comprehensive digital solutions designed to launch your brand into the next orbit. 
                From strategy to execution, we have got you covered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-16"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  variants={itemVariants}
                  className="scroll-mt-24"
                >
                  <Card className="bg-card/50 border-border/50 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r`} style={{ 
                      background: `linear-gradient(to right, ${service.color}, ${service.color}80)` 
                    }} />
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${service.color}20` }}
                        >
                          <service.icon className="w-7 h-7" style={{ color: service.color }} />
                        </div>
                        <div>
                          <CardTitle className="text-2xl md:text-3xl mb-2">{service.title}</CardTitle>
                          <p className="text-muted-foreground text-lg">{service.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                            What We Deliver
                          </h4>
                          <ul className="space-y-3">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                                <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: service.color }} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Outcomes */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                            Expected Outcomes
                          </h4>
                          <ul className="space-y-3">
                            {service.outcomes.map((outcome) => (
                              <li key={outcome} className="flex items-start gap-3 text-muted-foreground">
                                <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 text-[#a855f7]" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get <span className="gradient-text">Started</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss which services are right for your brand and create a custom strategy for your success.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0 px-8 py-6 text-lg"
              >
                <Link href="/about#contact">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppCTA />
    </>
  )
}
