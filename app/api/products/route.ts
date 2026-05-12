import { NextResponse } from "next/server"
import { addProduct, getProductsByOwner, ProductRecord } from "@/lib/product-store"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const email = url.searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Missing email query." }, { status: 400 })
  }

  const products = await getProductsByOwner(email)
  return NextResponse.json({ success: true, products })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 })
  }

  const { ownerEmail, name, category, unit, price, stock, description, location } = body as {
    ownerEmail?: string
    name?: string
    category?: string
    unit?: string
    price?: number
    stock?: number
    description?: string
    location?: string
  }

  if (!ownerEmail || !name || !category || !unit || typeof price !== "number" || typeof stock !== "number" || !description || !location) {
    return NextResponse.json({ error: "All product fields are required." }, { status: 400 })
  }

  const newProduct: ProductRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ownerEmail,
    name: name.trim(),
    category: category.trim(),
    unit: unit.trim(),
    price,
    stock,
    sold: 0,
    status: stock > 0 ? "active" : "out_of_stock",
    description: description.trim(),
    location: location.trim(),
    createdAt: new Date().toISOString(),
  }

  const product = await addProduct(newProduct)
  return NextResponse.json({ success: true, product })
}
