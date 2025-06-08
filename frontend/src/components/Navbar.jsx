import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    getCartCount,
    token,
    navigate,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen flex items-center justify-between 
      py-4 px-6 sm:px-12 bg-[#F7F7F7] text-[#333333] shadow-md 
      border-b border-[#DDDDDD] z-50"
    >
     
      <Link to="/" className="flex items-center gap-3">
        <svg
          width="35"
          height="33"
          viewBox="0 0 43 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[40px] hover:scale-110 transition-transform"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.8287 8.94266C22.4425 8.94266 21.0699 9.21493 19.7892 9.74393C18.5086 10.2729 17.3449 11.0483 16.3648 12.0257C15.3846 13.0032 14.6071 14.1636 14.0766 15.4407C13.7048 16.3358 13.4595 17.276 13.346 18.2342C13.2568 18.9873 12.8442 19.6828 12.1656 20.0212L10.1584 21.022C9.47979 21.3604 9.03456 22.0559 9.12376 22.809C9.23726 23.7673 9.48259 24.7074 9.85438 25.6025C10.3849 26.8796 11.1624 28.04 12.1425 29.0175C13.1227 29.9949 14.2864 30.7703 15.567 31.2993C16.8477 31.8283 18.2203 32.1006 19.6064 32.1006C20.9926 32.1006 22.3652 31.8283 23.6459 31.2993C24.9265 30.7703 26.0902 29.9949 27.0704 29.0175C28.0505 28.04 28.828 26.8796 29.3585 25.6025C29.7303 24.7074 29.9756 23.7673 30.0891 22.809C30.1783 22.0559 30.5909 21.3604 31.2696 21.022L33.2767 20.0212C33.9553 19.6828 34.4006 18.9873 34.3114 18.2342C34.1979 17.276 33.9525 16.3358 33.5807 15.4407C33.0503 14.1636 32.2727 13.0032 31.2926 12.0257C30.3124 11.0483 29.1488 10.2729 27.8681 9.74393C26.5874 9.21493 25.2148 8.94266 23.8287 8.94266Z"
            fill="#FFA500"
          />
        </svg>
        <span className="text-xl font-semibold tracking-wider text-[#FFA500]">
          CloudCart
        </span>
      </Link>

      <div className="flex items-center gap-6">
      
        <ul className="flex gap-4 text-sm font-medium tracking-wide bg-[#FFFFFF] px-4 py-1.5 rounded-lg shadow-md transition-all border border-[#DDDDDD]">
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
            <NavLink
              key={index}
              to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
              className="px-3 py-1 rounded-lg transition-all 
              hover:bg-[#FFA500]/30 hover:text-[#FFA500] hover:shadow-md"
            >
              {item}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-4">
        
          <div className="relative">
            <img
              onClick={() => setVisible((prev) => !prev)}
              src={assets.profile_icon}
              className="w-5 cursor-pointer transition-transform hover:scale-125 hover:opacity-80"
              alt="Profile"
            />

            {token && visible && (
              <div
                className="absolute right-0 mt-2 w-36 py-2 px-4 
                bg-[#FFFFFF] text-[#333333] rounded-md shadow-lg border border-[#DDDDDD]"
              >
                <p
                  className="cursor-pointer hover:text-[#FFA500] hover:underline"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  className="cursor-pointer hover:text-[#FFA500] hover:underline"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p
                  className="cursor-pointer text-red-500 hover:text-red-600 hover:underline"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="#333333"
              className="w-6 cursor-pointer transition-transform hover:scale-125 hover:opacity-80 hover:shadow-md"
            >
              <path d="M0 0H128L168.5 212.9c2.5 12.8 13.6 21.1 26.3 21.1H504c14.2 0 24.7 13.7 21.2 27.4l-24 96C497.8 371.4 488.2 384 472 384H190.6c-11.3 0-21.4-7.8-24-18.8L97.7 192H20c-11 0-20-9-20-20V20C0 9 9 0 20 0zM208 432c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm320 48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z" />
            </svg>

            {getCartCount() > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white 
                text-xs font-semibold rounded-full px-1.5 py-0.5 shadow-md"
              >
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;