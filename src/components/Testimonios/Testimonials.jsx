// Testimonials.jsx
import React, { useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logisticsImg from "@/assets/distribucionproductoslocales.jpg"; // tu imagen de logística

const testimonialsData = [
  {
    author: "— Darío Pablo Barrios",
    text: "Me ayudaron con el combustible hasta tanto inicié a cobrar, así pude trabajar",
  },
  {
    author: "— Exequiel Lorente",
    text: "Presto servicio hace más de 1 año y nunca tuve ningún problema",
  },
  {
    author: "— Juan Pablo Meza",
    text: "Una vez pagas el combustible es fácil trabajar, todos los meses te pagan",
  },
  {
    author: "— Claudio Almiron",
    text: "Con muchas ganas de trabajar!",
  },
  {
    author: "— Lucas Martín Sánchez",
    text: "Me quedé sin trabajo y en la semana ingresé a trabajar con Logística Argentina SRL",
  },
  {
    author: "— Martín Mendoza",
    text: "Yo trabajaba en relación de dependencia y me quedé sin trabajo, quería ingresar a trabajar en una Empresa de Paquetes, pero no podía con los plazos de pago, gracias a Logística Argentina pude ingresar!",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;
  const { author, text } = testimonialsData[current];

  const prevTestimonial = () =>
    setCurrent((current - 1 + total) % total);
  const nextTestimonial = () =>
    setCurrent((current + 1) % total);

  return (
    <section className="py-16 bg-gray-50" id="testimonios">
      <h2 className="text-3xl font-semibold text-center mb-12">
        ¿Qué dicen nuestros clientes y distribuidores?
      </h2>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Texto del testimonio */}
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              {author.replace(/^— /, "")}
            </h3>
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>
            <div className="relative">
              <FaQuoteLeft className="text-custom-blue text-4xl absolute -top-4 -left-4 opacity-20" />
              <p className="text-gray-700 leading-relaxed mt-2">{text}</p>
            </div>
          </div>

          {/* Controles Prev/Next */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={prevTestimonial}
              className="bg-custom-red p-2 rounded-full shadow hover:bg-custom-red/80 transition"
              aria-label="Anterior Testimonio"
            >
              <FaChevronLeft className="text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-custom-red p-2 rounded-full shadow hover:bg-custom-red/80 transition"
              aria-label="Siguiente Testimonio"
            >
              <FaChevronRight className="text-white" />
            </button>
          </div>
        </div>

        {/* Imagen fija a la derecha */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={logisticsImg}
            alt="Logística Argentina"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
