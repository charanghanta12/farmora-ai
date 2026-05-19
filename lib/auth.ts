export type AuthUser = {
  name: string
  email?: string
  phone?: string
  userType?: "farmer" | "buyer"
}

export type AuthData = {
  token: string
  user: AuthUser
}

const STORAGE_KEY = "farmora_auth"

export function getAuth(): AuthData | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthData
  } catch {
    return null
  }
}

export function setAuth(value: AuthData) {
  if (typeof window === "undefined") {
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

export function clearAuth() {
  if (typeof window === "undefined") {
    return
  }
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated() {
  return Boolean(getAuth())
}
