"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function TermsPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">
              These terms govern your use of the Farmora AI demo application.
            </p>
          </div>
          <div className="rounded-2xl bg-muted p-4 text-center">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Current time</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-foreground">
          <p>
            This is a sample project for demonstration purposes only. Use of the demo features is free and non-binding.
          </p>
          <p>
            The app does not use a real production authentication backend. Demo account data is stored only in server code and browser localStorage.
          </p>
          <p>
            Visit the <Link href="/privacy" className="text-primary hover:underline">Privacy page</Link> to learn how demo data is shared.
          </p>
        </div>
      </div>
    </div>
  )
}
