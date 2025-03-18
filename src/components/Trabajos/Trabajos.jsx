// Trabajos.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./trabajos.data"; // archivo separado
import CustomInput from "./CustomInput"; // componente reutilizable
import TarjetaAplicar from "./TarjetaAplicar";

const Trabajos = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
      // Lógica de envío o búsqueda
    },
  });

  // Array con 8 tarjetas (puedes usar datos reales si lo deseas)
  const tarjetas = Array.from({ length: 8 }, (_, i) => i);

  // Estado para controlar cuántas tarjetas se muestran
  const [visibleCount, setVisibleCount] = useState(4);

  // Función para mostrar más tarjetas
  const handleShowMore = () => {
    setVisibleCount(tarjetas.length);
  };

  return (
    <div className="container mx-auto justify-center flex flex-col w-11/12 mt-10">
      <div className="bg-custom-dark p-4 rounded">
        <form onSubmit={formik.handleSubmit}>
          {/* Contenedor para alinear los campos */}
          <div className="flex flex-col gap-4 md:flex-row">
            <CustomInput label="Ciudad" name="ciudad" formik={formik} />
            <CustomInput label="Vehículo" name="vehiculo" formik={formik} />
            <CustomInput label="Empresa" name="empresa" formik={formik} />
          </div>

          {/* Botón para enviar */}
          <div className="mt-4 w-full">
            <button
              type="submit"
              className="bg-custom-blue w-full text-white px-4 py-2 rounded hover:bg-custom-blue/80 transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center container mx-auto items-center gap-4 my-3">
        {tarjetas.slice(0, visibleCount).map((tarjeta, index) => (
          <TarjetaAplicar key={index} />
        ))}
      </div>

      {/* Botón para mostrar más si hay tarjetas ocultas */}
      {visibleCount < tarjetas.length && (
        <div className="flex justify-center">
          <button
            onClick={handleShowMore}
            className="bg-custom-red w-32 text-white px-4 py-2 rounded hover:bg-custom-red/80 transition-colors"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default Trabajos;
