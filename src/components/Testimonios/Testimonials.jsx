// Testimonials.jsx
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import testimonialImg from "../../assets/testimonials.png"; // reemplazá por tu asset real

const testimonialsData = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.",
    image: testimonialImg,
  },
  {
    text: "Otro testimonio de cliente satisfecho que habla maravillas de nuestros servicios y la calidad que ofrecemos...",
    image: testimonialImg,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;
  const { text, image } = testimonialsData[current];

  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-12">Testimonios</h2>

      <div className="relative max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center">
        {/* Tarjeta de testimonio */}
        <div className="relative bg-white rounded-lg shadow-lg p-8 lg:w-1/2 w-full">
          <FaQuoteLeft className="text-custom-blue text-6xl absolute -left-8 top-4" />
          <p className="text-gray-700 leading-relaxed">{text}</p>

          {/* Navegación de testimonios */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={prev}
              className="bg-custom-red p-3 rounded shadow hover:bg-custom-red/80 transition"
              aria-label="Anterior Testimonio"
            >
              <FaChevronLeft className="text-white" />
            </button>
            <button
              onClick={next}
              className="bg-custom-red p-3 rounded shadow hover:bg-custom-red/80 transition"
              aria-label="Siguiente Testimonio"
            >
              <FaChevronRight className="text-white" />
            </button>
          </div>
        </div>

        {/* Imagen del testimonio */}
        <div className="mt-12 lg:mt-0 lg:ml-12 lg:w-1/2 w-full h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Testimonio"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
