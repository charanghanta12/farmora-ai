"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShoppingCart,
  Heart,
  Grid,
  List,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  { id: "all", name: "All Products", icon: "🌾" },
  { id: "vegetables", name: "Vegetables", icon: "🥬" },
  { id: "fruits", name: "Fruits", icon: "🍎" },
  { id: "grains", name: "Grains", icon: "🌾" },
  { id: "pulses", name: "Pulses", icon: "🫘" },
  { id: "spices", name: "Spices", icon: "🌶️" },
  { id: "organic", name: "Organic", icon: "🌿" },
]

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    farmer: "Ramesh Kumar",
    location: "Anantapur, AP",
    price: 45,
    originalPrice: 60,
    unit: "kg",
    rating: 4.8,
    reviews: 124,
    image: "🍅",
    category: "vegetables",
    isOrganic: true,
    minOrder: 10,
    available: 500,
  },
  {
    id: 2,
    name: "Basmati Rice",
    farmer: "Suresh Reddy",
    location: "Warangal, TS",
    price: 85,
    originalPrice: 100,
    unit: "kg",
    rating: 4.9,
    reviews: 256,
    image: "🍚",
    category: "grains",
    isOrganic: false,
    minOrder: 25,
    available: 1000,
  },
  {
    id: 3,
    name: "Alphonso Mangoes",
    farmer: "Prakash Patil",
    location: "Ratnagiri, MH",
    price: 350,
    originalPrice: 450,
    unit: "dozen",
    rating: 5.0,
    reviews: 89,
    image: "🥭",
    category: "fruits",
    isOrganic: true,
    minOrder: 5,
    available: 200,
  },
  {
    id: 4,
    name: "Green Chillies",
    farmer: "Lakshmi Devi",
    location: "Guntur, AP",
    price: 80,
    originalPrice: 95,
    unit: "kg",
    rating: 4.7,
    reviews: 67,
    image: "🌶️",
    category: "vegetables",
    isOrganic: false,
    minOrder: 5,
    available: 300,
  },
  {
    id: 5,
    name: "Fresh Onions",
    farmer: "Raju Naik",
    location: "Nashik, MH",
    price: 35,
    originalPrice: 45,
    unit: "kg",
    rating: 4.6,
    reviews: 198,
    image: "🧅",
    category: "vegetables",
    isOrganic: false,
    minOrder: 20,
    available: 800,
  },
  {
    id: 6,
    name: "Turmeric Powder",
    farmer: "Ganga Rao",
    location: "Nizamabad, TS",
    price: 180,
    originalPrice: 220,
    unit: "kg",
    rating: 4.9,
    reviews: 312,
    image: "🟡",
    category: "spices",
    isOrganic: true,
    minOrder: 2,
    available: 150,
  },
  {
    id: 7,
    name: "Red Apples",
    farmer: "Himanshu Sharma",
    location: "Shimla, HP",
    price: 180,
    originalPrice: 200,
    unit: "kg",
    rating: 4.8,
    reviews: 145,
    image: "🍎",
    category: "fruits",
    isOrganic: false,
    minOrder: 10,
    available: 400,
  },
  {
    id: 8,
    name: "Moong Dal",
    farmer: "Venkat Rao",
    location: "Adilabad, TS",
    price: 120,
    originalPrice: 140,
    unit: "kg",
    rating: 4.7,
    reviews: 98,
    image: "🫘",
    category: "pulses",
    isOrganic: true,
    minOrder: 5,
    available: 250,
  },
]

function MarketplaceContent() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Fresh from the Farm, Direct to You
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Browse thousands of products from verified farmers across India.
                No middlemen, best prices guaranteed.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for vegetables, fruits, grains..."
                    className="pl-12 h-14 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
              </p>

              <div className="flex items-center gap-3">
                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>

                <div className="flex rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list" ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/marketplace/${product.id}`}>
                    <Card className="group card-hover overflow-hidden">
                      <CardContent className="p-0">
                        {viewMode === "grid" ? (
                          <>
                            {/* Image */}
                            <div className="relative h-48 bg-muted flex items-center justify-center">
                              <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                                {product.image}
                              </span>

                              {/* Badges */}
                              <div className="absolute top-3 left-3 flex gap-2">
                                {product.isOrganic && (
                                  <Badge className="bg-primary text-primary-foreground">
                                    Organic
                                  </Badge>
                                )}
                              </div>

                              {/* Wishlist */}
                              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Heart className="w-4 h-4" />
                              </button>

                              {/* Discount */}
                              {product.originalPrice > product.price && (
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                                  {Math.round(
                                    (1 - product.price / product.originalPrice) * 100
                                  )}
                                  % OFF
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div className="p-4">
                              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <span>{product.farmer}</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {product.location}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium">
                                  {product.rating}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  ({product.reviews})
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-xl font-bold text-foreground">
                                    ₹{product.price}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    /{product.unit}
                                  </span>
                                </div>
                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex gap-4 p-4">
                            <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center shrink-0">
                              <span className="text-4xl">{product.image}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {product.farmer} • {product.location}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-xl font-bold text-foreground">
                                    ₹{product.price}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    /{product.unit}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    {product.rating}
                                  </span>
                                  <span>Min: {product.minOrder} {product.unit}</span>
                                  <span>Stock: {product.available} {product.unit}</span>
                                </div>
                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <LanguageProvider>
      <MarketplaceContent />
    </LanguageProvider>
  )
}
