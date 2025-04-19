// src/hooks/useServicioAnuncioItem.js
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/Api/Api';
import Swal from 'sweetalert2';

export default function useServicioAnuncioItem(servicio, onUpdated) {
    const [form, setForm] = useState(servicio);
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    // Genérico para inputs y checkboxes
    const handleChange = e => {
        const { name, type, value, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    // Campos extra
    const handleExtraChange = (i, field, val) => {
        setForm(f => ({
            ...f,
            campos_extra: f.campos_extra.map((c, idx) =>
                idx === i ? { ...c, [field]: val } : c
            )
        }));
    };
    const addExtra = () =>
        setForm(f => ({
            ...f,
            campos_extra: [...f.campos_extra, { nombre: '', valor: '' }]
        }));
    const removeExtra = i =>
        setForm(f => ({
            ...f,
            campos_extra: f.campos_extra.filter((_, idx) => idx !== i)
        }));

    const handleCancel = () => {
        setForm(servicio);
        setEditMode(false);
        setError('');
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditMode(false);
            onUpdated();
        } catch {
            setError('No se pudo guardar. Intenta nuevamente.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        // 1) Mostramos el diálogo de confirmación
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el servicio permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        // 2) Si el usuario no confirmó, salimos sin hacer nada
        if (!result.isConfirmed) {
            return;
        }

        // 3) Continuamos con la eliminación
        setDeleting(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // 4) Informamos éxito y refrescamos la lista
            await Swal.fire({
                title: 'Eliminado',
                text: 'El servicio ha sido eliminado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            onUpdated();
        } catch {
            setError('No se pudo eliminar. Intenta nuevamente.');
            Swal.fire({
                title: 'Error',
                text: 'No se pudo eliminar. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setDeleting(false);
        }
    };

    return {
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
        handleDelete
    };
}
