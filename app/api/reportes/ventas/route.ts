import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resumen = await pool.query(`
      SELECT 
        COALESCE(SUM(total_venta), 0) AS recaudacion_total,
        COUNT(*) AS total_transacciones
      FROM compra;
    `);

    const metodoPago = await pool.query(`
      SELECT metodo_pago, COUNT(*) AS cantidad
      FROM compra
      GROUP BY metodo_pago
      ORDER BY cantidad DESC;
    `);

    const porDia = await pool.query(`
      SELECT 
        fecha_venta,
        COUNT(*) AS transacciones,
        STRING_AGG(DISTINCT metodo_pago, ', ') AS metodos,
        SUM(total_venta) AS total
      FROM compra
      GROUP BY fecha_venta
      ORDER BY fecha_venta DESC;
    `);

    return NextResponse.json({
      recaudacion_total: Number(resumen.rows[0].recaudacion_total),
      total_transacciones: Number(resumen.rows[0].total_transacciones),
      metodo_pago: metodoPago.rows,
      por_dia: porDia.rows,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}