import { Link } from "react-router-dom";
import designs from "../data/designs";

const RelatedDesigns = ({ category, currentId }) => {

  const related = designs
    .filter(
      item =>
        item.category === category &&
        item.id !== currentId
    )
    .slice(0,3);

  return (

    <div className="mt-20">

      <h2 className="mb-8 text-4xl font-bold">
        Similar Decorations
      </h2>

      <div className="grid gap-8 md:grid-cols-3">

        {related.map(item=>(
          <Link
            key={item.id}
            to={`/design/${item.id}`}
            className="overflow-hidden rounded-3xl bg-white shadow-lg"
          >

            <img
              src={item.images[0]}
              className="h-60 w-full object-cover"
            />

            <div className="p-5">

              <h3 className="font-bold text-xl">
                {item.title}
              </h3>

              <p className="mt-3 text-rose-700 font-bold">
                {item.price}
              </p>

            </div>

          </Link>
        ))}

      </div>

    </div>

  );

};

export default RelatedDesigns;