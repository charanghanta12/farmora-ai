"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getAuth } from "@/lib/auth"
import { Brain, TrendingUp, Clock, AlertTriangle } from "lucide-react"

type Insight = {
  title: string
  value: string
  detail: string
  type: "opportunity" | "warning" | "info"
  icon: any
}

export default function FarmerAIInsightsPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }
    setAuthChecked(true)
    setLoading(false)
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Placeholder insights - in a real app, these would come from AI analysis
  const insights: Insight[] = [
    {
      title: "Market Opportunity",
      value: "High Demand",
      detail: "Local restaurants are seeking fresh produce. Consider increasing your listings.",
      type: "opportunity",
      icon: TrendingUp
    },
    {
      title: "Price Optimization",
      value: "AI Analysis",
      detail: "Your current pricing is competitive. AI suggests a 5-10% increase for better margins.",
      type: "info",
      icon: Brain
    },
    {
      title: "Best Selling Time",
      value: "6 AM - 10 AM",
      detail: "Peak sales hours for your market. Schedule product uploads during this window.",
      type: "info",
      icon: Clock
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "opportunity": return "border-green-200 bg-green-50"
      case "warning": return "border-amber-200 bg-amber-50"
      case "info": return "border-blue-200 bg-blue-50"
      default: return "border-gray-200 bg-gray-50"
    }
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading AI insights...</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
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

        <div className="grid gap-4 lg:grid-cols-3">
          {insights.map((item, index) => (
            <Card key={index} className={`border-2 ${getTypeColor(item.type)}`}>
              <CardHeader className="flex flex-row items-center gap-3">
                <item.icon className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground mb-2">{item.value}</p>
                <p className="text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Analytics</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our AI continuously analyzes market trends, buyer behavior, and pricing data to provide you with actionable insights for better farming decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
          </div>
        </div>
      </div>
    </div>
  )
}
