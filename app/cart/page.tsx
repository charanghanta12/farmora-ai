"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const cartItems = [
  { id: "1", name: "Tomatoes", quantity: 2, price: 2250 },
  { id: "2", name: "Onions", quantity: 1, price: 3500 },
  { id: "3", name: "Green Chillies", quantity: 3, price: 1600 },
]

export default function CartPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
              <p className="mt-2 text-muted-foreground">
                Review your selected farm products and checkout in real time.
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-4 text-center">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Live clock</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
              <p className="text-sm text-muted-foreground">{time.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-background">
            <table className="w-full text-left">
              <thead className="bg-muted text-sm uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">{item.name}</td>
                    <td className="px-6 py-4 text-foreground">{item.quantity}</td>
                    <td className="px-6 py-4 text-foreground">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-foreground">Total: ₹{total}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/marketplace" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">
                Continue shopping
              </Link>
              <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Checkout now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
