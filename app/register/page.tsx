
export default function Register() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <div>
            <form action="">
              {/* entradas del usuario */}
              <input type="text" placeholder="Nombre" />
              <input type="text" placeholder="Apellido" />
              <input type="email" placeholder="Correo" />
              <input type="text" placeholder="Usuario" />
              <input type="password" placeholder="Contraseña" />
              <input type="password" placeholder="Confirma tu contraseña" />
              {/* boton de registro */}
              <button>Registrarse</button>
            </form>
          </div>
          <div>
            <h1>Este es el registrar de la pagina</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
