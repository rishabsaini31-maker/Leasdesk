import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PORT, CORS_ORIGIN } from './lib/config'
import { authRouter } from './routes/auth'
import { leadsRouter } from './routes/leads'
import { authMiddleware } from './middleware/auth'
import { publicLeadLimiter } from './middleware/rateLimit'
import { corsMiddleware } from './middleware/cors'

const app = express()

app.use(corsMiddleware)
app.use(express.json())

// Public routes
app.use('/api/auth/login', authRouter)
app.post('/api/auth/logout', authRouter)

// Public rate-limited lead creation (must come before protected leads routes)
app.post('/api/leads', publicLeadLimiter, leadsRouter)

// Protected routes (require auth)
app.use('/api/auth/me', authMiddleware, authRouter)
app.get('/api/leads', authMiddleware, leadsRouter)
app.patch('/api/leads/:id/status', authMiddleware, leadsRouter)

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'leaddesk-backend' })
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
