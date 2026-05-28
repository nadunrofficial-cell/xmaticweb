"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Briefcase, TrendingUp, Clock, Inbox, Gift } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getJobs, getApplications, type Job, type Application } from "@/lib/data-store"

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-[#38bdf8]/20 text-[#38bdf8]"
    case "shortlisted":
      return "bg-[#25D366]/20 text-[#25D366]"
    case "rejected":
      return "bg-red-500/20 text-red-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [giveawaySubmissions, setGiveawaySubmissions] = useState<any[]>([])

  useEffect(() => {
    setJobs(getJobs())
    setApplications(getApplications())
    fetchGiveawaySubmissions()
    
    // Listen for updates
    const handleUpdate = () => {
      setJobs(getJobs())
      setApplications(getApplications())
      fetchGiveawaySubmissions()
    }
    window.addEventListener("jobs-updated", handleUpdate)
    window.addEventListener("applications-updated", handleUpdate)
    return () => {
      window.removeEventListener("jobs-updated", handleUpdate)
      window.removeEventListener("applications-updated", handleUpdate)
    }
  }, [])

  const fetchGiveawaySubmissions = async () => {
    try {
      const response = await fetch('/api/giveaway-submissions')
      const data = await response.json()
      setGiveawaySubmissions(data)
    } catch (error) {
      console.error('Error fetching giveaway submissions:', error)
    }
  }

  // Calculate stats
  const totalApplications = applications.length
  const openPositions = jobs.filter(j => j.status === "open").length
  const newApplications = applications.filter(a => a.status === "new").length
  const recentApplications = applications.slice(0, 5)
  const giveawayCount = giveawaySubmissions.length

  const stats = [
    {
      title: "Giveaway Submissions",
      value: giveawayCount.toString(),
      change: giveawayCount > 0 ? "Form submissions received" : "No submissions yet",
      icon: Gift,
      color: "#ec4899",
      href: "/admin/giveaway-submissions",
    },
    {
      title: "Total Applications",
      value: totalApplications.toString(),
      change: totalApplications > 0 ? "Active" : "No applications",
      icon: Users,
      color: "#38bdf8",
      href: "/admin/applications",
    },
    {
      title: "Open Positions",
      value: openPositions.toString(),
      change: openPositions > 0 ? "Accepting applications" : "No open positions",
      icon: Briefcase,
      color: "#a855f7",
      href: "/admin/jobs",
    },
    {
      title: "New Applications",
      value: newApplications.toString(),
      change: newApplications > 0 ? "Pending review" : "All reviewed",
      icon: TrendingUp,
      color: "#ec4899",
      href: "/admin/applications",
    },
    {
      title: "Total Jobs",
      value: jobs.length.toString(),
      change: `${jobs.filter(j => j.status === "closed").length} closed`,
      icon: Clock,
      color: "#f59e0b",
      href: "/admin/jobs",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your job applications.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="bg-card/50 border-border/50 hover:border-[#38bdf8]/30 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm mt-1" style={{ color: stat.color }}>{stat.change}</p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Giveaway Submissions</CardTitle>
            <Link href="/admin/giveaway-submissions" className="text-sm text-[#38bdf8] hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {giveawaySubmissions.length === 0 ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No giveaway submissions yet.</p>
                <p className="text-sm text-muted-foreground">Form submissions will appear here when users apply.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {giveawaySubmissions.slice(0, 3).map((submission: any) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-lg border border-border/30 hover:border-[#ec4899]/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ec4899] to-[#a855f7] flex items-center justify-center text-white text-sm font-medium">
                            {submission.data.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{submission.data.fullName}</p>
                            <p className="text-sm text-muted-foreground">{submission.data.businessName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{submission.data.email}</span>
                          <span>•</span>
                          <span>{new Date(submission.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Link
                        href="/admin/giveaway-submissions"
                        className="px-3 py-1 text-sm bg-[#ec4899]/10 text-[#ec4899] rounded hover:bg-[#ec4899]/20 transition-colors whitespace-nowrap"
                      >
                        Review
                      </Link>
                    </div>
                  </motion.div>
                ))}
                {giveawaySubmissions.length > 3 && (
                  <Link href="/admin/giveaway-submissions" className="block text-center text-sm text-[#38bdf8] hover:underline mt-4">
                    View all {giveawaySubmissions.length} submissions
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link href="/admin/applications" className="text-sm text-[#38bdf8] hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentApplications.length === 0 ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-3">
                  <Inbox className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No applications yet.</p>
                <p className="text-sm text-muted-foreground">Applications will appear here when candidates apply.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Applicant</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Position</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="border-b border-border/50 last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#a855f7] flex items-center justify-center text-white text-sm font-medium">
                              {app.name.charAt(0)}
                            </div>
                            <span className="font-medium">{app.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-muted-foreground">{app.position}</td>
                        <td className="py-4 text-muted-foreground text-sm">{formatDate(app.appliedDate)}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
