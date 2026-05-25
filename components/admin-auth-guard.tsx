"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === "/admin/login") {
      setIsAuthenticated(true)
      return
    }

    const session = getCookie("admin_session")
    if (session === "authenticated") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070913] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#38bdf8]" />
      </div>
    )
  }

  return <>{children}</>
}

export function useAdminLogout() {
  const router = useRouter()
  
  const logout = () => {
    document.cookie = "admin_session=; path=/; max-age=0"
    router.push("/admin/login")
  }
  
  return logout
}
