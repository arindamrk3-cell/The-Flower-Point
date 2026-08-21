import { useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import GarlandDivider from "../components/GarlandDivider";
import {createInquiry } from "../Admin/services/inquiryServices";
const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const inputClass =
  "w-full rounded-xl border border-[#D89A2D]/30 bg-[#FBF4EC] p-4 text-[#241B1D] outline-none transition focus:border-[#6E1F32] focus:bg-white";

const contactDetails = [
  {
    icon: FaPhoneAlt,
    color: "text-[#6E1F32]",
    content: <>+91 89723 04642</>,
  },
  {
    icon: FaWhatsapp,
    color: "text-green-600",
    content: (
      <a
        href="https://wa.me/918972304642"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        +91 89723 04642
      </a>
    ),
  },
  {
    icon: FaEnvelope,
    color: "text-[#6E1F32]",
    content: <>theflowerpoint@gmail.com</>,
  },
  {
    icon: FaMapMarkerAlt,
    color: "text-[#6E1F32]",
    content: <>Dinhata, Cooch Behar, West Bengal, India - 736135</>,
  },
  {
    icon: FaClock,
    color: "text-[#D89A2D]",
    content: <>Mon - Sun : 9:00 AM - 9:00 PM</>,
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    date: "",
    budget: "",
    location: "",
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

    try {

        await createInquiry({
            customerName: form.name,
            phone: form.phone,
            email: form.email,
            eventType: form.eventType,
            eventDate: form.date,
            venue: form.location,
            message: `Budget: ${form.budget || "Not specified"}\n\n${form.message}`,
            design: null,
        });

        alert("Thank you! Your inquiry has been received.");

        setForm({
            name: "",
            phone: "",
            email: "",
            eventType: "",
            date: "",
            budget: "",
            location: "",
            message: "",
        });

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to submit inquiry."
        );

    }
};

  return (
    <section className="bg-[#FBF4EC] py-16" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
            Get In Touch
          </p>
          <h1
            className="text-5xl italic text-[#6E1F32]"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Contact Us
          </h1>
          <p className="mt-4 text-[#241B1D]/60">
            We'd love to decorate your special occasion.
          </p>
          <GarlandDivider tone="wine" className="mx-auto mt-8 h-6 w-full max-w-xs opacity-70" />
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* FORM */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2
              className="mb-6 text-2xl text-[#241B1D]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              Request a Quote
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="tel"
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

              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select Event Type</option>
                <option>Marriage</option>
                <option>Puja</option>
                <option>Birthday</option>
                <option>Reception</option>
                <option>Corporate</option>
                <option>Festival</option>
              </select>

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />

                <input
                  type="text"
                  name="budget"
                  placeholder="Budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={form.location}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                rows="5"
                name="message"
                placeholder="Tell us about your event..."
                value={form.message}
                onChange={handleChange}
                className={inputClass}
              />

              <button className="w-full rounded-xl bg-[#6E1F32] py-4 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928]">
                Request a Quote
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2
                className="mb-6 text-2xl text-[#241B1D]"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
              >
                Contact Information
              </h2>

              <div className="space-y-5">
                {contactDetails.map(({ icon: Icon, color, content }, index) => (
                  <p key={index} className="flex items-center gap-4 text-[#241B1D]/80">
                    <span
                      className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#FBF4EC] ${color}`}
                    >
                      <Icon />
                    </span>
                    {content}
                  </p>
                ))}
              </div>
            </div>

            {/* GOOGLE MAP */}
            {/* <div className="overflow-hidden rounded-3xl shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Dinhata,+Cooch+Behar,+West+Bengal&output=embed"
                className="h-80 w-full"
                loading="lazy"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;