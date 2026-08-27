'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Playfair_Display, Space_Mono } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export default function Home() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem('userEmail', email);
    if (isRegister && name) {
      localStorage.setItem('userName', name);
    }
    localStorage.setItem('isAuthenticated', 'true');

    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  const barWidths = [2, 2, 4, 2, 3, 2, 4, 2, 2, 3, 4, 2, 2, 3, 2, 4, 2, 2, 3, 4];

  return (
    <main
      className={`${playfair.variable} ${spaceMono.variable} font-[family-name:var(--font-mono)] min-h-screen w-full flex items-center justify-center bg-[#03091e] px-4 py-10`}
    >
      <div className="relative w-full max-w-[1250px]">
        {/* Imagen SVG de fondo */}
        <img
          src="/ticket-bg.svg"
          alt="Ticket background"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 drop-shadow-[0_40px_70px_rgba(0,0,0,0.8)]"
        />

        {/* Contenido principal sobrepuesto sin bordes duplicados sobrantes */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_210px] text-[#1a1813] p-6 sm:p-10 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_210px] col-span-full">
            
            {/* Panel principal */}
            <div className="px-8 sm:px-12 md:px-16 py-10 md:py-12">
              <div className="flex justify-center gap-2 mb-3 text-[#1a1813] text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStarRegular} className="h-3.5 w-3.5" />
                ))}
              </div>

              {/* Título dinámico */}
              <div className="flex items-center gap-4 mb-3">
                <hr className="flex-1 border-t border-[#1a1813]" />
                <h1 className="font-[family-name:var(--font-playfair)] font-black text-3xl sm:text-5xl md:text-6xl text-[#1a1813] tracking-wider whitespace-nowrap uppercase">
                  {isRegister ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
                </h1>
                <hr className="flex-1 border-t border-[#1a1813]" />
              </div>

              {/* Logo Cinemania */}
              <div className="flex justify-center my-6">
                <img
                  src="/logo.svg"
                  alt="Logo Cinemania"
                  className="h-32 w-auto object-contain"
                  style={{
                    filter: "invert(18%) sepia(85%) saturate(5431%) hue-rotate(352deg) brightness(88%) contrast(115%)"
                  }}
                />
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className={`grid grid-cols-1 ${isRegister ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-5 mb-8`}>
                  
                  {/* Campo Nombre (solo en Registro) */}
                  {isRegister && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-[0.15em] font-extrabold text-[#1a1813] mb-2"
                      >
                        NOMBRE COMPLETO
                      </label>
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1813]/50"
                        />
                        <input
                          id="name"
                          type="text"
                          required={isRegister}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Juan Pérez"
                          className="w-full rounded-full border border-[#1a1813]/30 bg-[#e3dfca] pl-10 pr-4 py-3 text-sm text-[#1a1813] placeholder-[#1a1813]/50 outline-none transition focus:border-[#b01e14] focus:ring-1 focus:ring-[#b01e14]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Campo Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs tracking-[0.15em] font-extrabold text-[#1a1813] mb-2"
                    >
                      CORREO ELECTRÓNICO
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1813]/50"
                      />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@cine-retro.com"
                        className="w-full rounded-full border border-[#1a1813]/30 bg-[#e3dfca] pl-10 pr-4 py-3 text-sm text-[#1a1813] placeholder-[#1a1813]/50 outline-none transition focus:border-[#b01e14] focus:ring-1 focus:ring-[#b01e14]"
                      />
                    </div>
                  </div>

                  {/* Campo Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-xs tracking-[0.15em] font-extrabold text-[#1a1813] mb-2"
                    >
                      CONTRASEÑA
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1813]/50"
                      />
                      <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••"
                        className="w-full rounded-full border border-[#1a1813]/30 bg-[#e3dfca] pl-10 pr-4 py-3 text-sm text-[#1a1813] placeholder-[#1a1813]/50 outline-none transition focus:border-[#b01e14] focus:ring-1 focus:ring-[#b01e14]"
                      />
                    </div>
                  </div>
                </div>

                {/* Divisor */}
                <div className="flex justify-center mb-8">
                  <svg viewBox="0 0 460 90" className="w-full max-w-[420px] h-auto">
                    <g fill="none" stroke="#b01e14" strokeWidth="2.5">
                      <path
                        d="M230 10 C220 30 220 45 230 60 C240 45 240 30 230 10 Z"
                        fill="#b01e14"
                        stroke="none"
                      />
                      <path d="M230 20 Q160 10 120 35 Q90 10 40 25 Q10 35 5 45" />
                      <path d="M230 20 Q300 10 340 35 Q370 10 420 25 Q450 35 455 45" />
                      <path d="M230 25 Q190 20 165 40" />
                      <path d="M230 25 Q270 20 295 40" />
                    </g>
                  </svg>
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="block w-full max-w-[360px] mx-auto rounded-sm border border-[#1a1813] bg-[#b01e14] hover:bg-[#8e170f] py-3.5 font-[family-name:var(--font-playfair)] font-bold text-lg tracking-[0.2em] text-[#f2cc43] shadow-[0_4px_0_#1a1813] transition active:translate-y-0.5 active:shadow-[0_2px_0_#1a1813] disabled:opacity-60 cursor-pointer"
                >
                  {loading
                    ? 'PROCESANDO...'
                    : isRegister
                    ? 'REGISTRARSE E INGRESAR'
                    : 'ENTRAR'}
                </button>
              </form>

              {/* Alternar modo */}
              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs sm:text-sm text-[#1a1813]/80 underline font-bold hover:text-[#b01e14] transition cursor-pointer"
                >
                  {isRegister
                    ? 'Iniciar sesión aquí'
                    : 'Regístrarse aquí'}
                </button>
              </div>
            </div>

            {/* Talón del boleto */}
            <div className="stub-panel flex md:flex-col flex-row items-center justify-between px-6 md:px-6 py-6 md:py-10 border-t md:border-t-0 md:border-l border-[#1a1813]">
              <div className="text-[10px] tracking-wider font-extrabold text-center text-[#1a1813] leading-tight">
                SANTA CRUZ
                <br />
                DE LA SIERRA
              </div>

              <FontAwesomeIcon icon={faStarRegular} className="h-4 w-4 text-[#1a1813] my-1" />
              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-[#1a1813] my-1" />

              <div className="stub-date font-bold text-lg text-[#1a1813] tracking-[0.4em]">
                18/08/2026
              </div>

              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-[#1a1813] my-1" />

              <div className="flex items-end gap-[2px] h-10 mt-1" aria-hidden="true">
                {barWidths.map((w, i) => (
                  <span
                    key={i}
                    className="bg-[#1a1813]"
                    style={{ width: `${w + 1}px`, height: i % 5 === 0 ? '70%' : '100%' }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .stub-date {
          writing-mode: horizontal-tb;
        }
        @media (min-width: 768px) {
          .stub-date {
            writing-mode: vertical-rl;
            text-orientation: upright;
          }
        }
      `}</style>
    </main>
  );
}