import { useEffect, useState } from "react";
import { updateInquiry } from "../Admin/services/inquiryServices";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const statusOptions = ["New", "Contacted", "Booked", "Completed", "Cancelled"];

const detailFields = [
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email", fallback: "Not Provided" },
  { label: "Event Type", key: "eventType" },
  {
    label: "Event Date",
    key: "eventDate",
    format: (value) => (value ? new Date(value).toLocaleDateString() : "Not Provided"),
  },
  { label: "Venue", key: "venue" },
  { label: "Decoration", key: "design", format: (value) => value?.title || "Not Selected" },
];

const InquiryDetailsModal = ({ isOpen, onClose, inquiry }) => {
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (inquiry) {
      setStatus(inquiry.status);
    }
  }, [inquiry]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateInquiry(inquiry._id, { status });
      alert("Status Updated");
      onClose();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !inquiry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241B1D]/70 p-4 backdrop-blur-sm"
      style={{ fontFamily: FONT_BODY }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#FBF4EC] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D89A2D]/25 bg-white px-8 py-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
              Inquiry
            </p>
            <h2
              className="mt-1 text-3xl italic text-[#6E1F32]"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              {inquiry.customerName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-2xl text-[#241B1D]/50 transition hover:bg-[#D89A2D]/10 hover:text-[#6E1F32]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {detailFields.map(({ label, key, fallback, format }) => {
              const raw = inquiry[key];
              const value = format ? format(raw) : raw || fallback || "Not Provided";

              return (
                <div key={key}>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D89A2D]">
                    {label}
                  </p>
                  <p className="mt-1 text-[#241B1D]">{value}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-[#D89A2D]/25 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D89A2D]">
              Customer Message
            </p>
            <p className="mt-2 text-[#241B1D]/75">{inquiry.message || "No message"}</p>
          </div>

          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-[#241B1D]">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-[#D89A2D]/30 bg-white p-3 outline-none transition focus:border-[#6E1F32]"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#D89A2D]/30 px-6 py-3 text-sm font-semibold text-[#241B1D]/70 transition hover:bg-white"
            >
              Close
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-xl bg-[#6E1F32] px-6 py-3 text-sm font-semibold text-[#FBF4EC] transition hover:bg-[#5A1928] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailsModal;