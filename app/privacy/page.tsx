"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">
              This page explains how Farmora AI handles your personal data and privacy.
            </p>
          </div>
          <div className="rounded-2xl bg-muted p-4 text-center">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Live time</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-foreground">
          <p>
            Farmora AI uses demo authentication data for this sample project. No real personal data is stored on the server.
          </p>
          <p>
            Login state is kept in your browser using localStorage. You can logout at any time to clear the demo session.
          </p>
          <p>
            Learn more about our terms of service from the <Link href="/terms" className="text-primary hover:underline">Terms page</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
