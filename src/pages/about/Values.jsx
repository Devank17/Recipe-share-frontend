import React from "react";

const Values = () => {
  return (
    <>
      <div className="shrink-0 bg-slate-700 h-[1px] w-full my-8"></div>
      <h2 className="text-2xl font-bold mb-6">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-md  border-slate-700 border bg-transparent text-gray-400 shadow">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-white">Community</h3>
            <p className="font-[monsterrat]">
              We foster a supportive environment where food enthusiasts can
              connect, share, and learn from each other.
            </p>
          </div>
        </div>
        <div className="rounded-md border-slate-700 border bg-transparent text-gray-400 shadow">
          <div className="p-6 ">
            <h3 className="text-xl font-semibold mb-3 text-white">Diversity</h3>
            <p className="font-[monsterrat]">
              We celebrate the rich tapestry of global cuisines and cooking
              traditions from around the world.
            </p>
          </div>
        </div>
        <div className="rounded-md border-slate-700 border bg-transparent text-gray-400 shadow">
          <div className="p-6 ">
            <h3 className="text-xl font-semibold mb-3 text-white">
              Accessibility
            </h3>
            <p className="font-[monsterrat]">
              We believe good food should be accessible to everyone, with
              recipes for all skill levels and dietary needs.
            </p>
          </div>
        </div>
      </div>
      <div className="shrink-0 bg-slate-700 h-[1px] w-full my-8"></div>
      <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
      <p className="text-lg mb-6 font-serif tracking-wide">
        Whether you're looking to share your culinary creations or find
        inspiration for your next meal, RecipeShare is the perfect place for
        food enthusiasts of all levels. Join our growing community today and be
        part of a global conversation about food, cooking, and the joy of
        sharing meals.
      </p>
    </>
  );
};

export default Values;
