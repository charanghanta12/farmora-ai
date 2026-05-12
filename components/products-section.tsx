"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import {
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  ArrowRight,
  Flame,
} from "lucide-react"

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    nameHi: "ताज़े टमाटर",
    nameTe: "తాజా టమాటాలు",
    farmer: "Ramesh Kumar",
    location: "Anantapur, AP",
    price: 45,
    originalPrice: 60,
    unit: "kg",
    rating: 4.8,
    reviews: 124,
    image: "🍅",
    category: "Vegetables",
    isOrganic: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Basmati Rice",
    nameHi: "बासमती चावल",
    nameTe: "బాస్మతి బియ్యం",
    farmer: "Suresh Reddy",
    location: "Warangal, TS",
    price: 85,
    originalPrice: 100,
    unit: "kg",
    rating: 4.9,
    reviews: 256,
    image: "🍚",
    category: "Grains",
    isOrganic: false,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Alphonso Mangoes",
    nameHi: "अल्फांसो आम",
    nameTe: "అల్ఫాన్సో మామిడి",
    farmer: "Prakash Patil",
    location: "Ratnagiri, MH",
    price: 350,
    originalPrice: 450,
    unit: "dozen",
    rating: 5.0,
    reviews: 89,
    image: "🥭",
    category: "Fruits",
    isOrganic: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Green Chillies",
    nameHi: "हरी मिर्च",
    nameTe: "పచ్చి మిర్చి",
    farmer: "Lakshmi Devi",
    location: "Guntur, AP",
    price: 80,
    originalPrice: 95,
    unit: "kg",
    rating: 4.7,
    reviews: 67,
    image: "🌶️",
    category: "Vegetables",
    isOrganic: false,
    isFeatured: false,
  },
  {
    id: 5,
    name: "Fresh Onions",
    nameHi: "ताज़ा प्याज",
    nameTe: "తాజా ఉల్లిపాయలు",
    farmer: "Raju Naik",
    location: "Nashik, MH",
    price: 35,
    originalPrice: 45,
    unit: "kg",
    rating: 4.6,
    reviews: 198,
    image: "🧅",
    category: "Vegetables",
    isOrganic: false,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Turmeric Powder",
    nameHi: "हल्दी पाउडर",
    nameTe: "పసుపు పొడి",
    farmer: "Ganga Rao",
    location: "Nizamabad, TS",
    price: 180,
    originalPrice: 220,
    unit: "kg",
    rating: 4.9,
    reviews: 312,
    image: "🟡",
    category: "Spices",
    isOrganic: true,
    isFeatured: true,
  },
]

export function ProductsSection() {
  const { t, language } = useLanguage()

  const getProductName = (product: typeof products[0]) => {
    if (language === 'hi') return product.nameHi
    if (language === 'te') return product.nameTe
    return product.name
  }

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Fresh Today
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-3 text-balance">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Fresh from farms across India. Direct from farmers, delivered to your doorstep.
            </p>
          </div>
          
          <Link href="/marketplace">
            <Button variant="outline" size="lg" className="gap-2">
              {t("viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group card-hover overflow-hidden border-border/50">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
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
                      {product.isFeatured && (
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                      <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                    </button>

                    {/* Discount */}
                    {product.originalPrice > product.price && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.category}
                    </p>

                    {/* Name */}
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {getProductName(product)}
                    </h3>

                    {/* Farmer & Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span>{product.farmer}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.location}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{product.unit}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
