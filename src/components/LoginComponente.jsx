import React, { useContext, useState } from "react";
import axios from "axios";
import LoginImg from "@/assets/Login.jpg";
import { FcGoogle } from "react-icons/fc";
import { API_URL } from "@/Api/Api";
import { AuthContext } from "@/Api/AuthContext";
import { Link } from "react-router-dom";

const LoginComponente = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(API_URL.LOGIN, data);

      // Verificamos si la respuesta indica error.
      // Por ejemplo, si response.data.message contiene "Error en Login"
      if (
        response.data &&
        response.data.message &&
        response.data.message.toLowerCase().includes("error")
      ) {
        // Se asume que en "data" viene un array con mensajes de error
        const errorMessage = Array.isArray(response.data.data)
          ? response.data.data.join(", ")
          : response.data.data;
        setMessage(errorMessage);
        return;
      }

      // Si todo va bien, se llama a la función login y se redirige
      login(response.data.data.user, response.data.data.token);
      setMessage(response.data.message);

      // Redirige a la página de inicio u otra ruta
      window.location.href = "/";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMessage("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen">
      {/* Sección izquierda: imagen */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={LoginImg}
          alt="Imagen de login"
          lazy="true"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección derecha: formulario */}
      <div className="w-full md:w-1/2 bg-custom-gray flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo Contraseña */}
            <div className="mb-4">
              <label
                className="block text-sm mb-2 text-white"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Olvidaste tu contraseña */}
            {/*  <div className='flex justify-end mb-4'>
              <a href='#' className='text-sm text-white hover:underline'>
                ¿Olvidaste tu contraseña?
              </a>
            </div> */}

            {/* Botón Ingresar */}
            <button
              type="submit"
              className="bg-custom-red hover:bg-custom-red/80 text-white py-2 px-4 rounded w-full mb-4"
            >
              Ingresar
            </button>
          </form>

          {/* Registro */}
          <p className="text-center text-sm mb-4 py-4 text-white">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-white text-md underline">
              Regístrate
            </Link>
          </p>

          {/* Mensaje con la respuesta de la petición */}
          {message && (
            <div className="my-4 text-center text-red-500 bg-white p-1 rounded-lg">
              {message}
            </div>
          )}

          {/* <div className='flex flex-col gap-2'>
            <button className='flex items-center justify-center gap-2 bg-white border border-gray-300 rounded py-2 px-4 hover:bg-gray-50'>
              <FcGoogle size={20} />
              <span>Continuar con Google</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginComponente;
