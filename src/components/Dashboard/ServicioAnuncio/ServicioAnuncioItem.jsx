// src/components/Dashboard/ServicioAnuncio/ServicioAnuncioItem.jsx
import React from "react";
import ItemActions from "./ItemActions";
import ServicioAnuncioItemEdit from "./ServicioAnuncioItemEdit";
import ServicioAnuncioItemView from "./ServicioAnuncioItemView";
import useServicioAnuncioItem from "./useServicioAnuncioItem";
import useCategoriaVehiculos from "../Categoria/useCategoriaVehiculos";
import useResaltarAnuncio from "../ResaltarAnuncio/useResaltarAnuncio";
import useEstadoServicio from "../EstadoServicio/useEstadoServicio";

const OMITIR = [
    "created_at",
    "updated_at",
    "beneficios",
    "categoria_vehiculo",
    "resaltador",
    "estado",
    "imagenes",
    "campos_extra",
    "video_url",
];
const OMITIR_NESTED = ["id", "created_at", "updated_at"];

const EDITABLE_FIELDS = {
    empresa: "text",
    fecha_inicio_servicio: "date",
    tarifa_total: "number",
    periodo_nombre: "text",
    periodo_valor: "number",
    direccion_recogida: "text",
    direccion_entrega: "text",
    telefono_contacto: "text",
    cantidad_productos: "number",
    cantidad_vehiculos: "number",
    peso: "number",
    dimensiones: "text",
    fragil: "checkbox",
    liquido: "checkbox",
    requiere_refrigeracion: "checkbox",
    ciudad: "text",
    categoria_vehiculo_id: "select_categoria",
    resaltador_anuncio_id: "select_resaltador",
    estado_servicio_id: "select_estado",
};

const labelize = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

const ServicioAnuncioItem = ({ servicio, index, onUpdated }) => {
    const {
        form,
        editMode,
        saving,
        deleting,
        error,
        setEditMode,
        handleChange,
        handleExtraChange,
        addExtra,
        removeExtra,
        handleCancel,
        handleSave,
        handleDelete,
    } = useServicioAnuncioItem(servicio, onUpdated);

    const { data: catResp } = useCategoriaVehiculos();
    const { data: resResp } = useResaltarAnuncio();
    const { data: estResp } = useEstadoServicio();
    const categorias = catResp?.data || [];
    const resaltadores = resResp?.data || [];
    const estados = estResp?.data || [];

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg space-y-6">
            {/* Header con acciones */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">

                <ItemActions
                    editMode={editMode}
                    setEditMode={setEditMode}
                    handleDelete={handleDelete}
                    deleting={deleting}
                    handleSave={handleSave}
                    saving={saving}
                    handleCancel={handleCancel}
                />
            </header>

            {error && <p className="text-red-600 text-center">{error}</p>}

            {editMode ? (
                <ServicioAnuncioItemEdit
                    form={form}
                    handleChange={handleChange}
                    categorias={categorias}
                    resaltadores={resaltadores}
                    estados={estados}
                    handleExtraChange={handleExtraChange}
                    addExtra={addExtra}
                    removeExtra={removeExtra}
                    EDITABLE_FIELDS={EDITABLE_FIELDS}
                    labelize={labelize}
                />
            ) : (
                <ServicioAnuncioItemView
                    form={form}
                    labelize={labelize}
                    OMITIR={OMITIR}
                    OMITIR_NESTED={OMITIR_NESTED}
                />
            )}
        </div>
    );
};

export default ServicioAnuncioItem;
