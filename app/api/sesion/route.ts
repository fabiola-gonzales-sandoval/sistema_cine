import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const sesion = cookieStore.get('sesion');

  if (!sesion) {
    return NextResponse.json({ error: 'No hay sesión' }, { status: 401 });
  }

  const empleado = JSON.parse(sesion.value);
  return NextResponse.json(empleado);
}