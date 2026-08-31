"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import { Search, Plus, RotateCw, Pencil, Trash2, Info, X, Package } from "lucide-react";

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: string;
  stock: number;
}

export default function ProductosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: "Palomitas Grandes", categoria: "Alimento", precio: "$30.00", stock: 50 },
    { id: 2, nombre: "Refresco 32oz", categoria: "Bebida", precio: "$15.00", stock: 100 },
    { id: 3, nombre: "Nachos con Queso", categoria: "Alimento", precio: "$25.00", stock: 40 },
    { id: 4, nombre: "Combo Pareja (2 Refrescos + 1 Palomitas)", categoria: "Combo", precio: "$55.00", stock: 35 },
    { id: 5, nombre: "Hot Dog Clásico", categoria: "Alimento", precio: "$22.00", stock: 30 },
    
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    categoria: "Alimento",
    precio: "20.00",
    stock: 50,
  });
  

  const productosFiltrados = productos.filter((p) => {
  const q = busqueda.toLowerCase();
  const coincideTexto = p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q);
  const coincideCategoria = categoriaSeleccionada === "Todos" || p.categoria === categoriaSeleccionada;
  return coincideTexto && coincideCategoria;
});

  const abrirModalNuevo = () => {
    setProductoEditar(null);
    setForm({ nombre: "", categoria: "Alimento", precio: "20.00", stock: 50 });
    setModalOpen(true);
  };

  const abrirModalEditar = (p: Producto) => {
    setProductoEditar(p);
    setForm({
      nombre: p.nombre,
      categoria: p.categoria,
      precio: p.precio.replace("$", ""),
      stock: p.stock,
    });
    setModalOpen(true);
  };

  const guardarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    const precioFormat = `$${parseFloat(form.precio || "0").toFixed(2)}`;
    if (productoEditar) {
      setProductos(
        productos.map((p) =>
          p.id === productoEditar.id ? { ...p, ...form, precio: precioFormat } : p
        )
      );
    } else {
      const nuevoId =
        productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
      setProductos([...productos, { id: nuevoId, ...form, precio: precioFormat }]);
    }
    setModalOpen(false);
  };

  const eliminarProducto = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto de dulcería?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans flex flex-col">
      <Header />

      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1">
        {/* Encabezado */}
        <section>
          <div className="flex items-center gap-2">
            <Package className="w-7 h-7 text-gold-400" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-400">
              GESTIÓN DE PRODUCTOS Y DULCERÍA
            </h1>
          </div>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Registro, actualiza y controla el inventario de confitería y productos del cine.
          </p>
        </section>

        {/* Botones de acción */}
        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={abrirModalNuevo}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" /> NUEVO PRODUCTO
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
              placeholder="Buscar por producto o categoría..."
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
            Control de inventario en tiempo real para venta de taquilla y dulcería.
          </div>
        </section>

        {/* Tabla de productos */}
        <section className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden card-glow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gold-500 text-navy-950 text-xs font-bold uppercase">
                  <th className="text-left px-4 py-3.5">ID</th>
                  <th className="text-left px-4 py-3.5">PRODUCTO</th>
                  <th className="text-left px-4 py-3.5">CATEGORÍA</th>
                  <th className="text-left px-4 py-3.5">PRECIO</th>
                  <th className="text-left px-4 py-3.5">STOCK DISPONIBLE</th>
                  <th className="text-right px-4 py-3.5">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {productosFiltrados.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-gold-400 font-semibold">{p.id}</td>
                    <td className="px-4 py-3 text-white font-medium">{p.nombre}</td>
                    <td className="px-4 py-3 text-slate-300">
                      <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-xs">
                        {p.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gold-400 font-semibold">{p.precio}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          p.stock < 35
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {p.stock} unidades
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(p)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarProducto(p.id)}
                          className="w-8 h-8 flex items-center justify-center rounded bg-crimson-600 hover:bg-crimson-500 transition-colors text-white cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {productosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No se encontraron productos que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal Crear / Editar Producto */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-gold-400">
                {productoEditar ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={guardarProducto} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Categoría</label>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full bg-navy-950 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                >
                  <option value="Alimento">Alimento</option>
                  <option value="Bebida">Bebida</option>
                  <option value="Combo">Combo</option>
                  <option value="Dulce">Dulce</option>
                </select>
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
              <div>
                <label className="block text-xs text-slate-400 mb-1">Stock Disponible</label>
                <input
                  type="number"
                  required
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
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
          <p>Control de productos y confitería en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}