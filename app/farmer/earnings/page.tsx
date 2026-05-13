"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getAuth } from "@/lib/auth"
import { Wallet, TrendingUp, Calendar, DollarSign } from "lucide-react"

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

export default function FarmerEarningsPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

  const totalEarnings = products.reduce((sum, p) => sum + (p.sold * p.price), 0)
  const monthlyEarnings = totalEarnings // Placeholder - in real app, calculate based on date
  const pendingPayments = 0 // Placeholder
  const averageOrderValue = products.length > 0 ? totalEarnings / products.reduce((sum, p) => sum + p.sold, 0) || 0 : 0

  const earningsData = [
    {
      title: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString()}`,
      change: "+0%",
      icon: Wallet,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "This Month",
      value: `₹${monthlyEarnings.toLocaleString()}`,
      change: "+0%",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Payments",
      value: `₹${pendingPayments.toLocaleString()}`,
      change: "0 pending",
      icon: DollarSign,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Avg Order Value",
      value: `₹${averageOrderValue.toFixed(0)}`,
      change: "+0%",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading earnings...</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Earnings</h1>
          <p className="text-muted-foreground">
            Track your income and payment history.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {earningsData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Wallet className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Payment History</h3>
            <p className="text-muted-foreground text-center mb-4">
              Your payment history and transaction details will appear here once you start earning from sales.
            </p>
            <p className="text-sm text-muted-foreground">
              Payments are processed weekly for completed orders.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}