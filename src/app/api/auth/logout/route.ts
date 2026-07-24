import { NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@/lib/auth';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('auth_token', '', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
