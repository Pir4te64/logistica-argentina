// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-custom-dark text-white py-12">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-start max-w-6xl">
        {/* Columna 1: Logo */}
        <div className="mb-8 md:mb-0 md:w-1/4 ">
          <img src={logo} alt="Logística Argentina" className="h-48 mb-4" />
        </div>

        {/* Columna 2 */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <h3 className="text-lg font-semibold mb-2">Logística Argentina</h3>
          <ul>
            <li className="text-sm mb-1 text-gray-300">Lorem</li>
            <li className="text-sm mb-1 text-gray-300">Lorem</li>
            <li className="text-sm mb-1 text-gray-300">Lorem</li>
            <li className="text-sm mb-1 text-gray-300">Lorem</li>
          </ul>
        </div>

        {/* Columna 3: Contacto con iconos */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-xl" />
              <span>Av. Tte. Ibáñez 1235, Corrientes, Argentina</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-xl" />
              <a href="mailto:info@dominio.com" className="hover:underline">
                info@dominio.com
              </a>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-xl" />
              <a href="tel:+54376076580" className="hover:underline">
                +54 3760 76580
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Redes sociales */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="bg-custom-blue p-2 rounded-full hover:bg-opacity-80"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              className="bg-custom-blue p-2 rounded-full hover:bg-opacity-80"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-sm text-gray-500">
          © 2020 - Logística Argentina - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
