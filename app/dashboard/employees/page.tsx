"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { Search, Plus, RotateCw, Pencil, Trash2, Info } from "lucide-react";
import { api } from "@/app/lib/api";

interface Empleado {
  id_empleado: number;
  nombre: string;
  cargo: string;
  usuario: string;
}

export default function EmpleadosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  const cargarEmpleados = async () => {
    const data = await api<Empleado[]>("/empleados");
    setEmpleados(data);
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

    const [modalOpen, setModalOpen] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState<Empleado | null>(null);
  const [form, setForm] = useState({ nombre: "", cargo: "", usuario: "", contrasena: "" });

  const abrirModalNuevo = () => {
    setEmpleadoEditar(null);
    setForm({ nombre: "", cargo: "", usuario: "", contrasena: "" });
    setModalOpen(true);
  };

  const abrirModalEditar = (emp: Empleado) => {
    setEmpleadoEditar(emp);
    setForm({ nombre: emp.nombre, cargo: emp.cargo, usuario: emp.usuario, contrasena: "" });
    setModalOpen(true);
  };

  const guardarEmpleado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (empleadoEditar) {
      await api(`/empleados/${empleadoEditar.id_empleado}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
    } else {
      await api("/empleados", { method: "POST", body: JSON.stringify(form) });
    }
    setModalOpen(false);
    await cargarEmpleados();
  };

  const eliminarEmpleado = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
      await api(`/empleados/${id}`, { method: "DELETE" });
      await cargarEmpleados();
    }
  };

  const empleadosFiltrados = empleados.filter((e) => {
    const q = busqueda.toLowerCase();
    return (
      e.nombre.toLowerCase().includes(q) ||
      e.cargo.toLowerCase().includes(q) ||
      e.usuario.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Encabezado */}
        <section>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-400">
            GESTIÓN DE EMPLEADOS
          </h1>
        </section>

        {/* Botones de acción */}
        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={abrirModalNuevo}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <Plus className="w-4 h-4" /> NUEVO EMPLEADO
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 transition-colors border border-gold-500 text-gold-400 text-sm font-semibold px-4 py-2.5 rounded-lg"
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
              placeholder="Buscar por nombre, cargo o usuario..."
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
            La búsqueda se realiza por nombre, cargo o usuario. Ingrese cualquier dato para encontrar coincidencias.
          </div>
        </section>

        {/* Tabla de empleados */}
        <section className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gold-500 text-navy-950 text-xs font-bold uppercase">
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">Nombre</th>
                  <th className="text-left px-4 py-3">Cargo</th>
                  <th className="text-left px-4 py-3">Usuario</th>
                  <th className="text-right px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {empleadosFiltrados.map((empleado) => (
                    <tr key={empleado.id_empleado} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-gold-400 font-semibold">{empleado.id_empleado}</td>
                    <td className="px-4 py-3 text-white">{empleado.nombre}</td>
                    <td className="px-4 py-3 text-slate-300">{empleado.cargo}</td>
                    <td className="px-4 py-3 text-slate-400">{empleado.usuario}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                                                <button
                          type="button"
                          onClick={() => abrirModalEditar(empleado)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarEmpleado(empleado.id_empleado)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-crimson-600 hover:bg-crimson-500 transition-colors text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {empleadosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No se encontraron empleados que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
            </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-gold-400">
              {empleadoEditar ? "Editar Empleado" : "Nuevo Empleado"}
            </h3>
            <form onSubmit={guardarEmpleado} className="space-y-3">
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
                <label className="block text-xs text-slate-400 mb-1">Cargo</label>
                <input
                  type="text"
                  required
                  value={form.cargo}
                  onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Usuario</label>
                <input
                  type="text"
                  required
                  value={form.usuario}
                  onChange={(e) => setForm({ ...form, usuario: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              {!empleadoEditar && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={form.contrasena}
                    onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                    className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  />
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded text-xs font-semibold text-slate-400 hover:bg-white/5">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
