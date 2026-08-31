import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { usuario, contrasena } = await request.json();

    const result = await pool.query(
      'SELECT id_empleado, nombre, cargo FROM empleado WHERE usuario=$1 AND contrasena=$2;',
      [usuario, contrasena]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
    }

    const empleado = result.rows[0];

    const cookieStore = await cookies();
    cookieStore.set('sesion', JSON.stringify(empleado), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 8, // 8 horas
    });

    return NextResponse.json(empleado);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}