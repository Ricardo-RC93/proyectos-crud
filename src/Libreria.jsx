import React, { useEffect, useState } from "react";
import NavTitulo from "./NavTitulo";
import PiePagina from "./PiePagina";
/* oculta el formulario  tarea */

const Libreria = () => {
  const [loaderGuardarLibro, setLoaderGuardarLibro] = useState(false);
  const [libros, setLibros] = useState([]);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (libroEditando) {
      // Editar libro existente
      await putLibros(libroEditando.id);
      await getLibros();
      setLibroEditando(null);
    } else {
      // Agregar nuevo libro
      await saveLibro();
    }

    limpiarFormulario();
  };

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

  const editarLibro = (libro) => {
    setFormData(libro);
    setLibroEditando(libro);
  };

  const eliminarLibro = async (id) => {
    if (window.confirm("¿Eliminar este libro?")) {
      await deleteLibro(id);
      await getLibros();
    }
  };
  const saveLibro = async () => {
    try {
      setLoaderGuardarLibro(true);
      await fetch("https://api-express-tienda.jspadev.com/api/v1/books", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pages: Number(formData.pages),
          publicationYear: Number(formData.publicationYear),
          price: Number(formData.price),
          rating: Number(formData.rating),
        }),
      });
      await getLibros();
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderGuardarLibro(false);
    }
  };
  const deleteLibro = async (id) => {
    try {
      await fetch(`https://api-express-tienda.jspadev.com/api/v1/books/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await getLibros();
    } catch (error) {
      console.log(error);
    }
  };
  const putLibros = async (id) => {
    try {
      setLoaderGuardarLibro(true);
      await fetch(`https://api-express-tienda.jspadev.com/api/v1/books/${id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pages: Number(formData.pages),
          publicationYear: Number(formData.publicationYear),
          price: Number(formData.price),
          rating: Number(formData.rating),
        }),
      });
      await getLibros();
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderGuardarLibro(false);
    }
  };
  const getLibros = async () => {
    try {
      const respuesta = await fetch(
        "https://api-express-tienda.jspadev.com/api/v1/books"
      );
      const respuest2 = await respuesta.json();
      setLibros(respuest2);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLibros();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavTitulo />
      <div className="flex-1" style={{ padding: "20px", width: "100%" }}>
        <h1>Sistema de Gestión de Librería</h1>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "30px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2>{libroEditando ? "Editar Libro" : "Nuevo Libro"}</h2>

          {/* Primera fila: Título, Autor, ISBN */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Título:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="Título del libro"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Autor:
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="Nombre del autor"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                ISBN:
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="978-3-16-148410-0"
              />
            </div>
          </div>

          {/* Segunda fila: Editorial, Año, Género */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Editorial:
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="Editorial"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Año de Publicación:
              </label>
              <input
                type="number"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleInputChange}
                required
                min="1000"
                max="2024"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="2023"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Género:
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="Novela, Ciencia Ficción, etc."
              />
            </div>
          </div>

          {/* Tercera fila: Idioma, Páginas, Precio */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Idioma:
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="Español, Inglés, etc."
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Páginas:
              </label>
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                required
                min="1"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="250"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Precio ($):
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="29.99"
              />
            </div>
          </div>

          {/* Cuarta fila: Rating y Stock */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Calificación (0-5):
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
                placeholder="4.5"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                style={{ marginRight: "8px", transform: "scale(1.2)" }}
              />
              <label style={{ fontWeight: "bold" }}>En Stock</label>
            </div>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                resize: "vertical",
              }}
              placeholder="Descripción o sinopsis del libro..."
            />
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={loaderGuardarLibro}
              style={{
                padding: "10px 20px",
                border: "1px solid #007bff",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {libroEditando ? "Actualizar Libro" : "Agregar Libro"}
            </button>
            <button
              type="button"
              onClick={limpiarFormulario}
              style={{
                padding: "10px 20px",
                border: "1px solid #6c757d",
                backgroundColor: "#6c757d",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Limpiar
            </button>
          </div>
        </form>

        {/* Tabla de libros */}
        <div style={{ overflowX: "auto" }}>
          <h2>Catálogo de Libros ({libros.length})</h2>
          {libros.length === 0 ? (
            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              No hay libros registrados. Agrega tu primer libro usando el
              formulario.
            </p>
          ) : (
            <table
              border="1"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Título
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Autor
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    ISBN
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Editorial
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Año
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Género
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Idioma
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Páginas
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Precio
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Rating
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Stock
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {libros.map((libro) => (
                  <tr key={libro.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", maxWidth: "150px" }}>
                      <strong>{libro.title}</strong>
                      {libro.description && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            marginTop: "5px",
                          }}
                        >
                          {libro.description.substring(0, 50)}...
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "10px" }}>{libro.author}</td>
                    <td style={{ padding: "10px", fontSize: "12px" }}>
                      {libro.isbn}
                    </td>
                    <td style={{ padding: "10px" }}>{libro.publisher}</td>
                    <td style={{ padding: "10px" }}>{libro.publicationYear}</td>
                    <td style={{ padding: "10px" }}>{libro.genre}</td>
                    <td style={{ padding: "10px" }}>{libro.language}</td>
                    <td style={{ padding: "10px" }}>{libro.pages}</td>
                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                      ${libro.price}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          backgroundColor:
                            libro.rating >= 4
                              ? "#28a745"
                              : libro.rating >= 3
                              ? "#ffc107"
                              : "#dc3545",
                          color: "white",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      >
                        ⭐ {libro.rating}
                      </span>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          backgroundColor: libro.inStock
                            ? "#28a745"
                            : "#dc3545",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "15px",
                          fontSize: "12px",
                        }}
                      >
                        {libro.inStock ? "✓ Disponible" : "✗ Agotado"}
                      </span>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <button
                        onClick={() => editarLibro(libro)}
                        style={{
                          marginRight: "5px",
                          padding: "6px 12px",
                          border: "1px solid #ffc107",
                          backgroundColor: "#ffc107",
                          color: "black",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarLibro(libro.id)}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid #dc3545",
                          backgroundColor: "#dc3545",
                          color: "white",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <PiePagina />
    </div>
  );
};

export default Libreria;
