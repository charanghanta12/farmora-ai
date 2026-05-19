"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAuth, clearAuth } from "@/lib/auth"
import {
  ShoppingBag,
  ChevronLeft,
  LogOut,
  User,
  ChevronDown,
  Sprout,
  MapPin,
  Package,
  Calendar,
  DollarSign,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

export default function BuyerOrdersPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }

    if (storedAuth.user.userType !== "buyer") {
      router.replace("/farmer/dashboard")
      return
    }

    setUserName(storedAuth.user.name)
    setUserEmail(storedAuth.user.email || "")
    setAuthChecked(true)
    fetchOrders(storedAuth.user.email || "")
  }, [router])

  const fetchOrders = async (email: string) => {
    try {
      const response = await fetch(`/api/orders?buyerEmail=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem("buyer_cart")
    router.push("/")
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const initials = userName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "BU"

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between h-full px-4 lg:px-6 max-w-7xl mx-auto w-full">
          <Link href="/buyer/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">FarmoraAI</span>
          </Link>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline font-medium">{userName}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 lg:px-6 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/buyer/dashboard"
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track your purchases and delivery status
          </p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">Order #{order.id.slice(0, 8)}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ₹{order.totalAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={`${item.productId}-${item.farmerEmail}`}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-semibold">{item.productName}</h4>
                              <p className="text-sm text-muted-foreground">
                                From {item.farmerName}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} × {item.unit}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Order Total:</span>
                        <span className="text-xl font-bold text-primary">
                          ₹{order.totalAmount.toLocaleString()}
                        </span>
                      </div>

                      {order.status === "pending" && (
                        <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                          Your order is being processed. You will receive updates soon.
                        </p>
                      )}
                      {order.status === "confirmed" && (
                        <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                          Your order has been confirmed and is being prepared for delivery.
                        </p>
                      )}
                      {order.status === "delivered" && (
                        <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                          Your order has been delivered. Thank you for shopping with us!
                        </p>
                      )}
                      {order.status === "cancelled" && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                          Your order has been cancelled. Please contact support for details.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start shopping and place your first order!
              </p>
              <Button asChild>
                <Link href="/buyer/dashboard">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
