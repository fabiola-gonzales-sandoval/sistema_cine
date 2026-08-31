"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { Search, Plus, RotateCw, Pencil, Trash2, Info, X } from "lucide-react";
import { api } from "@/app/lib/api";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
}

export default function UsersPage() {
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "", correo: "" });

  const cargarUsuarios = async () => {
    setCargando(true);
    setError("");
    try {
      const data = await api<Usuario[]>("/clientes");
      setUsuarios(data.map((usuario) => ({
        ...usuario,
        telefono: usuario.telefono ?? "",
        correo: usuario.correo ?? "",
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    let active = true;
    void api<Usuario[]>("/clientes")
      .then((data) => {
        if (!active) return;
        setUsuarios(data.map((usuario) => ({
          ...usuario,
          telefono: usuario.telefono ?? "",
          correo: usuario.correo ?? "",
        })));
        setError("");
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : "No se pudieron cargar los usuarios.");
      })
      .finally(() => {
        if (active) setCargando(false);
      });
    return () => { active = false; };
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const q = busqueda.toLowerCase();
    return (
      u.nombre.toLowerCase().includes(q) ||
      u.apellido.toLowerCase().includes(q) ||
      u.telefono.includes(q)
    );
  });

  const abrirModalNuevo = () => {
    setUsuarioEditar(null);
    setForm({ nombre: "", apellido: "", telefono: "", correo: "" });
    setModalOpen(true);
  };

  const abrirModalEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      correo: usuario.correo,
    });
    setModalOpen(true);
  };

  const guardarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (usuarioEditar) {
        await api<Usuario>(`/clientes/${usuarioEditar.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await api<Usuario>("/clientes", { method: "POST", body: JSON.stringify(form) });
      }
      setModalOpen(false);
      await cargarUsuarios();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el usuario.");
    }
  };

  const eliminarUsuario = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      setError("");
      try {
        await api<void>(`/clientes/${id}`, { method: "DELETE" });
        await cargarUsuarios();
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo eliminar el usuario.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Encabezado */}
        <section>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-400">
            GESTIÓN DE USUARIOS
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Registra, actualiza y controla la información de los usuarios.
          </p>
        </section>

        {/* Botones de acción */}
        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={abrirModalNuevo}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <Plus className="w-4 h-4" /> NUEVO USUARIO
          </button>
          <button
            type="button"
            onClick={() => void cargarUsuarios()}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 transition-colors border border-gold-500 text-gold-400 text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <RotateCw className="w-4 h-4" /> ACTUALIZAR
          </button>
        </section>

        {error && <p className="rounded-lg border border-crimson-500/40 bg-crimson-600/10 px-4 py-3 text-sm text-red-200">{error}</p>}

        {/* Barra de búsqueda + info */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr,1.4fr] gap-4">
          <div className="flex items-center gap-2 bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, apellido o teléfono..."
              className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 flex-1"
            />
            <button
              type="button"
              className="bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-xs font-semibold px-3 py-1.5 rounded"
            >
              BUSCAR
            </button>
          </div>

          <div className="flex items-center gap-2 bg-navy-900/60 border border-white/5 rounded-lg px-3 py-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-gold-400 shrink-0" />
            La búsqueda se realiza por nombre, apellido o teléfono. Ingrese cualquier dato para encontrar coincidencias.
          </div>
        </section>

        {/* Tabla de usuarios */}
        <section className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gold-500 text-navy-950 text-xs font-bold uppercase">
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">Nombre</th>
                  <th className="text-left px-4 py-3">Apellido</th>
                  <th className="text-left px-4 py-3">Teléfono</th>
                  <th className="text-left px-4 py-3">Correo</th>
                  <th className="text-right px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cargando && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">Cargando usuarios…</td></tr>
                )}
                {!cargando && usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-gold-400 font-semibold">{usuario.id}</td>
                    <td className="px-4 py-3 text-white">{usuario.nombre}</td>
                    <td className="px-4 py-3 text-slate-300">{usuario.apellido}</td>
                    <td className="px-4 py-3 text-slate-400">{usuario.telefono}</td>
                    <td className="px-4 py-3 text-slate-400">{usuario.correo}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(usuario)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarUsuario(usuario.id)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-crimson-600 hover:bg-crimson-500 transition-colors text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!cargando && usuariosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No se encontraron usuarios que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal Crear / Editar */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-gold-400">
                {usuarioEditar ? "Editar Usuario" : "Nuevo Usuario"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={guardarUsuario} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Apellido</label>
                <input
                  type="text"
                  required
                  value={form.apellido}
                  onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Teléfono</label>
                <input
                  type="text"
                  required
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={form.correo}
                  onChange={(e) => setForm({ ...form, correo: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-semibold text-slate-400 hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950"
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
          <p>Diseñado para el control de taquilla, películas, empleados y estadísticas en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}
