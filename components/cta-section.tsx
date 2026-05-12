"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight, Tractor, Store, CheckCircle2 } from "lucide-react"

export function CTASection() {
  const { t } = useLanguage()

  const farmerBenefits = [
    "Direct access to 10,000+ buyers",
    "AI-powered price recommendations",
    "Secure & instant payments",
    "Free logistics support",
  ]

  const buyerBenefits = [
    "Farm-fresh products at wholesale prices",
    "Quality verified by AI",
    "Bulk ordering made easy",
    "Track orders in real-time",
  ]

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Farmer CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-3xl transform group-hover:scale-[1.02] transition-transform" />
            <div className="relative p-8 lg:p-12">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Tractor className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t("farmer")}? Start Selling Today
              </h3>
              <p className="text-white/80 text-lg mb-6">
                Join 50,000+ farmers who increased their income by selling directly to buyers.
              </p>

              <ul className="space-y-3 mb-8">
                {farmerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link href="/signup?type=farmer">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 h-14 px-8"
                >
                  Register as Farmer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Buyer CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/80 rounded-3xl transform group-hover:scale-[1.02] transition-transform" />
            <div className="relative p-8 lg:p-12">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {t("buyer")}? Source Directly
              </h3>
              <p className="text-white/80 text-lg mb-6">
                Restaurants, wholesalers, and retailers - get the freshest produce at best prices.
              </p>

              <ul className="space-y-3 mb-8">
                {buyerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link href="/signup?type=buyer">
                <Button
                  size="lg"
                  className="bg-white text-accent hover:bg-white/90 h-14 px-8"
                >
                  Register as Buyer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
