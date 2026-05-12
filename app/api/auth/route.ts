import { NextResponse } from "next/server"
import { findUserByCredential } from "@/lib/user-store"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 })
  }

  const { loginMethod, credential, password } = body as {
    loginMethod?: "email" | "phone"
    credential?: string
    password?: string
  }

  if (!loginMethod || !credential || !password) {
    return NextResponse.json({ error: "Please provide login method, credential, and password." }, { status: 400 })
  }

  const match = await findUserByCredential(loginMethod, credential, password)

  if (!match) {
    return NextResponse.json({ error: "Invalid login credentials." }, { status: 401 })
  }

  const user = {
    name: match.name,
    email: match.email,
    phone: match.phone,
  }

  return NextResponse.json({
    success: true,
    token: "demo-auth-token",
    user,
  })
}
