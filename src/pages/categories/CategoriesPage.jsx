import React, { useEffect, useState } from "react";
import RecipeCaregories from "../../components/RecipeCaregories";
// import recipes from "../../data/data";
import { Link } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/getBaseUrl";

const CategoriesPage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get(`${getBaseUrl()}/main`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const categoryCount = recipes.reduce((acc, recipe) => {
    const category = recipe.category;
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const categoryQuotes = {
    Italian:
      "Savor the classics: from perfect pasta to mouthwatering pizza, bring Italy to your kitchen.",
    Asian:
      "Explore a continent of flavor: delicious dishes from every corner of Asia await.",
    Dessert:
      "Indulge your sweet tooth: discover irresistible treats and heavenly baked goods.",
    Vegetarian:
      "Flavor without compromise: meat-free meals that are anything but ordinary.",
    "Quick Meals":
      "Fast, fresh, and fabulous: delicious dinners ready in under 30 minutes.",
    Breakfast:
      "Rise and shine to flavor: energize your mornings with these breakfast delights.",
    Seafood:
      "Dive into freshness: discover vibrant and flavorful recipes from the sea.",
    Mexican:
      "Spice up your life: experience the bold and vibrant tastes of Mexico.",
    Indian:
      "Aromatic adventures: explore the rich and diverse flavors of Indian cuisine.",
    Baking:
      "Warmth from the oven: bake your own breads, cakes, and delightful treats.",
    Healthy:
      "Nourish your body, delight your senses: balanced recipes for a healthier you.",
    Soups:
      "A bowlful of comfort: heartwarming soups to soothe and satisfy, any time of year.",
  };

  const categories = Object.keys(categoryCount).map((category) => ({
    category: category,
    count: categoryCount[category],
    quote:
      categoryQuotes[category] ||
      "Good food is the foundation of genuine happiness.",
  }));

  return (
    <>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Recipe Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`${category.category.toLowerCase()}`} key={category.category}>
              <RecipeCaregories category={category} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
