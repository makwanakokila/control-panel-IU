import { jwtVerify, SignJWT } from "jose"

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_jwt_secret_key_for_development_only")

export interface UserJwtPayload {
  id: string
  email: string
  role: string
  iat: number
  exp: number
}

/**
 * Create a JWT token for a user
 */
export async function createToken(payload: Omit<UserJwtPayload, "iat" | "exp">) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

/**
 * Verify a JWT token and return the payload
 */
export async function verifyToken(token: string): Promise<UserJwtPayload> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as UserJwtPayload
  } catch (error) {
    throw new Error("Invalid token")
  }
}

/**
 * Check if user is authenticated by verifying the token in cookies or localStorage
 */
export async function isAuthenticated() {
  try {
    // For client-side authentication
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      if (!token) return false

      // In a real app, you would verify the token here
      // For now, just check if it exists
      return true
    }

    // For server-side authentication (not implemented in this example)
    return false
  } catch (error) {
    return false
  }
}
