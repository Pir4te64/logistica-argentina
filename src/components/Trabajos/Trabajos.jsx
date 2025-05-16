// src/components/Trabajos/Trabajos.jsx
import React, { useEffect, useState, useMemo } from "react";
import CustomSelect from "@/components/Trabajos/CustomSelect";
import TarjetaAplicar from "@/components/Trabajos/TarjetaAplicar";
import { useTrabajos } from "@/components/Trabajos/store/useTrabajos";
import ServicioModal from "@/components/Trabajos/Modal";
import { EMPRESAS_OPTIONS, VEHICULOS_OPTIONS } from "@/components/Trabajos/text";

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
    <div className="container mx-auto mt-10 w-11/12" id="trabajos">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-800">Trabajos</h1>

      {/* Filtros */}
      <div className="mb-6 rounded bg-custom-dark p-4">
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
            options={VEHICULOS_OPTIONS}
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

        <div className="mt-4 flex w-full justify-center">
          <button
            onClick={clearFilters}
            className="w-full rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-red-600">
          Error al cargar servicios. Por favor intenta de nuevo.
        </p>
      )}

      {/* Grid de tarjetas */}
      <div className="grid min-h-[200px] grid-cols-1 gap-4 md:grid-cols-2">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-10">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-custom-red"></div>
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
          <p className="col-span-full text-center text-gray-600">
            No se encontraron servicios con esos filtros.
          </p>
        )}
      </div>

      {!loading && visibleCount < sortedServicios.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleShowMore}
            className="rounded bg-custom-red px-6 py-3 text-xl text-white transition-colors hover:bg-custom-red/80"
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
