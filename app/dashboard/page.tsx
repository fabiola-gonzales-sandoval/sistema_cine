"use client";

import Header from "../components/Header";
import Link from "next/link";
import { User, Film, ShoppingCart, DollarSign, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Clientes Registrados", value: "8", icon: User },
    { title: "Películas en Cartelera", value: "7", icon: Film },
    { title: "Ventas Totales", value: "6", icon: ShoppingCart },
    { title: "Ingresos Totales", value: "$430.00", icon: DollarSign },
  ];

  const movies = [
    {
      title: "Backrooms",
      genre: "Terror / Suspenso",
      rating: "14A",
      duration: "112 min",
      image: "/img/backrooms.jpg",
    },
    {
      title: "Michael",
      genre: "Drama / Biografía",
      rating: "ATP",
      duration: "128 min",
      image: "/img/michael.jpg",
    },
    {
      title: "Toy Story 5",
      genre: "Animación / Familiar",
      rating: "ATP",
      duration: "96 min",
      image: "/img/toystory5.jpg",
    },
    {
      title: "Scary Movie",
      genre: "Comedia / Parodia",
      rating: "14A",
      duration: "102 min",
      image: "/img/scarymovie.jpg",
    },
    {
      title: "Supergirl",
      genre: "Acción / Ciencia Ficción",
      rating: "TBC",
      duration: "120 min",
      image: "/img/supergirl.jpg",
    },
    {
      title: "El Día de la Revelación",
      genre: "Misterio / Drama",
      rating: "TBC",
      duration: "140 min",
      image: "/img/revelacion.jpg",
    },
  ];

  const sales = [
    { initial: "C", name: "Carlos Mendoza", details: "Backrooms · Butacas H5, H6", price: "$14.00", time: "Hace 10 min" },
    { initial: "S", name: "Sofía Benítez", details: "Supergirl · Butacas F12", price: "$7.00", time: "Hace 25 min" },
    { initial: "M", name: "Mateo Gómez", details: "Toy Story 5 · Butacas A2, A4, A6", price: "$21.00", time: "Hace 1 hora" },
    { initial: "L", name: "Lucía Flores", details: "Michael · Butacas G1, G2", price: "$14.00", time: "Hace 2 horas" },
  ];

  const shows = [
    { movie: "Backrooms", details: "Sala 1 · 3D · Subtitulada", time: "15:30" },
    { movie: "Toy Story 5", details: "Sala 3 · 2D · Doblada", time: "16:00" },
    { movie: "El Día de la Revelación", details: "Sala 2 · 2D · Subtitulada", time: "16:45" },
    { movie: "Michael", details: "Sala 1 · 3D · Doblada", time: "17:15" },
  ];

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
              BACKROOMS
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Nadie sabe cómo llegaron, pero todos saben que no hay salida. Descubre el laberinto infinito esta temporada.
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
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-white/90 text-navy-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {movie.rating}
                  </span>
                  <span className="absolute top-2 right-2 bg-navy-950/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                    {movie.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-white truncate">{movie.title}</h3>
                  <p className="text-xs text-slate-400 truncate">{movie.genre}</p>
                </div>
              </article>
            ))}
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
              {sales.map((sale, idx) => (
                <li key={idx} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-full bg-navy-700 text-slate-200 text-sm font-semibold flex items-center justify-center shrink-0">
                      {sale.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{sale.name}</p>
                      <p className="text-xs text-slate-400 truncate">{sale.details}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-sm font-semibold text-gold-400">{sale.price}</p>
                    <p className="text-xs text-slate-500">{sale.time}</p>
                  </div>
                </li>
              ))}
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
                    <p className="text-sm font-medium text-white truncate">{show.movie}</p>
                    <p className="text-xs text-slate-400 truncate">{show.details}</p>
                  </div>
                  <span className="bg-crimson-600 text-white text-xs font-semibold px-2.5 py-1 rounded shrink-0 ml-2">
                    {show.time}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-500 space-y-1">
          <p>© 2025 CINERAMA · Sistema de Gestión Cinematográfica</p>
          <p>Diseñado para el control de taquilla, películas, empleados y estadísticas en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}