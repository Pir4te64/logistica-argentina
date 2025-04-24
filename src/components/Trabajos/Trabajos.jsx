// src/components/Trabajos/Trabajos.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import { initialValues } from "@/components/Trabajos/trabajos.data";
import CustomSelect from "@/components/Trabajos/CustomSelect";
import TarjetaAplicar from "@/components/Trabajos/TarjetaAplicar";
import { useTrabajos } from "@/components/Trabajos/useTrabajos";
import ServicioModal from "@/components/Trabajos/Modal";

const Trabajos = () => {
  const { fetchServicios, servicios = [], loading, error } = useTrabajos();

  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const cityOptions = useMemo(
    () =>
      Array.from(new Set(servicios.map((s) => s.ciudad)))
        .sort()
        .map((c) => ({ label: c, value: c })),
    [servicios]
  );
  const vehiculosOptions = useMemo(
    () =>
      Array.from(new Set(servicios.map((s) => s.categoria_vehiculo.nombre)))
        .sort()
        .map((v) => ({ label: v, value: v })),
    [servicios]
  );
  const empresasOptions = useMemo(
    () =>
      Array.from(new Set(servicios.map((s) => s.empresa)))
        .sort()
        .map((e) => ({ label: e, value: e })),
    [servicios]
  );

  const serviciosFiltrados = useMemo(() => {
    return servicios.filter((s) => {
      const { ciudad, vehiculo, empresa } = formik.values;
      return (
        (!ciudad || s.ciudad === ciudad) &&
        (!vehiculo || s.categoria_vehiculo.nombre === vehiculo) &&
        (!empresa || s.empresa === empresa)
      );
    });
  }, [servicios, formik.values]);

  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => setVisibleCount(serviciosFiltrados.length);

  const [selectedServicio, setSelectedServicio] = useState(null);

  return (
    <div className="container mx-auto w-11/12 mt-10" id="trabajos">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Trabajos</h1>

      {/* Filtros */}
      <div className="bg-custom-dark p-4 rounded mb-6">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 md:flex-row"
        >
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
        </form>
      </div>

      {error && (
        <p className="text-red-600 mb-4">
          Error al cargar servicios. Por favor intenta de nuevo.
        </p>
      )}

      {/* Grid de tarjetas, sin alterar tu estética */}
      {/* Grid de tarjetas, sin alterar tu estética */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[200px]">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-custom-red"></div>
          </div>
        ) : serviciosFiltrados.length > 0 ? (
          serviciosFiltrados
            .slice(0, visibleCount)
            .map((servicio) => (
              <TarjetaAplicar
                key={servicio.id}
                servicio={servicio}
                onInfo={() => setSelectedServicio(servicio)}
              />
            ))
        ) : (
          <p className="col-span-full text-gray-600 text-center">
            No se encontraron servicios con esos filtros.
          </p>
        )}
      </div>

      {!loading && visibleCount < serviciosFiltrados.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-custom-red text-white px-6 py-2 rounded hover:bg-custom-red/80 transition-colors"
          >
            Ver más
          </button>
        </div>
      )}

      <ServicioModal
        servicio={selectedServicio}
        onClose={() => setSelectedServicio(null)}
      />
    </div>
  );
};

export default Trabajos;
