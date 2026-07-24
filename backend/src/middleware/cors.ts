import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { CORS_ORIGIN } from '../lib/config'

export const corsMiddleware = cors({
  origin: CORS_ORIGIN.split(',').map((o) => o.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
