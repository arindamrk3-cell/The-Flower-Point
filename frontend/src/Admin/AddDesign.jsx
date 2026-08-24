import { useState } from "react";
import { createDesign } from "../../services/designServices";
import { useNavigate } from "react-router-dom";
import GarlandDivider from "../components/GarlandDivider";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const categoryOptions = [
  { value: "marriage",  label: "Marriage"  },
  { value: "puja",      label: "Puja"      },
  { value: "birthday",  label: "Birthday"  },
  { value: "reception", label: "Reception" },
  { value: "corporate", label: "Corporate" },
  { value:"festival",   label:"Festival"   }
];

const inputClass =
  "w-full rounded-xl border border-[#D89A2D]/30 bg-[#FBF4EC] p-4 text-[#241B1D] outline-none transition focus:border-[#6E1F32] focus:bg-white";

const labelClass = "mb-2 block text-sm font-semibold text-[#241B1D]";

const AddDesign = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    shortDescription: "",
    description: "",
    flowers: "",
    features: "",
    images: [],
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
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description);

      formData.append(
        "flowers",
        JSON.stringify(form.flowers.split(",").map((item) => item.trim()))
      );

      formData.append(
        "features",
        JSON.stringify(form.features.split(",").map((item) => item.trim()))
      );

      form.images.forEach((image) => {
        formData.append("images", image);
      });

      await createDesign(formData);

      alert("Design Added Successfully!");
      navigate("/admin/manage-designs");

      setForm({
        title: "",
        category: "",
        price: "",
        shortDescription: "",
        description: "",
        flowers: "",
        features: "",
        images: [],
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FBF4EC] py-16" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
          Admin
        </p>
        <h1
          className="mt-2 text-center text-4xl italic text-[#6E1F32]"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
        >
          Add New Decoration
        </h1>

        <GarlandDivider tone="wine" className="mx-auto mt-6 h-6 w-full max-w-xs opacity-70" />

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              placeholder="e.g. Royal Marigold Mandap"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Price</label>
              <input
                name="price"
                placeholder="e.g. ₹25,000"
                value={form.price}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input
              name="shortDescription"
              placeholder="One line shown on the gallery card"
              value={form.shortDescription}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Full details shown on the design page"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Flowers <span className="font-normal text-[#241B1D]/40">(comma separated)</span>
            </label>
            <input
              name="flowers"
              placeholder="Rose, Orchid, Lily"
              value={form.flowers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Features <span className="font-normal text-[#241B1D]/40">(comma separated)</span>
            </label>
            <input
              name="features"
              placeholder="Indoor, Premium, Fresh Flowers"
              value={form.features}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Upload Decoration Images</label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D89A2D]/40 bg-[#FBF4EC] p-8 text-center transition hover:border-[#D89A2D]">
              <span className="text-sm font-semibold text-[#6E1F32]">
                Click to choose images
              </span>
              <span className="mt-1 text-xs text-[#241B1D]/45">
                JPG or PNG, multiple files allowed
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setForm({
                    ...form,
                    images: Array.from(e.target.files),
                  })
                }
                className="hidden"
              />
            </label>

            {form.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {form.images.map((file, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg ring-1 ring-[#D89A2D]/20"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-20 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6E1F32] px-6 py-4 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Uploading...
              </>
            ) : (
              "Add Design"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddDesign;