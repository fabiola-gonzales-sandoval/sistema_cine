import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const porPelicula = await pool.query(`
      SELECT 
        p.titulo,
        p.genero,
        p.clasificacion,
        COUNT(e.id_entrada) AS entradas_vendidas,
        COALESCE(SUM(c.total_venta), 0) AS ingresos_totales
      FROM pelicula p
      LEFT JOIN funcion f ON p.id_pelicula = f.id_pelicula
      LEFT JOIN entrada e ON f.id_funcion = e.id_funcion
      LEFT JOIN compra c ON c.id_entrada = e.id_entrada
      GROUP BY p.id_pelicula, p.titulo, p.genero, p.clasificacion
      ORDER BY entradas_vendidas DESC;
    `);

    const totalPeliculas = await pool.query('SELECT COUNT(*) FROM pelicula;');

    const generoPopular = await pool.query(`
      SELECT p.genero, COUNT(e.id_entrada) AS total
      FROM pelicula p
      JOIN funcion f ON p.id_pelicula = f.id_pelicula
      JOIN entrada e ON f.id_funcion = e.id_funcion
      GROUP BY p.genero
      ORDER BY total DESC
      LIMIT 1;
    `);

    return NextResponse.json({
      peliculas: porPelicula.rows,
      total_peliculas: Number(totalPeliculas.rows[0].count),
      genero_popular: generoPopular.rows[0] || null,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}