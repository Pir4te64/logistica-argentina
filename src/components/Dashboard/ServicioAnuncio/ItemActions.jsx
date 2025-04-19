// src/components/Dashboard/ServicioAnuncio/ItemActions.jsx
import React from 'react';
import {
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
} from 'react-icons/fa';

const ItemActions = ({
    editMode,
    setEditMode,
    handleDelete,
    deleting,
    handleSave,
    saving,
    handleCancel,
}) => (
    <div className="mt-4 sm:mt-0 flex space-x-2">
        {!editMode ? (
            <>
                <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <FaEdit /> <span className="ml-1">Editar</span>
                </button>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center text-custom-red hover:text-custom-red/80 disabled:opacity-50"
                >
                    <FaTrash />{' '}
                    <span className="ml-1">
                        {deleting ? 'Eliminando…' : 'Eliminar'}
                    </span>
                </button>
            </>
        ) : (
            <>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-custom-blue-medium disabled:opacity-50"
                >
                    <FaCheck />{' '}
                    <span className="ml-2">
                        {saving ? 'Guardando…' : 'Guardar'}
                    </span>
                </button>
                <button
                    onClick={handleCancel}
                    className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                    <FaTimes /> <span className="ml-2">Cancelar</span>
                </button>
            </>
        )}
    </div>
);

export default ItemActions;
