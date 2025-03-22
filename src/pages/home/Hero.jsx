import React from "react";
import RecipeSearchBar from "./RecipeSearchBar";

const Hero = () => {
  return (
    <>
      <div className="container text-center mx-auto mt-20 pb-20  ">
        <h1 className="inline-block mx-2 sm:mx-0 text-4xl font-bold sm:text-6xl ">
          Discover & Share
        </h1>
        <span className="inline-block text-4xl sm:text-6xl text-orange-500 font-bold ">
          &nbsp;Delicious
        </span>
        <span className="inline-block text-4xl sm:text-6xl text-orange-500 font-bold ">
          &nbsp;Recipes
        </span>
        <h2 className="text-xl my-4 sm:px-10 px-3 text-gray-400 mb-8 max-w-3xl mx-auto ">
          Join our community of food lovers to find inspiration and share your
          culinary creations with the world.
        </h2>
        <RecipeSearchBar/>
      </div>
    </>
  );
};

export default Hero;
