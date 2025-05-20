// src/components/Dashboard/ServicioAnuncio/Header.jsx
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import choferyayudante from "@/assets/Header/header.jpg";
import choferyayudante2 from "@/assets/Header/header2.jpg";
import comisionista from "@/assets/Header/header3.jpg";
import comisionista2 from "@/assets/Header/header3-5.jpg";
import transportista from "@/assets/Header/header4.jpg";
import transportista2 from "@/assets/Header/header45.jpg";
import useLogisticaImages from "@/components/Header/useLogisticaImages";

const Header = () => {
  const navigate = useNavigate();
  const { transportistas, choferes, comisionistas } = useLogisticaImages();

  console.log("🚛 Transportistas:", transportistas);
  console.log("👨‍💼 Choferes y ayudantes:", choferes);
  console.log("💼 Comisionistas:", comisionistas);
  const images = [choferyayudante, choferyayudante2, comisionista, comisionista2, transportista, transportista2];
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
      className="h-[400px] w-full sm:h-[500px] md:h-screen"
    >
      {images.map((img, index) => {
        const txt = texts[index].toLowerCase();
        let redirectPath = "";

        if (txt.includes("chofer") || txt.includes("ayudante")) {
          redirectPath = "/formulario-choferes";
        } else if (txt.includes("comisionista")) {
          redirectPath = "/formulario-comisionista";
        }
        return (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full cursor-pointer bg-cover bg-center transition"
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => {
                if (redirectPath) {
                  navigate(redirectPath);
                }
              }}
            >
              <div className="absolute bottom-0 left-0 w-full">
                <div className="bg-gradient-to-r from-custom-red to-transparent px-4 py-6">
                  <span
                    className="text-md block whitespace-pre-line text-left font-bold text-white sm:text-2xl md:text-3xl"
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
