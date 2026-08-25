"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import {
  Search,
  Plus,
  RotateCw,
  Pencil,
  Trash2,
  Info,
  Film,
  Calendar,
  Clock,
  Tag,
  LayoutGrid,
  List,
  Eye,
  X,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

export interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  clasificacion: string;
  duracion: string;
  fechaEstreno: string;
  sinopsis: string;
  imagen: string;
  estado: "En Cartelera" | "Próximamente";
}

const IMAGENES_DISPONIBLES = [
  { nombre: "Backrooms", ruta: "/img/backrooms.jpg" },
  { nombre: "Michael", ruta: "/img/michael.jpg" },
  { nombre: "Toy Story 5", ruta: "/img/toystory5.jpg" },
  { nombre: "Scary Movie", ruta: "/img/scarymovie.jpg" },
  { nombre: "Supergirl", ruta: "/img/supergirl.jpg" },
  { nombre: "El Día de la Revelación", ruta: "/img/revelacion.jpg" },
  { nombre: "Banner Cartelera", ruta: "/img/banner.jpg" },
];

export default function PeliculasPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroClasificacion, setFiltroClasificacion] = useState("todos");
  const [vistaModo, setVistaModo] = useState<"grid" | "table">("grid");

  const [peliculas, setPeliculas] = useState<Pelicula[]>([
    {
      id: 1,
      titulo: "Backrooms",
      genero: "Terror",
      clasificacion: "14A",
      duracion: "112 min",
      fechaEstreno: "2026-06-04",
      sinopsis:
        "Un grupo de jóvenes queda atrapado en un laberinto infinito de habitaciones extrañas y pasillos monocromáticos.",
      imagen: "/img/backrooms.jpg",
      estado: "En Cartelera",
    },
    {
      id: 2,
      titulo: "Michael",
      genero: "Biografía",
      clasificacion: "ATP",
      duracion: "128 min",
      fechaEstreno: "2026-06-04",
      sinopsis:
        "Película basada en la vida y carrera de Michael Jackson, desde sus inicios infantiles hasta convertirse en leyenda de la música.",
      imagen: "/img/michael.jpg",
      estado: "En Cartelera",
    },
    {
      id: 3,
      titulo: "Toy Story 5",
      genero: "Animación",
      clasificacion: "ATP",
      duracion: "96 min",
      fechaEstreno: "2026-06-18",
      sinopsis:
        "Woody, Buzz y sus inseparables amigos enfrentan una nueva aventura en la era digital con nuevos juguetes inteligentes.",
      imagen: "/img/toystory5.jpg",
      estado: "En Cartelera",
    },
    {
      id: 4,
      titulo: "Scary Movie",
      genero: "Comedia",
      clasificacion: "14A",
      duracion: "102 min",
      fechaEstreno: "2026-06-04",
      sinopsis:
        "Regreso de la famosa e icónica saga de parodias de las películas de terror más conocidas del cine contemporáneo.",
      imagen: "/img/scarymovie.jpg",
      estado: "En Cartelera",
    },
    {
      id: 5,
      titulo: "Supergirl",
      genero: "Acción",
      clasificacion: "TBC",
      duracion: "120 min",
      fechaEstreno: "2026-06-25",
      sinopsis:
        "Kara Zor-El emprende una peligrosa aventura por el cosmos para proteger la justicia intergaláctica.",
      imagen: "/img/supergirl.jpg",
      estado: "En Cartelera",
    },
    {
      id: 6,
      titulo: "El Día de la Revelación",
      genero: "Ciencia Ficción",
      clasificacion: "TBC",
      duracion: "140 min",
      fechaEstreno: "2026-06-11",
      sinopsis:
        "La humanidad descubre que no está sola en el universo tras una transmisión enigmática desde el espacio profundo.",
      imagen: "/img/revelacion.jpg",
      estado: "En Cartelera",
    },
    {
      id: 7,
      titulo: "Star Wars: The Mandalorian and Grogu",
      genero: "Ciencia Ficción",
      clasificacion: "ATP",
      duracion: "135 min",
      fechaEstreno: "2026-06-04",
      sinopsis:
        "Nueva aventura galáctica protagonizada por Din Djarin y Grogu explorando los rincones más lejanos de la galaxia.",
      imagen: "/img/banner.jpg",
      estado: "En Cartelera",
    },
  ]);

  // Modales
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [peliculaEditar, setPeliculaEditar] = useState<Pelicula | null>(null);
  const [modalDetalle, setModalDetalle] = useState<Pelicula | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    genero: "Acción",
    clasificacion: "ATP",
    duracion: "",
    fechaEstreno: "",
    sinopsis: "",
    imagen: "/img/backrooms.jpg",
    estado: "En Cartelera" as "En Cartelera" | "Próximamente",
  });

  const generosDisponibles = [
    "todos",
    "Acción",
    "Animación",
    "Biografía",
    "Ciencia Ficción",
    "Comedia",
    "Terror",
  ];

  const clasificacionesDisponibles = ["todos", "ATP", "14A", "R", "TBC"];

  // Filtrado
  const peliculasFiltradas = peliculas.filter((p) => {
    const q = busqueda.toLowerCase();
    const matchBusqueda =
      p.titulo.toLowerCase().includes(q) ||
      p.genero.toLowerCase().includes(q) ||
      p.clasificacion.toLowerCase().includes(q) ||
      p.sinopsis.toLowerCase().includes(q);

    const matchGenero = filtroGenero === "todos" || p.genero === filtroGenero;
    const matchClasif =
      filtroClasificacion === "todos" || p.clasificacion === filtroClasificacion;

    return matchBusqueda && matchGenero && matchClasif;
  });

  const abrirModalNuevo = () => {
    setPeliculaEditar(null);
    setForm({
      titulo: "",
      genero: "Acción",
      clasificacion: "ATP",
      duracion: "120 min",
      fechaEstreno: new Date().toISOString().split("T")[0],
      sinopsis: "",
      imagen: "/img/backrooms.jpg",
      estado: "En Cartelera",
    });
    setModalFormOpen(true);
  };

  const abrirModalEditar = (p: Pelicula) => {
    setPeliculaEditar(p);
    setForm({
      titulo: p.titulo,
      genero: p.genero,
      clasificacion: p.clasificacion,
      duracion: p.duracion,
      fechaEstreno: p.fechaEstreno,
      sinopsis: p.sinopsis,
      imagen: p.imagen,
      estado: p.estado,
    });
    setModalFormOpen(true);
  };

  const guardarPelicula = (e: React.FormEvent) => {
    e.preventDefault();
    if (peliculaEditar) {
      setPeliculas((prev) =>
        prev.map((p) =>
          p.id === peliculaEditar.id ? { ...p, ...form } : p
        )
      );
    } else {
      const nuevoId =
        peliculas.length > 0 ? Math.max(...peliculas.map((p) => p.id)) + 1 : 1;
      setPeliculas((prev) => [...prev, { id: nuevoId, ...form }]);
    }
    setModalFormOpen(false);
  };

  const eliminarPelicula = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta película de la cartelera?")) {
      setPeliculas((prev) => prev.filter((p) => p.id !== id));
      if (modalDetalle?.id === id) {
        setModalDetalle(null);
      }
    }
  };

  const badgeClasificacion = (clasif: string) => {
    const map: Record<string, string> = {
      ATP: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      "14A": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
      R: "bg-red-500/20 text-red-300 border-red-500/40",
      TBC: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    };
    return (
      <span
        className={`px-2 py-0.5 text-[11px] font-bold rounded border ${
          map[clasif] || "bg-white/10 text-slate-300 border-white/20"
        }`}
      >
        {clasif}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 antialiased font-sans flex flex-col">
      {/* Componente Header reutilizable */}
      <Header />

      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1">
        {/* Encabezado y Estadísticas rápidas */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Film className="w-7 h-7 text-gold-400" />
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gold-400 tracking-wide">
                GESTIÓN DE PELÍCULAS
              </h1>
            </div>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Registro, actualiza y controla el catálogo de películas y pósters del cine.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-navy-900/80 border border-white/10 rounded-xl px-4 py-2 text-xs">
            <span className="text-slate-400">Total en sistema:</span>
            <span className="text-gold-400 font-bold text-base">{peliculas.length}</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-semibold">
              {peliculas.filter((p) => p.estado === "En Cartelera").length} en cartelera
            </span>
          </div>
        </section>

        {/* Botones de acción y selector de vista */}
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={abrirModalNuevo}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 text-sm font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-gold-500/10 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> NUEVA PELÍCULA
            </button>
            <button
              type="button"
              onClick={() => {
                setBusqueda("");
                setFiltroGenero("todos");
                setFiltroClasificacion("todos");
              }}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 transition-colors border border-gold-500 text-gold-400 text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer"
            >
              <RotateCw className="w-4 h-4" /> ACTUALIZAR
            </button>
          </div>

          {/* Selector de vista: Tarjetas o Tabla */}
          <div className="flex items-center bg-navy-900 border border-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setVistaModo("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                vistaModo === "grid"
                  ? "bg-gold-500 text-navy-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Cartelera (Grid)
            </button>
            <button
              type="button"
              onClick={() => setVistaModo("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                vistaModo === "table"
                  ? "bg-gold-500 text-navy-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" /> Tabla
            </button>
          </div>
        </section>

        {/* Barra de búsqueda, filtros rápidos y caja de ayuda */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 flex-1">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por título, género, clasificación..."
                className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 w-full"
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
            </div>

            <div className="flex gap-2">
              <select
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
                className="bg-navy-900 border border-white/10 text-slate-300 text-xs rounded-lg px-3 py-2.5 outline-none focus:border-gold-500"
              >
                <option value="todos">Todos los géneros</option>
                {generosDisponibles
                  .filter((g) => g !== "todos")
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>

              <select
                value={filtroClasificacion}
                onChange={(e) => setFiltroClasificacion(e.target.value)}
                className="bg-navy-900 border border-white/10 text-slate-300 text-xs rounded-lg px-3 py-2.5 outline-none focus:border-gold-500"
              >
                <option value="todos">Todas las clasif.</option>
                {clasificacionesDisponibles
                  .filter((c) => c !== "todos")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-navy-900/60 border border-white/5 rounded-lg px-3 py-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-gold-400 shrink-0" />
            Las imágenes mostradas provienen del catálogo oficial compartido con la página de Inicio.
          </div>
        </section>

        {/* VISTA EN CUADRÍCULA (GRID DE PÓSTERS) */}
        {vistaModo === "grid" && (
          <section>
            {peliculasFiltradas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {peliculasFiltradas.map((pelicula) => (
                  <article
                    key={pelicula.id}
                    className="group bg-navy-900 border border-white/10 rounded-2xl overflow-hidden card-glow flex flex-col hover:border-gold-500/40 transition-all duration-300"
                  >
                    {/* Imagen / Poster */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-navy-950">
                      <img
                        src={pelicula.imagen}
                        alt={pelicula.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/img/banner.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/40 opacity-80" />

                      {/* Badges superiores */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        {badgeClasificacion(pelicula.clasificacion)}
                        <span className="bg-navy-950/80 backdrop-blur text-gold-400 text-[11px] font-semibold px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {pelicula.duracion}
                        </span>
                      </div>

                      {/* Estado */}
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-crimson-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                          {pelicula.estado}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gold-400 mb-1">
                          <Tag className="w-3 h-3" />
                          <span>{pelicula.genero}</span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-gold-400 transition-colors line-clamp-1">
                          {pelicula.titulo}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                          {pelicula.sinopsis}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {pelicula.fechaEstreno}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            title="Ver detalles"
                            onClick={() => setModalDetalle(pelicula)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            title="Editar película"
                            onClick={() => abrirModalEditar(pelicula)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            title="Eliminar película"
                            onClick={() => eliminarPelicula(pelicula.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-crimson-600 hover:bg-crimson-500 text-white transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-navy-900 border border-white/5 rounded-2xl p-12 text-center text-slate-400 space-y-3">
                <Film className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-base font-medium text-slate-300">
                  No se encontraron películas que coincidan con los filtros.
                </p>
                <button
                  onClick={() => {
                    setBusqueda("");
                    setFiltroGenero("todos");
                    setFiltroClasificacion("todos");
                  }}
                  className="text-gold-400 text-xs font-semibold hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </section>
        )}

        {/* VISTA EN TABLA */}
        {vistaModo === "table" && (
          <section className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden card-glow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-wider">
                    <th className="text-left px-4 py-3.5">ID</th>
                    <th className="text-left px-4 py-3.5">Póster</th>
                    <th className="text-left px-4 py-3.5">Película</th>
                    <th className="text-left px-4 py-3.5">Género</th>
                    <th className="text-left px-4 py-3.5">Clasificación</th>
                    <th className="text-left px-4 py-3.5">Duración</th>
                    <th className="text-left px-4 py-3.5">Estreno</th>
                    <th className="text-right px-4 py-3.5">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {peliculasFiltradas.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-gold-400 font-semibold">{p.id}</td>
                      <td className="px-4 py-3">
                        <img
                          src={p.imagen}
                          alt={p.titulo}
                          className="w-12 h-16 object-cover rounded border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/img/banner.jpg";
                          }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">{p.titulo}</p>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{p.sinopsis}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{p.genero}</td>
                      <td className="px-4 py-3">{badgeClasificacion(p.clasificacion)}</td>
                      <td className="px-4 py-3 text-slate-300">{p.duracion}</td>
                      <td className="px-4 py-3 text-slate-400">{p.fechaEstreno}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            title="Ver detalles"
                            onClick={() => setModalDetalle(p)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            title="Editar película"
                            onClick={() => abrirModalEditar(p)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 hover:bg-gold-400 text-navy-950 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            title="Eliminar película"
                            onClick={() => eliminarPelicula(p.id)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-crimson-600 hover:bg-crimson-500 text-white transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {peliculasFiltradas.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                        No se encontraron películas que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* MODAL CREAR / EDITAR PELÍCULA */}
      {modalFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto card-glow">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <h3 className="text-lg font-bold text-gold-400">
                  {peliculaEditar ? "Editar Película" : "Nueva Película"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalFormOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={guardarPelicula} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Título de la Película *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titulo}
                    onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    placeholder="Ej. Avatar 3"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Género *
                  </label>
                  <select
                    value={form.genero}
                    onChange={(e) => setForm({ ...form, genero: e.target.value })}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  >
                    <option value="Acción">Acción</option>
                    <option value="Animación">Animación</option>
                    <option value="Biografía">Biografía</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Drama">Drama</option>
                    <option value="Terror">Terror</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Clasificación *
                  </label>
                  <select
                    value={form.clasificacion}
                    onChange={(e) => setForm({ ...form, clasificacion: e.target.value })}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  >
                    <option value="ATP">ATP (Todo Público)</option>
                    <option value="14A">14A (Mayores de 14)</option>
                    <option value="R">R (Adultos)</option>
                    <option value="TBC">TBC (Por Confirmar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Duración *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.duracion}
                    onChange={(e) => setForm({ ...form, duracion: e.target.value })}
                    placeholder="Ej. 115 min"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fecha de Estreno *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.fechaEstreno}
                    onChange={(e) => setForm({ ...form, fechaEstreno: e.target.value })}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estado en Cartelera
                  </label>
                  <select
                    value={form.estado}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        estado: e.target.value as "En Cartelera" | "Próximamente",
                      })
                    }
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                  >
                    <option value="En Cartelera">En Cartelera</option>
                    <option value="Próximamente">Próximamente</option>
                  </select>
                </div>
              </div>

              {/* Selector de Imagen y Previsualización */}
              <div className="border border-white/10 rounded-xl p-4 bg-navy-950/60 space-y-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-gold-400">
                  <ImageIcon className="w-4 h-4" /> Seleccionar Imagen de Cartelera / Inicio
                </label>

                {/* Miniaturas de imágenes disponibles */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {IMAGENES_DISPONIBLES.map((img) => (
                    <button
                      key={img.ruta}
                      type="button"
                      onClick={() => setForm({ ...form, imagen: img.ruta })}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                        form.imagen === img.ruta
                          ? "border-gold-400 ring-2 ring-gold-400/40"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.ruta}
                        alt={img.nombre}
                        className="w-full h-14 object-cover rounded"
                      />
                      <span className="block text-[9px] truncate text-center text-slate-300 mt-0.5">
                        {img.nombre}
                      </span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    O escribe una ruta / URL de imagen personalizada:
                  </label>
                  <input
                    type="text"
                    value={form.imagen}
                    onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                    className="w-full bg-navy-950 border border-white/10 rounded px-3 py-1.5 text-xs text-slate-300 outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sinopsis / Descripción
                </label>
                <textarea
                  rows={3}
                  value={form.sinopsis}
                  onChange={(e) => setForm({ ...form, sinopsis: e.target.value })}
                  placeholder="Escribe un breve resumen de la trama de la película..."
                  className="w-full bg-navy-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalFormOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:bg-white/5 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950 cursor-pointer"
                >
                  {peliculaEditar ? "Guardar Cambios" : "Crear Película"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALLES DE LA PELÍCULA */}
      {modalDetalle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-white/10 rounded-2xl overflow-hidden max-w-2xl w-full card-glow animate-in fade-in zoom-in-95">
            <div className="relative h-48 sm:h-56 bg-navy-950">
              <img
                src={modalDetalle.imagen}
                alt={modalDetalle.titulo}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/img/banner.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
              <button
                type="button"
                onClick={() => setModalDetalle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  {badgeClasificacion(modalDetalle.clasificacion)}
                  <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 px-2 py-0.5 text-[11px] font-bold rounded">
                    {modalDetalle.genero}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {modalDetalle.titulo}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
                  Sinopsis
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {modalDetalle.sinopsis || "Sin sinopsis disponible."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-navy-950/60 p-3 rounded-xl border border-white/5 text-center text-xs">
                <div>
                  <p className="text-slate-400">Duración</p>
                  <p className="text-white font-bold mt-0.5">{modalDetalle.duracion}</p>
                </div>
                <div>
                  <p className="text-slate-400">Estreno</p>
                  <p className="text-white font-bold mt-0.5">{modalDetalle.fechaEstreno}</p>
                </div>
                <div>
                  <p className="text-slate-400">Estado</p>
                  <p className="text-emerald-400 font-bold mt-0.5">{modalDetalle.estado}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const p = modalDetalle;
                    setModalDetalle(null);
                    abrirModalEditar(p);
                  }}
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs rounded-lg cursor-pointer"
                >
                  Editar Película
                </button>
                <button
                  type="button"
                  onClick={() => setModalDetalle(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-lg cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 CINEMANIA · Sistema de Gestión Cinematográfica</p>
          <p>Catálogo de películas y sincronización con taquilla en tiempo real.</p>
        </div>
      </footer>
    </div>
  );
}
