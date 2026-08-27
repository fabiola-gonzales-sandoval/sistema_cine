"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("usuario@cine-retro.com");
  const [password, setPassword] = useState("••••••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    router.push("/dashboard");
  };

  const handleGoToRegister = () => {
    router.push("/register");
  };

  return (
    <div
      style={{
        backgroundColor: "#030b1e",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        userSelect: "none",
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display+Condensed:ital,wght@0,400;0,700;0,900;1,400&family=Roboto+Condensed:wght@600;700&display=swap');

        .ticket-container {
          position: relative;
          width: 100%;
          max-width: 860px;
        }

        .ticket-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
          z-index: 1;
          filter: drop-shadow(0px 20px 25px rgba(0, 0, 0, 0.6));
        }

        .ticket-content {
          position: relative;
          z-index: 2;
          padding: 18px;
        }

        .ticket-border {
          border: 1.5px solid #282415;
          padding: 24px 20px 20px 20px;
          display: flex;
        }

        .retro-input {
          background-color: #ebe7c5 !important;
          border: 1px solid #b8b38c !important;
          color: #615d45 !important;
          box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.25) !important;
          border-radius: 20px !important;
          padding: 6px 16px !important;
          font-size: 13px !important;
          outline: none !important;
          width: 100% !important;
          box-sizing: border-box !important;
          font-family: monospace, sans-serif !important;
        }

        .retro-btn {
          background-color: #ba2211 !important;
          border: 1.5px solid #4a0a03 !important;
          box-shadow: 0 3px 5px rgba(0,0,0,0.4) !important;
          color: #ffffff !important;
          font-family: 'Playfair Display Condensed', Georgia, serif !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          letter-spacing: 2px !important;
          padding: 4px 50px !important;
          border-radius: 3px !important;
          cursor: pointer !important;
          transition: background-color 0.2s;
        }

        .retro-btn:hover {
          background-color: #d12613 !important;
        }

        .link-btn {
          background: none;
          border: none;
          color: #16140e;
          text-decoration: underline;
          cursor: pointer;
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          margin-top: 10px;
        }
      `,
        }}
      />

      <main className="ticket-container">
        {/* SVG de Figma como Fondo Unico del Ticket */}
        <img
          src="/ticket-bg.svg"
          alt="Ticket Background"
          className="ticket-bg-image"
        />

        {/* Formulario y Contenido sobre el SVG */}
        <div className="ticket-content">
          <div className="ticket-border">
            {/* Lado Izquierdo */}
            <div style={{ flex: 1, paddingRight: "260px", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "-10px",
                  top: "-10px",
                  bottom: "-10px",
                  borderRight: "1.5px dashed #282415",
                  opacity: 0.7,
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <div style={{ height: "1px", backgroundColor: "#282415", flex: 1 }} />
                <div style={{ color: "#282415", fontSize: "11px", letterSpacing: "4px" }}>☆☆☆☆☆</div>
                <div style={{ height: "1px", backgroundColor: "#282415", flex: 1 }} />
              </div>

              <h1
                style={{
                  textAlign: "center",
                  fontSize: "48px",
                  fontWeight: "700",
                  color: "#16140e",
                  margin: "0",
                  fontFamily: "'Playfair Display Condensed', Georgia, serif",
                  letterSpacing: "1px",
                  lineHeight: "1.1",
                }}
              >
                INICIAR SESIÓN
              </h1>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{ height: "1px", backgroundColor: "#282415", flex: 1 }} />
                <span
                  style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.15em",
                    color: "#282415",
                  }}
                >
                  INSERTE SUS DATOS
                </span>
                <div style={{ height: "1px", backgroundColor: "#282415", flex: 1 }} />
              </div>

              <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 14px 0" }}>
                <svg viewBox="0 0 160 110" style={{ width: "135px", height: "auto" }}>
                  <path d="M80 52 L15 12 L32 7 Z" fill="#b91c1c" />
                  <path d="M80 52 L35 6 L52 2 Z" fill="#facc15" />
                  <path d="M80 52 L57 2 L75 0 Z" fill="#b91c1c" />
                  <path d="M80 52 L80 0 L97 2 Z" fill="#facc15" />
                  <path d="M80 52 L103 2 L120 7 Z" fill="#b91c1c" />
                  <path d="M80 52 L125 9 L140 18 Z" fill="#facc15" />

                  <g transform="rotate(-14 80 48)">
                    <rect x="25" y="38" width="110" height="15" fill="#b91c1c" rx="1" />
                    <polygon points="35,38 46,38 36,53 25,53" fill="#facc15" />
                    <polygon points="60,38 71,38 61,53 50,53" fill="#facc15" />
                    <polygon points="85,38 96,38 86,53 75,53" fill="#facc15" />
                    <polygon points="110,38 121,38 111,53 100,53" fill="#facc15" />
                  </g>

                  <polygon points="28,58 132,58 152,108 8,108" fill="#7f1d1d" />
                  <polygon points="28,58 80,58 80,108 8,108" fill="#b91c1c" />
                  <polygon points="80,58 132,58 152,108 80,108" fill="#991b1b" />
                  <polygon points="40,74 120,74 130,108 30,108" fill="#6b0606" />

                  <text
                    x="80"
                    y="95"
                    fontFamily="'Roboto Condensed', sans-serif"
                    fontWeight="900"
                    fontSize="14"
                    fill="#facc15"
                    textAnchor="middle"
                    letterSpacing="1.5"
                  >
                    CINEMANIA
                  </text>
                </svg>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontFamily: "'Roboto Condensed', sans-serif",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#282415",
                        letterSpacing: "0.05em",
                        marginBottom: "4px",
                      }}
                    >
                      CORREO ELECTRÓNICO
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="retro-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      style={{
                        display: "block",
                        fontFamily: "'Roboto Condensed', sans-serif",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#282415",
                        letterSpacing: "0.05em",
                        marginBottom: "4px",
                      }}
                    >
                      CONTRASEÑA
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="retro-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 16px 0" }}>
                  <svg viewBox="0 0 500 70" style={{ width: "320px", height: "auto" }}>
                    <path
                      d="M 250,35 C 235,15 210,5 185,20 C 160,35 140,15 120,25 C 100,35 80,20 60,30 C 40,40 20,25 0,35 C 20,45 40,30 60,40 C 80,50 100,35 120,45 C 140,55 160,35 185,50 C 210,65 235,55 250,35 Z"
                      fill="#c91a1a"
                    />
                    <path
                      d="M 250,35 C 265,15 290,5 315,20 C 340,35 360,15 380,25 C 400,35 420,20 440,30 C 460,40 480,25 500,35 C 480,45 460,30 440,40 C 420,50 400,35 380,45 C 360,55 340,35 315,50 C 290,65 265,55 250,35 Z"
                      fill="#c91a1a"
                    />
                    <circle cx="250" cy="35" r="7" fill="#e02424" />
                    <circle cx="225" cy="35" r="4" fill="#a81111" />
                    <circle cx="275" cy="35" r="4" fill="#a81111" />
                    <circle cx="200" cy="35" r="3" fill="#c91a1a" />
                    <circle cx="300" cy="35" r="3" fill="#c91a1a" />
                  </svg>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <button type="submit" className="retro-btn">
                    ENTRAR
                  </button>

                  <button
                    type="button"
                    className="link-btn"
                    onClick={handleGoToRegister}
                  >
                    ¿No tienes cuenta? Regístrate aquí
                  </button>
                </div>
              </form>
            </div>

            {/* Lado Derecho */}
            <div
              style={{
                width: "155px",
                borderLeft: "1.5px solid #282415",
                paddingLeft: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#282415",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                    fontSize: "8.5px",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    lineHeight: "1.2",
                    margin: "0 0 2px 0",
                  }}
                >
                  SANTA CRUZ DE LA SIERRA
                </p>
                <div style={{ fontSize: "10px" }}>☆</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontFamily: "'Playfair Display Condensed', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  margin: "8px 0",
                }}
              >
                <span style={{ fontSize: "12px", marginBottom: "2px" }}>★</span>
                <span>1</span>
                <span>8</span>
                <span style={{ opacity: 0.4, fontSize: "14px", margin: "-2px 0" }}>/</span>
                <span>0</span>
                <span>8</span>
                <span style={{ opacity: 0.4, fontSize: "14px", margin: "-2px 0" }}>/</span>
                <span>2</span>
                <span>0</span>
                <span>2</span>
                <span>6</span>
                <span style={{ fontSize: "12px", marginTop: "2px" }}>★</span>
              </div>

              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <svg viewBox="0 0 90 32" style={{ width: "80px", height: "auto" }}>
                  <rect x="0" y="0" width="2.5" height="32" fill="#282415" />
                  <rect x="4" y="0" width="1" height="32" fill="#282415" />
                  <rect x="7" y="0" width="2" height="32" fill="#282415" />
                  <rect x="11" y="0" width="3.5" height="32" fill="#282415" />
                  <rect x="16" y="0" width="1" height="32" fill="#282415" />
                  <rect x="19" y="0" width="2.5" height="32" fill="#282415" />
                  <rect x="23" y="0" width="1.5" height="32" fill="#282415" />
                  <rect x="26" y="0" width="4" height="32" fill="#282415" />
                  <rect x="32" y="0" width="1" height="32" fill="#282415" />
                  <rect x="35" y="0" width="2.5" height="32" fill="#282415" />
                  <rect x="39" y="0" width="1.5" height="32" fill="#282415" />
                  <rect x="42" y="0" width="3.5" height="32" fill="#282415" />
                  <rect x="47" y="0" width="1" height="32" fill="#282415" />
                  <rect x="50" y="0" width="2.5" height="32" fill="#282415" />
                  <rect x="54" y="0" width="1.5" height="32" fill="#282415" />
                  <rect x="57" y="0" width="3.5" height="32" fill="#282415" />
                  <rect x="62" y="0" width="1" height="32" fill="#282415" />
                  <rect x="65" y="0" width="2.5" height="32" fill="#282415" />
                  <rect x="69" y="0" width="1.5" height="32" fill="#282415" />
                  <rect x="72" y="0" width="4" height="32" fill="#282415" />
                  <rect x="78" y="0" width="1.5" height="32" fill="#282415" />
                  <rect x="81" y="0" width="2.5" height="32" fill="#282415" />
                  <rect x="85" y="0" width="1.5" height="32" fill="#282415" />
                  <rect x="88" y="0" width="2" height="32" fill="#282415" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}