// src/components/Trabajos/TarjetaAplicar.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/Api/Api";
import tarjeta from "@/assets/tarjeta.jpg";

const TarjetaAplicar = ({ servicio }) => {
  const {
    id: servicioId,
    empresa,
    ciudad,
    tarifa_total,
    categoria_vehiculo: { nombre: vehiculoNombre },
    fecha_inicio_servicio,
  } = servicio;

  // Leer usuario y token
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");

  // Verificar rol
  const isTransportista = user?.roles?.some(
    (r) => r.name.toLowerCase() === "transportistas"
  );

  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!isTransportista || !token) return;

    setLoading(true);
    try {
      const payload = {
        servicios_id: servicioId,
        users_id: user.id,
        email: user.email,
        fecha_inicio_servicio,
        fecha_fin_servicio: fecha_inicio_servicio,
        cumple_requisitos: false,
        asignado: false,
        puntos: 0,
      };

      await axios.post(API_URL.POSTULACIONES, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Éxito con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "¡Postulación exitosa!",
        text: "Te postulaste correctamente.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      // Extraer mensaje si viene de la API
      const msg =
        error.response?.data?.message ||
        "Ocurrió un error al postular. Intenta de nuevo.";
      const ms2 = error.response?.data?.errors
      Swal.fire({
        icon: "error",
        title: "Error al postular",
        text: msg,
        text: ms2,
        confirmButtonColor: "#d33",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-64 rounded shadow overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src={tarjeta}
        alt="Persona con paquete"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Degradado */}
      <div className="absolute inset-0 bg-gradient-to-r from-custom-blue to-transparent"></div>

      {/* Contenido */}
      <div className="relative z-10 p-4 h-full flex items-center justify-between text-white">
        <div className="max-w-sm">
          <h2 className="text-xl font-semibold">{empresa}</h2>
          <p className="mt-2">
            <strong>Ciudad:</strong> {ciudad}
          </p>
          <p>
            <strong>Vehículo:</strong> {vehiculoNombre}
          </p>
          <p>
            <strong>Tarifa:</strong> ${tarifa_total}
          </p>
        </div>

        {/* Botón Aplicar */}
        <div className="absolute md:bottom-10 bottom-5 md:right-20 right-5">
          <button
            onClick={handleApply}
            disabled={!isTransportista || loading}
            className={`
              w-32 px-4 py-2 rounded transition-colors
              ${isTransportista
                ? loading
                  ? "bg-gray-500 cursor-wait"
                  : "bg-custom-red hover:bg-custom-red/80"
                : "bg-gray-400 cursor-not-allowed"}
              text-white
            `}
          >
            {loading ? "Enviando..." : "Aplicar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaAplicar;
