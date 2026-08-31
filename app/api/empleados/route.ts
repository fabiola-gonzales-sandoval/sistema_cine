import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id_empleado, nombre, cargo, usuario FROM empleado ORDER BY id_empleado;'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nombre, cargo, usuario, contrasena } = await request.json();
    const result = await pool.query(
      'INSERT INTO empleado (nombre, cargo, usuario, contrasena) VALUES ($1, $2, $3, $4) RETURNING id_empleado;',
      [nombre, cargo, usuario, contrasena]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}