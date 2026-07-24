import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { CORS_ORIGIN } from '../lib/config'

const isDev = process.env.NODE_ENV !== 'production'

export const corsMiddleware = cors({
  origin: isDev ? true : (CORS_ORIGIN ? CORS_ORIGIN.split(',').map(o => o.trim()) : false),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
})
