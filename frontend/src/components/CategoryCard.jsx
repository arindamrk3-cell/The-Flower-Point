import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={category.link}
      className="group overflow-hidden rounded-3xl shadow-lg"
    >
      <div className="relative h-80">

        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 p-6 text-white">

          <h2 className="mb-2 text-2xl font-bold">
            {category.title}
          </h2>

          <p className="mb-4">
            {category.description}
          </p>

          <span className="font-semibold text-rose-300 hover:text-red-400 ">
            View Designs →
          </span>

        </div>

      </div>
    </Link>
  );
};

export default CategoryCard;