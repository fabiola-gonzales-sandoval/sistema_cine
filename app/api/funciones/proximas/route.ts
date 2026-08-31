import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `
      SELECT 
        f.id_funcion,
        p.titulo AS pelicula,
        s.numero_sala,
        s.tipo_sala,
        f.fecha,
        f.hora_inicio
      FROM funcion f
      JOIN pelicula p ON f.id_pelicula = p.id_pelicula
      JOIN sala s ON f.id_sala = s.id_sala
      ORDER BY f.fecha DESC, f.hora_inicio
      LIMIT 5;
    `;
    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}