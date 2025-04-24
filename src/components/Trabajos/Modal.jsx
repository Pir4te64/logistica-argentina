// src/components/Trabajos/ServicioModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const ServicioModal = ({ servicio, onClose }) => {
    if (!servicio) return null;

    // convierte "2025-04-24" a "04/24/2025"
    const formatDate = (iso) => {
        const [year, month, day] = iso.slice(0, 10).split("-");
        return `${month}/${day}/${year}`;
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
        >
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between bg-custom-blue px-6 py-3">
                    <h2 className="text-xl font-bold text-white">{servicio.empresa}</h2>
                    <button
                        onClick={onClose}
                        className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
                        aria-label="Cerrar"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 text-gray-700">
                    <p>
                        <span className="font-semibold">Ciudad:</span> {servicio.ciudad}
                    </p>
                    <p>
                        <span className="font-semibold">Vehículo:</span>{" "}
                        {servicio.categoria_vehiculo.nombre}
                    </p>
                    <p>
                        <span className="font-semibold">Tarifa:</span> $
                        {servicio.tarifa_total}
                    </p>
                    <p>
                        <span className="font-semibold">Inicio de Servicio:</span>{" "}
                        {formatDate(servicio.fecha_inicio_servicio)}
                    </p>
                    <p>
                        <span className="font-semibold">Retiro:</span>{" "}
                        {servicio.direccion_recogida}
                    </p>
                    <p>
                        <span className="font-semibold">Entrega:</span>{" "}
                        {servicio.direccion_entrega}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicioModal;
