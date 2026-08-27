"use client";

import Header from "@/app/components/Header";
import { Plus, RotateCw, Pencil, Trash2 } from "lucide-react";

export default function VentasPage() {
  const ventas = [
    { id: 9, cliente: "Jose", empleado: "Lucia Fernandez", pelicula: "Supergirl", fecha: "2026-06-30", total: "$57.00", metodo: "Tarjeta" },
    { id: 8, cliente: "Daniel", empleado: "Diego Castro", pelicula: "Star Wars: The Mandalorian and Grogu", fecha: "2026-06-29", total: "$135.00", metodo: "Qr" },
    { id: 7, cliente: "Carla", empleado: "Pedro Vargas", pelicula: "Backrooms", fecha: "2026-06-29", total: "$200.00", metodo: "Qr" },
    { id: 6, cliente: "Luis", empleado: "Pedro Vargas", pelicula: "Backrooms", fecha: "2026-06-29", total: "$180.00", metodo: "Efectivo" },
    { id: 5, cliente: "Maria", empleado: "Pedro Vargas", pelicula: "El Día de la Revelación", fecha: "2026-06-13", total: "$95.00", metodo: "Tarjeta" },
    { id: 4, cliente: "Luis", empleado: "Lucia Fernandez", pelicula: "Scary Movie", fecha: "2026-06-12", total: "$40.00", metodo: "Efectivo" },
    { id: 3, cliente: "Jose", empleado: "Lucia Fernandez", pelicula: "Star Wars: The Mandalorian and Grogu", fecha: "2026-06-11", total: "$90.00", metodo: "Qr" },
    { id: 2, cliente: "Maria", empleado: "Pedro Vargas", pelicula: "Backrooms", fecha: "2026-06-10", total: "$55.00", metodo: "Tarjeta" },
    { id: 1, cliente: "Luis", empleado: "Pedro Vargas", pelicula: "Backrooms", fecha: "2026-06-10", total: "$90.00", metodo: "Efectivo" },
  ];

  const metodoBadge = (metodo: string) => {
    const styles: Record<string, string> = {
      Tarjeta: "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30",
      Qr: "bg-orange-600/20 text-orange-400 border border-orange-600/30",
      Efectivo: "bg-sky-600/20 text-sky-400 border border-sky-600/30",
    };
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded ${styles[metodo] ?? "bg-white/10 text-slate-300"}`}>
        {metodo}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Encabezado */}
        <section>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-400">
            GESTIÓN DE VENTAS
          </h1>
        </section>

        {/* Botones de acción */}
        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <Plus className="w-4 h-4" /> NUEVO VENTA
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 transition-colors border border-gold-500 text-gold-400 text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <RotateCw className="w-4 h-4" /> ACTUALIZAR
          </button>
        </section>

        {/* Tabla de ventas */}
        <section className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gold-500 text-navy-950 text-xs font-bold uppercase">
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">Cliente</th>
                  <th className="text-left px-4 py-3">Empleado</th>
                  <th className="text-left px-4 py-3">Película</th>
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Método</th>
                  <th className="text-right px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ventas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-gold-400 font-semibold">{venta.id}</td>
                    <td className="px-4 py-3 text-white">{venta.cliente}</td>
                    <td className="px-4 py-3 text-slate-300">{venta.empleado}</td>
                    <td className="px-4 py-3 text-slate-300">{venta.pelicula}</td>
                    <td className="px-4 py-3 text-slate-400">{venta.fecha}</td>
                    <td className="px-4 py-3 text-gold-400 font-semibold">{venta.total}</td>
                    <td className="px-4 py-3">{metodoBadge(venta.metodo)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded bg-crimson-600 hover:bg-crimson-500 transition-colors text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}