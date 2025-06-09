// src/components/Cambiar.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import { AuthContext } from "@/Api/AuthContext";
import { FaSearch, FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaMap } from "react-icons/fa";
import ChangePasswordModal from "@/components/Dashboard/CambiarContraseña/ChangePasswordModal";
import { exportToExcel } from "@/helpers/exportToExcel";


const Cambiar = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(10);
  const { token: contextToken } = useContext(AuthContext);
  const today = new Date().toISOString().split('T')[0];

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
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);
    const userDate = new Date(u.created_at); // Cambia esto según el campo de fecha en tu API
    const isDateInRange =
      (!date.startDate || userDate >= startDate) &&
      (!date.endDate || userDate <= endDate);
    if (date.startDate || date.endDate) {
      return (
        isDateInRange &&
        (u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term))
      );
    }
    // Si no hay fechas seleccionadas, solo filtra por nombre o email
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setDate({
      startDate: "",
      endDate: "",
    });
    setQuery("");
  };

  const handleExportUsers = () => {
    const columns = [
      { header: 'Nombre', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Teléfono', key: 'telefono', width: 20 },
      { header: 'Dirección', key: 'direccion', width: 30 },
      { header: 'Ciudad', key: 'ciudad', width: 20 },
      { header: 'Provincia', key: 'provincia', width: 20 },
    ];

    const data = filteredUsers.map(user => ({
      name: user.name,
      email: user.email,
      telefono: user.telefono || '',
      direccion: user.datos_usuario?.direccion || '',
      ciudad: user.datos_usuario?.ciudad || '',
      provincia: user.datos_usuario?.provincia || '',
    }));

    exportToExcel(data, columns, 'usuarios.xlsx');
  };

  const validateStartDate = date.startDate ? new Date(date.startDate).toISOString().split('T')[0] : '';
  const validateEndDate = date.endDate ? new Date(date.endDate).toISOString().split('T')[0] : '';


  // Usuarios visibles según paginación
  const visibleUsers = filteredUsers.slice(0, itemsToShow);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Listado de Usuarios</h2>
      {/* Buscador */}
      <div className="mb-4 flex gap-x-5 justify-between">
        <div className="flex gap-4">

          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded border py-2 pl-10 pr-4 focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
          <input
            className="p-2 border rounded"
            type="date"
            name="startDate"
            value={date.startDate}
            onChange={handleChange}
            max={date.endDate ? validateEndDate : today}

            placeholder="Selecciona la fecha de inicio"
            required
          />
          <input
            className="p-2 border rounded"
            type="date"
            name="endDate"
            value={date.endDate}
            onChange={handleChange}
            max={today}
            min={validateStartDate}
            placeholder="Selecciona la fecha de fin"
            required
          />
        </div>
        <div className="flex gap-4 justify-self-end">
          <button
            type="button"
            onClick={handleReset}
            className="transition-all duration-300 inline-flex items-center rounded-md bg-transparent border-2 border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-700/15 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={handleExportUsers}
            className="transition-all duration-300 inline-flex items-center rounded-md bg-transparent border-2 border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-700/15 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Descargar Excel
          </button>
        </div>

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
