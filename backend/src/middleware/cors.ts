import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { CORS_ORIGIN } from '../lib/config'

const isDev = process.env.NODE_ENV !== 'production'

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || isDev) return callback(null, true)
    const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(',').map(o => o.trim()) : []
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true)
    }
    return callback(null, true)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
})
