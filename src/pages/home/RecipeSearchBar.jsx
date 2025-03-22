import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/getBaseUrl";

const RecipeSearchBar = () => {
  const navigate = useNavigate();
  const [sampleRecipes, setSampleRecipes] = useState([]);
  // States for handling search and results
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(`${getBaseUrl()}/main`).then((res) => {
      setSampleRecipes(res.data);
    });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        setIsLoading(true);
        setTimeout(() => {
          const results = sampleRecipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(results);
          setIsLoading(false);
          setShowResults(true);
        }, 300);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    const filRecipe = sampleRecipes.filter((el) =>
      el.title.toLowerCase().includes(data.searchQuery.toLowerCase())
    );
    setShowResults(false);
    navigate(`/recipes/${filRecipe[0]?._id}`);
  };

  // Handle clicking on a search result
  const handleResultClick = (recipe) => {
    setSearchTerm(recipe.title);
    setShowResults(false);
    navigate(`/recipes/${recipe._id}`);
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto relative"
      ref={searchContainerRef}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="relative">
          <input
            type="text"
            {...register("searchQuery", { required: true })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for recipes..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent "
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Search results dropdown */}
      {showResults && (
        <div className="absolute w-full mt-2 bg-[hsl(var(--background))] text-white rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <CircularProgress />
            </div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((recipe) => (
                <li
                  key={recipe.id}
                  onClick={() => handleResultClick(recipe)}
                  className="p-3 hover:bg-[hsl(var(--muted))] cursor-pointer border-b border-slate-700 last:border-b-0"
                >
                  <div className="font-medium">{recipe.title}</div>
                  <div className="text-sm text-gray-500">{recipe.category}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No recipes found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeSearchBar;
