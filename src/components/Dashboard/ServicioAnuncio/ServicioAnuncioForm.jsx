// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioForm.jsx
import React, { useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import useServicioAnuncioForm from "./useServicioAnuncioForm";
import { Section, InputText, Check, Select } from "./FormControls";
import GeneralInfoSections from "./GeneralInfoSections";
import ExtraFieldsSection from "./ExtraFieldsSection";
import ConfigSections from "./ConfigSections";

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
        handleSubmit,
        imagenes
    } = useServicioAnuncioForm({ onSubmit });

    const today = new Date().toISOString().split("T")[0];

    const isFormValid = useMemo(() => {
        return (
            form.empresa.trim() !== "" &&
            form.fecha_inicio_servicio !== "" &&
            form.tarifa_total !== "" &&
            form.direccion_recogida.trim() !== "" &&
            form.direccion_entrega.trim() !== "" &&
            form.telefono_contacto.trim() !== "" &&
            form.ciudad.trim() !== "" &&
            form.cantidad_productos !== "" &&
            form.cantidad_vehiculos !== "" &&
            form.peso !== "" &&
            form.dimensiones.trim() !== "" &&
            form.categoriaVehiculoId !== "" &&
            form.beneficioIds.length > 0 &&
            form.resaltarId !== "" &&
            form.estadoServicioId !== ""
        );
    }, [form]);

    const onFormSubmit = e => {
        e.preventDefault();
        if (!isFormValid) return;
        handleSubmit(e);
    };

    return (
        <form
            onSubmit={onFormSubmit}
            className="w-full max-w-4xl mx-auto bg-white rounded shadow text-[15px] sm:text-base sm:p-4 md:p-6 space-y-6"
        >
            <h2 className="text-2xl font-semibold">Crear Servicio de Anuncio</h2>

            <GeneralInfoSections form={form} handleChange={handleChange} />
            {/* 6. Características (flags) */}
            <Section title="Características del envío">
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
            <Section title="Multimedia">
                <InputText
                    label="URL de video"
                    name="video_url"
                    value={form.video_url}
                    onChange={handleChange}
                    placeholder="URL del video (YouTube, Vimeo, etc.)"
                />
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


            {/* Submit */}
            <div className="text-right">
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`bg-custom-blue text-white rounded px-6 py-2 w-full sm:w-auto ${!isFormValid
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-custom-blue-medium'
                        }`}
                >
                    Crear servicio
                </button>
            </div>
        </form>
    );
};

export default ServicioAnuncioForm;
