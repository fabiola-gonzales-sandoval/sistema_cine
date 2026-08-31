import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { id_pelicula, id_sala, fecha, hora_inicio, precio_base } = await request.json();
    await pool.query(
      'UPDATE funcion SET id_pelicula=$1, id_sala=$2, fecha=$3, hora_inicio=$4, precio_base=$5 WHERE id_funcion=$6;',
      [id_pelicula, id_sala, fecha, hora_inicio, precio_base, id]
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM funcion WHERE id_funcion=$1;', [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}