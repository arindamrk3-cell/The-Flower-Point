import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2D1B1F] text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}

        <div>

          <h2 className="text-3xl font-bold text-[#F7D488]">
            The Flower Point
          </h2>

          <p className="mt-4 leading-7 text-gray-300">
            Making every celebration beautiful with fresh flowers and creative decoration.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Quick Links
          </h3>

          <div className="space-y-3">

            <Link to="/" className="block hover:text-[#F7D488]">Home</Link>

            <Link to="/gallery" className="block hover:text-[#F7D488]">Gallery</Link>

            <Link to="/about" className="block hover:text-[#F7D488]">About</Link>

            <Link to="/contact" className="block hover:text-[#F7D488]">Contact</Link>

          </div>

        </div>

        {/* Services */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Services
          </h3>

          <div className="space-y-3 w-40 ">

            <Link to="/category/marriage" className="hover:text-[#F7D488]">Marriage Decoration</Link>

            <Link to="/category/puja" className="hover:text-[#F7D488]">  Puja Decoration</Link>

            <Link to="/category/birthday" className="hover:text-[#F7D488]">  Birthday Decoration</Link>

            <Link to="/category/reception" className="hover:text-[#F7D488]"> Reception Decoration</Link>

            <Link to="/category/corporate" className="hover:text-[#F7D488]"> Corporate Decoration</Link>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Contact
          </h3>

          <div className="space-y-4">

            <p className="flex gap-3">
              <FaPhoneAlt />
              +91 89723 04642
            </p>

            <p className="flex gap-3">
              <FaEnvelope />
              theflowerpoint@gmail.com
            </p>

            <p className="flex gap-3">
              <FaMapMarkerAlt />
              Dinhata, Cooch Behar, West Bengal, India - 736135
            </p>

          </div>

          <div className="mt-6 flex gap-4">

            <a href="#">
              <FaFacebookF className="text-xl hover:text-[#F7D488]" />
            </a>

            <a href="#">
              <FaInstagram className="text-xl hover:text-[#F7D488]" />
            </a>

            <a href="https://wa.me/918972304642" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-xl hover:text-[#F7D488]" />
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-white/20 py-6 text-center text-gray-400">

        © {new Date().getFullYear()} The Flower Point. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;