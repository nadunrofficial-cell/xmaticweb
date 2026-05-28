'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { ArrowRight, Loader2 } from 'lucide-react'

interface GiveawayFormData {
  fullName: string
  businessName: string
  email: string
  phoneNumber: string
  businessType: string
  websiteLinks: string
  businessGoals: string
  budget: string
  additionalNotes: string
}

export function GiveawayForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<GiveawayFormData>()

  const onSubmit = async (data: GiveawayFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/giveaway-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400"
        >
          Thank you for your submission! We&apos;ll be in touch soon.
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
          <input
            {...register('fullName', { required: 'Full name is required' })}
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          />
          {errors.fullName && <span className="text-red-400 text-sm mt-1">{errors.fullName.message}</span>}
        </motion.div>

        {/* Business Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Business Name *</label>
          <input
            {...register('businessName', { required: 'Business name is required' })}
            type="text"
            placeholder="Your business name"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          />
          {errors.businessName && <span className="text-red-400 text-sm mt-1">{errors.businessName.message}</span>}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          />
          {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email.message}</span>}
        </motion.div>

        {/* Phone Number */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Phone Number *</label>
          <input
            {...register('phoneNumber', { required: 'Phone number is required' })}
            type="tel"
            placeholder="+94 XX XXX XXXX"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          />
          {errors.phoneNumber && <span className="text-red-400 text-sm mt-1">{errors.phoneNumber.message}</span>}
        </motion.div>

        {/* Business Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Business Type *</label>
          <select
            {...register('businessType', { required: 'Business type is required' })}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          >
            <option value="">Select your business type</option>
            <option value="freelancer">Freelancer</option>
            <option value="startup">Startup</option>
            <option value="smb">Small Business</option>
            <option value="enterprise">Enterprise</option>
            <option value="creator">Creator/Artist</option>
            <option value="agency">Agency</option>
            <option value="other">Other</option>
          </select>
          {errors.businessType && <span className="text-red-400 text-sm mt-1">{errors.businessType.message}</span>}
        </motion.div>

        {/* Website/Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Website / Social Links</label>
          <input
            {...register('websiteLinks')}
            type="text"
            placeholder="https://yoursite.com or @social_handle"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          />
        </motion.div>

        {/* Business Goals */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Business Goals / What are you looking to achieve? *</label>
          <textarea
            {...register('businessGoals', { required: 'Business goals are required' })}
            placeholder="Tell us about your goals..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors resize-none"
          />
          {errors.businessGoals && <span className="text-red-400 text-sm mt-1">{errors.businessGoals.message}</span>}
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Budget Range *</label>
          <select
            {...register('budget', { required: 'Budget range is required' })}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors"
          >
            <option value="">Select your budget range</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="above-100k">Above $100,000</option>
          </select>
          {errors.budget && <span className="text-red-400 text-sm mt-1">{errors.budget.message}</span>}
        </motion.div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium mb-2 text-foreground">Additional Notes / Questions</label>
          <textarea
            {...register('additionalNotes')}
            placeholder="Anything else you&apos;d like us to know?"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#38bdf8] focus:outline-none transition-colors resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#ec4899] to-[#a855f7] hover:opacity-90 text-white px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center">
          We respect your privacy. Your information will only be used for giveaway purposes.
        </p>
      </form>
    </motion.div>
  )
}
