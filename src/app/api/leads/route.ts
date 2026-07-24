import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leadCreateSchema } from '@/lib/validation';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        budget: parsed.data.budget,
        message: parsed.data.message,
      },
    });

    return NextResponse.json(
      { message: 'Lead submitted successfully', lead: { id: lead.id, name: lead.name, email: lead.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim() || '';

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {};

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Lead fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
