"use client"

// Types
export interface Job {
  id: string
  title: string
  type: string
  location: string
  department: string
  description: string
  requirements: string[]
  status: "open" | "closed"
  applicants: number
  createdAt: string
}

export interface Application {
  id: string
  name: string
  email: string
  phone: string
  position: string
  jobId: string
  experience: string
  portfolio: string
  availability: string
  appliedDate: string
  status: "new" | "shortlisted" | "rejected"
  cvFileName: string
  coverLetter: string
}

// Default jobs data
const defaultJobs: Job[] = [
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    type: "Full-time",
    location: "Remote / Colombo",
    department: "Marketing",
    description: "We are looking for a creative Social Media Manager to develop and implement our social media strategy across all platforms.",
    requirements: [
      "3+ years of social media management experience",
      "Strong understanding of social media analytics",
      "Excellent written and verbal communication",
      "Experience with social media scheduling tools",
      "Creative mindset with attention to detail",
    ],
    status: "open",
    applicants: 0,
    createdAt: "2024-01-01",
  },
  {
    id: "content-creator",
    title: "Content Creator",
    type: "Full-time",
    location: "Colombo",
    department: "Creative",
    description: "Join our creative team to produce engaging video and visual content for our clients across various industries.",
    requirements: [
      "2+ years of content creation experience",
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio of video and graphic work",
      "Understanding of social media trends",
      "Ability to work under tight deadlines",
    ],
    status: "open",
    applicants: 0,
    createdAt: "2024-01-05",
  },
  {
    id: "web-developer",
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    department: "Development",
    description: "We are seeking a talented Frontend Developer to build beautiful, responsive websites and web applications.",
    requirements: [
      "3+ years of frontend development experience",
      "Strong proficiency in React, Next.js, TypeScript",
      "Experience with Tailwind CSS",
      "Understanding of UI/UX principles",
      "Passion for clean, maintainable code",
    ],
    status: "open",
    applicants: 0,
    createdAt: "2024-01-10",
  },
]

const JOBS_KEY = "xmatic_jobs"
const APPLICATIONS_KEY = "xmatic_applications"

// Jobs functions
export function getJobs(): Job[] {
  if (typeof window === "undefined") return defaultJobs
  
  const stored = localStorage.getItem(JOBS_KEY)
  if (!stored) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(defaultJobs))
    return defaultJobs
  }
  
  try {
    return JSON.parse(stored)
  } catch {
    return defaultJobs
  }
}

export function saveJobs(jobs: Job[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs))
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent("jobs-updated"))
}

export function addJob(job: Omit<Job, "id" | "applicants" | "createdAt">): Job {
  const jobs = getJobs()
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    applicants: 0,
    createdAt: new Date().toISOString().split("T")[0],
  }
  saveJobs([newJob, ...jobs])
  return newJob
}

export function updateJob(id: string, updates: Partial<Job>): void {
  const jobs = getJobs()
  const updatedJobs = jobs.map(job => 
    job.id === id ? { ...job, ...updates } : job
  )
  saveJobs(updatedJobs)
}

export function deleteJob(id: string): void {
  const jobs = getJobs()
  saveJobs(jobs.filter(job => job.id !== id))
}

// Applications functions
export function getApplications(): Application[] {
  if (typeof window === "undefined") return []
  
  const stored = localStorage.getItem(APPLICATIONS_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function saveApplications(applications: Application[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications))
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent("applications-updated"))
}

export function addApplication(application: Omit<Application, "id" | "appliedDate" | "status">): Application {
  const applications = getApplications()
  const newApplication: Application = {
    ...application,
    id: Date.now().toString(),
    appliedDate: new Date().toISOString().split("T")[0],
    status: "new",
  }
  saveApplications([newApplication, ...applications])
  
  // Update job applicant count
  const jobs = getJobs()
  const updatedJobs = jobs.map(job => 
    job.id === application.jobId 
      ? { ...job, applicants: job.applicants + 1 } 
      : job
  )
  saveJobs(updatedJobs)
  
  return newApplication
}

export function updateApplicationStatus(id: string, status: "new" | "shortlisted" | "rejected"): void {
  const applications = getApplications()
  const updatedApplications = applications.map(app => 
    app.id === id ? { ...app, status } : app
  )
  saveApplications(updatedApplications)
}

// Hook for real-time updates
export function useDataRefresh(callback: () => void) {
  if (typeof window === "undefined") return

  const handleJobsUpdate = () => callback()
  const handleApplicationsUpdate = () => callback()

  window.addEventListener("jobs-updated", handleJobsUpdate)
  window.addEventListener("applications-updated", handleApplicationsUpdate)

  return () => {
    window.removeEventListener("jobs-updated", handleJobsUpdate)
    window.removeEventListener("applications-updated", handleApplicationsUpdate)
  }
}
