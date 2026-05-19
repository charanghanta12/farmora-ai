import fs from "fs/promises"
import path from "path"

export type ProductRecord = {
  id: string
  ownerEmail: string
  name: string
  category: string
  unit: string
  price: number
  stock: number
  sold: number
  status: "active" | "out_of_stock"
  description: string
  location: string
  createdAt: string
}

const productsFile = path.join(process.cwd(), "data", "products.json")

async function ensureProductsFile() {
  try {
    await fs.access(productsFile)
  } catch {
    await fs.mkdir(path.dirname(productsFile), { recursive: true })
    await fs.writeFile(productsFile, JSON.stringify([], null, 2), "utf8")
  }
}

export async function readProducts(): Promise<ProductRecord[]> {
  await ensureProductsFile()
  const raw = await fs.readFile(productsFile, "utf8")
  try {
    return JSON.parse(raw) as ProductRecord[]
  } catch {
    return []
  }
}

export async function writeProducts(products: ProductRecord[]) {
  await ensureProductsFile()
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2), "utf8")
}

export async function getProductsByOwner(ownerEmail: string) {
  const products = await readProducts()
  return products.filter((product) => product.ownerEmail.toLowerCase() === ownerEmail.toLowerCase())
}

export async function getAllProducts() {
  const products = await readProducts()
  return products
}

export async function addProduct(product: ProductRecord) {
  const products = await readProducts()
  products.push(product)
  await writeProducts(products)
  return product
}
