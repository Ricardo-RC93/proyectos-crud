import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

const SobreMi = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return <LoadingScreen tipo="cube" mensaje="Conociendo a Ricardo" />;
  }

  const experiencias = [
    {
      titulo: "Desarrollo Full Stack",
      descripcion:
        "Experiencia en construcción de aplicaciones web completas usando React, Node.js y MongoDB",
      icon: "💻",
    },
    {
      titulo: "Diseño Responsive",
      descripcion:
        "Creación de interfaces adaptables para todos los dispositivos usando Tailwind CSS",
      icon: "📱",
    },
    {
      titulo: "API REST",
      descripcion:
        "Integración y desarrollo de APIs RESTful para comunicación eficiente entre frontend y backend",
      icon: "🔌",
    },
    {
      titulo: "Control de Versiones",
      descripcion:
        "Gestión de código fuente con Git y GitHub para trabajo colaborativo",
      icon: "🔄",
    },
  ];

  const valores = [
    {
      titulo: "Calidad",
      descripcion: "Código limpio y mantenible",
      icon: "⭐",
    },
    {
      titulo: "Innovación",
      descripcion: "Siempre aprendiendo nuevas tecnologías",
      icon: "🚀",
    },
    {
      titulo: "Compromiso",
      descripcion: "Dedicación total a cada proyecto",
      icon: "💪",
    },
    {
      titulo: "Comunicación",
      descripcion: "Trabajo colaborativo efectivo",
      icon: "💬",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Foto */}
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-2">
                <img
                  src="/foto.png"
                  alt="Ricardo Andrés Reyes Casanova"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Disponible
              </div>
            </div>

            {/* Texto */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Ricardo Andrés Reyes Casanova
              </h1>
              <p className="text-xl sm:text-2xl text-indigo-100 mb-6">
                Full Stack Developer | Creador de Soluciones Digitales
              </p>
              <p className="text-lg text-indigo-50 leading-relaxed max-w-2xl">
                Apasionado por transformar ideas en aplicaciones web funcionales
                y atractivas. Especializado en React, Node.js y tecnologías
                modernas de desarrollo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                Mi Historia
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Como desarrollador Full Stack, me especializo en crear
                  experiencias web que combinan funcionalidad robusta con diseño
                  intuitivo. Mi enfoque está en entregar soluciones que
                  realmente resuelvan problemas.
                </p>
                <p>
                  Con experiencia en React, Node.js, MongoDB y otras tecnologías
                  modernas, desarrollo aplicaciones escalables que se adaptan a
                  las necesidades del negocio.
                </p>
                <p>
                  Mi objetivo es seguir creciendo como profesional mientras
                  ayudo a empresas y emprendedores a materializar sus ideas en
                  productos digitales exitosos.
                </p>
              </div>
            </div>

            {/* Experiencias */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {experiencias.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-500"
                >
                  <div className="text-4xl mb-3">{exp.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {exp.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">{exp.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Mis Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Principios que guían mi trabajo y definen mi enfoque profesional
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{valor.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Progress */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
            Nivel de Habilidades
          </h2>

          <div className="space-y-8">
            {/* React */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">React</span>
                <span className="font-semibold text-indigo-600">90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>

            {/* JavaScript */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">JavaScript</span>
                <span className="font-semibold text-yellow-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            {/* Node.js */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">Node.js</span>
                <span className="font-semibold text-green-600">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            {/* Tailwind CSS */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  Tailwind CSS
                </span>
                <span className="font-semibold text-cyan-600">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-3 rounded-full"
                  style={{ width: "88%" }}
                ></div>
              </div>
            </div>

            {/* MongoDB */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">MongoDB</span>
                <span className="font-semibold text-emerald-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            {/* Git */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  Git & GitHub
                </span>
                <span className="font-semibold text-gray-600">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-gray-600 to-gray-800 h-3 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Trabajamos juntos?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Estoy disponible para proyectos freelance y oportunidades de
            colaboración. ¡Conversemos sobre tu próxima gran idea!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:andres07172@gmail.com"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Enviar Email
            </a>
            <a
              href="https://wa.me/19299337264"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreMi;
