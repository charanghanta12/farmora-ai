"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AIChatbot } from "@/components/ai-chatbot"
import { getAuth, clearAuth } from "@/lib/auth"
import {
  Package,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  MapPin,
  Star,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  ChevronDown,
  Sprout,
  Plus,
  Minus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

export default function BuyerDashboard() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userPhone, setUserPhone] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCartDialog, setShowCartDialog] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

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
    setUserPhone(storedAuth.user.phone || "")
    setAuthChecked(true)
    fetchProducts()
    loadCart()
  }, [router])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?all=true`)
      if (response.ok) {
        const data = await response.json()
        const allProducts = data.products || []
        setProducts(allProducts)
        setFilteredProducts(allProducts)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCart = () => {
    const savedCart = localStorage.getItem("buyer_cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch {
        setCart([])
      }
    }
  }

  const saveCart = (newCart: CartItem[]) => {
    localStorage.setItem("buyer_cart", JSON.stringify(newCart))
    setCart(newCart)
  }

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem("buyer_cart")
    router.push("/")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterProducts(query, selectedCategory)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    filterProducts(searchQuery, category)
  }

  const filterProducts = (search: string, category: string) => {
    let filtered = products

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    setFilteredProducts(filtered)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (product: Product, farmerName: string) => {
    const existingItem = cart.find(
      (item) =>
        item.productId === product.id && item.farmerEmail === product.ownerEmail
    )

    let newCart: CartItem[]
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        newCart = cart.map((item) =>
          item.productId === product.id && item.farmerEmail === product.ownerEmail
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return
      }
    } else {
      newCart = [
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          farmerEmail: product.ownerEmail,
          farmerName: farmerName,
          price: product.price,
          quantity: 1,
          unit: product.unit,
          category: product.category,
          location: product.location,
        },
      ]
    }

    saveCart(newCart)
  }

  const updateCartQuantity = (productId: string, farmerEmail: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, farmerEmail)
      return
    }

    const product = products.find((p) => p.id === productId)
    if (product && quantity > product.stock) {
      return
    }

    const newCart = cart.map((item) =>
      item.productId === productId && item.farmerEmail === farmerEmail
        ? { ...item, quantity }
        : item
    )
    saveCart(newCart)
  }

  const removeFromCart = (productId: string, farmerEmail: string) => {
    const newCart = cart.filter(
      (item) => !(item.productId === productId && item.farmerEmail === farmerEmail)
    )
    saveCart(newCart)
  }

  const handleCheckout = async () => {
    if (cart.length === 0 || !userEmail || !userName || !userPhone) return

    setIsCheckingOut(true)
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerEmail: userEmail,
          buyerName: userName,
          buyerPhone: userPhone,
          items: cart,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        localStorage.removeItem("buyer_cart")
        setCart([])
        setShowCartDialog(false)
        router.push("/buyer/orders")
      }
    } catch (error) {
      console.error("Error creating order:", error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const initials = userName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "BU"

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading marketplace...</p>
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

          <div className="flex-1 mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCartDialog(true)}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>

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
      <main className="pt-20 pb-8 px-4 lg:px-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">
            Browse fresh products directly from local farmers
          </p>
        </motion.div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryFilter(category)}
              className="whitespace-nowrap capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product, index) => {
              const farmerName = products
                .find((p) => p.ownerEmail === product.ownerEmail)
                ?.ownerEmail || "Unknown Farmer"
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative bg-muted h-40 flex items-center justify-center group">
                      <Package className="w-16 h-16 text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.includes(product.id)
                              ? "fill-destructive text-destructive"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      {product.status === "out_of_stock" && (
                        <Badge className="absolute inset-0 flex items-center justify-center rounded-none bg-black/50">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <CardContent className="flex-1 p-4 flex flex-col">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-1 capitalize">
                        {product.category}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {farmerName || "Unknown Farmer"}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{product.location}</span>
                      </div>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                        <span className="text-xs text-muted-foreground">per {product.unit}</span>
                      </div>

                      <div className="text-xs text-muted-foreground mb-4">
                        {product.stock > 0 ? (
                          <span className="text-green-600">
                            {product.stock} {product.unit}s available
                          </span>
                        ) : (
                          <span className="text-destructive">Out of stock</span>
                        )}
                      </div>

                      <Button
                        className="w-full mt-auto"
                        disabled={product.status === "out_of_stock"}
                        onClick={() => addToCart(product, farmerName)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your filters or search query"
                : "Check back soon for fresh products from local farmers"}
            </p>
          </div>
        )}
      </main>

      {/* Cart Dialog */}
      <Dialog open={showCartDialog} onOpenChange={setShowCartDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Shopping Cart</DialogTitle>
          </DialogHeader>

          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.farmerEmail}`}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">{item.farmerName}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price} per {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateCartQuantity(item.productId, item.farmerEmail, item.quantity - 1)
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateCartQuantity(item.productId, item.farmerEmail, item.quantity + 1)
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => removeFromCart(item.productId, item.farmerEmail)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <AIChatbot />
    </div>
  )
}
