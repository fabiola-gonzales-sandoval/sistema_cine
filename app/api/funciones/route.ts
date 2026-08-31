import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `
      SELECT 
        f.id_funcion AS id,
        p.titulo AS pelicula,
        s.numero_sala,
        f.fecha,
        f.hora_inicio,
        f.precio_base
      FROM funcion f
      JOIN pelicula p ON f.id_pelicula = p.id_pelicula
      JOIN sala s ON f.id_sala = s.id_sala
      ORDER BY f.fecha, f.hora_inicio;
    `;
    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id_pelicula, id_sala, fecha, hora_inicio, precio_base } = await request.json();
    const result = await pool.query(
      'INSERT INTO funcion (id_pelicula, id_sala, fecha, hora_inicio, precio_base) VALUES ($1, $2, $3, $4, $5) RETURNING id_funcion;',
      [id_pelicula, id_sala, fecha, hora_inicio, precio_base]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
