import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./assets/style.css";
import Colegio from "./Colegio.jsx";
import VentasAxios from "./VentasAxios.jsx";
import Libreria from "./Libreria.jsx";
import LibrosNuevo from "./LibrosNuevo.jsx";
import Ventas from "./Ventas.jsx";
import VentasCrud from "./VentasCrud.jsx";
import PortafolioLayout from "./layouts/PortafolioLayout.jsx";
import Inicio from "./inicio.jsx";
import Contacto from "./Contacto.jsx";
import Proyectos from "./Proyectos.jsx";
import SobreMi from "./SobreMi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PortafolioLayout />}>
          <Route index element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
        </Route>
        <Route path="apps">
          <Route path="ventas-axios" element={<VentasAxios />} />
          <Route path="colegio" element={<Colegio />} />
          <Route path="libreria" element={<Libreria />} />
          <Route path="libros" element={<LibrosNuevo />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="ventas-crud" element={<VentasCrud />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
