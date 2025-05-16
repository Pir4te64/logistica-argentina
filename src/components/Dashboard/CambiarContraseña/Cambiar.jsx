// src/components/Cambiar.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import { AuthContext } from "@/Api/AuthContext";
import { FaSearch, FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaMap } from "react-icons/fa";
import ChangePasswordModal from "@/components/Dashboard/CambiarContraseña/ChangePasswordModal";

const Cambiar = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(10);
  const { token: contextToken } = useContext(AuthContext);

  // Reset pagination cuando cambian users o query
  useEffect(() => {
    setItemsToShow(10);
  }, [users, query]);

  // Función para listar usuarios
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const authToken = contextToken || localStorage.getItem("token");
    if (!authToken) {
      setError("No se encontró token de autenticación");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(API_URL.LISTAR_USUARIOS, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const lista = res.data.data || res.data.usuarios || [];
      setUsers(lista);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [contextToken]);

  // Carga inicial
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filtrado en tiempo real
  const filteredUsers = users.filter((u) => {
    const term = query.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });

  // Usuarios visibles según paginación
  const visibleUsers = filteredUsers.slice(0, itemsToShow);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Listado de Usuarios</h2>

      {/* Buscador */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border py-2 pl-10 pr-4 focus:border-blue-300 focus:outline-none focus:ring"
        />
      </div>

      {/* Lista con botón Editar */}
      <ul className="divide-y divide-gray-200">
        {visibleUsers.map((user) => (
          <li key={user.id} className="flex items-center justify-between py-2">
            <div>
              <p className="flex items-center gap-2 font-medium">
                <FaUser className="text-custom-gray" />
                {user.name || "—"}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope className="text-custom-gray" />
                {user.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaPhone className="text-custom-gray" />
                Teléfono: {user?.telefono || "—"}
              </p>
             
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-custom-gray" />
                Dirección: {user.datos_usuario?.direccion}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaCity className="text-custom-gray" />
                Ciudad: {user.datos_usuario?.ciudad}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaMap className="text-custom-gray" />
                Provincia: {user.datos_usuario?.provincia}
              </p>
             
            </div>
            <button
              onClick={() => setEditingUserId(user.id)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaEdit />
            </button>
          </li>
        ))}
      </ul>

      {/* Botón Mostrar más */}
      {filteredUsers.length > itemsToShow && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setItemsToShow((prev) => prev + 10)}
            className="rounded bg-custom-blue-medium px-4 py-2 text-white hover:bg-custom-blue"
          >
            Mostrar más
          </button>
        </div>
      )}

      {/* Modal de cambio de contraseña */}
      <ChangePasswordModal
        userId={editingUserId}
        isOpen={editingUserId !== null}
        onClose={() => setEditingUserId(null)}
        onSuccess={() => {
          fetchUsers();
          setEditingUserId(null);
        }}
      />
    </div>
  );
};

export default Cambiar;
