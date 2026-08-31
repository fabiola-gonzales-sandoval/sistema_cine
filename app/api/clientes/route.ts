import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

// Obtener todos los clientes
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM cliente ORDER BY id_cliente;');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Crear un nuevo cliente
export async function POST(request: Request) {
  try {
    const { nombre, apellido, telefono, correo } = await request.json();
    const result = await pool.query(
      'INSERT INTO cliente (nombre, apellido, telefono, correo) VALUES ($1, $2, $3, $4) RETURNING id_cliente;',
      [nombre, apellido, telefono, correo]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}