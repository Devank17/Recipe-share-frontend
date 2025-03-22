import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard";
import getBaseUrl from "../../utils/getBaseUrl";
import axios from "axios";

const PopularCategories = () => {
  // State to hold all recipes fetched from the server
  const [recipes, setRecipes] = useState([]);
  // State to hold counts for each category
  const [catCounts, setCatCounts] = useState({});

  // Define the list of categories we are interested in.
  const categories = [
    "Italian",
    "Asian",
    "Dessert",
    "Vegetarian",
    "Breakfast",
    "Quick Meals",
  ];

  // Fetch recipes from the API
  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/main`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  // Calculate counts for each category once recipes are loaded
  useEffect(() => {
    if (recipes.length > 0) {
      const counts = {};
      categories.forEach((cat) => {
        // Compare in lower-case to account for any differences in casing.
        counts[cat] = recipes.filter(
          (recipe) =>
            recipe.category &&
            recipe.category.toLowerCase() === cat.toLowerCase()
        ).length;
      });
      setCatCounts(counts);
    }
  }, [recipes]);

  return (
    <div className="w-full bg-[hsl(var(--background))] py-12 px-2 sm:px-0">
      <div className="container mx-auto">
        <div className="flex mx-3 mb-8 justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-[poppins] font-semibold">
            Popular Categories
          </h1>
          <Link to={"/categories"}>
            <button className="cursor-pointer text-xs sm:text-sm border border-slate-700 rounded-md px-3.5 py-1.5 bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))]">
              View All
            </button>
          </Link>
        </div>

        <div className="mx-auto px-2 sm:px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((catName) => (
            <Link key={catName} to={`/categories/${catName.toLowerCase()}`}>
              <CategoryCard category={catCounts[catName] || 0} name={catName} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
