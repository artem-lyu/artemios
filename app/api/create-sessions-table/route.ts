import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS Sessions (
        id SERIAL PRIMARY KEY,
        date VARCHAR(255) NOT NULL,
        duration TIME NOT NULL
      );
    `;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
