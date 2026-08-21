import { Link } from "react-router-dom";
import GarlandDivider from "./GarlandDivider";

// Uses the same fonts loaded for Navbar.jsx (Fraunces + Manrope).
const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const occasions = ["Weddings", "Pujas", "Receptions", "Birthdays", "Corporate"];

const Hero = () => {
  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#241B1D]"
      style={{
        backgroundImage:
          "linear-gradient(100deg, rgba(135, 121, 70, 0.94) 0%, rgba(110,31,50,0.78) 38%, rgba(110,31,50,0.35) 62%, rgba(36,27,29,0.15) 100%), url('/images/hero/weeding.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Garland flourish draped across the top, like a strand hung for the shot */}
      {/* <GarlandDivider
        tone="ivory"
        className="pointer-events-none absolute -top-2 left-0 h-25 w-full opacity-90"
      /> */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-10">
        <div className="max-w-2xl text-[#FBF4EC]">
          <p
            className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]"
            style={{ fontFamily: FONT_BODY }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D89A2D]" />
            The Flower Point, Dinhata, Cooch Behar, India
          </p>

          <h1
            className="mb-6 text-[2.75rem] italic leading-[1.08] md:text-6xl lg:text-[4.25rem]"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Every bloom, <span className="text-[#D89A2D]">strung with care.</span>
          </h1>

          <p
            className="mb-9 max-w-lg text-lg leading-relaxed text-[#FBF4EC]/85"
            style={{ fontFamily: FONT_BODY }}
          >
            We design elegant floral decor for weddings, pujas, receptions,
            birthdays and corporate events — from mandap garlands to the
            last petal on the table.
          </p>

          {/* Occasion chips — a real list of what we cover, not a decorative sequence */}
          <div className="mb-10 flex flex-wrap gap-2" style={{ fontFamily: FONT_BODY }}>
            {occasions.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#FBF4EC]/25 px-4 py-1.5 text-sm text-[#FBF4EC]/80"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4" style={{ fontFamily: FONT_BODY }}>
            <Link
              to="/gallery"
              className="rounded-full bg-[#D89A2D] px-8 py-4 text-base font-semibold text-[#241B1D] transition hover:bg-[#c78c25]"
            >
              Explore Designs
            </Link>
            <Link
              to="/contact"
              className="rounded-full border-2 border-[#FBF4EC]/70 px-8 py-4 text-base font-semibold text-[#FBF4EC] transition hover:bg-[#FBF4EC] hover:text-[#241B1D]"
            >
              Plan Your Event
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom garland, grounding the section the way a garland frames a stage */}
      <GarlandDivider
        tone="ivory"
        flip
        className="pointer-events-none absolute -bottom-2 left-0 h-10 w-full opacity-70"
      />
    </section>
  );
};

export default Hero;