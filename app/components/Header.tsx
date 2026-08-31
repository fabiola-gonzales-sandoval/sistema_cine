"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Star, Search, Settings, Menu } from "lucide-react";
import { tieneAcceso } from "@/app/lib/permisos";

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
  const router = useRouter();
  const [sesion, setSesion] = useState<{ nombre: string; cargo: string } | null>(null);

  useEffect(() => {
    fetch('/api/sesion')
      .then((res) => res.json())
      .then((data) => setSesion(data))
      .catch(() => setSesion(null));
  }, []);

  const navItemsFiltrados = sesion
    ? navItems.filter((item) => tieneAcceso(sesion.cargo, item.href))
    : navItems;

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    if (href === "/dashboard/movies" && (pathname === "/dashboard/peliculas" || pathname === "/dashboard/projects")) return true;
    if (href === "/dashboard/reports" && (pathname === "/dashboard/reportes" || pathname === "/dashboard/profile")) return true;
    return false;
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d24]/95 backdrop-blur border-b border-white/5">
      {/* 2. Barra de navegación principal */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Bloque Izquierdo: Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.png"
              alt="Logo Cinerama"
              className="h-10 w-auto object-contain"
            />
            <span className="font-bold text-yellow-400 tracking-wider text-sm sm:text-base">CINERAMA</span>
          </Link>

          {/* Bloque Centro: Enlaces de navegación */}
          <nav className="hidden lg:flex items-center gap-4 text-base text-gray-300 font-medium">
            {navItemsFiltrados.map((item) => {
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

          {/* Bloque Derecho: Usuario, Buscador y Ajustes */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 pr-2">
              <span className="text-yellow-400 text-sm lg:text-base font-medium">
                Bienvenido, <strong className="text-yellow-300">{sesion?.nombre ?? "Invitado"}</strong>
                {sesion?.cargo ? ` (${sesion.cargo})` : ""}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-1.5 rounded-lg transition-all duration-300 shadow-sm"
              >
                Cerrar sesión
              </button>
            </div>

            <label className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-56 xl:w-72 focus-within:border-yellow-400/60 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar película o ticket…"
                className="bg-transparent outline-none text-sm lg:text-base placeholder:text-slate-500 w-full text-slate-200"
              />
            </label>

            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {mobileNavOpen && (
          <nav className="flex flex-col lg:hidden gap-2 pb-4 text-base text-gray-300 font-medium">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
              <span className="text-yellow-400 text-sm font-medium">
                Bienvenido, <strong className="text-yellow-300">{sesion?.nombre ?? "Invitado"}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-1.5 rounded-lg transition-all duration-300 shadow-sm"
              >
                Cerrar sesión
              </button>
            </div>
            {navItemsFiltrados.map((item) => {
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