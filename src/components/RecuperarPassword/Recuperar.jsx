import React, { useState } from "react";
import axios from "axios";
import LoginImg from "@/assets/Login.jpg";
import { API_URL } from "@/Api/Api";
import { Link } from "react-router-dom";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(API_URL.PASSWORD_RECOVER, { email });
      // Asumimos que la API retorna un campo message
      setMessage(
        response.data.message || "Revisa tu correo para más instrucciones."
      );
    } catch (error) {
      console.error("Error al solicitar recuperación:", error);
      setMessage(
        error.response?.data?.message || "Ocurrió un error. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen">
      {/* Izquierda: imagen */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={LoginImg}
          alt="Recuperar contraseña"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Derecha: formulario */}
      <div className="w-full md:w-1/2 bg-custom-gray flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Recuperar contraseña
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2 text-white">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-custom-red hover:bg-custom-red/80 text-white py-2 px-4 rounded w-full"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          {message && (
            <div className="my-4 text-center text-white bg-opacity-50 bg-black p-3 rounded-lg">
              {message}
            </div>
          )}

          <p className="text-center text-sm mt-4 text-white">
            <Link to="/login" className="underline">
              Volver a iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
