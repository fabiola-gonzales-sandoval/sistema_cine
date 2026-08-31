import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

// Actualizar cliente
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { nombre, apellido, telefono, correo } = await request.json();
    await pool.query(
      'UPDATE cliente SET nombre=$1, apellido=$2, telefono=$3, correo=$4 WHERE id_cliente=$5;',
      [nombre, apellido, telefono, correo, id]
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Eliminar cliente
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM cliente WHERE id_cliente=$1;', [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}