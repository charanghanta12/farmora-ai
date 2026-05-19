import fs from "fs/promises"
import path from "path"

export type CartItem = {
  productId: string
  productName: string
  farmerEmail: string
  farmerName: string
  price: number
  quantity: number
  unit: string
  category: string
  location: string
}

export type Order = {
  id: string
  buyerEmail: string
  buyerName: string
  buyerPhone: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

const ordersFile = path.join(process.cwd(), "data", "orders.json")

async function ensureOrdersFile() {
  try {
    await fs.access(ordersFile)
  } catch {
    await fs.mkdir(path.dirname(ordersFile), { recursive: true })
    await fs.writeFile(ordersFile, JSON.stringify([], null, 2), "utf8")
  }
}

export async function readOrders(): Promise<Order[]> {
  await ensureOrdersFile()
  const raw = await fs.readFile(ordersFile, "utf8")
  try {
    return JSON.parse(raw) as Order[]
  } catch {
    return []
  }
}

export async function writeOrders(orders: Order[]) {
  await ensureOrdersFile()
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf8")
}

export async function createOrder(order: Order) {
  const orders = await readOrders()
  orders.push(order)
  await writeOrders(orders)
  return order
}

export async function getOrdersByBuyer(buyerEmail: string) {
  const orders = await readOrders()
  return orders.filter((order) => order.buyerEmail.toLowerCase() === buyerEmail.toLowerCase())
}

export async function getOrdersByFarmer(farmerEmail: string) {
  const orders = await readOrders()
  const farmerOrders: Order[] = []
  
  for (const order of orders) {
    const farmerItems = order.items.filter(
      (item) => item.farmerEmail.toLowerCase() === farmerEmail.toLowerCase()
    )
    if (farmerItems.length > 0) {
      farmerOrders.push({
        ...order,
        items: farmerItems,
      })
    }
  }
  
  return farmerOrders
}

export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  const orders = await readOrders()
  const order = orders.find((o) => o.id === orderId)
  if (order) {
    order.status = status
    order.updatedAt = new Date().toISOString()
    await writeOrders(orders)
  }
  return order
}
