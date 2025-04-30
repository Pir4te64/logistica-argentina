// src/pages/Formulario.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

// Imágenes por defecto
import img1 from "@/assets/formulario/img1.jpeg";
import img2 from "@/assets/formulario/img2.jpeg";
import img3 from "@/assets/beneficios/1.jpg";

// Íconos
import { FaDollarSign, FaCalendarAlt, FaRoute } from "react-icons/fa";

// Componentes
import FormularioCard from "@/components/Formulario/FormularioCard";
import FormularioDocumentacion from "@/components/Formulario/FormularioDocumentacion";

// Base URL para imágenes de backend
const BASE_URL = "https://backend.logisticaargentinasrl.com.ar";

const Formulario = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const servicio = location.state?.servicio;

  // Scroll y verificación de token
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debe iniciar sesión para acceder al formulario.",
        confirmButtonText: "Ir al Login",
        allowOutsideClick: false,
      }).then(() => navigate("/login"));
    }
  }, [navigate]);

  // Si no llegó servicio en el state
  if (!servicio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-lg text-gray-700 mb-4">
          No se recibió información del servicio.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-custom-red text-white rounded hover:bg-custom-red/80 transition"
        >
          Volver
        </button>
      </div>
    );
  }

  // Mapeo de imágenes del servicio con prefijo, si existen
  const serviceImages =
    servicio.imagenes?.length > 0
      ? servicio.imagenes.map((img) =>
          img.imagen_url.startsWith("http")
            ? img.imagen_url
            : `${BASE_URL}${img.imagen_url.startsWith("/") ? "" : "/"}${
                img.imagen_url
              }`
        )
      : [];

  // Tres imágenes por defecto
  const defaultImages = [img1, img2, img3];

  // Combina las del servicio con las por defecto hasta completar 3
  const displayImages = [...serviceImages, ...defaultImages].slice(0, 3);

  // Descripciones dinámicas
  const tarifaDesc = `$${servicio.tarifa_total} aprox.`;
  const plazosDesc = servicio.servicios_plazo
    .map((p) => `- ${p.nombre}: ${p.descripcion}`)
    .join("\n");
  const serviciosDesc = servicio.servicios_servicio
    .map((s) => `- ${s.nombre}: ${s.descripcion}`)
    .join("\n");

  // Flags de ausencia
  const noPlazos = servicio.servicios_plazo.length === 0;
  const noServicios = servicio.servicios_servicio.length === 0;

  return (
    <div className="w-full">
      {/* Sección Superior: Imágenes */}
      <div className="hidden md:flex bg-gradient-to-b from-custom-blue-medium to-white p-4 h-[500px] justify-around items-center">
        {displayImages.map((src, idx) => (
          <div
            key={idx}
            className="bg-gray-300 w-1/4 h-96 flex items-center justify-center rounded-2xl overflow-hidden"
          >
            <img
              src={src}
              alt={`Imagen ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Sección Intermedia: Tarjetas con datos del servicio */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
        <FormularioCard
          icon={FaDollarSign}
          title="Tarifa Diaria"
          description={tarifaDesc}
        />
        <FormularioCard
          icon={FaCalendarAlt}
          title="Plazos de Pago"
          description={noPlazos ? "No hay plazos disponibles." : plazosDesc}
        />
        <FormularioCard
          icon={FaRoute}
          title="Servicio"
          description={
            noServicios ? "No hay servicios disponibles." : serviciosDesc
          }
        />
      </div>

      {/* Sección Inferior: Documentación */}
      <div className="p-4 max-w-7xl mx-auto">
        <FormularioDocumentacion servicioId={servicio.id} />
      </div>
    </div>
  );
};

export default Formulario;
