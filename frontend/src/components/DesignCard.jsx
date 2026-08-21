const DesignCard = ({
  design,
  onManage,
  onDelete,
  onView,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">

      <div className="flex items-center gap-6">

        <img
          src={design.coverImage || design.images[0]}
          alt={design.title}
          className="h-24 w-24 rounded-xl object-cover"
        />

        <div>

          <h2 className="text-2xl font-bold">
            {design.title}
          </h2>

          <p className="capitalize text-gray-600">
            {design.category}
          </p>

          <p className="font-semibold text-rose-700">
            ₹ {design.price}
          </p>

          <p className="text-sm text-gray-500">
            {design.images.length} Photos
          </p>

        </div>

      </div>

      <div className="flex gap-3">

       

        <button
          onClick={() => onManage(design)}
          className="rounded-lg bg-yellow-500 px-2 py-1 text-white"
        >
          ⚙ Manage
        </button>

        <button
          onClick={() => onDelete(design._id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-white"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
};

export default DesignCard;