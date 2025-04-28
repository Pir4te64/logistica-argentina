// src/components/Dashboard/ServicioAnuncio/Header.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import header from "@/assets/Header/header.jpg";
import header2 from "@/assets/Header/header2.jpg";
import header3 from "@/assets/Header/header3.jpg";
import header35 from "@/assets/Header/header3-5.jpg";
import header4 from "@/assets/Header/header4.jpg";
import header45 from "@/assets/Header/header45.jpg";

const Header = () => {
  const navigate = useNavigate();

  const images = [header, header2, header3, header35, header4, header45];
  const texts = [
    "Chofer y Ayudante",
    "Postúlate <br /> Si queres trabajar anotate como Chofer o ayudante ¿Qué esperas?",
    "Comisionista",
    "Genera ingresos, si queres ser comisionista <br /> ¿Qué esperas?",
    "Transportista",
    "¡Crece con nosotros! Expandi el alcance de tu marca, trabajamos en todo el país, que todos te conozcan",
  ];

  return (
    <Swiper
      modules={[EffectFade, Navigation, Autoplay]}
      effect="slide"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full h-[400px] sm:h-[500px] md:h-screen"
    >
      {images.map((img, index) => {
        const txt = texts[index].toLowerCase();
        let redirectPath = "";

        if (txt.includes("chofer") || txt.includes("ayudante")) {
          redirectPath = "/formulario-choferes";
        } else if (txt.includes("comisionista")) {
          redirectPath = "/formulario-comisionista";
        } else if (txt.includes("transportista") || txt.includes("nosotros")) {
          redirectPath = "/formulario";
        }

        return (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center cursor-pointer transition"
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => {
                if (redirectPath) {
                  navigate(redirectPath);
                }
              }}
            >
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
        );
      })}
    </Swiper>
  );
};

export default Header;
