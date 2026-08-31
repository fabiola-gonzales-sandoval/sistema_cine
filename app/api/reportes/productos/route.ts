import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const productos = await pool.query(`
      SELECT 
        p.nombre_producto,
        p.categoria,
        p.stock,
        COALESCE(SUM(dc.cantidad), 0) AS unidades_vendidas,
        COALESCE(SUM(dc.cantidad * dc.precio_unitario), 0) AS ingreso_total
      FROM producto p
      LEFT JOIN detallecompra dc ON p.id_producto = dc.id_producto
      GROUP BY p.id_producto, p.nombre_producto, p.categoria, p.stock
      ORDER BY unidades_vendidas DESC;
    `);

    return NextResponse.json({
      productos: productos.rows,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}