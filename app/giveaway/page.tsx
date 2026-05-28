'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { StarField } from "@/components/star-field"
import { GiveawayForm } from "@/components/giveaway-form"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Gift } from "lucide-react"
import Link from "next/link"

export default function GiveawayPage() {
  return (
    <>
      <StarField />
      <Navigation />
      <main className="relative z-10 min-h-screen py-12 md:py-24">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-20 right-0 w-96 h-96 bg-[#ec4899]/5 rounded-full blur-3xl"
            animate={{
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-0 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-3xl"
            animate={{
              y: [0, -50, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#a855f7] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6 flex justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ec4899] to-[#a855f7] flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="holographic-text">Celebrate 5 Years with Xmatic Digital</span>
            </h1>
            <p className="text-2xl font-semibold text-[#38bdf8] mb-4">
              Win an AI-Powered Professional Website for Your Business
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                To celebrate the 5th anniversary of Xmatic Digital, we are giving away 10 AI-powered custom professional websites for startups and growing businesses.
              </p>
              <p className="text-foreground mb-4">
                This giveaway is designed to help passionate entrepreneurs build a strong online presence with a modern, high-quality website created by our team.
              </p>
              <p className="text-foreground">
                Whether you are launching a new brand, growing your startup, or taking your business to the next level, this is your chance to get a professionally designed website tailored to your business goals.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/10 via-[#a855f7]/10 to-[#38bdf8]/10 rounded-2xl blur-2xl -z-10" />
            <div className="relative bg-background/50 backdrop-blur-lg border border-border/50 rounded-2xl p-8 md:p-12">
              <GiveawayForm />
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                title: "Limited Time",
                description: "Only 10 businesses will be selected",
              },
              {
                title: "Professional Design",
                description: "Custom-designed professional websites",
              },
              {
                title: "AI-Powered",
                description: "Modern design experience for your business",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="glass-premium rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* What You Will Receive Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 py-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">What You Will Receive</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Fully custom-designed professional website",
                "AI-powered modern design experience",
                "Mobile responsive layout",
                "Fast and optimized performance",
                "Business-focused UI/UX",
                "Contact forms and lead generation setup",
                "Social media integration",
                "Basic SEO optimization",
                "Professional support during development",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-foreground/5 border border-border/30"
                >
                  <div className="w-6 h-6 rounded-full bg-[#38bdf8] flex-shrink-0 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-background" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Who Can Apply Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 py-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Who Can Apply</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Startups",
                "Small businesses",
                "Personal brands",
                "Creative professionals",
                "Artists and creators",
                "Service-based businesses",
                "Online stores and growing companies",
              ].map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-gradient-to-br from-[#ec4899]/10 to-[#a855f7]/10 border border-border/30 text-center"
                >
                  <p className="font-semibold text-foreground">{category}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Why We're Doing This Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 py-16 bg-gradient-to-r from-[#ec4899]/10 via-[#a855f7]/10 to-[#38bdf8]/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Why We&apos;re Doing This</h2>
            <p className="text-lg text-foreground max-w-3xl mx-auto text-center leading-relaxed">
              After 5 years of helping businesses thrive digitally, we wanted to give back to the entrepreneurial community. We believe every business deserves a strong online presence, and we&apos;re committed to making professional web design accessible to startups and growing businesses. This giveaway is our way of celebrating this milestone with our community.
            </p>
          </motion.section>

          {/* Terms & Conditions Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 py-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Terms & Conditions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                "Only 10 businesses will be selected for this anniversary giveaway.",
                "The website design and development service is provided by Xmatic Digital.",
                "Selected applicants must cover custom domain and hosting services.",
                "The annual domain and hosting fee is LKR 12,000 per year.",
                "Payment for hosting and domain can be made after the website design is approved.",
                "Additional custom features outside the giveaway scope may require extra charges.",
                "Submission of the application form does not guarantee selection.",
                "The giveaway is valid for a limited period only.",
              ].map((term, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/30"
                >
                  <span className="font-semibold text-[#38bdf8] flex-shrink-0">{i + 1}.</span>
                  <span className="text-foreground">{term}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Ready to Launch CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 py-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Launch Your Business Online?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don&apos;t miss this exclusive opportunity. Apply now and stand a chance to win a professionally designed website for your business.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-[#ec4899] to-[#a855f7] hover:opacity-90 text-white rounded-full font-semibold text-lg inline-flex items-center gap-2 transition-opacity"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.section>
        </div>
      </main>
      <Footer />
      <WhatsAppCTA />
    </>
  )
}
