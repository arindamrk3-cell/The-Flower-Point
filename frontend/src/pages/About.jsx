import { Link } from "react-router-dom";
import GarlandDivider from "../components/GarlandDivider";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const stats = [
  { value: "9+", label: "Years in Business" },
  { value: "500+", label: "Events Decorated" },
  { value: "30+", label: "Venues Across Kolkata" },
  { value: "100%", label: "Fresh Flowers, Always" },
];

const values = [
  {
    icon: "🌸",
    title: "Craft Over Shortcuts",
    body: "Every garland and centerpiece is hand-tied on site — nothing pre-made, nothing rushed.",
  },
  {
    icon: "🤝",
    title: "Straight Talk on Price",
    body: "What we quote is what you pay. No last-minute add-ons at the venue.",
  },
  {
    icon: "⏰",
    title: "We Show Up Early",
    body: "Setup finishes before your first guest arrives, every single time.",
  },
  {
    icon: "🎨",
    title: "Designed Around You",
    body: "Your venue, your colors, your budget — the theme is built around what you actually need.",
  },
];

const process = [
  { step: "01", title: "You Tell Us the Vision", body: "Venue, date, budget, and the feel you're going for." },
  { step: "02", title: "We Design & Quote", body: "A concept and a clear, itemized price — no guesswork." },
  { step: "03", title: "Fresh Flowers, Sourced", body: "Ordered close to the date so nothing wilts before your event." },
  { step: "04", title: "Setup Before You Arrive", body: "Our team completes the decor with time to spare." },
];

const About = () => {
  return (
    <div style={{ fontFamily: FONT_BODY }}>
      {/* Intro */}
      <section className="bg-[#FBF4EC] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D89A2D]" />
              Our Story
            </p>

            <h1
              className="mb-6 text-5xl italic leading-tight text-[#241B1D] md:text-6xl"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              We started with one wedding
              <span className="text-[#6E1F32]"> and a lot of marigolds.</span>
            </h1>

            <p className="mb-5 text-lg leading-relaxed text-[#241B1D]/70">
              The Flower Point began in Kolkata as a small family setup doing
              mandap decor for relatives and neighbors. Word travelled the
              way it does here — through aunties, wedding planners, and one
              very memorable puja pandal — and what started as a favor became
              a full-time craft.
            </p>

            <p className="text-lg leading-relaxed text-[#241B1D]/70">
              Today we still work the way we did on that first wedding:
              fresh flowers, hand-strung garlands, and a team that shows up
              before the guests do.
            </p>

            <GarlandDivider tone="wine" className="mt-10 h-6 w-full max-w-sm opacity-70" />
          </div>

          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/images/about/about.jpg"
              alt="The Flower Point team decorating a mandap"
              className="h-[26rem] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#6E1F32] py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl italic text-[#D89A2D] md:text-5xl"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[#FBF4EC]/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FBF4EC] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
              What We Stand For
            </p>
            <h2
              className="text-4xl italic text-[#241B1D]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              Why people rebook us
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#D89A2D]/20 bg-white p-6 shadow-sm"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-[#241B1D]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#241B1D]/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
              How It Works
            </p>
            <h2
              className="text-4xl italic text-[#241B1D]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              From first call to setup day
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <p
                  className="text-5xl italic text-[#D89A2D]/40"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  {item.step}
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#241B1D]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#241B1D]/60">{item.body}</p>
              </div>
            ))}
          </div>

          <GarlandDivider tone="wine" className="mx-auto mt-16 h-6 w-full max-w-md opacity-60" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#241B1D] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2
            className="text-4xl italic text-[#FBF4EC] md:text-5xl"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Let's decorate your next event
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#FBF4EC]/70">
            Tell us your date and venue — we'll send a design concept and a
            clear price within a day.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/gallery"
              className="rounded-full bg-[#D89A2D] px-8 py-4 text-base font-semibold text-[#241B1D] transition hover:bg-[#c78c25]"
            >
              Browse Designs
            </Link>
            <Link
              to="/contact"
              className="rounded-full border-2 border-[#FBF4EC]/70 px-8 py-4 text-base font-semibold text-[#FBF4EC] transition hover:bg-[#FBF4EC] hover:text-[#241B1D]"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;