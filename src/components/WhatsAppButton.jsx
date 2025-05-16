// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  /* 1️⃣ Ruta actual */
  const { pathname } = useLocation();

  /* 2️⃣ Si es /dashboard o cualquier sub-ruta → no mostrar el botón */
  if (/^\/dashboard(\/|$)/i.test(pathname)) return null;

  /* 3️⃣ Link de WhatsApp */
  const phoneNumber = "5491169663208"; // sin + ni espacios, formato internacional
  const message = "¡Hola! Me gustaría obtener más información.";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  /* 4️⃣ Botón flotante */
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat en WhatsApp"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
    >
      <FaWhatsapp className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
