// src/components/Trabajos/CambiarPasswordForm.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "@/Api/Api"; // Asegúrate de que la ruta sea correcta
import axios from "axios";

const CambiarPasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    setError("");
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token"); // Asume que el token está en localStorage
      const response = await axios.post(
        API_URL.CHANGE_PASSWORD,
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "¡Contraseña Actualizada!",
          text:
            response.data.message ||
            "Tu contraseña se ha cambiado exitosamente.",
          confirmButtonText: "Aceptar",
        });
        // Limpiar los campos después del éxito
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(response.data.message || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      setError("Hubo un error al comunicarse con el servidor.");
      console.error("Error al cambiar la contraseña:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label
          htmlFor="old_password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Contraseña Actual:
        </label>
        <input
          type="password"
          id="old_password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="new_password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nueva Contraseña:
        </label>
        <input
          type="password"
          id="new_password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="new_password_confirmation"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirmar Nueva Contraseña:
        </label>
        <input
          type="password"
          id="new_password_confirmation"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          onClick={handleChangePassword}
          disabled={isLoading}
          className={`px-6 py-2 rounded text-white transition ${
            isLoading
              ? "bg-gray-500 cursor-wait"
              : "bg-custom-blue-medium hover:bg-custom-blue-medium"
          }`}
        >
          {isLoading ? "Cambiando Contraseña…" : "Cambiar Contraseña"}
        </button>
      </div>
    </div>
  );
};

export default CambiarPasswordForm;
