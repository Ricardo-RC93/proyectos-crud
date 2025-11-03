import React, { useEffect, useState } from "react";
import Cabecera from "./components/Cabecera";
import Pie from "./components/Pie";

const VentasCrud = () => {
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
      /* Aca vamos actulizar el producto */
      await ActualizarProducto(productoEditando.id);
      await getProductos();
      setProductoEditando(null);
    } else {
      try {
        await fetch("https://api-express-tienda.jspadev.com/api/v1/products", {
          method: "post",
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
        await getProductos();
      } catch (error) {
        console.log(error);
      }
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
      try {
        await fetch(
          `https://api-express-tienda.jspadev.com/api/v1/products/${id}`,
          {
            method: "delete",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        await getProductos();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getProductos = async () => {
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
    getProductos();
  }, []);
  const ActualizarProducto = async (id) => {
    try {
      const respuesta = await fetch(
        `https://api-express-tienda.jspadev.com/api/v1/products/${id}`,
        {
          method: "put",
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
      await getProductos();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ActualizarProducto();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecera />
      <div className="flex-1" style={{ padding: "20px", width: "100%" }}>
        <h1>Gestión de Productos</h1>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "30px",
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h2>{productoEditando ? "Editar Producto" : "Nuevo Producto"}</h2>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ minWidth: "120px", marginRight: "10px" }}>
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ nombre: e.target.value })}
              required
              style={{
                flex: "1",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ minWidth: "120px", marginRight: "10px" }}>
              Precio:
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
              style={{
                flex: "1",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <label
              style={{
                minWidth: "120px",
                marginRight: "10px",
                marginTop: "5px",
              }}
            >
              Descripción:
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="3"
              style={{
                flex: "1",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              <input
                type="checkbox"
                name="stock"
                checked={formData.stock}
                onChange={handleInputChange}
                style={{ marginRight: "5px" }}
              />
              En Stock
            </label>
          </div>

          <button
            type="submit"
            style={{
              marginRight: "10px",
              padding: "8px 15px",
              border: "1px solid #007bff",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {productoEditando ? "Actualizar" : "Enviar"}
          </button>
          <button
            type="button"
            onClick={limpiarFormulario}
            style={{
              padding: "8px 15px",
              border: "1px solid #6c757d",
              backgroundColor: "#6c757d",
              color: "white",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Limpiar
          </button>
        </form>

        {/* Tabla */}
        <h2>Lista de Productos</h2>
        {productos.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Precio</th>
                <th style={{ padding: "10px", textAlign: "left" }}>
                  Descripción
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Stock</th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td style={{ padding: "10px" }}>{producto.nombre}</td>
                  <td style={{ padding: "10px" }}>${producto.precio}</td>
                  <td style={{ padding: "10px" }}>
                    {producto.descripcion || "Sin descripción"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {producto.stock ? "Sí" : "No"}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      onClick={() => editarProducto(producto)}
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        border: "1px solid #ffc107",
                        backgroundColor: "#ffc107",
                        color: "black",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      style={{
                        padding: "5px 10px",
                        border: "1px solid #dc3545",
                        backgroundColor: "#dc3545",
                        color: "white",
                        borderRadius: "3px",
                        cursor: "pointer",
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
      <Pie />
    </div>
  );
};

export default VentasCrud;
