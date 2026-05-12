import { NextResponse } from "next/server"
import { addUser, findUserByEmailOrPhone, UserRecord } from "@/lib/user-store"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 })
  }

  const { userType, name, email, phone, location, password } = body as Partial<UserRecord>

  if (!userType || !name || !email || !phone || !location || !password) {
    return NextResponse.json({ error: "All signup fields are required." }, { status: 400 })
  }

  const existingUser = await findUserByEmailOrPhone(email, phone)
  if (existingUser) {
    return NextResponse.json({ error: "A user with that email or phone already exists." }, { status: 409 })
  }

  const newUser: UserRecord = {
    userType,
    name,
    email: email.trim(),
    phone: phone.trim(),
    location: location.trim(),
    password,
  }

  await addUser(newUser)
  return NextResponse.json({ success: true })
}
