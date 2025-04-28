// src/pages/FormularioComisionista.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importante para redirigir
import Swal from "sweetalert2"; // Importamos SweetAlert2
import header from "@/assets/Header/header.jpg";
import FormularioCV from "@/components/FormularioComisionista/FormularioCV";

const FormularioComisionista = () => {
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
        allowOutsideClick: false, // para que no cierren clickeando afuera
      }).then(() => {
        navigate("/login");
      });
    }
  }, [navigate]);

  return (
    <div className="w-full min-h-screen">
      {/* Imagen superior */}
      <div className="hidden md:flex w-full h-[500px] bg-gradient-to-b from-custom-blue-medium to-white justify-center items-center rounded-md">
        <img
          src={header}
          alt="header"
          className="w-1/2 h-96 object-cover rounded-xl"
        />
      </div>

      {/* Texto principal */}
      <div className="md:p-4 p-2 max-w-4xl mx-auto text-center bg-custom-red md:rounded-2xl rounded-t-none shadow-lg">
        <p className="md:text-lg text-sm mb-6 text-white">
          Buscamos personas con habilidades en venta, que quieran aprovechar la
          oportunidad de trabajar desde su casa. Comisioná dando de alta
          distribuidores nuevos. Es una oportunidad laboral de crecimiento; si
          sos proactivo y constante, esta oferta es para vos.
        </p>
      </div>

      {/* Formulario */}
      <div className="rounded-md p-4 md:p-8 flex justify-center items-center ">
        <FormularioCV />
      </div>
    </div>
  );
};

export default FormularioComisionista;
