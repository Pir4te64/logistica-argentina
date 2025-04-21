import React from "react";


const FormularioCard = ({ icon, title, description }) => {
  return (
    <div className="bg-custom-red text-white p-2 md:p-4 rounded-2xl w-full md:w-1/3 flex flex-col justify-start h-48 md:h-64">
      {/* Ícono */}
      <div className="flex items-center justify-start text-2xl md:text-3xl mb-1 md:mb-2">
        {icon}
      </div>

      {/* Título */}
      <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{title}</h3>

      {/* Descripción (con soporte para saltos de línea) */}
      <p className="text-xs md:text-sm whitespace-pre-line">{description}</p>
    </div>
  );
};

export default FormularioCard;
