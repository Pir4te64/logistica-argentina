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
    servicios,
    handleServicioChange,
    addServicio,
    removeServicio,
    plazos,
    addPlazo,
    removePlazo,
    handlePlazoChange,
    handleSubmit,
    imagenes,
    videoFile,
    imgBanner
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

  const missingFields = useMemo(() => {
    const list = [];
    if (!form.empresa.trim()) list.push("Empresa");
    if (!form.fecha_inicio_servicio) list.push("Fecha de inicio del servicio");
    if (!form.tarifa_total) list.push("Tarifa total");
    if (!form.direccion_recogida.trim()) list.push("Dirección de recogida");
    if (!form.direccion_entrega.trim()) list.push("Dirección de entrega");
    if (!form.telefono_contacto.trim()) list.push("Teléfono de contacto");
    if (!form.ciudad.trim()) list.push("Ciudad");
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
        html: `<p>Por favor completa los siguientes campos:</p><ul style="text-align:left;">${missingFields
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
      className="mx-auto w-full max-w-4xl space-y-6 rounded bg-white text-[15px] sm:p-4 sm:text-base md:p-6"
    >
      <h2 className="text-2xl font-semibold">Crear Servicio de Anuncio</h2>

      {/* 1–5: Datos básicos */}
      <GeneralInfoSections form={form} handleChange={handleChange} />

      {/* 6: Orden de visualización */}
      <Section title="Orden de visualización">
        <InputText
          name="orden"
          label="Orden"
          type="number"
          value={form.orden}
          onChange={handleChange}
          placeholder="Ej: 1, 2, 3…"
        />
      </Section>

      {/* 7: Características (flags) */}
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

      {/* 8: Multimedia */}
      <Section title="Multimedia *">
        <InputText
          name="video_url"
          label="Video"
          type="text"
          value={form.video_url}
          onChange={handleChange}
          placeholder="Ingresa la URL del video"
        />
        {/* {videoFile && (
          <div className="group relative mt-4">
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="max-h-48 w-full rounded object-cover"
            />
            <button
              type="button"
              onClick={removeVideo}
              className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
            >
              <FaTimes />
            </button>
          </div>
        )} */}

        <label className="mt-4 block font-medium">Imágenes</label>
        <input
        id="images-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 w-full rounded border p-2"
        />
        {imagenes.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {imagenes.map((file, idx) => (
              <div key={idx} className="group relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx + 1}`}
                  className="h-32 w-full rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}

         <label className="mt-4 block font-medium">Banner del Anuncio</label>
        <input
          id="banner-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'banner')}
          className="mt-1 w-full rounded border p-2"
        />
        {imgBanner && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              <div key={imgBanner.name} className="group relative">
                <img
                  src={URL.createObjectURL(imgBanner)}
                  alt={`Preview Banner`}
                  className="h-32 w-full rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(0, 'banner')}
                  className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <FaTimes />
                </button>
              </div>
          </div>
        )}
        
      </Section>

      {/* 9: Configuración (selects) */}
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

      {/* 10: Campos extra */}
      <ExtraFieldsSection
        camposExtra={form.camposExtra}
        handleCampoExtraChange={handleCampoExtraChange}
        addCampoExtra={addCampoExtra}
        removeCampoExtra={removeCampoExtra}
      />

      {/* 11: Servicios dinámicos */}
      <ServicesSection
        servicios={servicios}
        handleServicioChange={handleServicioChange}
        addServicio={addServicio}
        removeServicio={removeServicio}
      />

      {/* 12: Plazos dinámicos */}
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
          className="w-full rounded bg-custom-blue px-6 py-2 text-white transition hover:bg-custom-blue-medium sm:w-auto"
        >
          Crear servicio
        </button>
      </div>
    </form>
  );
};

export default ServicioAnuncioForm;
