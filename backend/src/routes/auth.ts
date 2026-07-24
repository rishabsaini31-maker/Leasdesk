import { Router, Response } from 'express'
import { db } from '../lib/db'
import { loginSchema } from '../lib/validation'
import { verifyPassword, signToken, COOKIE_OPTIONS } from '../lib/auth'
import { AuthRequest } from '../middleware/auth'

export const authRouter = Router()

authRouter.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      })
    }

    const admin = await db.admin.findUnique({ where: { email: parsed.data.email } })
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isValid = await verifyPassword(parsed.data.password, admin.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = signToken({ adminId: admin.id, email: admin.email })

    const response = res.status(200).json({
      message: 'Login successful',
      admin: { id: admin.id, email: admin.email },
    })

    response.cookie('auth_token', token, COOKIE_OPTIONS)
    return response
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

authRouter.post('/me', (_req: AuthRequest, res: Response) => {
  return res.status(200).json({ admin: _req.admin })
})

authRouter.post('/logout', (_req: AuthRequest, res: Response) => {
  res.clearCookie('auth_token', { path: '/' })
  return res.status(200).json({ message: 'Logged out successfully' })
})

authRouter.get('/me', async (req: AuthRequest, res: Response) => {
  // This is handled by authMiddleware - admin info is in req.admin
  const admin = await db.admin.findUnique({
    where: { id: req.admin!.adminId },
    select: { id: true, email: true, createdAt: true },
  })
  if (!admin) {
    return res.status(404).json({ error: 'Admin not found' })
  }
  return res.status(200).json({ admin })
})
