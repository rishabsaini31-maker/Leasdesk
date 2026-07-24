import { Router, Response } from 'express'
import { db } from '../lib/db'
import { loginSchema } from '../lib/validation'
import { verifyPassword, signToken, COOKIE_OPTIONS } from '../lib/auth'
import { AuthRequest } from '../middleware/auth'

const router = Router()

router.post('/login', async (req: AuthRequest, res: Response) => {
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

    res.cookie('auth_token', token, COOKIE_OPTIONS)
    return res.status(200).json({
      message: 'Login successful',
      admin: { id: admin.id, email: admin.email },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/logout', (_req: AuthRequest, res: Response) => {
  res.clearCookie('auth_token', COOKIE_OPTIONS)
  return res.status(200).json({ message: 'Logged out successfully' })
})

export { router as authRouter }

