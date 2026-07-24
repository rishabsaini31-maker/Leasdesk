import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { CORS_ORIGIN } from '../lib/config'

function getOrigin(origin: string | undefined): string | boolean | (string | RegExp)[] {
  const isDev = process.env.NODE_ENV !== 'production'
  
  if (CORS_ORIGIN) {
    const origins = CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
    if (origins.length > 0) return origins
  }
  
  if (isDev) return true
  
  return false
}

export const corsMiddleware = cors({
  origin: getOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
})
