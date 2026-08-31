"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { Plus, RotateCw, Pencil, Trash2 } from "lucide-react";
import { api } from "@/app/lib/api";

interface Venta {
  id_compra: number;
  cliente_nombre: string;
  cliente_apellido: string;
  empleado: string;
  pelicula: string;
  fecha_venta: string;
  total_venta: string;
  metodo_pago: string;
}

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [funciones, setFunciones] = useState<any[]>([]);
  const [asientos, setAsientos] = useState<any[]>([]);
  const [form, setForm] = useState({
    id_cliente: "",
    id_funcion: "",
    id_asiento: "",
    metodo_pago: "efectivo",
    precio: "0",
  });

  useEffect(() => {
    api<Venta[]>("/ventas")
      .then(setVentas)
      .finally(() => setCargando(false));
  }, []);

    const abrirModalNuevo = async () => {
    const [dataClientes, dataFunciones] = await Promise.all([
      api<any[]>("/clientes"),
      api<any[]>("/funciones"),
    ]);
    setClientes(dataClientes);
    setFunciones(dataFunciones);
    setForm({ id_cliente: "", id_funcion: "", id_asiento: "", metodo_pago: "efectivo", precio: "0" });
    setAsientos([]);
    setModalOpen(true);
  };

  const cambiarFuncion = async (id_funcion: string) => {
    const funcionSeleccionada = funciones.find((f) => String(f.id) === id_funcion);
    setForm({ ...form, id_funcion, id_asiento: "", precio: funcionSeleccionada ? String(funcionSeleccionada.precio_base) : "0" });
    if (id_funcion) {
      const dataAsientos = await api<any[]>(`/funciones/${id_funcion}/asientos`);
      setAsientos(dataAsientos);
    } else {
      setAsientos([]);
    }
  };

  const guardarVenta = async (e: React.FormEvent) => {
    e.preventDefault();
    await api("/ventas", { method: "POST", body: JSON.stringify(form) });
    setModalOpen(false);
    setCargando(true);
    api<Venta[]>("/ventas").then(setVentas).finally(() => setCargando(false));
  };

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
            onClick={abrirModalNuevo}
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
                  <tr key={venta.id_compra} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-gold-400 font-semibold">{venta.id_compra}</td>
                    <td className="px-4 py-3 text-white">{venta.cliente_nombre} {venta.cliente_apellido}</td>
                    <td className="px-4 py-3 text-slate-300">{venta.empleado}</td>
                    <td className="px-4 py-3 text-slate-300">{venta.pelicula}</td>
                    <td className="px-4 py-3 text-slate-400">{new Date(venta.fecha_venta).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gold-400 font-semibold">${Number(venta.total_venta).toFixed(2)}</td>
                    <td className="px-4 py-3">{metodoBadge(venta.metodo_pago)}</td>
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-gold-400">Nueva Venta</h3>
            <form onSubmit={guardarVenta} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Cliente</label>
                <select
                  required
                  value={form.id_cliente}
                  onChange={(e) => setForm({ ...form, id_cliente: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value="">Seleccione un cliente</option>
                 {clientes.map((c: any) => (
                  <option key={c.id_cliente} value={c.id_cliente}>{c.nombre} {c.apellido}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Función</label>
                <select
                  required
                  value={form.id_funcion}
                  onChange={(e) => cambiarFuncion(e.target.value)}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value="">Seleccione una función</option>
                  {funciones.map((f: any) => (
                    <option key={f.id} value={f.id}>{f.pelicula} - Sala {f.numero_sala} - {f.hora_inicio?.slice(0,5)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Asiento</label>
                <select
                  required
                  value={form.id_asiento}
                  onChange={(e) => setForm({ ...form, id_asiento: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value="">Seleccione un asiento</option>
                  {asientos.map((a: any) => (
                    <option key={a.id_asiento} value={a.id_asiento}>{a.fila}-{a.numero_asiento} ({a.tipo_asiento})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Método de Pago</label>
                <select
                  value={form.metodo_pago}
                  onChange={(e) => setForm({ ...form, metodo_pago: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="qr">QR</option>
                </select>
              </div>

              <div className="text-sm text-slate-300">
                Total: <span className="text-gold-400 font-bold">${Number(form.precio).toFixed(2)}</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded text-xs font-semibold text-slate-400 hover:bg-white/5">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950">
                  Registrar Venta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}