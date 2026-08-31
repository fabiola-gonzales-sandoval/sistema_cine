import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const query = `
      SELECT 
        c.id_compra,
        cl.nombre AS cliente_nombre,
        cl.apellido AS cliente_apellido,
        e.nombre AS empleado,
        p.titulo AS pelicula,
        c.fecha_venta,
        c.total_venta,
        c.metodo_pago
      FROM compra c
      JOIN empleado e ON c.id_empleado = e.id_empleado
      LEFT JOIN cliente cl ON c.id_cliente = cl.id_cliente
      LEFT JOIN entrada en ON c.id_entrada = en.id_entrada
      LEFT JOIN funcion f ON en.id_funcion = f.id_funcion
      LEFT JOIN pelicula p ON f.id_pelicula = p.id_pelicula
      ORDER BY c.id_compra DESC;
    `;
    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
export async function POST(request: Request) {
  const client = await pool.connect();
  try {
    const { id_cliente, id_funcion, id_asiento, metodo_pago, precio } = await request.json();

    const cookieStore = await cookies();
    const sesion = cookieStore.get('sesion');
    if (!sesion) {
      return NextResponse.json({ error: 'No hay sesión activa' }, { status: 401 });
    }
    const empleado = JSON.parse(sesion.value);

    await client.query('BEGIN');

    const entradaResult = await client.query(
      'INSERT INTO entrada (id_funcion, id_asiento, precio) VALUES ($1, $2, $3) RETURNING id_entrada;',
      [id_funcion, id_asiento, precio]
    );
    const id_entrada = entradaResult.rows[0].id_entrada;

    await client.query(
      'INSERT INTO compra (metodo_pago, fecha_venta, total_venta, id_cliente, id_empleado, id_entrada) VALUES ($1, CURRENT_DATE, $2, $3, $4, $5);',
      [metodo_pago, precio, id_cliente, empleado.id_empleado, id_entrada]
    );

    await client.query('COMMIT');
    return NextResponse.json({ ok: true });
  } catch (error) {
    await client.query('ROLLBACK');
    return NextResponse.json({ error: String(error) }, { status: 500 });
  } finally {
    client.release();
  }
}