import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const funciones = await pool.query(`
      SELECT 
        f.id_funcion,
        p.titulo AS pelicula,
        s.numero_sala,
        s.tipo_sala,
        f.fecha,
        f.hora_inicio,
        f.precio_base,
        (SELECT COUNT(*) FROM asiento a WHERE a.id_sala = s.id_sala) AS capacidad_total,
        (SELECT COUNT(*) FROM entrada e WHERE e.id_funcion = f.id_funcion) AS asientos_ocupados
      FROM funcion f
      JOIN pelicula p ON f.id_pelicula = p.id_pelicula
      JOIN sala s ON f.id_sala = s.id_sala
      ORDER BY f.fecha, f.hora_inicio;
    `);

    const totalFunciones = await pool.query('SELECT COUNT(*) FROM funcion;');
    const totalSalas = await pool.query('SELECT COUNT(*) FROM sala;');

    return NextResponse.json({
      funciones: funciones.rows,
      total_funciones: Number(totalFunciones.rows[0].count),
      total_salas: Number(totalSalas.rows[0].count),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}