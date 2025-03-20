import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Importa estilos de Swiper y de sus módulos
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

// Importa los módulos necesarios de Swiper
import { EffectFade, Navigation, Autoplay } from "swiper/modules";

import header from "../assets/Header/header.jpg";
import header2 from "../assets/Header/header2.jpg";
import header3 from "../assets/Header/header3.jpg";
import header35 from "../assets/Header/header3-5.jpg";
import header4 from "../assets/Header/header4.jpg";
import header45 from "../assets/Header/header45.jpg";

const Header = () => {
  const images = [header, header2, header3, header35, header4, header45];
  const texts = [
    "Chofer y Ayudante",
    "Postúlate <br /> Si queres trabajar anotate como Chofer o ayudante ¿Qué esperas?",
    "Comisionista",
    "Postúlate <br /> Si queres trabajar anotate como Chofer o ayudante ¿Qué esperas?",
    "Publicita tu marca",
    "Postúlate <br /> Si queres trabajar anotate como Chofer o ayudante ¿Qué esperas?",
  ];

  return (
    <Swiper
      modules={[EffectFade, Navigation, Autoplay]}
      effect="fade"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      className="w-full h-[400px] sm:h-[500px] md:h-screen"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >
            {/* Barra degradada de fondo a lo ancho con el texto */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="bg-gradient-to-r from-custom-red to-transparent py-6 px-4">
                <span
                  className="block text-white text-left whitespace-pre-line text-md sm:text-2xl md:text-3xl font-bold"
                  dangerouslySetInnerHTML={{ __html: texts[index] }}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Header;
