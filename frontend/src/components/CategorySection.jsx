import CategoryCard from "./CategoryCard";
import categories from "../data/categories";

const CategorySection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 bg-white sm:px-8 lg:px-16 " >

      <h2 className="mb-2 text-center text-5xl font-bold " >
        Our Services
      </h2>

      <p className="mb-14 text-center text-gray-600">
        Floral decorations for every occasion.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <CategoryCard
            key={item.id}
            category={item}
          />
        ))}
      </div>

    </section>
  );
};

export default CategorySection;