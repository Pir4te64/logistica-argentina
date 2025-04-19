// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioForm.jsx
import React, { useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import useServicioAnuncioForm from "./useServicioAnuncioForm";
import { Section, InputText, Check, Select } from "./FormControls";

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

            {/* 1. Datos básicos */}
            <Section title="Datos básicos" defaultOpen>
                <div className="space-y-4">
                    <InputText
                        label="Empresa"
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre de la empresa"
                        required
                    />
                    <InputText
                        label="Fecha de inicio"
                        type="date"
                        name="fecha_inicio_servicio"
                        value={form.fecha_inicio_servicio}
                        onChange={handleChange}
                        min={today}
                        placeholder="Selecciona la fecha de inicio"
                        required
                    />
                    <InputText
                        label="Tarifa total"
                        type="number"
                        step="0.01"
                        name="tarifa_total"
                        value={form.tarifa_total}
                        onChange={handleChange}
                        placeholder="Ej. 1500.00"
                        required
                    />
                </div>
            </Section>

            {/* 2. Periodo */}
            <Section title="Periodo">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <InputText
                        label="Texto periodo"
                        name="periodo_nombre"
                        value={form.periodo_nombre}
                        onChange={handleChange}
                        placeholder="Ej. Mensual"
                    />
                    <InputText
                        label="Valor periodo"
                        type="number"
                        name="periodo_valor"
                        value={form.periodo_valor}
                        onChange={handleChange}
                        placeholder="Ej. 12"
                    />
                </div>
            </Section>

            {/* 3. Direcciones */}
            <Section title="Direcciones">
                <InputText
                    label="Dirección de recogida"
                    name="direccion_recogida"
                    value={form.direccion_recogida}
                    onChange={handleChange}
                    placeholder="Calle, número, piso, depto."
                />
                <InputText
                    label="Dirección de entrega"
                    name="direccion_entrega"
                    value={form.direccion_entrega}
                    onChange={handleChange}
                    placeholder="Calle, número, piso, depto."
                />
            </Section>

            {/* 4. Contacto y ciudad */}
            <Section title="Contacto">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <InputText
                        label="Teléfono contacto"
                        name="telefono_contacto"
                        value={form.telefono_contacto}
                        onChange={handleChange}
                        placeholder="Ej. +5493512345678"
                    />
                    <InputText
                        label="Ciudad"
                        name="ciudad"
                        value={form.ciudad}
                        onChange={handleChange}
                        placeholder="Ej. Posadas"
                    />
                </div>
            </Section>

            {/* 5. Cantidades y dimensiones */}
            <Section title="Cantidades y dimensiones">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                    <InputText
                        label="Productos"
                        type="number"
                        name="cantidad_productos"
                        value={form.cantidad_productos}
                        onChange={handleChange}
                        placeholder="Cantidad total de productos"
                    />
                    <InputText
                        label="Vehículos"
                        type="number"
                        name="cantidad_vehiculos"
                        value={form.cantidad_vehiculos}
                        onChange={handleChange}
                        placeholder="Número de vehículos"
                    />
                    <InputText
                        label="Peso (kg)"
                        name="peso"
                        value={form.peso}
                        onChange={handleChange}
                        placeholder="Peso total en kg"
                    />
                </div>
                <InputText
                    label="Dimensiones"
                    name="dimensiones"
                    value={form.dimensiones}
                    onChange={handleChange}
                    placeholder="Alto x Largo x Ancho"
                />
            </Section>

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

            {/* 8. Selects */}
            <Section title="Configuraciones">
                <Select
                    label="Categoría de Vehículo"
                    name="categoriaVehiculoId"
                    value={form.categoriaVehiculoId}
                    onChange={handleChange}
                    loading={loadingCat}
                    options={categorias}
                />
                <div>
                    <Select
                        label="Beneficios"
                        name="beneficioIds"
                        multiple
                        value={form.beneficioIds}
                        onChange={handleBeneficiosChange}
                        loading={loadingBen}
                        options={beneficios}
                        tall
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Puedes seleccionar más de una opción
                    </p>
                </div>
                <Select
                    label="Resaltador de Anuncio"
                    name="resaltarId"
                    value={form.resaltarId}
                    onChange={handleChange}
                    loading={loadingRes}
                    options={resaltadores}
                />
                <Select
                    label="Estado de Servicio"
                    name="estadoServicioId"
                    value={form.estadoServicioId}
                    onChange={handleChange}
                    loading={loadingEst}
                    options={estados}
                />
            </Section>

            {/* 9. Campos extra */}
            <Section title="Campos extra">
                {form.camposExtra.map((c, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
                        <InputText
                            placeholder="Nombre del campo"
                            value={c.nombre}
                            onChange={e => handleCampoExtraChange(i, 'nombre', e.target.value)}
                            className="flex-1"
                        />
                        <InputText
                            placeholder="Valor del campo"
                            value={c.valor}
                            onChange={e => handleCampoExtraChange(i, 'valor', e.target.value)}
                            className="flex-1"
                        />
                        <button
                            type="button"
                            onClick={() => removeCampoExtra(i)}
                            className="bg-custom-red text-white px-3 rounded-md"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addCampoExtra}
                    className="bg-custom-blue text-white rounded px-3 py-1"
                >
                    Agregar campo extra
                </button>
            </Section>

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
