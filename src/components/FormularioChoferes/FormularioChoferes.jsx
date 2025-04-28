import React, { useEffect } from "react";
import header from "@/assets/Header/header.jpg"; // Ajusta la ruta a tu imagen
import FormularioDocumentacionChoferes from "@/components/FormularioChoferes/FormularioDocumentacionChoferes"; // Importa tu nuevo componente
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioChoferes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debe logearse o crearse un usuario para el puesto que desea.",
        confirmButtonText: "Ir al Login",
        allowOutsideClick: false,
      }).then(() => {
        navigate("/login");
      });
    }
  }, [navigate]);
  return (
    <div className="w-full min-h-screen">
      {/* Imagen superior (oculta en mobile, visible en md en adelante) */}
      <div className="hidden md:flex w-full h-[500px] bg-gradient-to-b from-custom-blue-medium to-white justify-center items-center rounded-md">
        <img
          src={header}
          alt="header"
          className="w-1/2 h-96 object-cover rounded-xl"
        />
      </div>

      {/* Contenedor principal (texto en rojo) */}
      <div className="md:p-4 p-2 max-w-4xl mx-auto text-center bg-custom-red md:rounded-2xl rounded-t-none shadow-lg">
        <p className="md:text-lg text-sm mb-6 text-white">
          Buscamos choferes o acompañantes responsables, que quieran aprovechar
          la oportunidad de trabajar en reparto, coordinar con dueños de los
          vehículos. Es una oportunidad laboral de crecimiento, si sos proactivo
          y constante esta oferta es para vos.
        </p>
      </div>

      {/* Sección de Documentación */}
      <div className="rounded-md p-4 md:p-8 flex justify-center items-center ">
        {/* Aquí insertas el nuevo componente */}
        <FormularioDocumentacionChoferes />
      </div>
    </div>
  );
};

export default FormularioChoferes;
