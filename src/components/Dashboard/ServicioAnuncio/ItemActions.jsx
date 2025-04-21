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
    <div className="flex flex-wrap gap-2">
        {!editMode ? (
            <>
                {/* Editar */}
                <button
                    onClick={() => setEditMode(true)}
                    className="
            inline-flex items-center px-3 py-2
            bg-white text-indigo-600 border border-indigo-600
            text-sm font-medium rounded-md
            hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            transition
          "
                >
                    <FaEdit className="mr-2" /> Editar
                </button>

                {/* Eliminar */}
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className={`
            inline-flex items-center px-3 py-2
            text-sm font-medium rounded-md
            text-white bg-red-600 border border-transparent
            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            transition
            ${deleting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    <FaTrash className="mr-2" />
                    {deleting ? 'Eliminando…' : 'Eliminar'}
                </button>
            </>
        ) : (
            <>
                {/* Guardar */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`
            inline-flex items-center px-3 py-2
            text-sm font-medium rounded-md
            text-white bg-green-600 border border-transparent
            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            transition
            ${saving ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    <FaCheck className="mr-2" />
                    {saving ? 'Guardando…' : 'Guardar'}
                </button>

                {/* Cancelar */}
                <button
                    onClick={handleCancel}
                    className="
            inline-flex items-center px-3 py-2
            bg-gray-100 text-gray-700 border border-transparent
            text-sm font-medium rounded-md
            hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
            transition
          "
                >
                    <FaTimes className="mr-2" /> Cancelar
                </button>
            </>
        )}
    </div>
);

export default ItemActions;
