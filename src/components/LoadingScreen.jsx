import React from "react";

const LoadingScreen = ({ tipo = "default", mensaje = "Cargando..." }) => {
  // Pantalla tipo 1: Spinner con gradiente (Default)
  if (tipo === "default" || tipo === "spinner") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-10 -left-20"></div>
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-10 -right-20 animation-delay-2000"></div>
        </div>
        <div className="text-center z-10 px-4">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 bg-slate-900 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                RR
              </div>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
            {mensaje}
          </h2>
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla tipo 2: Círculos pulsantes
  if (tipo === "circles") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        <div className="text-center z-10 px-4">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 border-8 border-blue-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border-8 border-purple-500/30 rounded-full animate-ping animation-delay-500"></div>
            <div className="absolute inset-8 border-8 border-pink-500/30 rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                RR
              </div>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
            {mensaje}
          </h2>
          <p className="text-blue-200 animate-pulse">Preparando contenido...</p>
        </div>
      </div>
    );
  }

  // Pantalla tipo 3: Barras animadas
  if (tipo === "bars") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
        <div className="text-center z-10 px-4">
          <div className="flex gap-3 mb-8 justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"
                style={{
                  height: `${60 + i * 15}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
            {mensaje}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla tipo 4: Cubo 3D
  if (tipo === "cube") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse top-0 left-0"></div>
          <div className="absolute w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse bottom-0 right-0 animation-delay-1000"></div>
        </div>
        <div className="text-center z-10 px-4">
          <div className="relative w-32 h-32 mx-auto mb-8 perspective-1000">
            <div className="w-full h-full relative animate-spin-slow preserve-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg opacity-80 shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg opacity-60 shadow-2xl transform rotate-45"></div>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
            {mensaje}
          </h2>
          <div className="mt-6 flex justify-center gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-8 bg-gradient-to-t from-violet-500 to-fuchsia-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Pantalla tipo 5: Ondas
  if (tipo === "waves") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-4 border-cyan-400/20 rounded-full animate-ping"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: "3s",
              }}
            ></div>
          ))}
        </div>
        <div className="text-center z-10 px-4">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse shadow-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
              RR
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
            {mensaje}
          </h2>
          <div className="relative h-2 w-64 mx-auto mt-6 bg-gray-800/50 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 animate-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla tipo 6: Partículas
  if (tipo === "particles") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="text-center z-10 px-4">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl animate-spin-slow shadow-2xl"></div>
            <div className="absolute inset-2 bg-emerald-900 rounded-xl flex items-center justify-center">
              <span className="text-white text-3xl font-bold">RR</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
            {mensaje}
          </h2>
          <p className="text-emerald-200 animate-pulse mt-4">
            Cargando experiencia única...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingScreen;
