import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import getBaseUrl from "../utils/getBaseUrl";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const CategoryPage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get(`${getBaseUrl()}/main`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  let { name: category } = useParams();

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category.toLowerCase() == category
  );

  return (
    <>
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to={"/categories"}>
              <button className="cursor-pointer mr-4 text-sm text-gray-400 hover:text-white">
                <i className="fa-solid fa-arrow-left"></i> Back
              </button>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold">
              {category[0].toUpperCase()}
              {category.slice(1, category.length)} Recipes
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipes/${recipe._id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
