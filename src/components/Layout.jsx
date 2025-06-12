import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PostulacionesModal from "@/Transportistas/PostulacionesModal";
import { useLocation } from "react-router-dom";

/**
 * Componente Layout que define la estructura base de la aplicación.
 *
 * Este componente implementa un diseño de página con:
 * - Barra de navegación superior (Navbar)
 * - Botón flotante de WhatsApp para contacto rápido
 * - Modal de postulaciones para transportistas
 * - Contenido principal de la página (children)
 * - Pie de página (Footer)
 *
 * @param {React.ReactNode} children - Contenido principal que se renderizará entre el Navbar y Footer
 * @returns {JSX.Element} Layout completo de la aplicación
 */
const Layout = ({ children }) => {
  const location = useLocation();
  
  const [formSelect, setFormSelect] = useState("");
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      window.localStorage.removeItem("formSelect");
      setFormSelect("");
      return;
    }
    const selectedValue = window.localStorage.getItem("formSelect") || "";
    setFormSelect(selectedValue);
    
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación superior */}
      <Navbar selected={formSelect} setFormSelect={setFormSelect} />

      {/* Botón flotante de WhatsApp para contacto rápido */}
      <WhatsAppButton />

      {/* Modal para gestionar postulaciones de transportistas */}
      <PostulacionesModal />

      {/* Contenido principal de la página */}
      <main className="flex-grow">{children}</main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default Layout;
