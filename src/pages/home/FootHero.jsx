import React from "react";
import { Link } from "react-router-dom";

const FootHero = () => {
  return (
    <>
      <div className=" py-12 px-4 bg-[hsl(var(--muted))]/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to share your recipes?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community today and start sharing your culinary creations
            with food enthusiasts around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={"/signup"}>
              <button className="w-full  bg-white text-black inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none shadow  h-10 rounded-md px-8 cursor-pointer">
                Sign Up Now
              </button>
            </Link>

            <Link to={"/recipes"}>
              <button className="w-full border  border-slate-700 bg-[hsl(var(--background))] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none shadow  h-10 rounded-md px-8 cursor-pointer">
              Browse Recipes</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FootHero;
