import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PieColegio from "./components/PieColegio";
import ColegioCabecera from "./components/ColegioCabecera";
const Colegio = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [estudianteEditando, setEstudianteEditando] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  const [formulario, setFormulario] = useState({
    studentCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    enrollmentDate: "",
    status: "active",
    emergencyContact: "",
    emergencyPhone: "",
    image: "",
  });

  // Obtener estudiantes
  const getEstudiantes = async () => {
    try {
      const response = await axios.get(
        "https://api-express-tienda.jspadev.com/api/v1/students"
      );
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  useEffect(() => {
    getEstudiantes();
  }, []);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Manejar imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
        setFormulario({ ...formulario, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormulario({
      studentCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      enrollmentDate: "",
      status: "active",
      emergencyContact: "",
      emergencyPhone: "",
      image: "",
    });
    setImagenPreview(null);
    setEstudianteEditando(null);
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Agarra el formulario de arriba y lo mete a un fordata
     y ese recorrido lo hace para recorrer el formulario para meterlo adentro
     esto se usa para imagen*/
    const formData = new FormData();
    for (const key in formulario) {
      formData.append(key, formulario[key]);
    }
    try {
      if (estudianteEditando) {
        // Actualizar estudiante
        await axios.put(
          `https://api-express-tienda.jspadev.com/api/v1/students/${estudianteEditando.id}`,
          formData
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estudiante actualizado exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Crear estudiante
        await axios.post(
          "https://api-express-tienda.jspadev.com/api/v1/students",
          formData
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estudiante registrado exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      getEstudiantes();
      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al guardar estudiante:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar el estudiante",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Editar estudiante
  const editarEstudiante = (estudiante) => {
    setEstudianteEditando(estudiante);
    setFormulario({
      studentCode: estudiante.studentCode || "",
      firstName: estudiante.firstName || "",
      lastName: estudiante.lastName || "",
      email: estudiante.email || "",
      phone: estudiante.phone || "",
      dateOfBirth: estudiante.dateOfBirth || "",
      address: estudiante.address || "",
      enrollmentDate: estudiante.enrollmentDate || "",
      status: estudiante.status || "active",
      emergencyContact: estudiante.emergencyContact || "",
      emergencyPhone: estudiante.emergencyPhone || "",
      image: estudiante.image || "",
    });
    setImagenPreview(
      "https://api-express-tienda.jspadev.com" + estudiante.image || null
    );
    setMostrarFormulario(true);
  };

  // Eliminar estudiante
  const eliminarEstudiante = async (id) => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `https://api-express-tienda.jspadev.com/api/v1/students/${id}`
          );
          getEstudiantes();
          Swal.fire({
            title: "¡Eliminado!",
            text: "El estudiante ha sido eliminado exitosamente",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el estudiante",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Obtener color del badge según status
  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-300",
      inactive: "bg-gray-100 text-gray-800 border-gray-300",
      graduated: "bg-blue-100 text-blue-800 border-blue-300",
      suspended: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || colors.active;
  };

  const getStatusText = (status) => {
    const texts = {
      active: "Activo",
      inactive: "Inactivo",
      graduated: "Graduado",
      suspended: "Suspendido",
    };
    return texts[status] || status;
  };

  return (
    <>
      <ColegioCabecera />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-t-4 border-blue-600">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-4 rounded-xl shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    Gestión de Estudiantes
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Control y administración del registro estudiantil
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMostrarFormulario(!mostrarFormulario);
                  if (mostrarFormulario) limpiarFormulario();
                }}
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                title={
                  mostrarFormulario
                    ? "Cerrar formulario"
                    : "Agregar nuevo estudiante"
                }
              >
                {mostrarFormulario ? (
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Formulario */}
          {mostrarFormulario && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                {estudianteEditando ? "Editar Estudiante" : "Nuevo Estudiante"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Foto del estudiante */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-dashed border-blue-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Fotografía del Estudiante
                  </label>
                  <div className="flex items-center gap-6">
                    {imagenPreview ? (
                      <div className="relative">
                        <img
                          src={imagenPreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-xl shadow-lg border-4 border-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagenPreview(null);
                            setFormulario({ ...formulario, image: "" });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
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
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="cursor-pointer">
                        <div className="bg-white hover:bg-blue-50 border-2 border-blue-300 rounded-lg px-6 py-4 text-center transition-all duration-300 hover:border-blue-500">
                          <svg
                            className="w-8 h-8 text-blue-600 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-blue-600 font-medium">
                            Seleccionar Imagen
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG hasta 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Información Personal */}
                <div className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Código de Estudiante{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentCode"
                        value={formulario.studentCode}
                        onChange={handleChange}
                        placeholder="EST2024001"
                        required
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombres <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formulario.firstName}
                        onChange={handleChange}
                        placeholder="Juan"
                        required
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellidos <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formulario.lastName}
                        onChange={handleChange}
                        placeholder="Pérez"
                        required
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formulario.email}
                        onChange={handleChange}
                        placeholder="juan.perez@example.com"
                        required
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formulario.phone}
                        onChange={handleChange}
                        placeholder="+593 99 123 4567"
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formulario.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formulario.address}
                        onChange={handleChange}
                        placeholder="Av. Principal 123"
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Información Académica */}
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Información Académica
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha de Matrícula
                      </label>
                      <input
                        type="date"
                        name="enrollmentDate"
                        value={formulario.enrollmentDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado
                      </label>
                      <select
                        name="status"
                        value={formulario.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                      >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="graduated">Graduado</option>
                        <option value="suspended">Suspendido</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contacto de Emergencia */}
                <div className="bg-linear-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Contacto de Emergencia
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Contacto
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formulario.emergencyContact}
                        onChange={handleChange}
                        placeholder="María Pérez"
                        className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono de Emergencia
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formulario.emergencyPhone}
                        onChange={handleChange}
                        placeholder="+593 99 987 6543"
                        className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {estudianteEditando
                      ? "Actualizar Estudiante"
                      : "Registrar Estudiante"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      limpiarFormulario();
                      setMostrarFormulario(false);
                    }}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all duration-300 flex items-center gap-2"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tabla de Estudiantes */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Lista de Estudiantes ({estudiantes.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Foto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Estudiante
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Emergencia
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {estudiantes.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-gray-100 p-4 rounded-full">
                            <svg
                              className="w-12 h-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-500 font-medium">
                            No hay estudiantes registrados
                          </p>
                          <p className="text-gray-400 text-sm">
                            Haz clic en el botón + para agregar el primer
                            estudiante
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    estudiantes.map((estudiante) => (
                      <tr
                        key={estudiante.id}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          {estudiante.image ? (
                            <img
                              src={
                                "https://api-express-tienda.jspadev.com" +
                                estudiante.image
                              }
                              alt={`${estudiante.firstName} ${estudiante.lastName}`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-md"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                              {estudiante.firstName?.charAt(0)}
                              {estudiante.lastName?.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono font-semibold text-blue-600">
                            {estudiante.studentCode}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {estudiante.firstName} {estudiante.lastName}
                            </p>
                            {estudiante.dateOfBirth && (
                              <p className="text-xs text-gray-500">
                                Nació:{" "}
                                {new Date(
                                  estudiante.dateOfBirth
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {estudiante.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {estudiante.phone || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                              estudiante.status
                            )}`}
                          >
                            {getStatusText(estudiante.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">
                              {estudiante.emergencyContact || "-"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {estudiante.emergencyPhone || "-"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => editarEstudiante(estudiante)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                              title="Editar"
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => eliminarEstudiante(estudiante.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                              title="Eliminar"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PieColegio />
    </>
  );
};

export default Colegio;
