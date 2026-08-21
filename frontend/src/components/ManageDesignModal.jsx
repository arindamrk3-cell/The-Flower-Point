import { useEffect, useState } from "react";
import { addPhotos } from "../../services/designServices";
import { deletePhoto } from "../../services/designServices";
import { setCoverImage } from "../../services/designServices";
import { updateDesign } from "../../services/designServices";

// Same fonts as the rest of the site.
const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const categoryOptions = [
  { value: "marriage", label: "Marriage" },
  { value: "puja", label: "Puja" },
  { value: "birthday", label: "Birthday" },
  { value: "reception", label: "Reception" },
  { value: "corporate", label: "Corporate" },
];

const tabs = [
  { key: "photos", label: "Photos" },
  { key: "details", label: "Details" },
];

const ManageDesignModal = ({ isOpen, onClose, design, refetchDesigns }) => {
  const [activeTab, setActiveTab] = useState("photos");
  const [uploadImages, setUploadImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [busyImage, setBusyImage] = useState(null); // image currently being deleted/set-as-cover

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    shortDescription: "",
    description: "",
    flowers: "",
    features: "",
    newImages: [],
  });

  useEffect(() => {
    if (design) {
      setForm({
        title: design.title,
        category: design.category,
        price: design.price,
        shortDescription: design.shortDescription,
        description: design.description,
        flowers: design.flowers.join(", "),
        features: design.features.join(", "),
        newImages: [],
      });
    }
  }, [design]);

  const handleUpload = async () => {
    if (uploadImages.length === 0) {
      return alert("Choose images first");
    }

    setIsUploading(true);
    try {
      await addPhotos(design._id, uploadImages);
      await refetchDesigns();
      alert("Photos uploaded successfully");
      setUploadImages([]);
      onClose();
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (image) => {
    const confirmDelete = window.confirm("Delete this photo?");
    if (!confirmDelete) return;

    setBusyImage(image);
    try {
      await deletePhoto(design._id, image);
      await refetchDesigns();
      alert("Photo Deleted");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);
    } finally {
      setBusyImage(null);
    }
  };

  const handleCover = async (image) => {
    setBusyImage(image);
    try {
      await setCoverImage(design._id, image);
      alert("Cover Image Updated");
      await refetchDesigns();
    } catch (err) {
      console.log(err);
    } finally {
      setBusyImage(null);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await updateDesign(design._id, {
        ...form,
        flowers: form.flowers.split(",").map((item) => item.trim()),
        features: form.features.split(",").map((item) => item.trim()),
      });
      await refetchDesigns();
      alert("Design Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !design) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241B1D]/70 p-4 backdrop-blur-sm"
      style={{ fontFamily: FONT_BODY }}
    >
      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-[#FBF4EC] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D89A2D]/25 bg-white px-8 py-6">
          <div>
            <h2
              className="text-3xl italic text-[#6E1F32]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              🌸 {design.title}
            </h2>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-[#4B5842]">
              Manage Decoration
            </p>
          </div>

          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-2xl text-[#241B1D]/50 transition hover:bg-[#D89A2D]/10 hover:text-[#6E1F32]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#D89A2D]/25 bg-white px-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-6 py-4 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "text-[#6E1F32]"
                  : "text-[#241B1D]/45 hover:text-[#6E1F32]"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute inset-x-4 -bottom-px h-[3px] rounded-full bg-[#D89A2D]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "photos" && (
            <div>
              {/* Upload */}
              <div className="mb-10 rounded-2xl border-2 border-dashed border-[#D89A2D]/40 bg-white p-8">
                <h3
                  className="mb-1 text-xl text-[#241B1D]"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
                >
                  Upload More Photos
                </h3>
                <p className="mb-4 text-sm text-[#241B1D]/50">
                  JPG or PNG, multiple files allowed.
                </p>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#D89A2D]/40 bg-[#FBF4EC] px-5 py-2.5 text-sm font-semibold text-[#6E1F32] transition hover:border-[#D89A2D]">
                  Choose Files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setUploadImages(Array.from(e.target.files))}
                    className="hidden"
                  />
                </label>

                {uploadImages.length > 0 && (
                  <p className="mt-4 text-sm font-semibold text-[#4B5842]">
                    {uploadImages.length} image(s) selected
                  </p>
                )}

                <div>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="mt-6 rounded-xl bg-[#6E1F32] px-6 py-3 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload Photos"}
                  </button>
                </div>
              </div>

              {/* Existing Images */}
              <h3
                className="mb-5 text-xl text-[#241B1D]"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
              >
                Existing Photos
              </h3>

              {design.images.length === 0 ? (
                <p className="rounded-2xl bg-white p-8 text-center text-[#241B1D]/50">
                  No photos yet — upload some above.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {design.images.map((image, index) => {
                    const isBusy = busyImage === image;
                    const isCover = design.coverImage === image;

                    return (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#D89A2D]/15"
                      >
                        <img src={image} alt="" className="h-56 w-full object-cover" />

                        {isCover && (
                          <span className="absolute left-3 top-3 rounded-full bg-[#D89A2D] px-3 py-1 text-xs font-bold text-[#241B1D]">
                            ⭐ Cover
                          </span>
                        )}

                        <div className="flex justify-between gap-2 p-4">
                          <button
                            onClick={() => handleCover(image)}
                            disabled={isBusy}
                            className="flex-1 rounded-lg bg-[#D89A2D] px-3 py-2 text-sm font-semibold text-[#241B1D] transition hover:bg-[#c78c25] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            ⭐ Cover
                          </button>

                          <button
                            onClick={() => handleDeletePhoto(image)}
                            disabled={isBusy}
                            className="flex-1 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-200 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isBusy ? "..." : "🗑 Delete"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "details" && (
            <div className="mx-auto max-w-2xl space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Price
                </label>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Short Description
                </label>
                <input
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Description
                </label>
                <textarea
                  rows="5"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Flowers <span className="font-normal text-[#241B1D]/40">(comma separated)</span>
                </label>
                <input
                  value={form.flowers}
                  onChange={(e) => setForm({ ...form, flowers: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
                  Features <span className="font-normal text-[#241B1D]/40">(comma separated)</span>
                </label>
                <input
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="rounded-xl border border-[#D89A2D]/30 px-6 py-3 text-sm font-semibold text-[#241B1D]/70 transition hover:bg-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="rounded-xl bg-[#6E1F32] px-6 py-3 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDesignModal;