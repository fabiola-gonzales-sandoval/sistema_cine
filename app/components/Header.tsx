"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, UserCircle, LogOut, ChevronDown } from "lucide-react";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    return false;
  };

  const handleLogout = () => {
    // Aquí puedes agregar tu lógica de cierre de sesión (limpiar tokens, cookies, etc.)
    window.location.href = "/"; // Redirige al login o inicio
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d24]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo y Nombre */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo2.png"
              alt="Logo Cinemanía"
              className="h-9 w-auto object-contain"
            />
            <span className="font-bold text-yellow-400 tracking-wider text-xs sm:text-sm">CINEMANÍA</span>
          </Link>

          {/* Enlaces de navegación */}
          <nav className="hidden lg:flex items-center gap-2 text-sm text-gray-300 font-medium">
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

          {/* Buscador y Perfil Interactivo */}
          <div className="flex items-center gap-3">
            <label className="hidden xl:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-52 focus-within:border-yellow-400/60 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar..."
                className="bg-transparent outline-none text-sm placeholder:text-slate-500 w-full text-slate-200"
              />
            </label>

            {/* **Menú Desplegable de Usuario** */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <UserCircle className="w-6 h-6 text-yellow-400" />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight">Admin Cine</p>
                  <p className="text-[10px] text-yellow-400/80 leading-tight">Gerencia</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Ventana Flotante / Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0b1739] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-white/5 sm:hidden">
                    <p className="text-xs font-semibold text-white">Admin Cine</p>
                    <p className="text-[10px] text-yellow-400">Gerencia</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-200 cursor-pointer"
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