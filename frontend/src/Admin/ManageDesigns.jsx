import { useEffect, useState } from "react";
import { getAllDesigns } from "../../services/designServices";
import { deleteDesign } from "../../services/designServices";
import DesignCard from "../components/DesignCard";
import ManageDesignModal from "../components/ManageDesignModal";
import { useNavigate } from "react-router-dom";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const ManageDesigns = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    price: "",
    shortDescription: "",
    description: "",
    flowers: "",
    features: "",
    newImages: [],
  });

  const fetchDesigns = async () => {
    try {
      const response = await getAllDesigns();
      setDesigns(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const openManageModal = (design) => {
    setSelectedDesign(design);
    setEditForm({
      title: design.title,
      category: design.category,
      price: design.price,
      shortDescription: design.shortDescription,
      description: design.description,
      flowers: design.flowers.join(", "),
      features: design.features.join(", "),
      newImages: [],
    });
    setShowManageModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this design?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDesign(id);
      setDesigns((prev) => prev.filter((design) => design._id !== id));
      alert("Design deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete design.");
    }
  };

  if (loading) {
    return (
      <section
        className="flex min-h-screen items-center justify-center bg-[#FBF4EC]"
        style={{ fontFamily: FONT_BODY }}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D89A2D]/30 border-t-[#6E1F32]" />
          <p className="text-sm uppercase tracking-[0.14em] text-[#4B5842]">
            Loading designs...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FBF4EC] p-4 sm:p-6 md:p-10" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D89A2D] sm:text-sm">
              Admin
            </p>
            <h1
              className="mt-1 text-3xl italic text-[#6E1F32] sm:text-4xl"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              Manage Designs
            </h1>
            <p className="mt-2 text-sm text-[#241B1D]/55 sm:text-base">
              {designs.length} design{designs.length !== 1 ? "s" : ""} live on the site
            </p>
            <button
    onClick={() => {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        window.location.href = "/admin/login";

    }}
    className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
>
    Logout
</button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full rounded-xl border border-[#6E1F32]/30 px-6 py-3 text-sm font-semibold text-[#6E1F32] transition hover:bg-white sm:w-auto"
            >
              Inquiry
            </button>

            <button
              onClick={() => navigate("/admin/add-design")}
              className="w-full rounded-xl bg-[#6E1F32] px-6 py-3 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] sm:w-auto"
            >
              + Add New Design
            </button>
          </div>
        </div>

        {designs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D89A2D]/40 bg-white p-8 text-center sm:p-16">
            <p className="text-4xl">🌸</p>
            <p
              className="mt-4 text-xl italic text-[#6E1F32] sm:text-2xl"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              No designs yet
            </p>
            <p className="mt-2 text-sm text-[#241B1D]/55 sm:text-base">
              Add your first decoration design to get started.
            </p>
            <button
              onClick={() => navigate("/admin/add-design")}
              className="mt-6 w-full rounded-xl bg-[#6E1F32] px-6 py-3 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] sm:w-auto"
            >
              + Add New Design
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {designs.map((design) => (
              <DesignCard
                key={design._id}
                design={design}
                onManage={openManageModal}
                onDelete={handleDelete}
                onView={(design) => console.log(design)}
              />
            ))}
          </div>
        )}
      </div>

      <ManageDesignModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        design={selectedDesign}
        refetchDesigns={fetchDesigns}
      />
    </section>
  );
};

export default ManageDesigns;