import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leadStatusSchema } from '@/lib/validation';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = leadStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const updated = await db.lead.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ message: 'Status updated', lead: updated });
  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
