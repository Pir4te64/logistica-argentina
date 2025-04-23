// src/components/Trabajos/Trabajos.jsx
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "@/components/Trabajos/trabajos.data";
import CustomInput from "@/components/Trabajos/CustomInput";
import CustomSelect from "@/components/Trabajos/CustomSelect";
import TarjetaAplicar from "@/components/Trabajos/TarjetaAplicar";
import { useTrabajos } from "@/components/Trabajos/useTrabajos";
import { empresasOptions, vehiculosOptions } from "./text";

const Trabajos = () => {
  const { fetchServicios, servicios = [], loading, error } = useTrabajos();
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => setVisibleCount(servicios.length);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Aquí podrías filtrar “servicios” según el form…
      console.log("Buscar con:", values);
    },
  });

  return (
    <div className="container mx-auto w-11/12 mt-10" id="trabajos">
      {/* Filtro */}
      <div className="bg-custom-dark p-4 rounded mb-6">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <CustomInput label="Ciudad" name="ciudad" formik={formik} />
          </div>
          <div className="flex-1">
            <CustomSelect label="Vehículo" name="vehiculo" formik={formik} options={vehiculosOptions} />
          </div>
          <div className="flex-1">
            <CustomSelect label="Empresa" name="empresa" formik={formik} options={empresasOptions} />
          </div>
          <button
            type="submit"
            className="bg-custom-blue text-white px-6 py-2 rounded hover:bg-custom-blue/80 transition-colors md:ml-4"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Estado de carga/error */}
      {loading && <p className="text-center">Cargando servicios...</p>}
      {error && <p className="text-center text-red-500">Error al cargar servicios.</p>}

      {/* Listado de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicios.slice(0, visibleCount).map((servicio) => (
          <TarjetaAplicar key={servicio.id} servicio={servicio} />
        ))}
      </div>

      {/* Ver más */}
      {visibleCount < servicios.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-custom-red text-white px-6 py-2 rounded hover:bg-custom-red/80 transition-colors"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default Trabajos;
