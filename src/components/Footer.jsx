// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-custom-dark text-white py-12'>
      {/* Contenedor principal en modo grid */}
      <div className='mx-auto px-4 max-w-6xl grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Columna 1: Logo */}
        <div className=' '>
          <img src={logo} alt='Logística Argentina' className='h-28 md:h-48 ' />
        </div>

        {/* Columna 2 */}
        <div className='flex flex-col gap-2 space-y-4'>
          <h3 className='text-lg font-semibold mb-2'>Logística Argentina</h3>
          {/* <ul>
            <li className="text-sm my-2 text-gray-300">
              <Link to="/formulario">Transportista</Link>
            </li>
            <li className="text-sm my-2 text-gray-300">
              <Link to="/formulario-choferes">Choferes</Link>
            </li>
            <li className="text-sm my-2 text-gray-300">
              <Link to="/formulario-comisionista">Comisionista</Link>
            </li>
          </ul> */}
        </div>

        {/* Columna 3: Contacto con íconos */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
          <ul className='space-y-3 text-gray-300'>
            <li className='flex items-center'>
              <FaMapMarkerAlt className='mr-2 text-xl' />
              <span>Av. Tte. Ibáñez 1235, Corrientes, Argentina</span>
            </li>
            <li className='flex items-center'>
              <FaEnvelope className='mr-2 text-xl' />
              <a href='mailto:info@dominio.com' className='hover:underline'>
                info@dominio.com
              </a>
            </li>
            <li className='flex items-center'>
              <FaPhone className='mr-2 text-xl' />
              <a href='tel:+54376076580' className='hover:underline'>
                +54 3760 76580
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Redes sociales */}
        <div>
          <h3 className='text-lg font-semibold mb-2'>Síguenos</h3>
          <div className='flex space-x-4'>
            <a
              href='https://facebook.com'
              className='bg-custom-blue p-2 rounded-full hover:bg-opacity-80'>
              <FaFacebookF />
            </a>
            <a
              href='https://instagram.com'
              className='bg-custom-blue p-2 rounded-full hover:bg-opacity-80'>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Línea y derechos reservados */}
      <div className='border-t border-gray-700 mt-8 pt-4'>
        <p className='text-center text-sm text-gray-500'>
          © 2020 - Logística Argentina - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
