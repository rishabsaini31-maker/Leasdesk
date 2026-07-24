import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'

export const publicLeadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
})
