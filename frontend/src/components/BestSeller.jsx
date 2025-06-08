import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductItems from "../components/ProductItems";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import placeholderImage from "../assets/p_img2.png";

const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/products/sellerlatest/5`);
        if (response.data?.success && response.data.data.bestSellerProducts) {
          setBestSellerProducts(response.data.data.bestSellerProducts);
          console.log("Best Seller Products:", response.data.data.bestSellerProducts);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching bestseller products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellerProducts();
  }, [backendUrl]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-screen min-h-screen py-28 bg-gradient-to-b from-[#F8F3E7] to-[#F9F6F1] text-gray-900 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-64 h-64 bg-[#D4AF37]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#D4AF37]/20 blur-[100px] rounded-full"></div>
      </div>

    
      <div className="text-center relative z-10">
        <Title
          text1="BEST "
          text2="SELLERS"
          className="text-6xl font-extrabold text-gray-900 uppercase tracking-widest drop-shadow-lg"
        />
        <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          Discover our top-selling luxury products, crafted for elegance and quality.
        </p>
        <div className="mt-5 h-[4px] w-24 bg-[#D4AF37] mx-auto rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-20 mt-16">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="animate-spin h-12 w-12 border-4 border-[#D4AF37] border-t-transparent rounded-full"></span>
          </div>
        ) : bestSellerProducts.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-10">No best sellers available.</div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false, reverseDirection: true }}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {bestSellerProducts.map((product, index) => (
              <SwiperSlide key={product._id}>
                <div
                  className="relative overflow-hidden shadow-lg rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <ProductItems
                    id={product._id}
                    image={placeholderImage}             
                    name={product.productName}
                    price={product.price}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
