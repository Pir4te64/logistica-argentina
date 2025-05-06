// src/components/Cambiar.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import { AuthContext } from "@/Api/AuthContext";
import { FaSearch, FaEdit } from "react-icons/fa";
import ChangePasswordModal from "./ChangePasswordModal";

const Cambiar = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const { token: contextToken } = useContext(AuthContext);

  // 1. Función para listar usuarios
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

  // 2. Al montar, carga inicial
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 3. Filtrado en tiempo real
  const filteredUsers = users.filter((u) => {
    const term = query.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Listado de Usuarios</h2>

      {/* Buscador */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Lista con botón Editar */}
      <ul className="divide-y divide-gray-200">
        {filteredUsers.map((user) => (
          <li key={user.id} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{user.name || "—"}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
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

      {/* Modal de cambio de contraseña */}
      <ChangePasswordModal
        userId={editingUserId}
        isOpen={editingUserId !== null}
        onClose={() => setEditingUserId(null)}
        onSuccess={() => {
          fetchUsers(); // 4. Volver a listar usuarios
          setEditingUserId(null); // 5. Cerrar modal
        }}
      />
    </div>
  );
};

export default Cambiar;
