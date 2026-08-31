export const PERMISOS: Record<string, string[]> = {
  administrador: [
    "/dashboard",
    "/dashboard/movies",
    "/dashboard/tasks",
    "/dashboard/shows",
    "/dashboard/sales",
    "/dashboard/users",
    "/dashboard/employees",
    "/dashboard/reports",
  ],
  cajero: [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/sales",
    "/dashboard/tasks",
  ],
  control_acceso: [
    "/dashboard",
    "/dashboard/shows",
  ],
};

export function tieneAcceso(cargo: string, ruta: string): boolean {
  const rutasPermitidas = PERMISOS[cargo] || [];
  return rutasPermitidas.includes(ruta);
}
