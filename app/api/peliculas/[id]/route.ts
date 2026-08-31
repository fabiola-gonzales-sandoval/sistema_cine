import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { titulo, genero, clasificacion, fecha_estreno, sinopsis } = await request.json();
    await pool.query(
      'UPDATE pelicula SET titulo=$1, genero=$2, clasificacion=$3, fecha_estreno=$4, sinopsis=$5 WHERE id_pelicula=$6;',
      [titulo, genero, clasificacion, fecha_estreno, sinopsis, id]
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
    await pool.query('DELETE FROM pelicula WHERE id_pelicula=$1;', [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}