import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { nombre_producto, categoria, precio, stock } = await request.json();
    await pool.query(
      'UPDATE producto SET nombre_producto=$1, categoria=$2, precio=$3, stock=$4 WHERE id_producto=$5;',
      [nombre_producto, categoria, precio, stock, id]
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
    await pool.query('DELETE FROM producto WHERE id_producto=$1;', [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}