import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM pelicula ORDER BY id_pelicula;');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { titulo, genero, clasificacion, fecha_estreno, sinopsis } = await request.json();
    const result = await pool.query(
      'INSERT INTO pelicula (titulo, genero, clasificacion, fecha_estreno, sinopsis) VALUES ($1, $2, $3, $4, $5) RETURNING id_pelicula;',
      [titulo, genero, clasificacion, fecha_estreno, sinopsis]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}