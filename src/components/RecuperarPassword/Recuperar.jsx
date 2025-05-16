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
    <div className="flex h-auto flex-col md:h-screen md:flex-row">
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
      <div className="flex w-full items-center justify-center bg-custom-gray md:w-1/2">
        <div className="w-full max-w-md p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Recuperar contraseña
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm text-white">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                className="w-full rounded border border-gray-300 px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-custom-red px-4 py-2 text-white hover:bg-custom-red/80"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          {message && (
            <div className="my-4 rounded-lg bg-black bg-opacity-50 p-3 text-center text-white">
              {message}
            </div>
          )}

          <p className="mt-4 text-center text-sm text-white">
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
