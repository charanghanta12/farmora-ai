"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const insights = [
  { title: "Price Alert: Tomatoes", value: "+15%", detail: "Local demand is rising." },
  { title: "Supply Gap: Onions", value: "High", detail: "Buyers are looking for more stock." },
  { title: "Best Selling Window", value: "6 AM - 10 AM", detail: "Peak sales hours for your market." },
]

export default function FarmerAIInsightsPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Insights</h1>
              <p className="text-muted-foreground">
                Real-time market insights powered by Farmora AI.
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-4 text-center">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Live clock</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {insights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-background p-6">
                <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-3xl font-bold text-foreground">{item.value}</p>
                <p className="mt-3 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/farmer/dashboard" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
