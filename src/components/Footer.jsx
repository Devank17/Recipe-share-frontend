import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[hsl(var(--muted))]/30">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="text-xl font-bold flex items-center">
                  <span className="mr-1 ">Recipe</span>
                  <span className="text-orange-500 tracking-wider">Share</span>
                </div>
              </div>
              <p className="mb-6 text-gray-400 max-w-md">
                RecipeShare connects food enthusiasts by providing a platform
                for discovering, sharing, and exploring culinary recipes with
                rich, detailed information.
              </p>
              <div className="flex space-x-4">
                <Link
                  target="_blank"
                  to={"https://www.facebook.com/"}
                  className="text-gray-400 hover:text-white"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[hsl(var(--background))] border">
                    <i className="fa-brands fa-facebook-f"></i>
                  </div>
                </Link>
                <Link
                  target="_blank"
                  to={"https://www.instagram.com/"}
                  className="text-gray-400 hover:text-white"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[hsl(var(--background))] border">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                </Link>
                <Link
                  target="_blank"
                  to={"https://www.x.com/"}
                  className="text-gray-400 hover:text-white"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[hsl(var(--background))] border">
                    <i className="fa-brands fa-x-twitter"></i>
                  </div>
                </Link>
                <Link
                  target="_blank"
                  to={"https://www.pinterest.com/"}
                  className="text-gray-400 hover:text-white"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[hsl(var(--background))] border">
                    <i className="fa-brands fa-pinterest-p"></i>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={"/recipes"}
                    className="text-gray-400 hover:text-white"
                  >
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories"}
                    className="text-gray-400 hover:text-white"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={"/about"}
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/service"}
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/policy"}
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Community</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={"/signup"}
                    className="text-gray-400 hover:text-white"
                  >
                    Join Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/recipe/new"}
                    className="text-gray-400 hover:text-white"
                  >
                    Share Recipe
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="shrink-0 bg-slate-700 h-[1px] w-full my-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 text-gray-400">
              &copy; 2025 RecipeShare. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <Link
                className="text-sm text-gray-400 hover:text-white"
                to={"/service"}
              >
                Terms
              </Link>
              <Link
                className="text-sm text-gray-400 hover:text-white"
                to={"/policy"}
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
