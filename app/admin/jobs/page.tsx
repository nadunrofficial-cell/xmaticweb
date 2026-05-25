"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X,
  Briefcase,
  MapPin,
  Clock,
  Users
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getJobs, saveJobs, type Job } from "@/lib/data-store"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    location: "",
    department: "",
    description: "",
    requirements: "",
    status: "open" as "open" | "closed",
  })

  useEffect(() => {
    setJobs(getJobs())
    
    // Listen for updates from other tabs/components
    const handleUpdate = () => setJobs(getJobs())
    window.addEventListener("jobs-updated", handleUpdate)
    window.addEventListener("applications-updated", handleUpdate)
    return () => {
      window.removeEventListener("jobs-updated", handleUpdate)
      window.removeEventListener("applications-updated", handleUpdate)
    }
  }, [])

  const openModal = (job?: Job) => {
    if (job) {
      setEditingJob(job)
      setFormData({
        title: job.title,
        type: job.type,
        location: job.location,
        department: job.department,
        description: job.description,
        requirements: job.requirements.join("\n"),
        status: job.status,
      })
    } else {
      setEditingJob(null)
      setFormData({
        title: "",
        type: "Full-time",
        location: "",
        department: "",
        description: "",
        requirements: "",
        status: "open",
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const jobData: Job = {
      id: editingJob?.id || Date.now().toString(),
      title: formData.title,
      type: formData.type,
      location: formData.location,
      department: formData.department,
      description: formData.description,
      requirements: formData.requirements.split("\n").filter(r => r.trim()),
      status: formData.status,
      applicants: editingJob?.applicants || 0,
      createdAt: editingJob?.createdAt || new Date().toISOString().split("T")[0],
    }

    let updatedJobs: Job[]
    if (editingJob) {
      updatedJobs = jobs.map(j => j.id === editingJob.id ? jobData : j)
    } else {
      updatedJobs = [jobData, ...jobs]
    }
    
    saveJobs(updatedJobs)
    setJobs(updatedJobs)
    setIsModalOpen(false)
  }

  const deleteJob = (id: string) => {
    const updatedJobs = jobs.filter(j => j.id !== id)
    saveJobs(updatedJobs)
    setJobs(updatedJobs)
    setDeleteConfirm(null)
  }

  const toggleStatus = (id: string) => {
    const updatedJobs = jobs.map(j => 
      j.id === id ? { ...j, status: j.status === "open" ? "closed" as const : "open" as const } : j
    )
    saveJobs(updatedJobs)
    setJobs(updatedJobs)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Job Posts</h2>
          <p className="text-muted-foreground">Manage your job listings</p>
        </div>
        <Button 
          onClick={() => openModal()}
          className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Position
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobs.length}</p>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobs.filter(j => j.status === "open").length}</p>
                <p className="text-sm text-muted-foreground">Open Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#a855f7]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#a855f7]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobs.reduce((sum, j) => sum + j.applicants, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No jobs posted yet.</p>
              <Button 
                onClick={() => openModal()}
                className="bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Job Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className={`bg-card/50 border-border/50 ${job.status === "closed" ? "opacity-60" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          job.status === "open" 
                            ? "bg-[#25D366]/20 text-[#25D366]" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {job.status === "open" ? "Open" : "Closed"}
                        </span>
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
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.applicants} applicants
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {job.status === "open" ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={job.status === "open"}
                          onCheckedChange={() => toggleStatus(job.id)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModal(job)}
                        className="text-[#38bdf8] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfirm(job.id)}
                        className="text-red-400 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0d1a] border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#0a0d1a] border-b border-border p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {editingJob ? "Edit Job Post" : "Create New Job Post"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title *</Label>
                  <Input
                    id="job-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Social Media Manager"
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Employment Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger id="job-type" className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger id="job-department" className="bg-background/50">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Creative">Creative</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-location">Location *</Label>
                  <Input
                    id="job-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Remote / Colombo"
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description">Description *</Label>
                  <Textarea
                    id="job-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role and responsibilities..."
                    rows={4}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-requirements">Requirements (one per line) *</Label>
                  <Textarea
                    id="job-requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="3+ years of experience&#10;Proficiency in relevant tools&#10;Excellent communication skills"
                    rows={5}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">Job Status</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.status === "open" ? "Accepting applications" : "Not accepting applications"}
                    </p>
                  </div>
                  <Switch
                    checked={formData.status === "open"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, status: checked ? "open" : "closed" })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#38bdf8] to-[#a855f7] hover:opacity-90 text-white border-0"
                  >
                    {editingJob ? "Save Changes" : "Create Job Post"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0d1a] border border-border rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-2">Delete Job Post?</h3>
              <p className="text-muted-foreground mb-6">
                This action cannot be undone. All applicant data for this position will be preserved.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteJob(deleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
