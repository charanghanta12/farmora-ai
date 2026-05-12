"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, ChartBar } from "lucide-react"

const analyticsData = [
  { title: "Weekly sales", value: "₹98,540", trend: "+12%", trendUp: true },
  { title: "Orders fulfilled", value: "184", trend: "+8%", trendUp: true },
  { title: "Average price", value: "₹2,450", trend: "-3%", trendUp: false },
]

export default function FarmerAnalyticsPage() {
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
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground">
                View your farm performance metrics in real time.
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-4 text-center">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Live clock</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
              <p className="text-sm text-muted-foreground">{time.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {analyticsData.map((item) => (
              <Card key={item.title} className="border-border bg-background">
                <CardHeader className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant={item.trendUp ? "secondary" : "outline"}>
                    {item.trend}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <ChartBar className="w-5 h-5 text-primary" />
                    <p className="text-3xl font-semibold text-foreground">{item.value}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Performance is updated with the current time shown above.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/farmer/dashboard" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">
              Back to dashboard
            </Link>
            <p className="text-sm text-muted-foreground">Analytics refreshes every second with the live clock.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
