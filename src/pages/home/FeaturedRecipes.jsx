import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import { Link } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/getBaseUrl";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${getBaseUrl()}/main`).then((res) => {
        setRecipes(res.data);
      });
    } catch (error) {
      console.error("❌ Error in useEffect:", error);
    }
  }, []);

  // Correct random number function
  const randomNum = () => {
    return Math.floor(Math.random() * recipes.length);
  };

  // Initialize random recipe states as null
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);

  // Update random recipe states when recipes are loaded
  useEffect(() => {
    if (recipes.length > 0) {
      setData1(recipes[randomNum()]);
      setData2(recipes[randomNum()]);
      setData3(recipes[randomNum()]);
      setData4(recipes[randomNum()]);
    }
  }, [recipes]);

  return (
    <div className="mainFeatured w-full bg-[hsl(var(--muted))]/30">
      <div className="container py-7 mx-auto">
        <div className="flex mx-3 mb-8 justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-[poppins] font-semibold">
            Featured Recipes
          </h1>
          <Link to={"/recipes"}>
            <button className="border border-slate-700 cursor-pointer text-xs text-nowrap sm:text-sm rounded-md px-3.5 py-1.5 bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))]">
              View All
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mx-auto px-2 sm:px-2 lg:px-0">
          <Link
            to={data1 ? `/recipes/${data1._id}` : "#"}
            className="block h-full"
          >
            <RecipeCard recipe={data1} />
          </Link>
          <Link
            to={data2 ? `/recipes/${data2._id}` : "#"}
            className="block h-full"
          >
            <RecipeCard recipe={data2} />
          </Link>
          <Link
            to={data3 ? `/recipes/${data3._id}` : "#"}
            className="block h-full"
          >
            <RecipeCard recipe={data3} />
          </Link>
          <Link
            to={data4 ? `/recipes/${data4._id}` : "#"}
            className="block h-full"
          >
            <RecipeCard recipe={data4} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipes;
