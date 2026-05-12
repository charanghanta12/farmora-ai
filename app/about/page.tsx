"use client"

import { motion } from "framer-motion"
import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"
import { Card, CardContent } from "@/components/ui/card"
import {
  Target,
  Users,
  Heart,
  Globe,
  Lightbulb,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react"

const stats = [
  { value: "50,000+", label: "Farmers Empowered" },
  { value: "2 Lakh+", label: "Transactions" },
  { value: "15+", label: "States Covered" },
  { value: "500 Cr+", label: "Savings for Farmers" },
]

const values = [
  {
    icon: Heart,
    title: "Farmer First",
    description: "Every decision we make starts with how it benefits the farmer community.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Fair pricing, verified buyers, and secure transactions you can count on.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Using AI and technology to solve age-old agricultural challenges.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Available in local languages with simple interfaces for everyone.",
  },
]

const team = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    bio: "Former farmer turned tech entrepreneur with a mission to transform agriculture.",
  },
  {
    name: "Priya Reddy",
    role: "CTO",
    bio: "AI researcher with expertise in agricultural technology and market prediction.",
  },
  {
    name: "Mohammed Khan",
    role: "Head of Operations",
    bio: "20+ years in agricultural supply chain and logistics management.",
  },
  {
    name: "Lakshmi Venkat",
    role: "Head of Farmer Relations",
    bio: "Works directly with farming communities across 15 states.",
  },
]

export default function AboutPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Empowering Farmers,{" "}
                  <span className="text-gradient">Transforming Agriculture</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Farmora AI was born from a simple observation: farmers work the hardest 
                  but often earn the least. We&apos;re here to change that by eliminating 
                  middlemen and connecting farmers directly with buyers through AI-powered 
                  technology.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 border-b border-border">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Our Mission</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    Building a Fair Agricultural Economy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    For too long, middlemen have controlled agricultural markets, taking 
                    the lion&apos;s share of profits while farmers struggle. Farmora AI is 
                    building the infrastructure for a fairer agricultural economy where 
                    farmers get paid what they deserve.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Using artificial intelligence, we predict prices, match farmers with 
                    the right buyers, detect fraud, and optimize logistics - all to ensure 
                    every farmer can thrive.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-8xl">🌾</span>
                      <p className="mt-4 text-lg font-medium text-foreground">
                        Farm to Table, Direct
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-primary/20 -z-10" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Our Core Values
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do at Farmora AI
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full card-hover">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <value.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Meet Our Team
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Passionate individuals dedicated to transforming Indian agriculture
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full card-hover">
                      <CardContent className="p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Users className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-sm text-primary mb-2">{member.role}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <AIChatbot />
      </div>
    </LanguageProvider>
  )
}
