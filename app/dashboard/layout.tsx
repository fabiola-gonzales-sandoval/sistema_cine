import React from "react";
import "../globals.css"


export default function DashboardLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <main className="bg-slate-50 min-h-full">{children}</main>
  );
}
