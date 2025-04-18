import useServicioAnuncioForm from "./useServicioAnuncioForm";

const Section = ({ title, children, defaultOpen = false }) => (
    <details open={defaultOpen} className="border rounded-lg">
        <summary className="cursor-pointer select-none bg-gray-100 px-3 py-2 font-medium">
            {title}
        </summary>
        <div className="space-y-4 px-3 py-4">{children}</div>
    </details>
);

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
        handleSubmit,
    } = useServicioAnuncioForm({ onSubmit });

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl mx-auto bg-white rounded shadow text-[15px] sm:text-base
                 sm:p-4 md:p-6 space-y-6"
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
                        required
                    />

                    <InputText
                        label="Fecha de inicio"
                        type="date"
                        name="fecha_inicio_servicio"
                        value={form.fecha_inicio_servicio}
                        onChange={handleChange}
                        required
                    />

                    <InputText
                        label="Tarifa total"
                        type="number"
                        step="0.01"
                        name="tarifa_total"
                        value={form.tarifa_total}
                        onChange={handleChange}
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
                    />
                    <InputText
                        label="Valor periodo"
                        type="number"
                        name="periodo_valor"
                        value={form.periodo_valor}
                        onChange={handleChange}
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
                />
                <InputText
                    label="Dirección de entrega"
                    name="direccion_entrega"
                    value={form.direccion_entrega}
                    onChange={handleChange}
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
                    />
                    <InputText
                        label="Ciudad"
                        name="ciudad"
                        value={form.ciudad}
                        onChange={handleChange}
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
                    />
                    <InputText
                        label="Vehículos"
                        type="number"
                        name="cantidad_vehiculos"
                        value={form.cantidad_vehiculos}
                        onChange={handleChange}
                    />
                    <InputText
                        label="Peso (kg)"
                        name="peso"
                        value={form.peso}
                        onChange={handleChange}
                    />
                </div>

                <InputText
                    label="Dimensiones"
                    name="dimensiones"
                    value={form.dimensiones}
                    onChange={handleChange}
                />
            </Section>

            {/* 6. Características (flags) */}
            <Section title="Características del envío">
                <div className="flex flex-wrap gap-4">
                    <Check name="fragil" label="Frágil" checked={form.fragil} onChange={handleChange} />
                    <Check name="liquido" label="Líquido" checked={form.liquido} onChange={handleChange} />
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
                />
                <label className="block font-medium mt-4">Imágenes</label>
                <input
                    type="file"
                    name="imagenes"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full mt-1 p-2 border rounded"
                />
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
                            placeholder="Nombre"
                            value={c.nombre}
                            onChange={(e) => handleCampoExtraChange(i, "nombre", e.target.value)}
                            className="flex-1"
                        />
                        <InputText
                            placeholder="Valor"
                            value={c.valor}
                            onChange={(e) => handleCampoExtraChange(i, "valor", e.target.value)}
                            className="flex-1"
                        />
                        <button
                            type="button"
                            onClick={() => removeCampoExtra(i)}
                            className="bg-custom-red bg-custom-red/80 text-white px-3  rounded-md"
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
                    className="bg-custom-blue hover:bg-custom-blue-medium text-white rounded px-6 py-2
                     w-full sm:w-auto"
                >
                    Crear servicio
                </button>
            </div>
        </form>
    );
};

/* === Extracted UI helpers ==== */

const InputText = ({
    label,
    className = "",
    ...props
}) => (
    <div className={className}>
        {label && <label className="block font-medium">{label}</label>}
        <input {...props} className="w-full mt-1 p-2 border rounded" />
    </div>
);

const Check = ({ label, ...props }) => (
    <label className="inline-flex items-center">
        <input type="checkbox" className="form-checkbox" {...props} />
        <span className="ml-2">{label}</span>
    </label>
);

const Select = ({
    label,
    loading,
    options = [],
    tall,
    ...props
}) => (
    <div className="w-full">
        <label className="block font-medium">{label}</label>
        {loading ? (
            <p>Cargando {label.toLowerCase()}…</p>
        ) : (
            <select
                {...props}
                className={`w-full mt-1 p-2 border rounded ${tall ? "h-32" : ""}`}
            >
                {!props.multiple && <option value="">Selecciona</option>}
                {options.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.nombre}
                    </option>
                ))}
            </select>
        )}
    </div>
);

export default ServicioAnuncioForm;
