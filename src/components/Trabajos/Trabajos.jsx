// src/components/Trabajos/Trabajos.jsx
import React, { useEffect, useState, useMemo } from "react";
import CustomSelect from "@/components/Trabajos/CustomSelect";
import TarjetaAplicar from "@/components/Trabajos/TarjetaAplicar";
import { useTrabajos } from "@/components/Trabajos/useTrabajos";
import ServicioModal from "@/components/Trabajos/Modal";
import { EMPRESAS_OPTIONS, VEHICLE_OPTIONS } from "./estaticos";

const Trabajos = () => {
  const { fetchServicios, servicios = [], loading, error } = useTrabajos();

  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  const [filters, setFilters] = useState({
    ciudad: "",
    vehiculo: "",
    empresa: "",
  });

  const handleSelectChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const cityOptions = useMemo(
    () =>
      Array.from(new Set(servicios.map((s) => s.ciudad)))
        .sort()
        .map((c) => ({ label: c, value: c })),
    [servicios]
  );
  const empresasOptions = useMemo(() => EMPRESAS_OPTIONS, []);

  const serviciosFiltrados = useMemo(
    () =>
      servicios.filter((s) => {
        const { ciudad, vehiculo, empresa } = filters;
        return (
          (!ciudad || s.ciudad === ciudad) &&
          (!vehiculo ||
            s.categoria_vehiculo.nombre.toLowerCase() ===
              vehiculo.toLowerCase()) &&
          (!empresa || s.empresa === empresa)
        );
      }),
    [servicios, filters]
  );

  // **Nuevo: ordenamos por el atributo `orden` de forma ascendente**
  const sortedServicios = useMemo(() => {
    return [...serviciosFiltrados].sort((a, b) => a.orden - b.orden);
  }, [serviciosFiltrados]);

  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () =>
    setVisibleCount((prev) => Math.min(prev + 4, sortedServicios.length));

  const [selectedServicio, setSelectedServicio] = useState(null);
  const clearFilters = () => {
    setFilters({ ciudad: "", vehiculo: "", empresa: "" });
    setVisibleCount(4);
  };

  return (
    <div className="container mx-auto w-11/12 mt-10" id="trabajos">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Trabajos</h1>

      {/* Filtros */}
      <div className="bg-custom-dark p-4 rounded mb-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <CustomSelect
            className="flex-1"
            label="Ciudad"
            name="ciudad"
            value={filters.ciudad}
            onChange={(v) => handleSelectChange("ciudad", v)}
            options={cityOptions}
          />
          <CustomSelect
            className="flex-1"
            label="Vehículo"
            name="vehiculo"
            value={filters.vehiculo}
            onChange={(v) => handleSelectChange("vehiculo", v)}
            options={VEHICLE_OPTIONS}
          />
          <CustomSelect
            className="flex-1"
            label="Empresa"
            name="empresa"
            value={filters.empresa}
            onChange={(v) => handleSelectChange("empresa", v)}
            options={empresasOptions}
          />
        </div>

        <div className="mt-4 flex justify-center w-full">
          <button
            onClick={clearFilters}
            className="text-white bg-gray-500 px-4 py-2 rounded w-full hover:bg-gray-600 transition"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-600 mb-4">
          Error al cargar servicios. Por favor intenta de nuevo.
        </p>
      )}

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[200px]">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-custom-red"></div>
          </div>
        ) : sortedServicios.length > 0 ? (
          sortedServicios
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

      {!loading && visibleCount < sortedServicios.length && (
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
