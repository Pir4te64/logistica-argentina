// src/components/Dashboard/ServicioAnuncio/GeneralInfoSections.jsx
import React from 'react';
import { Section, InputText, Select } from '@/components/Dashboard/ServicioAnuncio/FormControls';
import useContactPhones from '../../hooks/useContactPhones';


const GeneralInfoSections = ({ form, handleChange }) => {
    const today = new Date().toISOString().split('T')[0];
    const { data: contactPhoneOptions, loading: loadingContactPhones } = useContactPhones();
    return (
        <>
            {/* 1. Datos básicos */}
            <Section title="Datos básicos*" >
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
                        label="Periodo"
                        name="periodo_nombre"
                        value={form.periodo_nombre}
                        onChange={handleChange}
                        placeholder="Ej. Mensual"
                    />
                    <InputText
                        label="Valor"
                        type="number"
                        name="periodo_valor"
                        value={form.periodo_valor}
                        onChange={handleChange}
                        placeholder="Ej. 12"
                    />
                </div>
            </Section>

            {/* 3. Direcciones */}
            <Section title="Direcciones*">
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
            <Section title="Contacto*">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <InputText
                        label="Empresa Teléfono "
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

            {/* 4.1 Soporte */}
            <Section title="Soporte*">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Número de soporte telefónico"
                        name="soporte_telefonico"
                        value={form.soporte_telefonico}
                        onChange={handleChange}
                        loading={loadingContactPhones}
                        options={contactPhoneOptions}
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
        </>
    );
};

export default GeneralInfoSections;
