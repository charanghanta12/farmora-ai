"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  TrendingUp,
  Package,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuth } from "@/lib/auth"

type Product = {
  id: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
  sold: number
  status: "active" | "out_of_stock"
  description: string
  location: string
  createdAt: string
  aiSuggestion?: string | null
}

export default function FarmerProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()

  useEffect(() => {
    if (!auth?.user?.email) {
      setProducts([])
      setLoading(false)
      return
    }

    async function fetchProducts() {
      setLoading(true)
      const response = await fetch(`/api/products?email=${encodeURIComponent(auth.user.email)}`)
      const data = await response.json()

      if (data?.success) {
        setProducts(data.products ?? [])
      } else {
        setProducts([])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [auth?.user?.email])

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [products, searchQuery]
  )

  const activeProducts = products.filter((p) => p.status === "active").length
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
  const totalSold = products.reduce((acc, p) => acc + p.sold, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Products</h1>
            <p className="text-muted-foreground">
              Manage your product listings and inventory
            </p>
          </div>
          <Link href="/farmer/products/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Package className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeProducts}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalStock}</p>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalSold}</p>
                  <p className="text-sm text-muted-foreground">Total Sold</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {loading ? "Loading products..." : `All Products (${filteredProducts.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">Loading your inventory...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg font-semibold text-foreground">No products yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add your first product and it will be saved to your account.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center text-3xl">
                        🛒
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{product.name}</h3>
                          <Badge
                            variant={product.status === "active" ? "default" : "secondary"}
                            className={
                              product.status === "active"
                                ? "bg-green-500/10 text-green-600 border-0"
                                : "bg-red-500/10 text-red-600 border-0"
                            }
                          >
                            {product.status === "active" ? "Active" : "Out of Stock"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {product.category} • Stock: {product.stock} {product.unit}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ₹{product.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{product.unit}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
