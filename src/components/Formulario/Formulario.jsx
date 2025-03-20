import React from "react";
import img1 from "../../assets/formulario/img1.jpeg";
import img2 from "../../assets/formulario/img2.jpeg";
import img3 from "../../assets/beneficios/1.jpg";

// Íconos
import { FaDollarSign, FaCalendarAlt, FaRoute } from "react-icons/fa";

// Componentes
import FormularioCard from "./FormularioCard";
import FormularioDocumentacion from "./FormularioDocumentacion";

const Formulario = () => {
  return (
    <div className="w-full">
      {/* Sección Superior: Imágenes (ocultar en mobile, mostrar desde md) */}
      <div className="hidden md:flex bg-gradient-to-b from-custom-blue-medium to-white p-4 h-[500px] justify-around items-center">
        {/* Imagen 1 */}
        <div className="bg-gray-300 w-1/4 h-96 flex items-center justify-center rounded-2xl">
          <img
            src={img1}
            alt="Imagen 1"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Imagen 2 */}
        <div className="bg-gray-300 w-1/4 h-96 flex items-center justify-center rounded-2xl">
          <img
            src={img2}
            alt="Imagen 2"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Imagen 3 */}
        <div className="bg-gray-300 w-1/4 h-96 flex items-center justify-center rounded-2xl">
          <img
            src={img3}
            alt="Imagen 3"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Sección Intermedia: Tarjetas Rojas */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
        <FormularioCard
          icon={FaDollarSign}
          title="Tarifa Diaria"
          description="$4.870 aprox."
        />
        <FormularioCard
          icon={FaCalendarAlt}
          title="Plazos de Pago"
          description={`- Paga Quincenal\n- Cerrada la quincena y pasado 45 días se realiza el depósito correspondiente.`}
        />
        <FormularioCard
          icon={FaRoute}
          title="Servicio"
          description={`- Se entregan entre 50 a 80 paquetes diarios\n- Son entre 40 a 60 paradas\n- Trabajan con una Hoja de Ruta y App\n- Reconoce el peaje`}
        />
      </div>

      {/* Sección Inferior: Documentación (tarjetas para subir archivos) */}
      <div className="p-4 max-w-7xl mx-auto">
        <FormularioDocumentacion />
      </div>
    </div>
  );
};

export default Formulario;
