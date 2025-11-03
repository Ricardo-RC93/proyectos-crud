import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./assets/style.css";
import App from "./App.jsx";
import Colegio from "./Colegio.jsx";
import VentasAxios from "./VentasAxios.jsx";
import Libreria from "./Libreria.jsx";
import LibrosNuevo from "./LibrosNuevo.jsx";
import Ventas from "./Ventas.jsx";
import VentasCrud from "./VentasCrud.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ventas-axios" element={<VentasAxios />} />
        <Route path="/colegio" element={<Colegio />} />
        <Route path="/libreria" element={<Libreria />} />
        <Route path="/libros" element={<LibrosNuevo />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/ventas-crud" element={<VentasCrud />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
