"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getAuth } from "@/lib/auth"
import { ArrowUpRight, ArrowDownRight, ChartBar, TrendingUp, Package, ShoppingCart } from "lucide-react"

type Product = {
  id: string
  ownerEmail: string
  name: string
  category: string
  unit: string
  price: number
  stock: number
  sold: number
  status: "active" | "out_of_stock"
  description: string
  location: string
  createdAt: string
}

export default function FarmerAnalyticsPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }
    setAuthChecked(true)

    // Fetch user data
    fetchUserData(storedAuth.user.email || "")
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchUserData = async (email: string) => {
    try {
      const productsRes = await fetch(`/api/products?email=${encodeURIComponent(email)}`)
      if (productsRes.ok) {
        const data = await productsRes.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalSales = products.reduce((sum, p) => sum + (p.sold * p.price), 0)
  const totalOrders = products.reduce((sum, p) => sum + p.sold, 0)
  const avgPrice = products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0

  const analyticsData = [
    { title: "Total Sales", value: `₹${totalSales.toLocaleString()}`, trend: "+0%", trendUp: true, icon: TrendingUp },
    { title: "Orders Fulfilled", value: totalOrders.toString(), trend: "+0%", trendUp: true, icon: ShoppingCart },
    { title: "Average Price", value: `₹${avgPrice.toFixed(0)}`, trend: "+0%", trendUp: true, icon: Package },
  ]

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading analytics...</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
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

        <div className="grid gap-4 lg:grid-cols-3">
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
                  <item.icon className="w-5 h-5 text-primary" />
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
    </DashboardLayout>
  )
}
