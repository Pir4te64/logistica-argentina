// Trabajos.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "@/components/Trabajos/trabajos.data";
import CustomInput from "@/components/Trabajos/CustomInput";
import CustomSelect from "@/components/Trabajos/CustomSelect";
import TarjetaAplicar from "@/components/Trabajos/TarjetaAplicar";

const Trabajos = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
      // Lógica de envío o búsqueda
    },
  });

  // Opciones para el select de "Vehículos" con grupos
  const vehiculosOptions = [
    {
      label: "Chico",
      options: [
        { label: "Kangoo", value: "Kangoo" },
        { label: "Fiorino", value: "Fiorino" },
        { label: "Partner", value: "Partner" },
      ],
    },
    {
      label: "Mediano",
      options: [
        { label: "Master", value: "Master" },
        { label: "Ducato", value: "Ducato" },
        { label: "Transit", value: "Transit" },
      ],
    },
    {
      label: "Grande",
      options: [
        { label: "Accelo 815", value: "Accelo815" },
        { label: "Mercedes 710", value: "Mercedes710" },
        { label: "Atego", value: "Atego" },
      ],
    },
    {
      label: "Semis",
      options: [
        { label: "Scania", value: "Scania" },
        { label: "Actros", value: "Actros" },
        { label: "Iveco Stralis", value: "IvecoStralis" },
        { label: "Volvo FM", value: "VolvoFM" },
      ],
    },
  ];

  // Opciones para "Empresas"
  const empresasOptions = [
    { label: "Loginter", value: "Loginter" },
    { label: "OCA", value: "OCA" },
    { label: "Urbano", value: "Urbano" },
    { label: "Ocasa", value: "Ocasa" },
    { label: "Pavetron", value: "Pavetron" },
    { label: "Intermepro", value: "Intermepro" },
  ];

  // Array con 8 tarjetas
  const tarjetas = Array.from({ length: 8 }, (_, i) => i);

  // Estado para controlar cuántas tarjetas se muestran
  const [visibleCount, setVisibleCount] = useState(4);

  // Función para mostrar más tarjetas
  const handleShowMore = () => {
    setVisibleCount(tarjetas.length);
  };

  return (
    <div
      className="container mx-auto justify-center flex flex-col w-11/12 mt-10"
      id="trabajos"
    >
      <div className="bg-custom-dark p-4 rounded">
        <form onSubmit={formik.handleSubmit}>
          {/* Contenedor para alinear los campos y darles proporción */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <CustomInput label="Ciudad" name="ciudad" formik={formik} />
            </div>
            <div className="flex-1">
              <CustomSelect
                label="Vehículo"
                name="vehiculo"
                formik={formik}
                options={vehiculosOptions}
              />
            </div>
            <div className="flex-1">
              <CustomSelect
                label="Empresa"
                name="empresa"
                formik={formik}
                options={empresasOptions}
              />
            </div>
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
