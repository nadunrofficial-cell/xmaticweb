"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Rocket, 
  Heart, 
  Zap, 
  Users,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Upload,
  Send,
  Briefcase,
  X
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { getJobs, addApplication, type Job } from "@/lib/data-store"

const cultureValues = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We embrace new ideas and cutting-edge technology to stay ahead of the curve.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "We love what we do and bring enthusiasm to every project we touch.",
  },
  {
    icon: Zap,
    title: "Fast Paced",
    description: "We move quickly, iterate often, and deliver results that matter.",
  },
  {
    icon: Users,
    title: "Team Spirit",
    description: "Collaboration is key. We succeed together and support each other.",
  },
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    portfolio: "",
    availability: "",
    coverLetter: "",
  })
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setJobs(getJobs())
    
    // Listen for job updates
    const handleUpdate = () => setJobs(getJobs())
    window.addEventListener("jobs-updated", handleUpdate)
    return () => window.removeEventListener("jobs-updated", handleUpdate)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const selectedJobData = jobs.find((job) => job.id === selectedJob)
    
    if (selectedJobData) {
      // Save application to data store
      addApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: selectedJobData.title,
        jobId: selectedJobData.id,
        experience: formData.experience,
        portfolio: formData.portfolio,
        availability: formData.availability,
        cvFileName: fileName,
        coverLetter: formData.coverLetter,
      })
    }
    
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const openApplicationForm = (jobId: string) => {
    setSelectedJob(jobId)
    setSubmitted(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      portfolio: "",
      availability: "",
      coverLetter: "",
    })
    setFileName("")
  }

  const selectedJobData = jobs.find((job) => job.id === selectedJob)

  // Only show open jobs
  const openJobs = jobs.filter(job => job.status === "open")

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
                Join Our <span className="gradient-text">Mission</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Be part of a team that is reshaping digital marketing. We are looking for 
                passionate individuals who want to make an impact.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Culture */}
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
                Our <span className="gradient-text">Culture</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                At Xmatic Digital, we believe in creating an environment where creativity thrives 
                and everyone can do their best work.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cultureValues.map((value, index) => (
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
                      <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Open <span className="gradient-text">Positions</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore our current opportunities and find your perfect role.
              </p>
            </motion.div>

            <div className="space-y-4">
              {openJobs.length === 0 ? (
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
                  </CardContent>
                </Card>
              ) : (
                openJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 border-border/50 overflow-hidden transition-all duration-300 hover:border-[#38bdf8]/30">
                      <CardContent className="p-0">
                        <button
                          onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                          className="w-full p-6 text-left"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold">{job.title}</h3>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-4 h-4" />
                                  {job.type}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {job.department}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              {expandedJob === job.id ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedJob === job.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 border-t border-border pt-4">
                                <p className="text-muted-foreground mb-4">{job.description}</p>
                                <h4 className="font-semibold mb-3">Requirements:</h4>
                                <ul className="space-y-2 mb-6">
                                  {job.requirements.map((req) => (
                                    <li key={req} className="flex items-start gap-2 text-muted-foreground text-sm">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                                <Button
                                  onClick={() => openApplicationForm(job.id)}
                                  className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0"
                                >
                                  Apply Now
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Application Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0d1a] border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-[#0a0d1a] border-b border-border p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Apply for {selectedJobData?.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedJobData?.department}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-[#25D366]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for applying. We&apos;ll review your application and get back to you soon.
                      </p>
                      <Button onClick={() => setSelectedJob(null)} variant="outline">
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="app-name">Full Name *</Label>
                          <Input
                            id="app-name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your full name"
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="app-email">Email *</Label>
                          <Input
                            id="app-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="app-phone">Phone *</Label>
                          <Input
                            id="app-phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+94 77 123 4567"
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="app-experience">Experience Level *</Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => setFormData({ ...formData, experience: value })}
                          >
                            <SelectTrigger id="app-experience" className="bg-background/50">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                              <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                              <SelectItem value="senior">Senior (5+ years)</SelectItem>
                              <SelectItem value="lead">Lead/Manager (7+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="app-portfolio">Portfolio Link</Label>
                        <Input
                          id="app-portfolio"
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://yourportfolio.com"
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="app-cv">Upload CV *</Label>
                        <div className="relative">
                          <input
                            id="app-cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex items-center gap-3 p-3 bg-background/50 border border-border rounded-lg">
                            <Upload className="w-5 h-5 text-muted-foreground" />
                            <span className={fileName ? "text-foreground" : "text-muted-foreground"}>
                              {fileName || "Choose file (PDF, DOC, DOCX)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="app-availability">Availability *</Label>
                        <Select
                          value={formData.availability}
                          onValueChange={(value) => setFormData({ ...formData, availability: value })}
                        >
                          <SelectTrigger id="app-availability" className="bg-background/50">
                            <SelectValue placeholder="When can you start?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediately</SelectItem>
                            <SelectItem value="2weeks">2 Weeks Notice</SelectItem>
                            <SelectItem value="1month">1 Month Notice</SelectItem>
                            <SelectItem value="2months">2+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="app-cover">Cover Letter</Label>
                        <Textarea
                          id="app-cover"
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          placeholder="Tell us why you would be a great fit for this role..."
                          rows={4}
                          className="bg-background/50"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Submit Application
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don&apos;t See a Fit?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll 
                keep you in mind for future opportunities.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#38bdf8] text-[#38bdf8] hover:bg-[#38bdf8]/10"
              >
                <a href="mailto:careers@xmatic.digital">Contact Us</a>
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
