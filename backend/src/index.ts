import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PORT, CORS_ORIGIN } from './lib/config'
import { authRouter } from './routes/auth'
import { leadsRouter } from './routes/leads'
import { authMiddleware } from './middleware/auth'
import { corsMiddleware } from './middleware/cors'
import { db } from './lib/db'

const app = express()

app.use(corsMiddleware)
app.use(express.json())

// Request logging
app.use((req, _res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`)
  next()
})

// Error logging
app.use((err: any, _req: any, _res: any, next: any) => {
  console.error('[ERROR]', err)
  next()
})

// Public auth routes
app.use('/api/auth', authRouter)

// Protected: get current admin
app.get('/api/auth/me', authMiddleware, async (req: any, res) => {
  try {
    const admin = await db.admin.findUnique({
      where: { id: req.admin.adminId },
      select: { id: true, email: true, createdAt: true },
    })
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }
    return res.status(200).json({ admin })
  } catch (error) {
    console.error('Me error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Leads routes
app.use('/api/leads', leadsRouter)

app.get('/health', (_req, res) => {
  console.log('[HEALTH] check')
  res.status(200).json({ status: 'ok', service: 'leaddesk-backend' })
})

const server = app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
})
