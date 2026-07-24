import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../lib/auth'

export interface AuthRequest extends Request {
  admin?: { adminId: string; email: string }
}

function getToken(req: Request): string | undefined {
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  const cookieHeader = req.headers.cookie
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim().split('='))
    const authCookie = cookies.find(([name]) => name === 'auth_token')
    if (authCookie?.[1]) {
      return authCookie[1]
    }
  }

  return undefined
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = getToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }

  const payload = verifyToken(token)
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  req.admin = payload
  next()
}
