"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("Juan Pérez");
  const [email, setEmail] = useState("usuario@cine-retro.com");
  const [password, setPassword] = useState("••••••••••••••••");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    router.push("/dashboard");
  };

  return (
    <div style={{ backgroundColor: "#030b1e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <main className="ticket-wrapper">
        <div className="ticket-border">
          <div style={{ flex: 1, paddingRight: "24px" }}>
            
            {/* Encabezado sin botones de pestañas */}
            <h1 style={{ textAlign: "center", fontSize: "44px", fontWeight: "700", color: "#16140e", margin: "0 0 16px 0", fontFamily: "'Playfair Display Condensed', Georgia, serif" }}>
              CREAR CUENTA
            </h1>

            {/* Logo Cinemania */}
            <div className="flex justify-center my-4">
              <img
                src="/logo.svg"
                alt="Logo Cinemania"
                className="h-28 w-auto object-contain"
                style={{
                  filter: "invert(18%) sepia(85%) saturate(5431%) hue-rotate(352deg) brightness(88%) contrast(115%)"
                }}
              />
            </div>

            {/* Formulario de 3 Campos */}
            <form onSubmit={handleRegister}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#282415", marginBottom: "4px" }}>
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    className="retro-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#282415", marginBottom: "4px" }}>
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    className="retro-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#282415", marginBottom: "4px" }}>
                    CONTRASEÑA
                  </label>
                  <input
                    type="password"
                    className="retro-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Botón Principal y Enlace inferior */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <button type="submit" className="retro-btn">
                  REGISTRARSE E INGRESAR
                </button>

                <button
                  type="button"
                  className="link-btn"
                  onClick={() => router.push("/login")}
                  style={{ marginTop: "12px", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", color: "#282415", fontWeight: "700" }}
                >
                  ¿ Ya tienes cuenta ? Inicia sesión aquí
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}