import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/getBaseUrl";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append simple text fields directly
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("difficulty", data.difficulty);
    formData.append("time", data.time);
    formData.append("servings", data.servings);

    // Process multi-line fields into arrays:
    // Ingredients: split by newline and remove any blank lines
    const ingredientsArray = data.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    // Instructions: same approach
    const instructionsArray = data.instructions
      .split("\n")
      .map((step) => step.trim())
      .filter((step) => step !== "");

    // Append these as JSON strings or multiple values.
    // Here we'll stringify them, and on the backend, parse them back into arrays.
    formData.append("ingredients", JSON.stringify(ingredientsArray));
    formData.append("instructions", JSON.stringify(instructionsArray));

    // Nutrition facts: convert each to a number (or 0 if not provided)
    formData.append(
      "nutritionFacts",
      JSON.stringify({
        calories: Number(data.calories) || 0,
        protein: Number(data.protein) || 0,
        carbs: Number(data.carbs) || 0,
        fat: Number(data.fat) || 0,
      })
    );

    // Author – if provided; otherwise, your backend might assign a default
    formData.append("author", data.author || "User");

    // Tags: split by commas and trim, then stringify the array
    const tagsArray = data.tags
      ? data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
      : [];
    formData.append("tags", JSON.stringify(tagsArray));

    // Ratings: Since new recipes start with no ratings, we can set them to defaults.
    // You can also choose to let the backend set these defaults.
    formData.append("ratings", JSON.stringify({ average: 0, count: 0 }));

    // Handle the image upload:
    // The file input returns a FileList, so we take the first file.
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit the Recipe ?",
        icon: "warning",
        color: "white",
        background: "#09090b",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Add it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = await auth.currentUser.getIdToken();

            axios
              .post(`${getBaseUrl()}/recipe/new`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                reset();
              });
            Swal.fire({
              color: "white",
              background: "#09090b",
              title: "Submitted!",
              text: "Your Recipe has been Submitted.",
              icon: "success",
            });
            navigate(`/recipes`);
          } catch (err) {
            console.error("Error submitting form:", err);
            Swal.fire({
              color: "white",
              background: "#09090b",
              title: "Error",
              text: "Failed to create recipe",
              icon: "error",
            });
          }
        }
      });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const [recipes, setRecipes] = useState([]);
  const difficulties = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    axios.get(`${getBaseUrl()}/main`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const categoryCount = recipes.reduce((acc, recipe) => {
    const category = recipe.category;
    if (!acc[category]) {
      acc[category] = 1;
    } else {
      acc[category]++;
    }
    return acc;
  }, {});

  const categories = Object.keys(categoryCount)
    .filter((category) => category !== "Other")
    .map((category, idx) => ({
      id: idx,
      name: category,
    }));

  return (
    <>
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Share Your Recipe</h1>
          <p className="text-gray-400 mb-8">
            Fill out the form below to share your favorite recipe with the
            RecipeShare community.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-8"
          >
            <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">
                  Basic Information
                </h3>
                <p className="text-sm text-gray-400">
                  Let's start with the basic details of your recipe.
                </p>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="form-item:1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Recipe Title
                  </label>
                  <input
                    {...register("title", {
                      required: {
                        value: true,
                        message: "This Field is Required",
                      },
                      minLength: {
                        value: 3,
                        message: "The Min. Length should be 3",
                      },
                    })}
                    id="form-item:1"
                    type="text"
                    className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g., Homemade Chocolate Chip Cookies"
                  />
                  {errors.title && (
                    <div className=" text-xs text-pink-500">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="form-item:2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "This Field is Required",
                      },
                      minLength: {
                        value: 15,
                        message: "The Min. Length should be 15",
                      },
                    })}
                    id="form-item:2"
                    className="flex mt-2 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                    placeholder="Briefly describe your recipe..."
                  ></textarea>
                  {errors.description && (
                    <div className=" text-xs text-pink-500">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:3"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: {
                          value: true,
                          message: "This Field is Required",
                        },
                      })}
                      className="flex mt-2 h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-700 bg-[hsl(var(--background))] px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      name="category"
                      id="form-item:3"
                    >
                      <option value="Select a category">
                        Select a category
                      </option>
                      {categories.map((category, idx) => (
                        <option key={idx} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && (
                      <div className=" text-xs text-pink-500">
                        {errors.category.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:4"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Difficulty
                    </label>
                    <select
                      {...register("difficulty", {
                        required: {
                          value: true,
                          message: "This Field is Required",
                        },
                      })}
                      className=" flex bg-[hsl(var(--background))] mt-2 h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-700  px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      id="form-item:4"
                    >
                      {difficulties.map((difficulty, idx) => (
                        <option key={idx} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                    {errors.difficulty && (
                      <div className=" text-xs text-pink-500">
                        {errors.difficulty.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:5"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Preparation Time
                    </label>
                    <input
                      {...register("time", {
                        required: {
                          value: true,
                          message: "This Field is Required",
                        },
                      })}
                      id="form-item:5"
                      type="text"
                      className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="e.g., 30 min"
                    />
                    {errors.time && (
                      <div className=" text-xs text-pink-500">
                        {errors.time.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:6"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Servings
                    </label>
                    <input
                      {...register("servings", {
                        required: {
                          value: true,
                          message: "This Field is Required",
                        },
                      })}
                      id="form-item:6"
                      type="number"
                      defaultValue={4}
                      className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.servings && (
                      <div className=" text-xs text-pink-500">
                        {errors.servings.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* SecondBox */}
            <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">
                  Recipe Details
                </h3>
                <p className="text-sm text-gray-400">
                  Share the ingredients and instructions for your recipe.
                </p>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="form-item:7"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ingredients
                  </label>
                  <textarea
                    {...register("ingredients", {
                      required: {
                        value: true,
                        message: "This Field is Required",
                      },
                    })}
                    id="form-item:7"
                    placeholder="Enter each ingredient on a new line..."
                    className="flex mt-2 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
                  ></textarea>
                  {errors.ingredients && (
                    <div className=" text-xs text-pink-500">
                      {errors.ingredients.message}
                    </div>
                  )}
                  <p className="text-[0.8rem] text-gray-400">
                    List each ingredient on a new line with measurements (e.g.,
                    2 cups flour)
                  </p>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="form-item:8"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Instructions
                  </label>
                  <textarea
                    {...register("instructions", {
                      required: {
                        value: true,
                        message: "This Field is Required",
                      },
                    })}
                    id="form-item:8"
                    placeholder="Enter each step on a new line..."
                    className="flex mt-2 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
                  ></textarea>
                  {errors.instructions && (
                    <div className=" text-xs text-pink-500">
                      {errors.instructions.message}
                    </div>
                  )}
                  <p className="text-[0.8rem] text-gray-400">
                    List each step on a new line in the order they should be
                    followed.
                  </p>
                </div>
              </div>
            </div>
            {/* //* Third Box */}
            <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">
                  Nutrition Information
                </h3>
                <p className="text-sm text-gray-400">
                  Provide nutritional details per serving.
                </p>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:9"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Calories
                    </label>
                    <input
                      {...register("calories")}
                      id="form-item:9"
                      defaultValue={0}
                      type="number"
                      min={0}
                      className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.calories && (
                      <div className=" text-xs text-pink-500">
                        {errors.calories.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:10"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Protein (g)
                    </label>
                    <input
                      {...register("protein")}
                      id="form-item:10"
                      defaultValue={0}
                      type="number"
                      min={0}
                      className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.protein && (
                      <div className=" text-xs text-pink-500">
                        {errors.protein.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:11"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Carbs (g)
                    </label>
                    <input
                      {...register("carbs")}
                      id="form-item:11"
                      defaultValue={0}
                      type="number"
                      min={0}
                      className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.carbs && (
                      <div className=" text-xs text-pink-500">
                        {errors.carbs.message}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="form-item:12"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fat (g)
                    </label>
                    <input
                      {...register("fat")}
                      id="form-item:12"
                      defaultValue={0}
                      type="number"
                      min={0}
                      className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.fat && (
                      <div className=" text-xs text-pink-500">
                        {errors.fat.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">
                  Additional Information
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-2">
                  <label
                    htmlFor="form-item:13"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Tags
                  </label>
                  <input
                    {...register("tags")}
                    id="form-item:13"
                    type="text"
                    className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g., vegetarian, quick, healthy"
                  />
                  <p className="text-[0.8rem] text-gray-400">
                    Separate tags with commas (e.g., breakfast, healthy, quick)
                  </p>
                </div>
                <div className="space-y-2 mt-2">
                  <label
                    htmlFor="form-item:14"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Recipe Image
                  </label>
                  <div id="form-item:14" className="space-y-4">
                    <div className="flex mt-2 items-center gap-4">
                      <input
                        {...register("image", {
                          required: {
                            value: true,
                            message: "This Field is Required",
                          },
                        })}
                        type="file"
                        accept="image/*"
                        id="fileInp"
                        className=" flex h-9 w-full rounded-md border border-slate-700 bg-transparent px-4 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.image && (
                        <div className="text-xs text-pink-500">
                          {errors.image.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[0.8rem] text-gray-400">
                    Upload an image of your finished recipe. Recommended size:
                    1200x800 pixels.
                  </p>
                </div>
              </div>

              <div className="items-center p-6 pt-0 flex justify-end">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-black shadow hover:bg-white/90 h-9 px-4 py-2"
                >
                  Add Recipe
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateRecipe;
