"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ForgotPasswordPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
        <p className="mt-4 text-muted-foreground">
          Enter your email or phone number to reset your password. This demo page shows current real-time.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted p-5">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Current Time</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
            <p className="text-sm text-muted-foreground">{time.toLocaleDateString()}</p>
          </div>
          <div className="rounded-2xl bg-muted p-5">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Page Status</p>
            <p className="mt-2 text-base text-foreground">Available for account recovery.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/login" className="text-sm font-medium text-primary hover:underline">
            Return to login
          </Link>
          <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Send reset link
          </button>
        </div>
      </div>
    </div>
  )
}
