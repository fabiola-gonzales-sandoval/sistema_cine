import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = `
      SELECT a.id_asiento, a.fila, a.numero_asiento, a.tipo_asiento
      FROM asiento a
      JOIN sala s ON a.id_sala = s.id_sala
      JOIN funcion f ON f.id_sala = s.id_sala
      WHERE f.id_funcion = $1
      AND NOT EXISTS (
        SELECT 1 FROM entrada e 
        WHERE e.id_asiento = a.id_asiento 
        AND e.id_funcion = f.id_funcion
      )
      ORDER BY a.fila, a.numero_asiento;
    `;
    const result = await pool.query(query, [id]);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}