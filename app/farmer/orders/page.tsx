"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const orders = [
  { id: "ORD-101", product: "Tomatoes", status: "Delivered", amount: "₹2,250" },
  { id: "ORD-102", product: "Onions", status: "Shipped", amount: "₹3,500" },
  { id: "ORD-103", product: "Potatoes", status: "Pending", amount: "₹6,000" },
]

export default function FarmerOrdersPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Orders</h1>
              <p className="text-muted-foreground">
                Track your recent farm orders with live status updates.
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-4 text-center">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Current time</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{time.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-background">
            <table className="w-full text-left">
              <thead className="bg-muted text-sm uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">{order.id}</td>
                    <td className="px-6 py-4 text-foreground">{order.product}</td>
                    <td className="px-6 py-4 text-foreground">{order.status}</td>
                    <td className="px-6 py-4 text-foreground">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/farmer/dashboard" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted">
              Back to dashboard
            </Link>
            <p className="text-sm text-muted-foreground">Live order clock updates every second.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
