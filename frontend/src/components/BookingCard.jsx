const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

// Same number used on the Contact page — keep these in sync if it ever changes.
const PHONE_NUMBER = "+918972304642";
const WHATSAPP_NUMBER = "918972304642";

const BookingCard = ({ design }) => {
  return (
    <div
      className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-[#D89A2D]/15"
      style={{ fontFamily: FONT_BODY }}
    >
      <p className="text-sm uppercase tracking-[0.12em] text-[#241B1D]/45">
        Starting Price
      </p>

      <h2
        className="mt-2 text-4xl text-[#6E1F32]"
        style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
      >
        {design.price}
      </h2>

      <a
        href={`tel:${PHONE_NUMBER}`}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6E1F32] py-4 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928]"
      >
        📞 Call Now
      </a>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hi, I'm interested in the "${design.title}" decoration.`
        )}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        💬 WhatsApp
      </a>
    </div>
  );
};

export default BookingCard;