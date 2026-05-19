"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sprout,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Wallet,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Brain,
  HelpCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIChatbot } from "@/components/ai-chatbot"
import { getAuth, clearAuth } from "@/lib/auth"

type Product = {
  price: number
  sold: number
}

const sidebarLinks = [
  { href: "/farmer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/farmer/products", icon: Package, label: "My Products" },
  { href: "/farmer/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/farmer/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/farmer/earnings", icon: Wallet, label: "Earnings" },
  { href: "/farmer/ai-insights", icon: Brain, label: "AI Insights" },
  { href: "/farmer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/farmer/settings", icon: Settings, label: "Settings" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("User")
  const [userEmail, setUserEmail] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const auth = getAuth()
    setUserName(auth?.user?.name || "User")
    setUserEmail(auth?.user?.email || "")
  }, [])

  useEffect(() => {
    if (!userEmail) {
      setProducts([])
      return
    }

    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products?email=${encodeURIComponent(userEmail)}`)
        if (!response.ok) {
          setProducts([])
          return
        }

        const data = await response.json()
        setProducts(data.products || [])
      } catch {
        setProducts([])
      }
    }

    fetchProducts()
  }, [userEmail])

  const initials = useMemo(
    () =>
      userName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U",
    [userName]
  )
  const totalProducts = products.length
  const monthlyEarnings = products.reduce((sum, product) => sum + product.sold * product.price, 0)

  const handleSignOut = () => {
    clearAuth()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-muted rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold">FarmoraAI</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-sidebar border-r border-sidebar-border"
            >
              <SidebarContent
                pathname={pathname}
                onClose={() => setIsSidebarOpen(false)}
                userName={userName}
                initials={initials}
                totalProducts={totalProducts}
                monthlyEarnings={monthlyEarnings}
                onSignOut={handleSignOut}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 flex-col bg-sidebar border-r border-sidebar-border">
        <SidebarContent
          pathname={pathname}
          userName={userName}
          initials={initials}
          totalProducts={totalProducts}
          monthlyEarnings={monthlyEarnings}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Welcome back, {userName}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening with your farm today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </Button>

            <Button variant="ghost" size="icon">
              <HelpCircle className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{userName}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
      <AIChatbot />
    </div>
  )
}

function SidebarContent({
  pathname,
  onClose,
  userName,
  initials,
  totalProducts,
  monthlyEarnings,
  onSignOut,
}: {
  pathname: string
  onClose?: () => void
  userName: string
  initials: string
  totalProducts: number
  monthlyEarnings: number
  onSignOut: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">
            Farmora<span className="text-primary">AI</span>
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Card */}
      <div className="p-4">
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sidebar-foreground">{userName}</p>
              <p className="text-sm text-muted-foreground">Verified Farmer</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/20 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{totalProducts}</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">₹{monthlyEarnings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={onSignOut}
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
