"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Upload,
  Sparkles,
  IndianRupee,
  Package,
  MapPin,
  Leaf,
} from "lucide-react"
import Link from "next/link"
import { getAuth } from "@/lib/auth"

const categories = [
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "grains", label: "Grains" },
  { value: "pulses", label: "Pulses" },
  { value: "spices", label: "Spices" },
  { value: "dairy", label: "Dairy" },
]

const units = [
  { value: "kg", label: "Kilogram (kg)" },
  { value: "quintal", label: "Quintal" },
  { value: "ton", label: "Ton" },
  { value: "dozen", label: "Dozen" },
  { value: "piece", label: "Piece" },
  { value: "litre", label: "Litre" },
]

export default function NewProductPage() {
  const router = useRouter()
  const auth = getAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAISuggestion, setShowAISuggestion] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")

  useEffect(() => {
    if (!auth?.user?.email) {
      router.push("/login")
    }
  }, [auth, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!auth?.user?.email) {
      return
    }

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const category = String(formData.get("category") ?? selectedCategory).trim()
    const unit = String(formData.get("unit") ?? selectedUnit).trim()
    const description = String(formData.get("description") ?? "").trim()
    const price = Number(formData.get("price"))
    const stock = Number(formData.get("stock"))
    const location = String(formData.get("location") ?? "").trim()

    if (!name || !category || !unit || !description || !location || Number.isNaN(price) || Number.isNaN(stock)) {
      return
    }

    setIsSubmitting(true)

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerEmail: auth.user.email,
        name,
        category,
        unit,
        price,
        stock,
        description,
        location,
      }),
    })

    setIsSubmitting(false)
    router.push("/farmer/products")
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/farmer/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Product</h1>
            <p className="text-muted-foreground">List your product on the marketplace</p>
          </div>
        </div>

        {showAISuggestion && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">AI Price Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on current market trends in your area, we suggest pricing tomatoes between{' '}
                      <span className="font-semibold text-primary">₹42-48/kg</span>. Prices are 12% higher than last month due to lower supply.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Fresh Tomatoes"
                  onChange={() => setShowAISuggestion(true)}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    id="unit"
                    name="unit"
                    value={selectedUnit}
                    onValueChange={(value) => setSelectedUnit(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product quality, freshness, farming method..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <input type="checkbox" id="organic" className="w-4 h-4 accent-primary" />
                <Label htmlFor="organic" className="flex items-center gap-2 cursor-pointer">
                  <Leaf className="w-4 h-4 text-primary" />
                  This is an organic product
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Pricing & Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (per unit)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input id="price" name="price" type="number" placeholder="45" className="pl-8" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Available Stock</Label>
                  <Input id="stock" name="stock" type="number" placeholder="500" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order Quantity</Label>
                <Input id="minOrder" name="minOrder" type="number" placeholder="10" required />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Farm/Pickup Address</Label>
                <Input id="location" name="location" placeholder="Village/Town, District, State" required />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium text-foreground mb-1">Upload product images</p>
                <p className="text-sm text-muted-foreground">Drag and drop or click to browse. Max 5 images.</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Link href="/farmer/products" className="flex-1">
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Product"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
