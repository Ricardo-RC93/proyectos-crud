import axios from "axios";
import React, { useEffect, useState } from "react";
import Cabecera from "./components/Cabecera";
import Pie from "./components/Pie";

const VentasAxios = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    inStock: false,
  });

  // Obtener productos
  const getProductos = async () => {
    try {
      const respuesta = await axios.get(
        "https://api-express-tienda.jspadev.com/api/v1/products"
      );
      console.log(respuesta);
      setProductos(respuesta.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar formulario (Crear o Actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (productoEditando) {
        // Actualizar producto
        await axios.put(
          `https://api-express-tienda.jspadev.com/api/v1/products/${productoEditando.id}`,
          formData
        );
      } else {
        // Crear nuevo producto
        await axios.post(
          "https://api-express-tienda.jspadev.com/api/v1/products",
          formData
        );
      }

      await getProductos();
      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      inStock: false,
    });
    setProductoEditando(null);
  };

  // Editar producto
  const editarProducto = (producto) => {
    setFormData({
      name: producto.name,
      price: Number(producto.price),
      description: producto.description,
      inStock: producto.inStock,
    });
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(
          `https://api-express-tienda.jspadev.com/api/v1/products/${id}`
        );
        await getProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Cabecera />
      <div className="flex-1 bg-linear-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header con botón Nuevo Producto */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    Gestión de Productos
                  </h1>
                  <p className="text-gray-500">
                    Administra tu inventario de manera profesional
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMostrarFormulario(!mostrarFormulario);
                    if (!mostrarFormulario) {
                      limpiarFormulario();
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                    mostrarFormulario
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white"
                  }`}
                >
                  {mostrarFormulario ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cerrar
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Nuevo Producto
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Formulario (Condicional) */}
          {mostrarFormulario && (
            <div className="mb-8 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="bg-linear-to-r from-amber-600 to-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                    {productoEditando ? "✏️" : "+"}
                  </span>
                  {productoEditando ? "Editar Producto" : "Nuevo Producto"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Fila 1: Name y Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Producto
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Ej: Laptop Dell XPS 15"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Precio
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-semibold">
                          $
                        </span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: Number(e.target.value),
                            })
                          }
                          required
                          min="0"
                          step="0.01"
                          className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fila 2: Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                      placeholder="Describe las características del producto..."
                    />
                  </div>

                  {/* Checkbox Stock */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      id="inStock"
                      className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    />
                    <label
                      htmlFor="inStock"
                      className="text-sm font-semibold text-gray-700 cursor-pointer select-none"
                    >
                      Producto disponible en stock
                    </label>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4 border-t-2 border-gray-100">
                    <button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {productoEditando ? "Actualizar" : "Enviar"}
                    </button>
                    <button
                      type="button"
                      onClick={limpiarFormulario}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Limpiar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tabla (Siempre visible) */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Lista de Productos
                </h2>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
                  {productos.length} productos
                </span>
              </div>
            </div>

            <div className="p-8">
              {productos.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-4">📦</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No hay productos
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comienza agregando tu primer producto
                  </p>
                  <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    + Agregar Producto
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Producto
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Precio
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Descripción
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Stock
                        </th>
                        <th className="text-center p-4 font-bold text-gray-700 bg-gray-50">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((producto) => (
                        <tr
                          key={producto.id}
                          className="border-b border-gray-100 hover:bg-amber-50/50 transition-colors"
                        >
                          <td className="p-4 font-semibold text-gray-900">
                            {producto.name}
                          </td>
                          <td className="p-4 text-gray-700 font-bold">
                            ${Number(producto.price).toFixed(2)}
                          </td>
                          <td className="p-4 text-gray-600 max-w-xs">
                            <div
                              className="truncate"
                              title={producto.description}
                            >
                              {producto.description || "Sin descripción"}
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                                producto.inStock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  producto.inStock
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              {producto.inStock ? "En Stock" : "Sin Stock"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => editarProducto(producto)}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow flex items-center gap-1"
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
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Editar
                              </button>
                              <button
                                onClick={() => eliminarProducto(producto.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow flex items-center gap-1"
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
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default VentasAxios;
