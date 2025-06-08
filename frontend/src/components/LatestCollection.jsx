import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductItems from "./ProductItems";
import { ShopContext } from "../context/ShopContext";
import placeholderImage from "../assets/p_img2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestCollection = () => {
  const backendUrl = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        if (!backendUrl) throw new Error("Backend URL is missing!");

        const response = await axios.get(`${backendUrl.backendUrl}/products/sellerlatest/10`);

        if (response.data?.success && Array.isArray(response.data.data.latestProducts)) {
          setLatestProducts(response.data.data.latestProducts);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching latest products:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestProducts();
  }, [backendUrl]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="relative w-screen min-h-screen py-24 bg-[#FAF8F5] text-gray-900">
   
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold uppercase tracking-wide text-[#1E1E1E] drop-shadow-lg">
          Latest Collection
        </h2>
        <p className="text-lg max-w-3xl mx-auto mt-4 text-gray-600 leading-relaxed">
          Discover hand-picked selections, blending elegance and sophistication.
        </p>
        <div className="mt-4 h-[3px] w-24 bg-[#D4AF37] mx-auto rounded-full"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <span className="animate-spin h-12 w-12 border-4 border-[#D4AF37] border-t-transparent rounded-full"></span>
        </div>
      ) : latestProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl py-10">
          No new arrivals at the moment.
        </div>
      ) : (
        <div className="w-full px-4 md:px-10 lg:px-16">
     
          <Slider {...sliderSettings}>
            {latestProducts.map((product) => (
              <div
                key={product._id}
                className="px-2"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#D4AF37]/40 cursor-pointer">
                  <ProductItems
                    id={product._id}
                    image={product.imageUrl || placeholderImage}
                    name={product.productName}
                    price={product.price}
                  />
                </div>
              </div>
            ))}
          </Slider>

          <div className="flex justify-center mt-12">
            <button
              className="px-8 py-4 text-lg font-semibold text-white bg-[#1E1E1E] rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-[#1E1E1E]/50"
              onClick={() => navigate("/collection")}
            >
              Explore More
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestCollection;
