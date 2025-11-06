import { Outlet, NavLink } from "react-router";
import { useState, useEffect } from "react";

const PortafolioLayout = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progreso, setProgreso] = useState(0);

  // Efecto de carga inicial con barra de progreso
  useEffect(() => {
    const interval = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCargando(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Efecto de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { nombre: "Inicio", ruta: "/", icon: "🏠" },
    { nombre: "Proyectos", ruta: "/proyectos", icon: "💼" },
    { nombre: "Sobre Mí", ruta: "/sobre-mi", icon: "👨‍💻" },
    { nombre: "Contacto", ruta: "/contacto", icon: "📧" },
  ];

  // Pantalla de carga moderna y profesional
  if (cargando) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Partículas animadas de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-10 -left-20"></div>
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-10 -right-20 animation-delay-2000"></div>
          <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 animation-delay-1000"></div>
        </div>

        <div className="text-center z-10 px-4">
          {/* Logo/Avatar con animación */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 bg-slate-900 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                RR
              </div>
            </div>
          </div>

          {/* Nombre con efecto de aparición */}
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 animate-fade-in">
            Ricardo Reyes
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-fade-in animation-delay-500">
            Full Stack Developer
          </p>

          {/* Barra de progreso moderna */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progreso}%` }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <p className="text-center text-purple-300 mt-3 text-sm font-semibold">
              Cargando {progreso}%
            </p>
          </div>

          {/* Puntos de carga animados */}
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>

          {/* Texto adicional */}
          <p className="text-gray-400 text-sm animate-pulse">
            Preparando tu experiencia...
          </p>
        </div>

        {/* Efecto de grid en el fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 overflow-x-hidden flex flex-col">
      {/* Botón flotante de WhatsApp (solo móviles) */}
      <a
        href="https://wa.me/19299337264"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 transform hover:scale-110 md:hidden animate-bounce"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Header */}
      <header
        className={`bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra superior con nombre y menú */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative shrink-0">
                <div
                  className={`bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 p-1 rounded-full shadow-xl transition-all duration-300 ${
                    scrolled ? "w-12 h-12" : "w-14 h-14 sm:w-16 sm:h-16"
                  }`}
                >
                  <img
                    src="/foto.png"
                    alt="Ricardo Andrés Reyes Casanova"
                    className="w-full h-full rounded-full object-cover"
                    style={{
                      imageRendering: "-webkit-optimize-contrast",
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h1
                  className={`font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                    scrolled
                      ? "text-lg sm:text-xl"
                      : "text-xl sm:text-2xl lg:text-3xl"
                  }`}
                >
                  Ricardo Reyes
                </h1>
                <p
                  className={`text-gray-600 font-medium transition-all duration-300 ${
                    scrolled ? "text-xs" : "text-sm sm:text-base"
                  }`}
                >
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* Menú Desktop */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.ruta}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`
                  }
                  end={item.ruta === "/"}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.nombre}</span>
                </NavLink>
              ))}
            </nav>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-indigo-50 transition-colors"
              aria-label="Abrir menú"
            >
              {menuAbierto ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Menú Móvil Desplegable */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              menuAbierto ? "max-h-96 mt-4" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col gap-2 pb-4">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.ruta}
                  onClick={() => setMenuAbierto(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 ${
                      isActive
                        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`
                  }
                  end={item.ruta === "/"}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.nombre}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-linear-to-r from-slate-700 to-slate-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1">
                  ¿Necesitas ayuda para tu negocio?
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Transforma tu negocio con soluciones web modernas y
                  escalables. Desarrollos personalizados que impulsan tu
                  productividad y crecimiento digital.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Ricardo Andrés Reyes Casanova. Todos
              los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortafolioLayout;
