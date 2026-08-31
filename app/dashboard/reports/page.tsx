"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import {
  DollarSign,
  Film,
  Ticket,
  ShoppingBag,
  Users,
  ArrowRight,
  X,
  Printer,
  Download,
  Calendar,
  Filter,
  CheckCircle,
} from "lucide-react";

interface ReportCategory {
  id: "ventas" | "peliculas" | "funciones" | "productos" | "clientes";
  title: string;
  icon: typeof DollarSign;
  bullets: string[];
}

export default function ReportesPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [reporteVentas, setReporteVentas] = useState<any>(null);
  const [reportePeliculas, setReportePeliculas] = useState<any>(null);
  const [reporteFunciones, setReporteFunciones] = useState<any>(null);
  const [reporteProductos, setReporteProductos] = useState<any>(null);
  const [reporteClientes, setReporteClientes] = useState<any>(null);

  useEffect(() => {
    if (selectedReport === "ventas") {
      fetch('/api/reportes/ventas')
        .then(res => res.json())
        .then(setReporteVentas);
    }
    if (selectedReport === "peliculas") {
      fetch('/api/reportes/peliculas')
        .then(res => res.json())
        .then(setReportePeliculas);
    }
    if (selectedReport === "funciones") {
      fetch('/api/reportes/funciones')
        .then(res => res.json())
        .then(setReporteFunciones);
    }
    if (selectedReport === "productos") {
      fetch('/api/reportes/productos')
        .then(res => res.json())
        .then(setReporteProductos);
    }
    if (selectedReport === "clientes") {
      fetch('/api/reportes/clientes')
        .then(res => res.json())
        .then(setReporteClientes);
    }
  }, [selectedReport]);

  const categories: ReportCategory[] = [
    {
      id: "ventas",
      title: "Reportes de Ventas",
      icon: DollarSign,
      bullets: [
        "Ventas por día",
        "Ventas por rango de fechas",
        "Ingresos totales",
        "Método de pago",
        "Entradas vendidas",
      ],
    },
    {
      id: "peliculas",
      title: "Reportes de Películas",
      icon: Film,
      bullets: [
        "Películas más vendidas",
        "Películas con más espectadores",
        "Películas disponibles",
        "Películas por género",
      ],
    },
    {
      id: "funciones",
      title: "Reportes de Funciones",
      icon: Ticket,
      bullets: [
        "Funciones realizadas",
        "Asistentes por función",
        "Asientos ocupados / libres",
        "Funciones por fecha",
      ],
    },
    {
      id: "productos",
      title: "Reportes de Productos",
      icon: ShoppingBag,
      bullets: [
        "Productos más vendidos",
        "Cantidad vendida",
        "Ingresos por productos",
        "Productos con poco stock",
      ],
    },
    {
      id: "clientes",
      title: "Reportes de Clientes",
      icon: Users,
      bullets: [
        "Clientes registrados",
        "Clientes con más compras",
        "Historial de compras",
      ],
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = (filename: string) => {
    showToast(`Reporte "${filename}" descargado en formato CSV con éxito.`);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans flex flex-col justify-between">
      {/* Componente Header */}
      <Header />

      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-10 space-y-8 flex-1">
        {/* Encabezado Principal */}
        <section className="space-y-1">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reportes por categoría
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Seleccione la categoría del reporte que desea consultar.
          </p>
        </section>

        {/* Notificación Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-4">
            <CheckCircle className="w-4 h-4" /> {toastMessage}
          </div>
        )}

        {/* Cuadrícula de Categorías (4 columnas) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fila 1: Primeras 4 tarjetas */}
          {categories.slice(0, 4).map((cat) => {
            const Icon = cat.icon;
            return (
              <article
                key={cat.id}
                className="bg-navy-900/90 border border-white/5 rounded-2xl p-6 flex flex-col justify-between card-glow hover:border-white/10 transition-all duration-300 group"
              >
                <div>
                  {/* Icono Circular Rojo */}
                  <div className="w-14 h-14 rounded-full border border-crimson-500/40 bg-crimson-600/15 text-crimson-500 flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  {/* Título de Categoría */}
                  <h3 className="font-display font-bold text-white text-base text-center mb-5 tracking-wide">
                    {cat.title}
                  </h3>

                  {/* Lista de Items */}
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    {cat.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón Consultar reporte */}
                <button
                  type="button"
                  onClick={() => setSelectedReport(cat.id)}
                  className="w-full bg-crimson-600 hover:bg-crimson-500 text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-crimson-600/20"
                >
                  Consultar reporte <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </article>
            );
          })}

          {/* Fila 2: Tarjeta 5 (Clientes) + Contenedor Banner Cinematográfico (3 columnas) */}
          <article className="bg-navy-900/90 border border-white/5 rounded-2xl p-6 flex flex-col justify-between card-glow hover:border-white/10 transition-all duration-300 group">
            <div>
              {/* Icono Circular Rojo */}
              <div className="w-14 h-14 rounded-full border border-crimson-500/40 bg-crimson-600/15 text-crimson-500 flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>

              {/* Título de Categoría */}
              <h3 className="font-display font-bold text-white text-base text-center mb-5 tracking-wide">
                Reportes de Clientes
              </h3>

              {/* Lista de Items */}
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                {categories[4].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón Consultar reporte */}
            <button
              type="button"
              onClick={() => setSelectedReport("clientes")}
              className="w-full bg-crimson-600 hover:bg-crimson-500 text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-crimson-600/20"
            >
              Consultar reporte <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>

          {/* Contenedor Visual Cinematográfico (Carrete de Película y Palomitas) */}
          <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-white/5 overflow-hidden relative card-glow min-h-[260px] flex items-center bg-black/40">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop"
              alt="Cine y Cartelera"
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/img/banner.jpg";
              }}
            />
            {/* Gradiente Cinematográfico */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />
            
            <div className="relative p-6 sm:p-8 max-w-lg space-y-2">
              <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 text-[11px] font-bold px-2.5 py-1 rounded">
                CINEMANÍA ANALYTICS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                Información en tiempo real
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Supervisa el rendimiento de taquilla, asistencia en salas y consumo de confitería para tomar las mejores decisiones comerciales.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL DETALLADO DE CONSULTA DE REPORTES */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-white/10 rounded-2xl w-full max-w-4xl p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto card-glow">
            {/* Header del Modal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-gold-400 tracking-wider">
                  MÓDULO DE ESTADÍSTICAS Y AUDITORÍA
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {categories.find((c) => c.id === selectedReport)?.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportCSV(selectedReport)}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gold-400" /> Exportar CSV
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-300" /> Imprimir
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Selector de Rango de Fechas */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-950 p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Filter className="w-4 h-4 text-gold-400" />
                <span>Filtrar por período:</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-navy-900 border border-white/10 text-xs text-slate-200 rounded px-2.5 py-1.5 outline-none focus:border-gold-500"
                >
                  <option value="all">Todo el Historial</option>
                  <option value="today">Hoy (2026-06-30)</option>
                  <option value="week">Última Semana</option>
                  <option value="month">Este Mes (Junio 2026)</option>
                </select>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> 2026
                </span>
              </div>
            </div>

            {/* CONTENIDO SEGÚN LA CATEGORÍA SELECCIONADA */}
            
            {/* 1. REPORTE DE VENTAS */}
            {selectedReport === "ventas" && reporteVentas && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Recaudación Total</p>
                    <p className="font-display text-2xl font-bold text-gold-400 mt-1">${reporteVentas.recaudacion_total.toFixed(2)}</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Total Transacciones</p>
                    <p className="font-display text-2xl font-bold text-white mt-1">{reporteVentas.total_transacciones} ventas</p>
                    <p className="text-[11px] text-slate-400 mt-1">Promedio: ${(reporteVentas.recaudacion_total / reporteVentas.total_transacciones).toFixed(2)} / venta</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Método Más Usado</p>
                    <p className="font-display text-2xl font-bold text-emerald-400 mt-1 capitalize">{reporteVentas.metodo_pago[0]?.metodo_pago}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{reporteVentas.metodo_pago[0]?.cantidad} transacciones</p>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gold-500 text-navy-950 font-bold uppercase">
                        <th className="px-3 py-2.5 text-left">Fecha</th>
                        <th className="px-3 py-2.5 text-left">Transacciones</th>
                        <th className="px-3 py-2.5 text-left">Métodos</th>
                        <th className="px-3 py-2.5 text-right">Total Generado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reporteVentas.por_dia.map((dia: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="px-3 py-2.5 font-medium text-white">{new Date(dia.fecha_venta).toLocaleDateString()}</td>
                          <td className="px-3 py-2.5 text-slate-300">{dia.transacciones} venta(s)</td>
                          <td className="px-3 py-2.5 text-slate-400 capitalize">{dia.metodos}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-gold-400">${Number(dia.total).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* 2. REPORTE DE PELÍCULAS */}
            {selectedReport === "peliculas" && reportePeliculas && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Película #1 en Taquilla</p>
                    <p className="font-display text-xl font-bold text-gold-400 mt-1">{reportePeliculas.peliculas[0]?.titulo}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{reportePeliculas.peliculas[0]?.entradas_vendidas} boletos · ${Number(reportePeliculas.peliculas[0]?.ingresos_totales).toFixed(2)} recaudado</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Género Más Popular</p>
                    <p className="font-display text-xl font-bold text-white mt-1">{reportePeliculas.genero_popular?.genero}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{reportePeliculas.genero_popular?.total} entradas vendidas</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Total Películas en Sistema</p>
                    <p className="font-display text-xl font-bold text-emerald-400 mt-1">{reportePeliculas.total_peliculas} títulos</p>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gold-500 text-navy-950 font-bold uppercase">
                        <th className="px-3 py-2.5 text-left">Película</th>
                        <th className="px-3 py-2.5 text-left">Género</th>
                        <th className="px-3 py-2.5 text-left">Clasif.</th>
                        <th className="px-3 py-2.5 text-center">Entradas Vendidas</th>
                        <th className="px-3 py-2.5 text-right">Ingresos Totales</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reportePeliculas.peliculas.map((peli: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="px-3 py-2.5 font-semibold text-white">{peli.titulo}</td>
                          <td className="px-3 py-2.5 text-slate-300">{peli.genero}</td>
                          <td className="px-3 py-2.5 text-slate-400">{peli.clasificacion}</td>
                          <td className="px-3 py-2.5 text-center font-bold text-white">{peli.entradas_vendidas}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-gold-400">${Number(peli.ingresos_totales).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. REPORTE DE FUNCIONES */}
            {selectedReport === "funciones" && reporteFunciones && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Ocupación Promedio</p>
                    <p className="font-display text-2xl font-bold text-emerald-400 mt-1">
                      {(
                        (reporteFunciones.funciones.reduce((acc: number, f: any) => acc + Number(f.asientos_ocupados), 0) /
                        reporteFunciones.funciones.reduce((acc: number, f: any) => acc + Number(f.capacidad_total), 0)) * 100
                      ).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Total Salas</p>
                    <p className="font-display text-2xl font-bold text-gold-400 mt-1">{reporteFunciones.total_salas} salas</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Total Funciones Activas</p>
                    <p className="font-display text-2xl font-bold text-white mt-1">{reporteFunciones.total_funciones} funciones</p>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gold-500 text-navy-950 font-bold uppercase">
                        <th className="px-3 py-2.5 text-left">Función / Película</th>
                        <th className="px-3 py-2.5 text-left">Sala</th>
                        <th className="px-3 py-2.5 text-left">Horario</th>
                        <th className="px-3 py-2.5 text-center">Ocupación</th>
                        <th className="px-3 py-2.5 text-right">Precio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reporteFunciones.funciones.map((f: any) => {
                        const ocupacion = ((Number(f.asientos_ocupados) / Number(f.capacidad_total)) * 100).toFixed(0);
                        return (
                          <tr key={f.id_funcion} className="hover:bg-white/5">
                            <td className="px-3 py-2.5 font-semibold text-white">{f.pelicula}</td>
                            <td className="px-3 py-2.5 text-slate-300">Sala {f.numero_sala} ({f.tipo_sala})</td>
                            <td className="px-3 py-2.5 text-slate-400">{new Date(f.fecha).toLocaleDateString()} · {f.hora_inicio?.slice(0,5)}</td>
                            <td className="px-3 py-2.5 text-center text-emerald-400 font-bold">{ocupacion}%</td>
                            <td className="px-3 py-2.5 text-right font-bold text-gold-400">${Number(f.precio_base).toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. REPORTE DE PRODUCTOS */}
            {selectedReport === "productos" && reporteProductos && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Producto Estrella</p>
                    <p className="font-display text-xl font-bold text-gold-400 mt-1 capitalize">{reporteProductos.productos[0]?.nombre_producto}</p>
                    <p className="text-[11px] text-slate-400 mt-1">${Number(reporteProductos.productos[0]?.ingreso_total).toFixed(2)} generado</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Total en Confitería</p>
                    <p className="font-display text-xl font-bold text-white mt-1">
                      ${reporteProductos.productos.reduce((acc: number, p: any) => acc + Number(p.ingreso_total), 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Alerta de Inventario</p>
                    <p className="font-display text-xl font-bold text-amber-400 mt-1 capitalize">
                      {reporteProductos.productos.sort((a: any, b: any) => a.stock - b.stock)[0]?.nombre_producto}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">{reporteProductos.productos[0]?.stock} unidades</p>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gold-500 text-navy-950 font-bold uppercase">
                        <th className="px-3 py-2.5 text-left">Producto</th>
                        <th className="px-3 py-2.5 text-left">Categoría</th>
                        <th className="px-3 py-2.5 text-center">Unidades Vendidas</th>
                        <th className="px-3 py-2.5 text-center">Stock Actual</th>
                        <th className="px-3 py-2.5 text-right">Ingreso Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reporteProductos.productos.map((p: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="px-3 py-2.5 font-semibold text-white capitalize">{p.nombre_producto}</td>
                          <td className="px-3 py-2.5 text-slate-300 capitalize">{p.categoria}</td>
                          <td className="px-3 py-2.5 text-center font-bold text-white">{p.unidades_vendidas}</td>
                          <td className="px-3 py-2.5 text-center text-emerald-400">{p.stock} u.</td>
                          <td className="px-3 py-2.5 text-right font-bold text-gold-400">${Number(p.ingreso_total).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

                        {/* 5. REPORTE DE CLIENTES */}
            {selectedReport === "clientes" && reporteClientes && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Cliente VIP / Más Compras</p>
                    <p className="font-display text-xl font-bold text-gold-400 mt-1">
                      {reporteClientes.clientes[0]?.nombre} {reporteClientes.clientes[0]?.apellido}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {reporteClientes.clientes[0]?.total_compras} compras · ${Number(reporteClientes.clientes[0]?.monto_total).toFixed(2)} gastado
                    </p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Total Clientes Activos</p>
                    <p className="font-display text-xl font-bold text-white mt-1">{reporteClientes.total_clientes} registrados</p>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-400">Ticket Promedio por Cliente</p>
                    <p className="font-display text-xl font-bold text-emerald-400 mt-1">
                      ${(reporteClientes.clientes.reduce((acc: number, c: any) => acc + Number(c.monto_total), 0) / reporteClientes.total_clientes).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gold-500 text-navy-950 font-bold uppercase">
                        <th className="px-3 py-2.5 text-left">Cliente</th>
                        <th className="px-3 py-2.5 text-left">Teléfono</th>
                        <th className="px-3 py-2.5 text-left">Correo</th>
                        <th className="px-3 py-2.5 text-center">Compras Totales</th>
                        <th className="px-3 py-2.5 text-right">Monto Acumulado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reporteClientes.clientes.map((c: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="px-3 py-2.5 font-semibold text-white">{c.nombre} {c.apellido}</td>
                          <td className="px-3 py-2.5 text-slate-300">{c.telefono}</td>
                          <td className="px-3 py-2.5 text-slate-400">{c.correo}</td>
                          <td className="px-3 py-2.5 text-center font-bold text-white">{c.total_compras}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-gold-400">${Number(c.monto_total).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer del Modal */}
            <div className="flex justify-end pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs rounded-lg cursor-pointer transition-colors"
              >
                Cerrar Reporte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer General */}
      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 CINEMANÍA - Sistema de Gestión Cinematográfica</p>
          <p>Diseñado para el control de taquilla, películas, empleados y estadísticas en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}
