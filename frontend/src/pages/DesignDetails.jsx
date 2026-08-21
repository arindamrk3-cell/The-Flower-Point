import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDesignById } from "../../services/designServices";
//import design from "../data/designs";
import ImageGallery from "../components/ImageGallery";
import BookingCard from "../components/BookingCard";
import GarlandDivider from "../components/GarlandDivider";
import RelatedDesigns from "../components/RelatedDesigns";
import BookingInquiryForm from "../components/BookingInquiryForm";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

// What actually earns "paisa wasool" — proof, not adjectives.
const trustPoints = [
  { icon: "🌸", label: "100% Fresh Flowers", note: "Sourced the morning of setup" },
  { icon: "⏰", label: "On-Time, Guaranteed", note: "Ready before your first guest" },
  { icon: "💰", label: "No Hidden Costs", note: "Price you're quoted is the price you pay" },
  { icon: "⭐", label: "500+ Events Done", note: "Across Dinhata & Cooch Behar, since 2016" },
];

const suitableFor = [
  { icon: "💍", label: "Wedding" },
  { icon: "🎉", label: "Reception" },
  { icon: "🏡", label: "Indoor" },
  { icon: "🌳", label: "Outdoor" },
];

const whyChoose = [
  {
    icon: "🌸",
    title: "Fresh Flowers",
    body: "Only fresh flowers are used to create elegant decorations.",
  },
  {
    icon: "🎨",
    title: "Custom Themes",
    body: "Decoration can be customized according to your venue and budget.",
  },
  {
    icon: "⏰",
    title: "On-Time Setup",
    body: "Our team completes decoration before your event starts.",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    body: "High-quality flowers and elegant finishing for every event.",
  },
];

const customizationOptions = ["Venue", "Budget", "Flower Choice", "Theme", "Color Combination"];

const DesignDetails = () => {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await getDesignById(id);
        setDesign(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDesign();
  }, [id]);

  if (loading) {
    return (
      <section
        className="flex min-h-[60vh] items-center justify-center bg-[#FBF4EC]"
        style={{ fontFamily: FONT_BODY }}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D89A2D]/30 border-t-[#6E1F32]" />
          <p className="text-sm uppercase tracking-[0.14em] text-[#4B5842]">
            Loading design...
          </p>
        </div>
      </section>
    );
  }

  if (!design) {
    return (
      <section
        className="flex min-h-[60vh] items-center justify-center bg-[#FBF4EC]"
        style={{ fontFamily: FONT_BODY }}
      >
        <div className="text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#D89A2D]">Oops</p>
          <h1 className="text-4xl italic text-[#6E1F32]" style={{ fontFamily: FONT_DISPLAY }}>
            We couldn't find that design
          </h1>
          <p className="mt-3 text-[#241B1D]/60">It may have been renamed or removed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FBF4EC] py-16" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
        {/* Gallery + content */}
        <div className="lg:col-span-2">
          <ImageGallery images={design.images} title={design.title} />

          <h1
            className="mt-10 text-4xl italic leading-tight text-[#241B1D] md:text-5xl"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            {design.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#241B1D]/70">
            {design.description}
          </p>

          {/* Trust strip — the paisa-wasool signal, right under the title */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-[#D89A2D]/25 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.label} className="flex flex-col gap-1">
                <span className="text-2xl">{point.icon}</span>
                <p className="text-sm font-semibold text-[#241B1D]">{point.label}</p>
                <p className="text-xs leading-snug text-[#241B1D]/55">{point.note}</p>
              </div>
            ))}
          </div>

          <GarlandDivider tone="wine" className="mt-12 h-6 w-full opacity-70" />

          {/* Flowers used */}
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold text-[#241B1D]">Flowers Used</h2>
            <div className="flex flex-wrap gap-3">
              {design.flowers.map((flower) => (
                <span
                  key={flower}
                  className="rounded-full border border-[#D89A2D]/40 bg-[#D89A2D]/10 px-5 py-2 text-sm font-medium text-[#6E1F32]"
                >
                  🌸 {flower}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold text-[#241B1D]">Features</h2>
            <ul className="space-y-3">
              {design.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[#241B1D]/80">
                  <span className="mt-0.5 text-[#4B5842]">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Why choose this decoration */}
          <div className="mt-14">
            <h2 className="mb-6 text-2xl font-semibold text-[#241B1D]">
              Why This Is Worth It
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              {whyChoose.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#D89A2D]/20 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-[#241B1D]">
                    {item.icon} {item.title}
                  </h3>
                  <p className="mt-2 text-[#241B1D]/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable for */}
          <div className="mt-14">
            <h2 className="mb-6 text-2xl font-semibold text-[#241B1D]">Suitable For</h2>
            <div className="flex flex-wrap gap-3">
              {suitableFor.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-[#D89A2D]/40 bg-[#D89A2D]/10 px-5 py-3 text-sm font-medium text-[#6E1F32]"
                >
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div className="mt-14 rounded-3xl border border-[#D89A2D]/25 bg-white p-6">
            <h3
              className="text-2xl italic text-[#6E1F32]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              ✨ Customization Available
            </h3>
            <p className="mt-3 text-[#241B1D]/60">
              Every decoration can be customized according to:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {customizationOptions.map((option) => (
                <span
                  key={option}
                  className="rounded-full bg-[#FBF4EC] px-4 py-1.5 text-sm font-medium text-[#241B1D]/75"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking sidebar — card stays sticky, form scrolls below it */}
        <div className="lg:col-span-1">
          <div className="lg:top-24">
            <BookingCard design={design} />
          </div>
          <BookingInquiryForm design={design} />
        </div>
      </div>

      {/* Uncomment once RelatedDesigns is wired up to your API */}
      {/* <div className="mx-auto mt-24 max-w-7xl px-6">
        <RelatedDesigns category={design.category} currentId={design._id} />
      </div> */}
    </section>
  );
};

export default DesignDetails;