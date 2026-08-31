import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientes = await pool.query(`
      SELECT 
        c.nombre,
        c.apellido,
        c.telefono,
        c.correo,
        COUNT(co.id_compra) AS total_compras,
        COALESCE(SUM(co.total_venta), 0) AS monto_total
      FROM cliente c
      LEFT JOIN compra co ON c.id_cliente = co.id_cliente
      GROUP BY c.id_cliente, c.nombre, c.apellido, c.telefono, c.correo
      ORDER BY monto_total DESC;
    `);

    const totalClientes = await pool.query('SELECT COUNT(*) FROM cliente;');

    return NextResponse.json({
      clientes: clientes.rows,
      total_clientes: Number(totalClientes.rows[0].count),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}