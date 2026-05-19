import { NextResponse } from "next/server"
import { createOrder, getOrdersByBuyer, Order } from "@/lib/cart-store"
import { readProducts } from "@/lib/product-store"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const buyerEmail = url.searchParams.get("buyerEmail")

  if (!buyerEmail) {
    return NextResponse.json({ error: "Missing buyerEmail query." }, { status: 400 })
  }

  const orders = await getOrdersByBuyer(buyerEmail)
  return NextResponse.json({ success: true, orders })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 })
  }

  const { buyerEmail, buyerName, buyerPhone, items } = body as {
    buyerEmail?: string
    buyerName?: string
    buyerPhone?: string
    items?: any[]
  }

  if (!buyerEmail || !buyerName || !buyerPhone || !items || items.length === 0) {
    return NextResponse.json({ error: "Missing required order fields." }, { status: 400 })
  }

  // Calculate total amount
  const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  // Create order
  const newOrder: Order = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    buyerEmail,
    buyerName,
    buyerPhone,
    items,
    totalAmount,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const createdOrder = await createOrder(newOrder)
  
  // Update product stock
  const products = await readProducts()
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId)
    if (product) {
      product.stock -= item.quantity
      product.sold += item.quantity
      if (product.stock <= 0) {
        product.status = "out_of_stock"
      }
    }
  }
  
  // Write updated products - we need to import writeProducts
  const fs = require("fs/promises")
  const path = require("path")
  const productsFile = path.join(process.cwd(), "data", "products.json")
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2), "utf8")

  return NextResponse.json({ success: true, order: createdOrder })
}
