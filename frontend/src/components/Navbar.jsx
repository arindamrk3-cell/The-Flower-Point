import { Link, NavLink } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import GarlandDivider from "./GarlandDivider";

// Add once, in index.html <head> or via @import in your global CSS:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const links = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const navLinkClass = ({ isActive }) =>
  `relative py-1 text-[15px] font-medium tracking-wide transition-colors ${
    isActive ? "text-[#6E1F32]" : "text-[#241B1D]/70 hover:text-[#6E1F32]"
  } after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-[#D89A2D] after:transition-all after:duration-300 ${
    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FBF4EC]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="The Flower Point"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-[#D89A2D]/50"
          />
          <div>
            <h1
              className="text-xl italic leading-tight text-[#6E1F32]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}
            >
              The Flower Point
            </h1>
            <p
              className="text-[11px] uppercase tracking-[0.14em] text-[#4B5842]"
              style={{ fontFamily: FONT_BODY }}
            >
              Wedding &amp; Event Decoration
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-9 md:flex " style={{ fontFamily: FONT_BODY }}>
          {links.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Call / WhatsApp */}
        <div className="hidden items-center gap-3 lg:flex" style={{ fontFamily: FONT_BODY }}>
          <a
            href="tel:+918972304642"
            className="flex items-center gap-2 rounded-full bg-[#6E1F32] px-5 py-2.5 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928]"
          >
            <FaPhoneAlt className="text-xs" />
            Call
          </a>
          <a
            href="https://wa.me/918972304642"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#4B5842] px-5 py-2.5 text-sm font-semibold text-[#4B5842] transition hover:bg-[#4B5842] hover:text-[#FBF4EC]"
          >
            <FaWhatsapp className="text-sm" />
            WhatsApp
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl text-[#6E1F32] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <HiXMark /> : <HiBars3 />}
        </button>
      </div>

      {/* Garland flourish instead of a plain border */}
      <GarlandDivider tone="wine" className="h-4 w-full" />

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#D89A2D]/30 bg-[#FBF4EC] md:hidden" style={{ fontFamily: FONT_BODY }}>
          <nav className="flex flex-col p-6">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-[#D89A2D]/20 py-3 text-base font-medium ${
                    isActive ? "text-[#6E1F32]" : "text-[#241B1D]/80"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="mt-4 flex gap-3">
              <a
                href="tel:+918972304642"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6E1F32] py-3 text-sm font-semibold text-[#FBF4EC]"
              >
                <FaPhoneAlt className="text-xs" /> Call
              </a>
              <a
                href="https://wa.me/918972304642"
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#4B5842] py-3 text-sm font-semibold text-[#4B5842]"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;