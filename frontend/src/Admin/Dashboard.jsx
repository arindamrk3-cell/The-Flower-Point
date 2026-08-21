import { useEffect, useState } from "react";
import { getAllInquiries } from "./services/inquiryServices";
import InquiryDetailsModal from "../components/InquiryDetailsModal";
import { deleteInquiry } from "./services/inquiryServices";
const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

// Status names vary by backend — fall back to marigold for anything unrecognized
// rather than breaking the layout.
const statusStyles = {
  new: "bg-[#D89A2D]/15 text-[#B97E1E]",
  contacted: "bg-blue-50 text-blue-700",
  booked: "bg-[#4B5842]/10 text-[#4B5842]",
  completed: "bg-[#241B1D]/10 text-[#241B1D]",
  cancelled: "bg-red-50 text-red-600",
};

const getStatusStyle = (status) =>
  statusStyles[status?.toLowerCase()] || "bg-[#D89A2D]/15 text-[#B97E1E]";

const detailRows = [
  { key: "phone", icon: "📞" },
  { key: "eventType", icon: "💍" },
  { key: "venue", icon: "📍" },
];

const Dashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      const response = await getAllInquiries();
      setInquiries(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const openInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };
  const filteredInquiries = inquiries.filter((item) => {

    const matchSearch =
        item.customerName
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchStatus =
        selectedStatus === "All" ||
        item.status === selectedStatus;

    return matchSearch && matchStatus;

});
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Delete this inquiry?"
    );

    if (!confirmDelete) return;

    try {

        await deleteInquiry(id);

        fetchInquiries();

    } catch (err) {

        console.log(err);

        alert("Delete failed.");

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
            Loading inquiries...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FBF4EC] p-6 md:p-10" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
          Admin
        </p>
        <h1
          className="mt-1 text-4xl italic text-[#6E1F32]"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
        >
          Customer Inquiries
        </h1>
         <p className="mt-2 mb-10 text-[#241B1D]/55">
          {inquiries.length} inquir{inquiries.length !== 1 ? "ies" : "y"} received
        </p>
      <div className="mt-6 flex flex-wrap gap-3">

    {[
        "All",
        "New",
        "Contacted",
        "Booked",
        "Completed",
        "Cancelled"
    ].map((status)=>(

        <button

            key={status}

            onClick={()=>setSelectedStatus(status)}

            className={`rounded-full px-5 py-2 transition ${
                selectedStatus===status
                    ? "bg-rose-700 text-white"
                    : "border"
            }`}

        >

            {status}

        </button>

    ))}

</div>
       

        {inquiries.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D89A2D]/40 bg-white p-16 text-center">
            <p className="text-4xl">📭</p>
            <p
              className="mt-4 text-2xl italic text-[#6E1F32]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              No inquiries yet
            </p>
            <p className="mt-2 text-[#241B1D]/55">
              New customer inquiries will show up here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredInquiries.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#D89A2D]/15"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2
                    className="text-2xl text-[#241B1D]"
                    style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
                  >
                    {item.customerName}
                  </h2>

                  <span
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-[#241B1D]/70 sm:grid-cols-2">
                  {detailRows.map(({ key, icon }) =>
                    item[key] ? (
                      <p key={key}>
                        {icon} {item[key]}
                      </p>
                    ) : null
                  )}
                  {item.design?.title ? (
    <p>🎨 {item.design.title}</p>
) : (
    <p>📩 General Inquiry</p>
)}
                </div>

         <div className="mt-5 flex gap-3">       <button
                  onClick={() => openInquiry(item)}
                  className="mt-5 rounded-lg bg-[#6E1F32] px-5 py-2.5 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928]"
                >
                  👁 View Details
                </button>
                <button
    onClick={() => handleDelete(item._id)}
    className="rounded w-auto h-10 bg-red-600 px-5 py-2 text-white hover:bg-red-700"
>
    🗑
</button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <InquiryDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        inquiry={selectedInquiry}
      />
    </section>
  );
};

export default Dashboard;