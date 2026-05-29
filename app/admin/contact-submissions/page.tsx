"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, Calendar, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ContactSubmission {
  id: string
  timestamp: string
  data: {
    name: string
    email: string
    phone?: string
    message: string
  }
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching contact submissions:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="flex items-center gap-2 text-[#38bdf8] hover:text-[#a855f7] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Contact Submissions</h2>
        <p className="text-muted-foreground">
          Manage and view all contact form submissions from visitors.
        </p>
      </div>

      {selectedSubmission ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="mb-6 flex items-center gap-2 text-[#38bdf8] hover:text-[#a855f7] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to List
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">{selectedSubmission.data.name}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#38bdf8] mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${selectedSubmission.data.email}`} className="font-medium text-[#38bdf8] hover:underline">
                          {selectedSubmission.data.email}
                        </a>
                      </div>
                    </div>

                    {selectedSubmission.data.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#a855f7] mt-1 shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <a href={`tel:${selectedSubmission.data.phone}`} className="font-medium text-[#a855f7] hover:underline">
                            {selectedSubmission.data.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3 mb-6">
                    <Calendar className="w-5 h-5 text-[#ec4899] mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">{formatDate(selectedSubmission.timestamp)}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#38bdf8]" />
                    Message
                  </h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedSubmission.data.message}</p>
                </div>

                <div className="border-t border-border/50 pt-6 flex gap-3">
                  <a
                    href={`mailto:${selectedSubmission.data.email}?subject=Re: Contact Form`}
                    className="px-4 py-2 bg-[#38bdf8]/20 text-[#38bdf8] rounded hover:bg-[#38bdf8]/30 transition-colors font-medium"
                  >
                    Reply by Email
                  </a>
                  {selectedSubmission.data.phone && (
                    <a
                      href={`https://wa.me/${selectedSubmission.data.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366]/20 text-[#25D366] rounded hover:bg-[#25D366]/30 transition-colors font-medium"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No contact submissions yet.</p>
                <p className="text-sm text-muted-foreground">Submissions will appear here when people contact you through the form.</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className="bg-card/50 border-border/50 hover:border-[#38bdf8]/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#a855f7] flex items-center justify-center text-white font-medium shrink-0">
                            {submission.data.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{submission.data.name}</p>
                            <p className="text-sm text-muted-foreground">{submission.data.email}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mt-2">{submission.data.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(submission.timestamp)}</p>
                      </div>
                      <button
                        className="px-3 py-1 text-sm bg-[#38bdf8]/10 text-[#38bdf8] rounded hover:bg-[#38bdf8]/20 transition-colors whitespace-nowrap"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSubmission(submission)
                        }}
                      >
                        View
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
