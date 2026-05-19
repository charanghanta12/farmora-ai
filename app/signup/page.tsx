"use client"

import { Suspense, useState, FormEvent } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import {
  Sprout,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  User,
  MapPin,
  Tractor,
  Store,
  CheckCircle2,
} from "lucide-react"

function SignupForm() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialType = searchParams.get("type") as "farmer" | "buyer" | null

  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"farmer" | "buyer">(initialType || "farmer")
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleContinue = () => {
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.")
      return
    }
    setError("")
    setStep(2)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!email.trim() || !location.trim() || !password.trim()) {
      setError("Please complete the signup form.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userType,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          location: location.trim(),
          password,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        setError(result.error || "Unable to create account.")
        setLoading(false)
        return
      }

      router.push("/login")
    } catch (error) {
      setError("Unable to create account. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 leaf-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="text-center pb-0">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Sprout className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">
                Farmora<span className="text-primary">AI</span>
              </span>
            </Link>

            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Join the agricultural revolution
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`flex items-center ${s < 2 ? "flex-1" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 2 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setUserType("farmer")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      userType === "farmer"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Tractor
                      className={`w-10 h-10 mx-auto mb-3 ${
                        userType === "farmer" ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <p className="font-semibold">{t("farmer")}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sell your crops directly
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("buyer")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      userType === "buyer"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Store
                      className={`w-10 h-10 mx-auto mb-3 ${
                        userType === "buyer" ? "text-accent" : "text-muted-foreground"
                      }`}
                    />
                    <p className="font-semibold">{t("buyer")}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Buy fresh from farms
                    </p>
                  </button>
                </div>

                <form className="space-y-4">
                  {error ? (
                    <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+91 98765 43210"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleContinue}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-lg"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {error ? (
                    <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="farmer@example.com"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t("location")}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="Enter your city/village"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t("password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10 h-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 h-12 bg-primary hover:bg-primary/90"
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center mt-6">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>

            {/* Login Link */}
            <p className="text-center text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                {t("login")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </LanguageProvider>
  )
}
