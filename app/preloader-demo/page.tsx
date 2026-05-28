'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Preloader } from '@/components/preloader'

const SlowComponent = dynamic(
  () => new Promise(resolve => {
    setTimeout(() => {
      resolve({ default: () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#070913] to-[#0f0920]">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 holographic-text">Welcome!</h1>
            <p className="text-xl text-muted-foreground mb-8">The preloader loaded successfully</p>
            <a href="/" className="text-[#38bdf8] hover:text-[#a855f7] underline text-lg">
              Back to Home
            </a>
          </div>
        </div>
      )})
    }, 3000)
  }),
  { ssr: false }
)

export default function PreloaderDemo() {
  return (
    <Suspense fallback={<Preloader />}>
      <SlowComponent />
    </Suspense>
  )
}
