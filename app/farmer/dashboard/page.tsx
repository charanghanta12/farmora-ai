"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { clearAuth, getAuth } from "@/lib/auth"
import {
  Package,
  TrendingUp,
  Wallet,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Brain,
  Clock,
} from "lucide-react"
import Link from "next/link"

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

type Order = {
  id: string
  buyer: string
  product: string
  quantity: string
  amount: string
  status: "delivered" | "shipped" | "processing" | "pending"
}

const aiInsights = [
  {
    title: "Price Alert: Tomatoes",
    description: "Prices expected to rise 15% in next week. Consider holding stock.",
    type: "opportunity",
    icon: TrendingUp,
  },
  {
    title: "High Demand: Onions",
    description: "Onion demand increasing in your area. List more products.",
    type: "demand",
    icon: Brain,
  },
  {
    title: "Best Selling Time",
    description: "Your products sell best between 6 AM - 10 AM. Schedule listings accordingly.",
    type: "timing",
    icon: Clock,
  },
]

const statusColors = {
  delivered: "bg-green-500/10 text-green-600",
  shipped: "bg-blue-500/10 text-blue-600",
  processing: "bg-amber-500/10 text-amber-600",
  pending: "bg-gray-500/10 text-gray-600",
}

export default function FarmerDashboard() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }
    setUserName(storedAuth.user.name)
    setAuthChecked(true)

    // Fetch user data
    fetchUserData(storedAuth.user.email || "")
  }, [router])

  const fetchUserData = async (email: string) => {
    try {
      // Fetch products
      const productsRes = await fetch(`/api/products?email=${encodeURIComponent(email)}`)
      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData.products || [])
      }

      // For now, orders are empty as they're not implemented
      setOrders([])
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalProducts = products.length
  const activeOrders = orders.filter(o => o.status === "processing" || o.status === "shipped").length
  const totalEarnings = products.reduce((sum, p) => sum + (p.sold * p.price), 0)
  const aiPriceBoost = "+0%" // Placeholder

  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toString(),
      change: "+0",
      trend: "up",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Orders",
      value: activeOrders.toString(),
      change: "+0",
      trend: "up",
      icon: ShoppingCart,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "This Month Earnings",
      value: `₹${totalEarnings.toLocaleString()}`,
      change: "+0%",
      trend: "up",
      icon: Wallet,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "AI Price Boost",
      value: aiPriceBoost,
      change: "vs market",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  const handleLogout = () => {
    clearAuth()
    router.push("/")
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            {userName ? (
              <p className="text-sm text-primary mt-1">Welcome back, {userName}!</p>
            ) : null}
            <p className="text-muted-foreground">
              Track your sales, orders, and AI insights
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/farmer/products/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
            <Button variant="outline" className="h-12" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/farmer/orders">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.length > 0 ? orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{order.buyer}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.product} • {order.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{order.amount}</p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${statusColors[order.status]}`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                      <p className="text-sm text-muted-foreground">Your orders will appear here once you start selling</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Insights
                </CardTitle>
                <Link href="/farmer/ai-insights">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <insight.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {insight.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
