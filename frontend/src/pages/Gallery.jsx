import { useMemo, useState } from "react";
//import designs from "../data/designs";
import {getAllDesigns} from "../../services/designServices";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GarlandDivider from "../components/GarlandDivider";

const FONT_DISPLAY = "'Fraunces', serif";
const FONT_BODY = "'Manrope', sans-serif";

const categories = ["All", "Marriage", "Puja", "Birthday", "Reception", "Corporate"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [designs, setDesigns]=useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchDesigns =async ()=>{
      try{
        const response=await getAllDesigns();
        setDesigns(response.data);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchDesigns();
  },[]);

useEffect(() => {
  document.title =
    "Flower Decoration Gallery | The Flower Point";

  const description = document.querySelector(
    'meta[name="description"]'
  );

  if (description) {
    description.setAttribute(
      "content",
      "Explore The Flower Point's collection of wedding, marriage, puja, birthday, reception and corporate flower decoration designs."
    );
  }
}, []);


  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const matchCategory =
        selectedCategory === "All" ||
        design.category === selectedCategory.toLowerCase();

      const matchSearch = design.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [designs,selectedCategory, search]);


//   if (loading) {
//     return (
//         <h1 className="py-20 text-center text-3xl">
//             Loading...
//         </h1>
//     );
// }

  return (
    <section className="min-h-screen bg-[#FBF4EC] py-16" style={{ fontFamily: FONT_BODY }}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#D89A2D]">
          Handpicked &amp; Fresh
        </p>

        <h1
          className="mt-3 text-center text-5xl italic text-[#6E1F32]"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
        >
          Our Gallery
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-center text-[#241B1D]/60">
          Every design below is priced upfront — no surprise add-ons, no
          negotiating at the venue.
        </p>

        <GarlandDivider tone="wine" className="mx-auto mt-8 h-6 w-full max-w-xs opacity-70" />

        {/* Search */}
        <div className="mt-10 flex justify-center">
          <input
            type="text"
            placeholder="Search design..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-xl border border-[#D89A2D]/30 bg-white px-5 py-3 text-[#241B1D] outline-none transition focus:border-[#6E1F32]"
          />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                selectedCategory === item
                  ? "bg-[#6E1F32] text-[#FBF4EC]"
                  : "border border-[#D89A2D]/30 bg-white text-[#241B1D]/70 hover:border-[#D89A2D] hover:text-[#6E1F32]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Gallery */}
        {filteredDesigns.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredDesigns.map((design) => (
              <Link
                key={design._id}
                to={`/design/${design._id}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#D89A2D]/15 transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={design.coverImage || design.images[0]}
                    alt={design.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FBF4EC]/95 px-3 py-1 text-xs font-semibold text-[#6E1F32]">
                    {design.category}
                  </span>
                </div>

                <div className="p-6">
                  <h2
                    className="text-2xl text-[#241B1D]"
                    style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
                  >
                    {design.title}
                  </h2>

                  <p className="mt-3 text-[#241B1D]/60">
                    {design.shortDescription}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-lg font-bold text-[#6E1F32]">
                      {design.price}
                    </p>
                    <span className="text-sm font-semibold text-[#D89A2D] opacity-0 transition group-hover:opacity-100">
                      View design →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-4xl">🌸</p>
            <p
              className="mt-4 text-2xl italic text-[#6E1F32]"
              style={{ fontFamily: FONT_DISPLAY }}
            >
              No designs match that search
            </p>
            <p className="mt-2 text-[#241B1D]/55">
              Try a different keyword or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;