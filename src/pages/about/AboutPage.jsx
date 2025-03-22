import React from "react";
import Values from "./Values";
import About from "./About";

const AboutPage = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          About RecipeShare
        </h1>
        <About />
        <Values />
      </div>
    </>
  );
};

export default AboutPage;
