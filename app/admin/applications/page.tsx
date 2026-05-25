"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  X,
  Inbox
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getApplications, updateApplicationStatus, getJobs, type Application, type Job } from "@/lib/data-store"

const getStatusColor = (status: string) => {
  switch (status) {
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

const getExperienceLabel = (exp: string) => {
  switch (exp) {
    case "entry":
      return "Entry Level"
    case "mid":
      return "Mid Level"
    case "senior":
      return "Senior"
    case "lead":
      return "Lead/Manager"
    default:
      return exp
  }
}

const getAvailabilityLabel = (avail: string) => {
  switch (avail) {
    case "immediate":
      return "Immediately"
    case "2weeks":
      return "2 Weeks"
    case "1month":
      return "1 Month"
    case "2months":
      return "2+ Months"
    default:
      return avail
  }
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

  useEffect(() => {
    setApplications(getApplications())
    setJobs(getJobs())
    
    // Listen for updates
    const handleUpdate = () => {
      setApplications(getApplications())
      setJobs(getJobs())
    }
    window.addEventListener("applications-updated", handleUpdate)
    window.addEventListener("jobs-updated", handleUpdate)
    return () => {
      window.removeEventListener("applications-updated", handleUpdate)
      window.removeEventListener("jobs-updated", handleUpdate)
    }
  }, [])

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesPosition = positionFilter === "all" || app.position === positionFilter
    return matchesSearch && matchesStatus && matchesPosition
  })

  const updateStatus = (id: string, status: "new" | "shortlisted" | "rejected") => {
    updateApplicationStatus(id, status)
    setApplications(getApplications())
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, status })
    }
  }

  const positions = [...new Set(applications.map(app => app.position))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Applications</h2>
          <p className="text-muted-foreground">Manage job applications</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredApplications.length} applications
          </span>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-background/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-background/50">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map(pos => (
                  <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          {applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
              <p className="text-muted-foreground">
                Applications will appear here when candidates apply for your open positions.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-border bg-muted/30">
                    <th className="p-4 text-sm font-medium text-muted-foreground">Applicant</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Position</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Applied</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#a855f7] flex items-center justify-center text-white font-medium">
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{app.name}</p>
                            <p className="text-sm text-muted-foreground">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{app.position}</p>
                        <p className="text-sm text-muted-foreground">{getExperienceLabel(app.experience)}</p>
                      </td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedApp(app)}
                            className="text-[#38bdf8] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {applications.length > 0 && filteredApplications.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No applications found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0d1a] border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#0a0d1a] border-b border-border p-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#a855f7] flex items-center justify-center text-white text-xl font-medium">
                    {selectedApp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedApp.name}</h3>
                    <p className="text-muted-foreground">{selectedApp.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-[#38bdf8]" />
                    <a href={`mailto:${selectedApp.email}`} className="hover:text-[#38bdf8]">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-[#a855f7]" />
                    <a href={`tel:${selectedApp.phone}`} className="hover:text-[#a855f7]">
                      {selectedApp.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-[#ec4899]" />
                    Applied {new Date(selectedApp.appliedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <FileText className="w-5 h-5 text-[#f59e0b]" />
                    {selectedApp.portfolio ? (
                      <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b]">
                        View Portfolio
                      </a>
                    ) : (
                      "No portfolio"
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Experience Level</p>
                      <p className="font-medium">{getExperienceLabel(selectedApp.experience)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Availability</p>
                      <p className="font-medium">{getAvailabilityLabel(selectedApp.availability)}</p>
                    </div>
                  </div>

                  {selectedApp.cvFileName && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">CV File</p>
                      <p className="font-medium">{selectedApp.cvFileName}</p>
                    </div>
                  )}

                  {selectedApp.coverLetter && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Cover Letter</p>
                      <div className="p-4 bg-muted/20 rounded-lg text-muted-foreground">
                        {selectedApp.coverLetter}
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Update */}
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-3">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedApp.status === "new" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedApp.id, "new")}
                      className={selectedApp.status === "new" ? "bg-[#38bdf8] hover:bg-[#38bdf8]/90" : ""}
                    >
                      New
                    </Button>
                    <Button
                      variant={selectedApp.status === "shortlisted" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedApp.id, "shortlisted")}
                      className={selectedApp.status === "shortlisted" ? "bg-[#25D366] hover:bg-[#25D366]/90" : ""}
                    >
                      Shortlisted
                    </Button>
                    <Button
                      variant={selectedApp.status === "rejected" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedApp.id, "rejected")}
                      className={selectedApp.status === "rejected" ? "bg-red-500 hover:bg-red-500/90" : ""}
                    >
                      Rejected
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
