import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('OK: Connected to Database');

    return NextResponse.json(
      { ok: true, message: 'Connected to DB' },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('DB test error:', err);

    return NextResponse.json(
      { ok: false, error: err.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
