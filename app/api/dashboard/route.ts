import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientes = await pool.query('SELECT COUNT(*) FROM cliente;');
    const peliculas = await pool.query('SELECT COUNT(*) FROM pelicula;');
    const ventas = await pool.query('SELECT COUNT(*) FROM compra;');
    const ingresos = await pool.query('SELECT COALESCE(SUM(total_venta), 0) FROM compra;');

    return NextResponse.json({
      total_clientes: Number(clientes.rows[0].count),
      total_peliculas: Number(peliculas.rows[0].count),
      total_ventas: Number(ventas.rows[0].count),
      total_ingresos: Number(ingresos.rows[0].coalesce),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}