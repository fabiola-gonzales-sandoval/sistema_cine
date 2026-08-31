"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { Search, Plus, RotateCw, Pencil, Trash2, Info, X, Film } from "lucide-react";
import { api } from "@/app/lib/api";

interface Funcion {
  id: number;
  pelicula: string;
  numero_sala: number;
  fecha: string;
  hora_inicio: string;
  precio_base: number;
}

interface PeliculaOpcion {
  id: number;
  titulo: string;
}

export default function FuncionesPage() {
  const [busqueda, setBusqueda] = useState("");
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [peliculasDisponibles, setPeliculasDisponibles] = useState<PeliculaOpcion[]>([]);

  const cargarFunciones = async () => {
    const data = await api<Funcion[]>("/funciones");
    setFunciones(data);
  };

  useEffect(() => {
    cargarFunciones();
    api<PeliculaOpcion[]>("/peliculas").then(setPeliculasDisponibles);
  }, []);

   const [modalOpen, setModalOpen] = useState(false);
  const [funcionEditar, setFuncionEditar] = useState<Funcion | null>(null);
  const [form, setForm] = useState({
    id_pelicula: 1,
    id_sala: 1,
    fecha: "2026-06-10",
    hora_inicio: "18:00",
    precio_base: "50.00",
  });

  const funcionesFiltradas = funciones.filter((f) => {
    const q = busqueda.toLowerCase();
    return (
      f.pelicula.toLowerCase().includes(q) ||
      String(f.numero_sala).includes(q) ||
      f.fecha.toLowerCase().includes(q)
    );
  });

  const abrirModalNuevo = () => {
    setFuncionEditar(null);
    setForm({
      id_pelicula: peliculasDisponibles[0]?.id || 1,
      id_sala: 1,
      fecha: new Date().toISOString().split("T")[0],
      hora_inicio: "18:00",
      precio_base: "50.00",
    });
    setModalOpen(true);
  };

  const abrirModalEditar = (funcion: Funcion) => {
    setFuncionEditar(funcion);
    const peliculaMatch = peliculasDisponibles.find(p => p.titulo === funcion.pelicula);
    setForm({
      id_pelicula: peliculaMatch?.id || 1,
      id_sala: funcion.numero_sala,
      fecha: funcion.fecha.split("T")[0],
      hora_inicio: funcion.hora_inicio.substring(0, 5),
      precio_base: String(funcion.precio_base),
    });
    setModalOpen(true);
  };

  const guardarFuncion = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      id_pelicula: form.id_pelicula,
      id_sala: form.id_sala,
      fecha: form.fecha,
      hora_inicio: `${form.hora_inicio}:00`,
      precio_base: form.precio_base,
    };
    if (funcionEditar) {
      await api(`/funciones/${funcionEditar.id}`, { method: "PUT", body: JSON.stringify(body) });
    } else {
      await api("/funciones", { method: "POST", body: JSON.stringify(body) });
    }
    setModalOpen(false);
    await cargarFunciones();
  };

  const eliminarFuncion = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta función?")) {
      await api(`/funciones/${id}`, { method: "DELETE" });
      await cargarFunciones();
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
                    <td className="px-4 py-3 text-slate-300">Sala {f.numero_sala}</td>
                    <td className="px-4 py-3 text-slate-300">{new Date(f.fecha).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-slate-300">{f.hora_inicio?.slice(0,5)}</td>
                    <td className="px-4 py-3 text-gold-400 font-semibold">${Number(f.precio_base).toFixed(2)}</td>
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
                <label className="block text-xs text-slate-400 mb-1">Sala</label>
                <select
                  value={form.id_sala}
                  onChange={(e) => setForm({ ...form, id_sala: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value={1}>Sala 1 (2D)</option>
                  <option value={2}>Sala 2 (3D)</option>
                  <option value={3}>Sala 3 (IMAX)</option>
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
                  value={form.hora_inicio}
                  onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Precio ($)</label>
                <input
                  type="number"
                  step="0.50"
                  required
                  value={form.precio_base}
                  onChange={(e) => setForm({ ...form, precio_base: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                                <label className="block text-xs text-slate-400 mb-1">Precio ($)</label>
                <input
                  type="number"
                  step="0.50"
                  required
                  value={form.precio_base}
                  onChange={(e) => setForm({ ...form, precio_base: e.target.value })}
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
