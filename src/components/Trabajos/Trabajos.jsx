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

  // Ejecutar fetch y esperar la promesa
  useEffect(() => {
    const load = async () => {
      await fetchServicios();
    };
    load();
  }, [fetchServicios]);

  // Formik para filtros
  const formik = useFormik({
    initialValues,
    onSubmit: () => { },
  });

  // Opciones dinámicas
  const cityOptions = useMemo(() => {
    const cities = Array.from(new Set(servicios.map(s => s.ciudad))).sort();
    return cities.map(c => ({ label: c, value: c }));
  }, [servicios]);

  const vehiculosOptions = useMemo(() => {
    const vehs = Array.from(new Set(servicios.map(s => s.categoria_vehiculo.nombre))).sort();
    return vehs.map(v => ({ label: v, value: v }));
  }, [servicios]);

  const empresasOptions = useMemo(() => {
    const emps = Array.from(new Set(servicios.map(s => s.empresa))).sort();
    return emps.map(e => ({ label: e, value: e }));
  }, [servicios]);

  // Filtrado en vivo
  const serviciosFiltrados = useMemo(() => {
    return servicios.filter(s => {
      const { ciudad, vehiculo, empresa } = formik.values;
      const matchCity = ciudad ? s.ciudad === ciudad : true;
      const matchVeh = vehiculo ? s.categoria_vehiculo.nombre === vehiculo : true;
      const matchEmp = empresa ? s.empresa === empresa : true;
      return matchCity && matchVeh && matchEmp;
    });
  }, [servicios, formik.values]);

  // Ver más
  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => setVisibleCount(serviciosFiltrados.length);

  // Modal de info
  const [selectedServicio, setSelectedServicio] = useState(null);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Trabajos</h1>
        <p className="text-gray-600">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Error al cargar servicios.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-11/12 mt-10" id="trabajos">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Trabajos</h1>

      {/* Filtros */}
      <div className="bg-custom-dark p-4 rounded mb-6">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <CustomSelect label="Ciudad" name="ciudad" formik={formik} options={cityOptions} />
          </div>
          <div className="flex-1">
            <CustomSelect label="Vehículo" name="vehiculo" formik={formik} options={vehiculosOptions} />
          </div>
          <div className="flex-1">
            <CustomSelect label="Empresa" name="empresa" formik={formik} options={empresasOptions} />
          </div>
        </form>
      </div>

      {/* Listado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviciosFiltrados.slice(0, visibleCount).map(servicio => (
          <TarjetaAplicar
            key={servicio.id}
            servicio={servicio}
            onInfo={() => setSelectedServicio(servicio)}
          />
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

      {/* Modal de detalles */}
      <ServicioModal
        servicio={selectedServicio}
        onClose={() => setSelectedServicio(null)}
      />
    </div>
  );
};

export default Trabajos;
