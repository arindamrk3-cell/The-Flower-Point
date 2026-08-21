import { useState } from "react";
import { createInquiry } from "../Admin/services/inquiryServices";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const inputClass =
  "w-full rounded-xl border border-[#D89A2D]/30 bg-[#FBF4EC] p-4 text-[#241B1D] outline-none transition focus:border-[#6E1F32] focus:bg-white";

const BookingInquiryForm = ({ design }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    eventType: design.category,
    eventDate: "",
    venue: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createInquiry({
        ...form,
        design: design._id,
      });

      setSuccess(true);

      setForm({
        customerName: "",
        phone: "",
        email: "",
        eventType: design.category,
        eventDate: "",
        venue: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="mt-8 rounded-3xl bg-[#4B5842]/10 p-10 text-center shadow-sm ring-1 ring-[#4B5842]/20"
        style={{ fontFamily: FONT_BODY }}
      >
        <h2
          className="text-2xl italic text-[#4B5842]"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
        >
          ✅ Inquiry Submitted
        </h2>
        <p className="mt-4 text-[#241B1D]/70">
          Thank you for contacting The Flower Point.
        </p>
        <p className="mt-2 text-[#241B1D]/55">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      className="mt-8 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-[#D89A2D]/15"
      style={{ fontFamily: FONT_BODY }}
    >
      <h2
        className="mb-6 text-2xl italic text-[#6E1F32]"
        style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
      >
        Book This Decoration
      </h2>

      <div className="mb-6 rounded-2xl border border-[#D89A2D]/20 bg-[#FBF4EC] p-5">
        <p className="text-xs uppercase tracking-[0.1em] text-[#241B1D]/45">
          Selected Decoration
        </p>
        <h3
          className="mt-1 text-xl text-[#6E1F32]"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
        >
          {design.title}
        </h3>
        <p className="mt-2 text-sm capitalize text-[#241B1D]/60">
          Category: {design.category}
        </p>
        <p className="mt-2 font-semibold text-[#D89A2D]">{design.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          value={form.customerName}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <input
          type="tel"
          pattern="[0-9]{10}"
          maxLength={10}
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <input
          type="text"
          name="venue"
          placeholder="Event Venue"
          value={form.venue}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <textarea
          rows="4"
          name="message"
          placeholder="Tell us about your event..."
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-[#6E1F32] py-4 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingInquiryForm;