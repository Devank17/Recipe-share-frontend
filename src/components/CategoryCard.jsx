import React from "react";

const CategoryCard = ({category,name}) => {
  return (
    <>
      <div className="card rounded-md border-[0.1px] border-slate-700 text-center hover:bg-[hsl(var(--muted))] cursor-pointer">
        <div className="p-6 text-center">
          <h3 className="font-semibold mb-1 text-xs sm:text-sm">{name}</h3>
          <p className="text-gray-400 text-xs sm:text-sm">{category} recipes</p>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
