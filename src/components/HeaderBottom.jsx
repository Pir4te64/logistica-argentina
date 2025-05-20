import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Importa estilos y módulo de autoplay
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import img1 from "@/assets/empresas/inter.jpg";
import img2 from "@/assets/empresas/loginter1.jpg";
import img3 from "@/assets/empresas/oca.jpg";
import img4 from "@/assets/empresas/pavetron.jpg";
import img5 from "@/assets/empresas/urbano.jpg";
import img6 from "@/assets/empresas/OCASA.jpg";
import img7 from "@/assets/empresas/andesmar.jpeg";
import img8 from "@/assets/empresas/qx.jpeg";
function HeaderBottom() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div className='w-full px-2'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={3000} // Controla la velocidad del desplazamiento
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
        className='mySwiper'>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Logo ${index}`}
              className='h-auto w-full rounded-lg shadow-md'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeaderBottom;
