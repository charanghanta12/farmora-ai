"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getAuth } from "@/lib/auth"
import { ShoppingCart, MapPin, Package } from "lucide-react"

type CartItem = {
  productId: string
  productName: string
  farmerEmail: string
  farmerName: string
  price: number
  quantity: number
  unit: string
  category: string
  location: string
}

type Order = {
  id: string
  buyerEmail: string
  buyerName: string
  buyerPhone: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

export default function FarmerOrdersPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [farmerEmail, setFarmerEmail] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }
    
    setFarmerEmail(storedAuth.user.email || "")
    setAuthChecked(true)
    
    if (storedAuth.user.email) {
      fetchOrders(storedAuth.user.email)
    }
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async (email: string) => {
    try {
      const response = await fetch(`/api/orders?buyerEmail=`)
      if (response.ok) {
        const data = await response.json()
        // Filter orders that contain products from this farmer
        const farmerOrders = data.orders.filter((order: Order) =>
          order.items.some((item) => item.farmerEmail.toLowerCase() === email.toLowerCase())
        )
        setOrders(farmerOrders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600"
      case "confirmed":
        return "bg-blue-500/10 text-blue-600"
      case "delivered":
        return "bg-green-500/10 text-green-600"
      case "cancelled":
        return "bg-red-500/10 text-red-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
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
            <h1 className="text-3xl font-bold text-foreground">Buyer Orders</h1>
            <p className="text-muted-foreground">
              Track orders from buyers for your products.
            </p>
          </div>
          <div className="rounded-2xl bg-muted p-4 text-center">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Current time</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">
                        Order #{order.id.slice(0, 8)}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        <p>From: {order.buyerName} ({order.buyerEmail})</p>
                        <p>Phone: {order.buyerPhone}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="space-y-3 mb-4">
                    {order.items
                      .filter((item) =>
                        item.farmerEmail.toLowerCase() === farmerEmail.toLowerCase()
                      )
                      .map((item) => (
                        <div
                          key={`${item.productId}-${item.farmerEmail}`}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-semibold">{item.productName}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} × {item.unit} @ ₹{item.price}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Order Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              // TODO: Implement status update
                            }}
                          >
                            Confirm Order
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            // TODO: Implement delivery
                          }}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground text-center">
                You haven't received any orders yet. Start by adding products to your marketplace.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
