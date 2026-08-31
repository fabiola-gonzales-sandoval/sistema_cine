import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

// Obtener todos los productos
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM producto ORDER BY id_producto;');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Crear un nuevo producto
export async function POST(request: Request) {
  try {
    const { nombre_producto, categoria, precio, stock } = await request.json();
    const result = await pool.query(
      'INSERT INTO producto (nombre_producto, categoria, precio, stock) VALUES ($1, $2, $3, $4) RETURNING id_producto;',
      [nombre_producto, categoria, precio, stock]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}