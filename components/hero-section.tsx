"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react"

export function HeroSection() {
  const { t } = useLanguage()

  const stats = [
    { value: "50K+", label: t("activeFarmers") },
    { value: "2L+", label: t("totalTransactions") },
    { value: "500+", label: t("croresSaved") },
    { value: "15+", label: t("statesServed") },
  ]

  const features = [
    { icon: TrendingUp, label: t("aiPricePrediction") },
    { icon: Users, label: t("directSelling") },
    { icon: ShieldCheck, label: t("securePayments") },
    { icon: Truck, label: t("realTimeTracking") },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 leaf-pattern opacity-50" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-xl"
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Agriculture Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              {t("heroTitle")}{" "}
              <span className="text-gradient">
                — No Middlemen
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              {t("heroDescription")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/signup?type=farmer">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg"
                >
                  {t("sellNow")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/signup?type=buyer">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-2"
                >
                  {t("buyNow")}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="ghost"
                className="h-14 px-6 text-lg gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                </div>
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative">
              <motion.div
                className="glass rounded-3xl p-8 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Decorative Image Placeholder */}
                <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center"
                      >
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-4xl">🌾</span>
                        </div>
                      </motion.div>
                      <p className="text-sm text-muted-foreground">
                        Fresh from the Farm
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Tags */}
                  <motion.div
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    +25% Profit
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    AI Verified
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-muted/50"
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-primary mb-1 counter">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl border-2 border-primary/20" />
              <div className="absolute -z-20 -top-8 -right-8 w-full h-full rounded-3xl border-2 border-primary/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
