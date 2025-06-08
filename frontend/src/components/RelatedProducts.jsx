import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { useNavigate } from "react-router-dom";  
import axios from "axios";

const RelatedProducts = ({ brand }) => {
  const backEndURL = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`${backEndURL.backendUrl}/products`, {
          params: { brand: brand },  
        });
        const relatedProducts = response.data.data; 
        setRelated(relatedProducts.slice(0, 5));  
      } catch (error) {
        console.error("Error fetching related products:", error);
        alert("Failed to load related products. Please try again later.");
      }
    };

    if (brand) {
      fetchRelatedProducts();
    }
  }, [brand, backEndURL]);
  const handleProductClick = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    navigate(`/product/${id}`);
  };

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED " text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <div key={index} onClick={() => handleProductClick(item._id)} className="cursor-pointer">
            <ProductItems 
              id={item._id} 
              name={item.productName} 
              price={item.price} 
              image={`${backEndURL.backendUrl}/products/${item.imageURL}`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  brand: PropTypes.string.isRequired, 
};

export default RelatedProducts;
