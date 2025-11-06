import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

const Contacto = () => {
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return <LoadingScreen tipo="waves" mensaje="Conectando..." />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el enlace mailto con los datos del formulario
    const mailtoLink = `mailto:andres07172@gmail.com?subject=${encodeURIComponent(
      formData.asunto
    )}&body=${encodeURIComponent(
      `Nombre: ${formData.nombre}\nEmail: ${formData.email}\n\nMensaje:\n${formData.mensaje}`
    )}`;

    // Abrir el cliente de correo
    window.location.href = mailtoLink;

    // Mostrar mensaje de éxito
    setEnviado(true);

    // Limpiar formulario
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setEnviado(false);
    }, 5000);
  };

  const metodos = [
    {
      titulo: "Email",
      valor: "andres07172@gmail.com",
      icon: "📧",
      link: "mailto:andres07172@gmail.com",
      color: "from-blue-500 to-indigo-600",
    },
    {
      titulo: "WhatsApp",
      valor: "+1 (929) 933-7264",
      icon: "💬",
      link: "https://wa.me/19299337264",
      color: "from-green-500 to-emerald-600",
    },
    {
      titulo: "GitHub",
      valor: "@Ricardo-RC93",
      icon: "💻",
      link: "https://github.com/Ricardo-RC93",
      color: "from-gray-600 to-gray-800",
    },
    {
      titulo: "LinkedIn",
      valor: "Ricardo Reyes",
      icon: "💼",
      link: "https://www.linkedin.com/in/ricardo-andres-reyes-casanova-b1bb54161/",
      color: "from-blue-600 to-blue-800",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Contáctame
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? ¿Necesitas ayuda con tu desarrollo
            web? Estoy disponible para nuevas oportunidades y colaboraciones.
          </p>
        </div>

        {/* Métodos de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {metodos.map((metodo, index) => (
            <a
              key={index}
              href={metodo.link}
              target={metodo.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className={`bg-linear-to-r ${metodo.color} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="text-4xl mb-3">{metodo.icon}</div>
                <h3 className="font-bold text-lg mb-2">{metodo.titulo}</h3>
                <p className="text-sm opacity-90 wrap-break-word">
                  {metodo.valor}
                </p>
                <div className="mt-4 flex items-center text-sm font-semibold">
                  <span>Contactar</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
            </a>
          ))}
        </div>

        {/* Formulario y Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Envía un Mensaje
            </h2>

            {enviado && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">¡Mensaje enviado!</p>
                <p className="text-sm">
                  Tu cliente de correo se abrirá para completar el envío.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Asunto */}
              <div>
                <label
                  htmlFor="asunto"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Asunto *
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="¿De qué quieres hablar?"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                ></textarea>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Información Adicional */}
          <div className="space-y-8">
            {/* Ubicación */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-4 rounded-xl">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Ubicación
                  </h3>
                  <p className="text-gray-600">
                    Disponible para trabajo remoto
                    <br />
                    Horario flexible
                  </p>
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Disponibilidad
                  </h3>
                  <p className="text-gray-600">
                    Actualmente disponible
                    <br />
                    Respuesta en 24-48 horas
                  </p>
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <svg
                    className="w-8 h-8 text-purple-600"
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Servicios
                  </h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Desarrollo Web Full Stack</li>
                    <li>• Diseño Responsive</li>
                    <li>• Integración de APIs</li>
                    <li>• Consultoría Técnica</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Prefieres contactarme directamente?
          </h2>
          <p className="text-lg text-indigo-100 mb-6">
            Elige tu método de contacto favorito
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/19299337264"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:andres07172@gmail.com"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
