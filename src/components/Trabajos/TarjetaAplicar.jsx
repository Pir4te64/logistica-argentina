// src/components/Trabajos/TarjetaAplicar.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import tarjeta from "@/assets/tarjeta.jpg";
import { API_URL } from "@/Api/Api";

const TarjetaAplicar = ({ servicio, onInfo }) => {
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

  // Comprobar rol Transportistas
  const isTransportista = user?.roles?.some(
    (r) => r.name.toLowerCase() === "transportistas"
  );

  const [loadingApply, setLoadingApply] = useState(false);
  const navigate = useNavigate();

  const handleApply = async () => {
    // 1) Si no hay token: pedir login
    if (!token) {
      await Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión",
        text: "Serás redirigido al login para poder postularte.",
        confirmButtonText: "Ir al login",
      });
      navigate("/login");
      return;
    }

    // 2) Si no es transportista: mostrar mensaje y redirigir al formulario
    if (!isTransportista) {
      await Swal.fire(
        "Formulario incompleto",
        "Este formulario es para usuarios transportistas",
        "warning"
      );
      return;
    }

    // 3) Caso válido: enviamos postulación
    setLoadingApply(true);
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

      Swal.fire("¡Postulación exitosa!", "", "success");
    } catch (error) {
      const mensajeError =
        error.response?.data?.errors?.[0] || "Ocurrió un error desconocido";

      await Swal.fire(
        "Excelente Decisión",
        `${mensajeError}. Serás redirigido al formulario.`,
        "success"
      );

      navigate("/formulario");
    } finally {
      setLoadingApply(false);
    }
  };

  return (
    <div className="relative w-full h-64 rounded shadow overflow-hidden">
      <img
        src={tarjeta}
        alt="Fondo tarjeta"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-custom-blue to-transparent" />

      <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
        <div>
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

        <div className="flex space-x-2">
          {/* + Info */}
          <button
            onClick={onInfo}
            className="flex items-center gap-1 bg-custom-blue px-3 py-1 rounded hover:bg-custom-blue/80 transition-colors"
          >
            <FaInfoCircle /> + Info
          </button>

          {/* Aplicar */}
          <button
            onClick={handleApply}
            className={`px-3 py-1 rounded transition-colors 
              ${
                loadingApply
                  ? "bg-gray-500 cursor-wait"
                  : "bg-custom-red hover:bg-custom-red/80"
              }
              text-white`}
          >
            {loadingApply ? "Enviando..." : "Aplicar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaAplicar;
