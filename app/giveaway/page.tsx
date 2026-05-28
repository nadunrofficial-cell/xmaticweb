'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { StarField } from "@/components/star-field"
import { GiveawayForm } from "@/components/giveaway-form"
import { motion } from "framer-motion"
import { ArrowLeft, Gift } from "lucide-react"
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
              <span className="holographic-text">Giveaway Program</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our exclusive giveaway celebrating 5 years of digital excellence. Submit your details below for a chance to win amazing rewards!
            </p>
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
                description: "Only available for the next 30 days",
              },
              {
                title: "Exclusive Rewards",
                description: "Win digital marketing packages worth thousands",
              },
              {
                title: "Easy Entry",
                description: "Just fill out the form - no purchases needed",
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
        </div>
      </main>
      <Footer />
      <WhatsAppCTA />
    </>
  )
}
