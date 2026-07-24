import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const JWT_SECRET = process.env.JWT_SECRET!
export const JWT_EXPIRES_IN = '7d'
const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL

const cookieSecure = process.env.COOKIE_SECURE === 'true' ? true : (process.env.COOKIE_SECURE === 'false' ? false : isProd)
const cookieSameSite = (process.env.COOKIE_SAMESITE as 'lax' | 'none' | 'strict') || (isProd ? 'none' : 'lax')

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: cookieSecure,
  sameSite: cookieSameSite,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export interface JwtPayload {
  adminId: string
  email: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}
