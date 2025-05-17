import React, { useState } from "react";

import Sidebar from "@/components/Dashboard/Dashboard/Sidebar";
import Layout from "@/components/Layout";
import DashboardIndex from "@/components/Dashboard/DashboardIndex";

// Importa tus vistas de Dashboard
import BeneficioRepartidor from "@/components/Dashboard/Beneficios/BeneficioRepartidor";
import CategoriaVehiculos from "@/components/Dashboard/Categoria/CategoriaVehiculos";
import EstadoServicio from "@/components/Dashboard/EstadoServicio/EstadoServicio";
import EstadoRepartidor from "@/components/Dashboard/EstadoRepartidor/EstadoRepartidor";
import ResaltadoAnuncio from "@/components/Dashboard/ResaltarAnuncio/ResaltarAnuncio";
import ServicioAnuncio from "@/components/Dashboard/ServicioAnuncio/ServicioAnuncio";
import Postulaciones from "@/components/Dashboard/Postulaciones/Postulaciones";
import CambiarContraseña from "@/components/Dashboard/CambiarContraseña/Cambiar";
import TipoArchivo from "@/components/Dashboard/TipoArchivos/TipoArchivo";
import { Route, Routes, useNavigate } from "react-router-dom";
import CambiarHeader from "@/components/Dashboard/CambiarHeader/CambiarHeader";
import { FaArrowRight } from "react-icons/fa";

export default function DasboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout>
      <div className="flex">
        {/* Botón flotante para abrir el sidebar en mobile */}
        {!sidebarOpen && (
          <button
            className="top-15 fixed left-0 z-50 rounded-full p-2 text-custom-dark md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <FaArrowRight size={24} />
          </button>
        )}
        <Sidebar
          sidebarOpen={sidebarOpen}
          handleViewChange={(key) => navigate(key)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-grow p-6">
          <Routes>
            {/* Ruta por defecto */}
            <Route index element={<DashboardIndex />} />

            {/* Vistas del Dashboard */}
            <Route
              path="beneficioRepartidor"
              element={<BeneficioRepartidor />}
            />
            <Route
              path="categoriaVehiculos"
              element={<CategoriaVehiculos />}
            />
            <Route path="estadoServicio" element={<EstadoServicio />} />
            <Route path="estadoRepartidor" element={<EstadoRepartidor />} />
            <Route path="tipoArchivo" element={<TipoArchivo />} />
            <Route
              path="resaltadoAnuncio"
              element={<ResaltadoAnuncio />}
            />
            <Route
              path="servicioAnuncio"
              element={<ServicioAnuncio />}
            />
            <Route path="postulaciones" element={<Postulaciones />} />
            <Route path="cambiar" element={<CambiarContraseña />} />
            <Route path="cambiarHeader" element={<CambiarHeader />} />
            {/* Fallback */}
            <Route path="*" element={<p>Vista no encontrada</p>} />
          </Routes>
        </main>
      </div>
    </Layout>
  );
}
