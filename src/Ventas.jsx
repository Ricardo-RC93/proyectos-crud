import React, { useEffect, useState } from "react";
import Cabecera from "./components/Cabecera";
import Pie from "./components/Pie";

const Ventas = () => {
  const [loaderSaveBook, setLoaderSaveBook] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productoEditando) {
      // Editar producto existente
      await putProducto(productoEditando.id);
      await getPorduct();
      setProductoEditando(null);
    } else {
      // Agregar nuevo producto
      await saveProducto();
      await getPorduct();
    }

    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      stock: false,
    });
    setProductoEditando(null);
  };

  const editarProducto = (producto) => {
    setFormData(producto);
    setProductoEditando(producto);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      await deleteProducto(id);
      await getPorduct();
    }
  };
  const putProducto = async (id) => {
    try {
      setLoaderSaveBook(true);
      await fetch(
        `https://api-express-tienda.jspadev.com/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.nombre,
            price: Number(formData.precio),
            description: formData.descripcion,
            inStock: formData.stock,
          }),
        }
      );
      await getPorduct();
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderSaveBook();
    }
  };
  const deleteProducto = async (id) => {
    try {
      setLoaderSaveBook(true);
      await fetch(
        `https://api-express-tienda.jspadev.com/api/v1/products/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      await getPorduct();
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderSaveBook(false);
    }
  };
  const saveProducto = async () => {
    try {
      setLoaderSaveBook(true);
      await fetch("https://api-express-tienda.jspadev.com/api/v1/products", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nombre,
          price: Number(formData.precio),
          description: formData.descripcion,
          inStock: formData.stock,
        }),
      });
      await getPorduct();
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderSaveBook(false);
    }
  };
  const getPorduct = async () => {
    try {
      const respuesta = await fetch(
        "https://api-express-tienda.jspadev.com/api/v1/products"
      );
      const respuesta2 = await respuesta.json();
      setProductos(
        respuesta2.map((item) => ({
          ...item,
          nombre: item.name,
          precio: item.price,
          descripcion: item.description,
          stock: item.inStock,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPorduct();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecera />
      <div className="flex-1 max-w-6xl mx-auto p-6 space-y-8 w-full">
        {/* FORMULARIO */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Ventas
            </h2>
            <p className="text-gray-500">
              Administra tus productos de manera eficiente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Primera fila: Producto y Precio */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Producto
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nombre del producto"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="$0.00"
                />
              </div>
            </div>

            {/* Segunda fila: Descripción */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe el producto..."
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3 pt-4">
              <input
                type="checkbox"
                name="stock"
                checked={formData.stock}
                onChange={handleInputChange}
                id="inStock"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
              />
              <label
                htmlFor="inStock"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Producto en stock
              </label>
            </div>

            {/* BOTONES */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {productoEditando
                  ? "✓ Actualizar Producto"
                  : "+ Agregar Producto"}
              </button>
              <button
                type="button"
                onClick={limpiarFormulario}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                🗑️ Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* TABLA DE PRODUCTOS */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Lista de Productos
            </h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {productos.length} productos
            </span>
          </div>

          {productos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg mb-2">
                No hay productos registrados
              </p>
              <p className="text-sm text-gray-400">
                Agrega tu primer producto usando el formulario
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Producto
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Precio
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Descripción
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-900">
                        {producto.nombre}
                      </td>
                      <td className="p-4 text-gray-700 font-semibold">
                        ${parseFloat(producto.precio || 0).toFixed(2)}
                      </td>
                      <td className="p-4 text-gray-700 max-w-xs">
                        <div className="truncate" title={producto.descripcion}>
                          {producto.descripcion || "Sin descripción"}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            producto.stock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {producto.stock ? "✓ En Stock" : "✗ Sin Stock"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => editarProducto(producto)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => eliminarProducto(producto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow"
                          >
                            🗑️ Eliminar
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
      <Pie />
    </div>
  );
};

export default Ventas;
