import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import p_img1 from "../assets/p_img1.png";
import p_img2 from "../assets/p_img2.png";
import p_img3 from "../assets/p_img3.png";
import p_img4 from "../assets/p_img4.png";

const Hero = () => {
  return (
    <section className="relative w-screen h-screen flex items-center justify-center bg-white overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-0 w-96 h-96 bg-[#D4AF37]/20 blur-[160px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/30 blur-[140px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-[1800px] px-12 py-10 mx-auto">
     
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <p className="text-lg uppercase font-semibold text-[#D4AF37] tracking-widest">
            Luxury Like Never Before
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold text-black leading-tight drop-shadow-lg">
            Discover <span className="text-[#D4AF37]">Timeless Elegance</span>
          </h1>

          <p className="text-gray-700 text-xl max-w-lg leading-relaxed">
            Step into a world of premium fashion and accessories, curated for
            those who demand excellence.
          </p>

          <div className="flex items-center gap-6 justify-center md:justify-start mt-6">
            <a
              href="collection"
              className="bg-[#D4AF37] text-black font-semibold text-lg px-10 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[#D4AF37]/50"
            >
              Start Shopping
            </a>
           
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: true }}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            className="w-64 md:w-96"
          >
            {[p_img1, p_img2, p_img3, p_img4].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 bg-white">
                  <img
                    src={img}
                    alt={`Luxury Product ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
