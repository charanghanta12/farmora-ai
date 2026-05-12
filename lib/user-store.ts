import fs from "fs/promises"
import path from "path"

export type UserRecord = {
  userType: "farmer" | "buyer"
  name: string
  email: string
  phone: string
  location: string
  password: string
}

const usersFile = path.join(process.cwd(), "data", "users.json")

const normalizePhone = (value: string) => value.replace(/[^0-9]/g, "")

async function ensureUsersFile() {
  try {
    await fs.access(usersFile)
  } catch {
    await fs.mkdir(path.dirname(usersFile), { recursive: true })
    await fs.writeFile(usersFile, JSON.stringify([], null, 2), "utf8")
  }
}

export async function readUsers(): Promise<UserRecord[]> {
  await ensureUsersFile()
  const raw = await fs.readFile(usersFile, "utf8")
  try {
    return JSON.parse(raw) as UserRecord[]
  } catch {
    return []
  }
}

export async function writeUsers(users: UserRecord[]) {
  await ensureUsersFile()
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf8")
}

export async function findUserByCredential(loginMethod: "email" | "phone", credential: string, password: string) {
  const users = await readUsers()
  return users.find((user) => {
    if (loginMethod === "email") {
      return user.email.toLowerCase().trim() === credential.toLowerCase().trim() && user.password === password
    }
    return normalizePhone(user.phone) === normalizePhone(credential) && user.password === password
  })
}

export async function findUserByEmailOrPhone(email: string, phone: string) {
  const users = await readUsers()
  const normalizedPhone = normalizePhone(phone)
  return users.find((user) => {
    return (
      user.email.toLowerCase().trim() === email.toLowerCase().trim() ||
      normalizePhone(user.phone) === normalizedPhone
    )
  })
}

export async function addUser(user: UserRecord) {
  const users = await readUsers()
  users.push(user)
  await writeUsers(users)
  return user
}
