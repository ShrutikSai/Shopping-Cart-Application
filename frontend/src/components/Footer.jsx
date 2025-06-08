import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bottom-0 left-0 w-screen flex flex-col items-center 
      py-4 px-6 sm:px-12 bg-[#000000] text-[#E0E0E0] shadow-lg 
      border-t border-[#D4AF37] z-50"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
    
        <div>
          <Link to="/" className="flex items-center gap-3 p-3">
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
                fill="#D4AF37"
              />
            </svg>
            <span className="text-xl font-semibold tracking-wider text-[#D4AF37]">
              CloudCart
            </span>
          </Link>

          <p className="text-sm leading-relaxed opacity-90">
            Built by IIIT Dharwad students with a passion for technology and
            innovation. Elevating e-commerce with cutting-edge solutions.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {["Home", "Collection", "About", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm opacity-80 hover:text-[#D4AF37] transition-all duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Contact</h3>
          <p className="text-sm opacity-80">IIIT Dharwad, Karnataka, India</p>
          <p className="text-sm mt-3 opacity-80">Email:</p>
          <ul className="text-sm space-y-2 mt-1">
            {["22bcs096", "22bcs110", "22bcs112", "22bcs129"].map((id) => (
              <li key={id}>
                <a
                  href={`mailto:${id}@iiitdwd.ac.in`}
                  className="text-[#D4AF37] hover:underline transition-all duration-300"
                >
                  {id}@iiitdwd.ac.in
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-5">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-xl hover:text-[#D4AF37] transition-all duration-300"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <div className="w-full text-center mt-12 border-t border-[#D4AF37]/30 pt-6 text-sm opacity-80">
        © 2025 IIIT Dharwad. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
