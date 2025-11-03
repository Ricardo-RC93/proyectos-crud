import React, { useEffect, useState } from "react";
import axios from "axios";
import NavTitulo from "./NavTitulo";
import PiePagina from "./PiePagina";

const LibrosNuevo = () => {
  const [libros, setLibros] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publicationYear: "",
    genre: "",
    language: "",
    pages: "",
    price: "",
    description: "",
    inStock: false,
    rating: "",
  });

  // Obtener libros
  const getLibros = async () => {
    try {
      const respuesta = await axios.get(
        "https://api-express-tienda.jspadev.com/api/v1/books"
      );
      setLibros(respuesta.data);
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  useEffect(() => {
    getLibros();
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
      /* const libroData = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        publisher: formData.publisher,
        publicationYear: Number(formData.publicationYear),
        genre: formData.genre,
        language: formData.language,
        pages: Number(formData.pages),
        price: Number(formData.price),
        description: formData.description,
        inStock: formData.inStock,
        rating: Number(formData.rating),
      }; */
      const librodata = {
        ...formData,
        pages: Number(formData.pages),
        price: Number(formData.price),
        publicationYear: Number(formData.publicationYear),
        rating: Number(formData.rating),
      };

      if (libroEditando) {
        // Actualizar libro
        await axios.put(
          `https://api-express-tienda.jspadev.com/api/v1/books/${libroEditando.id}`,
          librodata
        );
      } else {
        // Crear nuevo libro
        await axios.post(
          "https://api-express-tienda.jspadev.com/api/v1/books",
          librodata
        );
      }

      await getLibros();
      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al guardar libro:", error);
    }
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      publicationYear: "",
      genre: "",
      language: "",
      pages: "",
      price: "",
      description: "",
      inStock: false,
      rating: "",
    });
    setLibroEditando(null);
  };

  // Editar libro
  const editarLibro = (libro) => {
    setFormData({
      title: libro.title,
      author: libro.author,
      isbn: libro.isbn,
      publisher: libro.publisher,
      publicationYear: Number(libro.publicationYear),
      genre: libro.genre,
      language: libro.language,
      pages: Number(libro.pages),
      price: Number(libro.price),
      description: libro.description,
      inStock: libro.inStock,
      rating: Number(libro.rating),
    });
    setLibroEditando(libro);
    setMostrarFormulario(true);
  };

  // Eliminar libro
  const eliminarLibro = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      try {
        await axios.delete(
          `https://api-express-tienda.jspadev.com/api/v1/books/${id}`
        );
        await getLibros();
      } catch (error) {
        console.error("Error al eliminar libro:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavTitulo />
      <div className="flex-1 bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header con botón desplegable */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-linear-to-r from-emerald-600 to-teal-600 p-4 rounded-xl shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      📚 Biblioteca Virtual
                    </h1>
                    <p className="text-gray-500">
                      Gestiona tu colección de libros
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMostrarFormulario(!mostrarFormulario);
                    if (!mostrarFormulario) {
                      limpiarFormulario();
                    }
                  }}
                  className={`p-3 rounded-full font-semibold transition-all transform hover:scale-110 shadow-xl ${
                    mostrarFormulario
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  }`}
                  title={
                    mostrarFormulario ? "Cerrar formulario" : "Agregar libro"
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
                        strokeWidth={2}
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
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
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
                  <span className="bg-linear-to-r from-emerald-600 to-teal-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                    {libroEditando ? "✏️" : "📖"}
                  </span>
                  {libroEditando ? "Editar Libro" : "Nuevo Libro"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Fila 1: Título y Autor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Título del Libro *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Ej: Cien años de soledad"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Autor *
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Ej: Gabriel García Márquez"
                      />
                    </div>
                  </div>

                  {/* Fila 2: ISBN y Editorial */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ISBN
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="978-3-16-148410-0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Editorial
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Ej: Editorial Sudamericana"
                      />
                    </div>
                  </div>

                  {/* Fila 3: Año, Género, Idioma */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Año de Publicación
                      </label>
                      <input
                        type="number"
                        name="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="1967"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Género
                      </label>
                      <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Novela"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Idioma
                      </label>
                      <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Español"
                      />
                    </div>
                  </div>

                  {/* Fila 4: Páginas, Precio, Rating */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Páginas
                      </label>
                      <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="471"
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
                          onChange={handleInputChange}
                          step="0.01"
                          className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          placeholder="29.99"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="4.8"
                      />
                    </div>
                  </div>

                  {/* Fila 5: Descripción */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                      placeholder="Una obra maestra de la literatura latinoamericana..."
                    />
                  </div>

                  {/* Checkbox Stock */}
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      id="inStock"
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label
                      htmlFor="inStock"
                      className="text-sm font-semibold text-gray-700 cursor-pointer select-none"
                    >
                      ✓ Disponible en stock
                    </label>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4 border-t-2 border-gray-100">
                    <button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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
                      {libroEditando ? "Actualizar Libro" : "Agregar Libro"}
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
            <div className="bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 px-8 py-6">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Catálogo de Libros
                </h2>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
                  {libros.length} libros
                </span>
              </div>
            </div>

            <div className="p-8">
              {libros.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No hay libros registrados
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comienza agregando tu primer libro a la biblioteca
                  </p>
                  <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    + Agregar Primer Libro
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Título
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Autor
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Género
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Año
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Precio
                        </th>
                        <th className="text-left p-4 font-bold text-gray-700 bg-gray-50">
                          Rating
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
                      {libros.map((libro) => (
                        <tr
                          key={libro.id}
                          className="border-b border-gray-100 hover:bg-emerald-50/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="font-semibold text-gray-900">
                              {libro.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {libro.isbn}
                            </div>
                          </td>
                          <td className="p-4 text-gray-700">{libro.author}</td>
                          <td className="p-4 text-gray-600">{libro.genre}</td>
                          <td className="p-4 text-gray-600">
                            {libro.publicationYear}
                          </td>
                          <td className="p-4 text-gray-700 font-bold">
                            ${Number(libro.price).toFixed(2)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="font-semibold text-gray-900">
                                {Number(libro.rating).toFixed(1)}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                                libro.inStock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  libro.inStock ? "bg-green-500" : "bg-red-500"
                                }`}
                              ></span>
                              {libro.inStock ? "Disponible" : "Agotado"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => editarLibro(libro)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow flex items-center gap-1"
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
                                onClick={() => eliminarLibro(libro.id)}
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
      <PiePagina />
    </div>
  );
};

export default LibrosNuevo;
