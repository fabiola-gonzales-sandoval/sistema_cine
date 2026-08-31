import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `
      SELECT 
        c.id_compra,
        cl.nombre AS cliente_nombre,
        cl.apellido AS cliente_apellido,
        e.nombre AS empleado,
        p.titulo AS pelicula,
        s.numero_sala,
        c.fecha_venta,
        c.total_venta
      FROM compra c
      JOIN empleado e ON c.id_empleado = e.id_empleado
      LEFT JOIN cliente cl ON c.id_cliente = cl.id_cliente
      LEFT JOIN entrada en ON c.id_entrada = en.id_entrada
      LEFT JOIN funcion f ON en.id_funcion = f.id_funcion
      LEFT JOIN pelicula p ON f.id_pelicula = p.id_pelicula
      LEFT JOIN sala s ON f.id_sala = s.id_sala
      ORDER BY c.id_compra DESC
      LIMIT 5;
    `;
    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}