"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Search, Settings, Menu } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/dashboard" },
  { label: "Películas", href: "/dashboard/movies" },
  { label: "Productos", href: "/dashboard/tasks" },
  { label: "Funciones", href: "/dashboard/shows" },
  { label: "Ventas", href: "/dashboard/sales" },
  { label: "Clientes", href: "/dashboard/users" },
  { label: "Empleados", href: "/dashboard/employees" },
  { label: "Reportes", href: "/dashboard/reports" },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    if (href === "/dashboard/movies" && (pathname === "/dashboard/peliculas" || pathname === "/dashboard/projects")) return true;
    if (href === "/dashboard/reports" && (pathname === "/dashboard/reportes" || pathname === "/dashboard/profile")) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d24]/95 backdrop-blur border-b border-white/5">
      {/* 1. Barra superior amarilla */}
      <div className="bg-yellow-400 text-black px-4 sm:px-6 py-1.5 flex justify-between items-center text-xs font-semibold">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>SISTEMA DE ADMINISTRACIÓN CINEMATOGRÁFICA</span>
        </div>
        <div>
          <span>Bienvenido <strong>Valeria Quiroga</strong> (Administrador)</span>
        </div>
      </div>

      {/* 2. Barra de navegación principal */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Bloque Izquierdo: Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.png"
              alt="Logo Cinerama"
              className="h-9 w-auto object-contain"
            />
            <span className="font-bold text-yellow-400 tracking-wider text-xs sm:text-sm">CINERAMA</span>
          </Link>

          {/* Bloque Centro: Enlaces de navegación */}
          <nav className="hidden lg:flex items-center gap-4 text-sm text-gray-300 font-medium">
            {navItems.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    isActive
                      ? "bg-[#0b1739] text-yellow-400 font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bloque Derecho: Buscador y Ajustes */}
          <div className="flex items-center gap-3">
            <label className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-56 xl:w-72 focus-within:border-yellow-400/60 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar película o ticket…"
                className="bg-transparent outline-none text-sm placeholder:text-slate-500 w-full text-slate-200"
              />
            </label>

            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {mobileNavOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1 text-sm font-medium border-t border-white/5 pt-3">
            {navItems.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-white/10 text-yellow-400 font-semibold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}