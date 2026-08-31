"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { User, Film, ShoppingCart, DollarSign, ArrowRight } from "lucide-react";
import { api } from "@/app/lib/api";

interface ResumenDashboard {
  total_clientes: number;
  total_peliculas: number;
  total_ventas: number;
  total_ingresos: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { title: "Clientes Registrados", value: "-", icon: User },
    { title: "Películas en Cartelera", value: "-", icon: Film },
    { title: "Ventas Totales", value: "-", icon: ShoppingCart },
    { title: "Ingresos Totales", value: "-", icon: DollarSign },
  ]);

  const [movies, setMovies] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      api<ResumenDashboard>("/dashboard").catch(() => null),
      api<any[]>("/peliculas").catch(() => []),
      api<any[]>("/ventas/recientes").catch(() => []),
      api<any[]>("/funciones/proximas").catch(() => [])
    ]).then(([resumen, peliculas, ventas, funciones]) => {
      if (!active) return;
      if (resumen) {
        setStats([
          { title: "Clientes Registrados", value: String(resumen.total_clientes), icon: User },
          { title: "Películas en Cartelera", value: String(resumen.total_peliculas), icon: Film },
          { title: "Ventas Totales", value: String(resumen.total_ventas), icon: ShoppingCart },
          { title: "Ingresos Totales", value: `$${Number(resumen.total_ingresos).toFixed(2)}`, icon: DollarSign },
        ]);
      }
      setMovies(peliculas.slice(0, 6));
      setSales(ventas);
      setShows(funciones);
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Sección de Bienvenida */}
        <section>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">¡Bienvenido!</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Aquí tienes un resumen de la actividad del cine y las estadísticas del día.
          </p>
        </section>

        {/* Tarjetas de Estadísticas */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article key={idx} className="card-glow bg-navy-900 border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-400">{item.title}</p>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">{item.value}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-crimson-600/15 text-crimson-500 flex items-center justify-center text-lg">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </article>
            );
          })}
        </section>

        {/* Película Destacada (Hero Banner) */}
        <section className="relative rounded-2xl overflow-hidden border border-white/5 card-glow h-72 sm:h-80 md:h-96">
          <img
            src="/img/banner.jpg"
            alt="Backrooms en Cartelera"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gold-500 text-navy-950 text-xs font-semibold px-2.5 py-1 rounded">
                EN CARTELERA
              </span>
              <span className="bg-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded border border-white/20">
                Solo en cines
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-wide">
              {movies.length > 0 ? movies[0].titulo.toUpperCase() : "CARTELERA"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              {movies.length > 0 ? movies[0].sinopsis : "Descubre el laberinto infinito esta temporada."}
            </p>
            <Link
              href="/dashboard/shows"
              className="mt-6 inline-flex items-center gap-2 bg-crimson-600 hover:bg-crimson-500 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg w-fit cursor-pointer"
            >
              Ver Funciones <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Películas Disponibles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-white">Películas disponibles</h2>
            <Link href="/dashboard/movies" className="text-gold-400 text-sm font-medium hover:underline">
              Ver todos →
            </Link>
          </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {movies.map((movie, idx) => (
              <article key={idx} className="group rounded-xl overflow-hidden border border-white/5 bg-navy-900 card-glow">
                <div className="relative aspect-[2/3] overflow-hidden bg-navy-950 flex items-center justify-center">
                  <img
                    src={`/img/${movie.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}.jpg`}
                    alt={movie.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/img/banner.jpg";
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-white/90 text-navy-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {movie.clasificacion}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-white truncate">{movie.titulo}</h3>
                  <p className="text-xs text-slate-400 truncate">{movie.genero}</p>
                </div>
              </article>
            ))}
            {movies.length === 0 && !loading && (
              <div className="col-span-full py-8 text-center text-slate-500 text-sm border border-white/5 bg-navy-900 rounded-xl">
                No hay películas disponibles en la base de datos
              </div>
            )}
          </div>
        </section>

        {/* Sección Inferior */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="bg-navy-900 border border-white/5 rounded-2xl card-glow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-white">Ventas recientes</h2>
              <Link href="/dashboard/sales" className="bg-crimson-600 hover:bg-crimson-500 transition-colors text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                Ver ventas
              </Link>
            </div>
            <ul className="divide-y divide-white/5">
              {sales.map((sale, idx) => {
                const initial = (sale.cliente_nombre?.[0] || sale.empleado?.[0] || 'C').toUpperCase();
                const title = sale.cliente_nombre ? `${sale.cliente_nombre} ${sale.cliente_apellido || ''}` : 'Cliente Final';
                const subtitle = sale.pelicula ? `${sale.pelicula} · Sala ${sale.numero_sala}` : 'Venta de Dulcería';
                
                return (
                  <li key={idx} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 rounded-full bg-navy-700 text-slate-200 text-sm font-semibold flex items-center justify-center shrink-0">
                        {initial}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{title}</p>
                        <p className="text-xs text-slate-400 truncate">{subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-sm font-semibold text-gold-400">${Number(sale.total_venta).toFixed(2)}</p>
                      <p className="text-xs text-slate-500">{new Date(sale.fecha_venta).toLocaleDateString()}</p>
                    </div>
                  </li>
                );
              })}
              {sales.length === 0 && !loading && (
                <li className="py-8 text-center text-slate-500 text-sm">
                  No hay ventas recientes
                </li>
              )}
            </ul>
          </article>

          <article className="bg-navy-900 border border-white/5 rounded-2xl card-glow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-white">Funciones próximas</h2>
              <Link href="/dashboard/shows" className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg">
                Ver funciones
              </Link>
            </div>
            <ul className="divide-y divide-white/5">
              {shows.map((show, idx) => (
                <li key={idx} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{show.pelicula}</p>
                    <p className="text-xs text-slate-400 truncate">Sala {show.numero_sala} · {show.tipo_sala}</p>
                  </div>
                  <span className="bg-crimson-600 text-white text-xs font-semibold px-2.5 py-1 rounded shrink-0 ml-2">
                    {show.hora_inicio?.slice(0,5) || show.hora_inicio}
                  </span>
                </li>
              ))}
              {shows.length === 0 && !loading && (
                <li className="py-8 text-center text-slate-500 text-sm">
                  No hay funciones próximas
                </li>
              )}
            </ul>
          </article>
        </section>
      </main>

      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 CINERAMA · Sistema de Gestión Cinematográfica</p>
          <p>Diseñado para el control de taquilla, películas, empleados y estadísticas en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}