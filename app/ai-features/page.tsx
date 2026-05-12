"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const features = [
  { title: "Price Prediction", description: "AI forecasts fair market prices for your crops." },
  { title: "Demand Insights", description: "See which products are in demand right now." },
  { title: "Smart Listings", description: "Get intelligent product listing suggestions." },
]

export default function AIFeaturesPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Features</h1>
              <p className="text-muted-foreground">
                Explore the intelligent tools built into Farmora AI.
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-4 text-center">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Live time</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-border bg-background p-6">
                <h2 className="text-xl font-semibold text-foreground">{feature.title}</h2>
                <p className="mt-3 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>All feature details update in real time with the current clock above.</p>
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/signup" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Start using AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
