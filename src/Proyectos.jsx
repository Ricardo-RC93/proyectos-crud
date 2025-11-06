import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import LoadingScreen from "./components/LoadingScreen";

const Proyectos = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return <LoadingScreen tipo="bars" mensaje="Cargando Proyectos" />;
  }

  const proyectos = [
    {
      nombre: "Sistema de Ventas",
      descripcion:
        "Gestión completa de ventas y productos con interfaz intuitiva",
      ruta: "/apps/ventas",
      tecnologias: ["React", "Tailwind", "API REST"],
      color: "from-blue-600 to-cyan-600",
      imagen: "🛒",
    },
    {
      nombre: "Gestión Colegio",
      descripcion: "Administración de estudiantes y datos académicos",
      ruta: "/apps/colegio",
      tecnologias: ["React", "Forms", "SweetAlert2"],
      color: "from-indigo-600 to-purple-600",
      imagen: "🎓",
    },
    {
      nombre: "Sistema Librería",
      descripcion: "Control de inventario y catálogo de libros",
      ruta: "/apps/libreria",
      tecnologias: ["React", "CRUD", "MongoDB"],
      color: "from-emerald-600 to-teal-600",
      imagen: "📚",
    },
    {
      nombre: "Gestión de Libros",
      descripcion: "CRUD completo para administración de libros",
      ruta: "/apps/libros",
      tecnologias: ["React", "API", "Validación"],
      color: "from-green-600 to-lime-600",
      imagen: "📖",
    },
    {
      nombre: "Ventas Axios",
      descripcion: "Sistema de ventas con integración API usando Axios",
      ruta: "/apps/ventas-axios",
      tecnologias: ["React", "Axios", "REST API"],
      color: "from-orange-600 to-red-600",
      imagen: "📊",
    },
    {
      nombre: "Ventas CRUD",
      descripcion:
        "Operaciones completas de ventas (Create, Read, Update, Delete)",
      ruta: "/apps/ventas-crud",
      tecnologias: ["React", "CRUD", "Express"],
      color: "from-pink-600 to-rose-600",
      imagen: "💼",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Mis Proyectos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Una colección de aplicaciones web desarrolladas con tecnologías
            modernas. Cada proyecto demuestra habilidades específicas en
            desarrollo Full Stack.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {proyectos.length}
            </div>
            <div className="text-gray-600 font-medium">
              Proyectos Completados
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-emerald-500">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              React
            </div>
            <div className="text-gray-600 font-medium">Framework Principal</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-purple-500">
            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Responsive Design</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {proyectos.map((proyecto, index) => (
            <NavLink key={index} to={proyecto.ruta} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-indigo-200">
                {/* Header con gradiente */}
                <div
                  className={`bg-linear-to-r ${proyecto.color} p-8 text-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="text-6xl mb-2 relative z-10">
                    {proyecto.imagen}
                  </div>
                  <h3 className="text-xl font-bold text-white relative z-10">
                    {proyecto.nombre}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {proyecto.descripcion}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.tecnologias.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-500 group-hover:text-indigo-600 transition-colors">
                      Ver Proyecto
                    </span>
                    <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
            Cada proyecto es único. Hablemos sobre cómo puedo ayudarte a
            alcanzar tus objetivos digitales.
          </p>
          <a
            href="mailto:andres07172@gmail.com"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contactar Ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
