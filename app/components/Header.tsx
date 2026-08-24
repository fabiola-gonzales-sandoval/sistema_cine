"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMagnifyingGlass,
  faGear,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full absolute inset-x-0 top-0 z-50">
      {/* 1. Barra superior amarilla */}
      <div className="bg-yellow-400 text-black px-6 py-1.5 flex justify-between items-center text-xs font-semibold">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faStar} />
          <span>SISTEMA DE ADMINISTRACIÓN CINEMATOGRÁFICA</span>
        </div>
        <div>
          <span>Bienvenido <strong>Valeria Quiroga</strong> (Administrador)</span>
        </div>
      </div>

      {/* 2. Barra de navegación principal (la estructura original del docente) */}
      <div className="w-full bg-[#020b1e] text-white px-6 py-3 flex justify-between items-center">
        {/* Bloque Izquierdo: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo Cinemania"
            className="h-9 w-auto object-contain"
          />
          <span className="font-bold text-yellow-400 tracking-wider text-xs">CINEMANIA</span>
        </div>

        {/* Bloque Centro: Enlaces originales adaptados */}
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link href="/dashboard" className="bg-[#0b1739] text-yellow-400 px-3 py-1 rounded font-semibold">Inicio</Link>
          <Link href="/dashboard/projects" className="hover:text-white">Películas</Link>
          <Link href="/dashboard/tasks" className="hover:text-white">Productos</Link>
          <Link href="/dashboard" className="hover:text-white">Funciones</Link>
          <Link href="/dashboard" className="hover:text-white">Ventas</Link>
          <Link href="/dashboard/users" className="hover:text-white">Clientes</Link>
          <Link href="/dashboard/users" className="hover:text-white">Empleados</Link>
          <Link href="/dashboard/profile" className="hover:text-white">Reportes</Link>
        </div>

        {/* Bloque Derecho: Buscador y Ajustes */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Buscar película o ticket..."
              className="bg-[#0b1739] text-white text-xs pl-8 pr-3 py-1.5 rounded-full border border-blue-900/60 focus:outline-none"
            />
          </div>
          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            <FontAwesomeIcon icon={faGear} />
          </Link>
        </div>
      </div>
    </header>
  );
}