"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getAuth } from "@/lib/auth"
import { ShoppingCart, Clock } from "lucide-react"

type Order = {
  id: string
  buyer: string
  product: string
  quantity: string
  amount: string
  status: "delivered" | "shipped" | "processing" | "pending"
}

export default function FarmerOrdersPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }
    setAuthChecked(true)

    // For now, orders are not implemented, so empty
    setOrders([])
    setLoading(false)
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const statusColors = {
    delivered: "bg-green-500/10 text-green-600",
    shipped: "bg-blue-500/10 text-blue-600",
    processing: "bg-amber-500/10 text-amber-600",
    pending: "bg-gray-500/10 text-gray-600",
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading orders...</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Orders</h1>
            <p className="text-muted-foreground">
              Track your recent farm orders with live status updates.
            </p>
          </div>
          <div className="rounded-2xl bg-muted p-4 text-center">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Current time</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="overflow-hidden rounded-3xl border border-border bg-background">
            <table className="w-full text-left">
              <thead className="bg-muted text-sm uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">{order.id}</td>
                    <td className="px-6 py-4 text-foreground">{order.product}</td>
                    <td className="px-6 py-4">
                      <Badge className={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-foreground">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                You haven't received any orders yet. Start by adding products to your marketplace.
              </p>
              <p className="text-sm text-muted-foreground">
                Orders will appear here once buyers purchase your products.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Live order clock updates every second.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
