import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import getBaseUrl from "../utils/getBaseUrl";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { auth } from "../firebase/firebase";

const ViewRecipe = () => {
  const currentUser = auth.currentUser;
  const [recipes, setRecipes] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "white",
      background: "#09090b",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await auth.currentUser.getIdToken();
          axios
            .delete(`${getBaseUrl()}/recipe/delete/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              navigate(`/recipes`);
            });
          Swal.fire({
            color: "white",
            background: "#09090b",
            title: "Deleted!",
            text: "Your Recipe has been Deleted.",
            icon: "success",
          });
        } catch (err) {
          console.error("Error submitting form:", err);
        }
      }
    });
  };

  useEffect(() => {
    axios.get(`${getBaseUrl()}/main`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => recipe._id == id);

  useEffect(() => {
    if (currentUser && filteredRecipes[0]?.authorId === currentUser.uid) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [currentUser, filteredRecipes]);

  if (!filteredRecipes?.length || !filteredRecipes[0]?.image) {
    return (
      <>
        <main className="flex flex-1 py-12 px-4 justify-center items-center">
          <CircularProgress />
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 flex-wrap">
            <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[hsl(var(--muted))] hover:text-white h-9 px-4 py-2 mb-4 flex items-center gap-1">
              <svg
                className="h-4 w-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <Link to={`/recipes`}>Back to Recipes</Link>
            </button>
            {isOwner && (
              <div className="grid grid-cols-1 self-stretch sm:grid-col-2 md:grid-cols-2 gap-2">
                <Link to={`/recipes/${id}/edit`}>
                  <button className="cursor-pointer w-full justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white border border-slate-700 bg-[hsl(var(--background))] shadow-sm hover:bg-[hsl(var(--muted))] hover:text-white h-9 px-4 py-2 flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                    Edit Recipe
                  </button>
                </Link>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-red-700 text-white shadow-sm hover:bg-red-700/90 h-9 px-4 py-2 flex items-center gap-1"
                  >
                    <svg
                      className="h-4 w-4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    Delete Recipe
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="mb-8 cursor-default">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="relative w-full md:w-1/2 h-[300px] rounded-lg overflow-hidden">
                <img
                  src={filteredRecipes[0]?.image}
                  alt={filteredRecipes[0]?.title}
                  className="rounded-lg"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-transparent bg-white text-black shadow hover:bg-white/80">
                      {filteredRecipes[0]?.category}
                    </div>
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-white">
                      {filteredRecipes[0]?.difficulty}
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold mb-2">
                    {filteredRecipes[0]?.title}
                  </h1>

                  <p className="text-gray-400 mb-4">
                    {filteredRecipes[0]?.description}
                  </p>

                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>

                    <span className="font-medium">
                      {filteredRecipes[0]?.ratings.average}
                    </span>

                    <span className="text-gray-400 text-sm">
                      ({filteredRecipes[0]?.ratings.count} ratings)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-[hsl(var(--muted))] rounded-lg">
                    <svg
                      className="h-5 w-5 mb-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {filteredRecipes[0]?.time.includes("(") ? (
                      <>
                        <span className="text-sm font-medium">
                          {filteredRecipes[0]?.time.split("(")[0].trim()}
                        </span>
                        <span className="text-[9px] text-gray-400 whitespace-nowrap text-center">
                          (
                          {filteredRecipes[0]?.time
                            .split("(")[1]
                            .replace(")", "")}
                          )
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-medium">
                        {filteredRecipes[0]?.time}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[hsl(var(--muted))] rounded-lg">
                    <svg
                      className="h-5 w-5 mb-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span className="text-sm font-medium">
                      {filteredRecipes[0]?.servings} servings
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[hsl(var(--muted))] rounded-lg">
                    <span className="text-sm font-medium mb-1">Calories</span>
                    <span className="text-sm ">
                      {filteredRecipes[0]?.nutritionFacts.calories}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {filteredRecipes[0]?.tags.map((tag) => (
                <div
                  key={tag}
                  className=" inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-transparent bg-[hsl(var(--muted))] text-white hover:bg-[hsl(var(--muted))]/80 text-xs"
                >
                  #{tag}
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-400">
              By Chef {filteredRecipes[0]?.author} • Published on{" "}
              {new Date(filteredRecipes[0]?.datePublished).toLocaleDateString(
                "en-GB"
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow">
                <div className="p-6 pt-6">
                  <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    For {filteredRecipes[0]?.servings} servings
                  </p>
                  <ul className="space-y-3 text-sm">
                    {filteredRecipes[0]?.ingredients.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-white mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow mt-6">
                <div className="p-6 pt-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Nutrition Facts
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">Per serving</p>
                  <div className="space-y-2">
                    {Object.keys(filteredRecipes[0]?.nutritionFacts).map(
                      (nutrient) => (
                        <div
                          key={nutrient}
                          className="flex justify-between py-2 border-b border-slate-700"
                        >
                          <span>
                            {nutrient.slice(0, 1).toUpperCase()}
                            {nutrient.slice(1, nutrient.length)}
                          </span>
                          <span className="font-medium">
                            {filteredRecipes[0]?.nutritionFacts[nutrient] < 60
                              ? `${filteredRecipes[0]?.nutritionFacts[nutrient]}g`
                              : filteredRecipes[0]?.nutritionFacts[nutrient]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow">
                <div className="p-6 pt-6">
                  <h2 className="text-xl font-semibold mb-6">Instructions</h2>
                  <ol className="space-y-6">
                    {filteredRecipes[0]?.instructions.map((list, idx) => (
                      <li key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-medium">
                          {idx + 1}
                        </div>
                        <div className="pt-1">
                          <p>{list}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewRecipe;
