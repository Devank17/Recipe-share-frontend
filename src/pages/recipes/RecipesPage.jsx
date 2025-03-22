import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Plus from "../../assets/svg/plus-icon.svg";
// import recipes from "../../data/data";
import RecipeCard from "../../components/RecipeCard";
import axios from "axios";
import getBaseUrl from "../../utils/getBaseUrl";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get(`${getBaseUrl()}/main`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("All Difficulties");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  const difficulties = ["Easy", "Medium", "Hard"];
  const sortOpt = ["Newest", "Oldest", "A-Z"];

  const categoryCount = recipes.reduce((acc, recipe) => {
    const category = recipe.category;
    if (!acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const categories = Object.keys(categoryCount).map((category, idx) => ({
    id: idx,
    name: category,
  }));

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCat === "All Categories" || recipe.category === selectedCat;
    const matchesDifficulty =
      selectedDifficulty === "All Difficulties" ||
      recipe.difficulty === selectedDifficulty;
    const matchesSearch =
      searchQuery.trim() === "" ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    // Only return recipes that match both filters
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (selectedSort === "Newest") {
      return (
        new Date(b.datePublished || b.datePublished) -
        new Date(a.datePublished || a.datePublished)
      );
    } else if (selectedSort === "Oldest") {
      return (
        new Date(a.datePublished || a.datePublished) -
        new Date(b.datePublished || b.datePublished)
      );
    } else if (selectedSort === "A-Z") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Recipes</h1>
            <Link to={"/recipe/new"}>
              <button className="cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none bg-white text-black shadow hover:bg-white/80 h-9 px-4 py-2 flex items-center gap-2">
                <img src={Plus} alt="Plus" /> Share Recipe
              </button>
            </Link>
          </div>

          <div className="bg-card rounded-lg p-6 mb-8 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex h-9 w-full rounded-md border border-slate-700 px-3 py-1 shadow-sm   bg-transparent text-sm font-medium  placeholder:text-gray-400 disabled:opacity-50"
                  placeholder="Search recipes..."
                />
              </div>

              <div className="">
                <select
                  onChange={(e) => setSelectedCat(e.target.value)}
                  name="category"
                  id="category"
                  className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-700 bg-[hsl(var(--background))] px-2 text-sm shadow-sm placeholder:text-gray-400 disabled:opacity-50"
                >
                  <option value="All Categories">All Categories</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  name="difficulty"
                  id="difficulty"
                  className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-700 bg-[hsl(var(--background))] px-2 text-sm shadow-sm placeholder:text-gray-400 disabled:opacity-50"
                >
                  <option value="All Difficulties">All Difficulties</option>
                  {difficulties.map((difficulty, idx) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-400">
                {sortedRecipes.length} recipes found
              </div>
              <div className="relative flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Sort by : </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  name="sort"
                  id="sort"
                  className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-700 bg-[hsl(var(--background))] px-3 text-sm shadow-sm placeholder:text-gray-400 disabled:opacity-50"
                >
                  {sortOpt.map((sort, idx) => (
                    <option key={idx} value={sort}>
                      {sort}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {sortedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedRecipes.map((el) => (
                <Link key={el._id} to={`/recipes/${el._id}`}>
                  <RecipeCard recipe={el} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No recipes found. Try adjusting your filters.
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default RecipesPage;
