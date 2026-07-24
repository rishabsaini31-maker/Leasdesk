import { Router, Response } from 'express'
import { db } from '../lib/db'
import { leadCreateSchema, leadStatusSchema } from '../lib/validation'
import { AuthRequest } from '../middleware/auth'

export const leadsRouter = Router()

leadsRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const search = (req.query.search as string)?.trim() || ''

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {}

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json({ leads })
  } catch (error) {
    console.error('Lead fetch error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

leadsRouter.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const parsed = leadCreateSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      })
    }

    const lead = await db.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        budget: parsed.data.budget,
        message: parsed.data.message,
      },
    })

    return res.status(201).json({
      message: 'Lead submitted successfully',
      lead: { id: lead.id, name: lead.name, email: lead.email },
    })
  } catch (error) {
    console.error('Lead creation error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

leadsRouter.patch('/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const parsed = leadStatusSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      })
    }

    const lead = await db.lead.findUnique({ where: { id } })
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    const updated = await db.lead.update({
      where: { id },
      data: { status: parsed.data.status },
    })

    return res.status(200).json({ message: 'Status updated', lead: updated })
  } catch (error) {
    console.error('Status update error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
