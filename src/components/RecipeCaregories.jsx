import React from "react";

const RecipeCaregories = ({ category }) => {
  return (
    <>
      <div className="rounded-md border border-slate-700 bg-card text-card-foreground shadow hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold">{category.category}</h2>
            <span className="text-sm bg-[hsl(var(--muted))] px-2 py-1 rounded-full">
              {category.count} recipes
            </span>
          </div>
          <p className="text-sm text-gray-400">{category.quote}</p>
        </div>
      </div>
    </>
  );
};

export default RecipeCaregories;
