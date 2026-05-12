"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Shield,
  Truck,
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Price Prediction",
    description: "Get accurate price forecasts based on historical data, seasonal trends, and market analysis.",
    color: "from-green-500 to-emerald-600",
    delay: 0,
  },
  {
    icon: TrendingUp,
    title: "Demand Forecasting",
    description: "Know what crops will be in demand before you plant. Plan your harvest for maximum profit.",
    color: "from-amber-500 to-orange-600",
    delay: 0.1,
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Assistant",
    description: "Ask questions in your language. Get instant answers about prices, buyers, and transport.",
    color: "from-blue-500 to-cyan-600",
    delay: 0.2,
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "AI-powered verification of buyers and sellers. Trade with confidence and security.",
    color: "from-purple-500 to-violet-600",
    delay: 0.3,
  },
  {
    icon: Truck,
    title: "Smart Logistics",
    description: "Find the best transport options near you. Reduce costs and ensure fresh delivery.",
    color: "from-rose-500 to-pink-600",
    delay: 0.4,
  },
  {
    icon: BarChart3,
    title: "Crop Insights Dashboard",
    description: "Visual analytics showing demand trends, profit margins, and market opportunities.",
    color: "from-teal-500 to-green-600",
    delay: 0.5,
  },
]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 leaf-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Powered by Advanced AI
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            AI Features That{" "}
            <span className="text-gradient">Transform Farming</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leverage cutting-edge artificial intelligence to make smarter decisions, 
            find better buyers, and maximize your profits.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
            >
              <Card className="group h-full card-hover border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/ai-features">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8">
              <Zap className="w-5 h-5 mr-2" />
              Explore All AI Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
