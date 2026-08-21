import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDesignsByCategory } from "../../services/designServices";

const CategoryPage = () => {

  const { category } = useParams();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchDesigns=async()=>{
      try
      { const response=await getDesignsByCategory(category);
        setDesigns(response.data);
      }
      catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  fetchDesigns();
    
  },[category]);


  const filteredDesigns = designs.filter(
    design => design.category === category
  );
if (loading) {
  return (
    <h1 className="py-20 text-center text-3xl">
      Loading...
    </h1>
  );
}
  return (

    <section className="mx-auto max-w-7xl px-6 py-20">

      <h1 className="mb-12 text-center text-5xl font-bold capitalize">
        {category} Decorations
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {designs.map((design)=>(
         <div
  key={design._id}
  className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
  <img
    src={design.coverImage || design.images[0]}
    alt={design.title}
    className="h-72 w-full object-cover"
  />

  <div className="p-6">
    <h2 className="text-2xl font-bold">
      {design.title}
    </h2>

    <p className="mt-3 text-gray-600">
      {design.shortDescription}
    </p>

    <p className="mt-5 text-2xl font-bold text-rose-700">
      {design.price}
    </p>

    <Link
      to={`/design/${design._id}`}
      className="mt-6 inline-flex rounded-xl bg-rose-700 px-6 py-3 text-white transition hover:bg-rose-800"
    >
      View Details
    </Link>
  </div>
</div>
        ))}

      </div>

    </section>

  );
};

export default CategoryPage;