'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { StarField } from '@/components/star-field'
import { Loader2, Download, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Submission {
  id: string
  timestamp: string
  data: {
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
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/giveaway-submissions')
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (submissions.length === 0) return

    const headers = ['ID', 'Timestamp', 'Full Name', 'Business Name', 'Email', 'Phone', 'Business Type', 'Website Links', 'Goals', 'Budget', 'Notes']
    const rows = submissions.map((sub) => [
      sub.id,
      sub.timestamp,
      sub.data.fullName,
      sub.data.businessName,
      sub.data.email,
      sub.data.phoneNumber,
      sub.data.businessType,
      sub.data.websiteLinks,
      sub.data.businessGoals,
      sub.data.budget,
      sub.data.additionalNotes,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `giveaway-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <StarField />
      <Navigation />
      <main className="relative z-10 min-h-screen py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href="/" className="text-[#38bdf8] hover:text-[#a855f7] transition-colors mb-6 inline-block">
              ← Back to home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Giveaway Submissions</h1>
            <p className="text-muted-foreground text-lg">Manage and review all giveaway program submissions</p>
          </motion.div>

          {/* Action Bar */}
          {!loading && submissions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex gap-4 flex-wrap"
            >
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-6 py-3 bg-[#38bdf8] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Download className="w-5 h-5" />
                Export to CSV
              </button>
              <div className="px-4 py-3 rounded-lg bg-background border border-border">
                <p className="text-muted-foreground">
                  Total Submissions: <span className="font-bold text-foreground">{submissions.length}</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#38bdf8]" />
            </div>
          ) : submissions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">No submissions yet</p>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Submissions List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="glass-premium rounded-lg overflow-hidden h-[600px] overflow-y-auto">
                  <div className="divide-y divide-border">
                    {submissions.map((submission, index) => (
                      <motion.button
                        key={submission.id}
                        onClick={() => setSelectedSubmission(submission)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-full text-left p-4 hover:bg-foreground/5 transition-colors ${
                          selectedSubmission?.id === submission.id ? 'bg-foreground/10 border-l-2 border-[#38bdf8]' : ''
                        }`}
                      >
                        <p className="font-semibold text-foreground truncate">{submission.data.fullName}</p>
                        <p className="text-sm text-muted-foreground truncate">{submission.data.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(submission.timestamp).toLocaleDateString()}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2"
              >
                {selectedSubmission ? (
                  <div className="glass-premium rounded-lg p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">{selectedSubmission.data.fullName}</h2>
                        <p className="text-muted-foreground">{selectedSubmission.data.businessName}</p>
                      </div>
                      <button
                        className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                        title="Delete submission"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: 'Email', value: selectedSubmission.data.email },
                        { label: 'Phone', value: selectedSubmission.data.phoneNumber },
                        { label: 'Business Type', value: selectedSubmission.data.businessType },
                        { label: 'Website / Social', value: selectedSubmission.data.websiteLinks || 'Not provided' },
                        { label: 'Budget Range', value: selectedSubmission.data.budget },
                        { label: 'Business Goals', value: selectedSubmission.data.businessGoals, isLarge: true },
                        { label: 'Additional Notes', value: selectedSubmission.data.additionalNotes || 'None', isLarge: true },
                        { 
                          label: 'Submitted', 
                          value: new Date(selectedSubmission.timestamp).toLocaleString(),
                        },
                      ].map((item, i) => (
                        <div key={i}>
                          <p className="text-sm font-semibold text-[#38bdf8] mb-2">{item.label}</p>
                          <p className={`text-foreground ${item.isLarge ? 'text-sm leading-relaxed' : ''}`}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="glass-premium rounded-lg p-8 text-center py-20">
                    <p className="text-muted-foreground">Select a submission to view details</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
