// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioForm.jsx
import { FaTimes } from "react-icons/fa";
import useServicioAnuncioForm from "@/components/Dashboard/ServicioAnuncio/useServicioAnuncioForm";
import {
  Section,
  InputText,
  Check,
  Select,
} from "@/components/Dashboard/ServicioAnuncio/FormControls";
import GeneralInfoSections from "@/components/Dashboard/ServicioAnuncio/GeneralInfoSections";
import ConfigSections from "@/components/Dashboard/ServicioAnuncio/ConfigSections";
import ExtraFieldsSection from "@/components/Dashboard/ServicioAnuncio/ExtraFieldsSection";
import Swal from "sweetalert2";
import { useMemo } from "react";
import ServicesSection from "@/components/Dashboard/ServicioAnuncio/ServicesSection";
import PlazosSection from "@/components/Dashboard/ServicioAnuncio/PlazosSection";

const ServicioAnuncioForm = ({ onSubmit }) => {
  const {
    form,
    beneficios,
    categorias,
    resaltadores,
    estados,
    loadingBen,
    loadingCat,
    loadingRes,
    loadingEst,
    handleChange,
    handleBeneficiosChange,
    handleCampoExtraChange,
    addCampoExtra,
    removeCampoExtra,
    handleFileChange,
    removeImage,
    handleVideoChange,
    removeVideo,
    handleSubmit,
    imagenes,
    videoFile,
    servicios,
    handleServicioChange,
    addServicio,
    removeServicio,
    addPlazo,
    removePlazo,
    handlePlazoChange,
    plazos,
  } = useServicioAnuncioForm({ onSubmit });

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Video demasiado grande",
        text: "El video no puede superar los 2 MB.",
        confirmButtonText: "Entendido",
      });
      e.target.value = "";
      return;
    }
    handleVideoChange(e);
  };

  // Validación de campos obligatorios y listado de faltantes
  const missingFields = useMemo(() => {
    const list = [];
    if (!form.empresa.trim()) list.push("Empresa");
    if (!form.fecha_inicio_servicio) list.push("Fecha de inicio del servicio");
    if (!form.tarifa_total) list.push("Tarifa total");
    if (!form.direccion_recogida.trim()) list.push("Dirección de recogida");
    if (!form.direccion_entrega.trim()) list.push("Dirección de entrega");
    if (!form.telefono_contacto.trim()) list.push("Teléfono de contacto");
    if (!form.ciudad.trim()) list.push("Ciudad");
    //if (!form.periodo_nombre.trim()) list.push("Nombre del periodo");
    //if (!form.cantidad_productos) list.push("Cantidad de productos");
    //if (!form.cantidad_vehiculos) list.push("Cantidad de vehículos");
    //if (!form.peso) list.push("Peso");
    //if (!form.dimensiones.trim()) list.push("Dimensiones");
    if (!form.categoriaVehiculoId) list.push("Categoría de vehículo");
    if (form.beneficioIds.length === 0) list.push("Beneficios");
    if (!form.resaltarId) list.push("Resaltador de anuncio");
    if (!form.estadoServicioId) list.push("Estado del servicio");
    return list;
  }, [form]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (missingFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Faltan campos obligatorios",
        html: `<p>Por favor completa los siguientes campos:</p><ul style=\"text-align:left;\">${missingFields
          .map((f) => `<li>${f}</li>`)
          .join("")}</ul>`,
        confirmButtonText: "Entendido",
      });
      return;
    }
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="w-full max-w-4xl mx-auto bg-white rounded shadow text-[15px] sm:text-base sm:p-4 md:p-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold">Crear Servicio de Anuncio</h2>

      {/* 1–5: Datos básicos, periodo, direcciones, contacto, cantidades */}
      <GeneralInfoSections form={form} handleChange={handleChange} />

      {/* 6. Características (flags) */}
      <Section title="Características del envío (Opcional)">
        <div className="flex flex-wrap gap-4">
          <Check
            name="fragil"
            label="Frágil"
            checked={form.fragil}
            onChange={handleChange}
          />
          <Check
            name="liquido"
            label="Líquido"
            checked={form.liquido}
            onChange={handleChange}
          />
          <Check
            name="requiere_refrigeracion"
            label="Requiere refrig."
            checked={form.requiere_refrigeracion}
            onChange={handleChange}
          />
        </div>
      </Section>

      {/* 7. Multimedia */}
      <Section title="Multimedia *">
        <label className="block font-medium">Video (máx 2 MB)</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoSelect}
          className="w-full mt-1 p-2 border rounded"
        />
        {videoFile && (
          <div className="relative mt-4 group">
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="w-full max-h-48 object-cover rounded"
            />
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <label className="block font-medium mt-4">Imágenes</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full mt-1 p-2 border rounded"
        />
        {imagenes.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagenes.map((file, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* 8. Selects */}
      <ConfigSections
        form={form}
        categorias={categorias}
        beneficios={beneficios}
        resaltadores={resaltadores}
        estados={estados}
        loadingCat={loadingCat}
        loadingBen={loadingBen}
        loadingRes={loadingRes}
        loadingEst={loadingEst}
        handleChange={handleChange}
        handleBeneficiosChange={handleBeneficiosChange}
      />

      {/* 9. Campos extra */}
      <ExtraFieldsSection
        camposExtra={form.camposExtra}
        handleCampoExtraChange={handleCampoExtraChange}
        addCampoExtra={addCampoExtra}
        removeCampoExtra={removeCampoExtra}
      />

      {/* Servicios dinámicos si los activas más adelante */}
      <ServicesSection
        servicios={servicios}
        handleServicioChange={handleServicioChange}
        addServicio={addServicio}
        removeServicio={removeServicio}
      />
      <PlazosSection
        plazos={plazos}
        addPlazo={addPlazo}
        removePlazo={removePlazo}
        handlePlazoChange={handlePlazoChange}
      />
      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-custom-blue text-white rounded px-6 py-2 w-full sm:w-auto hover:bg-custom-blue-medium transition"
        >
          Crear servicio
        </button>
      </div>
    </form>
  );
};

export default ServicioAnuncioForm;
