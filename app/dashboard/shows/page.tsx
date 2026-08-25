"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import { Search, Plus, RotateCw, Pencil, Trash2, Info, X, Film } from "lucide-react";

interface Funcion {
  id: number;
  pelicula: string;
  sala: string;
  fecha: string;
  hora: string;
  precio: string;
}

export default function FuncionesPage() {
  const [busqueda, setBusqueda] = useState("");
  const [funciones, setFunciones] = useState<Funcion[]>([
    { id: 1, pelicula: "Backrooms", sala: "Sala 1", fecha: "2026-06-10", hora: "18:00:00", precio: "$50.00" },
    { id: 2, pelicula: "Backrooms", sala: "Sala 2", fecha: "2026-06-10", hora: "20:30:00", precio: "$55.00" },
    { id: 3, pelicula: "Michael", sala: "Sala 1", fecha: "2026-06-11", hora: "17:00:00", precio: "$45.00" },
    { id: 4, pelicula: "Michael", sala: "Sala 2", fecha: "2026-06-11", hora: "19:30:00", precio: "$50.00" },
    { id: 5, pelicula: "Star Wars", sala: "Sala 3", fecha: "2026-06-12", hora: "18:00:00", precio: "$60.00" },
    { id: 7, pelicula: "Toy Story 5", sala: "Sala 2", fecha: "2026-06-13", hora: "16:00:00", precio: "$45.00" },
    { id: 6, pelicula: "Scary Movie", sala: "Sala 1", fecha: "2026-06-10", hora: "21:00:00", precio: "$40.00" },
    { id: 8, pelicula: "El Día de la Revelación", sala: "Sala 3", fecha: "2026-06-13", hora: "20:00:00", precio: "$50.00" },
    { id: 9, pelicula: "Supergirl", sala: "Sala 1", fecha: "2026-06-14", hora: "19:00:00", precio: "$50.00" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [funcionEditar, setFuncionEditar] = useState<Funcion | null>(null);
  const [form, setForm] = useState({
    pelicula: "Backrooms",
    sala: "Sala 1",
    fecha: "2026-06-10",
    hora: "18:00:00",
    precio: "50.00",
  });

  const funcionesFiltradas = funciones.filter((f) => {
    const q = busqueda.toLowerCase();
    return (
      f.pelicula.toLowerCase().includes(q) ||
      f.sala.toLowerCase().includes(q) ||
      f.fecha.toLowerCase().includes(q)
    );
  });

  const abrirModalNuevo = () => {
    setFuncionEditar(null);
    setForm({
      pelicula: "Backrooms",
      sala: "Sala 1",
      fecha: new Date().toISOString().split("T")[0],
      hora: "18:00:00",
      precio: "50.00",
    });
    setModalOpen(true);
  };

  const abrirModalEditar = (funcion: Funcion) => {
    setFuncionEditar(funcion);
    setForm({
      pelicula: funcion.pelicula,
      sala: funcion.sala,
      fecha: funcion.fecha,
      hora: funcion.hora,
      precio: funcion.precio.replace("$", ""),
    });
    setModalOpen(true);
  };

  const guardarFuncion = (e: React.FormEvent) => {
    e.preventDefault();
    const precioFormat = `$${parseFloat(form.precio || "0").toFixed(2)}`;
    if (funcionEditar) {
      setFunciones(
        funciones.map((f) =>
          f.id === funcionEditar.id ? { ...f, ...form, precio: precioFormat } : f
        )
      );
    } else {
      const nuevoId =
        funciones.length > 0 ? Math.max(...funciones.map((f) => f.id)) + 1 : 1;
      setFunciones([...funciones, { id: nuevoId, ...form, precio: precioFormat }]);
    }
    setModalOpen(false);
  };

  const eliminarFuncion = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta función?")) {
      setFunciones(funciones.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans flex flex-col">
      <Header />

      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1">
        {/* Encabezado */}
        <section>
          <div className="flex items-center gap-2">
            <Film className="w-7 h-7 text-gold-400" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-400">
              FUNCIONES DISPONIBLES
            </h1>
          </div>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Registro, actualiza y controla la información de las funciones y horarios del cine.
          </p>
        </section>

        {/* Botones de acción */}
        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={abrirModalNuevo}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" /> NUEVA FUNCIÓN
          </button>
          <button
            type="button"
            onClick={() => setBusqueda("")}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 transition-colors border border-gold-500 text-gold-400 text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer"
          >
            <RotateCw className="w-4 h-4" /> ACTUALIZAR
          </button>
        </section>

        {/* Barra de búsqueda + info */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr,1.4fr] gap-4">
          <div className="flex items-center gap-2 bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por pelicula, sala, fecha....."
              className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 flex-1"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              className="bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
            >
              BUSCAR
            </button>
          </div>

          <div className="flex items-center gap-2 bg-navy-900/60 border border-white/5 rounded-lg px-3 py-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-gold-400 shrink-0" />
            La búsqueda se realiza por película, sala, fecha.
          </div>
        </section>

        {/* Tabla de funciones */}
        <section className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden card-glow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gold-500 text-navy-950 text-xs font-bold uppercase">
                  <th className="text-left px-4 py-3.5">ID</th>
                  <th className="text-left px-4 py-3.5">PELÍCULA</th>
                  <th className="text-left px-4 py-3.5">SALA</th>
                  <th className="text-left px-4 py-3.5">FECHA</th>
                  <th className="text-left px-4 py-3.5">HORA</th>
                  <th className="text-left px-4 py-3.5">PRECIO</th>
                  <th className="text-right px-4 py-3.5">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {funcionesFiltradas.map((f) => (
                  <tr key={f.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-gold-400 font-semibold">{f.id}</td>
                    <td className="px-4 py-3 text-white font-medium">{f.pelicula}</td>
                    <td className="px-4 py-3 text-slate-300">{f.sala}</td>
                    <td className="px-4 py-3 text-slate-300">{f.fecha}</td>
                    <td className="px-4 py-3 text-slate-300">{f.hora}</td>
                    <td className="px-4 py-3 text-gold-400 font-semibold">{f.precio}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(f)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarFuncion(f.id)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-crimson-600 hover:bg-crimson-500 transition-colors text-white cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {funcionesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No se encontraron funciones disponibles que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal Crear / Editar Función */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-gold-400">
                {funcionEditar ? "Editar Función" : "Nueva Función"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={guardarFuncion} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Película</label>
                <input
                  type="text"
                  required
                  value={form.pelicula}
                  onChange={(e) => setForm({ ...form, pelicula: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Sala</label>
                <select
                  value={form.sala}
                  onChange={(e) => setForm({ ...form, sala: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value="Sala 1">Sala 1 (2D)</option>
                  <option value="Sala 2">Sala 2 (3D)</option>
                  <option value="Sala 3">Sala 3 (IMAX)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Hora de Inicio</label>
                <input
                  type="time"
                  required
                  value={form.hora.substring(0, 5)}
                  onChange={(e) => setForm({ ...form, hora: `${e.target.value}:00` })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Precio ($)</label>
                <input
                  type="number"
                  step="0.50"
                  required
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-semibold text-slate-400 hover:bg-white/5 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950 cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 CINEMANIA · Sistema de Gestión Cinematográfica</p>
          <p>Control de funciones y proyecciones en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}
