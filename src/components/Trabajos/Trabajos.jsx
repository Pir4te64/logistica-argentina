// src/components/Trabajos/Trabajos.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "@/components/Trabajos/trabajos.data";
import CustomInput from "@/components/Trabajos/CustomInput";
import CustomSelect from "@/components/Trabajos/CustomSelect";
import TarjetaAplicar from "@/components/Trabajos/TarjetaAplicar";
import { useTrabajos } from "@/components/Trabajos/useTrabajos";

const Trabajos = () => {
  const { fetchServicios, servicios = [], loading, error } = useTrabajos();
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  // Formik
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      /* el filtrado es en vivo */
    },
  });

  // Generar opciones únicas a partir de servicios
  const cityOptions = useMemo(() => {
    const cities = Array.from(new Set(servicios.map(s => s.ciudad))).sort();
    return cities.map(c => ({ label: c, value: c }));
  }, [servicios]);

  const vehiculosOptions = useMemo(() => {
    const vehs = Array.from(
      new Set(servicios.map(s => s.categoria_vehiculo.nombre))
    ).sort();
    return vehs.map(v => ({ label: v, value: v }));
  }, [servicios]);

  const empresasOptions = useMemo(() => {
    const emps = Array.from(new Set(servicios.map(s => s.empresa))).sort();
    return emps.map(e => ({ label: e, value: e }));
  }, [servicios]);

  // Filtrar servicios según formik.values
  const serviciosFiltrados = useMemo(() => {
    return servicios.filter(s => {
      const { ciudad, vehiculo, empresa } = formik.values;
      const matchCity = ciudad ? s.ciudad === ciudad : true;
      const matchVeh =
        vehiculo ? s.categoria_vehiculo.nombre === vehiculo : true;
      const matchEmp = empresa ? s.empresa === empresa : true;
      return matchCity && matchVeh && matchEmp;
    });
  }, [servicios, formik.values]);

  // "Ver más"
  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => setVisibleCount(serviciosFiltrados.length);

  return (
    <div className="container mx-auto w-11/12 mt-10" id="trabajos">
      {/* Filtro */}
      <div className="bg-custom-dark p-4 rounded mb-6">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <CustomSelect
              label="Ciudad"
              name="ciudad"
              formik={formik}
              options={cityOptions}
            />
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
          <button
            type="submit"
            className="bg-custom-blue text-white px-6 py-2 rounded hover:bg-custom-blue/80 transition-colors md:ml-4"
          >
            Filtrar
          </button>
        </form>
      </div>

      {/* Estado de carga/error */}
      {loading && <p className="text-center">Cargando servicios...</p>}
      {error && <p className="text-center text-red-500">Error al cargar servicios.</p>}

      {/* Listado de tarjetas filtradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviciosFiltrados.slice(0, visibleCount).map(servicio => (
          <TarjetaAplicar key={servicio.id} servicio={servicio} />
        ))}
      </div>

      {/* Ver más */}
      {visibleCount < serviciosFiltrados.length && (
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
