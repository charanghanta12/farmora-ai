"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Venkatesh Reddy",
    role: "Farmer",
    location: "Karimnagar, Telangana",
    content: "Before Farmora, I sold my tomatoes for ₹20/kg to middlemen. Now I get ₹45/kg directly from restaurants. My income doubled!",
    rating: 5,
    avatar: "VR",
    profit: "+125%",
  },
  {
    name: "Priya Sharma",
    role: "Restaurant Owner",
    location: "Hyderabad",
    content: "Fresh vegetables directly from farmers at wholesale prices. The AI quality check ensures we always get the best produce.",
    rating: 5,
    avatar: "PS",
    savings: "30%",
  },
  {
    name: "Raju Naidu",
    role: "Farmer",
    location: "Anantapur, AP",
    content: "The AI price prediction told me to wait 2 weeks before selling my onions. I made ₹15 more per kg. Amazing technology!",
    rating: 5,
    avatar: "RN",
    profit: "+40%",
  },
  {
    name: "Mohammed Ismail",
    role: "Wholesaler",
    location: "Vijayawada",
    content: "Bulk ordering is so easy. I connect with 50+ farmers in my area. Quality is consistent and prices are transparent.",
    rating: 5,
    avatar: "MI",
    savings: "25%",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute inset-0 leaf-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Real Stories, <span className="text-gradient">Real Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from farmers and buyers who transformed their business with Farmora AI
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full card-hover border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 lg:p-8">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />

                  {/* Content */}
                  <p className="text-foreground text-lg leading-relaxed mb-6">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Impact Badge */}
                    <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {testimonial.profit || `Save ${testimonial.savings}`}
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
