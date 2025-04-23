// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    // Número en formato internacional sin símbolos ni espacios
    const phoneNumber = "543795172308";
    // Mensaje inicial (opcional)
    const message = "¡Hola! Me gustaría obtener más información.";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
    )}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat en WhatsApp"
            className="
        fixed bottom-6 right-6 
        bg-green-500 hover:bg-green-600 
        text-white p-4 rounded-full 
        shadow-lg z-50 transition-transform 
        transform hover:scale-110
      "
        >
            <FaWhatsapp className="w-6 h-6" />
        </a>
    );
};

export default WhatsAppButton;
